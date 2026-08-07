/**
 * Proves host / port / encryption are correct without needing the password.
 * Resolves DNS, opens TLS, validates the certificate, reads the SMTP banner
 * and the EHLO capability list — then disconnects without authenticating.
 *
 *   node --env-file-if-exists=.env scripts/probe-smtp.mjs
 */
import { connect as tlsConnect } from 'node:tls'
import { lookup } from 'node:dns/promises'

const host = (process.env.SMTP_HOST || '').trim()
const port = Number(process.env.SMTP_PORT || 465)
const user = (process.env.SMTP_USERNAME || '').trim()

if (!host) {
  console.error('SMTP_HOST is not set')
  process.exit(1)
}

console.log(`\n  host      ${host}:${port}`)
console.log(`  username  ${user || '(none)'}\n`)

try {
  const { address, family } = await lookup(host)
  console.log(`  DNS       resolves to ${address} (IPv${family})`)
} catch (e) {
  console.error(`  DNS       FAILED: ${e.message}`)
  process.exit(1)
}

const socket = await new Promise((resolve, reject) => {
  const s = tlsConnect({ host, port, servername: host, timeout: 15000 }, () => resolve(s))
  s.on('error', reject)
  s.on('timeout', () => reject(new Error('connection timed out')))
}).catch((e) => {
  console.error(`  TLS       FAILED: ${e.message}`)
  process.exit(1)
})

const cert = socket.getPeerCertificate()
console.log(`  TLS       ${socket.getProtocol()} · authorized=${socket.authorized}`)
if (!socket.authorized) console.log(`            reason: ${socket.authorizationError}`)
console.log(`  cert CN   ${cert.subject?.CN ?? '(none)'}`)
console.log(`  cert SAN  ${(cert.subjectaltname ?? '').slice(0, 120)}`)
console.log(`  valid to  ${cert.valid_to}`)

const readUntil = (predicate, ms = 10000) =>
  new Promise((resolve, reject) => {
    let buf = ''
    const t = setTimeout(() => reject(new Error('timed out waiting for server')), ms)
    const onData = (d) => {
      buf += d.toString('utf8')
      if (predicate(buf)) {
        clearTimeout(t)
        socket.off('data', onData)
        resolve(buf)
      }
    }
    socket.on('data', onData)
  })

try {
  const banner = await readUntil((b) => b.includes('\r\n'))
  console.log(`  banner    ${banner.trim().split('\r\n')[0]}`)

  socket.write('EHLO urbangoodzdelivery.com\r\n')
  const ehlo = await readUntil((b) => /^\d{3} /m.test(b.split('\r\n').at(-2) ?? ''))
  const caps = ehlo
    .split('\r\n')
    .filter((l) => /^250[- ]/.test(l))
    .map((l) => l.slice(4))
    .filter(Boolean)
  console.log(`  EHLO ok   capabilities: ${caps.join(', ').slice(0, 160)}`)

  const authLine = caps.find((c) => c.toUpperCase().startsWith('AUTH'))
  console.log(`  auth      ${authLine ? authLine : 'NOT ADVERTISED'}`)

  socket.write('QUIT\r\n')
  console.log('\n  Host, port and encryption are correct. Only the password is missing.')
} catch (e) {
  console.error(`  SMTP      FAILED: ${e.message}`)
  process.exitCode = 1
} finally {
  socket.end()
}

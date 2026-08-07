/**
 * Proves the SMTP adapter really delivers.
 *
 *   node --env-file-if-exists=.env scripts/test-smtp.mjs            # against your real relay
 *   node scripts/test-smtp.mjs --local                              # against a built-in sink
 *
 * `--local` starts a throwaway SMTP server on 127.0.0.1, points the adapter at
 * it, sends the real confirmation email, and prints what the server received —
 * so the adapter is verified end to end without needing production credentials.
 */
import { createServer } from 'node:net'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { rolldown } from 'rolldown'

const useLocal = process.argv.includes('--local')
const PORT = 2526

/** Minimal SMTP sink: enough of the protocol for a client to complete a send. */
function startSink() {
  const received = { from: '', to: [], data: '' }
  const server = createServer((sock) => {
    let inData = false
    sock.write('220 localhost ESMTP test-sink\r\n')
    sock.on('data', (buf) => {
      for (const line of buf.toString('utf8').split('\r\n')) {
        if (inData) {
          if (line === '.') {
            inData = false
            sock.write('250 2.0.0 Ok: queued\r\n')
          } else {
            received.data += line + '\n'
          }
          continue
        }
        if (!line) continue
        const cmd = line.split(' ')[0].toUpperCase()
        if (cmd === 'EHLO' || cmd === 'HELO') sock.write('250-localhost\r\n250 SIZE 10485760\r\n')
        else if (cmd === 'MAIL') { received.from = line; sock.write('250 2.1.0 Ok\r\n') }
        else if (cmd === 'RCPT') { received.to.push(line); sock.write('250 2.1.5 Ok\r\n') }
        else if (cmd === 'DATA') { inData = true; sock.write('354 End data with <CR><LF>.<CR><LF>\r\n') }
        else if (cmd === 'QUIT') { sock.write('221 2.0.0 Bye\r\n'); sock.end() }
        else sock.write('250 2.0.0 Ok\r\n')
      }
    })
    sock.on('error', () => {})
  })
  return new Promise((res) => server.listen(PORT, '127.0.0.1', () => res({ server, received })))
}

if (useLocal) {
  process.env.SMTP_HOST = '127.0.0.1'
  process.env.SMTP_PORT = String(PORT)
  process.env.SMTP_ENCRYPTION = 'none'
  process.env.SMTP_USERNAME = ''
  process.env.SMTP_PASSWORD = ''
  process.env.LEAD_FROM_EMAIL ||= 'hello@urbangoodzdelivery.com'
  process.env.LEAD_FROM_NAME ||= 'Urban Goodz'
}

const tmp = resolve('.preview/_mail.mjs')
await mkdir('.preview', { recursive: true })
const bundle = await rolldown({
  input: resolve('src/server/lead/adapters/email.ts'),
  platform: 'node',
  external: ['nodemailer'],
})
await bundle.write({ file: tmp, format: 'esm' })
await bundle.close()
const { smtpEmail, verifySmtp, confirmationEmail } = await import(pathToFileURL(tmp).href)

const lead = {
  submissionId: 'ug_smtp_test',
  firstName: 'Angela',
  interestList: ['Business Owner'],
}

let sink = null
if (useLocal) sink = await startSink()

try {
  if (!useLocal) {
    process.stdout.write('  verifying connection... ')
    await verifySmtp()
    console.log('ok')
  }
  const to = process.env.SMTP_TEST_TO || 'test@example.com'
  process.stdout.write(`  sending confirmation to ${to}... `)
  await smtpEmail.send({
    to,
    subject: 'Welcome to Urban Goodz',
    html: confirmationEmail(lead),
  })
  console.log('sent')

  if (sink) {
    await new Promise((r) => setTimeout(r, 200))
    const { received } = sink
    console.log('\n  --- what the SMTP server actually received ---')
    console.log(`  ${received.from}`)
    for (const r of received.to) console.log(`  ${r}`)
    const headers = received.data.split('\n').filter((l) =>
      /^(From|To|Subject|Content-Type|MIME-Version):/i.test(l),
    )
    for (const h of headers) console.log(`  ${h}`)
    console.log(`  body bytes: ${received.data.length}`)
    const hasBrand = received.data.includes('Urban') && received.data.includes('Goodz')
    console.log(`  contains Urban Goodz branding: ${hasBrand ? 'yes' : 'NO'}`)
  }
  console.log('\n  SMTP adapter verified.')
} catch (err) {
  console.error(`\n  FAILED: ${err.message}`)
  process.exitCode = 1
} finally {
  if (sink) sink.server.close()
  await rm(tmp, { force: true })
}

/**
 * End-to-end check for the signup server function.
 *
 *   node .output/server/index.mjs        # in one shell (PORT=4310)
 *   node scripts/test-signup.mjs         # in another
 *
 * Encodes the payload the same way the browser client does (seroval JSON) and
 * posts it to the server-function endpoint, then reports what came back.
 */
import { toJSON } from 'seroval'

const PORT = (process.env.SIGNUP_TEST_PORT || '4310').trim()
const ORIGIN = `http://localhost:${PORT}`
const FN_ID = (process.env.SIGNUP_FN_ID || '').trim()
console.log(`target: ${ORIGIN}/_serverFn/${FN_ID.slice(0, 12)}…`)

if (!FN_ID) {
  console.error('Set SIGNUP_FN_ID to the id found in .output/server/_ssr/signups-*.mjs')
  process.exit(1)
}

async function send(label, payload) {
  const res = await fetch(`${ORIGIN}/_serverFn/${FN_ID}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-tsr-serverFn': 'true',
      origin: ORIGIN,
    },
    body: JSON.stringify(toJSON({ data: payload })),
  })
  const text = await res.text()
  console.log(`${label.padEnd(30)} ${String(res.status).padEnd(4)} ${text.slice(0, 180)}`)
}

const base = { city: 'Houston, TX', consent: true }

await send('valid samaritan', {
  audience: 'samaritan',
  fullName: 'Test Person',
  email: 'test@example.com',
  phone: '281-555-0142',
  help: ['Jump start', 'Flat tire change'],
  message: 'end-to-end check',
  ...base,
})
await send('valid app waitlist', {
  audience: 'app',
  fullName: 'Ada Waitlist',
  email: 'ada@example.com',
  ...base,
})
await send('valid business', {
  audience: 'business',
  fullName: 'Angela Cook',
  email: 'angela@example.com',
  businessName: 'Angela’s Kitchen',
  category: 'Restaurant',
  phone: '281-555-0199',
  ...base,
})
await send('invalid email → reject', {
  audience: 'app',
  fullName: 'Bad Email',
  email: 'not-an-email',
  ...base,
})
await send('no consent → reject', {
  audience: 'app',
  fullName: 'No Consent',
  email: 'nc@example.com',
  city: 'Austin, TX',
  consent: false,
})
await send('samaritan no help → reject', {
  audience: 'samaritan',
  fullName: 'No Help',
  email: 'nh@example.com',
  phone: '281-555-0000',
  help: [],
  ...base,
})
await send('honeypot bot → silent drop', {
  audience: 'app',
  fullName: 'Spam Bot',
  email: 'bot@example.com',
  company: 'x',
  ...base,
})

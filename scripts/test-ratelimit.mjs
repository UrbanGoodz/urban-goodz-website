/**
 * Proves the signup rate limiter actually rejects a burst.
 *   SIGNUP_FN_ID=<id> node scripts/test-ratelimit.mjs
 */
import { toJSON } from 'seroval'

const PORT = (process.env.SIGNUP_TEST_PORT || '4320').trim()
const ORIGIN = `http://localhost:${PORT}`
const FN_ID = (process.env.SIGNUP_FN_ID || '').trim()
const LIMIT = Number(process.env.LEAD_RATE_LIMIT_MAX || 5)

if (!FN_ID) {
  console.error('SIGNUP_FN_ID is required')
  process.exit(1)
}

let accepted = 0
let limited = 0

for (let i = 1; i <= LIMIT + 3; i++) {
  const res = await fetch(`${ORIGIN}/_serverFn/${FN_ID}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-tsr-serverFn': 'true',
      origin: ORIGIN,
      // Same synthetic client IP for every request so they share a bucket.
      'x-forwarded-for': '203.0.113.77',
    },
    body: JSON.stringify(
      toJSON({
        data: {
          audience: 'app',
          fullName: `Burst Tester ${i}`,
          email: `burst${i}@example.com`,
          city: 'Houston, TX',
          consent: true,
          context: { elapsedMs: 5000 },
        },
      }),
    ),
  })
  const text = await res.text()
  const blocked = text.includes('Too many submissions')
  if (blocked) limited++
  else accepted++
  console.log(`  request ${String(i).padStart(2)}  ${blocked ? 'RATE LIMITED' : 'accepted'}`)
}

console.log(`\n  accepted: ${accepted}   rate-limited: ${limited}   (limit is ${LIMIT})`)
process.exit(accepted === LIMIT && limited === 3 ? 0 : 1)

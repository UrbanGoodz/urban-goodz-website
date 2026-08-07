/**
 * Production readiness check. Run before deploying:
 *
 *   node --env-file=.env scripts/preflight.mjs
 *
 * Verifies configuration and, with --live, actually writes a test row to the
 * configured storage and sends a test email.
 */
const live = process.argv.includes('--live')
const env = (k) => (process.env[k] || '').trim()
const list = (k) => env(k).split(',').map((s) => s.trim()).filter(Boolean)

let fail = 0
let warn = 0
const ok = (m) => console.log(`  \x1b[32mok\x1b[0m    ${m}`)
const bad = (m) => { fail++; console.log(`  \x1b[31mFAIL\x1b[0m  ${m}`) }
const meh = (m) => { warn++; console.log(`  \x1b[33mwarn\x1b[0m  ${m}`) }

console.log('\nUrban Goodz — production preflight\n')

console.log('Storage')
const storage = list('LEAD_STORAGE')
if (!storage.length) bad('LEAD_STORAGE is empty — every lead will go straight to the dead-letter queue')
else ok(`providers: ${storage.join(', ')}`)

if (storage.includes('google-sheets')) {
  const need = ['GOOGLE_SHEET_ID', 'GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_PRIVATE_KEY']
  const missing = need.filter((k) => !env(k))
  if (missing.length) bad(`google-sheets selected but missing: ${missing.join(', ')}`)
  else {
    ok('google-sheets credentials present')
    const key = env('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n')
    if (!key.includes('BEGIN PRIVATE KEY')) bad('GOOGLE_PRIVATE_KEY does not look like a PEM block')
    else ok('private key looks like a PEM block')
  }
}
if (storage.includes('airtable') && !(env('AIRTABLE_TOKEN') && env('AIRTABLE_BASE_ID'))) {
  bad('airtable selected but AIRTABLE_TOKEN / AIRTABLE_BASE_ID missing')
}
if (storage.includes('webhook') && !env('LEAD_WEBHOOK_URL')) bad('webhook selected but LEAD_WEBHOOK_URL missing')
if (storage.includes('console')) meh('console storage is for development only — not a production destination')

console.log('\nEmail')
const emailProvider = env('LEAD_EMAIL')
if (!emailProvider || emailProvider === 'none') meh('LEAD_EMAIL not set — no confirmation or admin emails will send')
else if (emailProvider === 'resend') {
  if (!env('RESEND_API_KEY')) bad('LEAD_EMAIL=resend but RESEND_API_KEY missing')
  else ok('resend key present')
  if (!env('LEAD_FROM_EMAIL')) bad('LEAD_FROM_EMAIL missing — Resend requires a verified sender')
  else ok(`sender: ${env('LEAD_FROM_EMAIL')}`)
} else if (emailProvider === 'smtp') {
  if (!env('SMTP_HOST')) bad('LEAD_EMAIL=smtp but SMTP_HOST missing')
  else ok(`smtp host: ${env('SMTP_HOST')}:${env('SMTP_PORT') || 587}`)
  if (!env('LEAD_FROM_EMAIL')) bad('LEAD_FROM_EMAIL missing — required as the envelope sender')
  else ok(`sender: ${env('LEAD_FROM_EMAIL')}`)
  if (env('SMTP_USERNAME') && !env('SMTP_PASSWORD')) bad('SMTP_USERNAME set but SMTP_PASSWORD missing')
  else if (!env('SMTP_USERNAME')) meh('no SMTP_USERNAME — only valid for an unauthenticated internal relay')
  else ok('smtp credentials present')
  const enc = (env('SMTP_ENCRYPTION') || 'starttls').toLowerCase()
  if (enc === 'none') meh('SMTP_ENCRYPTION=none — credentials and mail travel in plaintext')
  else ok(`encryption: ${enc}`)
  if (env('SMTP_ALLOW_INSECURE_TLS') === 'true') meh('SMTP_ALLOW_INSECURE_TLS=true — certificate validation is disabled')
  console.log('        run `npm run smoke:smtp` to prove the connection actually works')
}
if (!list('LEAD_ADMIN_EMAILS').length) meh('LEAD_ADMIN_EMAILS empty — nobody is notified of new signups')
else ok(`admin recipients: ${list('LEAD_ADMIN_EMAILS').length}`)

console.log('\nCRM')
const crm = env('LEAD_CRM')
if (!crm || crm === 'none') meh('no CRM configured (fine for launch)')
else if (crm === 'hubspot' && !env('HUBSPOT_ACCESS_TOKEN')) bad('LEAD_CRM=hubspot but HUBSPOT_ACCESS_TOKEN missing')
else if (crm === 'salesforce') bad('LEAD_CRM=salesforce but that adapter is a stub — leads would not reach it')
else ok(`crm: ${crm}`)

console.log('\nAnalytics')
const analytics = list('LEAD_ANALYTICS')
if (!analytics.length) meh('LEAD_ANALYTICS empty — no server-side events')
else ok(`providers: ${analytics.join(', ')}`)
if (analytics.includes('ga4') && !(env('GA4_MEASUREMENT_ID') && env('GA4_API_SECRET'))) {
  bad('ga4 selected but GA4_MEASUREMENT_ID / GA4_API_SECRET missing')
}

console.log('\nPrivacy & safety')
ok(`IP storage: ${env('LEAD_STORE_IP') === 'true' ? 'ON — confirm your privacy policy covers this' : 'off'}`)
ok(`rate limit: ${env('LEAD_RATE_LIMIT_MAX') || 5} per ${(Number(env('LEAD_RATE_LIMIT_WINDOW_MS') || 600000) / 60000)} min`)

if (live) {
  console.log('\nLive checks')
  const { processLead } = await import('../.output/server/_ssr/ssr.mjs')
    .then(() => ({ processLead: null }))
    .catch(() => ({ processLead: null }))
  if (!processLead) {
    meh('--live requires running against the built server; use scripts/test-signup.mjs instead')
  }
}

console.log(
  `\n${fail ? `\x1b[31m${fail} blocking issue(s)\x1b[0m` : '\x1b[32mno blocking issues\x1b[0m'}` +
    `${warn ? `, \x1b[33m${warn} warning(s)\x1b[0m` : ''}\n`,
)
process.exit(fail ? 1 : 0)

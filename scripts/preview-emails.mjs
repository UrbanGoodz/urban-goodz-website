/**
 * Renders the transactional emails to HTML files so they can be opened in a
 * browser, forwarded to real inboxes, or run through a client-testing service.
 *
 *   node scripts/preview-emails.mjs
 *   -> .preview/confirmation.html, admin.html, failure.html
 *
 * Bundles the real template module with esbuild so the previews come from the
 * exact source that production sends.
 */
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { rolldown } from 'rolldown'

const tmp = resolve('.preview/_email.mjs')
await mkdir('.preview', { recursive: true })
const bundle = await rolldown({
  input: resolve('src/server/lead/adapters/email.ts'),
  platform: 'node',
})
await bundle.write({ file: tmp, format: 'esm' })
await bundle.close()
const { confirmationEmail, adminEmail, failureEmail } = await import(pathToFileURL(tmp).href)

/** A representative lead with every field populated. */
const lead = {
  submissionId: 'ug_demo_0001',
  timestamp: new Date().toISOString(),
  audience: 'business',
  firstName: 'Angela',
  lastName: 'Cook',
  fullName: 'Angela Cook',
  email: 'angela@angelaskitchen.com',
  phone: '281-555-0199',
  city: 'Houston',
  state: 'TX',
  zip: '77002',
  interests: {},
  interestList: ['Business Owner', 'Marketplace', 'Services'],
  referralSource: 'Instagram',
  utmSource: 'instagram',
  utmMedium: 'social',
  utmCampaign: 'launch-houston',
  landingPage: '/platform?utm_source=instagram',
  browser: 'Chrome',
  device: 'Mobile',
  ip: '',
  status: 'New',
  notes: 'Soul food restaurant, open 6 years, wants delivery + storefront.',
}

const out = '.preview'
await mkdir(out, { recursive: true })

const files = [
  ['confirmation.html', confirmationEmail(lead)],
  ['admin.html', adminEmail(lead)],
  ['failure.html', failureEmail(lead, 'storage:google-sheets failed after 3 attempts: 403 Forbidden')],
]

for (const [name, html] of files) {
  await writeFile(join(out, name), html, 'utf8')
  console.log(`  ${name.padEnd(20)} ${(html.length / 1024).toFixed(1)} KB`)
}
await rm(tmp, { force: true })
console.log(`\nOpen them from ${out}/ — or forward to a real inbox to check Gmail/Outlook rendering.`)

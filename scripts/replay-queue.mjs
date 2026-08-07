/**
 * Replays dead-lettered leads into the configured storage provider.
 *
 *   node --env-file=.env scripts/replay-queue.mjs          # dry run
 *   node --env-file=.env scripts/replay-queue.mjs --commit # actually send
 *
 * Leads land in the queue only when every storage provider was unreachable.
 * Once the provider is healthy again, run this to catch up. Rows that replay
 * successfully are dropped; anything still failing is kept for the next run.
 */
import { readFile, writeFile, rm } from 'node:fs/promises'
import { join } from 'node:path'

const commit = process.argv.includes('--commit')
const dir = (process.env.LEAD_QUEUE_DIR || '.queue').trim()
const file = join(dir, 'pending.jsonl')

let raw = ''
try {
  raw = await readFile(file, 'utf8')
} catch {
  console.log(`Nothing queued (${file} does not exist).`)
  process.exit(0)
}

const rows = raw.split('\n').filter(Boolean).map((l) => JSON.parse(l))
console.log(`${rows.length} queued lead(s) in ${file}`)
if (!rows.length) process.exit(0)

for (const [i, row] of rows.entries()) {
  const l = row.lead
  console.log(`  ${i + 1}. ${l.email.padEnd(30)} ${l.audience.padEnd(10)} queued ${row.queuedAt}`)
}

if (!commit) {
  console.log('\nDry run. Re-run with --commit to replay these into storage.')
  process.exit(0)
}

// Import the built storage adapters so replay uses the exact same code path.
const { storageRegistry } = await import('../.output/server/_ssr/ssr.mjs').catch(() => ({}))
if (!storageRegistry) {
  console.error(
    '\nCould not load the built adapters. Run `npm run build` first, then replay from the project root.',
  )
  process.exit(1)
}

const providers = (process.env.LEAD_STORAGE || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
  .map((id) => storageRegistry[id])
  .filter(Boolean)

if (!providers.length) {
  console.error('LEAD_STORAGE is not configured — nothing to replay into.')
  process.exit(1)
}

const stillFailing = []
for (const row of rows) {
  let saved = false
  for (const p of providers) {
    try {
      await p.save(row.lead)
      saved = true
      break
    } catch (err) {
      console.error(`  ${row.lead.email} → ${p.name} failed: ${err.message}`)
    }
  }
  if (!saved) stillFailing.push(row)
}

const done = rows.length - stillFailing.length
console.log(`\nReplayed ${done}/${rows.length}.`)

if (stillFailing.length) {
  await writeFile(file, stillFailing.map((r) => JSON.stringify(r)).join('\n') + '\n', 'utf8')
  console.log(`${stillFailing.length} still failing — kept in the queue.`)
} else {
  await rm(file, { force: true })
  console.log('Queue drained and removed.')
}

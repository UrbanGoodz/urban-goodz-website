import { config } from './config'
import type { Lead } from './types'

/**
 * Last line of defence. If every storage provider is unreachable, the lead is
 * written here so it can be replayed once the provider recovers. This is a
 * dead-letter queue, never the primary destination.
 */

export async function enqueue(lead: Lead, error: string): Promise<void> {
  const { mkdir, appendFile } = await import('node:fs/promises')
  const { join } = await import('node:path')
  await mkdir(config.queueDir, { recursive: true })
  const line = JSON.stringify({ lead, error, queuedAt: new Date().toISOString() }) + '\n'
  await appendFile(join(config.queueDir, 'pending.jsonl'), line, 'utf8')
}

export async function readQueue(): Promise<{ lead: Lead; error: string; queuedAt: string }[]> {
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')
  try {
    const raw = await readFile(join(config.queueDir, 'pending.jsonl'), 'utf8')
    return raw
      .split('\n')
      .filter(Boolean)
      .map((l) => JSON.parse(l))
  } catch {
    return []
  }
}

export async function clearQueue(): Promise<void> {
  const { rm } = await import('node:fs/promises')
  const { join } = await import('node:path')
  await rm(join(config.queueDir, 'pending.jsonl'), { force: true })
}

/** Exponential backoff around any provider call. */
export async function withRetry<T>(
  label: string,
  fn: () => Promise<T>,
  attempts = config.retry.attempts,
): Promise<T> {
  let lastError: unknown
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (i < attempts - 1) {
        const wait = config.retry.baseDelayMs * 2 ** i
        await new Promise((r) => setTimeout(r, wait))
      }
    }
  }
  throw new Error(
    `${label} failed after ${attempts} attempts: ${
      lastError instanceof Error ? lastError.message : String(lastError)
    }`,
  )
}

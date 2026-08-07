import { config } from './config'
import type { LeadContext } from './types'

/**
 * Bot and abuse defence that runs before any provider is touched.
 * All checks are cheap and synchronous except the rate-limit bookkeeping.
 */

export type SpamVerdict = { blocked: false } | { blocked: true; reason: string; silent: boolean }

/* ─── Rate limiting ──────────────────────────────────────────────── */

const hits = new Map<string, number[]>()
let lastSweep = Date.now()

function sweep(now: number) {
  if (now - lastSweep < 60_000) return
  lastSweep = now
  for (const [key, times] of hits) {
    const kept = times.filter((t) => now - t < config.rateLimit.windowMs)
    if (kept.length) hits.set(key, kept)
    else hits.delete(key)
  }
}

export function rateLimit(key: string): boolean {
  const now = Date.now()
  sweep(now)
  const times = (hits.get(key) ?? []).filter((t) => now - t < config.rateLimit.windowMs)
  times.push(now)
  hits.set(key, times)
  return times.length <= config.rateLimit.max
}

/* ─── Heuristics ─────────────────────────────────────────────────── */

const DISPOSABLE = new Set([
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com',
  'throwawaymail.com', 'yopmail.com', 'trashmail.com', 'sharklasers.com',
  'getnada.com', 'dispostable.com', 'fakeinbox.com', 'maildrop.cc',
])

const LINK = /(https?:\/\/|www\.|\[url=)/i

export function detectSpam(input: {
  honeypot?: string
  email: string
  fullName: string
  message?: string
  context?: LeadContext
  ipKey: string
}): SpamVerdict {
  // Honeypot: only a bot fills a field people never see. Fail silently so the
  // bot believes it succeeded and does not retry with a different shape.
  if (input.honeypot && input.honeypot.trim()) {
    return { blocked: true, reason: 'honeypot', silent: true }
  }

  // Submitted implausibly fast after the form mounted.
  const elapsed = input.context?.elapsedMs
  if (typeof elapsed === 'number' && elapsed >= 0 && elapsed < 1200) {
    return { blocked: true, reason: 'submitted too fast', silent: true }
  }

  const domain = input.email.split('@')[1]?.toLowerCase() ?? ''
  if (DISPOSABLE.has(domain)) {
    return { blocked: true, reason: 'Please use a permanent email address.', silent: false }
  }

  if (LINK.test(input.fullName) || LINK.test(input.message ?? '')) {
    return { blocked: true, reason: 'links', silent: true }
  }

  // Cyrillic/CJK in a name field alongside a Latin form is a classic spam tell.
  if (/[Ѐ-ӿ]/.test(input.fullName)) {
    return { blocked: true, reason: 'script mismatch', silent: true }
  }

  if (!rateLimit(input.ipKey)) {
    return {
      blocked: true,
      reason: 'Too many submissions from this connection. Please try again shortly.',
      silent: false,
    }
  }

  return { blocked: false }
}

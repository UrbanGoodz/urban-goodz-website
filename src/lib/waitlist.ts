/**
 * Direct-to-backend lead capture.
 *
 * The marketing site is deployed as a static build (no server runtime), so
 * the server-function pipeline in src/server cannot run in production.
 * Signups therefore POST straight to the Urban Goodz admin panel's public
 * waitlist endpoint. The server pipeline stays in the repo for local dev and
 * future Node hosting; it is simply not the production path anymore.
 */

const endpoint =
  import.meta.env.VITE_WAITLIST_ENDPOINT ??
  'https://admin.urbangoodzdelivery.com/api/v1/urban-goodz/waitlist'

export type WaitlistInterest = 'app' | 'business' | 'driver' | 'samaritan' | 'other'

export type WaitlistPayload = {
  full_name: string
  email: string
  phone?: string
  city: string
  interest: WaitlistInterest
  message?: string
  source?: string
  page?: string
  consent: boolean
  company?: string
}

export type WaitlistResult = { ok: true } | { ok: false; error: string }

export async function submitWaitlist(payload: WaitlistPayload): Promise<WaitlistResult> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 12_000)
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (res.ok) return { ok: true }

    let message = `The waitlist service responded with ${res.status}.`
    try {
      const body = (await res.json()) as { errors?: Array<{ message?: string }> }
      const joined = (body.errors ?? [])
        .map((e) => e.message)
        .filter(Boolean)
        .join(' ')
      if (joined) message = joined
    } catch {
      // Non-JSON error body; keep the status message above.
    }
    return { ok: false, error: message }
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error && err.name === 'AbortError'
          ? 'The waitlist service took too long to reply.'
          : 'We could not reach the waitlist service.',
    }
  } finally {
    clearTimeout(timer)
  }
}

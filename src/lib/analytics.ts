/**
 * Provider-agnostic client analytics.
 *
 * Nothing here knows about a specific vendor. `track()` pushes to any of the
 * globals a tag manager may have installed, and is a silent no-op when none
 * are present — so adding or removing a provider never touches call sites.
 */

export const Events = {
  signupStarted: 'Signup Started',
  signupCompleted: 'Signup Completed',
  emailConfirmed: 'Email Confirmed',
  waitlistJoined: 'Waitlist Joined',
  driverInterest: 'Driver Interest',
  businessInterest: 'Business Interest',
  marketplaceInterest: 'Marketplace Interest',
  medicalInterest: 'Medical Interest',
  freightInterest: 'Freight Interest',
  servicesInterest: 'Services Interest',
  strandedInterest: 'Stranded Interest',
  creatorInterest: 'Creator Interest',
  investorInterest: 'Investor Interest',
  partnerInterest: 'Partner Interest',
} as const

export type EventName = (typeof Events)[keyof typeof Events]

/** Audience → the interest event its form represents. */
export const audienceEvent: Record<string, EventName> = {
  app: Events.marketplaceInterest,
  business: Events.businessInterest,
  driver: Events.driverInterest,
  samaritan: Events.strandedInterest,
}

type Props = Record<string, unknown>

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  plausible?: (event: string, opts?: { props?: Props }) => void
  posthog?: { capture?: (event: string, props?: Props) => void }
  fathom?: { trackEvent?: (event: string) => void }
}

const snake = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

export function track(event: EventName | string, props: Props = {}): void {
  if (typeof window === 'undefined') return
  const w = window as AnalyticsWindow

  try {
    w.dataLayer?.push({ event: snake(event), ...props })
    w.gtag?.('event', snake(event), props)
    w.plausible?.(event, Object.keys(props).length ? { props } : undefined)
    w.posthog?.capture?.(snake(event), props)
    w.fathom?.trackEvent?.(event)
  } catch {
    // Analytics must never break a form submission.
  }
}

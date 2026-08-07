/**
 * Contracts for the lead pipeline.
 *
 * Every stage is an interface with swappable implementations, so changing where
 * leads land is a config change — never a frontend change.
 */

export const interestKeys = [
  'businessOwner',
  'customer',
  'driver',
  'freight',
  'medicalCourier',
  'creator',
  'marketplace',
  'services',
  'stranded',
  'investor',
  'partner',
] as const

export type InterestKey = (typeof interestKeys)[number]

export const interestLabels: Record<InterestKey, string> = {
  businessOwner: 'Business Owner',
  customer: 'Customer',
  driver: 'Driver',
  freight: 'Freight',
  medicalCourier: 'Medical Courier',
  creator: 'Creator',
  marketplace: 'Marketplace',
  services: 'Services',
  stranded: 'Stranded',
  investor: 'Investor',
  partner: 'Partner',
}

/** Browser-supplied attribution, captured on the client and sent with the form. */
export type LeadContext = {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  landingPage?: string
  referrer?: string
  /** ms between form mount and submit — sub-second means a bot. */
  elapsedMs?: number
}

/** A normalised lead, the single shape every adapter receives. */
export type Lead = {
  submissionId: string
  timestamp: string
  audience: string

  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string

  city: string
  state: string
  zip: string

  interests: Record<InterestKey, boolean>
  interestList: string[]

  referralSource: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  landingPage: string

  browser: string
  device: string
  ip: string

  status: string
  notes: string
}

/* ─── Adapter interfaces ─────────────────────────────────────────── */

export interface StorageAdapter {
  readonly name: string
  save(lead: Lead): Promise<void>
}

export interface CrmAdapter {
  readonly name: string
  upsert(lead: Lead): Promise<void>
}

export interface EmailAdapter {
  readonly name: string
  send(msg: { to: string; subject: string; html: string; replyTo?: string }): Promise<void>
}

export interface AnalyticsAdapter {
  readonly name: string
  track(event: string, lead: Lead, props?: Record<string, unknown>): Promise<void>
}

export interface NotificationAdapter {
  readonly name: string
  notifyAdmin(lead: Lead): Promise<void>
  /** Last-resort alert when even the local queue could not accept a lead. */
  alertFailure(lead: Lead, error: string): Promise<void>
}

export type PipelineResult =
  | { ok: true; submissionId: string; queued: boolean }
  | { ok: false; error: string }

/* ─── Helpers ────────────────────────────────────────────────────── */

export const emptyInterests = (): Record<InterestKey, boolean> =>
  Object.fromEntries(interestKeys.map((k) => [k, false])) as Record<InterestKey, boolean>

/** Splits a single name field into first/last without inventing a middle name. */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return { firstName: parts[0] ?? '', lastName: '' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

const STATES =
  'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC'.split(
    ' ',
  )

/** Pulls a state out of "Houston, TX" style input; returns '' when absent. */
export function parseCityState(input: string): { city: string; state: string } {
  const raw = input.trim()
  const m = raw.match(/^(.*?)[,\s]+([A-Za-z]{2})\.?$/)
  if (m && STATES.includes(m[2].toUpperCase())) {
    return { city: m[1].trim(), state: m[2].toUpperCase() }
  }
  return { city: raw, state: '' }
}

/** Coarse UA parsing — enough for lead attribution, no dependency needed. */
export function parseUserAgent(ua: string): { browser: string; device: string } {
  if (!ua) return { browser: '', device: '' }
  const device = /iPad|Tablet/i.test(ua)
    ? 'Tablet'
    : /Mobi|Android|iPhone/i.test(ua)
      ? 'Mobile'
      : 'Desktop'
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /OPR\/|Opera/.test(ua)
      ? 'Opera'
      : /Chrome\//.test(ua) && !/Chromium/.test(ua)
        ? 'Chrome'
        : /Firefox\//.test(ua)
          ? 'Firefox'
          : /Safari\//.test(ua)
            ? 'Safari'
            : 'Other'
  return { browser, device }
}

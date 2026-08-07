import { config } from './config'
import { analyticsRegistry } from './adapters/analytics'
import { crmRegistry } from './adapters/crm'
import { adminEmail, confirmationEmail, emailRegistry, failureEmail } from './adapters/email'
import { storageRegistry } from './adapters/storage'
import { detectSpam } from './spam'
import { enqueue, withRetry } from './queue'
import {
  emptyInterests,
  interestKeys,
  interestLabels,
  parseCityState,
  parseUserAgent,
  splitName,
  type InterestKey,
  type Lead,
  type LeadContext,
  type PipelineResult,
} from './types'

/* ─── Analytics event names ──────────────────────────────────────── */

export const AnalyticsEvents = {
  signupStarted: 'Signup Started',
  signupCompleted: 'Signup Completed',
  emailConfirmed: 'Email Confirmed',
  waitlistJoined: 'Waitlist Joined',
} as const

/** Interest → the analytics event fired when a lead expresses it. */
export const interestEvents: Record<InterestKey, string> = {
  businessOwner: 'Business Interest',
  customer: 'Marketplace Interest',
  driver: 'Driver Interest',
  freight: 'Freight Interest',
  medicalCourier: 'Medical Interest',
  creator: 'Creator Interest',
  marketplace: 'Marketplace Interest',
  services: 'Services Interest',
  stranded: 'Stranded Interest',
  investor: 'Investor Interest',
  partner: 'Partner Interest',
}

/* ─── Normalisation ──────────────────────────────────────────────── */

/** Which interests an audience implies when the form does not set them. */
const audienceInterests: Record<string, InterestKey[]> = {
  app: ['customer', 'marketplace'],
  business: ['businessOwner'],
  driver: ['driver'],
  samaritan: ['stranded'],
}

export type RawSubmission = {
  audience: string
  fullName: string
  email: string
  phone?: string
  city: string
  zip?: string
  referralSource?: string
  interests?: string[]
  message?: string
  company?: string
  context?: LeadContext
}

export function normalise(
  input: RawSubmission,
  meta: { ip: string; userAgent: string },
): Lead {
  const { firstName, lastName } = splitName(input.fullName)
  const { city, state } = parseCityState(input.city)
  const { browser, device } = parseUserAgent(meta.userAgent)

  const interests = emptyInterests()
  for (const key of audienceInterests[input.audience] ?? []) interests[key] = true
  for (const raw of input.interests ?? []) {
    if ((interestKeys as readonly string[]).includes(raw)) interests[raw as InterestKey] = true
  }

  const ctx = input.context ?? {}

  return {
    submissionId: `ug_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    audience: input.audience,

    firstName,
    lastName,
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() ?? '',

    city,
    state,
    zip: input.zip?.trim() ?? '',

    interests,
    interestList: interestKeys.filter((k) => interests[k]).map((k) => interestLabels[k]),

    referralSource: input.referralSource?.trim() ?? '',
    utmSource: ctx.utmSource ?? '',
    utmMedium: ctx.utmMedium ?? '',
    utmCampaign: ctx.utmCampaign ?? '',
    landingPage: ctx.landingPage ?? '',

    browser,
    device,
    ip: config.storeIp ? meta.ip : '',

    status: 'New',
    notes: input.message?.trim() ?? '',
  }
}

/* ─── Adapter resolution ─────────────────────────────────────────── */

const storages = () =>
  config.storageProviders.map((id) => storageRegistry[id]).filter((a): a is NonNullable<typeof a> => Boolean(a))
const crm = () => crmRegistry[config.crmProvider] ?? crmRegistry.none
const email = () => emailRegistry[config.emailProvider] ?? emailRegistry.none
const analytics = () =>
  config.analyticsProviders.map((id) => analyticsRegistry[id]).filter((a): a is NonNullable<typeof a> => Boolean(a))

/* ─── The pipeline ───────────────────────────────────────────────── */

export async function processLead(
  input: RawSubmission,
  meta: { ip: string; userAgent: string },
): Promise<PipelineResult> {
  /* 1 · spam detection ------------------------------------------------ */
  const verdict = detectSpam({
    honeypot: input.company,
    email: input.email,
    fullName: input.fullName,
    message: input.message,
    context: input.context,
    ipKey: meta.ip || 'unknown',
  })
  if (verdict.blocked) {
    // Silent rejections look like success so bots stop probing.
    if (verdict.silent) return { ok: true, submissionId: 'ignored', queued: false }
    return { ok: false, error: verdict.reason }
  }

  /* 2 · normalise ----------------------------------------------------- */
  const lead = normalise(input, meta)

  /* 3 · storage, with retry then dead-letter queue --------------------- */
  const targets = storages()
  let stored = false
  let queued = false
  const failures: string[] = []

  for (const adapter of targets) {
    try {
      await withRetry(`storage:${adapter.name}`, () => adapter.save(lead))
      stored = true
    } catch (err) {
      failures.push(err instanceof Error ? err.message : String(err))
    }
  }

  if (!stored) {
    const detail = targets.length
      ? failures.join(' | ')
      : 'no storage provider configured (set LEAD_STORAGE)'
    try {
      await enqueue(lead, detail)
      queued = true
      console.error(`[lead] queued ${lead.submissionId} — ${detail}`)
    } catch (queueErr) {
      // Storage AND the queue are gone. Email the admin with the raw lead so
      // it still exists somewhere a human can reach.
      const msg = `${detail} | queue also failed: ${
        queueErr instanceof Error ? queueErr.message : String(queueErr)
      }`
      console.error(`[lead] CRITICAL ${lead.submissionId} — ${msg}`)
      try {
        const mailer = email()
        for (const to of config.adminEmails) {
          await mailer.send({
            to,
            subject: `ACTION REQUIRED — Urban Goodz lead could not be saved`,
            html: failureEmail(lead, msg),
          })
        }
      } catch {
        // Nothing left to try. The console error above is the final record.
      }
      return {
        ok: false,
        error: 'We could not record your details. Please email us and we will add you by hand.',
      }
    }
  }

  /* 4 · everything downstream is best-effort --------------------------- */
  // A CRM or analytics outage must never fail a submission that is safely stored.
  const downstream: Promise<unknown>[] = []

  if (config.crmProvider && config.crmProvider !== 'none') {
    downstream.push(
      withRetry('crm', () => crm().upsert(lead)).catch((e) =>
        console.error('[lead] crm failed', e),
      ),
    )
  }

  const mailer = email()
  downstream.push(
    withRetry('email:confirmation', () =>
      mailer.send({
        to: lead.email,
        subject: 'Welcome to Urban Goodz',
        html: confirmationEmail(lead),
      }),
    )
      .then(() => fireAnalytics(AnalyticsEvents.emailConfirmed, lead))
      .catch((e) => console.error('[lead] confirmation email failed', e)),
  )

  for (const to of config.adminEmails) {
    downstream.push(
      withRetry('email:admin', () =>
        mailer.send({
          to,
          subject: 'New Urban Goodz Signup',
          html: adminEmail(lead),
          replyTo: lead.email,
        }),
      ).catch((e) => console.error('[lead] admin email failed', e)),
    )
  }

  downstream.push(fireAnalytics(AnalyticsEvents.signupCompleted, lead))
  if (lead.interests.customer || lead.interests.marketplace) {
    downstream.push(fireAnalytics(AnalyticsEvents.waitlistJoined, lead))
  }
  // Several interests can map to the same event name (customer and marketplace
  // both mean "Marketplace Interest"), so dedupe or the counts double-count.
  const interestEventNames = new Set(
    interestKeys.filter((k) => lead.interests[k]).map((k) => interestEvents[k]),
  )
  for (const event of interestEventNames) downstream.push(fireAnalytics(event, lead))

  await Promise.allSettled(downstream)

  return { ok: true, submissionId: lead.submissionId, queued }
}

async function fireAnalytics(event: string, lead: Lead) {
  await Promise.allSettled(
    analytics().map((a) =>
      a.track(event, lead).catch((e) => console.error(`[analytics:${a.name}] ${event}`, e)),
    ),
  )
}

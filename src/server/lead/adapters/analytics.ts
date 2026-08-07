import { config } from '../config'
import type { AnalyticsAdapter, Lead } from '../types'

/**
 * Server-side analytics. Events fire here as well as on the client so that
 * ad-blockers and failed beacons cannot hide real conversions.
 */

export const ga4Analytics: AnalyticsAdapter = {
  name: 'ga4',
  async track(event, lead, props) {
    const { measurementId, apiSecret } = config.ga4
    if (!measurementId || !apiSecret) throw new Error('GA4 is not configured')

    const res = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          // Stable pseudo-id derived from the submission, so a lead's events group.
          client_id: lead.submissionId,
          events: [
            {
              name: event.toLowerCase().replace(/[^a-z0-9_]+/g, '_'),
              params: {
                audience: lead.audience,
                city: lead.city,
                state: lead.state,
                utm_source: lead.utmSource,
                utm_medium: lead.utmMedium,
                utm_campaign: lead.utmCampaign,
                ...props,
              },
            },
          ],
        }),
      },
    )
    if (!res.ok) throw new Error(`GA4 collect failed (${res.status})`)
  },
}

export const webhookAnalytics: AnalyticsAdapter = {
  name: 'webhook',
  async track(event, lead, props) {
    if (!config.webhookUrl) throw new Error('LEAD_WEBHOOK_URL is not set')
    await fetch(config.webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'analytics', event, submissionId: lead.submissionId, props }),
    })
  },
}

export const consoleAnalytics: AnalyticsAdapter = {
  name: 'console',
  async track(event, lead) {
    console.log(`[analytics] ${event}`, { id: lead.submissionId, audience: lead.audience })
  },
}

export const analyticsRegistry: Record<string, AnalyticsAdapter> = {
  ga4: ga4Analytics,
  webhook: webhookAnalytics,
  console: consoleAnalytics,
}

/**
 * Captures where a visitor came from and keeps it for the whole session, so a
 * signup on page five still carries the UTM tags from the ad that landed them.
 */

export type Attribution = {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  landingPage?: string
  referrer?: string
}

const KEY = 'ug_attribution'

export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  try {
    // First touch wins — do not overwrite on later page views.
    if (sessionStorage.getItem(KEY)) return

    const params = new URLSearchParams(window.location.search)
    const data: Attribution = {
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
      landingPage: window.location.pathname + window.location.search,
      referrer: document.referrer || undefined,
    }
    sessionStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // Private-mode storage failures are not worth surfacing.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Attribution
  } catch {
    /* ignore */
  }
  return { landingPage: typeof window !== 'undefined' ? window.location.pathname : undefined }
}

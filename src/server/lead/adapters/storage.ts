import { config } from '../config'
import { interestKeys, type Lead, type StorageAdapter } from '../types'

/* ─── Google Sheets ──────────────────────────────────────────────────
   Uses a service account directly: sign a JWT with node:crypto, exchange
   it for an access token, then values.append. No SDK, no extra deps.   */

/** Column order. Must match the header row in the sheet. */
export const SHEET_COLUMNS = [
  'Timestamp',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'City',
  'State',
  'ZIP',
  'Business Owner',
  'Customer',
  'Driver',
  'Freight',
  'Medical Courier',
  'Creator',
  'Marketplace',
  'Services',
  'Stranded',
  'Investor',
  'Partner',
  'Referral Source',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'Landing Page',
  'Browser',
  'Device',
  'IP',
  'Submission ID',
  'Status',
  'Notes',
] as const

export function leadToRow(lead: Lead): string[] {
  const yn = (b: boolean) => (b ? 'Yes' : '')
  return [
    lead.timestamp,
    lead.firstName,
    lead.lastName,
    lead.email,
    lead.phone,
    lead.city,
    lead.state,
    lead.zip,
    ...interestKeys.map((k) => yn(lead.interests[k])),
    lead.referralSource,
    lead.utmSource,
    lead.utmMedium,
    lead.utmCampaign,
    lead.landingPage,
    lead.browser,
    lead.device,
    lead.ip,
    lead.submissionId,
    lead.status,
    lead.notes,
  ]
}

const base64url = (b: Buffer) =>
  b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

let cachedToken: { value: string; expiresAt: number } | null = null

async function getGoogleAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) return cachedToken.value

  const { createSign } = await import('node:crypto')
  const { clientEmail, privateKey } = config.google
  const now = Math.floor(Date.now() / 1000)

  const header = base64url(Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })))
  const claim = base64url(
    Buffer.from(
      JSON.stringify({
        iss: clientEmail,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
      }),
    ),
  )
  const signer = createSign('RSA-SHA256')
  signer.update(`${header}.${claim}`)
  const signature = base64url(signer.sign(privateKey))
  const assertion = `${header}.${claim}.${signature}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })
  if (!res.ok) throw new Error(`Google token exchange failed (${res.status}): ${await res.text()}`)

  const json = (await res.json()) as { access_token: string; expires_in: number }
  cachedToken = { value: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 }
  return json.access_token
}

export const googleSheetsStorage: StorageAdapter = {
  name: 'google-sheets',
  async save(lead) {
    const { sheetId, sheetTab } = config.google
    if (!sheetId || !config.google.clientEmail || !config.google.privateKey) {
      throw new Error('Google Sheets is not configured')
    }
    const token = await getGoogleAccessToken()
    const range = encodeURIComponent(`${sheetTab}!A1`)
    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append` +
      `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

    const res = await fetch(url, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ values: [leadToRow(lead)] }),
    })
    if (!res.ok) throw new Error(`Sheets append failed (${res.status}): ${await res.text()}`)
  },
}

/* ─── Airtable ───────────────────────────────────────────────────── */

export const airtableStorage: StorageAdapter = {
  name: 'airtable',
  async save(lead) {
    const { token, baseId, table } = config.airtable
    if (!token || !baseId) throw new Error('Airtable is not configured')
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: 'POST',
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          fields: Object.fromEntries(SHEET_COLUMNS.map((c, i) => [c, leadToRow(lead)[i]])),
        }),
      },
    )
    if (!res.ok) throw new Error(`Airtable insert failed (${res.status}): ${await res.text()}`)
  },
}

/* ─── Generic webhook ────────────────────────────────────────────── */

export const webhookStorage: StorageAdapter = {
  name: 'webhook',
  async save(lead) {
    if (!config.webhookUrl) throw new Error('LEAD_WEBHOOK_URL is not set')
    const res = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) throw new Error(`Webhook failed (${res.status})`)
  },
}

/** Console sink — for local development only, never a production destination. */
export const consoleStorage: StorageAdapter = {
  name: 'console',
  async save(lead) {
    console.log('[lead]', JSON.stringify({ id: lead.submissionId, email: lead.email, audience: lead.audience }))
  },
}

export const storageRegistry: Record<string, StorageAdapter> = {
  'google-sheets': googleSheetsStorage,
  airtable: airtableStorage,
  webhook: webhookStorage,
  console: consoleStorage,
}

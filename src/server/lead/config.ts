/**
 * Every environment-driven decision in the lead pipeline lives here.
 * Nothing in this file may be imported from client code.
 */

const env = (k: string) => process.env[k]?.trim() || ''
const envList = (k: string) =>
  env(k)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

export const config = {
  /** Comma-separated provider ids, tried in order. */
  storageProviders: envList('LEAD_STORAGE') || [],
  crmProvider: env('LEAD_CRM'),
  emailProvider: env('LEAD_EMAIL'),
  analyticsProviders: envList('LEAD_ANALYTICS'),

  adminEmails: envList('LEAD_ADMIN_EMAILS'),
  fromEmail: env('LEAD_FROM_EMAIL'),
  fromName: env('LEAD_FROM_NAME') || 'Urban Goodz',

  google: {
    sheetId: env('GOOGLE_SHEET_ID'),
    sheetTab: env('GOOGLE_SHEET_TAB') || 'Leads',
    clientEmail: env('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
    // Supports both raw PEM and the \n-escaped form env files usually hold.
    privateKey: env('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
  },

  hubspot: { token: env('HUBSPOT_ACCESS_TOKEN') },
  airtable: {
    token: env('AIRTABLE_TOKEN'),
    baseId: env('AIRTABLE_BASE_ID'),
    table: env('AIRTABLE_TABLE') || 'Leads',
  },

  resend: { apiKey: env('RESEND_API_KEY') },

  smtp: {
    host: env('SMTP_HOST'),
    port: Number(env('SMTP_PORT') || 587),
    user: env('SMTP_USERNAME'),
    pass: env('SMTP_PASSWORD'),
    /** tls = implicit TLS (port 465); starttls = upgrade on 587/25; none = plaintext. */
    encryption: (env('SMTP_ENCRYPTION') || 'starttls').toLowerCase(),
    /** Allow self-signed certs. Only for internal relays you control. */
    allowInsecureTls: env('SMTP_ALLOW_INSECURE_TLS') === 'true',
  },

  ga4: { measurementId: env('GA4_MEASUREMENT_ID'), apiSecret: env('GA4_API_SECRET') },

  webhookUrl: env('LEAD_WEBHOOK_URL'),

  /** Dead-letter directory. Only ever written when a provider is unreachable. */
  queueDir: env('LEAD_QUEUE_DIR') || '.queue',

  rateLimit: {
    max: Number(env('LEAD_RATE_LIMIT_MAX') || 5),
    windowMs: Number(env('LEAD_RATE_LIMIT_WINDOW_MS') || 10 * 60 * 1000),
  },

  retry: {
    attempts: Number(env('LEAD_RETRY_ATTEMPTS') || 3),
    baseDelayMs: Number(env('LEAD_RETRY_BASE_MS') || 400),
  },

  /** Store the submitter's IP. Off by default — switch on only where lawful. */
  storeIp: env('LEAD_STORE_IP') === 'true',
} as const

export type Config = typeof config

/** A one-line health summary, safe to log — never contains secret values. */
export function describeConfig() {
  return {
    storage: config.storageProviders.length ? config.storageProviders : ['(none — queue only)'],
    crm: config.crmProvider || '(none)',
    email: config.emailProvider || '(none)',
    analytics: config.analyticsProviders.length ? config.analyticsProviders : ['(none)'],
    adminEmails: config.adminEmails.length,
    googleSheetConfigured: Boolean(config.google.sheetId && config.google.clientEmail && config.google.privateKey),
    storeIp: config.storeIp,
  }
}

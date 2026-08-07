import { config } from '../config'
import type { EmailAdapter, Lead } from '../types'

/* ─── Providers ──────────────────────────────────────────────────── */

export const resendEmail: EmailAdapter = {
  name: 'resend',
  async send({ to, subject, html, replyTo }) {
    const key = config.resend.apiKey
    if (!key) throw new Error('RESEND_API_KEY is not set')
    if (!config.fromEmail) throw new Error('LEAD_FROM_EMAIL is not set')

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: `${config.fromName} <${config.fromEmail}>`,
        to: [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!res.ok) throw new Error(`Resend failed (${res.status}): ${await res.text()}`)
  },
}

/**
 * SMTP. Use this when mail already flows through your own relay (the same
 * host/credentials your other systems use) rather than a transactional API.
 */
let transporter: import('nodemailer').Transporter | null = null

async function getTransporter() {
  if (transporter) return transporter
  const { host, port, user, pass, encryption, allowInsecureTls } = config.smtp
  if (!host) throw new Error('SMTP_HOST is not set')

  const nodemailer = (await import('nodemailer')).default
  // cPanel-style panels label implicit TLS as "ssl"; treat it the same as "tls".
  const implicitTls = encryption === 'tls' || encryption === 'ssl' || port === 465
  transporter = nodemailer.createTransport({
    host,
    port,
    // Implicit TLS on 465; STARTTLS upgrade otherwise.
    secure: implicitTls,
    ...(user ? { auth: { user, pass } } : {}),
    ...(!implicitTls && encryption === 'starttls' ? { requireTLS: true } : {}),
    ...(allowInsecureTls ? { tls: { rejectUnauthorized: false } } : {}),
  })
  return transporter
}

export const smtpEmail: EmailAdapter = {
  name: 'smtp',
  async send({ to, subject, html, replyTo }) {
    if (!config.fromEmail) throw new Error('LEAD_FROM_EMAIL is not set')
    const tx = await getTransporter()
    await tx.sendMail({
      from: { name: config.fromName, address: config.fromEmail },
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    })
  },
}

/** Proves host/port/credentials before a real signup depends on them. */
export async function verifySmtp(): Promise<void> {
  const tx = await getTransporter()
  await tx.verify()
}

export const noopEmail: EmailAdapter = {
  name: 'none',
  async send({ to, subject }) {
    console.log(`[email:noop] would send "${subject}" to ${to}`)
  },
}

export const emailRegistry: Record<string, EmailAdapter> = {
  resend: resendEmail,
  smtp: smtpEmail,
  none: noopEmail,
}

/* ─── Templates ──────────────────────────────────────────────────── */

const SITE = 'https://www.urbangoodzdelivery.com'
const ORANGE = '#ED9914'
const INK = '#161616'
const PAPER = '#fdfbf7'
const MUTE = '#6b6459'

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const shell = (inner: string) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${PAPER};font-family:'Segoe UI',Arial,Helvetica,sans-serif;color:${INK};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e3d8c6;border-radius:20px;overflow:hidden;">
        ${inner}
      </table>
      <p style="max-width:600px;margin:20px auto 0;font-size:12px;line-height:1.6;color:${MUTE};text-align:center;">
        Urban Goodz · Houston, Texas<br>
        You received this because you signed up at
        <a href="${SITE}" style="color:${ORANGE};">urbangoodzdelivery.com</a>.
      </p>
    </td></tr>
  </table>
</body></html>`

const header = (title: string, sub: string) => `
  <tr><td style="background:${INK};padding:36px 36px 30px;">
    <p style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.5px;color:#ffffff;">
      Urban&nbsp;<span style="color:${ORANGE};">Goodz</span>
    </p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${ORANGE};">
      ${esc(sub)}
    </p>
    <h1 style="margin:26px 0 0;font-size:30px;line-height:1.15;font-weight:800;color:#ffffff;">${title}</h1>
  </td></tr>`

const button = (href: string, label: string) => `
  <a href="${href}" style="display:inline-block;background:${ORANGE};color:${INK};font-weight:700;font-size:15px;text-decoration:none;padding:14px 28px;border-radius:999px;">${esc(label)}</a>`

export function confirmationEmail(lead: Lead) {
  const steps = [
    ['We’ve saved your spot', 'You’re on the early-access list for your city.'],
    ['We’ll reach out personally', 'A real person reviews every signup — no automated queue.'],
    ['You’ll hear first', 'The moment Urban Goodz opens where you are, you’ll know before anyone else.'],
  ]
  return shell(`
    ${header(`Welcome to Urban Goodz, ${esc(lead.firstName || 'neighbor')}.`, 'Early access confirmed')}
    <tr><td style="padding:36px;">
      <p style="margin:0 0 20px;font-size:17px;line-height:1.65;">
        Thank you for joining. You’re now part of something bigger than another delivery app.
      </p>
      <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:${MUTE};">
        Urban Goodz exists to create economic opportunity. Local businesses built our communities,
        and technology left too many of them behind. We’re building the layer that hands that
        advantage back — so the shop on your corner can compete with anyone.
      </p>

      <div style="background:${PAPER};border:1px solid #e3d8c6;border-radius:16px;padding:8px 24px;margin:0 0 28px;">
        <p style="margin:18px 0 12px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ORANGE};">What happens next</p>
        ${steps
          .map(
            ([t, b], i) => `
          <div style="padding:12px 0;${i < steps.length - 1 ? 'border-bottom:1px solid #eee5d6;' : ''}">
            <p style="margin:0;font-size:15px;font-weight:700;">${esc(t)}</p>
            <p style="margin:4px 0 0;font-size:14px;line-height:1.6;color:${MUTE};">${esc(b)}</p>
          </div>`,
          )
          .join('')}
      </div>

      ${
        lead.interestList.length
          ? `<p style="margin:0 0 28px;font-size:14px;color:${MUTE};">
               <b style="color:${INK};">You told us you're interested in:</b> ${esc(lead.interestList.join(', '))}
             </p>`
          : ''
      }

      <p style="margin:0 0 8px;">${button(SITE, 'Explore Urban Goodz')}</p>
      <p style="margin:18px 0 0;font-size:13px;color:${MUTE};">
        App Store and Google Play links land here the day we publish — you’ll get them by email first.
      </p>

      <hr style="border:none;border-top:1px solid #eee5d6;margin:30px 0;">
      <p style="margin:0 0 10px;font-size:13px;color:${MUTE};">Follow along</p>
      <p style="margin:0;font-size:14px;">
        <a href="https://www.instagram.com/urbaneatzdelivery" style="color:${ORANGE};text-decoration:none;font-weight:600;">Instagram</a>
        &nbsp;·&nbsp;
        <a href="https://www.facebook.com/UrbanEatzDelivery" style="color:${ORANGE};text-decoration:none;font-weight:600;">Facebook</a>
        &nbsp;·&nbsp;
        <a href="https://www.linkedin.com/in/dscottgood" style="color:${ORANGE};text-decoration:none;font-weight:600;">LinkedIn</a>
        &nbsp;·&nbsp;
        <a href="${SITE}" style="color:${ORANGE};text-decoration:none;font-weight:600;">Website</a>
      </p>
      <p style="margin:22px 0 0;font-size:12px;line-height:1.6;color:${MUTE};">
        <!-- Referral program placeholder: swap for a personal invite link when the program launches. -->
        Know a local business that should be on Urban Goodz? Reply to this email and tell us about them.
      </p>
    </td></tr>`)
}

export function adminEmail(lead: Lead) {
  const rows: [string, string][] = [
    ['Name', lead.fullName],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['City', [lead.city, lead.state].filter(Boolean).join(', ')],
    ['Timestamp', lead.timestamp],
    ['Interests', lead.interestList.join(', ')],
    ['Audience', lead.audience],
    ['Referral source', lead.referralSource],
    ['UTM source', lead.utmSource],
    ['UTM medium', lead.utmMedium],
    ['UTM campaign', lead.utmCampaign],
    ['Landing page', lead.landingPage],
    ['Browser', lead.browser],
    ['Device', lead.device],
    ['IP', lead.ip],
    ['Submission ID', lead.submissionId],
    ['Notes', lead.notes],
  ]
  return shell(`
    ${header('New Urban Goodz signup', lead.audience)}
    <tr><td style="padding:30px 36px 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:9px 12px 9px 0;color:${MUTE};white-space:nowrap;vertical-align:top;width:150px;">${esc(k)}</td>
            <td style="padding:9px 0;font-weight:600;word-break:break-word;">${esc(v)}</td>
          </tr>`,
          )
          .join('')}
      </table>
      <p style="margin:26px 0 0;">${button(`mailto:${lead.email}`, 'Reply to this lead')}</p>
    </td></tr>`)
}

export function failureEmail(lead: Lead, error: string) {
  return shell(`
    ${header('Lead capture needs attention', 'Action required')}
    <tr><td style="padding:30px 36px 36px;">
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
        A signup could not be written to any storage provider or to the local queue.
        <b>The full lead is included below — copy it somewhere safe.</b>
      </p>
      <p style="margin:0 0 20px;padding:14px;background:#fff4e2;border:1px solid ${ORANGE};border-radius:12px;font-size:13px;color:${INK};">
        ${esc(error)}
      </p>
      <pre style="margin:0;padding:16px;background:${PAPER};border:1px solid #e3d8c6;border-radius:12px;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-word;">${esc(JSON.stringify(lead, null, 2))}</pre>
    </td></tr>`)
}

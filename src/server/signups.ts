import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { signupSchema } from '~/lib/signup'
import { processLead } from './lead/pipeline'

export type SignupResult = { ok: true; id: string } | { ok: false; error: string }

/** First public IP in the proxy chain, falling back to the socket address. */
function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('fly-client-ip') ||
    ''
  )
}

/**
 * The only entry point the frontend knows about. Its signature is deliberately
 * stable: swapping storage, CRM or email providers never changes this contract.
 */
export const submitSignup = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => signupSchema.parse(data))
  .handler(async ({ data }): Promise<SignupResult> => {
    const request = getRequest()
    const headers = request?.headers ?? new Headers()

    const result = await processLead(
      {
        audience: data.audience,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        city: data.city,
        zip: data.zip || undefined,
        referralSource: data.referralSource || undefined,
        interests: data.interests,
        // `help` is the Samaritan capability list; it belongs in the notes column.
        message: [data.message, data.help?.length ? `Can help with: ${data.help.join(', ')}` : '']
          .filter(Boolean)
          .join(' — ') || undefined,
        company: data.company,
        context: data.context,
      },
      { ip: clientIp(headers), userAgent: headers.get('user-agent') ?? '' },
    )

    if (!result.ok) return { ok: false, error: result.error }
    return { ok: true, id: result.submissionId }
  })

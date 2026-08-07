import { useEffect, useRef, useState } from 'react'
import { Icon } from '../icons'
import { signupSchema, type Audience, type AudienceConfig, type Field } from '~/lib/signup'
import { submitSignup } from '~/server/signups'
import { site } from '~/lib/site'
import { Events, audienceEvent, track } from '~/lib/analytics'
import { captureAttribution, getAttribution } from '~/lib/attribution'

type Values = Record<string, string | string[] | boolean>
type Errors = Record<string, string>

const blank = (audience: Audience): Values => ({
  audience,
  fullName: '',
  email: '',
  phone: '',
  city: '',
  businessName: '',
  category: '',
  vehicleType: '',
  help: [],
  message: '',
  consent: false,
  company: '',
})

const inputClass =
  'w-full rounded-2xl border border-line bg-white px-4 py-3 text-[0.97rem] text-ug-black placeholder:text-ug-black/35 transition-colors focus:border-seasoning focus:outline-none'

/** Falls back to a pre-filled email when the server route is unreachable. */
function mailtoFallback(cfg: AudienceConfig, v: Values) {
  const lines = Object.entries(v)
    .filter(([k, val]) => !['audience', 'consent', 'company'].includes(k) && val !== '' && (!Array.isArray(val) || val.length))
    .map(([k, val]) => `${k}: ${Array.isArray(val) ? val.join(', ') : val}`)
  const subject = encodeURIComponent(`${cfg.tab} — ${v.fullName}`)
  const body = encodeURIComponent(lines.join('\n'))
  return `mailto:${site.email}?subject=${subject}&body=${body}`
}

export function SignupForm({ cfg }: { cfg: AudienceConfig }) {
  const [values, setValues] = useState<Values>(() => blank(cfg.id))
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
  const [failure, setFailure] = useState('')
  const mountedAt = useRef(0)
  const startedRef = useRef(false)

  useEffect(() => {
    captureAttribution()
    mountedAt.current = Date.now()
  }, [])

  const set = (name: string, value: string | string[] | boolean) => {
    // "Signup Started" fires once, on the first real interaction.
    if (!startedRef.current) {
      startedRef.current = true
      track(Events.signupStarted, { audience: cfg.id })
    }
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => (e[name] ? { ...e, [name]: '' } : e))
  }

  const toggleHelp = (option: string) => {
    const current = (values.help as string[]) ?? []
    set('help', current.includes(option) ? current.filter((h) => h !== option) : [...current, option])
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const attribution = getAttribution()
    const parsed = signupSchema.safeParse({
      ...values,
      audience: cfg.id,
      context: {
        ...attribution,
        elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : undefined,
      },
    })
    if (!parsed.success) {
      const next: Errors = {}
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? '')
        if (key && !next[key]) next[key] = issue.message
      }
      setErrors(next)
      const first = document.querySelector<HTMLElement>(`[data-field="${Object.keys(next)[0]}"]`)
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      first?.focus?.()
      return
    }

    setState('sending')
    try {
      const res = await submitSignup({ data: parsed.data })
      if (res.ok) {
        track(Events.signupCompleted, { audience: cfg.id })
        const interest = audienceEvent[cfg.id]
        if (interest) track(interest, { audience: cfg.id })
        if (cfg.id === 'app') track(Events.waitlistJoined)
        setState('done')
      } else {
        setFailure(res.error)
        setState('failed')
      }
    } catch {
      setFailure('')
      setState('failed')
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-[2rem] border border-line bg-white p-10 text-center shadow-card md:p-14">
        <span className="mx-auto grid size-16 place-items-center rounded-full grad-seasoning text-ug-black">
          <Icon name="check" size={30} />
        </span>
        <h3 className="mt-7 font-display text-3xl font-bold text-ug-black">{cfg.successTitle}</h3>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ug-black/65">
          {cfg.successBody}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(blank(cfg.id))
            setState('idle')
          }}
          className="btn btn-ghost mt-9 !text-ug-black/70"
        >
          Submit another
        </button>
      </div>
    )
  }

  const renderField = (f: Field) => {
    const err = errors[f.name as string]
    const describedBy = err ? `${String(f.name)}-error` : undefined

    const label = (
      <label htmlFor={String(f.name)} className="block text-sm font-semibold text-ug-black">
        {f.kind !== 'checks' && f.kind !== 'textarea' && f.required && (
          <span className="text-seasoning-600">* </span>
        )}
        {f.label}
      </label>
    )

    const error = err && (
      <p id={describedBy} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-seasoning-700">
        <Icon name="close" size={12} />
        {err}
      </p>
    )

    if (f.kind === 'checks') {
      const chosen = (values.help as string[]) ?? []
      return (
        <fieldset key={f.name} className="sm:col-span-2" data-field={f.name} tabIndex={-1}>
          <legend className="text-sm font-semibold text-ug-black">
            <span className="text-seasoning-600">* </span>
            {f.label}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {f.options.map((o) => {
              const on = chosen.includes(o)
              return (
                <button
                  key={o}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleHelp(o)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    on
                      ? 'border-seasoning bg-seasoning/12 text-ug-black'
                      : 'border-line bg-white text-ug-black/65 hover:border-seasoning/50'
                  }`}
                >
                  <span
                    className={`grid size-4 place-items-center rounded-full ${
                      on ? 'bg-seasoning text-ug-black' : 'bg-ug-black/8'
                    }`}
                  >
                    {on && <Icon name="check" size={9} />}
                  </span>
                  {o}
                </button>
              )
            })}
          </div>
          {error}
        </fieldset>
      )
    }

    if (f.kind === 'textarea') {
      return (
        <div key={f.name} className="sm:col-span-2">
          {label}
          <textarea
            id={String(f.name)}
            name={String(f.name)}
            rows={4}
            value={String(values[f.name] ?? '')}
            onChange={(e) => set(String(f.name), e.target.value)}
            placeholder={f.placeholder}
            data-field={f.name}
            aria-describedby={describedBy}
            className={`${inputClass} mt-2 resize-y`}
          />
          {error}
        </div>
      )
    }

    if (f.kind === 'select') {
      return (
        <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
          {label}
          <select
            id={String(f.name)}
            name={String(f.name)}
            value={String(values[f.name] ?? '')}
            onChange={(e) => set(String(f.name), e.target.value)}
            data-field={f.name}
            aria-invalid={!!err}
            aria-describedby={describedBy}
            className={`${inputClass} mt-2`}
          >
            <option value="">Select…</option>
            {f.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {error}
        </div>
      )
    }

    return (
      <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
        {label}
        <input
          id={String(f.name)}
          name={String(f.name)}
          type={f.type ?? 'text'}
          value={String(values[f.name] ?? '')}
          onChange={(e) => set(String(f.name), e.target.value)}
          placeholder={f.placeholder}
          autoComplete={f.autoComplete}
          data-field={f.name}
          aria-invalid={!!err}
          aria-describedby={describedBy}
          className={`${inputClass} mt-2`}
        />
        {error}
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[2rem] border border-line bg-white/85 p-7 shadow-card md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">{cfg.fields.map(renderField)}</div>

      {/* honeypot — hidden from people, catnip for bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={String(values.company ?? '')}
          onChange={(e) => set('company', e.target.value)}
        />
      </div>

      <div className="mt-7" data-field="consent" tabIndex={-1}>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={values.consent === true}
            onChange={(e) => set('consent', e.target.checked)}
            className="mt-1 size-4 shrink-0 accent-[#ed9914]"
          />
          <span className="text-sm leading-relaxed text-ug-black/65">
            I agree that Urban Goodz can contact me about this request. We never sell your
            information.
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-seasoning-700">
            <Icon name="close" size={12} />
            {errors.consent}
          </p>
        )}
      </div>

      {state === 'failed' && (
        <div role="alert" className="mt-6 rounded-2xl border border-seasoning/40 bg-seasoning/8 p-4">
          <p className="text-sm font-semibold text-ug-black">
            {failure || 'We couldn’t submit that from here.'}
          </p>
          <p className="mt-1 text-sm text-ug-black/65">
            Your details are safe in the form —{' '}
            <a
              href={mailtoFallback(cfg, values)}
              className="font-semibold text-seasoning-600 underline underline-offset-4"
            >
              send them to us by email instead
            </a>
            , or write to {site.email}.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === 'sending' ? (
          <>
            <Icon name="clock" size={18} />
            Sending…
          </>
        ) : (
          <>
            {cfg.submitLabel}
            <Icon name="arrow-up-right" size={18} />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-ug-black/45">
        Takes under a minute. No obligation, and nothing to pay.
      </p>
    </form>
  )
}

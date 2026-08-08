import { Link, createFileRoute } from '@tanstack/react-router'
import { Icon } from '~/components/icons'
import { PageHero } from '~/components/PageHero'
import { Reveal } from '~/components/primitives'
import { SignupForm } from '~/components/signup/SignupForm'
import {
  audienceConfig,
  audiences,
  businessCategories,
  isAudience,
  vehicleTypes,
  type Audience,
} from '~/lib/signup'
import { site } from '~/lib/site'
import { seo } from '~/utils/seo'

type JoinSearch = { as: Audience; category?: string; vehicleType?: string }

export const Route = createFileRoute('/join')({
  validateSearch: (search: Record<string, unknown>): JoinSearch => ({
    as: isAudience(search.as) ? search.as : 'app',
    // Lets a persona-specific link (e.g. "Creator" -> business + category)
    // pre-fill the matching dropdown. Only known option strings are accepted.
    category:
      typeof search.category === 'string' && businessCategories.includes(search.category)
        ? search.category
        : undefined,
    vehicleType:
      typeof search.vehicleType === 'string' && vehicleTypes.includes(search.vehicleType)
        ? search.vehicleType
        : undefined,
  }),
  head: () => {
    const s = seo({
      title: 'Join Urban Goodz — app waitlist, business, driver & Samaritan signup',
      description:
        'Join the Urban Goodz app waitlist, list your local business, apply to drive, or become a verified Goodz Samaritan.',
      path: '/join',
      keywords: [
        'Urban Goodz signup',
        'app waitlist',
        'list my business',
        'become a driver',
        'Goodz Samaritan application',
      ],
    })
    return { meta: s.meta, links: s.links }
  },
  component: Join,
})

function Join() {
  const { as, category, vehicleType } = Route.useSearch()
  const cfg = audienceConfig[as]

  return (
    <>
      <PageHero
        eyebrow="Join Urban Goodz"
        title={
          <>
            One ecosystem. <span className="text-grad">Pick your door.</span>
          </>
        }
        lede="Customers, business owners, drivers and Goodz Samaritans all start here. Every path is free to join."
      />

      <section className="surface-paper py-16 md:py-24">
        <div className="container-ug">
          {/* ── Audience switcher ─────────────────────────────────── */}
          <Reveal>
            <div
              role="tablist"
              aria-label="What are you signing up for?"
              className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2.5"
            >
              {audiences.map((id) => {
                const a = audienceConfig[id]
                const active = id === as
                return (
                  <Link
                    key={id}
                    to="/join"
                    search={{ as: id }}
                    role="tab"
                    aria-selected={active}
                    className={`lift flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? 'border-transparent bg-ug-black text-ink-on-dark shadow-card'
                        : 'border-line bg-white/70 text-ug-black/70 hover:border-seasoning/50'
                    }`}
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full ${
                        active ? 'grad-seasoning text-ug-black' : 'bg-ug-black/6 text-ug-black/55'
                      }`}
                    >
                      <Icon name={a.icon} size={13} />
                    </span>
                    {a.tab}
                  </Link>
                )
              })}
            </div>
          </Reveal>

          {/* ── The form + its pitch ──────────────────────────────── */}
          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal key={`copy-${as}`}>
              <span className="eyebrow">{cfg.eyebrow}</span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ug-black md:text-4xl">
                {cfg.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ug-black/70">{cfg.lede}</p>

              <ul className="mt-8 space-y-3">
                {cfg.perks.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm font-medium text-ug-black/75">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-seasoning/15 text-seasoning-600">
                      <Icon name="check" size={12} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              {/* ── Digital employee greeting callout ──────────────── */}
              {as === 'app' && (
                <div className="mt-8 flex items-center gap-3.5 rounded-2xl border border-seasoning/30 bg-seasoning/10 p-4">
                  <img
                    src="/images/ai/ebony-avatar.jpg"
                    alt="Monique"
                    className="size-10 rounded-full object-cover ring-2 ring-seasoning shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-seasoning-700 uppercase tracking-wider">Monique · Concierge</p>
                    <p className="text-sm font-medium text-ug-black/85">
                      "I’ll welcome you to the waitlist and give you first dibs on exclusive local drops in your zip code."
                    </p>
                  </div>
                </div>
              )}
              {as === 'business' && (
                <div className="mt-8 flex items-center gap-3.5 rounded-2xl border border-line-on-dark bg-ug-black/90 p-4 text-ink-on-dark shadow-card">
                  <img
                    src="/images/ai/skylar-avatar.jpg"
                    alt="Skylar"
                    className="size-10 rounded-full object-cover ring-2 ring-dijon shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-seasoning-300 uppercase tracking-wider">Skylar · Chief of Staff</p>
                    <p className="text-sm font-medium text-mute-on-dark">
                      "I’ll assist with your zero-cost merchant setup, catalog upload, and store analytics activation."
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 rounded-2xl border border-line bg-cream/50 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-ug-black">
                  <Icon name="shield" size={15} className="text-seasoning-600" />
                  Prefer to talk to a person?
                </p>
                <p className="mt-1.5 text-sm text-ug-black/65">
                  Email{' '}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-seasoning-700 underline underline-offset-4"
                  >
                    {site.email}
                  </a>{' '}
                  or call{' '}
                  <a
                    href={`tel:${site.phone.replace(/[^0-9]/g, '')}`}
                    className="font-semibold text-seasoning-700 underline underline-offset-4"
                  >
                    {site.phone}
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal key={`form-${as}-${category ?? ''}-${vehicleType ?? ''}`} delay={100}>
              {/* remounts on audience/prefill change so state never leaks between forms */}
              <SignupForm key={`${as}-${category ?? ''}-${vehicleType ?? ''}`} cfg={cfg} initial={{ category, vehicleType }} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

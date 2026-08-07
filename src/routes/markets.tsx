import { createFileRoute } from '@tanstack/react-router'
import { CtaBand } from '~/components/CtaBand'
import { Icon } from '~/components/icons'
import { MapLegend, MarketsMap } from '~/components/MarketsMap'
import { PageHero } from '~/components/PageHero'
import { Reveal, SectionHeader } from '~/components/primitives'
import { activeMarkets, expansionMarkets, futureVision, markets } from '~/lib/markets'
import { site } from '~/lib/site'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/markets')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Markets — Urban Goodz',
        description:
          'Urban Goodz is live across 15 markets in the U.S. — Houston, Dallas, Austin, Atlanta, Los Angeles, Miami, New York City and more — with expansion cities on the roadmap.',
        path: '/markets',
        keywords: ['Urban Goodz markets', 'Urban Goodz locations', 'local commerce expansion'],
      }).meta,
    ],
  }),
  component: Markets,
})

function Markets() {
  const houston = markets.find((m) => m.slug === 'houston')
  const rest = activeMarkets.filter((m) => m.slug !== 'houston')
  return (
    <>
      <PageHero
        eyebrow="Markets"
        title={
          <>
            Built in Houston. <span className="text-grad">Live across the country.</span>
          </>
        }
        lede="From our 2020 launch in Houston, Urban Goodz now runs live across 15 U.S. markets — and keeps growing, city by city."
      />

      {/* ── Map ─────────────────────────────────────────────────── */}
      <section className="surface-ink pb-8">
        <div className="container-ug">
          <Reveal delay={120} className="rounded-[2rem] border border-line-on-dark bg-ink-800/50 p-6 md:p-10">
            <MarketsMap onDark className="max-w-3xl mx-auto" />
            <div className="mt-8 flex justify-center">
              <MapLegend onDark />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Live markets ────────────────────────────────────────── */}
      <section className="surface-ink pb-20 md:pb-28">
        <div className="container-ug">
          <SectionHeader
            onDark
            eyebrow="Live Markets"
            title={
              <>
                15 markets, <span className="text-grad">one network.</span>
              </>
            }
            lede="Every market below is live on the Urban Goodz platform today — real zones powering local commerce, delivery, services and logistics."
          />

          {houston && (
            <Reveal delay={100}>
              <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-line-on-dark bg-ink-800/50 p-8 md:p-12">
                <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
                  <div>
                    <p className="flex items-center gap-2.5 font-display text-xl font-bold text-ink-on-dark">
                      <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seasoning opacity-75" />
                        <span className="relative inline-flex size-3 rounded-full bg-seasoning" />
                      </span>
                      Our home base
                    </p>
                    <p className="mt-4 leading-relaxed text-mute-on-dark">{houston.blurb}</p>
                    <p className="mt-4 text-sm text-mute-on-dark">
                      {site.customers} customers served · {houston.services.length} live capabilities
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold uppercase tracking-widest text-seasoning-300">
                      Live here today
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {houston.services.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-line-on-dark bg-ink-800/70 px-3 py-1.5 text-sm text-ink-on-dark"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((m, i) => (
              <Reveal key={m.slug} delay={Math.min(i * 50, 300)} as="article">
                <div className="lift h-full rounded-3xl border border-line-on-dark bg-ink-800/50 p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-ink-on-dark">{m.name}</h3>
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-seasoning/12 px-2.5 py-1 text-[11px] font-semibold text-seasoning-300">
                      <Icon name="check" size={11} /> Live
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-mute-on-dark">{m.region}</p>
                  <p className="mt-3 text-sm leading-relaxed text-mute-on-dark">{m.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {m.services.slice(0, 3).map((s) => (
                      <li key={s} className="rounded-full bg-ink-800/70 px-2.5 py-1 text-[11px] font-medium text-ink-on-dark">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expansion grid ──────────────────────────────────────── */}
      <section className="border-t border-line bg-cream/40 py-20 md:py-28">
        <div className="container-ug">
          <SectionHeader
            eyebrow="On the Roadmap"
            title={
              <>
                Next up: <span className="text-grad-dark">America’s biggest cities.</span>
              </>
            }
            lede="Planned expansion markets in priority order — where local commerce deserves the same technology already live in 15 markets."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expansionMarkets.map((m, i) => (
              <Reveal key={m.slug} delay={Math.min(i * 50, 300)} as="article">
                <div className="lift h-full rounded-3xl border border-line bg-white/70 p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-ug-black">{m.name}</h3>
                    <span className="flex items-center gap-1.5 rounded-full bg-seasoning/12 px-2.5 py-1 text-[11px] font-semibold text-seasoning-600">
                      <Icon name="clock" size={11} /> Planned
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ug-black/55">{m.region}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ug-black/65">{m.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {m.services.slice(0, 3).map((s) => (
                      <li key={s} className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-medium text-ug-black/70">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Future vision ───────────────────────────────────────── */}
      <section className="surface-paper py-20 md:py-28">
        <div className="container-ug">
          <SectionHeader
            eyebrow="Future Vision"
            title={
              <>
                Beyond the U.S. — <span className="text-grad-dark">a global bridge.</span>
              </>
            }
            lede="Long-term, Urban Goodz sees itself connecting diaspora communities and underserved markets across the world."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {futureVision.map((f, i) => (
              <Reveal key={f.region} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-white/70 p-5">
                  <h3 className="font-display font-bold text-ug-black">{f.region}</h3>
                  <p className="mt-1 text-sm text-ug-black/60">{f.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

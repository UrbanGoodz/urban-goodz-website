import { createFileRoute } from '@tanstack/react-router'
import { CtaBand } from '~/components/CtaBand'
import { Icon } from '~/components/icons'
import { PageHero } from '~/components/PageHero'
import { Reveal, SectionHeader, Stat } from '~/components/primitives'
import { milestones, pressItems, traction } from '~/lib/press'
import { site } from '~/lib/site'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/press')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Press & Recognition — Urban Goodz',
        description:
          'Backed by the Northwestern Mutual Black Founder Accelerator and gener8tor, and featured in the Houston Business Journal, Houston Chronicle, GoDaddy and more.',
        path: '/press',
        keywords: ['Urban Goodz press', 'D’Andre Good news', 'Urban Goodz awards', 'gener8tor accelerator'],
      }).meta,
    ],
  }),
  component: Press,
})

function Press() {
  const spotlight = pressItems.filter((p) => p.spotlight)
  const rest = pressItems.filter((p) => !p.spotlight)
  return (
    <>
      <PageHero
        eyebrow="Press & Recognition"
        title={
          <>
            Featured, backed and <span className="text-grad">believed in.</span>
          </>
        }
        lede="From the Houston Business Journal to the Northwestern Mutual Black Founder Accelerator — the coverage and backing behind the mission."
      />

      {/* ── Traction ────────────────────────────────────────────── */}
      <section className="surface-paper pb-4 pt-8">
        <div className="container-ug grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {traction.map((t, i) => (
            <Stat key={t.label} value={t.value} label={t.label} />
          ))}
        </div>
      </section>

      {/* ── Spotlight ───────────────────────────────────────────── */}
      <section className="surface-paper py-20 md:py-28">
        <div className="container-ug">
          <SectionHeader
            eyebrow="Headlines"
            title={
              <>
                The stories that <span className="text-grad-dark">matter most.</span>
              </>
            }
          />
          <div className="mt-14 space-y-5">
            {spotlight.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 60, 240)}>
                <article className="lift flex flex-col gap-6 rounded-3xl border border-line bg-white/70 p-8 md:flex-row md:items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-base font-bold text-ug-black">{p.source}</p>
                      <span className="rounded-full bg-seasoning/12 px-2.5 py-1 text-[11px] font-semibold text-seasoning-600">
                        {p.kindLabel}
                      </span>
                      {p.sourceNote && (
                        <span className="rounded-full bg-dijon/20 px-2.5 py-1 text-[11px] font-semibold text-seasoning-600">
                          {p.sourceNote}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-ug-black">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ug-black/65">{p.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <span className="text-xs font-medium text-ug-black/45">{p.date}</span>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-seasoning-600 transition hover:text-seasoning-700"
                        >
                          Read the coverage
                          <Icon name="arrow-up-right" size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full press list ─────────────────────────────────────── */}
      <section className="border-t border-line bg-cream/40 py-20 md:py-28">
        <div className="container-ug">
          <SectionHeader
            eyebrow="All Coverage"
            title={
              <>
                Every feature, interview <span className="text-grad-dark">and profile.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 50, 300)} as="article">
                <div className="lift flex h-full flex-col rounded-3xl border border-line bg-white/70 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-sm font-bold text-ug-black">{p.source}</p>
                    <span className="shrink-0 rounded-full bg-seasoning/12 px-2.5 py-1 text-[11px] font-semibold text-seasoning-600">
                      {p.kindLabel}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ug-black">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ug-black/60">{p.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-xs font-medium text-ug-black/45">{p.date}</span>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read coverage from ${p.source}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-seasoning-600 transition hover:text-seasoning-700"
                      >
                        Read
                        <Icon name="arrow-up-right" size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones ──────────────────────────────────────────── */}
      <section className="surface-paper py-20 md:py-28">
        <div className="container-ug">
          <SectionHeader
            eyebrow="Milestones"
            title={
              <>
                From launch to <span className="text-grad-dark">now.</span>
              </>
            }
          />
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-line" />
            <ol className="space-y-8">
              {milestones.map((m, i) => (
                <Reveal key={`${m.year}-${m.title}`} delay={i * 60} as="li" className="relative pl-14">
                  <span className="absolute left-0 top-1 grid size-10 place-items-center rounded-full border border-seasoning/40 bg-paper text-xs font-bold text-seasoning-600 shadow-card">
                    {m.year === 'Today' ? <Icon name="spark" size={16} /> : m.year.replace('–', '\n')}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ug-black">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ug-black/65">{m.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '~/components/icons'
import { CtaBand } from '~/components/CtaBand'
import { Hero } from '~/components/Hero'
import { Reveal, SectionHeader, Stat } from '~/components/primitives'
import { AiSection } from '~/components/home/AiSection'
import { AppExperience } from '~/components/home/AppExperience'
import { CampaignStrip } from '~/components/home/CampaignStrip'
import { DownloadSection } from '~/components/home/DownloadSection'
import { EcosystemGrid } from '~/components/home/Ecosystem'
import { MarketsSection } from '~/components/home/MarketsSection'
import { PressStrip } from '~/components/home/PressStrip'
import {
  AiVisual,
  BusinessVisual,
  DriverVisual,
  FashionVisual,
  MarketplaceVisual,
  MedicalVisual,
} from '~/components/home/FeatureVisuals'
import { milestones, pressItems, traction } from '~/lib/press'
import { site } from '~/lib/site'
import { businessStats, driverStats, featureHighlights } from '~/lib/platform'
import { jsonLd, seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: `${site.name} — ${site.tagline}`,
        description: site.description,
        path: '/',
      }).meta,
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: jsonLd(
          {
            '@type': 'WebSite',
            name: site.name,
            url: site.url,
            description: site.description,
            publisher: { '@type': 'Organization', name: site.name },
          },
          'website',
        ),
      },
    ],
  }),
  component: Home,
})

const pillars = [
  {
    icon: 'spark' as const,
    title: 'Enterprise-grade for everyone',
    body: 'Local businesses deserve the same technology the giants get — AI, analytics, logistics — at a price a neighborhood shop can afford.',
    img: '/images/assets/hero_enterprise_art.jpg',
  },
  {
    icon: 'market' as const,
    title: 'A modern digital Black Wall Street',
    body: 'A commerce ecosystem where Black-owned and underrepresented businesses can compete, grow and thrive on a level playing field.',
    img: '/images/assets/hero_black_wall_street_art.jpg',
  },
  {
    icon: 'community' as const,
    title: 'Opportunity in every zip code',
    body: 'Jobs for drivers, customers for merchants, income for creators and services for communities that big platforms leave behind.',
    img: '/images/assets/hero_opportunity_art.jpg',
  },
]

const featureVisuals: Record<string, React.FC> = {
  marketplace: MarketplaceVisual,
  ai: AiVisual,
  'fashion-fit': FashionVisual,
  'medical-courier': MedicalVisual,
  'business-platform': BusinessVisual,
  drivers: DriverVisual,
}

function Home() {
  return (
    <>
      <Hero />
      <PressStrip />

      {/* ── Mission ─────────────────────────────────────────────── */}
      <section className="surface-paper py-20 md:py-28">
        <div className="container-ug">
          <SectionHeader
            eyebrow="Our Mission"
            title={
              <>
                We exist to create <span className="text-grad-dark">economic opportunity.</span>
              </>
            }
            lede="Local businesses deserve enterprise-grade technology. Urban Goodz is building a modern digital Black Wall Street — helping businesses, especially those owned by people from underrepresented communities, compete, grow and thrive through technology."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="lift group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white/80 shadow-card">
                  <div className="relative h-44 w-full overflow-hidden bg-cream">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-4 bottom-4 grid size-10 place-items-center rounded-2xl grad-seasoning text-ug-black shadow-card">
                      <Icon name={p.icon} size={20} />
                    </span>
                  </div>
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ug-black">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ug-black/65">{p.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ───────────────────────────────────────────── */}
      <section className="surface-paper border-t border-line bg-cream/40 py-20 md:py-28">
        <div className="container-ug grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Our Story"
              title={
                <>
                  From one Houston idea to a <span className="text-grad-dark">nationwide platform.</span>
                </>
              }
              lede="Urban Goodz didn’t start as a tech company. It started with a simple belief about who deserves access — and a driver’s seat in Houston."
            />
            <Reveal delay={120}>
              <div className="mt-8 rounded-3xl border border-line bg-white p-7">
                <p className="font-display text-lg font-semibold text-ug-black">{site.founder}</p>
                <p className="text-sm text-ug-black/55">{site.founderRole} & Founder</p>
                <blockquote className="mt-4 border-l-2 border-seasoning pl-4 text-ink-700 italic">
                  “We built Urban Goodz because we believe local businesses shouldn’t have to choose
                  between their community and their future. Technology should be on their side.”
                </blockquote>
              </div>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {traction.slice(0, 4).map((t) => (
                <Stat key={t.label} value={t.value} label={t.label} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-line" />
            <ol className="space-y-8">
              {milestones.map((m, i) => (
                <Reveal key={`${m.year}-${m.title}`} delay={i * 70} as="li" className="relative pl-14">
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

      <CampaignStrip />

      <AppExperience />

      {/* ── Platform Overview ───────────────────────────────────── */}
      <section className="surface-paper py-20 md:py-28">
        <div className="container-ug">
          <SectionHeader
            eyebrow="Platform"
            title={
              <>
                Much more than delivery. <span className="text-grad-dark">A whole economy.</span>
              </>
            }
            lede="Fifteen capabilities — shopping, restaurants, fashion, healthcare, freight, creators, community, business tools and AI — moving through one intelligent ecosystem."
          />
          <div className="mt-14">
            <EcosystemGrid />
          </div>
        </div>
      </section>

      {/* ── Feature highlights ──────────────────────────────────── */}
      <section className="border-t border-line bg-cream/40 py-20 md:py-28">
        <div className="container-ug space-y-20 md:space-y-28">
          {featureHighlights.map((f, i) => {
            const Visual = featureVisuals[f.id]
            const reversed = i % 2 === 1
            return (
              <div key={f.id} className={`grid items-center gap-12 lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Reveal>
                  <span className="eyebrow">{f.eyebrow}</span>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ug-black md:text-4xl">
                    {f.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-ug-black/70">{f.body}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm font-medium text-ug-black/80">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-seasoning/15 text-seasoning-600">
                          <Icon name="check" size={12} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={120} className="mx-auto w-full max-w-md">
                  <Visual />
                </Reveal>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Business + Driver stats bands ───────────────────────── */}
      <section className="surface-paper py-20 md:py-24">
        <div className="container-ug grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl grad-canvas border border-line p-8">
              <span className="inline-grid size-11 place-items-center rounded-2xl bg-ug-black text-ink-on-dark">
                <Icon name="business" size={22} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-ug-black">Built for business owners</h3>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {businessStats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-bold text-grad-dark">{s.value}</p>
                    <p className="mt-1 text-sm text-ug-black/65">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl border border-line bg-ink-800 p-8 text-ink-on-dark">
              <span className="inline-grid size-11 place-items-center rounded-2xl grad-seasoning text-ug-black">
                <Icon name="drivers" size={22} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">Built for drivers</h3>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {driverStats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-bold text-seasoning-300">{s.value}</p>
                    <p className="mt-1 text-sm text-mute-on-dark">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Awards strip ────────────────────────────────────────── */}
      <section className="surface-paper pb-20 md:pb-28">
        <div className="container-ug">
          <SectionHeader
            eyebrow="Awards & Recognition"
            title={
              <>
                Backed, featured and <span className="text-grad-dark">believed in.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pressItems.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 60, 300)}>
                <article className="lift h-full rounded-3xl border border-line bg-white/70 p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-sm font-bold text-ug-black">{p.source}</p>
                    <span className="rounded-full bg-seasoning/12 px-2.5 py-1 text-[11px] font-semibold text-seasoning-600">
                      {p.kindLabel}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ug-black">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ug-black/60">{p.description}</p>
                  <p className="mt-4 text-xs font-medium text-ug-black/45">{p.date}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MarketsSection />
      <DownloadSection />
      <AiSection />
      <CtaBand />
    </>
  )
}

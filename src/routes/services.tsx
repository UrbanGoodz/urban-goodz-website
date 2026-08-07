import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '~/components/icons'
import type { IconName } from '~/components/icons'
import { PageHero } from '~/components/PageHero'
import { LinkBtn, Reveal, SectionHeader } from '~/components/primitives'
import { StrandedScene } from '~/components/services/StrandedScene'
import { site } from '~/lib/site'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Services — Urban Goodz',
        description:
          'Urban Goodz Stranded connects you with nearby verified Goodz Samaritans and trusted roadside professionals through one intelligent, community-powered response network.',
        path: '/services',
        keywords: [
          'Urban Goodz Stranded',
          'roadside assistance app',
          'community roadside help',
          'Goodz Samaritan',
          'jump start flat tire tow',
        ],
      }).meta,
    ],
  }),
  component: Services,
})

/* ─── Situations ─────────────────────────────────────────────────── */

const situations: { label: string; icon: IconName }[] = [
  { label: 'Dead Battery', icon: 'spark' },
  { label: 'Flat Tire', icon: 'routes' },
  { label: 'Out of Gas', icon: 'freight' },
  { label: 'Locked Out', icon: 'shield' },
  { label: 'Vehicle Won’t Start', icon: 'clock' },
  { label: 'Need a Tow', icon: 'drivers' },
  { label: 'Mobile Mechanic', icon: 'services' },
  { label: 'EV Charging', icon: 'ai' },
  { label: 'Accident Assistance', icon: 'medical' },
]

/* ─── Six-step flow ──────────────────────────────────────────────── */

const steps: { n: string; title: string; body: string; icon: IconName; points?: string[] }[] = [
  {
    n: '01',
    title: 'Tell us what happened',
    body: 'Choose your situation. The app captures your location automatically and asks only for what is needed to get you help.',
    icon: 'map-pin',
  },
  {
    n: '02',
    title: 'Instant AI dispatch',
    body: 'Our AI weighs everything that decides how fast help can actually reach you, then picks the shortest real path to it.',
    icon: 'ai',
    points: ['Location & road conditions', 'Traffic & weather', 'Time of day', 'Who is verified and nearby'],
  },
  {
    n: '03',
    title: 'Notify nearby Samaritans',
    body: 'Verified Goodz Samaritans inside the radius get your request. Some volunteer, some accept tips, some ask a fair rate. You choose who to accept.',
    icon: 'community',
  },
  {
    n: '04',
    title: 'Professional backup',
    body: 'If community help is not immediately available, the search expands to roadside providers, towing, mobile mechanics and locksmiths — without you starting over.',
    icon: 'shield',
  },
  {
    n: '05',
    title: 'Track everything live',
    body: 'Watch your responder travel to you in real time, with secure messaging and arrival confirmation the whole way.',
    icon: 'routes',
    points: ['Live GPS & ETA', 'Secure messaging', 'Safety notifications', 'Arrival confirmation'],
  },
  {
    n: '06',
    title: 'Get back on the road',
    body: 'Payment finalises, receipts land in your wallet, and both sides can leave a review that strengthens the network for the next person.',
    icon: 'check',
  },
]

/* ─── Comparison ─────────────────────────────────────────────────── */

const traditional = [
  'Limited provider network',
  'Long wait times',
  'One dispatch option',
  'Little community involvement',
  'Static coverage',
]

const stranded = [
  'AI-powered dispatch',
  'Verified Goodz Samaritans',
  'Professional roadside providers',
  'Community-first assistance',
  'Live tracking',
  'Flexible response options',
  'Intelligent routing',
  'One unified experience',
]

/* ─── Safety ─────────────────────────────────────────────────────── */

const safety: { title: string; icon: IconName }[] = [
  { title: 'Verified responder profiles', icon: 'shield' },
  { title: 'Identity verification', icon: 'scan' },
  { title: 'Real-time GPS tracking', icon: 'map-pin' },
  { title: 'Live arrival updates', icon: 'clock' },
  { title: 'Secure in-app messaging', icon: 'mail' },
  { title: 'Share location with trusted contacts', icon: 'community' },
  { title: 'Full service history', icon: 'order' },
  { title: 'Community ratings & reviews', icon: 'star' },
]

/* ─── Page ───────────────────────────────────────────────────────── */

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything your city can do, <span className="text-grad">when you need it.</span>
          </>
        }
        lede="Urban Goodz runs the everyday infrastructure of a neighborhood — starting with the moment you need help most."
      />

      {/* ══ STRANDED · cinematic opener ══════════════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-40" />
        <div className="container-ug relative py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal className="flex justify-center">
              <span className="eyebrow eyebrow-on-dark">Featured experience · Stranded</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-7 font-display text-[2.7rem] font-bold leading-[1.05] tracking-tight text-ink-on-dark sm:text-6xl lg:text-[4.2rem]">
                Never stay <span className="text-grad">stranded</span> again.
              </h2>
            </Reveal>
            <Reveal delay={190}>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-mute-on-dark md:text-xl">
                Whether it’s a dead battery, flat tire, empty gas tank, lockout or an unexpected
                breakdown, Urban Goodz connects you with nearby Goodz Samaritans and trusted roadside
                professionals — helping you get back on the road faster through the power of
                community and intelligent technology.
              </p>
            </Reveal>
          </div>

          <Reveal delay={260} className="mt-16 block">
            <StrandedScene />
          </Reveal>
        </div>
      </section>

      {/* ══ Supporting copy ══════════════════════════════════════════ */}
      <section className="surface-paper py-24 md:py-32">
        <div className="container-ug">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="font-display text-2xl font-semibold leading-snug text-ug-black md:text-3xl">
                Emergencies rarely happen at convenient times.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ug-black/70">
                Most roadside programs depend on a limited network of contracted providers — so
                people wait, while the closest capable person drives right past without ever knowing
                someone nearby needs help.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-ug-black/70">
                Urban Goodz changes that. Instead of a single dispatch model, Stranded combines
                verified community responders with licensed roadside professionals into one
                intelligent network. Our AI looks beyond the traditional provider list and searches
                for the fastest qualified help available — creating far more chances for someone to
                reach you quickly.
              </p>
              <p className="mt-7 font-display text-xl font-semibold leading-snug text-ug-black md:text-2xl">
                It isn’t just roadside assistance.
                <span className="mt-1 block text-grad-dark">
                  It’s a smarter community response network.
                </span>
              </p>
            </Reveal>
          </div>

          {/* situations */}
          <div className="mx-auto mt-20 max-w-5xl">
            <Reveal>
              <p className="text-center font-display text-sm font-bold uppercase tracking-[0.18em] text-seasoning-600">
                Tell us what happened
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {situations.map((s, i) => (
                <Reveal key={s.label} delay={Math.min(i * 60, 420)} as="span">
                  <span className="lift flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-5 py-3 text-sm font-semibold text-ug-black shadow-card">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full grad-seasoning text-ug-black">
                      <Icon name={s.icon} size={13} />
                    </span>
                    {s.label}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ How it works · six steps ═════════════════════════════════ */}
      <section className="border-t border-line bg-cream/40 py-24 md:py-32">
        <div className="container-ug">
          <SectionHeader
            eyebrow="How it works"
            title={
              <>
                From breakdown to <span className="text-grad-dark">back on the road.</span>
              </>
            }
          />

          <div className="relative mt-20">
            {/* the animated spine connecting every step */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-[1.65rem] top-0 hidden h-full w-1 lg:block"
              preserveAspectRatio="none"
              viewBox="0 0 4 100"
            >
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="100"
                stroke="#ED9914"
                strokeWidth="2"
                strokeDasharray="4 5"
                opacity="0.5"
                className="animate-route-dash"
              />
            </svg>

            <ol className="space-y-5">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={Math.min(i * 90, 450)} as="li">
                  <article className="lift relative flex flex-col gap-6 rounded-[1.75rem] border border-line bg-paper p-7 md:p-9 lg:flex-row lg:items-start lg:gap-9 lg:pl-24">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ug-black text-seasoning-300 lg:absolute lg:left-5 lg:top-9">
                      <Icon name={s.icon} size={24} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xs font-bold tracking-[0.22em] text-seasoning-600">
                        STEP {s.n}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold text-ug-black">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-ug-black/65">
                        {s.body}
                      </p>
                      {s.points && (
                        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                          {s.points.map((p) => (
                            <li
                              key={p}
                              className="flex items-center gap-2.5 text-sm font-medium text-ug-black/75"
                            >
                              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-seasoning/15 text-seasoning-600">
                                <Icon name="check" size={11} />
                              </span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ══ Meet the Goodz Samaritans ════════════════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-45" />
        <div className="container-ug relative py-24 md:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Reveal className="flex">
                <span className="eyebrow eyebrow-on-dark">The community</span>
              </Reveal>
              <Reveal delay={90}>
                <h2 className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink-on-dark md:text-5xl lg:text-[3.4rem]">
                  Meet the <span className="text-grad">Goodz Samaritans.</span>
                </h2>
              </Reveal>
              <div className="mt-9 space-y-6 text-lg leading-relaxed text-mute-on-dark">
                <Reveal delay={150} as="span">
                  <p>
                    Sometimes the person best positioned to help isn’t a tow truck twenty miles away.
                    Sometimes it’s someone five minutes away who already has jumper cables, a
                    portable compressor, or simply the willingness to lend a hand.
                  </p>
                </Reveal>
                <Reveal delay={210} as="span">
                  <p>
                    Goodz Samaritans are verified members of the Urban Goodz community who choose to
                    help when someone nearby is stranded. Every Samaritan clears identity
                    verification, location verification and community accountability measures before
                    joining the network.
                  </p>
                </Reveal>
                <Reveal delay={270} as="span">
                  <p>
                    Some volunteer because they believe in helping others. Others earn money
                    providing roadside assistance. Every completed rescue builds a stronger, safer
                    community.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={330}>
                <div className="mt-10 flex flex-wrap gap-3">
                  {['Identity verified', 'Location verified', 'Community accountable'].map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-2 rounded-full border border-line-on-dark bg-ink-800/70 px-4 py-2 text-sm font-semibold text-ink-on-dark"
                    >
                      <Icon name="shield" size={14} className="text-seasoning-300" />
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* ── Portrait strip · reserved for real photography ────────
                Swap each placeholder for a portrait of an actual Samaritan:
                <img src="/images/services/samaritan-01.jpg" alt="…"
                     className="size-full object-cover" />                  */}
            <Reveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Volunteer', note: 'Helps when they’re close by' },
                  { name: 'Tip accepted', note: 'Neighbor with the right gear' },
                  { name: 'Paid responder', note: 'Fair rate for their time' },
                  { name: 'Roadside pro', note: 'Licensed backup, always on' },
                ].map((p, i) => (
                  <figure
                    key={p.name}
                    className={`overflow-hidden rounded-[1.5rem] border border-line-on-dark bg-ink-800 ${
                      i % 2 === 1 ? 'mt-8' : ''
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(237,153,20,0.16),transparent_60%)]"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 p-4">
                        <span className="grid size-9 place-items-center rounded-full grad-seasoning text-ug-black">
                          <Icon name="community" size={16} />
                        </span>
                        <p className="mt-3 font-display text-sm font-bold text-ink-on-dark">
                          {p.name}
                        </p>
                        <p className="mt-0.5 text-xs leading-snug text-mute-on-dark">{p.note}</p>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
              <p className="mt-6 text-center text-xs text-mute-on-dark/70">
                Portrait frames reserved — sized for real Samaritan photography.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ Why this is different ════════════════════════════════════ */}
      <section className="surface-paper py-24 md:py-32">
        <div className="container-ug">
          <SectionHeader
            eyebrow="Why this is different"
            title={
              <>
                One request. <span className="text-grad-dark">Every route to help.</span>
              </>
            }
          />
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[1.75rem] border border-line bg-cream/50 p-8 md:p-10">
                <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-ug-black/45">
                  Traditional roadside assistance
                </p>
                <ul className="mt-7 space-y-4">
                  {traditional.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-ug-black/55">
                      <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-ug-black/8">
                        <Icon name="minus" size={12} className="text-ug-black/40" />
                      </span>
                      <span className="text-[1.02rem]">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-seasoning/30 bg-white p-8 shadow-card md:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-seasoning/12 blur-3xl"
                />
                <p className="relative font-display text-xs font-bold uppercase tracking-[0.18em] text-seasoning-600">
                  Urban Goodz Stranded
                </p>
                <ul className="relative mt-7 grid gap-4 sm:grid-cols-2">
                  {stranded.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-ug-black/80">
                      <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-seasoning/15 text-seasoning-600">
                        <Icon name="check" size={11} />
                      </span>
                      <span className="text-[1.02rem] font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ Safety + payment ═════════════════════════════════════════ */}
      <section className="border-t border-line bg-cream/40 py-24 md:py-32">
        <div className="container-ug grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal className="flex">
              <span className="eyebrow">Safety first</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ug-black md:text-4xl">
                Safety is never <span className="text-grad-dark">optional.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ug-black/70">
                Every response carries multiple layers of protection, so you can feel confident from
                the moment you send the request to the moment you drive away.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {safety.map((s, i) => (
                <Reveal key={s.title} delay={Math.min(i * 60, 400)}>
                  <div className="flex h-full items-center gap-3 rounded-2xl border border-line bg-paper p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ug-black text-seasoning-300">
                      <Icon name={s.icon} size={16} />
                    </span>
                    <span className="text-sm font-semibold text-ug-black">{s.title}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={180}>
            <div className="sticky top-28 rounded-[1.75rem] border border-line bg-paper p-8 shadow-card md:p-9">
              <span className="grid size-12 place-items-center rounded-2xl grad-seasoning text-ug-black">
                <Icon name="bag" size={22} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-ug-black">
                Simple, transparent payment
              </h3>
              <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-ug-black/70">
                <p>
                  A small platform request fee activates the intelligent dispatch network and starts
                  the search for help.
                </p>
                <p>
                  Choose a paid Samaritan or a professional provider and payment is held securely
                  until the service is complete.
                </p>
                <p>
                  Prefer to accept help from a volunteer? Do that instead — and tip them if you want
                  to.
                </p>
              </div>
              <p className="mt-6 flex items-start gap-2.5 rounded-2xl bg-cream/70 p-4 text-sm font-semibold text-ug-black">
                <Icon name="check" size={15} className="mt-0.5 shrink-0 text-seasoning-600" />
                No surprise charges after the work has been agreed to.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ The bigger mission ═══════════════════════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-40" />
        <div className="container-ug relative py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal className="flex justify-center">
              <span className="eyebrow eyebrow-on-dark">The bigger mission</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-7 font-display text-4xl font-bold leading-[1.07] tracking-tight text-ink-on-dark md:text-5xl lg:text-[3.5rem]">
                More than <span className="text-grad">roadside assistance.</span>
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-mute-on-dark">
                Every request has the potential to do more than solve a breakdown.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: 'community' as const, t: 'Neighbors helping neighbors', b: 'A reason for the people already nearby to show up for each other.' },
              { icon: 'business' as const, t: 'A way to earn', b: 'Community members turn spare time and a set of cables into income.' },
              { icon: 'market' as const, t: 'Local businesses reached', b: 'Roadside shops, locksmiths and mechanics meet customers they would never have found.' },
              { icon: 'clock' as const, t: 'Less waiting', b: 'Better use of who is already close, instead of who is merely under contract.' },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 100} as="article" className="h-full">
                <div className="flex h-full flex-col rounded-[1.5rem] border border-line-on-dark bg-ink-800/60 p-7">
                  <span className="grid size-12 place-items-center rounded-2xl grad-seasoning text-ug-black">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold text-ink-on-dark">{c.t}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mute-on-dark">{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220}>
            <p className="mx-auto mt-16 max-w-3xl text-center font-display text-2xl font-semibold leading-snug text-ink-on-dark md:text-3xl">
              Most importantly, it reinforces the idea that technology should bring communities
              <span className="text-grad"> together instead of replacing them.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ Final CTA ════════════════════════════════════════════════ */}
      <section className="surface-paper relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/4 size-[32rem] rounded-full bg-seasoning/10 blur-3xl"
        />
        <div className="container-ug relative py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-[2.4rem] font-bold leading-[1.1] tracking-tight text-ug-black sm:text-5xl lg:text-[3.6rem]">
                Help is closer than <span className="text-grad-dark">you think.</span>
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ug-black/70">
                Whether you need a jump start before work, a tow after a breakdown, or simply someone
                willing to lend a hand — Stranded brings the strength of your community and the
                reliability of professional roadside service into one seamless experience.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <LinkBtn to="/join" variant="primary" search={{ as: 'app' }}>
                  Get Help Now
                  <Icon name="arrow-up-right" size={18} />
                </LinkBtn>
                <LinkBtn to="/join" variant="dark" search={{ as: 'samaritan' }}>
                  Become a Goodz Samaritan
                </LinkBtn>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-10 text-sm text-ug-black/50">
                Questions about Stranded? Reach us at{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-seasoning-600 underline underline-offset-4"
                >
                  {site.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

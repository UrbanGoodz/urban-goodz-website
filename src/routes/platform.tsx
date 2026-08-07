import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '~/components/icons'
import type { IconName } from '~/components/icons'
import { MapLegend, MarketsMap } from '~/components/MarketsMap'
import { EcosystemOrbit } from '~/components/platform/EcosystemOrbit'
import { LinkBtn, Reveal, SectionHeader } from '~/components/primitives'
import { site } from '~/lib/site'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/platform')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Why Urban Goodz Exists — Urban Goodz',
        description:
          'Local businesses built our communities. Urban Goodz was built so they can compete — one ecosystem for shopping, services, logistics, healthcare and creators, powered by AI and rooted in Houston.',
        path: '/platform',
        keywords: [
          'why Urban Goodz',
          'support local business',
          'local commerce platform',
          'Black owned business technology',
          'Houston technology company',
        ],
      }).meta,
    ],
  }),
  component: Platform,
})

/* ─── Section 1 · photography ────────────────────────────────────── */

const storyPhotos = [
  {
    src: '/images/story/open-sign.jpg',
    alt: 'A business owner turning the sign to Open at the door of his shop',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: '/images/story/restaurant.jpg',
    alt: 'A restaurant owner handing a packed order across the counter',
    span: '',
  },
  {
    src: '/images/story/boutique.jpg',
    alt: 'Two women looking through a rail of clothing in a local boutique',
    span: '',
  },
  {
    src: '/images/story/stylist.jpg',
    alt: 'A stylist finishing a client’s hair in a neighborhood salon',
    span: '',
  },
  {
    src: '/images/story/grocer.jpg',
    alt: 'A shopper choosing fresh produce at a local grocer',
    span: '',
  },
  {
    src: '/images/story/entrepreneur.jpg',
    alt: 'A shop owner working at a laptop behind the counter of his store',
    span: '',
  },
  {
    src: '/images/story/packing.jpg',
    alt: 'A small business owner packing an order beside a sales dashboard',
    span: '',
  },
  {
    src: '/images/story/market.jpg',
    alt: 'Neighbors shopping the stalls of an outdoor community market',
    span: 'sm:col-span-2',
  },
]

/* ─── Section 3 · beliefs ────────────────────────────────────────── */

const beliefs: { icon: IconName; title: string; body: string; img: string }[] = [
  {
    icon: 'market',
    title: 'Support local business',
    body: 'AI that works for people — putting the same intelligence the giants run on into the hands of the shop on your corner.',
    img: '/images/assets/community_support_local_art.jpg',
  },
  {
    icon: 'business',
    title: 'Economic opportunity',
    body: 'Helping entrepreneurs grow. Every storefront that stays open is a family, a payroll and a piece of a neighborhood held together.',
    img: '/images/assets/community_economic_opp_art.jpg',
  },
  {
    icon: 'community',
    title: 'Community first',
    body: 'Neighbors helping neighbors. The person delivering your order and the person who cooked it likely live on your side of town.',
    img: '/images/assets/community_first_art.jpg',
  },
  {
    icon: 'spark',
    title: 'Everything local',
    body: 'Shopping, services, logistics, healthcare and creators together — because a community is never just one category.',
    img: '/images/assets/community_everything_local_art.jpg',
  },
]

/* ─── Section 5 · how it works ───────────────────────────────────── */

const steps = [
  {
    n: '01',
    title: 'Discover',
    body: 'Everything your neighborhood offers, in one place — found the way people actually look for it.',
    img: '/images/assets/growth_discover_map.jpg',
  },
  {
    n: '02',
    title: 'Connect',
    body: 'Customers, owners and drivers meet on one network built to keep the value local.',
    img: '/images/assets/growth_connect_network.jpg',
  },
  {
    n: '03',
    title: 'Grow',
    body: 'Insight, reach and tools that compound — so a good week becomes a good year.',
    img: '/images/assets/growth_chart.jpg',
  },
]

/* ─── Section 6 · who it serves ──────────────────────────────────── */

const audiences: { icon: IconName; who: string; title: string; body: string; img: string }[] = [
  {
    icon: 'bag',
    who: 'Customer',
    title: 'Your whole neighborhood, one account',
    body: 'Order dinner, book a stylist, refill a prescription and support the block you live on — without juggling five apps to do it.',
    img: '/images/assets/persona_customer.jpg',
  },
  {
    icon: 'business',
    who: 'Business Owner',
    title: 'Compete with anyone',
    body: 'A storefront, real analytics and an AI teammate that reads your numbers and tells you what to do next. The tools the national chains have, sized for you.',
    img: '/images/assets/persona_business_owner.jpg',
  },
  {
    icon: 'drivers',
    who: 'Driver',
    title: 'A partner, not a number',
    body: 'Routes that respect your time, earnings you can see clearly, and work that flexes around your life instead of the other way around.',
    img: '/images/assets/persona_driver.jpg',
  },
  {
    icon: 'creator',
    who: 'Creator',
    title: 'Turn an audience into a business',
    body: 'Your own storefront, your own catalog, your own terms — with the logistics handled so you can keep making the thing people came for.',
    img: '/images/assets/persona_creator.jpg',
  },
  {
    icon: 'services',
    who: 'Service Professional',
    title: 'Booked, paid and reviewed',
    body: 'Scheduling, deposits and repeat clients in one place, so the hours you spend chasing admin go back into the work itself.',
    img: '/images/assets/persona_service_pro.jpg',
  },
  {
    icon: 'medical',
    who: 'Healthcare',
    title: 'Care that arrives on time',
    body: 'Prescriptions, specimens and home health supplies moved with chain-of-custody tracking and the seriousness they deserve.',
    img: '/images/assets/persona_healthcare.jpg',
  },
  {
    icon: 'freight',
    who: 'Freight',
    title: 'Loads that keep moving',
    body: 'From box truck to eighteen-wheeler, a dispatch layer that finds the next load and plans the smartest way to it.',
    img: '/images/assets/persona_freight.jpg',
  },
]

/* ─── Section 7½ · the quiet numbers ─────────────────────────────── */

const numbers = [
  { value: '$0', label: 'to list your business' },
  { value: '0%', label: 'commission traps' },
  { value: '100%', label: 'of tips stay with drivers' },
  { value: '15', label: 'markets live today' },
  { value: '24/7', label: 'AI support' },
]

/* ─── Page ───────────────────────────────────────────────────────── */

function Platform() {
  return (
    <>
      {/* ══ 1 · THE PROBLEM ══════════════════════════════════════════ */}
      <section className="surface-paper relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-seasoning/8 blur-3xl"
        />
        <div className="container-ug relative pb-24 pt-24 md:pb-36 md:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal className="flex justify-center">
              <span className="eyebrow">Why we exist</span>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-7 font-display text-[2.7rem] font-bold leading-[1.04] tracking-tight text-ug-black sm:text-6xl lg:text-[4.4rem]">
                Local businesses built our communities.
                <span className="mt-3 block text-grad-dark">
                  Technology left too many of them behind.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mx-auto mt-9 max-w-2xl text-lg leading-relaxed text-ug-black/70 md:text-xl">
                The corner restaurant. The barbershop that knows your name. The boutique that
                sponsors the little league team. They have always been the backbone of the
                neighborhoods they serve — and the first to feel it when commerce moves somewhere
                they cannot follow.
              </p>
            </Reveal>
          </div>

          {/* editorial photo mosaic */}
          <div className="mt-20 grid auto-rows-[11rem] grid-cols-1 gap-4 sm:auto-rows-[13rem] sm:grid-cols-3 lg:auto-rows-[15rem] lg:grid-cols-4">
            {storyPhotos.map((p, i) => (
              <Reveal key={p.src} delay={Math.min(i * 70, 420)} className={`min-h-0 ${p.span}`}>
                <figure className="lift group size-full overflow-hidden rounded-3xl border border-line bg-cream shadow-card">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-3xl">
            <Reveal>
              <p className="text-xl leading-relaxed text-ug-black/75 md:text-2xl">
                Modern commerce rewards scale. National platforms arrive with engineering teams,
                logistics networks and advertising budgets no independent owner can match. So a
                business with better food, better service and deeper roots loses — not because it
                was worse, but because it was outspent.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-8 font-display text-2xl font-semibold leading-snug text-ug-black md:text-3xl">
                It does not have to work that way. The same technology that concentrated all of that
                advantage can be handed back.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 2 · THE FOUNDER'S WHY ════════════════════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="container-ug relative py-24 md:py-36">
          <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* ── Founder portrait · reserved ──────────────────────────
                Swap the placeholder block below for:
                <img src="/images/founder/dandre-good.jpg" alt="D’Andre Good, Founder and CEO"
                     className="size-full object-cover" />                        */}
            <Reveal>
              <figure className="relative">
                <div className="overflow-hidden rounded-[2rem] border border-line-on-dark bg-ink-800 shadow-lift">
                  <div className="relative aspect-[4/5] w-full">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(237,153,20,0.16),transparent_62%)]"
                    />
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <span className="mx-auto grid size-20 place-items-center rounded-full border border-line-on-dark bg-ink-900/80">
                          <Icon name="spark" size={26} className="text-seasoning" />
                        </span>
                        <p className="mt-5 font-display text-lg font-semibold text-ink-on-dark">
                          {site.founder}
                        </p>
                        <p className="mt-1 text-sm text-mute-on-dark">{site.founderRole}</p>
                        <p className="mx-auto mt-6 max-w-[13rem] text-xs leading-relaxed text-mute-on-dark/70">
                          Portrait reserved — this frame is sized for a full-bleed founder photograph
                          or short video loop.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <figcaption className="mt-5 flex items-center gap-2.5 text-sm text-mute-on-dark">
                  <Icon name="map-pin" size={15} className="text-seasoning-300" />
                  {site.hq}
                </figcaption>
              </figure>
            </Reveal>

            {/* ── Editorial column ──────────────────────────────────── */}
            <div>
              <Reveal className="flex">
                <span className="eyebrow eyebrow-on-dark">The founder</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink-on-dark md:text-5xl lg:text-[3.4rem]">
                  Why Urban Goodz <span className="text-grad">was built.</span>
                </h2>
              </Reveal>

              <div className="mt-10 space-y-6 text-lg leading-relaxed text-mute-on-dark md:columns-2 md:gap-10 md:space-y-0 md:[&>p]:mb-6">
                <Reveal delay={140} as="span">
                  <p>
                    Urban Goodz did not begin in a boardroom. It began behind a windshield in
                    Houston — making deliveries, walking into kitchens and back offices, and hearing
                    the same story from owner after owner. The orders were coming in. The margins
                    were going out. Someone else was collecting the difference.
                  </p>
                </Reveal>
                <Reveal delay={200} as="span">
                  <p>
                    These were not failing businesses. They were beloved ones — places with lines out
                    the door and decades of history on the wall. What they lacked was never talent or
                    work ethic. It was the software layer that decides who gets found, who gets
                    recommended and who keeps the value at the end of a transaction.
                  </p>
                </Reveal>
                <Reveal delay={260} as="span">
                  <p>
                    So the goal was never to build another delivery app. It was to build the layer
                    itself, and then hand the keys to the people it was built for. Owners keep their
                    customers, their brand and their margin. Drivers are treated as partners in the
                    work rather than a cost to be squeezed. Neighborhoods keep the money that
                    neighborhoods generate.
                  </p>
                </Reveal>
                <Reveal delay={320} as="span">
                  <p>
                    That is the whole idea: a modern digital Black Wall Street, where independent
                    businesses compete on what they are actually good at — and technology finally
                    sits on their side of the table.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={380}>
                <blockquote className="mt-12 border-l-2 border-seasoning pl-7">
                  <p className="font-display text-2xl font-semibold leading-snug text-ink-on-dark md:text-3xl">
                    “I didn’t build this to deliver food. I built it so the people who feed a
                    neighborhood get to own their piece of it.”
                  </p>
                </blockquote>
              </Reveal>

              {/* ── Signature · replace with a real signature image ──── */}
              <Reveal delay={440}>
                <div className="mt-12 flex flex-wrap items-end gap-x-8 gap-y-5">
                  <div>
                    {/* Swap for: <img src="/images/founder/signature.svg" alt="" className="h-14" /> */}
                    <p
                      className="text-4xl text-seasoning-300 md:text-[2.75rem]"
                      style={{ fontFamily: 'Segoe Script, Bradley Hand, cursive' }}
                    >
                      {site.founder}
                    </p>
                    <div
                      aria-hidden="true"
                      className="mt-3 h-px w-56 bg-gradient-to-r from-seasoning/70 to-transparent"
                    />
                    <p className="mt-3 text-sm text-mute-on-dark">
                      {site.founder} · {site.founderRole}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3 · OUR BELIEF ═══════════════════════════════════════════ */}
      <section className="surface-paper py-24 md:py-36">
        <div className="container-ug">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal className="flex justify-center">
              <span className="eyebrow">Our belief</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-7 font-display text-4xl font-bold leading-[1.07] tracking-tight text-ug-black md:text-5xl lg:text-[3.6rem]">
                Technology should strengthen communities.
                <span className="mt-2 block text-grad-dark">Not replace them.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 100} as="article" className="h-full">
                <div className="lift group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white/80 shadow-card">
                  <div className="relative h-36 w-full overflow-hidden bg-cream">
                    <img
                      src={b.img}
                      alt={b.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-3 bottom-3 grid size-10 place-items-center rounded-xl grad-seasoning text-ug-black shadow-sm">
                      <Icon name={b.icon} size={20} />
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-ug-black">{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ug-black/65">{b.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4 · THE ECOSYSTEM ════════════════════════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-40" />
        <div className="container-ug relative py-24 md:py-36">
          <SectionHeader
            onDark
            eyebrow="The ecosystem"
            title={
              <>
                Everything connected. <span className="text-grad">Nothing separate.</span>
              </>
            }
            lede="Customers, businesses, drivers and creators are not different products bolted together — they are one economy, moving through one network."
          />
          <Reveal delay={160} className="mt-20 block">
            <EcosystemOrbit />
          </Reveal>
        </div>
      </section>

      {/* ══ 5 · HOW IT WORKS ═════════════════════════════════════════ */}
      <section className="surface-paper py-24 md:py-36">
        <div className="container-ug">
          <SectionHeader
            eyebrow="How it works"
            title={
              <>
                Three steps. <span className="text-grad-dark">One outcome.</span>
              </>
            }
          />
          <div className="mt-20 grid gap-6 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} as="article" className="h-full">
                <div className="lift group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white/80 shadow-card">
                  <div className="relative h-44 w-full overflow-hidden bg-cream">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 font-display text-sm font-bold tracking-[0.2em] text-seasoning-600 bg-ug-black/80 px-2.5 py-1 rounded-full text-white">
                      {s.n}
                    </span>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ug-black">{s.title}</h3>
                      <p className="mt-3 text-[1.02rem] leading-relaxed text-ug-black/65">{s.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6 · WHO IT SERVES ════════════════════════════════════════ */}
      <section className="border-t border-line bg-cream/40 py-24 md:py-36">
        <div className="container-ug">
          <SectionHeader
            eyebrow="Who it serves"
            title={
              <>
                Built for everyone who <span className="text-grad-dark">makes a place work.</span>
              </>
            }
            lede="One ecosystem, seven kinds of people — each with something different to gain from the same network."
          />
          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.who} delay={Math.min(i * 90, 450)} as="article" className="h-full">
                <div className="lift group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-card">
                  <div className="relative h-40 w-full overflow-hidden bg-cream">
                    <img
                      src={a.img}
                      alt={a.who}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ug-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="grid size-8 place-items-center rounded-lg bg-seasoning text-ug-black">
                        <Icon name={a.icon} size={16} />
                      </span>
                      <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
                        {a.who}
                      </span>
                    </div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold leading-snug text-ug-black">
                        {a.title}
                      </h3>
                      <p className="mt-2.5 text-[0.97rem] leading-relaxed text-ug-black/65">{a.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7 · BUILT IN HOUSTON ═════════════════════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        {/* cinematic band */}
        <div className="relative h-[19rem] w-full overflow-hidden md:h-[26rem]">
          <img
            src="/images/story/skyline-wide.jpg"
            alt="A city skyline at dusk, lit by a network of connected delivery routes"
            loading="lazy"
            className="size-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ug-black via-ug-black/45 to-ug-black/25"
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="container-ug pb-10 md:pb-14">
              <Reveal>
                <span className="eyebrow eyebrow-on-dark">Built in Houston</span>
                <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink-on-dark md:text-5xl lg:text-[3.4rem]">
                  It started on one city’s streets.
                  <span className="block text-grad">It belongs to every city like it.</span>
                </h2>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="container-ug py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <Reveal>
              <div className="max-w-xl space-y-6 text-lg leading-relaxed text-mute-on-dark">
                <p>
                  Houston is where the problem was learned firsthand and where the first version was
                  tested — on real streets, with real owners, in neighborhoods where the difference
                  between a good month and a closed door is thin.
                </p>
                <p>
                  What worked there was never particular to Texas. Every city in America has the same
                  corner restaurant, the same barbershop, the same family store carrying a block on
                  its back. So the model travels, market by market, at the pace communities can
                  actually absorb.
                </p>
                <p className="font-display text-xl font-semibold text-ink-on-dark">
                  Fifteen markets live today — from Houston to Los Angeles to New York — and a
                  roadmap built city by city, never all at once.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-[2rem] border border-line-on-dark bg-ink-800/50 p-6 md:p-9">
                <MarketsMap onDark className="mx-auto max-w-2xl" />
                <div className="mt-8">
                  <MapLegend onDark />
                </div>
              </div>
            </Reveal>
          </div>

          {/* the quiet numbers — kept deliberately low on the page */}
          <Reveal delay={120}>
            <div className="mt-20 rounded-[1.75rem] border border-line-on-dark bg-ink-900/50 px-6 py-9 md:px-10">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {numbers.map((n) => (
                  <li key={n.label} className="text-center">
                    <p className="font-display text-3xl font-bold text-seasoning-300 md:text-4xl">
                      {n.value}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-mute-on-dark">{n.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 8 · OUR PROMISE ══════════════════════════════════════════ */}
      <section className="surface-paper relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/3 size-[32rem] rounded-full bg-dijon/12 blur-3xl"
        />
        <div className="container-ug relative py-28 md:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal className="flex justify-center">
              <span className="eyebrow">Our promise</span>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-9 font-display text-[2.4rem] font-bold leading-[1.12] tracking-tight text-ug-black sm:text-5xl lg:text-[3.9rem]">
                When local businesses succeed,
                <br className="hidden sm:block" /> communities thrive.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 font-display text-[2.4rem] font-bold leading-[1.12] tracking-tight text-grad-dark sm:text-5xl lg:text-[3.9rem]">
                When communities thrive,
                <br className="hidden sm:block" /> everyone wins.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-ug-black/70">
                That is the whole business model. Not a slogan under it — the actual mechanism. Pick
                the door that fits you.
              </p>
            </Reveal>
          </div>

          <Reveal delay={420}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
              <LinkBtn to="/join" variant="primary" search={{ as: 'app' }}>
                Download the App
                <Icon name="arrow-up-right" size={18} />
              </LinkBtn>
              <LinkBtn to="/join" variant="dark" search={{ as: 'business' }}>
                Become a Business Partner
              </LinkBtn>
              <LinkBtn to="/join" variant="ghost" search={{ as: 'driver' }}>
                Become a Driver
              </LinkBtn>
              <LinkBtn to="/markets" variant="ghost">
                Explore the Marketplace
              </LinkBtn>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <p className="mt-12 text-center text-sm text-ug-black/50">
              Questions first? Reach us at{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-seasoning-600 underline underline-offset-4"
              >
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

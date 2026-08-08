import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '~/components/icons'
import type { IconName } from '~/components/icons'
import { ChatDemo, PortraitFrame, type Turn } from '~/components/ai/ChatDemo'
import { AiNetwork } from '~/components/visuals/AiNetwork'
import { LinkBtn, Reveal, SectionHeader } from '~/components/primitives'
import { aiSystems } from '~/lib/platform'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/ai')({
  head: () => {
    const s = seo({
      title: 'Meet Monique & Skylar — Urban Goodz AI Team',
      description:
        'Monique is your local lifestyle concierge. Skylar is your executive chief of staff. Meet the two Urban Goodz Digital Employees working across the whole ecosystem, 24/7.',
      path: '/ai',
      keywords: [
        'Urban Goodz AI',
        'Monique AI concierge',
        'Skylar chief of staff',
        'AI digital employee',
        'local commerce AI',
      ],
    })
    return { meta: s.meta, links: s.links }
  },
  component: AiTeam,
})

/* ─── Capabilities ───────────────────────────────────────────────── */

const ebonyCan: { label: string; icon: IconName }[] = [
  { label: 'Discover restaurants', icon: 'restaurants' },
  { label: 'Shop local businesses', icon: 'market' },
  { label: 'Find Black-owned businesses', icon: 'community' },
  { label: 'Book services', icon: 'services' },
  { label: 'Explore events', icon: 'events' },
  { label: 'Track deliveries', icon: 'routes' },
  { label: 'Discover creators', icon: 'creator' },
  { label: 'Build outfits', icon: 'fashion' },
  { label: 'Recommend gifts', icon: 'bag' },
  { label: 'Find rentals', icon: 'retail' },
  { label: 'Answer questions', icon: 'search' },
  { label: 'Save you time', icon: 'clock' },
  { label: 'Make smarter purchases', icon: 'spark' },
]

const skylarHelps: { label: string; icon: IconName }[] = [
  { label: 'Monitor operations', icon: 'business' },
  { label: 'Analyze revenue', icon: 'spark' },
  { label: 'Improve dispatch', icon: 'drivers' },
  { label: 'Optimize routes', icon: 'routes' },
  { label: 'Track drivers', icon: 'map-pin' },
  { label: 'Manage vendors', icon: 'market' },
  { label: 'Monitor marketplace performance', icon: 'retail' },
  { label: 'Identify opportunities', icon: 'search' },
  { label: 'Forecast trends', icon: 'ai' },
  { label: 'Reduce operating costs', icon: 'freight' },
  { label: 'Improve customer satisfaction', icon: 'star' },
  { label: 'Automate repetitive work', icon: 'scan' },
]

/* ─── Where they work ────────────────────────────────────────────── */

const surfaces: { label: string; icon: IconName }[] = [
  { label: 'Customer Marketplace', icon: 'market' },
  { label: 'Business Portal', icon: 'business' },
  { label: 'Vendor Portal', icon: 'retail' },
  { label: 'Driver Platform', icon: 'drivers' },
  { label: 'Dispatch Center', icon: 'routes' },
  { label: 'Executive Dashboard', icon: 'spark' },
  { label: 'Creator Marketplace', icon: 'creator' },
  { label: 'Fashion Fit', icon: 'fashion' },
  { label: 'Order Anywhere', icon: 'order' },
  { label: 'Medical Courier', icon: 'medical' },
  { label: 'Dedicated Routes', icon: 'map-pin' },
  { label: 'Load Board', icon: 'freight' },
  { label: 'Rental Marketplace', icon: 'bag' },
  { label: 'Payment Center', icon: 'shield' },
  { label: 'AI Operations', icon: 'ai' },
  { label: 'Customer Support', icon: 'community' },
  { label: 'Every service that comes next', icon: 'events' },
]

/* ─── Conversations ──────────────────────────────────────────────── */

const ebonyTurns: Turn[] = [
  { from: 'user', text: 'Need dinner for 4 tonight, somewhere Black-owned, under $80.' },
  {
    from: 'ai',
    text: 'Say less. Angela’s Kitchen has a table at 7:15 — the oxtail is what everybody comes for, and four entrées lands you around $72. Want me to hold it?',
  },
  { from: 'user', text: 'Hold it. Also my sister’s birthday is Saturday.' },
  {
    from: 'ai',
    text: 'Noted. She liked that boutique on Almeda last time — they just restocked the wrap dress in her size. Want me to put a few options together before Thursday?',
  },
]

const skylarTurns: Turn[] = [
  { from: 'user', text: 'How did we do this week?' },
  {
    from: 'ai',
    text: 'Revenue is up 18% to $4,820. But the real story is Saturday — you turned away 14 orders between 6 and 8pm because only one driver was on.',
  },
  { from: 'user', text: 'What would you do about it?' },
  {
    from: 'ai',
    text: 'Add two drivers to that window. Based on last month, that recovers roughly $600 a weekend. I can draft the shift request and send it now.',
  },
]

/* ─── Roadmap ────────────────────────────────────────────────────── */

const roadmap = [
  {
    when: 'Today',
    title: 'Guidance everywhere',
    body: 'Both work across the marketplace, portals and dispatch — answering, recommending and flagging what needs attention.',
  },
  {
    when: 'Next',
    title: 'Acting on your behalf',
    body: 'Approve a suggestion and it gets done: promos launched, shifts requested, routes rebalanced.',
  },
  {
    when: 'Later',
    title: 'Learning your business',
    body: 'Recommendations shaped by your own history — your customers, your seasonality, your margins.',
  },
  {
    when: 'Always',
    title: 'The same two teammates',
    body: 'New capabilities, unchanged personalities. You should never have to relearn who you are talking to.',
  },
]

/* ─── Page ───────────────────────────────────────────────────────── */

function AiTeam() {
  return (
    <>
      {/* ══ SECTION 1: Hero (Dark) ════════════════════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-45" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-32 size-[34rem] rounded-full bg-seasoning/12 blur-3xl"
        />
        <div className="container-ug relative pb-20 pt-36 md:pb-28 md:pt-44">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal immediate className="flex justify-center">
              <span className="eyebrow eyebrow-on-dark">Digital employees</span>
            </Reveal>
            <Reveal immediate delay={90}>
              <h1 className="mt-7 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink-on-dark sm:text-5xl lg:text-[4rem]">
                Meet the team behind your
                <span className="mt-2 block text-grad">Urban Goodz experience.</span>
              </h1>
            </Reveal>
            <Reveal immediate delay={180}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-mute-on-dark md:text-xl">
                Not everyone on our team wears a badge. Some run on intelligence. Meet{' '}
                <strong className="font-semibold text-ink-on-dark">Monique</strong> and{' '}
                <strong className="font-semibold text-ink-on-dark">Skylar</strong> — more than AI,
                and part of the Urban Goodz family. Built to help customers, businesses, drivers and
                creators make smarter decisions and enjoy every interaction.
              </p>
            </Reveal>
            <Reveal immediate delay={260}>
              <p className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-seasoning-300">
                <span className="size-2 rounded-full bg-seasoning animate-pulse-soft" aria-hidden="true" />
                Available 24 hours a day, 7 days a week
              </p>
            </Reveal>
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
            <Reveal immediate delay={200}>
              <PortraitFrame
                initial="E"
                name="Monique"
                role="Local Lifestyle Concierge"
                src="/images/ai/ebony.jpg"
              />
              <LinkBtn to="/join" search={{ as: 'app' }} variant="primary" className="mt-5 w-full">
                Talk to Monique
                <Icon name="arrow-up-right" size={17} />
              </LinkBtn>
            </Reveal>
            <Reveal immediate delay={300}>
              <PortraitFrame
                initial="S"
                name="Skylar"
                role="Executive Chief of Staff"
                src="/images/ai/skylar.jpg"
              />
              <LinkBtn to="/join" search={{ as: 'business' }} variant="on-dark" className="mt-5 w-full">
                Meet Skylar
                <Icon name="arrow-up-right" size={17} />
              </LinkBtn>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: Monique (Light) ═════════════════════════════════ */}
      <section className="surface-paper py-24 md:py-32">
        <div className="container-ug">
          <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Reveal className="flex">
                <span className="eyebrow">Meet Monique</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ug-black md:text-5xl">
                  Your local <span className="text-grad-dark">lifestyle concierge.</span>
                </h2>
              </Reveal>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ug-black/70">
                <Reveal delay={140} as="span">
                  <p>
                    Monique is the face of the Urban Goodz customer experience. Confident. Funny.
                    Smart. Stylish. Authentic. And she knows her city.
                  </p>
                </Reveal>
                <Reveal delay={200} as="span">
                  <p>
                    Looking for the best food, a Black-owned business worth supporting, the right
                    outfit, event tickets, a service provider you can trust, or just where your order
                    is? She walks you through it.
                  </p>
                </Reveal>
                <Reveal delay={260} as="span">
                  <p>
                    She isn’t programmed to hand out generic answers. She learns how you shop and
                    points you toward businesses that actually fit your life — your favourite local
                    expert, personal shopper, foodie and stylist in one.
                  </p>
                </Reveal>
              </div>

              <div className="mt-10 flex flex-wrap gap-2.5">
                {ebonyCan.map((c, i) => (
                  <Reveal key={c.label} delay={Math.min(i * 45, 400)} as="span">
                    <span className="lift flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2.5 text-sm font-semibold text-ug-black shadow-card">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full grad-seasoning text-ug-black">
                        <Icon name={c.icon} size={12} />
                      </span>
                      {c.label}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={160} className="lg:sticky lg:top-28">
              <ChatDemo
                name="Monique"
                role="Local Lifestyle Concierge"
                icon="community"
                avatar="/images/ai/ebony-avatar.jpg"
                turns={ebonyTurns}
              />
              <p className="mt-4 text-center text-xs text-ug-black/60">
                An illustration of how Monique works.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: Skylar (Dark) ═════════════════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-40" />
        <div className="container-ug relative py-24 md:py-32">
          <div className="grid items-start gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:order-2">
              <ChatDemo
                name="Skylar"
                role="Executive Chief of Staff"
                icon="business"
                avatar="/images/ai/skylar-avatar.jpg"
                turns={skylarTurns}
                tone="dark"
              />
              <p className="mt-4 text-center text-xs text-mute-on-dark/70">
                An illustration of how Skylar works.
              </p>
            </Reveal>

            <div className="lg:order-1">
              <Reveal className="flex">
                <span className="eyebrow eyebrow-on-dark">Meet Skylar</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-on-dark md:text-5xl">
                  Your executive <span className="text-grad">chief of staff.</span>
                </h2>
              </Reveal>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-mute-on-dark">
                <Reveal delay={140} as="span">
                  <p>
                    While Monique helps customers, Skylar helps businesses succeed — the operations
                    partner for owners, vendors, fleet managers, dispatchers and administrators.
                  </p>
                </Reveal>
                <Reveal delay={200} as="span">
                  <p>
                    She turns data into decisions. Instead of burying you in dashboards, she surfaces
                    what matters: the trend forming, the bottleneck building, the revenue you are
                    leaving on the table — before any of it becomes a problem.
                  </p>
                </Reveal>
                <Reveal delay={260} as="span">
                  <p>
                    She doesn’t just show you the number. She tells you what it means and what to do
                    next.
                  </p>
                </Reveal>
              </div>

              <div className="mt-10 flex flex-wrap gap-2.5">
                {skylarHelps.map((c, i) => (
                  <Reveal key={c.label} delay={Math.min(i * 45, 400)} as="span">
                    <span className="flex items-center gap-2 rounded-full border border-line-on-dark bg-ink-800/70 px-4 py-2.5 text-sm font-semibold text-ink-on-dark transition-colors hover:border-seasoning/50">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full grad-seasoning text-ug-black">
                        <Icon name={c.icon} size={12} />
                      </span>
                      {c.label}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: Ecosystem Surfaces (Light) ══════════════════ */}
      <section className="surface-paper py-24 md:py-32">
        <div className="container-ug">
          <SectionHeader
            eyebrow="More than artificial intelligence"
            title={
              <>
                Not hidden inside a <span className="text-grad-dark">chat window.</span>
              </>
            }
            lede="Monique and Skylar were designed to become trusted members of the Urban Goodz team. You’ll meet them throughout the platform — guiding decisions, answering questions and recommending what to do next."
          />

          <div className="mt-20">
            <Reveal>
              <p className="text-center font-display text-sm font-bold uppercase tracking-[0.18em] text-seasoning-700">
                Built into every part of Urban Goodz
              </p>
            </Reveal>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {surfaces.map((s, i) => (
                <Reveal key={s.label} delay={Math.min(i * 45, 450)}>
                  <div className="lift flex h-full items-center gap-3 rounded-2xl border border-line bg-white/70 p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ug-black text-seasoning-300">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <span className="text-sm font-semibold text-ug-black">{s.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: Operating Brain (Dark) ═══════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-50" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/3 size-[480px] rounded-full bg-seasoning/12 blur-3xl"
        />
        <div className="container-ug relative py-24 md:py-32">
          <SectionHeader
            onDark
            eyebrow="Operating Intelligence"
            title={
              <>
                Ten specialized AI engines. <span className="text-grad">One operating brain.</span>
              </>
            }
            lede="Behind Monique and Skylar sits a coordinated multi-model AI infrastructure. Every module is tailored to specific real-world tasks across delivery, retail, size prediction, and business analytics."
          />

          <Reveal delay={120} className="mx-auto mt-16 max-w-3xl">
            <AiNetwork />
            <p className="mt-4 text-center text-xs text-mute-on-dark/70">
              Select any part of the ecosystem to trace how it routes through the operating brain.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {aiSystems.map((ai, i) => (
              <Reveal
                key={ai.name}
                delay={Math.min(i * 50, 400)}
                as="article"
                className="group rounded-3xl border border-line-on-dark bg-ink-800/70 p-5 transition-colors hover:border-seasoning/40"
              >
                <span className="inline-grid size-9 place-items-center rounded-xl grad-seasoning text-ug-black transition-transform group-hover:scale-110">
                  <Icon name="ai" size={17} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink-on-dark">{ai.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute-on-dark">{ai.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6: Teammate Standard / Comparison (Light) ═══════ */}
      <section className="border-y border-line bg-cream/50 py-24 md:py-32">
        <div className="container-ug">
          <SectionHeader
            eyebrow="The Teammate Standard"
            title={
              <>
                The difference between a <span className="text-grad-dark">chatbot and a teammate.</span>
              </>
            }
            lede="Most chatbots recite database queries or apologize when they don’t understand. Monique and Skylar synthesize real context, understand intent, and proactively draft solutions before you even ask."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <Reveal delay={100} className="rounded-3xl border border-line bg-white p-8 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-seasoning/15 text-seasoning-600 font-display font-bold">
                  E
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-ug-black">Monique in Action</h3>
                  <p className="text-xs text-ug-black/60">Local Lifestyle Concierge</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ug-black/75">
                <div className="rounded-2xl bg-paper p-4 border border-line/60">
                  <p className="font-semibold text-ug-black text-xs uppercase tracking-wider text-seasoning-600 mb-1">
                    Standard Chatbot Answer
                  </p>
                  <p className="text-ug-black/60 italic">
                    "Here are 15 restaurants matching 'Black-owned' in your area code. Please visit their websites for pricing and hours."
                  </p>
                </div>
                <div className="rounded-2xl bg-cream/70 p-4 border border-seasoning/30">
                  <p className="font-semibold text-ug-black text-xs uppercase tracking-wider text-seasoning-600 mb-1">
                    Monique's Teammate Response
                  </p>
                  <p className="text-ug-black font-medium">
                    "Angela’s Kitchen has a table at 7:15 — 4 entrées lands you around $72. Held it for you, and noted your sister’s birthday on Saturday."
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="rounded-3xl border border-line bg-white p-8 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-ug-black text-seasoning-300 font-display font-bold">
                  S
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-ug-black">Skylar in Action</h3>
                  <p className="text-xs text-ug-black/60">Executive Chief of Staff</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ug-black/75">
                <div className="rounded-2xl bg-paper p-4 border border-line/60">
                  <p className="font-semibold text-ug-black text-xs uppercase tracking-wider text-seasoning-600 mb-1">
                    Standard Chatbot Answer
                  </p>
                  <p className="text-ug-black/60 italic">
                    "Weekly revenue total is $4,820 (+18% YoY). Order count: 142. Export report to CSV?"
                  </p>
                </div>
                <div className="rounded-2xl bg-cream/70 p-4 border border-seasoning/30">
                  <p className="font-semibold text-ug-black text-xs uppercase tracking-wider text-seasoning-600 mb-1">
                    Skylar's Teammate Response
                  </p>
                  <p className="text-ug-black font-medium">
                    "Revenue is up 18% to $4,820. But Saturday you turned away 14 orders between 6-8pm. Adding 2 drivers recovers ~$600/wknd. Want me to draft the shift request?"
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ SECTION 7: Roadmap (Dark) ═════════════════════════════════ */}
      <section className="surface-ink relative overflow-hidden py-24 md:py-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-35" />
        <div className="container-ug relative">
          <SectionHeader
            onDark
            eyebrow="What comes next"
            title={
              <>
                They keep learning. <span className="text-grad">You keep the same team.</span>
              </>
            }
          />
          <ol className="relative mt-20 grid gap-6 lg:grid-cols-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-seasoning/40 to-transparent lg:block"
            />
            {roadmap.map((r, i) => (
              <Reveal key={r.when} delay={i * 110} as="li" className="relative">
                <span className="relative z-10 grid size-14 place-items-center rounded-full border border-line-on-dark bg-ink-800 font-display text-xs font-bold text-seasoning-300 shadow-card">
                  {r.when}
                </span>
                <h3 className="mt-6 font-display text-lg font-bold text-ink-on-dark">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute-on-dark">{r.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ══ SECTION 8: Human-Centered Technology (Light) ══════════════ */}
      <section className="surface-paper relative overflow-hidden py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 size-[32rem] rounded-full bg-dijon/12 blur-3xl"
        />
        <div className="container-ug relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal className="flex justify-center">
              <span className="eyebrow">Human-centered technology</span>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-9 font-display text-[2.2rem] font-bold leading-[1.14] tracking-tight text-ug-black sm:text-[2.9rem]">
                Technology should never replace human relationships.
                <span className="mt-2 block text-grad-dark">It should strengthen them.</span>
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ug-black/70">
                Monique and Skylar exist to remove frustration and give hours back — so people spend
                less time navigating software and more time running businesses, supporting local
                communities and discovering what their city has to offer.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mx-auto mt-8 max-w-xl font-display text-lg font-semibold text-ug-black">
                Helpful. Personal. Intelligent. Always available. Always learning.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ SECTION 9: Final Action CTA Banner (Dark) ═════════════════ */}
      <section className="surface-ink relative overflow-hidden border-t border-line-on-dark py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-0 size-[36rem] rounded-full bg-seasoning/10 blur-3xl"
        />
        <div className="container-ug relative text-center">
          <Reveal immediate className="flex justify-center">
            <span className="eyebrow eyebrow-on-dark">Ready for the future of local commerce?</span>
          </Reveal>
          <Reveal immediate delay={100}>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink-on-dark sm:text-4xl md:text-5xl">
              Meet Monique & Skylar <span className="text-grad">in the Urban Goodz ecosystem.</span>
            </h2>
          </Reveal>
          <Reveal immediate delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-mute-on-dark">
              Whether you are a customer discovering local hidden gems or a business owner optimizing daily operations, your AI team is ready.
            </p>
          </Reveal>
          <Reveal immediate delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <LinkBtn to="/join" search={{ as: 'app' }} variant="primary">
                Talk to Monique
                <Icon name="arrow-up-right" size={18} />
              </LinkBtn>
              <LinkBtn to="/join" search={{ as: 'business' }} variant="on-dark">
                Meet Skylar
                <Icon name="arrow-up-right" size={18} />
              </LinkBtn>
              <LinkBtn to="/platform" variant="ghost">
                Why we built this
              </LinkBtn>
            </div>
          </Reveal>
          <Reveal immediate delay={400}>
            <p className="mt-10 text-sm text-mute-on-dark/60">
              One platform. One team. Welcome to a new way of experiencing local commerce.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

import { aiSystems } from '~/lib/platform'
import { Icon } from '../icons'
import { Reveal } from '../primitives'

export function AiSection() {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 size-[480px] rounded-full bg-seasoning/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-0 size-[420px] rounded-full bg-dijon/10 blur-3xl"
      />

      <div className="container-ug relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <span className="eyebrow eyebrow-on-dark">AI Platform</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-on-dark md:text-5xl">
              Ten AI systems. <span className="text-grad">One operating brain.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-mute-on-dark">
              AI runs across every corner of the ecosystem — helping customers discover, businesses
              grow, drivers save time and the whole network move smarter.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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

        {/* ── Character spotlight bridge ─────────────────────────── */}
        <Reveal delay={200} className="mt-12">
          <div className="rounded-3xl border border-line-on-dark bg-gradient-to-r from-ink-900 via-ink-800 to-ink-900 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lift">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 shrink-0">
                <img
                  src="/images/ai/monique-avatar.jpg"
                  alt="Monique"
                  className="size-12 rounded-full object-cover ring-2 ring-seasoning"
                />
                <img
                  src="/images/ai/skylar-avatar.jpg"
                  alt="Skylar"
                  className="size-12 rounded-full object-cover ring-2 ring-dijon"
                />
              </div>
              <div>
                <p className="font-display text-xl font-bold text-ink-on-dark">
                  Meet Monique & Skylar — Your Digital Teammates
                </p>
                <p className="mt-1 text-sm text-mute-on-dark">
                  Local Lifestyle Concierge & Executive Chief of Staff working 24/7 across the ecosystem.
                </p>
              </div>
            </div>
            <a
              href="/ai"
              className="btn btn-primary shrink-0"
            >
              Explore AI Team
              <Icon name="arrow-up-right" size={17} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

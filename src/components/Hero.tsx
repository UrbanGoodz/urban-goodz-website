import { Icon } from './icons'
import { LinkBtn, Reveal } from './primitives'
import { PhoneMock } from './PhoneMock'

const floats = [
  { label: 'Ebony active · Lifestyle Concierge', icon: 'spark' as const, avatar: '/images/ai/ebony-avatar.jpg', cls: 'left-[-8%] top-8 animate-float-slow' },
  { label: '25,000+ customers', icon: 'community' as const, cls: 'right-[-6%] top-1/4 animate-float' },
  { label: 'Skylar monitoring · Chief of Staff', icon: 'business' as const, avatar: '/images/ai/skylar-avatar.jpg', cls: 'left-[-14%] bottom-1/4 animate-float' },
  { label: 'Route optimized', icon: 'routes' as const, cls: 'right-[-8%] bottom-12 animate-float-slow' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden surface-paper pt-32 pb-16 md:pt-40 md:pb-24">
      {/* backdrop */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-seasoning/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-52 -right-40 size-[520px] rounded-full bg-dijon/20 blur-3xl"
      />

      <div className="container-ug relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal immediate>
            <span className="inline-flex items-center gap-2 rounded-full border border-seasoning/30 bg-seasoning/10 px-4 py-2 text-sm font-semibold text-seasoning-600">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seasoning opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-seasoning" />
              </span>
              Live in 15 markets · Powered by Ebony & Skylar
            </span>
          </Reveal>

          <Reveal immediate delay={90}>
            <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-ug-black md:text-7xl">
              Your Connection to{' '}
              <span className="text-grad-dark">Local Everything.</span>
            </h1>
          </Reveal>

          <Reveal immediate delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ug-black/70 md:text-xl">
              Urban Goodz is an AI-powered commerce platform connecting customers, businesses,
              retailers, creators, service providers and logistics through one intelligent
              ecosystem.
            </p>
          </Reveal>

          <Reveal immediate delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <LinkBtn to="/join" variant="primary" search={{ as: 'app' }}>
                Download the App
                <Icon name="arrow-up-right" size={18} />
              </LinkBtn>
              <LinkBtn to="/join" variant="dark" search={{ as: 'business' }}>
                Become a Business Partner
              </LinkBtn>
            </div>
          </Reveal>

          <Reveal immediate delay={340}>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
              <div>
                <p className="font-display text-2xl font-bold text-ug-black">25,000+</p>
                <p className="mt-1 text-sm text-ug-black/60 font-medium">Customers served</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-ug-black">2020</p>
                <p className="mt-1 text-sm text-ug-black/60 font-medium">Founded in Houston</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-ug-black">15+</p>
                <p className="mt-1 text-sm text-ug-black/60 font-medium">Markets live</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal immediate delay={200} className="relative">
          <PhoneMock className="animate-float-slow" />
          {floats.map((f) => (
            <div
              key={f.label}
              className={`glass absolute hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-ug-black shadow-card transition-transform duration-300 hover:scale-105 md:flex ${f.cls}`}
            >
              {'avatar' in f && f.avatar ? (
                <img
                  src={f.avatar}
                  alt=""
                  aria-hidden="true"
                  className="size-7 rounded-full object-cover ring-2 ring-seasoning/50 shrink-0"
                />
              ) : (
                <span className="grid size-6 place-items-center rounded-full grad-seasoning text-ug-black shrink-0">
                  <Icon name={f.icon} size={13} />
                </span>
              )}
              <span>{f.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

import { Icon } from './icons'
import { LinkBtn } from './primitives'

export function CtaBand() {
  return (
    <section className="surface-ink">
      <div className="container-ug py-20 md:py-28">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line-on-dark bg-ink-800/60 p-10 md:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-seasoning/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-dijon/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-seasoning-300">
              Local everything. One ecosystem.
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-on-dark md:text-5xl">
              Where will you go when everything you need is connected?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-mute-on-dark">
              Download the app to shop, order and book local. Or join the ecosystem as a business, a
              driver or a partner — onboarding is free.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <LinkBtn to="/join" variant="primary" search={{ as: 'app' }}>
                Download the App
                <Icon name="arrow-up-right" size={18} />
              </LinkBtn>
              <LinkBtn to="/join" variant="on-dark" search={{ as: 'business' }}>
                Become a Business Partner
              </LinkBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

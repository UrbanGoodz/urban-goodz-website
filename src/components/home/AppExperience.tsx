import { Reveal, SectionHeader } from '~/components/primitives'

const screens = [
  {
    src: '/images/assets/safety_app_review_phone.jpg',
    alt: 'Urban Goodz Review & Confirm Roadside Pro safety screen',
    step: '01 · Safety First',
    title: 'Review & Confirm',
    sub: 'Verified responder profiles, upfront pricing, and held funds until service is done.',
  },
  {
    src: '/images/sliced/poster02/00_row0col0.png',
    alt: 'Urban Goodz secure checkout screen for a home cleaning booking',
    step: '02 · Book',
    title: 'Secure checkout',
    sub: 'Add-ons, service fees and taxes — always clear before you pay.',
  },
  {
    src: '/images/sliced/poster02/01_row0col1.png',
    alt: 'Urban Goodz booking confirmed screen',
    step: '03 · Confirm',
    title: 'Confirmed in seconds',
    sub: 'Booking email, calendar and a direct line to your provider.',
  },
  {
    src: '/images/sliced/poster02/03_row1col0.png',
    alt: 'Urban Goodz booking details screen with live status timeline and provider messages',
    step: '04 · Track',
    title: 'Every booking, tracked',
    sub: 'Live status, provider messages and receipts in one thread.',
  },
]

export function AppExperience() {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 size-[460px] rounded-full bg-seasoning/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-0 size-[420px] rounded-full bg-dijon/10 blur-3xl"
      />

      <div className="container-ug relative py-20 md:py-28">
        <SectionHeader
          onDark
          eyebrow="App Experience"
          title={
            <>
              One app for your <span className="text-grad">whole neighborhood.</span>
            </>
          }
          lede="From checkout to confirmation to review — the Urban Goodz shopper app keeps every local booking moving in one seamless journey."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {screens.map((s, i) => (
            <Reveal key={s.src} delay={i * 90}>
              <figure>
                <div className="relative mx-auto w-full max-w-[300px]">
                  <div className="rounded-[2.25rem] border-[6px] border-ink-900 bg-ink-800 p-1.5 shadow-lift">
                    <div className="overflow-hidden rounded-[1.75rem] bg-paper">
                      <img src={s.src} alt={s.alt} loading="lazy" className="block w-full" />
                    </div>
                  </div>
                </div>
                <figcaption className="mt-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-seasoning-300">{s.step}</p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-ink-on-dark">{s.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-[260px] text-sm leading-relaxed text-mute-on-dark">{s.sub}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

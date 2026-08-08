import { site } from '~/lib/site'
import { appFeatures } from '~/lib/platform'
import { Icon } from '../icons'
import { LinkBtn, Reveal } from '../primitives'

export function DownloadSection() {
  return (
    <section className="surface-paper py-20 md:py-28" id="download">
      <div className="container-ug grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal className="flex">
            <span className="eyebrow">Download the App</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ug-black md:text-5xl">
              Your whole city, <span className="text-grad-dark">in your pocket.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-lg text-lg text-ug-black/70">
              One account for everything local — order, shop, book and track it all live.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {appFeatures.map((f, i) => (
              <Reveal key={f.title} delay={200 + i * 60}>
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full grad-seasoning text-ug-black">
                    <Icon name="check" size={16} />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-ug-black">{f.title}</h3>
                    <p className="mt-0.5 text-sm text-ug-black/60">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-[2.5rem] grad-canvas border border-line p-8 md:p-12">
            <div aria-hidden="true" className="absolute -right-16 -top-16 size-56 rounded-full bg-seasoning/25 blur-3xl" />

            <div className="relative mx-auto mb-9 w-full max-w-[248px]">
              <div className="rounded-[2.25rem] border-[6px] border-ink-900 bg-ink-800 p-1.5 shadow-lift">
                <div className="overflow-hidden rounded-[1.75rem] bg-paper">
                  <img
                    src="/images/app/booking-confirmed.png"
                    alt="Urban Goodz shopper app showing a confirmed booking with provider details and payment summary"
                    loading="lazy"
                    className="block w-full"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <p className="font-display text-lg font-semibold text-ug-black">
                Urban Goodz app — live in 15 markets
              </p>
              <p className="mt-2 text-sm text-ug-black/65">
                Launching to the app stores soon. Join the waitlist and be first in line when the app
                lands on your phone.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <LinkBtn to="/join" variant="dark" className="w-full sm:w-auto" search={{ as: 'app' }}>
                  <Icon name="order" size={18} />
                  App Store waitlist
                </LinkBtn>
                <LinkBtn to="/join" variant="ghost" className="w-full sm:w-auto" search={{ as: 'app' }}>
                  <Icon name="order" size={18} />
                  Google Play waitlist
                </LinkBtn>
              </div>
              <div className="mt-8 rounded-2xl border border-ug-black/10 bg-white/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ug-black/50">Have a business?</p>
                <p className="mt-2 text-sm text-ug-black/75">
                  Partners get live in the marketplace in minutes — free. Reach{' '}
                  <a href={`mailto:${site.email}`} className="font-semibold text-seasoning-700 underline underline-offset-4">
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

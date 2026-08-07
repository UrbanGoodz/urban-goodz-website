import { createFileRoute } from '@tanstack/react-router'
import { CtaBand } from '~/components/CtaBand'
import { Icon } from '~/components/icons'
import { PageHero } from '~/components/PageHero'
import { Reveal, SectionHeader, Stat } from '~/components/primitives'
import { milestones, pressItems, traction } from '~/lib/press'
import { site } from '~/lib/site'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      ...seo({
        title: 'About — Urban Goodz',
        description:
          'Urban Goodz is an AI-powered local commerce ecosystem founded by D’Andre Good in Houston, Texas — a modern digital Black Wall Street.',
        path: '/about',
        keywords: ['Urban Goodz about', 'D’Andre Good', 'Black-owned technology', 'Houston startup'],
      }).meta,
    ],
  }),
  component: About,
})

const values = [
  {
    icon: 'community' as const,
    title: 'Community first',
    body: 'Technology is the tool. People are the point. Every feature is built to put wealth, opportunity and dignity back into neighborhoods.',
  },
  {
    icon: 'business' as const,
    title: 'Economic inclusion',
    body: 'We build for the businesses and drivers big platforms leave behind — underrepresented founders, overlooked neighborhoods, everyday workers.',
  },
  {
    icon: 'ai' as const,
    title: 'AI that empowers',
    body: 'Small businesses should have enterprise intelligence. Our AI is built to give every owner a chief of staff, not to replace anyone.',
  },
  {
    icon: 'shield' as const,
    title: 'Dignity in delivery',
    body: 'From drivers who keep every dollar to customers treated with respect — the standard is that no one in this ecosystem is an afterthought.',
  },
]

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            An ecosystem built on <span className="text-grad">a belief.</span>
          </>
        }
        lede="Urban Goodz started with a simple idea: local businesses shouldn’t have to choose between their community and their future. Technology should be on their side."
      />

      {/* ── Mission ─────────────────────────────────────────────── */}
      <section className="surface-paper py-20 md:py-28">
        <div className="container-ug grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Our Mission"
              title={
                <>
                  We exist to create <span className="text-grad-dark">economic opportunity.</span>
                </>
              }
              lede="Local businesses deserve enterprise-grade technology. Urban Goodz is building a modern digital Black Wall Street — helping businesses, especially those owned by people from underrepresented communities, compete, grow and thrive through technology."
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {traction.slice(0, 4).map((t) => (
                <Stat key={t.label} value={t.value} label={t.label} />
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} as="article">
                <div className="lift h-full rounded-3xl border border-line bg-white/70 p-7">
                  <span className="grid size-12 place-items-center rounded-2xl grad-seasoning text-ug-black">
                    <Icon name={v.icon} size={24} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ug-black">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ug-black/65">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder ─────────────────────────────────────────────── */}
      <section className="border-t border-line bg-cream/40 py-20 md:py-28">
        <div className="container-ug grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-ink-800 p-10 text-ink-on-dark md:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-seasoning/20 blur-3xl"
              />
              <img
                src="/images/founder/dandre-speaking.png"
                alt={`${site.founder} speaking`}
                className="size-14 rounded-2xl object-cover"
                loading="lazy"
              />
              <blockquote className="mt-6 font-display text-xl font-semibold leading-snug">
                “I didn’t build Urban Goodz to become another delivery company. I built it because I believe
                technology should strengthen communities instead of replacing them. Black Wall Street wasn’t
                just a place. It was proof of what happens when communities invest in one another, businesses
                support one another, and opportunity stays where it is created. That legacy inspires our
                mission to use technology to help local businesses compete, entrepreneurs thrive, and
                neighborhoods build lasting wealth together. We aren’t just delivering food, packages, or
                services. We’re delivering opportunity and helping build the next generation of economic
                empowerment, one community at a time.”
              </blockquote>
              <div className="mt-8">
                <p className="font-display text-lg font-bold">{site.founder}</p>
                <p className="text-sm text-mute-on-dark">{site.founderRole}</p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeader
              align="left"
              eyebrow="Founder"
              title={
                <>
                  From a driver’s seat in Houston <span className="text-grad-dark">to a national vision.</span>
                </>
              }
              lede="Urban Goodz didn’t start as a tech company. It started with a belief about who deserves access — and a delivery driver’s seat in Houston."
            />
            <div className="mt-8 space-y-4">
              {[
                'Founded during a global pandemic, growing from a single driver to a network of local businesses.',
                'Recognized by the Houston Business Journal, Houston Chronicle, GoDaddy, InnovationMap and more.',
                'Selected for gBETA Houston, the Northwestern Mutual Black Founder Accelerator and gener8tor Huntsville.',
                'Evolved from delivery into a full AI-powered commerce ecosystem under the Urban Goodz name.',
              ].map((point, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-seasoning/15 text-seasoning-600">
                      <Icon name="check" size={13} />
                    </span>
                    <p className="text-sm leading-relaxed text-ug-black/70">{point}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder Story ───────────────────────────────────────── */}
      <section className="surface-paper py-20 md:py-28">
        <div className="container-ug grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="overflow-hidden rounded-[2.5rem] border border-line shadow-card">
                <img
                  src="/images/founder/dandre-good.png"
                  alt={`${site.founder}, founder of Urban Goodz`}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-6 font-display text-base font-bold text-ug-black">Built in Houston. Designed for Everywhere.</p>
            </Reveal>
          </div>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Founder Story"
              title={
                <>
                  The story behind <span className="text-grad-dark">Urban Goodz.</span>
                </>
              }
            />
            <div className="prose-story mt-8 space-y-5 text-sm leading-relaxed text-ug-black/70 md:text-base">
              <p>Urban Goodz wasn&rsquo;t born in a boardroom.</p>
              <p>
                It wasn&rsquo;t the result of venture capital, a Silicon Valley accelerator, or a group of
                executives trying to squeeze another percentage point out of the delivery economy.
              </p>
              <p>It was born from seeing something that didn&rsquo;t make sense.</p>
              <p>
                Every day, incredible local businesses poured their hearts into serving their communities, yet
                many struggled to compete with national chains and massive technology companies that had
                billions of dollars, endless resources, and platforms built in their favor. Independent
                restaurants, neighborhood retailers, service providers, creators, and entrepreneurs often had
                everything they needed except access to the same technology and visibility their larger
                competitors enjoyed.
              </p>
              <p>I believed they deserved better.</p>
              <p>Not because they needed charity.</p>
              <p>Because they deserved opportunity.</p>
              <p>
                Urban Goodz began with a simple belief: technology shouldn&rsquo;t determine who gets to
                succeed. The businesses that give our neighborhoods their culture, personality, and identity
                deserve the same modern tools as the biggest brands in the world.
              </p>
              <p>That belief quickly grew into something much larger than food delivery.</p>
              <p>
                I realized local communities don&rsquo;t just need another app to order dinner. They need a
                platform that helps people discover neighborhood businesses, book local services, find trusted
                professionals, support creators, earn income, move goods, respond to emergencies, and keep more
                economic opportunity circulating where it belongs.
              </p>
              <p>That&rsquo;s why Urban Goodz is becoming far more than a delivery company.</p>
              <p>We&rsquo;re building an ecosystem.</p>
              <p>
                One platform where someone can order from a favorite neighborhood restaurant, hire a local
                handyman, book roadside assistance, schedule a medical courier, support an independent creator,
                discover a Black-owned business, rent a vehicle, send a package across town, or connect with
                the countless entrepreneurs who make our communities thrive every single day.
              </p>
              <p>Because local commerce has never been just about transactions.</p>
              <p>It&rsquo;s about relationships.</p>
              <p>It&rsquo;s about families building businesses.</p>
              <p>It&rsquo;s about dreams that deserve a chance.</p>
              <p>It&rsquo;s about neighborhoods investing in one another.</p>
              <p>Technology should strengthen those connections, not replace them.</p>
              <p>Every feature we build begins with one question:</p>
              <p className="font-display text-lg font-semibold italic text-ug-black">
                &ldquo;Does this create more opportunity for real people?&rdquo;
              </p>
              <p>If the answer isn&rsquo;t yes, we keep building.</p>
              <p>
                Urban Goodz exists to help independent businesses compete with modern technology, empower
                drivers and service professionals as partners, strengthen local economies, and connect
                communities through commerce that keeps opportunity moving.
              </p>
              <p>
                We&rsquo;re proud that our journey started in Houston, one of the most diverse and
                entrepreneurial cities in America.
              </p>
              <p>But this mission was never meant to stop there.</p>
              <p>
                We&rsquo;re building Urban Goodz so every city can celebrate its own businesses, creators,
                entrepreneurs, and communities while giving them the technology they need to compete on a level
                playing field.
              </p>
              <p>Because when local businesses win, neighborhoods grow stronger.</p>
              <p>When neighborhoods grow stronger, cities become more connected.</p>
              <p>
                And when technology works for communities instead of around them, everyone moves forward
                together.
              </p>
              <p className="font-display text-lg font-semibold text-ug-black">That&rsquo;s the future we&rsquo;re building.</p>
              <p className="font-display text-lg font-semibold text-ug-black">Welcome to Urban Goodz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────── */}
      <section className="surface-paper py-20 md:py-28">
        <div className="container-ug grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Our Story"
              title={
                <>
                  The journey <span className="text-grad-dark">so far.</span>
                </>
              }
              lede="From a 2020 launch to an AI-powered platform — the milestones behind the mission."
            />
          </div>
          <div className="relative">
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

      {/* ── Recognition strip ───────────────────────────────────── */}
      <section className="border-t border-line bg-cream/40 py-20 md:py-28">
        <div className="container-ug">
          <SectionHeader
            eyebrow="Recognition"
            title={
              <>
                Featured by <span className="text-grad-dark">those who noticed.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pressItems.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <article className="lift h-full rounded-3xl border border-line bg-white/70 p-6">
                  <p className="font-display text-base font-bold text-ug-black">{p.source}</p>
                  <h3 className="mt-2 text-sm font-medium leading-snug text-ug-black/75">{p.title}</h3>
                  <p className="mt-4 text-xs font-medium text-ug-black/45">{p.date}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

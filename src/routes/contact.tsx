import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { Icon, type IconName } from '~/components/icons'
import { PageHero } from '~/components/PageHero'
import { Reveal } from '~/components/primitives'
import { site } from '~/lib/site'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/contact')({
  head: () => {
    const s = seo({
      title: 'Contact — Urban Goodz',
      description:
        'Talk to Urban Goodz about downloading the app, becoming a business partner, driving with us or partnering with the platform.',
      path: '/contact',
      keywords: ['Urban Goodz contact', 'become a partner', 'Urban Goodz app', 'Houston delivery'],
    })
    return { meta: s.meta, links: s.links }
  },
  component: Contact,
})

const channels: { icon: IconName; label: string; value: string; href: string; note: string }[] = [
  {
    icon: 'mail',
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    note: 'For partners, press and general inquiries',
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: site.phone,
    href: `tel:+1${site.phone.replace(/-/g, '')}`,
    note: 'Monday–Saturday, 9am–6pm CT',
  },
  {
    icon: 'map-pin',
    label: 'Headquarters',
    value: 'Houston, Texas',
    href: 'https://maps.google.com/?q=Houston,TX',
    note: 'Built and operated from the launch market',
  },
]

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('General inquiry')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${topic} — ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s build the future of <span className="text-grad">local commerce.</span>
          </>
        }
        lede="Whether you’re a customer, a business owner, a driver or a partner — we’d love to hear from you."
      />

      {/* ── Channels ────────────────────────────────────────────── */}
      <section className="surface-paper py-16 md:py-20">
        <div className="container-ug grid gap-4 md:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="lift flex h-full items-start gap-4 rounded-3xl border border-line bg-white/70 p-6"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl grad-seasoning text-ug-black">
                  <Icon name={c.icon} size={20} />
                </span>
                <span>
                  <span className="block font-display font-bold text-ug-black">{c.label}</span>
                  <span className="mt-0.5 block text-sm font-medium text-seasoning-600">{c.value}</span>
                  <span className="mt-1 block text-xs text-ug-black/55">{c.note}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Form ────────────────────────────────────────────────── */}
      <section className="surface-paper pb-20 md:pb-28">
        <div className="container-ug grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Send a Message</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ug-black md:text-4xl">
                We read every message <span className="text-grad-dark">ourselves.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ug-black/70">
                No bots, no tickets lost in a queue. Tell us what you’re building, ordering or driving —
                and we’ll get back to you fast.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  'Customers: app access and order support',
                  'Businesses: zero-cost storefront onboarding',
                  'Drivers: sign up and earnings details',
                  'Partners & press: collaboration opportunities',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-ug-black/75">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-seasoning/15 text-seasoning-600">
                      <Icon name="check" size={12} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {Object.entries(site.social).map(([network, href]) => (
                  <a
                    key={network}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Urban Goodz on ${network}`}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ug-black/60 transition hover:border-seasoning hover:text-seasoning-600"
                  >
                    <Icon name={network as IconName} size={18} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} className="rounded-[2rem] border border-line bg-white/80 p-8 shadow-card md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ug-black">Your name</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ug-black placeholder:text-ug-black/35 focus:border-seasoning"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ug-black">Email</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ug-black placeholder:text-ug-black/35 focus:border-seasoning"
                  />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm font-semibold text-ug-black">I’m reaching out about</span>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ug-black focus:border-seasoning"
                >
                  <option>General inquiry</option>
                  <option>Downloading the app</option>
                  <option>Becoming a business partner</option>
                  <option>Driving with Urban Goodz</option>
                  <option>Press & media</option>
                </select>
              </label>
              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm font-semibold text-ug-black">Message</span>
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us a little about what you need…"
                  className="w-full resize-none rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ug-black placeholder:text-ug-black/35 focus:border-seasoning"
                />
              </label>
              <button type="submit" className="btn btn-primary mt-7 w-full">
                Send message
                <Icon name="arrow-up-right" size={18} />
              </button>
              <p className="mt-4 text-center text-xs text-ug-black/60">
                Opens your email app addressed to {site.email} — we reply personally.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}

import { Link } from '@tanstack/react-router'
import { site } from '~/lib/site'
import { Icon, Wordmark } from './icons'

const columns: { heading: string; links: { label: string; to?: string; hash?: string; href?: string }[] }[] = [
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Press & Recognition', to: '/press' },
      { label: 'Markets', to: '/markets' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'Platform', to: '/platform' },
      { label: 'Business Portal', to: '/', hash: 'business-platform' },
      { label: 'Driver Platform', to: '/', hash: 'drivers' },
      { label: 'Fashion Fit', to: '/', hash: 'fashion-fit' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', to: '/coming-soon' },
      { label: 'Terms of Service', to: '/coming-soon' },
      { label: 'Accessibility', to: '/coming-soon' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="surface-ink">
      <div className="container-ug py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link to="/" aria-label="Urban Goodz — home" className="inline-block">
              <Wordmark className="h-9 w-auto" variant="dark" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-mute-on-dark">
              An AI-powered commerce ecosystem connecting customers, businesses, retailers, creators, service
              providers, healthcare providers and drivers through one intelligent platform.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urban Goodz on Instagram"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line-on-dark text-mute-on-dark transition hover:border-seasoning hover:text-seasoning-300"
              >
                <Icon name="instagram" size={18} />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urban Goodz on Facebook"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line-on-dark text-mute-on-dark transition hover:border-seasoning hover:text-seasoning-300"
              >
                <Icon name="facebook" size={18} />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urban Goodz on LinkedIn"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line-on-dark text-mute-on-dark transition hover:border-seasoning hover:text-seasoning-300"
              >
                <Icon name="linkedin" size={18} />
              </a>
              <a
                href={site.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urban Goodz on X"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line-on-dark text-mute-on-dark transition hover:border-seasoning hover:text-seasoning-300"
              >
                <Icon name="x" size={16} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-on-dark">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to ?? '/'}
                      hash={link.hash}
                      className="text-sm text-mute-on-dark transition hover:text-seasoning-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-on-dark pt-8 text-sm text-mute-on-dark md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Built in {site.hq}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-flex size-2 rounded-full bg-seasoning" aria-hidden="true" />
            25,000+ customers and growing
          </p>
        </div>
      </div>
    </footer>
  )
}

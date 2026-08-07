/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import * as React from 'react'
import { Footer } from '~/components/Footer'
import { Nav } from '~/components/Nav'
import { PushOptIn } from '~/components/PushOptIn'
import { site } from '~/lib/site'
import appCss from '~/styles/app.css?url'
import { jsonLd, seo } from '~/utils/seo'
import { ComingSoon } from '~/components/ComingSoon'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'

export const Route = createRootRoute({
  head: () => ({
    title: `${site.name} — ${site.tagline}`,
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: `${site.name} — ${site.tagline}`,
        description: site.description,
        path: '/',
      }).meta,
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap',
      },
      { rel: 'icon', type: 'image/png', href: '/brand/ug-app-mark.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'canonical', href: site.url },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: jsonLd(
          {
            '@type': 'Organization',
            name: site.name,
            legalName: site.legalName,
            url: site.url,
            logo: `${site.url}/brand/ug-wordmark.png`,
            foundingDate: '2020',
            founder: { '@type': 'Person', name: site.founder },
            address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: `+1-${site.phone.replace(/-/g, '')}`,
              contactType: 'customer service',
              email: site.email,
            },
            sameAs: Object.values(site.social),
          },
          'organization',
        ),
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <ComingSoon title="Page not found" />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-seasoning focus:px-5 focus:py-3 focus:font-semibold focus:text-ug-black"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <PushOptIn />
        <Scripts />
      </body>
    </html>
  )
}

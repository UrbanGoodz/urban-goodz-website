import { site, type SeoInput } from '~/lib/site'

export type SeoHead = {
  title: string
  meta: Record<string, string>[]
  links: Record<string, string>[]
  scripts: Record<string, string>[]
}

export const jsonLd = (data: Record<string, unknown>, name = 'jsonld') =>
  JSON.stringify({ '@context': 'https://schema.org', ...data })

export function seo(input: SeoInput & { noindex?: boolean }): SeoHead {
  const { title, description, path, image, type = 'website', keywords, noindex } = input
  const url = `${site.url}${path === '/' ? '' : path}`
  const og = image ?? `${site.url}/og-image.png`

  const meta: Record<string, string>[] = [
    // TanStack renders <title> from a meta entry carrying a `title` key. Routes
    // only ever spread `seo(...).meta`, so the title has to live in here or no
    // page gets one at all.
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' },
    { name: 'theme-color', content: '#161616' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: og },
    { name: 'og:type', content: type },
    { name: 'og:site_name', content: site.name },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:url', content: url },
    { name: 'og:image', content: og },
    { name: 'og:image:width', content: '1200' },
    { name: 'og:image:height', content: '630' },
  ]
  if (keywords?.length) meta.push({ name: 'keywords', content: keywords.join(', ') })

  const links: Record<string, string>[] = [
    { rel: 'canonical', href: url },
    { rel: 'alternate', hreflang: 'en-us', href: url },
  ]

  return { title, meta, links, scripts: [] }
}

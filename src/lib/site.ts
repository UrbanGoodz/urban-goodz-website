export const site = {
  name: 'Urban Goodz',
  legalName: 'Urban Goodz',
  tagline: 'Your Connection to Local Everything',
  description:
    'Urban Goodz is an AI-powered local commerce ecosystem connecting customers, businesses, retailers, creators, service providers, healthcare providers and drivers through one intelligent platform.',
  url: 'https://www.urbangoodzdelivery.com',
  domain: 'urbangoodzdelivery.com',
  founder: 'D’Andre Good',
  founderRole: 'Founder & CEO',
  hq: 'Houston, Texas',
  founded: 2020,
  customers: '25,000+',
  email: 'support@urbangoodzdelivery.com',
  phone: '713-459-6000',
  social: {
    instagram: 'https://www.instagram.com/urbaneatzdelivery',
    facebook: 'https://www.facebook.com/UrbanEatzDelivery',
    twitter: 'https://twitter.com/EatzUrban',
    linkedin: 'https://www.linkedin.com/in/dscottgood',
  },
} as const

export type SeoInput = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  keywords?: string[]
}

export const absoluteUrl = (path: string) => `${site.url}${path === '/' ? '' : path}`

/** Default OG image used across the site (served from public/). */
export const ogImage = (path: string) => absoluteUrl(`/og${path === '/' ? '-home' : path}.png`)

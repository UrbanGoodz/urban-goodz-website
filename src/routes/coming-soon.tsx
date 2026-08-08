import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '~/components/ComingSoon'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/coming-soon')({
  head: () => {
    const s = seo({
      title: 'Coming Soon — Urban Goodz',
      description: 'This Urban Goodz page is coming soon. Explore the platform or get in touch in the meantime.',
      path: '/coming-soon',
      noindex: true,
    })
    return { meta: s.meta, links: s.links }
  },
  component: ComingSoon,
})

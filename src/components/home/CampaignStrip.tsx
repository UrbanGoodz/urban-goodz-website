import { Icon } from '~/components/icons'
import { Reveal, SectionHeader } from '~/components/primitives'
import { PhotoCard } from '~/components/visuals/PhotoCard'

const campaign = [
  {
    src: '/images/dash/up3x/product-cards.png',
    alt: 'Urban Goodz marketplace with local business cards',
    tag: 'Marketplace',
    title: 'Local commerce, one app',
    sub: 'Businesses across 15 markets selling to their neighbors.',
  },
  {
    src: '/images/dash/up3x/business-cards.png',
    alt: 'Urban Goodz restaurant and service business cards',
    tag: 'Restaurants',
    title: 'Order anything, anywhere',
    sub: 'Restaurants, groceries and packages on demand.',
  },
  {
    src: '/images/dash/up3x/medical-courier.png',
    alt: 'Urban Goodz medical courier dashboard',
    tag: 'Health',
    title: 'Medical courier on demand',
    sub: 'Prescriptions and specimens, handled with care.',
  },
  {
    src: '/images/dash/up3x/ai-copilot.png',
    alt: 'Urban Goodz AI copilot chat interface',
    tag: 'AI',
    title: 'Your AI concierge',
    sub: 'Goodz Copilot plans, orders and routes for you.',
  },
]

export function CampaignStrip() {
  return (
    <section className="border-t border-line bg-cream/40 py-20 md:py-28">
      <div className="container-ug">
        <SectionHeader
          eyebrow="Campaign"
          title={
            <>
              Made for the way <span className="text-grad-dark">communities move.</span>
            </>
          }
          lede="Real scenes from the Urban Goodz app — one intelligent ecosystem connecting local businesses, drivers, creators and neighbors in every market."
        />

        <Reveal className="mt-14">
          <PhotoCard
            src="/images/app/live-dispatch.png"
            alt="Urban Goodz live dispatch map showing active orders, drivers online, open businesses and average ETA"
            tag="The platform"
            title="Every part of the ecosystem, designed together"
            sub="Merchant dashboards, driver tools and AI assistance — flowing through one intelligent network."
            ratio="aspect-[4/3] md:aspect-[16/9]"
            tone="orange"
          />
        </Reveal>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 md:grid-cols-4 md:gap-5">
          {campaign.map((c, i) => (
            <Reveal key={c.src} delay={i * 90}>
              <PhotoCard
                src={c.src}
                alt={c.alt}
                tag={c.tag}
                title={c.title}
                sub={c.sub}
                ratio="aspect-[4/3]"
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-ug-black/55">
            <Icon name="map-pin" size={16} />
            Built in Houston. Designed for Everywhere.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

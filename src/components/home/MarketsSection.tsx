import { Link } from '@tanstack/react-router'
import { Icon } from '../icons'
import { MapLegend, MarketsMap } from '../MarketsMap'
import { Reveal, SectionHeader } from '../primitives'
import { activeMarkets, expansionMarkets } from '../../lib/markets'

const marketRow = [
  ...activeMarkets.map((m) => ({ name: m.name + (m.state ? `, ${m.state}` : ''), status: 'Live market', active: true })),
  ...expansionMarkets.map((m) => ({ name: m.name, status: 'Planned', active: false })),
]

export function MarketsSection() {
  return (
    <section className="surface-ink py-20 md:py-28" id="markets">
      <div className="container-ug">
        <SectionHeader
          onDark
          eyebrow="Markets"
          title={
            <>
              Built in Houston. <span className="text-grad">Live across the country.</span>
            </>
          }
          lede="Urban Goodz runs live across 15 U.S. markets today — from Houston to Los Angeles to New York City — with more cities on the roadmap."
        />

        <Reveal delay={120} className="mt-14 rounded-[2rem] border border-line-on-dark bg-ink-800/50 p-6 md:p-10">
          <MarketsMap onDark className="max-w-3xl mx-auto" />
          <div className="mt-8">
            <MapLegend onDark />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {marketRow.map((m) => (
            <div
              key={m.name}
              className="flex items-center justify-between rounded-2xl border border-line-on-dark bg-ink-800/40 px-5 py-4"
            >
              <span className="flex items-center gap-2.5 font-display font-semibold text-ink-on-dark">
                <Icon name="map-pin" size={16} className={m.active ? 'text-seasoning-300' : 'text-mute-on-dark'} />
                {m.name}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  m.active ? 'bg-seasoning/15 text-seasoning-300' : 'bg-line-on-dark text-mute-on-dark'
                }`}
              >
                {m.status}
              </span>
            </div>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link to="/markets" className="btn btn-on-dark">
            Explore the Markets Map
            <Icon name="arrow-right" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

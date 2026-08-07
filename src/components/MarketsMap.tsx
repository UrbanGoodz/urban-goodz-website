import { markets } from '~/lib/markets'

/* Approximate centroids (lat, lon) for all 50 states + DC */
const stateDots: [string, number, number][] = [
  ['AL', 32.8, -86.8], ['AZ', 34.0, -111.7], ['AR', 34.8, -92.4], ['CA', 36.8, -119.8],
  ['CO', 39.0, -105.5], ['CT', 41.6, -72.7], ['DE', 39.0, -75.5], ['FL', 27.8, -81.6],
  ['GA', 33.0, -83.5], ['ID', 44.0, -114.8], ['IL', 40.0, -89.0], ['IN', 39.8, -86.3],
  ['IA', 42.0, -93.5], ['KS', 38.5, -98.3], ['KY', 37.5, -85.0], ['LA', 31.1, -92.0],
  ['ME', 45.4, -69.2], ['MD', 39.0, -76.8], ['MA', 42.3, -71.8], ['MI', 43.3, -84.5],
  ['MN', 46.3, -94.3], ['MS', 32.7, -89.6], ['MO', 38.4, -92.6], ['MT', 47.0, -109.6],
  ['NE', 41.5, -99.8], ['NV', 39.3, -116.6], ['NH', 43.7, -71.6], ['NJ', 40.2, -74.4],
  ['NM', 34.8, -106.0], ['NY', 43.0, -75.8], ['NC', 35.6, -79.4], ['ND', 47.5, -100.5],
  ['OH', 40.3, -82.8], ['OK', 35.7, -97.5], ['OR', 43.9, -120.5], ['PA', 40.9, -77.8],
  ['RI', 41.7, -71.5], ['SC', 33.9, -80.9], ['SD', 44.4, -100.2], ['TN', 35.8, -86.4],
  ['TX', 31.5, -99.3], ['UT', 39.3, -111.6], ['VT', 44.1, -72.7], ['VA', 37.6, -78.6],
  ['WA', 47.4, -120.5], ['WV', 38.6, -80.6], ['WI', 44.5, -89.4], ['WY', 43.0, -107.5],
  ['DC', 38.9, -77.0],
]

/* Equirectangular projection over the contiguous US */
const LON_MIN = -125, LON_MAX = -67, LAT_MIN = 24, LAT_MAX = 50
const project = (lat: number, lon: number) => ({
  x: ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 100,
  y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100,
})

const houston = markets.find((m) => m.slug === 'houston')!
const houstonPt = project(houston.coords.lat, houston.coords.lon)

export function MarketsMap({
  onSelect,
  selected,
  onDark = false,
  className = '',
}: {
  onSelect?: (slug: string) => void
  selected?: string
  onDark?: boolean
  className?: string
}) {
  const dot = onDark ? 'rgba(226,211,191,0.16)' : 'rgba(22,22,22,0.13)'
  const label = onDark ? '#b4ac9e' : 'rgba(22,22,22,0.6)'

  return (
    <svg
      viewBox="-4 -4 108 70"
      role="img"
      aria-label="Urban Goodz U.S. markets map — 15 live markets across the country"
      className={`h-auto w-full ${className}`}
    >
      {/* State dots */}
      {stateDots.map(([abbr, lat, lon]) => (
        <circle key={abbr} cx={project(lat, lon).x} cy={project(lat, lon).y} r="1.15" fill={dot} />
      ))}

      {/* Route lines from Houston to expansion markets */}
      {markets
        .filter((m) => m.status === 'expansion')
        .map((m) => {
          const p = project(m.coords.lat, m.coords.lon)
          return (
            <path
              key={m.slug}
              d={`M ${houstonPt.x} ${houstonPt.y} Q ${(houstonPt.x + p.x) / 2} ${Math.min(houstonPt.y, p.y) - 6} ${p.x} ${p.y}`}
              fill="none"
              stroke={onDark ? 'rgba(237,153,20,0.45)' : 'rgba(237,153,20,0.5)'}
              strokeWidth="0.45"
              strokeDasharray="1.6 1.8"
              strokeLinecap="round"
              className="animate-route-dash"
            />
          )
        })}

      {/* Market markers */}
      {markets.map((m) => {
        const p = project(m.coords.lat, m.coords.lon)
        const isActive = m.status === 'active'
        const isSelected = selected === m.slug
        const active = onDark ? '#f3b03a' : '#ed9914'
        const expansion = onDark ? '#e5e276' : '#c97e0a'
        const color = isActive ? active : expansion
        const big = isActive ? 2.4 : 1.7
        const labelOff: Record<string, [number, number]> = {
          houston: [2.4, -7.4],
          austin: [-9.4, 0.6],
          'gulf-coast': [1.6, 2.8],
          'new-york-city': [-4.4, -3.4],
          'los-angeles': [1.2, -3.4],
          dmv: [1.4, -3.4],
          'new-orleans': [1.4, -3.4],
        }
        const def = labelOff[m.slug]
        const labelDx = def ? def[0] : p.x > 75 ? -1 : p.x < 18 ? 1.2 : 0.6
        const labelDy = def ? def[1] : p.y < 20 ? 4.5 : -3.4
        return (
          <g
            key={m.slug}
            transform={`translate(${p.x} ${p.y})`}
            className={onSelect ? 'cursor-pointer' : ''}
            role={onSelect ? 'button' : undefined}
            aria-label={`${m.name} — ${m.statusLabel}`}
            tabIndex={onSelect ? 0 : undefined}
            onClick={onSelect ? () => onSelect(m.slug) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelect(m.slug)
                    }
                  }
                : undefined
            }
          >
            {isActive && (
              <>
                <circle r="9" fill={color} opacity="0.12" className="animate-pulse-ring" style={{ transformOrigin: '0px 0px' }} />
                <circle r="9" fill={color} opacity="0.12" className="animate-pulse-ring" style={{ transformOrigin: '0px 0px', animationDelay: '1.3s' }} />
              </>
            )}
            <circle r={big + (isSelected ? 1 : 0)} fill={color} stroke={onDark ? '#131313' : '#fdfbf7'} strokeWidth="0.5" />
            <text x={labelDx} y={labelDy} fontSize="3.1" fontWeight={isActive ? 700 : 500} fill={isActive ? color : label} textAnchor="start">
              {m.name.split(',')[0]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function MapLegend({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
      <span className="flex items-center gap-2 text-mute-on-dark">
        <span className="size-2.5 rounded-full bg-seasoning-400" aria-hidden="true" />
        Live market
      </span>
      <span className="flex items-center gap-2 text-mute-on-dark">
        <span className="size-2.5 rounded-full bg-dijon" aria-hidden="true" />
        Planned expansion
      </span>
    </div>
  )
}

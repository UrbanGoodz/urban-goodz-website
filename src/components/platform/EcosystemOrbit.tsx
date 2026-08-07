import { Icon } from '../icons'
import type { IconName } from '../icons'

type Node = { name: string; icon: IconName }

/** Ordered clockwise from the top. */
const nodes: Node[] = [
  { name: 'Customers', icon: 'bag' },
  { name: 'Restaurants', icon: 'restaurants' },
  { name: 'Retail', icon: 'retail' },
  { name: 'Shopping', icon: 'market' },
  { name: 'Services', icon: 'services' },
  { name: 'Creators', icon: 'creator' },
  { name: 'Community', icon: 'community' },
  { name: 'Businesses', icon: 'business' },
  { name: 'Drivers', icon: 'drivers' },
  { name: 'Freight', icon: 'freight' },
  { name: 'Medical', icon: 'medical' },
  { name: 'AI', icon: 'ai' },
]

const R = 39 // orbit radius, in % of the square container

const points = nodes.map((n, i) => {
  const theta = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
  return { ...n, x: 50 + R * Math.cos(theta), y: 50 + R * Math.sin(theta) }
})

export function EcosystemOrbit() {
  return (
    <div className="relative mx-auto w-full max-w-[46rem]">
      {/* ── Constellation (lg and up) ─────────────────────────────── */}
      <div className="relative hidden aspect-square lg:block">
        {/* slow decorative rings */}
        <div
          aria-hidden="true"
          className="absolute inset-[9%] rounded-full border border-dashed border-seasoning/20 animate-orbit"
        />
        <div
          aria-hidden="true"
          className="absolute inset-[22%] rounded-full border border-line-on-dark animate-orbit-rev"
        />

        {/* connective tissue */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          <defs>
            <radialGradient id="orbit-core-glow">
              <stop offset="0" stopColor="#ED9914" stopOpacity="0.30" />
              <stop offset="1" stopColor="#ED9914" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="34" fill="url(#orbit-core-glow)" />
          {points.map((p, i) => (
            <line
              key={p.name}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke="rgba(237,153,20,0.42)"
              strokeWidth="0.22"
              strokeDasharray="1.4 1.8"
              className="animate-route-dash"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </svg>

        {/* core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative grid size-32 place-items-center rounded-full bg-ink-900 shadow-halo">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-seasoning/16 animate-pulse-ring"
            />
            <img
              src="/branding/logo-short-white.svg"
              alt=""
              aria-hidden="true"
              className="w-14"
              loading="lazy"
            />
          </div>
        </div>

        {/* orbiting nodes */}
        {points.map((p, i) => (
          <div
            key={p.name}
            className="absolute animate-float"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 420}ms`,
              animationDuration: `${7 + (i % 4)}s`,
            }}
          >
            <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line-on-dark bg-ink-800/85 px-3.5 py-2 text-[0.8rem] font-semibold text-ink-on-dark backdrop-blur-sm">
              <span className="grid size-6 shrink-0 place-items-center rounded-full grad-seasoning text-ug-black">
                <Icon name={p.icon} size={12} />
              </span>
              {p.name}
            </span>
          </div>
        ))}
      </div>

      {/* ── Compact stack (below lg) ──────────────────────────────── */}
      <div className="lg:hidden">
        <div className="relative mx-auto grid size-28 place-items-center rounded-full bg-ink-900 shadow-halo">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-seasoning/16 animate-pulse-ring"
          />
          <img
            src="/branding/logo-short-white.svg"
            alt=""
            aria-hidden="true"
            className="w-12"
            loading="lazy"
          />
        </div>
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-10 w-px bg-gradient-to-b from-seasoning/60 to-transparent"
        />
        <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
          {nodes.map((n) => (
            <li
              key={n.name}
              className="flex items-center gap-2 rounded-full border border-line-on-dark bg-ink-800/80 px-3 py-2 text-xs font-semibold text-ink-on-dark"
            >
              <span className="grid size-5 shrink-0 place-items-center rounded-full grad-seasoning text-ug-black">
                <Icon name={n.icon} size={11} />
              </span>
              {n.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

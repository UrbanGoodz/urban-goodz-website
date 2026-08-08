import { Link } from '@tanstack/react-router'
import { ecosystem } from '~/lib/platform'
import { Icon, type IconName } from '../icons'
import { Reveal } from '../primitives'

const accentMap: Record<string, string> = {
  orange: 'from-seasoning/15 to-seasoning/5 text-seasoning-600',
  canvas: 'from-canvas-300/40 to-canvas-200/20 text-ink-800',
  dijon: 'from-dijon/30 to-dijon/10 text-seasoning-600',
}

export function EcosystemGrid({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ecosystem.map((item, i) => (
        <Reveal key={item.name} delay={Math.min(i * 40, 320)} as="article">
          <Link
            to={item.to}
            hash={item.hash}
            search={item.search}
            className={`group lift glow-border block rounded-3xl p-6 transition-all duration-300 ${
              onDark
                ? 'border border-line-on-dark bg-ink-800/70 hover:border-seasoning/50'
                : 'border border-line bg-white/80 hover:border-seasoning/40 shadow-card'
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`grid size-11 place-items-center rounded-2xl bg-gradient-to-br ${accentMap[item.accent]} transition-transform duration-300 group-hover:scale-110 ${
                  onDark ? 'border border-line-on-dark' : ''
                }`}
              >
                <Icon name={item.icon as IconName} size={22} />
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-seasoning-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="size-1.5 rounded-full bg-seasoning animate-ping" /> AI Connected
              </span>
            </div>
            <h3 className={`mt-4 font-display text-lg font-semibold ${onDark ? 'text-ink-on-dark' : 'text-ug-black'}`}>
              {item.name}
            </h3>
            <p className={`mt-1 text-sm leading-relaxed ${onDark ? 'text-mute-on-dark' : 'text-ug-black/65'}`}>{item.tagline}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

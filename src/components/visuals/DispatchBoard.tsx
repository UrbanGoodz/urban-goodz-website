import { Icon } from '../icons'

export function DispatchBoard({ className = '' }: { className?: string }) {
  const kpis = [
    { label: 'Active jobs', value: '312', icon: 'bag' as const, up: '+12%' },
    { label: 'Drivers online', value: '96', icon: 'drivers' as const, up: '+8%' },
    { label: 'On-time rate', value: '97.4%', icon: 'check' as const, up: '+0.6%' },
    { label: 'AI reroutes', value: '1,204', icon: 'spark' as const, up: '+21%' },
  ]
  const feed = [
    ['09:12', 'AI matched 14 drivers to morning window'],
    ['09:08', 'Route #2204 optimized · −3.2 mi'],
    ['09:01', 'Temperature alert resolved · RX-447'],
    ['08:57', 'Freight load booked · Houston → Dallas'],
    ['08:49', 'Creator livestream orders surging'],
  ]
  const bars = [42, 56, 50, 68, 62, 78, 88, 72, 84, 96, 90, 100]

  return (
    <div className={`overflow-hidden rounded-3xl border border-line-on-dark bg-ink-900 shadow-lift ${className}`}>
      {/* header */}
      <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-seasoning text-ug-black">
            <Icon name="routes" size={15} />
          </span>
          <div>
            <p className="text-xs font-bold text-white">Dispatch Center</p>
            <p className="text-[10px] text-mute-on-dark">Urban Goodz · Houston · live</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-seasoning/15 px-2.5 py-1 text-[10px] font-bold text-seasoning-300">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seasoning opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-seasoning" />
          </span>
          AI monitoring
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-px bg-white/8 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-ink-900 p-4">
            <div className="flex items-center gap-1.5 text-[10px] text-mute-on-dark">
              <Icon name={k.icon} size={11} className="text-seasoning" />
              {k.label}
            </div>
            <p className="mt-1.5 font-display text-xl font-bold text-white">{k.value}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[9px] font-semibold text-dijon">
              <Icon name="arrow-up-right" size={9} /> {k.up}
            </p>
          </div>
        ))}
      </div>

      {/* body: map + feed */}
      <div className="grid gap-px bg-white/8 md:grid-cols-[1.4fr_1fr]">
        {/* map */}
        <div className="relative bg-ink-800 p-5">
          <div className="grid grid-cols-8 grid-rows-5 gap-1.5 opacity-30" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="rounded bg-white/10" />
            ))}
          </div>
          <svg viewBox="0 0 300 150" className="absolute inset-0 size-full p-5" aria-hidden="true">
            <path d="M20 120 Q 90 40 150 100 T 280 30" fill="none" stroke="#ED9914" strokeWidth="1.6" strokeDasharray="4 5" className="animate-route-dash" />
            <path d="M40 30 Q 110 110 170 60 T 260 110" fill="none" stroke="#E5E276" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.7" className="animate-route-dash" />
            {[[20, 120], [150, 100], [280, 30], [40, 30], [170, 60], [260, 110], [110, 40], [220, 70]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="7" fill="#ED9914" opacity="0.15" className="animate-pulse-ring" style={{ transformOrigin: `${x}px ${y}px` }} />
                <circle cx={x} cy={y} r="3" fill="#ED9914" stroke="#131313" strokeWidth="1" />
              </g>
            ))}
          </svg>
          <div className="relative flex items-center justify-between">
            <span className="rounded-full bg-ug-black/70 px-2.5 py-1 text-[9px] font-semibold text-white">Greater Houston Area</span>
            <span className="rounded-full bg-ug-black/70 px-2.5 py-1 text-[9px] font-semibold text-dijon">312 routes live</span>
          </div>
        </div>

        {/* feed */}
        <div className="bg-ink-900 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-mute-on-dark">Live activity</p>
            <Icon name="spark" size={13} className="text-seasoning" />
          </div>
          <div className="mt-3 space-y-2.5">
            {feed.map(([t, m]) => (
              <div key={t} className="flex gap-2.5">
                <span className="mt-0.5 shrink-0 rounded bg-white/8 px-1.5 py-0.5 text-[8px] font-semibold text-seasoning-300">{t}</span>
                <p className="text-[10px] leading-snug text-white/75">{m}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[9px] text-mute-on-dark">
              <span>Hourly volume</span>
              <span className="font-semibold text-seasoning-300">Peak</span>
            </div>
            <div className="mt-1.5 flex h-10 items-end gap-1">
              {bars.map((b, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-seasoning-600/60 to-seasoning" style={{ height: `${b}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

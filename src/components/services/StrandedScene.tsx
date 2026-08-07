import { Icon } from '../icons'

/* Responders converging on the stranded vehicle. Coordinates are in the
   800×500 viewBox below; `pro` marks the professional roadside backup. */
const responders = [
  { x: 150, y: 250, delay: 0, pro: false },
  { x: 655, y: 232, delay: 260, pro: false },
  { x: 262, y: 168, delay: 520, pro: false },
  { x: 706, y: 132, delay: 780, pro: true },
]

const CAR = { x: 400, y: 356 }

export function StrandedScene() {
  return (
    <div className="relative">
      {/* ── Reserved for the final photograph ──────────────────────────
          Drop a full-bleed still in here when it exists — a family safe
          inside their vehicle at dusk, hazards on — and delete the SVG
          scene below. The notification card is designed to sit on top of
          either one:
          <img src="/images/services/stranded-dusk.jpg" alt="…"
               className="absolute inset-0 size-full object-cover" />   */}
      <figure className="relative overflow-hidden rounded-[2.25rem] border border-line-on-dark shadow-lift">
        <svg viewBox="0 0 800 500" className="w-full" role="img" aria-label="Dusk roadway with nearby Goodz Samaritans converging on a stranded vehicle">
          <defs>
            <linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#14161f" />
              <stop offset="0.52" stopColor="#2a2118" />
              <stop offset="0.78" stopColor="#7a4a16" />
              <stop offset="1" stopColor="#c97e0a" />
            </linearGradient>
            <linearGradient id="st-road" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1a1a1a" />
              <stop offset="1" stopColor="#0d0d0d" />
            </linearGradient>
            <radialGradient id="st-hazard">
              <stop offset="0" stopColor="#ED9914" stopOpacity="0.85" />
              <stop offset="1" stopColor="#ED9914" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="st-sun">
              <stop offset="0" stopColor="#f8c76a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#f8c76a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* dusk sky + low sun */}
          <rect width="800" height="500" fill="url(#st-sky)" />
          <circle cx="560" cy="300" r="180" fill="url(#st-sun)" />

          {/* skyline silhouette */}
          <g fill="#0f0f10" opacity="0.92">
            {[
              [40, 214, 34, 86], [78, 236, 26, 64], [118, 198, 30, 102], [152, 226, 22, 74],
              [188, 242, 34, 58], [232, 206, 26, 94], [266, 232, 30, 68], [470, 222, 28, 78],
              [504, 244, 24, 56], [534, 210, 32, 90], [572, 236, 26, 64], [606, 250, 30, 50],
              [648, 218, 26, 82], [682, 240, 34, 60], [722, 226, 28, 74], [756, 246, 30, 54],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} />
            ))}
          </g>
          <rect y="296" width="800" height="10" fill="#0f0f10" opacity="0.92" />

          {/* roadway in perspective */}
          <path d="M300 500 L372 306 L436 306 L560 500 Z" fill="url(#st-road)" />
          <path d="M300 500 L372 306" stroke="#3a3a3a" strokeWidth="2" fill="none" />
          <path d="M560 500 L436 306" stroke="#3a3a3a" strokeWidth="2" fill="none" />
          {[[404, 330, 3, 12], [404, 366, 4, 18], [404, 414, 5, 26], [404, 474, 6, 34]].map(
            ([x, y, w, h], i) => (
              <rect key={i} x={x - w / 2} y={y} width={w} height={h} fill="#5a5348" opacity="0.5" rx="1" />
            ),
          )}

          {/* routes converging on the vehicle */}
          {responders.map((r, i) => (
            <path
              key={`route-${i}`}
              d={`M${r.x} ${r.y} Q ${(r.x + CAR.x) / 2} ${Math.min(r.y, CAR.y) - 40} ${CAR.x} ${CAR.y}`}
              fill="none"
              stroke={r.pro ? 'rgba(229,226,118,0.55)' : 'rgba(237,153,20,0.7)'}
              strokeWidth="2"
              strokeDasharray="7 9"
              strokeLinecap="round"
              className="animate-route-dash"
              style={{ animationDelay: `${r.delay}ms` }}
            />
          ))}

          {/* the stranded vehicle, hazards on */}
          <g>
            <ellipse cx={CAR.x} cy={CAR.y + 26} rx="66" ry="10" fill="#000" opacity="0.5" />
            <circle cx={CAR.x} cy={CAR.y} r="74" fill="url(#st-hazard)" className="animate-pulse-soft" />
            <path
              d={`M${CAR.x - 52} ${CAR.y + 14} L${CAR.x - 44} ${CAR.y - 10} Q ${CAR.x - 38} ${CAR.y - 20} ${CAR.x - 24} ${CAR.y - 22} L${CAR.x + 24} ${CAR.y - 22} Q ${CAR.x + 38} ${CAR.y - 20} ${CAR.x + 44} ${CAR.y - 10} L${CAR.x + 52} ${CAR.y + 14} Z`}
              fill="#1c1c1c"
              stroke="#3d3833"
              strokeWidth="1.5"
            />
            <path
              d={`M${CAR.x - 34} ${CAR.y - 8} Q ${CAR.x - 28} ${CAR.y - 18} ${CAR.x - 16} ${CAR.y - 19} L${CAR.x + 16} ${CAR.y - 19} Q ${CAR.x + 28} ${CAR.y - 18} ${CAR.x + 34} ${CAR.y - 8} Z`}
              fill="#f8c76a"
              opacity="0.30"
            />
            {[-1, 1].map((s) => (
              <g key={s}>
                <circle cx={CAR.x + s * 44} cy={CAR.y + 6} r="15" fill="#ED9914" opacity="0.24" className="animate-pulse-ring" style={{ transformOrigin: `${CAR.x + s * 44}px ${CAR.y + 6}px`, animationDelay: s > 0 ? '600ms' : '0ms' }} />
                <circle cx={CAR.x + s * 44} cy={CAR.y + 6} r="5" fill="#ED9914" className="animate-pulse-soft" />
              </g>
            ))}
          </g>

          {/* responder pins */}
          {responders.map((r, i) => (
            <g key={`pin-${i}`}>
              <circle cx={r.x} cy={r.y} r="17" fill={r.pro ? '#E5E276' : '#ED9914'} opacity="0.16" className="animate-pulse-ring" style={{ transformOrigin: `${r.x}px ${r.y}px`, animationDelay: `${r.delay}ms` }} />
              <circle cx={r.x} cy={r.y} r="10" fill="#161616" stroke={r.pro ? '#E5E276' : '#ED9914'} strokeWidth="2.5" />
              <circle cx={r.x} cy={r.y} r="3.6" fill={r.pro ? '#E5E276' : '#ED9914'} />
            </g>
          ))}
        </svg>

        {/* ── Live notification ─────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-x-0 top-0 p-4 sm:p-6">
          <div className="glass-dark mx-auto max-w-sm rounded-2xl p-4 shadow-lift sm:ml-auto sm:mr-0">
            <div className="flex items-start gap-3">
              <span className="relative mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl grad-seasoning text-ug-black">
                <Icon name="shield" size={18} />
                <span aria-hidden="true" className="absolute inset-0 rounded-xl bg-seasoning/40 animate-pulse-ring" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold leading-snug text-ink-on-dark">
                  Three Goodz Samaritans nearby.
                </p>
                <p className="mt-0.5 text-sm text-seasoning-300">Help is on the way.</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-mute-on-dark">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-seasoning animate-pulse-soft" />
                    Closest 4 min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-dijon" />
                    Pro backup standing by
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Status strip ──────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Location captured', icon: 'map-pin' as const },
              { label: 'Dispatch running', icon: 'ai' as const },
              { label: 'Live tracking on', icon: 'routes' as const },
            ].map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1.5 rounded-full border border-line-on-dark bg-ink-900/75 px-3 py-1.5 text-[11px] font-semibold text-ink-on-dark backdrop-blur-sm"
              >
                <Icon name={s.icon} size={12} className="text-seasoning-300" />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </figure>
    </div>
  )
}

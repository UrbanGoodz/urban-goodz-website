import { useMemo } from 'react'

const W = 400
const H = 220
const G = 196

function hashStr(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Landmark =
  | { kind: 'needle'; x: number; h: number }
  | { kind: 'ball'; x: number; h: number }
  | { kind: 'dome'; x: number; r: number }
  | { kind: 'obelisk'; x: number; h: number }
  | { kind: 'pyramid'; x: number; w: number; h: number }
  | { kind: 'arch'; x: number; w: number; h: number }
  | { kind: 'palm'; x: number; h: number }
  | { kind: 'crown'; x: number; h: number }
  | { kind: 'sphere'; x: number; r: number }

const LANDS: Record<string, Landmark[]> = {
  houston: [
    { kind: 'needle', x: 96, h: 118 },
    { kind: 'arch', x: 216, w: 56, h: 64 },
    { kind: 'needle', x: 316, h: 96 },
  ],
  dallas: [
    { kind: 'needle', x: 96, h: 92 },
    { kind: 'ball', x: 216, h: 104 },
    { kind: 'needle', x: 320, h: 84 },
  ],
  austin: [
    { kind: 'needle', x: 120, h: 128 },
    { kind: 'palm', x: 216, h: 44 },
    { kind: 'needle', x: 304, h: 78 },
  ],
  atlanta: [
    { kind: 'needle', x: 96, h: 132 },
    { kind: 'dome', x: 216, r: 34 },
    { kind: 'needle', x: 320, h: 92 },
  ],
  miami: [
    { kind: 'palm', x: 88, h: 56 },
    { kind: 'needle', x: 176, h: 64 },
    { kind: 'palm', x: 256, h: 48 },
    { kind: 'needle', x: 332, h: 58 },
  ],
  'los-angeles': [
    { kind: 'palm', x: 76, h: 52 },
    { kind: 'needle', x: 168, h: 96 },
    { kind: 'needle', x: 268, h: 72 },
    { kind: 'palm', x: 348, h: 50 },
  ],
  'las-vegas': [
    { kind: 'pyramid', x: 120, w: 78, h: 92 },
    { kind: 'sphere', x: 244, r: 34 },
    { kind: 'needle', x: 328, h: 84 },
  ],
  'new-york-city': [
    { kind: 'needle', x: 120, h: 146 },
    { kind: 'crown', x: 236, h: 70 },
    { kind: 'needle', x: 330, h: 120 },
  ],
  'washington-dc': [
    { kind: 'obelisk', x: 176, h: 128 },
    { kind: 'dome', x: 296, r: 40 },
    { kind: 'dome', x: 92, r: 26 },
  ],
  memphis: [
    { kind: 'pyramid', x: 156, w: 92, h: 92 },
    { kind: 'needle', x: 310, h: 84 },
  ],
  charlotte: [
    { kind: 'needle', x: 116, h: 104 },
    { kind: 'needle', x: 264, h: 74 },
  ],
  birmingham: [
    { kind: 'needle', x: 140, h: 88 },
    { kind: 'needle', x: 288, h: 72 },
  ],
  huntsville: [
    { kind: 'needle', x: 148, h: 96 },
    { kind: 'needle', x: 288, h: 70 },
  ],
  tulsa: [
    { kind: 'needle', x: 148, h: 92 },
    { kind: 'needle', x: 288, h: 68 },
  ],
  baltimore: [
    { kind: 'needle', x: 120, h: 96 },
    { kind: 'dome', x: 236, r: 30 },
  ],
  chicago: [
    { kind: 'needle', x: 112, h: 120 },
    { kind: 'needle', x: 256, h: 74 },
  ],
}

const SKYLINE_ALIASES: Record<string, string> = {
  dmv: 'washington-dc',
  'dmv-area': 'washington-dc',
  'washington-dc-area': 'washington-dc',
  nyc: 'new-york-city',
  'new-york': 'new-york-city',
  'los-angeles-area': 'los-angeles',
  'greater-houston-area': 'houston',
  'greater-dallas-area': 'dallas',
  'greater-austin-area': 'austin',
  'greater-huntsville-area': 'huntsville',
  'greater-birmingham-area': 'birmingham',
  'greater-atlanta-area': 'atlanta',
  'greater-la-area': 'los-angeles',
  'greater-las-vegas-area': 'las-vegas',
  'greater-miami-area': 'miami',
  'greater-nyc-area': 'new-york-city',
  'greater-charlotte-area': 'charlotte',
  'greater-tulsa-area': 'tulsa',
}

function LandmarkShape({ l, fill }: { l: Landmark; fill: string }) {
  switch (l.kind) {
    case 'needle':
      return (
        <g>
          <rect x={l.x - 1.4} y={G - l.h - 14} width={2.8} height={l.h - 4} rx={1.4} fill={fill} />
          <path d={`M${l.x - 6} ${G - 16} L${l.x} ${G - l.h - 16} L${l.x + 6} ${G - 16} Z`} fill={fill} />
        </g>
      )
    case 'ball':
      return (
        <g>
          <rect x={l.x - 4} y={G - l.h} width={8} height={l.h - 34} fill={fill} />
          <circle cx={l.x} cy={G - l.h + 12} r={22} fill={fill} />
        </g>
      )
    case 'dome':
      return (
        <g>
          <rect x={l.x - l.r} y={G - 30} width={l.r * 2} height={30} fill={fill} opacity={0.95} />
          <path d={`M${l.x - l.r} ${G - 30} a${l.r} ${l.r} 0 0 1 ${l.r * 2} 0 Z`} fill={fill} />
          <rect x={l.x - l.r * 0.22} y={G - l.r - 14} width={l.r * 0.44} height={16} fill={fill} />
        </g>
      )
    case 'obelisk':
      return (
        <path
          d={`M${l.x - 7} ${G} L${l.x - 4} ${G - l.h + 12} L${l.x - 2.4} ${G - l.h - 6} L${l.x + 2.4} ${G - l.h - 6} L${l.x + 4} ${G - l.h + 12} L${l.x + 7} ${G} Z`}
          fill={fill}
        />
      )
    case 'pyramid':
      return (
        <path
          d={`M${l.x - l.w / 2} ${G - 4} L${l.x} ${G - l.h} L${l.x + l.w / 2} ${G - 4} Z`}
          fill={fill}
          opacity={0.96}
        />
      )
    case 'arch':
      return (
        <path
          d={`M${l.x - l.w / 2} ${G} L${l.x - l.w / 2} ${G - l.h} A ${l.w / 2} ${l.h} 0 0 1 ${l.x + l.w / 2} ${G - l.h} L${l.x + l.w / 2} ${G}`}
          fill="none"
          stroke={fill}
          strokeWidth={5}
        />
      )
    case 'palm':
      return (
        <g>
          <path d={`M${l.x} ${G} C${l.x + 2} ${G - l.h * 0.55} ${l.x - 1} ${G - l.h * 0.7} ${l.x + 1} ${G - l.h}`} fill="none" stroke={fill} strokeWidth={2.6} strokeLinecap="round" />
          {[-34, -20, -8, 8, 20, 34].map((a, i) => (
            <path
              key={a}
              d={`M${l.x + 1} ${G - l.h - 3} q ${a * 0.9} ${-8 - i * 2} ${a * 1.25} ${6 - i}`}
              fill="none"
              stroke={fill}
              strokeWidth={1.8}
              strokeLinecap="round"
            />
          ))}
        </g>
      )
    case 'crown':
      return (
        <g>
          <rect x={l.x - 14} y={G - l.h} width={28} height={l.h - 26} rx={2} fill={fill} />
          <path
            d={`M${l.x - 18} ${G - 26} v-10 l8 6 l6-10 l6 10 l8 -6 v10 Z`}
            fill={fill}
          />
          <path d={`M${l.x} ${G - l.h} v-16`} stroke={fill} strokeWidth={2.4} strokeLinecap="round" />
          <circle cx={l.x} cy={G - l.h - 18} r={2.4} fill={fill} />
        </g>
      )
    case 'sphere':
      return (
        <g>
          <circle cx={l.x} cy={G - 40} r={l.r} fill={fill} />
          <path d={`M${l.x - l.r} ${G - 40} a${l.r} ${l.r} 0 0 1 ${l.r * 2} 0`} fill="none" stroke={fill} strokeWidth={2.4} opacity={0.4} />
        </g>
      )
    default:
      return null
  }
}

export function Skyline({
  city,
  variant = 'light',
  network = false,
  className = '',
}: {
  city: string
  variant?: 'light' | 'dark'
  network?: boolean
  className?: string
}) {
  const cfg = useMemo(() => {
    const slug = (SKYLINE_ALIASES[city.toLowerCase()] ?? city).replace(/[^a-z-]/g, '')
    const rng = mulberry32(hashStr(slug + '::sky'))
    const buildings: { x: number; w: number; h: number }[] = []
    let x = -8
    while (x < W + 10) {
      const w = 12 + rng() * 16
      const t = rng()
      const h = 26 + Math.pow(t, 1.8) * 118
      buildings.push({ x, w, h })
      x += w + 2 + rng() * 7
    }
    const landmarks = LANDS[slug] ?? [{ kind: 'needle', x: 180, h: 96 }]
    return { buildings, landmarks, slug }
  }, [city])

  const dark = variant === 'dark'
  const bld = dark ? 'rgba(226,211,191,0.16)' : 'rgba(22,22,22,0.16)'
  const lmk = dark ? '#E2D3BF' : '#161616'
  const win = dark ? '#ED9914' : 'rgba(237,153,20,0.85)'
  const win2 = dark ? '#E5E276' : 'rgba(22,22,22,0.4)'

  const nodes = useMemo(() => {
    const rng = mulberry32(hashStr(city + '::net'))
    return [
      { x: 60 + rng() * 60, y: 90 + rng() * 40 },
      { x: 200 + rng() * 60, y: 60 + rng() * 40 },
      { x: 300 + rng() * 60, y: 100 + rng() * 40 },
    ]
  }, [city])

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${city} skyline illustration`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id={`sky-${city}`} x1="0" y1="0" x2="0" y2="1">
          {dark ? (
            <>
              <stop offset="0" stopColor="#1b1a17" />
              <stop offset="1" stopColor="#141311" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#F6EFE3" />
              <stop offset="1" stopColor="#E2D3BF" />
            </>
          )}
        </linearGradient>
        <radialGradient id={`sun-${city}`}>
          <stop offset="0" stopColor={dark ? '#ED9914' : '#E5E276'} stopOpacity={dark ? 0.28 : 0.4} />
          <stop offset="1" stopColor={dark ? '#ED9914' : '#E5E276'} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#sky-${city})`} />
      <circle cx={dark ? 330 : 340} cy={46} r={dark ? 120 : 90} fill={`url(#sun-${city})`} />

      {/* ground */}
      <rect y={G - 4} width={W} height={H - G + 4} fill={dark ? 'rgba(22,22,22,0.6)' : 'rgba(226,211,191,0.5)'} />

      {/* buildings */}
      {cfg.buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={G - b.h} width={b.w} height={b.h} fill={bld} rx={1.5} />
          {Array.from({ length: Math.max(1, Math.floor(b.h / 22)) }).map((_, j) =>
            Array.from({ length: Math.max(1, Math.floor(b.w / 14)) }).map((_, k) => {
              const r = Math.floor((i * 7 + j * 3 + k * 5) % 10)
              const lit = r < 3
              return (
                <rect
                  key={`${j}-${k}`}
                  x={b.x + 4 + k * 14}
                  y={G - b.h + 8 + j * 22}
                  width={4}
                  height={6}
                  rx={1}
                  fill={lit ? win : win2}
                  opacity={lit ? 1 : 0.5}
                />
              )
            }),
          )}
        </g>
      ))}

      {/* landmarks */}
      {cfg.landmarks.map((l, i) => (
        <LandmarkShape key={i} l={l} fill={lmk} />
      ))}

      {/* network overlay */}
      {network && (
        <g>
          {nodes.map((n, i) => (
            <circle key={`r${i}`} cx={n.x} cy={n.y} r="12" fill="#ED9914" opacity="0.14" className="animate-pulse-ring" style={{ transformOrigin: `${n.x}px ${n.y}px` }} />
          ))}
          <path
            d={`M${nodes[0].x} ${nodes[0].y} Q ${(nodes[0].x + nodes[1].x) / 2} ${Math.min(nodes[0].y, nodes[1].y) - 26} ${nodes[1].x} ${nodes[1].y} M${nodes[1].x} ${nodes[1].y} Q ${(nodes[1].x + nodes[2].x) / 2} ${Math.min(nodes[1].y, nodes[2].y) - 24} ${nodes[2].x} ${nodes[2].y}`}
            fill="none"
            stroke={dark ? 'rgba(237,153,20,0.65)' : 'rgba(237,153,20,0.7)'}
            strokeWidth="1.6"
            strokeDasharray="5 6"
            strokeLinecap="round"
            className="animate-route-dash"
          />
          {nodes.map((n, i) => (
            <circle key={`n${i}`} cx={n.x} cy={n.y} r="4.4" fill="#ED9914" stroke={dark ? '#161616' : '#fdfbf7'} strokeWidth="1.4" />
          ))}
        </g>
      )}
    </svg>
  )
}

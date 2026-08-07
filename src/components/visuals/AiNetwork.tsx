import { useState } from 'react'
import { Icon } from '../icons'

const nodes = [
  ['Marketplace', 74, 58, 'market'],
  ['Shopping', 38, 128, 'retail'],
  ['Medical', 92, 196, 'medical'],
  ['Freight', 196, 36, 'freight'],
  ['Drivers', 200, 148, 'drivers'],
  ['Businesses', 320, 52, 'business'],
  ['Creators', 350, 132, 'creator'],
  ['Customers', 316, 200, 'community'],
  ['Dispatch', 238, 220, 'routes'],
  ['Analytics', 96, 118, 'ai'],
] as const

type NodeName = (typeof nodes)[number][0]

export function AiNetwork({ className = '' }: { className?: string }) {
  const [activeNode, setActiveNode] = useState<NodeName>('Marketplace')
  const cx = 208
  const cy = 132
  return (
    <div className={`overflow-hidden rounded-3xl border border-line-on-dark bg-ink-900 shadow-lift glow-border ${className}`}>
      <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-seasoning text-ug-black">
            <Icon name="ai" size={15} />
          </span>
          <div>
            <p className="text-xs font-bold text-white">AI Operating Network</p>
            <p className="text-[10px] text-mute-on-dark" aria-live="polite">
              Active connection: {activeNode}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-seasoning/15 px-2.5 py-1 text-[10px] font-bold text-seasoning-300">
          <span className="size-1.5 rounded-full bg-dijon animate-pulse" /> Live Synced
        </span>
      </div>

      <div className="relative p-5">
        {/* Decorative rendering of the state owned by the buttons below. */}
        <svg viewBox="0 0 420 270" className="w-full" aria-hidden="true">
          <defs>
            <radialGradient id="ai-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ED9914" stopOpacity="0.4" />
              <stop offset="1" stopColor="#ED9914" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ai-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ED9914" stopOpacity="0.9" />
              <stop offset="1" stopColor="#E5E276" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <circle cx={cx} cy={cy} r="150" fill="url(#ai-glow)" className="animate-breath" />

          {nodes.map(([name, x, y]) => {
            const isActive = activeNode === name
            return (
              <path
                key={`${x}-${y}`}
                d={`M${cx} ${cy} Q ${(cx + x) / 2} ${(cy + y) / 2 - 18} ${x} ${y}`}
                fill="none"
                stroke={isActive ? '#ED9914' : 'url(#ai-line)'}
                strokeWidth={isActive ? '2.4' : '1.2'}
                strokeDasharray={isActive ? 'none' : '3 4'}
                className={isActive ? 'ray-active' : 'animate-route-dash'}
              />
            )
          })}

          {nodes.map(([name, x, y]) => {
            const isActive = activeNode === name
            return (
              <g
                key={`node-${x}-${y}`}
                onMouseEnter={() => setActiveNode(name)}
                onClick={() => setActiveNode(name)}
                className="cursor-pointer transition-transform duration-300 hover:scale-125"
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 12 : 9}
                  fill={isActive ? '#ED9914' : '#131313'}
                  stroke="#ED9914"
                  strokeWidth={isActive ? '2' : '1.2'}
                  opacity={isActive ? 1 : 0.9}
                />
                {isActive && (
                  <circle cx={x} cy={y} r={18} fill="none" stroke="#E5E276" strokeWidth="1" className="animate-ping" />
                )}
              </g>
            )
          })}

          <g className="transition-transform duration-300 hover:scale-105" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <circle cx={cx} cy={cy} r="46" fill="#ED9914" opacity="0.15" className="animate-pulse-ring" style={{ transformOrigin: `${cx}px ${cy}px` }} />
            <circle cx={cx} cy={cy} r="30" fill="#161616" stroke="#ED9914" strokeWidth="2" />
            <path
              d={`M${cx} ${cy - 14} a 16 16 0 1 0 11 6`}
              fill="none"
              stroke="#ED9914"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path d={`M${cx + 2} ${cy + 4} l 5 5 l -10 2`} fill="none" stroke="#E5E276" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        {/* Accessible control surface for the diagram above. */}
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
          {nodes.map(([label]) => {
            const isActive = activeNode === label
            return (
              <button
                type="button"
                key={label}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveNode(label)}
                onFocus={() => setActiveNode(label)}
                onClick={() => setActiveNode(label)}
                className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[10px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'border-seasoning bg-seasoning/20 text-white shadow-sm'
                    : 'border-white/8 bg-white/4 text-white/85 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <span className={`size-1.5 rounded-full ${isActive ? 'bg-seasoning animate-ping' : 'bg-seasoning/60'}`} aria-hidden="true" />
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

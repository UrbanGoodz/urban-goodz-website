import { Icon } from '../icons'
import type { IconName } from '../icons'

export type Turn = { from: 'user' | 'ai'; text: string }

/**
 * A short scripted exchange that shows personality rather than describing it.
 * Presented as an illustration, not a live widget.
 */
export function ChatDemo({
  name,
  role,
  icon,
  avatar,
  turns,
  tone = 'light',
}: {
  name: string
  role: string
  icon: IconName
  /** Square headshot. Falls back to the icon when absent. */
  avatar?: string
  turns: Turn[]
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  return (
    <figure
      className={`group overflow-hidden rounded-[1.75rem] border shadow-card transition-all duration-300 hover:shadow-lift ${
        dark ? 'border-line-on-dark bg-ink-800/70 hover:border-seasoning/40' : 'border-line bg-white hover:border-seasoning/50'
      }`}
    >
      <figcaption
        className={`flex items-center gap-3 border-b px-6 py-4 transition-colors ${
          dark ? 'border-line-on-dark bg-ink-900/60' : 'border-line bg-cream/60'
        }`}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={`${name} avatar`}
            aria-hidden="true"
            loading="lazy"
            className="size-10 shrink-0 rounded-full object-cover ring-2 ring-seasoning/50 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="grid size-10 shrink-0 place-items-center rounded-full grad-seasoning text-ug-black transition-transform duration-300 group-hover:scale-105">
            <Icon name={icon} size={18} />
          </span>
        )}
        <span className="min-w-0">
          <span
            className={`block font-display text-sm font-bold ${dark ? 'text-ink-on-dark' : 'text-ug-black'}`}
          >
            {name}
          </span>
          <span className={`block text-xs ${dark ? 'text-mute-on-dark' : 'text-ug-black/55'}`}>
            {role}
          </span>
        </span>
        <span
          className={`ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
            dark ? 'bg-seasoning/15 text-seasoning-300' : 'bg-seasoning/12 text-seasoning-600'
          }`}
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seasoning opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-seasoning" />
          </span>
          Online
        </span>
      </figcaption>

      <div className="space-y-3.5 p-6">
        {turns.map((t, i) =>
          t.from === 'user' ? (
            <p
              key={i}
              className="ml-auto max-w-[82%] rounded-2xl rounded-tr-md grad-seasoning px-4 py-3 text-sm leading-relaxed text-ug-black font-medium shadow-sm transition-transform hover:scale-[1.01]"
            >
              {t.text}
            </p>
          ) : (
            <div key={i} className="space-y-1">
              <p
                className={`max-w-[88%] rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed transition-transform hover:scale-[1.01] ${
                  dark ? 'bg-ink-900/80 text-ink-on-dark border border-line-on-dark/50' : 'bg-cream/80 text-ug-black/85 border border-line/50'
                }`}
              >
                {t.text}
              </p>
            </div>
          ),
        )}
        <div className="flex items-center gap-1.5 pt-1 px-1">
          <span className={`text-[11px] font-medium ${dark ? 'text-mute-on-dark/60' : 'text-ug-black/45'}`}>
            {name} is active in ecosystem
          </span>
          <span className="inline-flex gap-1">
            <span className="size-1 rounded-full bg-seasoning/60 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="size-1 rounded-full bg-seasoning/60 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="size-1 rounded-full bg-seasoning/60 animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </div>
      </div>
    </figure>
  )
}

/**
 * Character portrait. Falls back to a brand monogram when no image is supplied,
 * so the layout never depends on artwork existing.
 */
export function PortraitFrame({
  initial,
  name,
  role,
  src,
  tone = 'dark',
}: {
  initial: string
  name: string
  role: string
  /** 4:5 portrait. Omit to render the monogram placeholder instead. */
  src?: string
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  return (
    <figure
      className={`tilt-card glow-border group relative overflow-hidden rounded-[2rem] border shadow-lift ${
        dark ? 'border-line-on-dark bg-ink-800' : 'border-line bg-cream'
      }`}
    >
      <div className="relative aspect-[4/5] w-full">
        {src ? (
          <img
            src={src}
            alt={`${name}, ${role}`}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(237,153,20,0.20),transparent_62%)] animate-breath"
            />
            <div className="absolute inset-0 grid place-items-center">
              <span
                aria-hidden="true"
                className="font-display text-[7rem] font-bold leading-none text-grad"
              >
                {initial}
              </span>
            </div>
          </>
        )}

        {/* Scrim keeps the caption legible over any photograph. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ug-black/90 via-ug-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-85"
        />
        <figcaption className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-2xl font-bold text-white">{name}</p>
              <p className="mt-1 text-sm text-white/80 font-medium">{role}</p>
            </div>
            <span className="grid size-8 place-items-center rounded-full bg-seasoning/20 text-seasoning-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Icon name="spark" size={14} />
            </span>
          </div>
        </figcaption>
      </div>
    </figure>
  )
}

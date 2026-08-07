import { Link } from '@tanstack/react-router'
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  immediate = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'span' | 'article'
  immediate?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (immediate || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-in')
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [immediate])
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${immediate ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

export function Stat({
  value,
  label,
  duration = 1400,
  className = '',
}: {
  value: string
  label: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState('0')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const match = value.match(/^([0-9.,]+)(.*)$/)
    if (!match) {
      setShown(value)
      return
    }
    const target = parseFloat(match[1].replace(/,/g, ''))
    const suffix = match[2]
    let frame = 0
    const total = Math.max(24, Math.floor(duration / 16))
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const tick = () => {
          frame += 1
          const p = Math.min(1, frame / total)
          const eased = 1 - Math.pow(1 - p, 4)
          const n = Math.round(target * eased)
          setShown(
            `${n.toLocaleString('en-US')}${target % 1 !== 0 && p >= 1 ? '.' + match[1].split('.')[1] : ''}${suffix}`,
          )
          if (p < 1) requestAnimationFrame(tick)
        }
        tick()
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return (
    <div className={`group ${className}`}>
      <span ref={ref} className="font-display text-4xl md:text-5xl font-bold tracking-tight text-grad-dark transition-transform duration-500 group-hover:scale-105 inline-block">
        {shown}
      </span>
      <p className="mt-2 text-sm text-ug-black/70 font-medium">{label}</p>
    </div>
  )
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return <span className={`eyebrow ${onDark ? 'eyebrow-on-dark' : ''}`}>{children}</span>
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'center',
  onDark = false,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  align?: 'center' | 'left'
  onDark?: boolean
  className?: string
}) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal className={center ? 'flex justify-center' : ''}>
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={`mt-4 text-4xl font-bold tracking-tight md:text-5xl ${
            onDark ? 'text-ink-on-dark' : 'text-ug-black'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={160}>
          <p className={`mt-5 text-lg leading-relaxed ${onDark ? 'text-mute-on-dark' : 'text-ug-black/70'}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Marquee({ items }: { items: string[] }) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-3rem">
      {items.map((item) => (
        <span key={`${key}-${item}`} className="flex items-center gap-3rem text-2xl font-semibold tracking-tight text-ug-black/25">
          {item}
          <span className="inline-block size-2 rounded-full bg-seasoning/50" aria-hidden="true" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee-mask overflow-hidden" aria-hidden="true">
      <div className="marquee-track">
        {row('a')}
        {row('b')}
      </div>
    </div>
  )
}

export function LinkBtn({
  to,
  variant = 'primary',
  children,
  className = '',
  hash,
  search,
}: {
  to: string
  variant?: 'primary' | 'dark' | 'ghost' | 'on-dark'
  children: ReactNode
  className?: string
  hash?: string
  search?: Record<string, unknown>
}) {
  return (
    <Link to={to} hash={hash} search={search} className={`btn btn-${variant} ${className}`}>
      {children}
    </Link>
  )
}

export function AnchorBtn({
  href,
  variant = 'primary',
  children,
  className = '',
  external = false,
}: {
  href: string
  variant?: 'primary' | 'dark' | 'ghost' | 'on-dark'
  children: ReactNode
  className?: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      className={`btn btn-${variant} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

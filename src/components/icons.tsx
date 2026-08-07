import type { SVGProps } from 'react'

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'chevron-down'
  | 'check'
  | 'plus'
  | 'minus'
  | 'star'
  | 'map-pin'
  | 'search'
  | 'bag'
  | 'spark'
  | 'market'
  | 'retail'
  | 'restaurants'
  | 'groceries'
  | 'order'
  | 'services'
  | 'fashion'
  | 'medical'
  | 'freight'
  | 'creator'
  | 'community'
  | 'events'
  | 'business'
  | 'drivers'
  | 'ai'
  | 'instagram'
  | 'facebook'
  | 'x'
  | 'linkedin'
  | 'menu'
  | 'close'
  | 'phone'
  | 'mail'
  | 'clock'
  | 'shield'
  | 'routes'
  | 'scan'

const paths: Record<IconName, React.ReactNode> = {
  'arrow-right': <path d="M5 12h14m-6-6 6 6-6 6" />,
  'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  star: <path d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6-5.4-2.9L6.6 19.7l1.1-6L3.2 9.4l6.1-.8L12 3Z" />,
  'map-pin': (
    <>
      <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.8-3.8" />
    </>
  ),
  bag: <path d="M6 8h12l-1 12.5H7L6 8Zm2.5 0a3.5 3.5 0 0 1 7 0" />,
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  market: (
    <>
      <path d="M3 9h18l-1.5 12h-15L3 9Z" />
      <path d="M6 9a4 4 0 0 1 8 0 4 4 0 0 1 8 0" />
      <path d="M10 21v-5h4v5" />
    </>
  ),
  retail: (
    <>
      <path d="m4 7 2-4h12l2 4" />
      <path d="M4 7h16v13H4z" />
      <path d="M4 7a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
      <path d="M9 13h6" />
    </>
  ),
  restaurants: (
    <>
      <path d="M6 3v6M4.5 3v6a2.5 2.5 0 0 0 5 0V3" />
      <path d="M7 12v9M17 3c-2 2-3 4-3 7v4h3v7" />
    </>
  ),
  groceries: (
    <>
      <path d="M4 8h16l-1.5 12h-13L4 8Z" />
      <path d="M8 8a3.5 3.5 0 0 1 7 0" />
      <path d="M9 12v3M15 12v3" />
    </>
  ),
  order: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  services: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  fashion: (
    <>
      <path d="M12 5c-1.8-1.5-4-2-4-2l-3 3 2 2 2-1v11h6V7l2 1 2-2-3-3s-2.2.5-4 2Z" />
    </>
  ),
  medical: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  freight: (
    <>
      <path d="M2 6h12v11H2zM14 10h5l3 3.5V17h-8z" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </>
  ),
  creator: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8.5 6 3.5-6 3.5z" />
    </>
  ),
  community: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3.5 3.5 0 0 1 0 6.7M17.5 14.5a6 6 0 0 1 3.5 5.5" />
    </>
  ),
  events: (
    <>
      <path d="M3 8h18v12H3zM3 12h18M8 3v5M16 3v5" />
    </>
  ),
  business: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12.5h18M12 12v3" />
    </>
  ),
  drivers: (
    <>
      <path d="m3 20 9-17 9 17-9-5-9 5Z" />
      <circle cx="12" cy="14.5" r="1" />
    </>
  ),
  ai: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3H9v9h3v-9h2.5l.5-3H12V6.8a1 1 0 0 1 1-.8H15z" />,
  x: <path d="M4 4l6.4 8.5L4.4 20h2.4l4.9-6 4.9 6H20l-6.7-8.9L19.4 4H17l-4.5 5.5L8.3 4H4Z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  phone: <path d="M5 4h4l1.5 4L8 10a12 12 0 0 0 6 6l2-2.5 4 1.5v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  shield: <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />,
  routes: (
    <>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M6 17V8a3 3 0 0 1 3-3h6" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M7 12h10" />
    </>
  ),
}

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number }

export function Icon({ name, size = 24, strokeWidth = 1.8, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}

const logoHref = {
  light: '/brand/ug-wordmark.png',
  dark: '/brand/ug-wordmark-white.png',
} as const

export function Wordmark({
  className,
  variant = 'light',
}: {
  className?: string
  variant?: keyof typeof logoHref
}) {
  return (
    <img
      src={logoHref[variant]}
      alt="Urban Goodz"
      width={240}
      height={64}
      decoding="async"
      className={className}
    />
  )
}

export type EcosystemItem = {
  name: string
  tagline: string
  icon: 'market' | 'retail' | 'restaurants' | 'groceries' | 'order' | 'services' | 'fashion' | 'medical' | 'freight' | 'creator' | 'community' | 'events' | 'business' | 'drivers' | 'ai'
  accent: string
  /** Where the card links. Same-page items jump to their featureHighlights
      anchor (see index.tsx); everything else routes into the existing
      waitlist funnel — no separate signup path or backend needed. */
  to: string
  hash?: string
  search?: Record<string, string>
}

export const ecosystem: EcosystemItem[] = [
  { name: 'Marketplace', tagline: 'One home for everything local', icon: 'market', accent: 'orange', to: '/', hash: 'marketplace' },
  { name: 'Retail', tagline: 'Shop local stores online', icon: 'retail', accent: 'canvas', to: '/join', search: { as: 'app' } },
  { name: 'Restaurants', tagline: 'Your neighborhood, delivered', icon: 'restaurants', accent: 'dijon', to: '/join', search: { as: 'app' } },
  { name: 'Groceries', tagline: 'Everyday essentials, on demand', icon: 'groceries', accent: 'orange', to: '/join', search: { as: 'app' } },
  { name: 'Order Anywhere', tagline: 'Order from any store, any time', icon: 'order', accent: 'canvas', to: '/join', search: { as: 'app' } },
  { name: 'Book Services', tagline: 'Book trusted local pros', icon: 'services', accent: 'dijon', to: '/join', search: { as: 'app' } },
  { name: 'Fashion Fit', tagline: 'AI-measured fashion that fits', icon: 'fashion', accent: 'orange', to: '/', hash: 'fashion-fit' },
  { name: 'Medical Courier', tagline: 'Secure, compliant healthcare delivery', icon: 'medical', accent: 'canvas', to: '/', hash: 'medical-courier' },
  { name: 'Freight', tagline: 'Freight and load-board logistics', icon: 'freight', accent: 'dijon', to: '/join', search: { as: 'driver', vehicleType: 'Semi / 18-wheeler' } },
  { name: 'Creator Commerce', tagline: 'Turn audiences into income', icon: 'creator', accent: 'orange', to: '/join', search: { as: 'business', category: 'Creator or events' } },
  { name: 'Community', tagline: 'Connection beyond the transaction', icon: 'community', accent: 'canvas', to: '/about' },
  { name: 'Events', tagline: 'Tickets, vendors and experiences', icon: 'events', accent: 'dijon', to: '/join', search: { as: 'app' } },
  { name: 'Business Portal', tagline: 'Run your whole business here', icon: 'business', accent: 'orange', to: '/', hash: 'business-platform' },
  { name: 'Driver Platform', tagline: 'Earn on your own schedule', icon: 'drivers', accent: 'canvas', to: '/', hash: 'drivers' },
  { name: 'AI', tagline: 'An AI teammate across everything', icon: 'ai', accent: 'dijon', to: '/', hash: 'ai' },
]

export const aiSystems = [
  {
    name: 'AI Chief of Staff',
    description: 'Coordinates every part of your business and every platform system into one operating rhythm.',
  },
  {
    name: 'AI Copilot',
    description: 'A working partner inside the dashboard that drafts, plans and handles day-to-day tasks.',
  },
  {
    name: 'AI Concierge',
    description: 'Helps customers discover, order and book — like a personal assistant on every screen.',
  },
  {
    name: 'Business AI',
    description: 'Pricing, inventory and insight engines that give small businesses enterprise intelligence.',
  },
  {
    name: 'Shopping AI',
    description: 'Personalizes every storefront and every recommendation for every customer.',
  },
  {
    name: 'Fashion AI',
    description: 'Takes AI body measurements and predicts true size for a fit that is right the first time.',
  },
  {
    name: 'Routing AI',
    description: 'Optimizes every route in real time to save time, fuel and miles.',
  },
  {
    name: 'Dispatch AI',
    description: 'Assigns the right driver to the right order at the right time — automatically.',
  },
  {
    name: 'Creator AI',
    description: 'Helps creators publish, promote and monetize their audience with their own store.',
  },
  {
    name: 'Support AI',
    description: 'Resolves customer and partner questions instantly, at any hour.',
  },
]

export type PlatformCard = {
  eyebrow: string
  title: string
  body: string
  bullets: string[]
}

export const platformCards: PlatformCard[] = [
  {
    eyebrow: 'Marketplace',
    title: 'Every local business in one place',
    body: 'A unified marketplace where customers discover, order and book from local restaurants, retailers, boutiques, groceries and service providers — all in one account.',
    bullets: ['Local search & discovery', 'Unified cart across merchants', 'One checkout, one profile', 'Reviews & favorites'],
  },
  {
    eyebrow: 'Business',
    title: 'Enterprise-grade tools for local businesses',
    body: 'A complete business operating system — storefront, orders, inventory, payments, analytics and AI — with zero-cost onboarding and no commission traps.',
    bullets: ['Free storefront setup', 'Payments & wallet', 'Analytics & AI insights', 'Merchant clinic & support'],
  },
  {
    eyebrow: 'Logistics',
    title: 'Drivers, couriers and freight on one network',
    body: 'Delivery, medical courier and freight move through the same intelligent logistics layer — real-time routing, dispatch AI and package tracking end to end.',
    bullets: ['Real-time routing AI', 'Dispatch AI assignment', 'Package & delivery tracking', 'Freight load board'],
  },
]

export const featureHighlights = [
  {
    id: 'marketplace',
    eyebrow: 'Marketplace',
    title: 'Shop everything local — without the noise',
    body: 'Restaurants, retail, groceries and services unified in one local feed with smart search, live availability and a single checkout.',
    bullets: ['One cart across merchants', 'Local-first search', 'Saved favorites & reorder', 'Smart delivery tracking'],
  },
  {
    id: 'ai',
    eyebrow: 'AI Platform',
    title: 'Ten AI systems working as one',
    body: 'AI runs across the entire ecosystem — from an AI Chief of Staff for business owners to Fashion AI that predicts fit and Routing AI that saves miles.',
    bullets: ['AI Chief of Staff & Copilot', 'Fashion AI size prediction', 'Dispatch & Routing AI', 'Business AI insights'],
  },
  {
    id: 'fashion-fit',
    eyebrow: 'Fashion Fit',
    title: 'Clothes that fit — measured by AI',
    body: 'Fashion Fit lets shoppers build a body profile from simple photos. AI predicts true size per brand, so returns drop and confidence goes up.',
    bullets: ['AI body measurement', 'Per-brand size prediction', 'Virtual try-on', 'Stylist recommendations'],
  },
  {
    id: 'medical-courier',
    eyebrow: 'Medical Courier',
    title: 'Healthcare logistics with care',
    body: 'Secure, trackable, compliant delivery for labs, pharmacies and clinics — temperature-aware routing and chain-of-custody tracking.',
    bullets: ['HIPAA-conscious handling', 'Chain-of-custody tracking', 'Temperature-aware routes', 'Scheduled & on-demand'],
  },
  {
    id: 'business-platform',
    eyebrow: 'Business Platform',
    title: 'Run your business like an enterprise',
    body: 'Storefront, orders, payments, scheduling, analytics and AI in one dashboard — built for small businesses, priced for them too.',
    bullets: ['Zero-cost onboarding', 'Storefront & payments', 'AI insights & inventory', 'Merchant clinics'],
  },
  {
    id: 'drivers',
    eyebrow: 'Drivers',
    title: 'Earn on your own terms',
    body: 'Drivers get flexible schedules, transparent earnings, package scanning and smart route optimization — a delivery career built for real people.',
    bullets: ['Flexible scheduling', 'Transparent earnings', 'Package scanning', 'Optimized routes'],
  },
]

export const driverStats = [
  { value: '100%', label: 'Yours on every order — no forced tips' },
  { value: '24/7', label: 'Delivery windows that fit your life' },
  { value: '10+', label: 'Delivery verticals to choose from' },
  { value: 'AI', label: 'Routes optimized for you automatically' },
]

export const businessStats = [
  { value: '$0', label: 'Cost to list your business' },
  { value: '0%', label: 'Commission traps — we are built different' },
  { value: '15+', label: 'Capabilities in one portal' },
  { value: '24/7', label: 'AI support for your store' },
]

export const appFeatures = [
  { title: 'Order Anything', body: 'Food, groceries, retail, services — one app.' },
  { title: 'Track Live', body: 'See your order move in real time.' },
  { title: 'Fashion Fit', body: 'Find your size with AI, every time.' },
  { title: 'Support Local', body: 'Every order funds your community.' },
]

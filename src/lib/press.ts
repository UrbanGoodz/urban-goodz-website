import { markets } from './markets'
import { aiSystems } from './platform'

export type PressKind = 'feature' | 'interview' | 'award' | 'program' | 'profile'

export type PressItem = {
  id: string
  kind: PressKind
  kindLabel: string
  source: string
  sourceNote?: string
  title: string
  date: string
  url?: string
  description: string
  spotlight?: boolean
}

export const pressItems: PressItem[] = [
  {
    id: 'amercian-express',
    kind: 'feature',
    kindLabel: 'Feature',
    source: 'American Express',
    title: 'Recognized in the American Express community',
    date: 'Ongoing',
    description:
      'Urban Goodz has been spotlighted in the American Express community as an example of Black-owned technology driving economic opportunity in local communities.',
    spotlight: true,
  },
  {
    id: 'gener8tor-nwm',
    kind: 'program',
    kindLabel: 'Accelerator program',
    source: 'gener8tor · Northwestern Mutual',
    title: 'Northwestern Mutual Black Founder Accelerator',
    date: '2022',
    description:
      'Selected for the Northwestern Mutual Black Founder Accelerator, powered by gener8tor — a 12-week program backing Black-led, tech-enabled startups across the country.',
    url: 'https://www.bizjournals.com/houston/news/2022/10/04/gener8tor-accelerators-urban-eatz-spendebt.html',
    spotlight: true,
  },
  {
    id: 'gener8tor-huntsville',
    kind: 'program',
    kindLabel: 'Accelerator program',
    source: 'gener8tor',
    title: 'gener8tor Huntsville Investment Accelerator',
    date: '2022',
    description:
      'One of the first startups admitted to the gener8tor Huntsville Investment Accelerator, with 12 weeks of intensive mentorship and seed support.',
    spotlight: true,
  },
  {
    id: 'gbeta-houston',
    kind: 'program',
    kindLabel: 'Program',
    source: 'gener8tor',
    title: 'gBETA Houston cohort member',
    date: 'Spring 2022',
    description:
      'Selected for the Spring 2022 gBETA Houston cohort, the free, 5-week accelerator program for early-stage startups powered by gener8tor.',
  },
  {
    id: 'innovation-map',
    kind: 'feature',
    kindLabel: 'Media feature',
    source: 'InnovationMap',
    title: 'H-Town startup snags spot in newest gBETA cohort',
    date: 'May 16, 2022',
    description:
      'InnovationMap covered Urban Eatz’s selection for the Spring 2022 gBETA Houston cohort — reporting on the startup and the city’s startup momentum.',
  },
  {
    id: 'houston-business-journal',
    kind: 'feature',
    kindLabel: 'Media feature',
    source: 'Houston Business Journal',
    title: 'Houston startups join two gener8tor-affiliated accelerators',
    date: 'Oct 4, 2022',
    description:
      'The Houston Business Journal reported on Urban Eatz joining the Northwestern Mutual Black Founder Accelerator and the gener8tor Huntsville Investment Accelerator.',
    url: 'https://www.bizjournals.com/houston/news/2022/10/04/gener8tor-accelerators-urban-eatz-spendebt.html',
    spotlight: true,
  },
  {
    id: 'goddady',
    kind: 'feature',
    kindLabel: 'Media feature',
    source: 'GoDaddy',
    title: 'Elevating communities with Urban Eatz',
    date: 'Oct 29, 2021',
    description:
      'GoDaddy profiled founder D’Andre Good, telling the story behind Urban Eatz and the mission to lift up communities through local delivery and commerce.',
    url: 'https://www.godaddy.com/resources/stories/dandre-good-urban-eatz',
    spotlight: true,
  },
  {
    id: 'houston-chronicle',
    kind: 'feature',
    kindLabel: 'Media feature',
    source: 'Houston Chronicle',
    title: 'Urban Eatz looks to bring Houston’s most hidden restaurants to the surface',
    date: 'Dec 8, 2020',
    description:
      'The Houston Chronicle covered how Urban Eatz was creating opportunity for the restaurants and neighborhoods that big platforms overlook.',
    spotlight: true,
  },
  {
    id: 'voyage-houston',
    kind: 'interview',
    kindLabel: 'Interview',
    source: 'VoyageHouston',
    title: 'Meet D’Andre Good and LaKendra Hills of Urban Eatz Delivery',
    date: 'Sep 1, 2020',
    description:
      'VoyageHouston sat down with the founders to talk about launching during a pandemic, serving the community, and what drives the mission.',
  },
  {
    id: 'canvas-rebel',
    kind: 'interview',
    kindLabel: 'Interview',
    source: 'CanvasRebel',
    title: 'Meet D’Andre Good',
    date: 'Jun 30, 2022',
    description:
      'CanvasRebel featured founder D’Andre Good in conversation about the journey, the challenges, and the vision for Urban Goodz.',
  },
  {
    id: 'melanin-minds',
    kind: 'profile',
    kindLabel: 'Profile',
    source: 'Melanin Minds',
    title: 'D’Andre Good — on the front lines of Black entrepreneurship',
    date: 'Jul 23, 2022',
    description:
      'Melanin Minds profiled D’Andre Good’s leadership and the company’s commitment to economic empowerment.',
  },
]

export const milestones = [
  {
    year: '2020',
    title: 'Urban Eatz Delivery launches',
    body: 'Founded by D’Andre Good in Houston, Texas — born from the belief that every neighborhood deserves access to what it needs, delivered with dignity.',
  },
  {
    year: '2020',
    title: 'Houston startup',
    body: 'Launched during a global pandemic, growing from a single driver to a network serving local businesses across Houston.',
  },
  {
    year: '2022',
    title: 'gener8tor accelerator',
    body: 'Selected for gBETA Houston, the Northwestern Mutual Black Founder Accelerator, and the gener8tor Huntsville Investment Accelerator — accelerating the company’s growth.',
  },
  {
    year: '2021–2022',
    title: 'Awards & recognition',
    body: 'Featured by the Houston Business Journal, Houston Chronicle, GoDaddy, VoyageHouston, InnovationMap, CanvasRebel and Melanin Minds.',
  },
  {
    year: '2023',
    title: 'Reborn as Urban Goodz',
    body: 'The company evolves from delivery to a full commerce ecosystem — marketplace, logistics, healthcare courier, fashion, freight and AI — under a new name for a bigger mission.',
  },
  {
    year: 'Today',
    title: 'AI-powered commerce platform',
    body: 'One intelligent ecosystem connecting customers, businesses, retailers, creators, service providers, healthcare providers and drivers.',
  },
]

/**
 * Traction figures.
 *
 * Anything the codebase already knows is derived rather than retyped, so these
 * tiles cannot drift from the data they describe. Only externally-sourced
 * numbers (customers, accelerators) are literals.
 *
 * Order matters: the home and about pages render `traction.slice(0, 4)`.
 */
const liveMarkets = markets.filter((m) => m.status === 'active').length

export const traction = [
  { value: '25,000+', label: 'Customers served' },
  { value: String(liveMarkets), label: 'Live U.S. markets' },
  { value: '2020', label: 'Founded as Urban Eatz' },
  { value: '2023', label: 'Rebranded as Urban Goodz' },
  { value: '2', label: 'National accelerators' },
  { value: String(aiSystems.length), label: 'AI systems on the platform' },
  { value: String(pressItems.length), label: 'Press & media features' },
]

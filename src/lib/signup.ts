import { z } from 'zod'

export const audiences = ['app', 'business', 'driver', 'samaritan'] as const
export type Audience = (typeof audiences)[number]

export const isAudience = (v: unknown): v is Audience =>
  typeof v === 'string' && (audiences as readonly string[]).includes(v)

/* ─── Validation ─────────────────────────────────────────────────── */

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''))

export const signupSchema = z
  .object({
    audience: z.enum(audiences),
    fullName: z.string().trim().min(2, 'Please enter your name').max(80),
    email: z.string().trim().min(1, 'Please enter your email').pipe(z.email('Enter a valid email')),
    phone: optionalText(32),
    city: z.string().trim().min(2, 'Which city are you in?').max(80),
    businessName: optionalText(120),
    category: optionalText(80),
    vehicleType: optionalText(80),
    help: z.array(z.string().max(60)).max(12).optional(),
    zip: optionalText(12),
    referralSource: optionalText(120),
    /** Explicit interest keys. Future forms can set several; today they are
        derived from `audience` server-side when this is absent. */
    interests: z.array(z.string().max(40)).max(20).optional(),
    /** Attribution captured in the browser; all fields optional by design. */
    context: z
      .object({
        utmSource: optionalText(160),
        utmMedium: optionalText(160),
        utmCampaign: optionalText(160),
        landingPage: optionalText(500),
        referrer: optionalText(500),
        elapsedMs: z.number().int().min(0).max(86_400_000).optional(),
      })
      .optional(),
    message: optionalText(1200),
    consent: z.literal(true, { message: 'Please agree so we can contact you' }),
    /**
     * Honeypot. Real people never see this field. Deliberately permissive so a
     * filled value passes validation and reaches the handler, which drops it
     * while returning success — a bot told it failed just tries again.
     */
    company: z.string().max(200).optional(),
  })
  .superRefine((v, ctx) => {
    const need = (field: keyof typeof v, message: string) => {
      if (!String(v[field] ?? '').trim()) {
        ctx.addIssue({ code: 'custom', path: [field], message })
      }
    }
    if (v.audience === 'business') {
      need('businessName', 'Tell us your business name')
      need('category', 'Pick a category')
      need('phone', 'A phone number helps us onboard you faster')
    }
    if (v.audience === 'driver') {
      need('vehicleType', 'What will you be driving?')
      need('phone', 'We need a phone number for dispatch')
    }
    if (v.audience === 'samaritan') {
      need('phone', 'We need a phone number to verify you')
      if (!v.help?.length) {
        ctx.addIssue({ code: 'custom', path: ['help'], message: 'Choose at least one kind of help' })
      }
    }
  })

export type SignupInput = z.input<typeof signupSchema>
export type SignupValues = z.output<typeof signupSchema>

/* ─── Field descriptors ──────────────────────────────────────────── */

export type Field =
  | {
      kind: 'text'
      name: keyof SignupInput
      label: string
      type?: 'text' | 'email' | 'tel'
      placeholder?: string
      autoComplete?: string
      required?: boolean
      half?: boolean
    }
  | {
      kind: 'select'
      name: keyof SignupInput
      label: string
      options: string[]
      required?: boolean
      half?: boolean
    }
  | { kind: 'checks'; name: 'help'; label: string; options: string[] }
  | { kind: 'textarea'; name: 'message'; label: string; placeholder?: string }

const nameField: Field = {
  kind: 'text',
  name: 'fullName',
  label: 'Full name',
  autoComplete: 'name',
  required: true,
  half: true,
}
const emailField: Field = {
  kind: 'text',
  name: 'email',
  label: 'Email',
  type: 'email',
  autoComplete: 'email',
  required: true,
  half: true,
}
const cityField: Field = {
  kind: 'text',
  name: 'city',
  label: 'City',
  placeholder: 'Houston, TX',
  autoComplete: 'address-level2',
  required: true,
  half: true,
}
const phoneField = (required: boolean): Field => ({
  kind: 'text',
  name: 'phone',
  label: required ? 'Phone' : 'Phone (optional)',
  type: 'tel',
  autoComplete: 'tel',
  required,
  half: true,
})

export const businessCategories = [
  'Restaurant',
  'Grocery or market',
  'Retail or boutique',
  'Beauty or barbershop',
  'Pharmacy or health',
  'Home-based business',
  'Services or trades',
  'Creator or events',
  'Other',
]

export const vehicleTypes = [
  'Car',
  'SUV',
  'Van',
  'Pickup truck',
  'Box truck',
  'Semi / 18-wheeler',
  'Motorcycle or scooter',
  'Bicycle',
]

export const samaritanHelp = [
  'Jump start',
  'Flat tire change',
  'Fuel delivery',
  'Lockout help',
  'Tow or recovery',
  'Mobile mechanic',
  'EV charging',
  'Ride to safety',
]

/* ─── Per-audience configuration ─────────────────────────────────── */

export type AudienceConfig = {
  id: Audience
  tab: string
  icon: 'bag' | 'business' | 'drivers' | 'shield'
  eyebrow: string
  title: string
  lede: string
  fields: Field[]
  submitLabel: string
  successTitle: string
  successBody: string
  perks: string[]
}

export const audienceConfig: Record<Audience, AudienceConfig> = {
  app: {
    id: 'app',
    tab: 'Get the app',
    icon: 'bag',
    eyebrow: 'For customers',
    title: 'Join the app waitlist',
    lede: 'Be first in line when Urban Goodz lands on your phone. We will email you the moment your city goes live.',
    fields: [
      nameField,
      emailField,
      cityField,
      phoneField(false),
      { kind: 'textarea', name: 'message', label: 'Anything you want us to know? (optional)' },
    ],
    submitLabel: 'Join the waitlist',
    successTitle: 'You’re on the list.',
    successBody:
      'We’ll email you as soon as the app is available in your city — and nothing else in the meantime.',
    perks: ['First access at launch', 'Local business drops', 'No spam, ever'],
  },
  business: {
    id: 'business',
    tab: 'List my business',
    icon: 'business',
    eyebrow: 'For business owners',
    title: 'Put your business on the map',
    lede: 'Free storefront setup, real analytics and an AI teammate that reads your numbers. Tell us about your business and we will get you live.',
    fields: [
      { ...(nameField as Extract<Field, { kind: 'text' }>), label: 'Your name' },
      emailField,
      {
        kind: 'text',
        name: 'businessName',
        label: 'Business name',
        autoComplete: 'organization',
        required: true,
        half: true,
      },
      phoneField(true),
      { kind: 'select', name: 'category', label: 'Category', options: businessCategories, required: true, half: true },
      cityField,
      { kind: 'textarea', name: 'message', label: 'Tell us about your business (optional)' },
    ],
    submitLabel: 'Request onboarding',
    successTitle: 'Welcome aboard.',
    successBody:
      'Our merchant team will reach out to walk you through setup. Onboarding is free and usually takes minutes.',
    perks: ['Free storefront setup', 'Analytics & AI insights', 'Keep your customers'],
  },
  driver: {
    id: 'driver',
    tab: 'Drive with us',
    icon: 'drivers',
    eyebrow: 'For drivers',
    title: 'Earn on your own schedule',
    lede: 'Flexible hours, transparent earnings and routes planned around your time. Tell us where you are and what you drive.',
    fields: [
      nameField,
      emailField,
      phoneField(true),
      cityField,
      { kind: 'select', name: 'vehicleType', label: 'What do you drive?', options: vehicleTypes, required: true, half: true },
      { kind: 'textarea', name: 'message', label: 'Delivery experience? (optional)' },
    ],
    submitLabel: 'Apply to drive',
    successTitle: 'Application received.',
    successBody:
      'We’ll follow up with the next steps for verification and getting you on the road in your market.',
    perks: ['Flexible scheduling', 'Transparent earnings', '100% of your tips'],
  },
  samaritan: {
    id: 'samaritan',
    tab: 'Become a Samaritan',
    icon: 'shield',
    eyebrow: 'For Goodz Samaritans',
    title: 'Help someone stranded nearby',
    lede: 'Verified community members who show up when a neighbor is stuck. Volunteer, accept tips, or set a fair rate — your call.',
    fields: [
      nameField,
      emailField,
      phoneField(true),
      cityField,
      { kind: 'checks', name: 'help', label: 'What can you help with?', options: samaritanHelp },
      { kind: 'textarea', name: 'message', label: 'Anything else we should know? (optional)' },
    ],
    submitLabel: 'Apply to be a Samaritan',
    successTitle: 'Thank you for stepping up.',
    successBody:
      'We’ll send you the verification steps. Once you’re cleared, you’ll start seeing requests from people near you.',
    perks: ['Identity verified', 'Volunteer or earn', 'Help your own block'],
  },
}

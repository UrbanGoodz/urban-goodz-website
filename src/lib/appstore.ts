/**
 * App distribution links.
 *
 * Until the apps are published, both buttons route to the waitlist. When the
 * listings go live, set the two URLs below (or the matching env vars at build
 * time) — no component changes are needed anywhere.
 */

const fromEnv = (key: string) =>
  (typeof import.meta !== 'undefined' ? (import.meta.env?.[key] as string | undefined) : undefined) || ''

export const appStore = {
  ios: fromEnv('VITE_APP_STORE_URL'),
  android: fromEnv('VITE_GOOGLE_PLAY_URL'),
} as const

export const isPublished = {
  ios: Boolean(appStore.ios),
  android: Boolean(appStore.android),
} as const

/** Where an app-download button should point right now. */
export function appLink(platform: 'ios' | 'android') {
  const url = appStore[platform]
  return url
    ? { external: true as const, href: url }
    : { external: false as const, to: '/join', search: { as: 'app' as const } }
}

/**
 * Firebase Web SDK config. These values identify the project and are safe to
 * ship client-side — Firebase access is governed by security rules and App
 * Check, not by keeping this object secret. Pulled from the same Firebase
 * project ("urbangoodz") the mobile apps already use, via the admin panel's
 * 3rd-party settings.
 */
export const firebaseConfig = {
  apiKey: 'AIzaSyBMiv_0Id2G7jE0wH_rG5Q7Hz62t_yYxJc',
  authDomain: 'urbaneatz.firebaseapp.com',
  projectId: 'urbangoodz',
  storageBucket: 'urbaneatz.firebasestorage.app',
  messagingSenderId: '709013709032',
  appId: '1:709013709032:web:005e6ba3a9b138b041a95d',
  measurementId: 'G-HP67NW7Q9G',
} as const

/**
 * Web push additionally needs a VAPID key pair, generated per web app in the
 * Firebase console (Project settings → Cloud Messaging → Web configuration →
 * Generate key pair). None is stored in the admin panel's business_settings
 * yet (`push_notification_key` exists but is empty), so this reads an env var
 * until one is generated and wired through.
 */
export const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as string | undefined

/** Where captured subscription tokens are POSTed. No server function exists
 * in this static deployment, so this must be a public-write endpoint the
 * client can reach directly — e.g. a Zapier/Make webhook or a Google Apps
 * Script tied to a sheet, the same pattern LEAD_STORAGE=webhook already uses
 * for leads. */
export const pushSubscribeWebhookUrl = import.meta.env.VITE_PUSH_SUBSCRIBE_WEBHOOK_URL as
  | string
  | undefined

/** Push notifications are only offered once both prerequisites exist. */
export const pushConfigured = Boolean(vapidKey && pushSubscribeWebhookUrl)

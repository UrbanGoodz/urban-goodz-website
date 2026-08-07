import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'
import { firebaseConfig, pushSubscribeWebhookUrl, vapidKey } from './firebaseConfig'

export type PushSubscribeResult =
  | { ok: true }
  | { ok: false; reason: 'unsupported' | 'denied' | 'not-configured' | 'error'; detail?: string }

/**
 * Requests notification permission, registers the messaging service worker,
 * fetches an FCM token, and POSTs it directly to a public webhook — there's
 * no Node server behind this static deployment to host a server function.
 */
export async function subscribeToPush(): Promise<PushSubscribeResult> {
  if (typeof window === 'undefined') return { ok: false, reason: 'unsupported' }
  if (!vapidKey || !pushSubscribeWebhookUrl) return { ok: false, reason: 'not-configured' }
  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    return { ok: false, reason: 'unsupported' }
  }
  if (!(await isSupported())) return { ok: false, reason: 'unsupported' }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return { ok: false, reason: 'denied' }

  try {
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
    const app = initializeApp(firebaseConfig)
    const messaging = getMessaging(app)
    const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration })

    await fetch(pushSubscribeWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'push_subscription',
        token,
        landingPage: window.location.pathname,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    })

    return { ok: true }
  } catch (err) {
    return { ok: false, reason: 'error', detail: err instanceof Error ? err.message : String(err) }
  }
}

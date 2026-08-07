import * as React from 'react'
import { Icon } from '~/components/icons'
import { pushConfigured } from '~/lib/firebaseConfig'
import { subscribeToPush } from '~/lib/push'

const DISMISS_KEY = 'ug_push_opt_in_dismissed'

type Status = 'idle' | 'working' | 'granted' | 'denied' | 'error'

export function PushOptIn() {
  const [dismissed, setDismissed] = React.useState(true)
  const [status, setStatus] = React.useState<Status>('idle')

  React.useEffect(() => {
    if (!pushConfigured) return
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') return
    setDismissed(localStorage.getItem(DISMISS_KEY) === '1')
  }, [])

  if (!pushConfigured || dismissed) return null

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1')
    setDismissed(true)
  }

  const enable = async () => {
    setStatus('working')
    const result = await subscribeToPush()
    if (result.ok) {
      setStatus('granted')
      setTimeout(dismiss, 2500)
    } else if (result.reason === 'denied') {
      setStatus('denied')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl grad-seasoning text-ug-black">
          <Icon name="spark" size={18} />
        </span>
        <div className="min-w-0 flex-1">
          {status === 'granted' ? (
            <p className="text-sm font-semibold text-ug-black">You're in — we'll keep you posted.</p>
          ) : status === 'denied' ? (
            <p className="text-sm font-semibold text-ug-black">
              Notifications are blocked in your browser settings.
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold text-ug-black">Get notified about new markets & drops</p>
              <p className="mt-1 text-xs text-ug-black/60">We'll only ping you for things worth knowing.</p>
            </>
          )}
          {status !== 'granted' && (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={enable}
                disabled={status === 'working'}
                className="rounded-full bg-ug-black px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
              >
                {status === 'working' ? 'Enabling…' : 'Enable'}
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-full px-3 py-2 text-xs font-semibold text-ug-black/50 hover:text-ug-black"
              >
                Not now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

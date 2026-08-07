import { createFileRoute } from '@tanstack/react-router'
import {
  PhoneFrame,
  ScreenAi,
  ScreenBusiness,
  ScreenDriver,
  ScreenFashion,
  ScreenMedical,
  ScreenTracking,
  ScreenWallet,
} from '~/components/visuals/PhoneScreens'

export const Route = createFileRoute('/preview-phones')({
  component: PreviewPhones,
})

const screens = [
  { name: 'ScreenWallet', Screen: ScreenWallet, screenBg: 'bg-paper' },
  { name: 'ScreenDriver', Screen: ScreenDriver, screenBg: 'bg-ink-800' },
  { name: 'ScreenAi', Screen: ScreenAi, screenBg: 'bg-paper' },
  { name: 'ScreenFashion', Screen: ScreenFashion, screenBg: 'bg-paper' },
  { name: 'ScreenMedical', Screen: ScreenMedical, screenBg: 'bg-paper' },
  { name: 'ScreenTracking', Screen: ScreenTracking, screenBg: 'bg-paper' },
  { name: 'ScreenBusiness', Screen: ScreenBusiness, screenBg: 'bg-paper' },
]

function PreviewPhones() {
  return (
    <section className="surface-paper py-16">
      <div className="container-ug">
        <h1 className="font-display text-3xl font-bold text-ug-black">
          PhoneScreens — component preview
        </h1>
        <p className="mt-2 text-ug-black/60">
          Every screen exported by <code>src/components/visuals/PhoneScreens.tsx</code>, rendered in
          its <code>PhoneFrame</code>. Not linked from the site.
        </p>

        <div className="mt-12 grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
          {screens.map(({ name, Screen, screenBg }) => (
            <figure key={name}>
              <PhoneFrame screenBg={screenBg}>
                <Screen />
              </PhoneFrame>
              <figcaption className="mt-4 text-center font-mono text-xs text-ug-black/60">
                {name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

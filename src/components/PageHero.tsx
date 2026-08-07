import type { ReactNode } from 'react'
import { Eyebrow, Reveal } from './primitives'

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden surface-ink pt-36 pb-16 md:pt-44 md:pb-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 h-96 w-[700px] rounded-full bg-seasoning/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-24 size-[420px] rounded-full bg-dijon/10 blur-3xl"
      />
      <div className="container-ug relative">
        <Reveal className="flex justify-center">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mx-auto mt-5 max-w-4xl text-center font-display text-4xl font-bold tracking-tight text-ink-on-dark md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {lede && (
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-mute-on-dark">
              {lede}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}

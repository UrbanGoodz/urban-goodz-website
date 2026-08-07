import { Link } from '@tanstack/react-router'
import { site } from '~/lib/site'
import { Icon } from './icons'
import { LinkBtn } from './primitives'

export function ComingSoon({ title = 'Coming soon' }: { title?: string }) {
  return (
    <section className="surface-ink min-h-[70vh] grid place-items-center">
      <div className="container-ug py-28 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl grad-seasoning text-ug-black shadow-halo">
          <Icon name="spark" size={36} />
        </div>
        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink-on-dark md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-mute-on-dark">
          We’re building the full {site.name} experience — this page is next on the roadmap. In the
          meantime, explore the platform or get in touch.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <LinkBtn to="/" variant="primary">
            Back to Home
          </LinkBtn>
          <LinkBtn to="/contact" variant="on-dark">
            Get in Touch
          </LinkBtn>
        </div>
        <p className="mt-12 text-sm text-mute-on-dark">
          Not what you were looking for?{' '}
          <Link to="/contact" className="text-seasoning-300 underline underline-offset-4 hover:text-seasoning-400">
            Tell us about it
          </Link>
        </p>
      </div>
    </section>
  )
}

import { Link } from '@tanstack/react-router'
import { Icon } from './icons'

export function NotFound() {
  return (
    <div className="surface-ink grid min-h-[70vh] place-items-center">
      <div className="container-ug py-28 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-seasoning-300">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-on-dark md:text-6xl">
          This page moved on
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-mute-on-dark">
          The page you’re looking for doesn’t exist — but the platform is right here.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to="/contact" className="btn btn-on-dark">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

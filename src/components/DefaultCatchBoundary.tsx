import { Link, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  return (
    <div className="surface-ink grid min-h-[70vh] place-items-center">
      <div className="container-ug py-28 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-seasoning-300">
          Something went wrong
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-on-dark md:text-5xl">
          We hit a snag
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-mute-on-dark">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => router.invalidate()}
            className="btn btn-primary"
          >
            Try Again
          </button>
          <Link to="/" className="btn btn-on-dark">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

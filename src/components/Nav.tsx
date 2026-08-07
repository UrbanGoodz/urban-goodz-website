import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Icon, Wordmark } from './icons'
import { LinkBtn } from './primitives'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/platform', label: 'Platform' },
  { to: '/services', label: 'Services' },
  { to: '/ai', label: 'AI Team' },
  { to: '/markets', label: 'Markets' },
  { to: '/about', label: 'About' },
  { to: '/press', label: 'Press & Recognition' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'surface-ink shadow-[0_18px_50px_-24px_rgba(0,0,0,0.7)]' : 'bg-transparent'
      }`}
    >
      <div className="container-ug flex h-18 items-center justify-between gap-6">
        <Link to="/" aria-label="Urban Goodz — home" className="shrink-0">
          <Wordmark className="h-9 w-auto" variant={scrolled || open ? 'dark' : 'light'} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.to || (link.to !== '/' && pathname.startsWith(link.to))
            const isAi = link.to === '/ai'
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'text-seasoning-300 font-semibold'
                    : 'text-ink-on-dark/80 hover:text-ink-on-dark hover:bg-white/5'
                }`}
                activeOptions={{ exact: link.to === '/' }}
              >
                <span className="flex items-center gap-1.5">
                  {link.label}
                  {isAi && (
                    <span className="inline-flex size-1.5 rounded-full bg-seasoning animate-pulse" />
                  )}
                </span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-seasoning via-dijon to-seasoning animate-fade-in"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <LinkBtn to="/join" variant="primary" className="!py-2.5 !px-5" search={{ as: 'app' }}>
            Download the App
            <Icon name="arrow-up-right" size={16} />
          </LinkBtn>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="lg:hidden inline-flex size-11 items-center justify-center rounded-full text-ink-on-dark transition hover:bg-white/10"
        >
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden surface-ink min-h-[calc(100dvh-4.5rem)] overflow-y-auto">
          <nav aria-label="Mobile" className="container-ug flex flex-col gap-1 py-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-2xl px-4 py-4 font-display text-2xl font-semibold transition-colors ${
                  pathname === link.to ? 'text-seasoning-300' : 'text-ink-on-dark/90 hover:text-ink-on-dark'
                }`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <LinkBtn to="/join" variant="primary" className="w-full" search={{ as: 'app' }}>
                Download the App
              </LinkBtn>
              <LinkBtn to="/join" variant="on-dark" className="w-full" search={{ as: 'business' }}>
                Become a Business Partner
              </LinkBtn>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

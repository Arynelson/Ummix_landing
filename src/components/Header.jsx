import { useState, useEffect } from 'react'
import { PLATFORM_SIGNUP } from '../constants/urls'

export default function Header({ active, surface = 'overlay' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const usesDarkInk = scrolled || surface === 'light'
  const navigationItems = [
    { href: '/', label: 'Início' },
    { href: '/cashback', label: 'Cashback' },
    { href: '/partner', label: 'Partners' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        usesDarkInk
          ? `bg-white/95 backdrop-blur ${scrolled ? 'shadow-md py-3' : 'py-5'}`
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4 md:px-6">
        <a href="/" className="flex min-h-11 shrink-0 items-center">
          <img src="/assets/logo-ummix-ads.png" alt="Ummix Ads" className={`h-auto w-[118px] transition-all sm:w-[150px] md:h-10 md:w-auto ${
            usesDarkInk ? 'opacity-100' : 'brightness-0 invert'
          }`} />
        </a>

        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navigationItems.map(({ href, label }) => {
            const isCurrent = active === href
            return (
              <a
                key={href}
                href={href}
                aria-current={isCurrent ? 'page' : undefined}
                className={`transition-colors ${
                  isCurrent
                  ? usesDarkInk ? 'text-ummix-red' : 'text-white underline underline-offset-4 decoration-ummix-red'
                    : usesDarkInk ? 'text-ummix-dark hover:text-ummix-red' : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <a
          href={PLATFORM_SIGNUP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center whitespace-nowrap rounded-lg bg-ummix-red px-3 py-2 text-xs font-semibold text-white transition-all hover:scale-105 hover:bg-ummix-red-dark md:px-6 md:py-2.5 md:text-sm"
        >
          <span className="sm:hidden">Plataforma</span>
          <span className="hidden sm:inline">Plataforma Ummix Ads</span>
        </a>

        <button
          type="button"
          className={`grid h-11 w-11 place-items-center rounded-lg border md:hidden ${
            usesDarkInk ? 'border-ummix-dark/20 text-ummix-dark' : 'border-white/30 text-white'
          }`}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Navegação móvel"
        className={`absolute left-3 right-3 top-full mt-2 overflow-hidden rounded-2xl bg-white p-2 shadow-xl transition-all sm:left-4 sm:right-4 md:hidden ${
          menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {navigationItems.map(({ href, label }) => {
          const isCurrent = active === href
          return (
            <a
              key={href}
              href={href}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
              className={`flex min-h-11 items-center rounded-xl px-4 text-sm font-bold transition-colors ${
                isCurrent ? 'bg-ummix-red/10 text-ummix-red' : 'text-ummix-dark hover:bg-ummix-gray'
              }`}
            >
              {label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}

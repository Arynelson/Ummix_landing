import { useState, useEffect } from 'react'
import { PLATFORM_SIGNUP } from '../constants/urls'

export default function Header({ active }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigationItems = [
    { href: '/', label: 'Início' },
    { href: '/cashback', label: 'Cashback' },
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
        scrolled ? 'bg-white/95 backdrop-blur shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-3">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src="/assets/logo-ummix-ads.png" alt="Ummix Ads" className={`h-8 md:h-10 transition-all ${
            scrolled ? 'opacity-100' : 'brightness-0 invert'
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
                    ? scrolled ? 'text-ummix-red' : 'text-white underline underline-offset-4 decoration-ummix-red'
                    : scrolled ? 'text-ummix-dark hover:text-ummix-red' : 'text-white/80 hover:text-white'
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
          className="min-h-11 bg-ummix-red hover:bg-ummix-red-dark text-white px-3 py-2 md:px-6 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all hover:scale-105 whitespace-nowrap"
        >
          <span className="sm:hidden">Acessar plataforma</span>
          <span className="hidden sm:inline">Plataforma Ummix Ads</span>
        </a>

        <button
          type="button"
          className={`grid h-11 w-11 place-items-center rounded-lg border md:hidden ${
            scrolled ? 'border-ummix-dark/20 text-ummix-dark' : 'border-white/30 text-white'
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
        className={`absolute left-4 right-4 top-full mt-2 overflow-hidden rounded-2xl bg-white p-2 shadow-xl transition-all md:hidden ${
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

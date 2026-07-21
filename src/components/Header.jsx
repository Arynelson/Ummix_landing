import { useState, useEffect } from 'react'
import { PLATFORM_SIGNUP } from '../constants/urls'

export default function Header({ active }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {[
            { href: '/', label: 'Início' },
            { href: '/cashback', label: 'Cashback' },
          ].map(({ href, label }) => {
            const isCurrent = active === href
            return (
              <a
                key={href}
                href={href}
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
          className="bg-ummix-red hover:bg-ummix-red-dark text-white px-3 py-2 md:px-6 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all hover:scale-105 whitespace-nowrap"
        >
          <span className="sm:hidden">Acessar plataforma</span>
          <span className="hidden sm:inline">Plataforma Ummix Ads</span>
        </a>
      </div>
    </header>
  )
}

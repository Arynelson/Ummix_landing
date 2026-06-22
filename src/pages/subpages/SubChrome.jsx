import { useState, useEffect } from 'react'

const PLATFORM_URL = 'https://app.ummix.com.br'

export function SubHeader({ active }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', on, { passive: true })
    on()
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center shrink-0">
          <img
            src="/assets/logo-ummix-ads.png"
            alt="Ummix Ads"
            className={`h-8 md:h-10 transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
          />
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
          href={PLATFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ummix-red hover:bg-ummix-red-dark text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all hover:scale-105 whitespace-nowrap"
        >
          Acessar plataforma
        </a>
      </div>
    </header>
  )
}

export function SubFooter() {
  return (
    <footer className="bg-ummix-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <img src="/assets/logo-ummix-ads.png" alt="Ummix Ads" className="h-8 brightness-0 invert" />
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
          <a href="/" className="hover:text-white transition-colors">Início</a>
          <a href="/cashback" className="hover:text-white transition-colors">Cashback</a>
          <a href="mailto:fale@ummix.com.br" className="hover:text-white transition-colors">Contato</a>
        </nav>
        <p className="text-sm text-white/40">
          &copy; {new Date().getFullYear()} Ummix Ads · Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}

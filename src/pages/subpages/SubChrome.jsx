import { useState, useEffect } from 'react'
import { Button, Logo } from '../../ds/components'

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
    <header
      data-theme={scrolled ? undefined : 'dark'}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-card/95 backdrop-blur shadow-[var(--shadow-md)] py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center shrink-0" aria-label="Ummix Ads">
          <Logo variant={scrolled ? 'vermelha' : 'branca'} height={28} />
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
                aria-current={isCurrent ? 'page' : undefined}
                className={`transition-colors ${
                  isCurrent
                    ? 'text-strong underline decoration-accent decoration-2 underline-offset-4'
                    : 'text-body hover:text-brand'
                }`}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <Button href={PLATFORM_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="md">
          Acessar plataforma
        </Button>
      </div>
    </header>
  )
}

export function SubFooter() {
  return (
    <footer data-theme="dark" className="bg-ink-900 text-body py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo variant="branca" height={28} />
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted">
          <a href="/" className="hover:text-strong transition-colors">Início</a>
          <a href="/cashback" className="hover:text-strong transition-colors">Cashback</a>
          <a href="mailto:falecoma@ummix.com.br" className="hover:text-strong transition-colors">Contato</a>
        </nav>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Ummix Ads · Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}

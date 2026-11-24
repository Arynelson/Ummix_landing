import { useEffect, useState } from 'react'
import { PLATFORM_SIGNUP } from '../constants/urls'
import { getLocalizedPath, useLocale } from '../LocaleProvider.jsx'
import { LABELS } from '../i18n-labels.js'
import { Button, Logo } from '../ds/components'

export default function Header({ active, surface = 'overlay' }) {
  const { locale, rememberLocale } = useLocale()
  const labels = LABELS[locale]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // Fundo claro (rolado ou página clara) → tema claro e logo vermelha; sobre hero escuro → tema escuro e logo branca.
  const usesDarkInk = scrolled || surface === 'light'
  const navigationItems = [
    { href: '/', active: '/', label: labels.home },
    { href: '/cashback', active: '/cashback', label: labels.cashback },
    {
      href: '/partner',
      active: '/partner',
      label: labels.partners,
      children: [
        { href: getLocalizedPath(locale, '/partner'), label: labels.partnerJoin },
        { href: `${getLocalizedPath(locale, '/partner')}#parceiros`, label: labels.partnerMeet },
      ],
    },
    { href: '/monetize', active: '/monetize', label: labels.monetize },
    { href: '/premios', active: '/premios', label: labels.awards },
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

  const languageSelector = (mobile = false) => (
    <div
      className={`flex items-center gap-1 rounded-[var(--radius-md)] border border-line bg-card p-1 ${
        mobile ? 'w-full justify-between' : ''
      }`}
      role="group"
      aria-label={labels.language}
    >
      {['pt', 'en', 'es'].map((option) => {
        const selected = locale === option
        const optionLabel = {
          pt: labels.switchToPortuguese,
          en: labels.switchToEnglish,
          es: labels.switchToSpanish,
        }[option]
        return (
          <a
            key={option}
            href={getLocalizedPath(option)}
            aria-label={optionLabel}
            aria-current={selected ? 'page' : undefined}
            lang={option === 'pt' ? 'pt-BR' : option}
            onClick={(event) => {
              if (selected) event.preventDefault()
              rememberLocale(option)
            }}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-sm)] px-2 text-xs font-semibold transition-colors ${
              selected ? 'bg-sunken text-strong ring-1 ring-line' : 'text-muted hover:bg-sunken hover:text-strong'
            }`}
          >
            <span className="hidden lg:inline">{labels.languageOptions[option]}</span>
            <span className="lg:hidden">{option.toUpperCase()}</span>
          </a>
        )
      })}
    </div>
  )

  return (
    <header
      data-theme={usesDarkInk ? undefined : 'dark'}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        usesDarkInk
          ? `bg-card/95 backdrop-blur ${scrolled ? 'shadow-[var(--shadow-md)] py-3' : 'py-5'}`
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4 md:px-6">
        <a href={getLocalizedPath(locale, '/')} className="flex min-h-11 shrink-0 items-center" aria-label="Ummix Ads">
          <Logo variant={usesDarkInk ? 'vermelha' : 'branca'} height={28} />
        </a>

        <nav aria-label={labels.mainNavigation} className="hidden items-center gap-4 text-sm font-semibold lg:flex lg:gap-6">
          {navigationItems.map(({ href, active: activePath, label, children }) => {
            const isCurrent = active === activePath
            const link = (
              <a
                key={activePath}
                href={getLocalizedPath(locale, href)}
                aria-current={isCurrent ? 'page' : undefined}
                aria-haspopup={children ? 'true' : undefined}
                className={`transition-colors ${
                  isCurrent
                    ? 'text-strong underline decoration-accent decoration-2 underline-offset-4'
                    : 'text-body hover:text-brand'
                }`}
              >
                {label}
              </a>
            )
            if (!children) return link
            return (
              <div key={activePath} className="group relative">
                {link}
                <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-52 rounded-[var(--radius-lg)] border border-line-subtle bg-card p-2 shadow-[var(--shadow-lg)]">
                    {children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="flex min-h-11 items-center whitespace-nowrap rounded-[var(--radius-md)] px-4 text-sm font-semibold text-strong transition-colors hover:bg-sunken hover:text-brand"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </nav>

        <div className="hidden lg:block">{languageSelector()}</div>

        <Button href={PLATFORM_SIGNUP} target="_blank" rel="noopener noreferrer" variant="primary" size="md">
          <span className="sm:hidden">{labels.platform}</span>
          <span className="hidden sm:inline">{labels.platformLong}</span>
        </Button>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] border border-line text-strong transition-colors hover:bg-sunken lg:hidden"
          aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label={labels.mobileNavigation}
        className={`absolute left-3 right-3 top-full mt-2 overflow-hidden rounded-[var(--radius-lg)] border border-line-subtle bg-card p-2 shadow-[var(--shadow-lg)] transition-all sm:left-4 sm:right-4 lg:hidden ${
          menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {navigationItems.flatMap(({ href, active: activePath, label, children }) => {
          const isCurrent = active === activePath
          if (children) {
            return children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                onClick={() => setMenuOpen(false)}
                className={`flex min-h-11 items-center rounded-[var(--radius-md)] px-4 text-sm font-semibold transition-colors ${
                  isCurrent ? 'bg-accent-soft text-brand' : 'text-strong hover:bg-sunken'
                }`}
              >
                {child.label}
              </a>
            ))
          }
          return (
            <a
              key={activePath}
              href={getLocalizedPath(locale, href)}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
              className={`flex min-h-11 items-center rounded-[var(--radius-md)] px-4 text-sm font-semibold transition-colors ${
                isCurrent ? 'bg-accent-soft text-brand' : 'text-strong hover:bg-sunken'
              }`}
            >
              {label}
            </a>
          )
        })}
        <div className="mt-2 border-t border-line-subtle pt-2">{languageSelector(true)}</div>
      </nav>
    </header>
  )
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const LOCALES = {
  pt: { code: 'pt-BR', label: 'Português', shortLabel: 'PT' },
  en: { code: 'en', label: 'English', shortLabel: 'EN' },
  es: { code: 'es', label: 'Español', shortLabel: 'ES' },
}

const STORAGE_KEY = 'ummix-locale'

function normalizeLocale(value) {
  return value === 'en' || value === 'es' ? value : value === 'pt' ? 'pt' : null
}

function localeFromPath(pathname) {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es'
  return null
}

function isPortuguesePagePath(pathname) {
  return /^\/(cashback|partner|monetize|investidores|premios)(?:\.html)?\/?$/.test(pathname)
}

function localeFromCountry(country) {
  if (!country) return null
  const normalized = String(country).trim().toUpperCase()
  if (normalized === 'BR' || normalized === 'BRA' || normalized === 'BRAZIL') return 'pt'
  if (/^[A-Z]{2,3}$/.test(normalized)) return 'en'
  return null
}

function localeFromBrowser() {
  if (typeof navigator === 'undefined') return 'pt'
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function getInitialLocale() {
  if (typeof window === 'undefined') return 'pt'

  const pathLocale = localeFromPath(window.location.pathname)
  if (pathLocale) return pathLocale

  // The existing clean PT subpage URLs are explicit public URLs. A saved
  // preference must not make /cashback or /partner render a different locale.
  if (isPortuguesePagePath(window.location.pathname)) return 'pt'

  const queryLocale = normalizeLocale(new URLSearchParams(window.location.search).get('lang'))
  if (queryLocale) return queryLocale

  try {
    const storedLocale = normalizeLocale(window.localStorage.getItem(STORAGE_KEY))
    if (storedLocale) return storedLocale
  } catch {
    // Storage can be disabled; continue with the non-persistent fallback.
  }

  // A CDN/edge can expose the visitor country before the app boots. The static
  // site does not assume a third-party IP lookup, so browser language is the
  // fallback until the deployment injects window.__UMMIX_COUNTRY__.
  const injectedCountry = localeFromCountry(window.__UMMIX_COUNTRY__)
  if (injectedCountry) return injectedCountry

  return localeFromBrowser()
}

export function getLocalizedPath(locale, pathname = window.location.pathname) {
  const normalizedLocale = normalizeLocale(locale) ?? 'pt'
  const withoutLocalePrefix = pathname.replace(/^\/(?:en|es)(?=\/|$)/, '') || '/'

  if (normalizedLocale !== 'pt') {
    return withoutLocalePrefix === '/'
      ? '/' + normalizedLocale + '/'
      : '/' + normalizedLocale + withoutLocalePrefix
  }

  return withoutLocalePrefix
}

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale)

  useEffect(() => {
    document.documentElement.lang = LOCALES[locale].code
  }, [locale])

  const value = useMemo(() => ({
    locale,
    isEnglish: locale === 'en',
    language: LOCALES[locale],
    rememberLocale(nextLocale) {
      const next = normalizeLocale(nextLocale)
      if (!next) return
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Persistence is optional; the URL remains the source of truth.
      }
    },
    switchLocale(nextLocale) {
      const next = normalizeLocale(nextLocale)
      if (!next || next === locale) return

      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Navigation still works when storage is unavailable.
      }

      setLocale(next)
      window.location.assign(getLocalizedPath(next))
    },
  }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used inside LocaleProvider')
  return context
}

import { CONTACT_EMAIL } from '../constants/urls'
import { useLocale } from '../LocaleProvider.jsx'
import { LABELS } from '../i18n-labels.js'
import { Logo } from '../ds/components'

export default function Footer() {
  const { locale } = useLocale()
  const labels = LABELS[locale]

  return (
    <footer data-theme="dark" className="bg-ink-900 py-12 text-body">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo variant="branca" height={32} />
          <div className="flex flex-col items-center text-sm text-muted md:items-start">
            <a href="tel:+551152004038" className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-strong">11 5200-4038</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-strong">{CONTACT_EMAIL}</a>
            <div className="mt-3 flex w-full flex-col items-center gap-2 md:items-start">
              <p className="font-semibold text-strong">{labels.followUmmix}</p>
              <nav aria-label={labels.socialNavigation} className="flex max-w-full flex-wrap justify-center gap-2 md:justify-start">
                <a
                  href="https://www.linkedin.com/company/ummixsads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-0 items-center gap-2 rounded-md px-2 text-body transition-colors hover:text-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.08 2.08 0 1 0 4.75 7.16 2.08 2.08 0 0 0 4.75 3ZM21 13.84c0-3.76-2.01-5.51-4.69-5.51-2.16 0-3.13 1.19-3.67 2.03V8.5H9.14V21h3.5v-6.19c0-1.63.31-3.21 2.33-3.21 1.99 0 2.03 1.86 2.03 3.32V21H21v-7.16Z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/ummixads/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-0 items-center gap-2 rounded-md px-2 text-body transition-colors hover:text-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </nav>
            </div>
          </div>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Ummix Ads. {labels.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}

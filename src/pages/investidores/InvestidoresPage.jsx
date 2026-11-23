import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useLocale } from '../../LocaleProvider.jsx'
import { LABELS } from '../../i18n-labels.js'
import { INVESTORS_COPY } from './investidores-copy.js'

const leadership = [
  { name: 'Ary Hauffe', initials: 'AH', accent: 'var(--red-700)' },
  { name: 'Débora Freitas', initials: 'DF', accent: 'var(--red-900)' },
  { name: 'Edy Medrado', initials: 'EM', accent: 'var(--red-600)' },
  { name: 'Iuri Rincon Godinho', initials: 'IG', accent: 'var(--red-800)' },
  { name: 'João Silva', initials: 'JS', accent: 'var(--red-500)' },
  { name: 'Marcelo Bassetto', initials: 'MB', accent: 'var(--red-700)' },
  { name: 'Monique Evelle', initials: 'ME', accent: 'var(--red-900)' },
]

const velloreCompanies = [
  { name: 'AM Comercial', logo: '/assets/partners/am_comercial.png' },
  { name: 'Construjá', logo: '/assets/partners/construja.png' },
  { name: 'Diferpan' },
  { name: 'Famastil' },
  { name: 'Foxlux' },
  { name: 'Grupo LLE' },
  { name: 'Grupo Vellore', logo: '/assets/partners/grupo_vellore.png' },
  { name: 'Grupo Lopes', logo: '/assets/partners/lopes.png' },
  { name: 'Comercial Maia' },
  { name: 'MAS Distribuidora' },
  { name: 'Nova Casa', logo: '/assets/partners/nova_casa.png' },
  { name: 'Tambasa Atacadistas' },
]

function Hero({ copy }) {
  return (
    <section className="investors-hero" data-theme="dark">
      <div className="investors-shell investors-hero__layout">
        <div className="investors-hero__copy">
          <span className="investors-kicker">{copy.heroKicker}</span>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroDescription}</p>
        </div>
      </div>
    </section>
  )
}

function Leadership({ copy }) {
  return (
    <section className="investors-leadership" data-theme="dark" aria-labelledby="leadership-title">
      <div className="investors-shell">
        <div className="investors-section-heading">
          <span>{copy.leadershipKicker}</span>
          <h2 id="leadership-title">{copy.leadershipTitle}</h2>
          <p>{copy.leadershipDescription}</p>
        </div>

        <div className="investors-leadership__track" aria-label={copy.leadershipAriaLabel}>
          {leadership.map((person, index) => (
            <article
              key={person.name}
              className="leadership-card"
              style={{ '--portrait-accent': person.accent, '--portrait-index': index }}
            >
              <div className="leadership-card__portrait" aria-hidden="true">
                <span>{person.initials}</span>
              </div>
              <div className="leadership-card__content">
                <h3>{person.name}</h3>
                <p>{copy.leadershipRoles[index]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Ecosystem({ copy }) {
  return (
    <section className="investors-ecosystem" data-theme="dark" aria-labelledby="ecosystem-title">
      <div className="investors-shell">
        <div className="investors-ecosystem__top">
          <div>
            <span className="investors-kicker investors-kicker--gold">{copy.ecosystemKicker}</span>
            <h2 id="ecosystem-title">{copy.ecosystemTitle}</h2>
            <p className="investors-ecosystem__intro">{copy.ecosystemDescription}</p>
          </div>
          <div className="vellore-mark" aria-label={copy.velloreAriaLabel}>
            <span className="vellore-mark__symbol" aria-hidden="true">V</span>
            <strong>Vellore<br />Ventures</strong>
          </div>
        </div>

        <article className="vellore-group" aria-labelledby="vellore-title">
          <div className="vellore-group__copy">
            <span className="investors-kicker">{copy.velloreKicker}</span>
            <h3 id="vellore-title">{copy.velloreTitle}</h3>
            <p>{copy.velloreDescription}</p>
          </div>
          <div className="investors-ecosystem__grid" aria-label={copy.velloreCompaniesAriaLabel}>
            {velloreCompanies.map(({ name, logo }) => (
              <div key={name} className="ecosystem-company">
                {logo ? <img src={logo} alt={name} loading="lazy" /> : <span>{name}</span>}
              </div>
            ))}
          </div>
        </article>

        <article className="workintech-card" aria-labelledby="workintech-title">
          <div className="workintech-card__brand" aria-hidden="true">
            <img src="/assets/partners/workintech.png" alt="" loading="lazy" />
          </div>
          <div>
            <span className="investors-kicker investors-kicker--gold">{copy.workintechKicker}</span>
            <h3 id="workintech-title">{copy.workintechTitle}</h3>
            <p>{copy.workintechDescription}</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default function InvestidoresPage() {
  const { locale } = useLocale()
  const copy = INVESTORS_COPY[locale]
  const labels = LABELS[locale]

  return (
    <div className="investors-page">
      <Header active="/investidores" />
      <a className="skip-link" href="#main-content">{labels.skipToContent}</a>
      <main id="main-content" tabIndex="-1">
        <Hero copy={copy} />
        <Leadership copy={copy} />
        <Ecosystem copy={copy} />
      </main>
      <Footer />
    </div>
  )
}

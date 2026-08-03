import Header from '../../components/Header'
import Footer from '../../components/Footer'

const leadership = [
  { name: 'Ari', role: 'Sócio e liderança', initials: 'A', accent: '#7a1415' },
  { name: 'Débora', role: 'Sócia e liderança', initials: 'D', accent: '#c44a3f' },
  { name: 'Edy Medrado', role: 'Sócio e liderança', initials: 'EM', accent: '#9b191a' },
  { name: 'João', role: 'Sócio e liderança', initials: 'J', accent: '#a52c2d' },
  { name: 'Monique Evelle', role: 'Sócia-investidora', initials: 'ME', accent: '#d1844f' },
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

function Hero() {
  return (
    <section className="investors-hero">
      <div className="investors-shell investors-hero__layout">
        <div className="investors-hero__copy">
          <span className="investors-kicker">Quem somos</span>
          <h1>Quem está por trás da Ummix</h1>
          <p>
            A Ummix é construída por pessoas que combinam experiência em mídia, tecnologia e operação.
            Conheça quem coloca essa visão em movimento todos os dias.
          </p>
        </div>
      </div>
    </section>
  )
}

function Leadership() {
  return (
    <section className="investors-leadership" aria-labelledby="leadership-title">
      <div className="investors-shell">
        <div className="investors-section-heading">
          <span>As pessoas por trás da Ummix</span>
          <h2 id="leadership-title">Sócios e lideranças</h2>
          <p>Uma equipe que combina visão de negócio, tecnologia, dados e execução.</p>
        </div>

        <div className="investors-leadership__track" aria-label="Sócios e lideranças da Ummix">
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
                <p>{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Ecosystem() {
  return (
    <section className="investors-ecosystem" aria-labelledby="ecosystem-title">
      <div className="investors-shell">
        <div className="investors-ecosystem__top">
          <div>
            <span className="investors-kicker investors-kicker--gold">Ecossistema Ummix</span>
            <h2 id="ecosystem-title">Pessoas e empresas que constroem a Ummix.</h2>
            <p className="investors-ecosystem__intro">
              A Ummix cresce conectada a um ecossistema de empresas que compartilham visão de longo prazo,
              conhecimento e capacidade de execução.
            </p>
          </div>
          <div className="vellore-mark" aria-label="Vellore Ventures">
            <span className="vellore-mark__symbol" aria-hidden="true">V</span>
            <strong>Vellore<br />Ventures</strong>
          </div>
        </div>

        <article className="vellore-group" aria-labelledby="vellore-title">
          <div className="vellore-group__copy">
            <span className="investors-kicker">Grupo Vellore</span>
            <h3 id="vellore-title">Um grupo que reúne negócios e visão de futuro.</h3>
            <p>
              A Vellore Ventures participa da construção da Ummix e conecta a empresa a um grupo diverso,
              formado por negócios que movimentam diferentes mercados.
            </p>
          </div>
          <div className="investors-ecosystem__grid" aria-label="Empresas do grupo Vellore">
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
            <span className="investors-kicker investors-kicker--gold">WorkinTech</span>
            <h3 id="workintech-title">Tecnologia que aproxima pessoas, processos e negócios.</h3>
            <p>
              A WorkinTech faz parte do ecossistema da Ummix e representa a conexão com empresas que usam
              tecnologia para organizar operações, criar oportunidades e ampliar impacto.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default function InvestidoresPage() {
  return (
    <div className="investors-page">
      <Header active="/investidores" />
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <Leadership />
        <Ecosystem />
      </main>
      <Footer />
    </div>
  )
}

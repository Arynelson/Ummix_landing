import { ArrowRight, ChartNoAxesCombined, Cpu, Workflow } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ButtonLink from '../../components/ui/ButtonLink'

const pillars = [
  {
    icon: Cpu,
    title: 'Tecnologia',
    description: 'Plataforma proprietária que integra mídia, operação e performance em tempo real.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Inteligência de dados',
    description: 'Dados que orientam decisões mais precisas e campanhas mais eficientes.',
  },
  {
    icon: Workflow,
    title: 'Operação integrada',
    description: 'Processos e pessoas conectados para executar, escalar e medir resultados.',
  },
]

const leadership = [
  { name: 'Edy Medrado', role: 'Sócio e liderança', initials: 'EM', accent: '#9b191a' },
  { name: 'Débora', role: 'Sócia e liderança', initials: 'D', accent: '#c44a3f' },
  { name: 'Ari', role: 'Sócio e liderança', initials: 'A', accent: '#7a1415' },
  { name: 'João', role: 'Sócio e liderança', initials: 'J', accent: '#a52c2d' },
  { name: 'Monique Evelle', role: 'Sócia-investidora', initials: 'ME', accent: '#d1844f' },
]

const ecosystem = [
  'AM Comercial',
  'Construjá',
  'Diferpan',
  'Famastil',
  'Foxlux',
  'Grupo LLE',
  'Grupo Vellore',
  'Comercial Maia',
  'MAS Distribuidora',
  'Nova Casa',
  'Tambasa Atacadistas',
  'WorkinTech',
]

function NetworkArtwork() {
  return (
    <div className="investors-collage" aria-label="Tecnologia, dados e mídia conectados pela Ummix">
      <svg className="investors-network" viewBox="0 0 720 560" aria-hidden="true">
        <path d="M58 374 186 262 334 312 454 166 658 222" />
        <path d="M142 96 254 180 392 104 520 294 676 398" />
        <path d="M96 466 246 408 372 478 548 388 648 478" />
        <circle cx="186" cy="262" r="6" />
        <circle cx="334" cy="312" r="6" />
        <circle cx="454" cy="166" r="6" />
        <circle cx="254" cy="180" r="5" />
        <circle cx="520" cy="294" r="6" />
        <circle cx="372" cy="478" r="5" />
        <circle cx="548" cy="388" r="5" />
      </svg>

      <figure className="collage-frame collage-frame--campaign">
        <img
          src="/assets/platform-preview-campanha.png"
          alt="Tela de criação de campanha da plataforma Ummix Ads"
          width="1906"
          height="835"
          loading="eager"
        />
      </figure>

      <div className="collage-billboard" aria-hidden="true">
        <span>ummix</span>
        <small>ads</small>
      </div>

      <figure className="collage-frame collage-frame--dashboard">
        <img
          src="/assets/platform-preview-dashboard.png"
          alt="Dashboard de desempenho da plataforma Ummix Ads"
          width="1915"
          height="835"
          loading="eager"
        />
      </figure>

      <div className="collage-data" aria-hidden="true">
        <span className="collage-data__line collage-data__line--one" />
        <span className="collage-data__line collage-data__line--two" />
        <span className="collage-data__line collage-data__line--three" />
        <span className="collage-data__line collage-data__line--four" />
        <span className="collage-data__line collage-data__line--five" />
      </div>

      <div className="collage-orbit" aria-hidden="true">
        <span />
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="investors-hero">
      <div className="investors-shell investors-hero__layout">
        <div className="investors-hero__copy">
          <span className="investors-kicker">Quem somos</span>
          <h1>Quem constrói a Ummix com a gente</h1>
          <p>
            Pessoas, investidores e empresas unidos por uma mesma visão: transformar a mídia offline
            com tecnologia, dados e inteligência.
          </p>
        </div>
        <NetworkArtwork />
      </div>
    </section>
  )
}

function Vision() {
  return (
    <section className="investors-vision" aria-labelledby="vision-title">
      <div className="investors-shell">
        <div className="investors-vision__intro">
          <div>
            <span className="investors-kicker investors-kicker--gold">Nossa visão</span>
            <h2 id="vision-title">Tecnologia para transformar a mídia offline.</h2>
          </div>
          <p>
            A Ummix conecta marcas, pontos de venda e indústrias por meio de tecnologia proprietária,
            dados e uma operação integrada que gera resultados reais e mensuráveis.
          </p>
        </div>

        <div className="investors-pillars">
          {pillars.map(({ icon: Icon, title, description }) => (
            <article key={title} className="investors-pillar">
              <div className="investors-pillar__icon" aria-hidden="true">
                <Icon size={25} strokeWidth={1.8} />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
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

function Impact() {
  return (
    <section className="investors-impact" aria-label="Impacto econômico do ecossistema">
      <div className="investors-impact__lines" aria-hidden="true" />
      <div className="investors-shell investors-impact__content">
        <span>Juntas, movimentam mais de</span>
        <strong>R$ 10 bilhões</strong>
        <b>por ano</b>
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
            <span className="investors-kicker investors-kicker--gold">Investidores e ecossistema</span>
            <h2 id="ecosystem-title">Um ecossistema que movimenta negócios.</h2>
          </div>
          <div className="vellore-mark" aria-label="Vellore Ventures">
            <span className="vellore-mark__symbol" aria-hidden="true">V</span>
            <strong>Vellore<br />Ventures</strong>
          </div>
        </div>

        <div className="investors-ecosystem__grid">
          {ecosystem.map((company) => (
            <div key={company} className="ecosystem-company">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingCta() {
  return (
    <section className="investors-closing" aria-labelledby="closing-title">
      <div className="investors-closing__glow" aria-hidden="true" />
      <div className="investors-shell investors-closing__content">
        <h2 id="closing-title">Pessoas constroem a visão. Tecnologia amplia o impacto.</h2>
        <ButtonLink href="/#metodo" size="lg" className="rounded-xl">
          Conheça o Método Ummix
          <ArrowRight size={18} aria-hidden="true" />
        </ButtonLink>
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
        <Vision />
        <Leadership />
        <Impact />
        <Ecosystem />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  )
}

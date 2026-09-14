import { StrictMode, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import './campanha.css'
import { pushDataLayerEvent } from '../../services/analytics'

const SIGNUP_URL = 'https://app.ummix.com.br/signup/cliente'
const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']
const SCROLL_THRESHOLDS = [25, 50, 75, 90]

function getSignupUrl() {
  if (typeof window === 'undefined') return SIGNUP_URL

  const sourceParams = new URLSearchParams(window.location.search)
  const destination = new URL(SIGNUP_URL)

  ATTRIBUTION_KEYS.forEach((key) => {
    const value = sourceParams.get(key)
    if (value) destination.searchParams.set(key, value)
  })

  return destination.toString()
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4.2 4.2L19 6.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CampaignCta({ placement, children, signupUrl }) {
  function handleClick() {
    pushDataLayerEvent('button_click', {
      button_id: 'lp_campanha_' + placement + '_cta',
      button_text: children,
      destination_url: signupUrl,
      page_path: window.location.pathname,
      page_type: 'lp_campanha',
      placement,
    })
  }

  return (
    <a
      className="campaign-lp__cta campaign-lp__cta--primary"
      href={signupUrl}
      data-analytics-id={'lp_campanha_' + placement + '_cta'}
      onClick={handleClick}
    >
      <span>{children}</span>
      <ArrowIcon />
    </a>
  )
}

function Header() {
  return (
    <header className="campaign-lp__header">
      <a className="campaign-lp__brand" href="https://www.ummix.com.br/" aria-label="Ummix Ads — página inicial">
        <img src="/assets/Logo%20Ummix%20ads%20-%20Branca.svg" alt="Ummix Ads" />
      </a>
      <a className="campaign-lp__login" href="https://app.ummix.com.br/login">
        Já tenho uma conta
      </a>
    </header>
  )
}

function CampaignPage() {
  const signupUrl = getSignupUrl()
  const trackedScroll = useRef(new Set())

  useEffect(() => {
    if (!window.__ummixCampaignLandingPageView) {
      pushDataLayerEvent('page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
        page_type: 'lp_campanha',
      })
      window.__ummixCampaignLandingPageView = true
    }

    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentPercent = scrollableHeight > 0
        ? Math.round((window.scrollY / scrollableHeight) * 100)
        : 100

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (currentPercent >= threshold && !trackedScroll.current.has(threshold)) {
          trackedScroll.current.add(threshold)
          pushDataLayerEvent('scroll', {
            page_path: window.location.pathname,
            page_type: 'lp_campanha',
            percent_scrolled: threshold,
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="campaign-lp">
      <a className="campaign-lp__skip" href="#campaign-main">Ir para o conteúdo principal</a>

      <section className="campaign-lp__hero">
        <div className="campaign-lp__hero-grid">
          <Header />

          <div className="campaign-lp__hero-copy">
            <p className="campaign-lp__eyebrow">MÍDIA OFFLINE COM PERFORMANCE DIGITAL</p>
            <h1>
              Transforme sua próxima ideia em <span>campanha.</span>
            </h1>
            <p className="campaign-lp__hero-description">
              Crie sua conta e organize sua presença em TV e rádio com a clareza de uma plataforma digital.
            </p>
            <CampaignCta placement="hero" signupUrl={signupUrl}>
              Criar minha campanha
            </CampaignCta>
            <p className="campaign-lp__helper">Comece pelo cadastro na plataforma Ummix Ads.</p>
          </div>

          <div className="campaign-lp__visual" aria-label="Prévia da criação de uma campanha na plataforma Ummix Ads">
            <div className="campaign-lp__visual-glow" />
            <div className="campaign-lp__visual-card">
              <div className="campaign-lp__visual-topline">
                <span>CRIAR CAMPANHA</span>
                <span>01 / 04</span>
              </div>
              <img src="/assets/platform-preview-campanha.png" alt="Tela de criação de campanha da plataforma Ummix Ads" />
              <div className="campaign-lp__visual-footer">
                <span>Planeje com mais clareza.</span>
                <span aria-hidden="true">↗</span>
              </div>
            </div>
            <div className="campaign-lp__floating-note">
              <span className="campaign-lp__floating-dot" />
              <span>Seu próximo passo começa aqui</span>
            </div>
          </div>
        </div>

        <a className="campaign-lp__scroll-link" href="#como-funciona">
          <span>Veja como funciona</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <main id="campaign-main">
        <section className="campaign-lp__intro" aria-labelledby="intro-title">
          <div className="campaign-lp__shell campaign-lp__intro-grid">
            <div>
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">O PRIMEIRO PASSO É SIMPLES</p>
              <h2 id="intro-title">Mais contexto para decidir onde sua campanha começa.</h2>
            </div>
            <p>
              A Ummix reúne o planejamento de mídia em um só fluxo para você avançar com uma visão mais clara do público, dos meios e do objetivo da sua campanha.
            </p>
          </div>
        </section>

        <section className="campaign-lp__steps" id="como-funciona" aria-labelledby="steps-title">
          <div className="campaign-lp__shell">
            <div className="campaign-lp__section-heading">
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">COMO FUNCIONA</p>
              <h2 id="steps-title">Do cadastro ao planejamento, em poucos passos.</h2>
            </div>

            <div className="campaign-lp__step-grid">
              <article className="campaign-lp__step-card">
                <span className="campaign-lp__step-number">01</span>
                <div className="campaign-lp__step-icon"><span>U</span></div>
                <h3>Crie seu acesso</h3>
                <p>Informe seus dados e entre na plataforma Ummix Ads como cliente.</p>
              </article>
              <article className="campaign-lp__step-card campaign-lp__step-card--featured">
                <span className="campaign-lp__step-number">02</span>
                <div className="campaign-lp__step-icon"><span>→</span></div>
                <h3>Defina a campanha</h3>
                <p>Dê um nome ao projeto e comece a organizar o meio e o objetivo da campanha.</p>
              </article>
              <article className="campaign-lp__step-card">
                <span className="campaign-lp__step-number">03</span>
                <div className="campaign-lp__step-icon"><span>✓</span></div>
                <h3>Avance com contexto</h3>
                <p>Continue o fluxo com as informações que ajudam a orientar suas próximas decisões.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="campaign-lp__benefits" aria-labelledby="benefits-title">
          <div className="campaign-lp__shell campaign-lp__benefits-grid">
            <div className="campaign-lp__benefits-copy">
              <p className="campaign-lp__eyebrow">PARA COMEÇAR COM MAIS CONTROLE</p>
              <h2 id="benefits-title">A força da TV e do rádio com uma jornada mais organizada.</h2>
              <p>
                Tire a primeira decisão do caminho e veja como a plataforma estrutura sua campanha desde o início.
              </p>
              <CampaignCta placement="benefits" signupUrl={signupUrl}>
                Começar agora
              </CampaignCta>
            </div>

            <div className="campaign-lp__benefit-list">
              <div className="campaign-lp__benefit">
                <div className="campaign-lp__benefit-mark"><CheckIcon /></div>
                <div>
                  <h3>Planejamento em um só fluxo</h3>
                  <p>Organize as informações essenciais antes de avançar para as próximas etapas.</p>
                </div>
              </div>
              <div className="campaign-lp__benefit">
                <div className="campaign-lp__benefit-mark"><CheckIcon /></div>
                <div>
                  <h3>TV e rádio no mesmo lugar</h3>
                  <p>Comece a estruturar sua escolha de mídia dentro da mesma plataforma.</p>
                </div>
              </div>
              <div className="campaign-lp__benefit">
                <div className="campaign-lp__benefit-mark"><CheckIcon /></div>
                <div>
                  <h3>Mais clareza para o próximo passo</h3>
                  <p>Tenha uma sequência de etapas para conduzir a construção da sua campanha.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="campaign-lp__final-cta" aria-labelledby="final-cta-title">
          <div className="campaign-lp__final-shape campaign-lp__final-shape--one" />
          <div className="campaign-lp__final-shape campaign-lp__final-shape--two" />
          <div className="campaign-lp__shell campaign-lp__final-content">
            <p className="campaign-lp__eyebrow">SUA PRÓXIMA CAMPANHA COMEÇA COM UMA DECISÃO</p>
            <h2 id="final-cta-title">Pronto para tirar a ideia do papel?</h2>
            <p>Crie seu acesso e dê o primeiro passo dentro da Ummix Ads.</p>
            <CampaignCta placement="final" signupUrl={signupUrl}>
              Criar minha campanha
            </CampaignCta>
          </div>
        </section>
      </main>

      <footer className="campaign-lp__footer">
        <div className="campaign-lp__shell campaign-lp__footer-inner">
          <a className="campaign-lp__brand campaign-lp__brand--footer" href="https://www.ummix.com.br/" aria-label="Ummix Ads — página inicial">
            <img src="/assets/Logo%20Ummix%20ads%20-%20Branca.svg" alt="Ummix Ads" />
          </a>
          <p>Planeje sua presença em mídia offline com mais clareza.</p>
          <a href="https://app.ummix.com.br/login">Entrar na plataforma <span aria-hidden="true">↗</span></a>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CampaignPage />
  </StrictMode>,
)

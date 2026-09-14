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
            <p className="campaign-lp__eyebrow">MÍDIA OFFLINE PARA OBJETIVOS DE NEGÓCIO</p>
            <h1>
              Anuncie onde seu cliente está. <span>Venda mais.</span>
            </h1>
            <p className="campaign-lp__hero-description">
              Direcione sua verba para o público e a região certos, fortaleça sua marca e planeje sua presença em TV e rádio com mais clareza.
            </p>
            <CampaignCta placement="hero" signupUrl={signupUrl}>
              Quero anunciar onde meu cliente está
            </CampaignCta>
            <p className="campaign-lp__helper">Crie seu acesso e veja o próximo passo na plataforma Ummix Ads.</p>
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
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">SUA VERBA PRECISA DE DIREÇÃO</p>
              <h2 id="intro-title">Você investe para vender. Sua mídia precisa acompanhar esse objetivo.</h2>
            </div>
            <p>
              Quando público, região e investimento não estão alinhados, fica mais difícil saber se a publicidade está trabalhando a favor do negócio. A Ummix organiza esse caminho para você avançar com mais contexto e segurança.
            </p>
          </div>
        </section>

        <section className="campaign-lp__steps" id="como-funciona" aria-labelledby="steps-title">
          <div className="campaign-lp__shell">
            <div className="campaign-lp__section-heading">
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">COMO VOCÊ AVANÇA</p>
              <h2 id="steps-title">Do seu objetivo comercial a uma decisão de mídia mais clara.</h2>
            </div>

            <div className="campaign-lp__step-grid">
              <article className="campaign-lp__step-card">
                <span className="campaign-lp__step-number">01</span>
                <div className="campaign-lp__step-icon"><span>U</span></div>
                <h3>Comece pelo que você quer alcançar</h3>
                <p>Venda, atraia clientes ou fortaleça sua marca. O objetivo dá direção para a campanha.</p>
              </article>
              <article className="campaign-lp__step-card campaign-lp__step-card--featured">
                <span className="campaign-lp__step-number">02</span>
                <div className="campaign-lp__step-icon"><span>→</span></div>
                <h3>Direcione sua mídia</h3>
                <p>Organize público, região e investimento para anunciar com mais foco em TV e rádio.</p>
              </article>
              <article className="campaign-lp__step-card">
                <span className="campaign-lp__step-number">03</span>
                <div className="campaign-lp__step-icon"><span>✓</span></div>
                <h3>Avance sabendo o próximo passo</h3>
                <p>Conduza seu planejamento com as informações que ajudam a tomar decisões mais seguras.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="campaign-lp__benefits" aria-labelledby="benefits-title">
          <div className="campaign-lp__shell campaign-lp__benefits-grid">
            <div className="campaign-lp__benefits-copy">
              <p className="campaign-lp__eyebrow">O QUE MUDA PARA O SEU NEGÓCIO</p>
              <h2 id="benefits-title">Sua verba merece uma estratégia à altura do seu objetivo.</h2>
              <p>
                Transforme uma decisão difícil em um caminho mais claro para a sua próxima campanha.
              </p>
              <CampaignCta placement="benefits" signupUrl={signupUrl}>
                Quero anunciar onde meu cliente está
              </CampaignCta>
            </div>

            <div className="campaign-lp__benefit-list">
              <div className="campaign-lp__benefit">
                <div className="campaign-lp__benefit-mark"><CheckIcon /></div>
                <div>
                  <h3>Mais clareza para investir</h3>
                  <p>Entenda o que sua campanha precisa considerar antes de escolher onde anunciar.</p>
                </div>
              </div>
              <div className="campaign-lp__benefit">
                <div className="campaign-lp__benefit-mark"><CheckIcon /></div>
                <div>
                  <h3>Publicidade com mais foco</h3>
                  <p>Direcione sua mensagem para públicos e regiões que fazem sentido para o seu negócio.</p>
                </div>
              </div>
              <div className="campaign-lp__benefit">
                <div className="campaign-lp__benefit-mark"><CheckIcon /></div>
                <div>
                  <h3>Marca forte, vendas no radar</h3>
                  <p>Construa presença e mantenha seu objetivo comercial no centro do planejamento.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="campaign-lp__faq" aria-labelledby="faq-title">
          <div className="campaign-lp__shell campaign-lp__faq-grid">
            <div className="campaign-lp__faq-heading">
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">AINDA TEM DÚVIDAS?</p>
              <h2 id="faq-title">Tudo mais claro antes de você começar.</h2>
              <p>O cadastro é o primeiro passo para conhecer o fluxo de planejamento da Ummix Ads.</p>
            </div>

            <div className="campaign-lp__faq-list">
              <details open>
                <summary>Preciso ter uma campanha pronta para começar?</summary>
                <p>Não. O cadastro é o primeiro passo para organizar o objetivo e as informações da sua campanha dentro da plataforma.</p>
              </details>
              <details>
                <summary>A Ummix ajuda apenas com televisão?</summary>
                <p>A Ummix organiza campanhas em TV e rádio, com uma visão mais clara de público, região e investimento.</p>
              </details>
              <details>
                <summary>Como a Ummix ajuda a direcionar minha verba?</summary>
                <p>A plataforma reúne as informações necessárias para orientar o planejamento e ajudar você a tomar decisões com mais contexto.</p>
              </details>
              <details>
                <summary>O cadastro já significa que estou contratando uma campanha?</summary>
                <p>O botão leva você ao cadastro de cliente. A partir daí, você acessa a plataforma e conhece as próximas etapas do planejamento.</p>
              </details>
              <details>
                <summary>Quanto custa anunciar?</summary>
                <p>O investimento depende do objetivo, da região, do período e dos meios escolhidos para a campanha. O cadastro é o ponto de partida para organizar essas informações.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="campaign-lp__final-cta" aria-labelledby="final-cta-title">
          <div className="campaign-lp__final-shape campaign-lp__final-shape--one" />
          <div className="campaign-lp__final-shape campaign-lp__final-shape--two" />
          <div className="campaign-lp__shell campaign-lp__final-content">
            <p className="campaign-lp__eyebrow">COLOQUE SUA MÍDIA PARA TRABALHAR PELO SEU OBJETIVO</p>
            <h2 id="final-cta-title">Pronto para anunciar com mais clareza e buscar mais resultado?</h2>
            <p>Crie seu acesso de cliente e dê o primeiro passo para planejar sua próxima campanha.</p>
            <CampaignCta placement="final" signupUrl={signupUrl}>
              Quero anunciar onde meu cliente está
            </CampaignCta>
          </div>
        </section>
      </main>

      <footer className="campaign-lp__footer">
        <div className="campaign-lp__shell campaign-lp__footer-inner">
          <a className="campaign-lp__brand campaign-lp__brand--footer" href="https://www.ummix.com.br/" aria-label="Ummix Ads — página inicial">
            <img src="/assets/Logo%20Ummix%20ads%20-%20Branca.svg" alt="Ummix Ads" />
          </a>
          <p>Mídia offline com mais clareza para decisões que movem o negócio.</p>
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

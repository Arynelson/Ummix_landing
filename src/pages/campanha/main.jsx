import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import './campanha.css'
import { pushDataLayerEvent } from '../../services/analytics'

const SIGNUP_URL = 'https://app.ummix.com.br/signup/cliente'
const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']
const SCROLL_THRESHOLDS = [25, 50, 75, 90]
const HERO_SLIDES = [
  {
    id: 'planning',
    label: 'PLANEJAMENTO',
    step: '01 / 03',
    src: '/assets/platform-preview-campanha.png',
    alt: 'Tela de planejamento de mídia da plataforma Ummix Ads',
    footer: 'Comece com mais clareza.',
  },
  {
    id: 'dashboard',
    label: 'ACOMPANHAMENTO',
    step: '02 / 03',
    src: '/assets/platform-preview-dashboard.png',
    alt: 'Painel de acompanhamento de mídia da plataforma Ummix Ads',
    footer: 'Acompanhe o que importa.',
  },
  {
    id: 'overview',
    label: 'VISÃO DA MÍDIA',
    step: '03 / 03',
    src: '/assets/platform-preview-resumo.png',
    alt: 'Visão geral de uma ação de mídia na plataforma Ummix Ads',
    footer: 'Decida com mais contexto.',
  },
]

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

function CampaignVisualCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const slide = HERO_SLIDES[activeSlide]

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % HERO_SLIDES.length)
    }, 5600)

    return () => window.clearInterval(intervalId)
  }, [isPaused])

  function showSlide(index) {
    setActiveSlide((index + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
  }

  return (
    <div
      className="campaign-lp__visual"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Prévia da plataforma Ummix Ads"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={handleBlur}
    >
      <div className="campaign-lp__visual-glow" />
      <div className="campaign-lp__visual-card">
        <div className="campaign-lp__visual-topline" aria-live="polite">
          <span>{slide.label}</span>
          <span>{slide.step}</span>
        </div>
        <img key={slide.id} src={slide.src} alt={slide.alt} />
        <div className="campaign-lp__visual-footer">
          <span>{slide.footer}</span>
          <span aria-hidden="true">↗</span>
        </div>
        <div className="campaign-lp__visual-controls">
          <div className="campaign-lp__visual-dots" role="group" aria-label="Selecionar prévia">
            {HERO_SLIDES.map((item, index) => (
              <button
                key={item.id}
                className={'campaign-lp__visual-dot' + (index === activeSlide ? ' campaign-lp__visual-dot--active' : '')}
                type="button"
                aria-label={'Mostrar ' + item.label.toLowerCase()}
                aria-pressed={index === activeSlide}
                onClick={() => showSlide(index)}
              />
            ))}
          </div>
          <div className="campaign-lp__visual-arrows">
            <button type="button" aria-label="Imagem anterior" onClick={() => showSlide(activeSlide - 1)}>←</button>
            <button type="button" aria-label="Próxima imagem" onClick={() => showSlide(activeSlide + 1)}>→</button>
          </div>
        </div>
      </div>
      <div className="campaign-lp__floating-note">
        <span className="campaign-lp__floating-dot" />
        <span>Seu próximo passo começa aqui</span>
      </div>
    </div>
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
            <p className="campaign-lp__eyebrow">PARA VENDER MAIS E FORTALECER SUA MARCA</p>
            <h1>
              Anuncie onde seu cliente está. <span>Venda mais.</span>
            </h1>
            <p className="campaign-lp__hero-description">
              Use sua verba de publicidade para falar com o público que mais importa para o seu negócio — em rádio e TV.
            </p>
            <CampaignCta placement="hero" signupUrl={signupUrl}>
              Acessar e simular gratuitamente
            </CampaignCta>
            <p className="campaign-lp__helper">Crie seu acesso e veja o próximo passo na plataforma Ummix Ads.</p>
          </div>

          <CampaignVisualCarousel />
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
              Quando público, região e investimento não estão alinhados, fica mais difícil saber se a publicidade está trabalhando a favor do negócio. A Ummix organiza esse caminho para você decidir com mais contexto e segurança.
            </p>
            <div className="campaign-lp__simulation-callout">
              <span className="campaign-lp__simulation-badge">03<small>MIN</small></span>
              <div>
                <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">SIMULAÇÃO GRATUITA</p>
                <strong>Acesse a plataforma e simule sua publicidade em 3 minutos.</strong>
                <p>É gratuito: teste públicos e formatos antes de avançar para a contratação.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="campaign-lp__steps" id="como-funciona" aria-labelledby="steps-title">
          <div className="campaign-lp__shell">
            <div className="campaign-lp__section-heading">
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">COMO VOCÊ AVANÇA</p>
              <h2 id="steps-title">Do seu objetivo comercial a uma publicidade simples, prática e focada no público certo.</h2>
            </div>

            <div className="campaign-lp__step-grid">
              <article className="campaign-lp__step-card">
                <span className="campaign-lp__step-number">01</span>
                <div className="campaign-lp__step-icon"><span>U</span></div>
                <h3>Defina o que você quer conquistar</h3>
                <p>Venda mais, atraia clientes ou fortaleça sua marca. O objetivo dá direção para sua publicidade.</p>
              </article>
              <article className="campaign-lp__step-card campaign-lp__step-card--featured">
                <span className="campaign-lp__step-number">02</span>
                <div className="campaign-lp__step-icon"><span>→</span></div>
                <h3>Encontre quem precisa ouvir sua mensagem</h3>
                <p>Escolha público, região e investimento para comunicar com mais foco em TV e rádio.</p>
              </article>
              <article className="campaign-lp__step-card">
                <span className="campaign-lp__step-number">03</span>
                <div className="campaign-lp__step-icon"><span>✓</span></div>
                <h3>Avance quando fizer sentido</h3>
                <p>Simule possibilidades, teste formatos e siga para a contratação quando estiver seguro.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="campaign-lp__benefits" aria-labelledby="benefits-title">
          <div className="campaign-lp__shell campaign-lp__benefits-grid">
            <div className="campaign-lp__benefits-copy">
              <p className="campaign-lp__eyebrow">O QUE MUDA PARA O SEU NEGÓCIO</p>
              <h2 id="benefits-title">Fortaleça sua marca. Crie mais oportunidades de venda.</h2>
              <p>
                Direcione sua mensagem para quem importa e tome decisões de mídia com mais clareza antes de investir.
              </p>
              <CampaignCta placement="benefits" signupUrl={signupUrl}>
                Acessar e simular gratuitamente
              </CampaignCta>
            </div>

            <div className="campaign-lp__benefit-list">
              <div className="campaign-lp__benefit">
                <div className="campaign-lp__benefit-mark"><CheckIcon /></div>
                <div>
                  <h3>Invista com mais confiança</h3>
                  <p>Saiba quem você quer alcançar e onde sua mensagem pode fazer mais sentido.</p>
                </div>
              </div>
              <div className="campaign-lp__benefit">
                <div className="campaign-lp__benefit-mark"><CheckIcon /></div>
                <div>
                  <h3>Fale com o público certo</h3>
                  <p>Ajuste público e região para aumentar a relevância da sua comunicação.</p>
                </div>
              </div>
              <div className="campaign-lp__benefit">
                <div className="campaign-lp__benefit-mark"><CheckIcon /></div>
                <div>
                  <h3>Mais presença, mais oportunidades</h3>
                  <p>Construa sua marca enquanto mantém o objetivo comercial no centro da publicidade.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="campaign-lp__faq" aria-labelledby="faq-title">
          <div className="campaign-lp__shell campaign-lp__faq-grid">
            <div className="campaign-lp__faq-heading">
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">AINDA TEM DÚVIDAS?</p>
              <h2 id="faq-title">Tudo mais claro para você começar.</h2>
              <p>O cadastro é o primeiro passo para conhecer o fluxo de planejamento da Ummix Ads.</p>
            </div>

            <div className="campaign-lp__faq-list">
              <details open>
                <summary>Preciso ter um plano de mídia pronto para começar?</summary>
                <p>Não, você pode se cadastrar e simular quantas campanhas desejar, testar diferentes públicos-alvo e formatos e só depois que tiver certeza pode avançar a contratação.</p>
              </details>
              <details>
                <summary>A Ummix ajuda apenas com televisão?</summary>
                <p>A Ummix organiza sua publicidade em TV e rádio, com uma visão mais clara de público, região e investimento.</p>
              </details>
              <details>
                <summary>Como a Ummix ajuda a direcionar minha verba?</summary>
                <p>A plataforma reúne as informações necessárias para orientar o planejamento e ajudar você a tomar decisões com mais contexto.</p>
              </details>
              <details>
                <summary>O cadastro já significa que estou contratando uma campanha?</summary>
                <p>Não, você pode se cadastrar e simular quantas campanhas desejar, testar diferentes públicos-alvo e formatos e só depois que tiver certeza pode avançar a contratação.</p>
              </details>
              <details>
                <summary>Quanto custa anunciar?</summary>
                <p>O investimento depende do objetivo, do tamanho do seu público, de quantas vezes ele será impactado e dos filtros escolhidos para a campanha. Acesse nossa plataforma e faça uma simulação gratuita.</p>
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
            <p>Crie seu acesso de cliente e dê o primeiro passo para planejar sua publicidade.</p>
            <CampaignCta placement="final" signupUrl={signupUrl}>
              Acessar e simular gratuitamente
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

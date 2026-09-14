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
  const visibleSlides = HERO_SLIDES.map((item, index) => ({
    item,
    offset: (index - activeSlide + HERO_SLIDES.length) % HERO_SLIDES.length,
  }))

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % HERO_SLIDES.length)
    }, 3000)

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
      <div className="campaign-lp__visual-stack">
        {visibleSlides.map(({ item, offset }) => (
          <article
            key={item.id}
            className={'campaign-lp__visual-card campaign-lp__visual-card--offset-' + offset + (offset === 0 ? ' campaign-lp__visual-card--active' : '')}
            aria-hidden={offset === 0 ? undefined : 'true'}
          >
            <div className="campaign-lp__visual-topline" aria-live={offset === 0 ? 'polite' : undefined}>
              <span>{item.label}</span>
              <span>{item.step}</span>
            </div>
            <img src={item.src} alt={offset === 0 ? item.alt : ''} />
            <div className="campaign-lp__visual-footer">
              <span>{item.footer}</span>
              <span aria-hidden="true">↗</span>
            </div>
            {offset === 0 && (
              <div className="campaign-lp__visual-controls">
                <div className="campaign-lp__visual-dots" role="group" aria-label="Selecionar prévia">
                  {HERO_SLIDES.map((slideItem, index) => (
                    <button
                      key={slideItem.id}
                      className={'campaign-lp__visual-dot' + (index === activeSlide ? ' campaign-lp__visual-dot--active' : '')}
                      type="button"
                      aria-label={'Mostrar ' + slideItem.label.toLowerCase()}
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
            )}
          </article>
        ))}
      </div>
      <div className="campaign-lp__floating-note">
        <span className="campaign-lp__floating-dot" />
        <span>Seu próximo passo começa aqui</span>
      </div>
    </div>
  )
}

function trackCtaClick({ placement, buttonText, signupUrl }) {
  pushDataLayerEvent('button_click', {
    button_id: 'lp_campanha_' + placement + '_cta',
    button_text: buttonText,
    destination_url: signupUrl,
    page_path: window.location.pathname,
    page_type: 'lp_campanha',
    placement,
  })
}

function CampaignCta({ placement, children, signupUrl }) {
  function handleClick() {
    trackCtaClick({ placement, buttonText: children, signupUrl })
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
            <p className="campaign-lp__eyebrow">PUBLICIDADE EM RÁDIO E TV</p>
            <h1>
              Anuncie em rádio e TV com a <span>simplicidade do digital.</span>
            </h1>
            <p className="campaign-lp__hero-description">
              Planeje e ative sua publicidade em rádio e TV com a simplicidade do digital. Escolha seu objetivo, público e região em uma única plataforma orientada por dados.
            </p>
            <CampaignCta placement="hero" signupUrl={signupUrl}>
              Simular minha campanha grátis
            </CampaignCta>
            <p className="campaign-lp__helper">Crie seu acesso e simule seu plano em poucos minutos.</p>
          </div>

          <CampaignVisualCarousel />
        </div>

        <a className="campaign-lp__scroll-link" href="#como-funciona">
          <span>Veja como funciona</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="campaign-lp__proof" aria-labelledby="proof-title">
        <div className="campaign-lp__shell">
          <div className="campaign-lp__proof-heading">
            <div>
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">RESULTADOS REAIS OBSERVADOS</p>
              <h2 id="proof-title">Eficiência que aparece nos números.</h2>
            </div>
              <p>Resultados consolidados de campanhas realizadas para clientes Ummix.</p>
          </div>

          <div className="campaign-lp__proof-grid">
            <article className="campaign-lp__proof-card">
              <strong>Até 80%</strong>
              <span>menos custo por mil impressões</span>
            </article>
            <article className="campaign-lp__proof-card">
              <strong>Até 12x</strong>
              <span>mais impressões para o público-alvo com o mesmo investimento</span>
            </article>
            <article className="campaign-lp__proof-card">
              <strong>Até 90%</strong>
              <span>menos custo por lead</span>
            </article>
          </div>

          <p className="campaign-lp__proof-note">Resultados observados em campanhas realizadas. Os números variam conforme objetivo, público-alvo, região, frequência, canal e formato.</p>
        </div>
      </section>

      <main id="campaign-main">
        <section className="campaign-lp__audience" aria-labelledby="audience-title">
          <div className="campaign-lp__shell">
            <div className="campaign-lp__audience-heading">
              <div>
                <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">PARA QUEM É A UMMIX</p>
                <h2 id="audience-title">Mídia offline para quem precisa crescer e vender.</h2>
              </div>
              <p>A Ummix ajuda agências e empresas a transformar objetivos comerciais em planos de rádio e TV com mais clareza, mesmo quando o investimento é enxuto.</p>
            </div>

            <div className="campaign-lp__audience-grid">
              <article className="campaign-lp__audience-card campaign-lp__audience-card--featured">
                <span className="campaign-lp__audience-kicker">PARA AGÊNCIAS</span>
                <h3>Melhore o planejamento e entregue mais resultado aos seus clientes.</h3>
                <p>Crie planos de rádio e TV com agilidade, segmentação e clareza para apresentar decisões mais seguras.</p>
                <ul>
                  <li><CheckIcon /> Planejamento mais rápido</li>
                  <li><CheckIcon /> Público e região sob controle</li>
                  <li><CheckIcon /> Mais clareza para defender o investimento</li>
                </ul>
              </article>
              <article className="campaign-lp__audience-card">
                <span className="campaign-lp__audience-kicker">PARA PEQUENAS E MÉDIAS EMPRESAS</span>
                <h3>Fortaleça sua marca e venda mais com ações do tamanho do seu negócio.</h3>
                <p>Divulgue um produto, lance uma promoção ou aumente sua presença local com investimento controlado e público bem definido.</p>
                <ul>
                  <li><CheckIcon /> Ações pequenas com baixo investimento</li>
                  <li><CheckIcon /> Segmentação por cidade e público-alvo</li>
                  <li><CheckIcon /> Planejamento para rádio e TV</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="campaign-lp__intro" aria-labelledby="intro-title">
          <div className="campaign-lp__shell campaign-lp__intro-grid">
            <div>
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">SUA VERBA PRECISA DE DIREÇÃO</p>
              <h2 id="intro-title">Você investe para vender. Sua mídia precisa acompanhar esse objetivo.</h2>
            </div>
            <p>
              Quando público, região e investimento não estão alinhados, fica mais difícil saber se a publicidade está trabalhando a favor do negócio. A Ummix organiza esse caminho para você decidir com mais contexto e segurança.
            </p>
          </div>
        </section>

        <section className="campaign-lp__workflow" id="como-funciona" aria-labelledby="workflow-title">
          <div className="campaign-lp__shell">
            <div className="campaign-lp__workflow-heading">
              <div>
                <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">COMO FUNCIONA NA PRÁTICA</p>
                <h2 id="workflow-title">Da ideia ao plano de mídia em quatro passos.</h2>
              </div>
              <p>Escolha o objetivo, defina o público e revise sua publicidade antes de avançar.</p>
            </div>

            <div className="campaign-lp__workflow-grid">
              <article className="campaign-lp__workflow-card">
                <div className="campaign-lp__workflow-media">
                  <img src="/assets/step_by_01.png" alt="Tela para escolher o objetivo e o meio de comunicação, rádio ou TV." loading="lazy" />
                </div>
                <div className="campaign-lp__workflow-meta">
                  <span>01</span>
                  <h3>Comece pelo objetivo e pelo canal</h3>
                  <p>Defina o resultado que busca e escolha se sua publicidade será veiculada em rádio, TV ou nos dois.</p>
                </div>
              </article>
              <article className="campaign-lp__workflow-card">
                <div className="campaign-lp__workflow-media">
                  <img src="/assets/step_by_02.png" alt="Tela para escolher o formato e a duração da publicidade." loading="lazy" />
                </div>
                <div className="campaign-lp__workflow-meta">
                  <span>02</span>
                  <h3>Escolha o formato e a duração</h3>
                  <p>Defina o formato da sua propaganda e por quanto tempo ela ficará no ar.</p>
                </div>
              </article>
              <article className="campaign-lp__workflow-card">
                <div className="campaign-lp__workflow-media">
                  <img src="/assets/step_by_03.png" alt="Tela para escolher a cidade, o público-alvo e o tamanho da ação." loading="lazy" />
                </div>
                <div className="campaign-lp__workflow-meta">
                  <span>03</span>
                  <h3>Encontre o público e dimensione</h3>
                  <p>Escolha a cidade, o público-alvo e o tamanho da ação de acordo com seu objetivo e investimento.</p>
                </div>
              </article>
              <article className="campaign-lp__workflow-card">
                <div className="campaign-lp__workflow-media">
                  <img src="/assets/step_by_04.png" alt="Tela com o resumo da publicidade para aprovação." loading="lazy" />
                </div>
                <div className="campaign-lp__workflow-meta">
                  <span>04</span>
                  <h3>Revise antes de aprovar</h3>
                  <p>Confira o resumo da publicidade, ajuste o que precisar e avance com mais segurança.</p>
                </div>
              </article>
            </div>

            <div className="campaign-lp__workflow-cta">
              <p><strong>Planeje sua publicidade em poucos minutos.</strong> Comece grátis e descubra como rádio e TV podem trabalhar para o seu negócio.</p>
              <CampaignCta placement="workflow" signupUrl={signupUrl}>
                Simular minha campanha grátis
              </CampaignCta>
            </div>
          </div>
        </section>

        <section className="campaign-lp__steps" id="como-avanca" aria-labelledby="steps-title">
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
              <p className="campaign-lp__eyebrow">PUBLICIDADE NÃO PRECISA SER COMPLICADA</p>
              <h2 id="benefits-title">Transforme mídia em demanda para o seu negócio.</h2>
              <p>
                Use rádio, TV e mídia offline para ampliar alcance, gerar lembrança e criar novas oportunidades comerciais.
              </p>
              <div className="campaign-lp__benefit-list">
                <div className="campaign-lp__benefit">
                  <h3>Escolha o canal com mais critério</h3>
                  <p>Compare rádio, TV e mídia offline de acordo com seu objetivo, público e região.</p>
                </div>
                <div className="campaign-lp__benefit">
                  <h3>Planeje a cobertura antes de investir</h3>
                  <p>Entenda onde sua mensagem pode chegar e reduza decisões baseadas apenas em percepção.</p>
                </div>
                <div className="campaign-lp__benefit">
                  <h3>Tenha clareza sobre o investimento</h3>
                  <p>A plataforma guia os primeiros passos para você montar um plano inicial em poucos minutos e ajustar suas escolhas antes de contratar.</p>
                </div>
              </div>
            </div>

            <div className="campaign-lp__practical-panel">
              <p className="campaign-lp__eyebrow">NA PRÁTICA</p>
              <div className="campaign-lp__practical-list">
                <div className="campaign-lp__practical-card">
                  <span className="campaign-lp__practical-number">1</span>
                  <div>
                    <h3>Objetivo comercial</h3>
                    <p>Vendas, marca, lançamento ou tráfego</p>
                  </div>
                  <CheckIcon />
                </div>
                <div className="campaign-lp__practical-card">
                  <span className="campaign-lp__practical-number">2</span>
                  <div>
                    <h3>Público e região</h3>
                    <p>Quem você quer atingir e onde</p>
                  </div>
                  <CheckIcon />
                </div>
                <div className="campaign-lp__practical-card">
                  <span className="campaign-lp__practical-number">3</span>
                  <div>
                    <h3>Plano inicial</h3>
                    <p>Oportunidades organizadas para avançar</p>
                  </div>
                  <CheckIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="campaign-lp__shell campaign-lp__benefits-cta">
            <div>
              <p className="campaign-lp__eyebrow">COMECE COM MAIS CLAREZA</p>
              <p>Veja quanto pode investir, quem alcançar e quais formatos fazem sentido para o seu objetivo.</p>
            </div>
            <CampaignCta placement="benefits" signupUrl={signupUrl}>
              Simular minha campanha grátis
            </CampaignCta>
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
              Simular minha campanha grátis
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

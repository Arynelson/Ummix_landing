import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import './campanha.css'
import { CAMPAIGN_LEAD_FORM_ENDPOINT } from '../../constants/urls'
import { pushDataLayerEvent } from '../../services/analytics'
import { submitForm } from '../../services/formSubmit'

const LEAD_FORM_ANCHOR = '#cadastro-lead'
const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_matchtype',
  'utm_network',
  'utm_device',
  'gclid',
  'fbclid',
]
const SCROLL_THRESHOLDS = [25, 50, 75, 90]
const INITIAL_LEAD_FORM = {
  name: '',
  email: '',
  phone: '',
  already_advertised_radio_tv: '',
}
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

function getAttributionParameters() {
  if (typeof window === 'undefined') return {}

  const sourceParams = new URLSearchParams(window.location.search)

  return ATTRIBUTION_KEYS.reduce((parameters, key) => {
    const value = sourceParams.get(key)
    if (value) parameters[key] = value
    return parameters
  }, {})
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

function trackCtaClick({ placement, buttonText }) {
  pushDataLayerEvent('button_click', {
    button_id: 'lp_campanha_' + placement + '_cta',
    button_text: buttonText,
    destination_url: window.location.pathname + LEAD_FORM_ANCHOR,
    page_path: window.location.pathname,
    page_type: 'lp_campanha',
    placement,
  })
}

function CampaignCta({ placement, children }) {
  function handleClick() {
    trackCtaClick({ placement, buttonText: children })
  }

  return (
    <a
      className="campaign-lp__cta campaign-lp__cta--primary"
      href={LEAD_FORM_ANCHOR}
      data-analytics-id={'lp_campanha_' + placement + '_cta'}
      onClick={handleClick}
    >
      <span>{children}</span>
      <ArrowIcon />
    </a>
  )
}

function CampaignLeadForm() {
  const [form, setForm] = useState(INITIAL_LEAD_FORM)
  const [status, setStatus] = useState('idle')

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')

    try {
      const attribution = getAttributionParameters()

      await submitForm({
        ...form,
        ...attribution,
        _subject: 'Novo lead da landing page de campanha',
        _template: 'table',
        _captcha: 'false',
      }, CAMPAIGN_LEAD_FORM_ENDPOINT)

      pushDataLayerEvent('ummix_lead_submitted', {
        ...attribution,
        form_name: 'campaign_lead',
        page_path: window.location.pathname,
        page_type: 'lp_campanha',
      })
      setStatus('success')
      setForm(INITIAL_LEAD_FORM)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="campaign-lp__lead-capture" id="cadastro-lead" aria-labelledby="lead-capture-title">
      <div className="campaign-lp__shell campaign-lp__lead-grid">
        <div className="campaign-lp__lead-heading">
          <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">FALE COM A UMMIX</p>
          <h2 id="lead-capture-title">Vamos encontrar o melhor caminho para sua publicidade.</h2>
          <p>Deixe seus dados e conte se você já anunciou em rádio e TV. Nossa equipe entende seu momento e orienta os próximos passos.</p>
        </div>

        <div className="campaign-lp__lead-form-card">
          {status === 'success' ? (
            <div className="campaign-lp__lead-success" role="status" aria-live="polite">
              <span className="campaign-lp__lead-success-icon"><CheckIcon /></span>
              <h3>Recebemos seus dados.</h3>
              <p>Obrigado pelo interesse. A equipe da Ummix entrará em contato em breve.</p>
            </div>
          ) : (
            <form className="campaign-lp__lead-form" onSubmit={handleSubmit}>
              <div className="campaign-lp__lead-fields">
                <div className="campaign-lp__lead-field">
                  <label htmlFor="campaign-lead-name">Nome</label>
                  <input id="campaign-lead-name" name="name" value={form.name} onChange={updateField} autoComplete="name" required />
                </div>
                <div className="campaign-lp__lead-field">
                  <label htmlFor="campaign-lead-email">E-mail</label>
                  <input id="campaign-lead-email" name="email" value={form.email} onChange={updateField} type="email" autoComplete="email" required />
                </div>
                <div className="campaign-lp__lead-field">
                  <label htmlFor="campaign-lead-phone">Telefone</label>
                  <input id="campaign-lead-phone" name="phone" value={form.phone} onChange={updateField} type="tel" autoComplete="tel" required />
                </div>
                <div className="campaign-lp__lead-field">
                  <label htmlFor="campaign-lead-advertised">Você já anunciou em rádio e TV?</label>
                  <select id="campaign-lead-advertised" name="already_advertised_radio_tv" value={form.already_advertised_radio_tv} onChange={updateField} required>
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </div>

              {status === 'error' && (
                <p className="campaign-lp__lead-status campaign-lp__lead-status--error" role="alert">
                  Não foi possível enviar seus dados agora. Tente novamente em instantes.
                </p>
              )}

              <button className="campaign-lp__lead-submit" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Enviando seus dados...' : 'Quero falar com a Ummix'}
                <ArrowIcon />
              </button>
              <p className="campaign-lp__lead-note">Seus dados serão usados apenas para este contato.</p>
            </form>
          )}
        </div>
      </div>
    </section>
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
            <CampaignCta placement="hero">
              Quero planejar minha publicidade
            </CampaignCta>
            <p className="campaign-lp__helper">Deixe seus dados e receba orientação para anunciar em rádio e TV.</p>
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
              <p><strong>Planeje sua publicidade com mais clareza.</strong> Conte seu objetivo e descubra como rádio e TV podem trabalhar para o seu negócio.</p>
              <CampaignCta placement="workflow">
                Quero planejar minha publicidade
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
               <p>Conte seu objetivo, sua região e o público que deseja alcançar. A Ummix ajuda a definir o próximo passo.</p>
            </div>
            <CampaignCta placement="benefits">
              Quero planejar minha publicidade
            </CampaignCta>
          </div>
        </section>

        <section className="campaign-lp__faq" aria-labelledby="faq-title">
          <div className="campaign-lp__shell campaign-lp__faq-grid">
            <div className="campaign-lp__faq-heading">
              <p className="campaign-lp__eyebrow campaign-lp__eyebrow--dark">AINDA TEM DÚVIDAS?</p>
              <h2 id="faq-title">Tudo mais claro para você começar.</h2>
               <p>O formulário é o primeiro passo para conhecer as possibilidades de planejamento da Ummix Ads.</p>
            </div>

            <div className="campaign-lp__faq-list">
              <details open>
                <summary>Preciso ter um plano de mídia pronto para começar?</summary>
                <p>Não. Você pode conversar com a Ummix, entender as possibilidades e só avançar quando fizer sentido para o seu negócio.</p>
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
                <p>Não. O formulário é apenas o primeiro contato. Você pode avaliar diferentes públicos e formatos e só avançar quando tiver certeza.</p>
              </details>
              <details>
                <summary>Quanto custa anunciar?</summary>
                <p>O investimento depende do objetivo, do tamanho do seu público, da frequência de impacto e dos filtros escolhidos. Fale com a Ummix para entender as possibilidades para o seu negócio.</p>
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
            <p>Deixe seus dados e dê o primeiro passo para planejar sua publicidade em rádio e TV.</p>
            <CampaignCta placement="final">
              Quero planejar minha publicidade
            </CampaignCta>
          </div>
        </section>

        <CampaignLeadForm />
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

import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Star, TrendingUp, UserCheck } from 'lucide-react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Button, Input, Toast } from '../../ds/components'
import { CONTACT_EMAIL } from '../../constants/urls'
import { submitForm as sendForm } from '../../services/formSubmit'
import { pushDataLayerEvent } from '../../services/analytics'
import { useLocale } from '../../LocaleProvider.jsx'
import { LABELS } from '../../i18n-labels.js'
import { PARTNER_COPY } from '../../partner-copy.js'

const ICON_PROPS = { strokeWidth: 1.75, 'aria-hidden': true }
const KICKER = 'font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand'

/* ---- Hero ---- */
function Eyebrow() {
  const { locale } = useLocale()
  const copy = PARTNER_COPY[locale]
  return (
    <span className={`inline-flex items-center gap-2 mb-7 ${KICKER}`}>
      <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
      {copy.eyebrow}
    </span>
  )
}

function HeroCTAs() {
  const { locale } = useLocale()
  const copy = PARTNER_COPY[locale]
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Button
        href="#candidatura"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        iconRight={<ArrowRight size={16} {...ICON_PROPS} />}
      >
        {copy.apply}
      </Button>
      <Button href="#parceiros" variant="secondary" size="lg" className="w-full sm:w-auto">
        {copy.meetPartners}
      </Button>
    </div>
  )
}

function KpiPanel() {
  const { locale } = useLocale()
  const copy = PARTNER_COPY[locale]
  const kpis = [
    { value: copy.kpis[0][0], label: copy.kpis[0][1], icon: TrendingUp },
    { value: copy.kpis[1][0], label: copy.kpis[1][1], highlight: true, icon: UserCheck },
    { value: copy.kpis[2][0], label: copy.kpis[2][1], icon: Star },
  ]
  return (
    <div className="grid gap-3">
      {kpis.map((k, i) => {
        const Icon = k.icon
        return (
          <div key={i} className="flex items-center gap-4 rounded-[var(--radius-xl)] border border-line bg-raised p-5 text-strong sm:p-6">
            <div className="w-11 h-11 rounded-[var(--radius-lg)] bg-accent-soft text-brand flex items-center justify-center shrink-0">
              <Icon size={22} {...ICON_PROPS} />
            </div>
            <div>
              <div className={`font-mono text-[22px] font-semibold leading-none tracking-tight sm:text-[26px] ${k.highlight ? 'text-brand' : 'text-strong'}`}>{k.value}</div>
              <div className="text-[13px] text-muted mt-1">{k.label}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Hero() {
  const { locale } = useLocale()
  const copy = PARTNER_COPY[locale]
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-ink-900 text-strong">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-36 md:pb-24 md:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Eyebrow />
          <h1 className="font-display font-extrabold text-[clamp(40px,5.4vw,68px)] leading-none tracking-tight text-balance text-strong mb-6">
            {copy.heroTitle}{' '}
            <em className="not-italic text-brand">{copy.heroAccent}</em>.
          </h1>
          <p className="copy-justify max-w-[560px] text-[18px] leading-relaxed text-body sm:text-[19px]">
            {copy.heroDescription}
          </p>
          <HeroCTAs />
        </div>
        <KpiPanel />
      </div>
    </section>
  )
}

/* ---- Audience paths ---- */
function AudiencePaths() {
  const { locale } = useLocale()
  const copy = PARTNER_COPY[locale]

  return (
    <section id="caminhos" aria-labelledby="partner-paths-title" className="scroll-mt-28 bg-page py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p className={`mb-3 ${KICKER}`}>{copy.pathsKicker}</p>
          <h2 id="partner-paths-title" className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.02] tracking-tight text-strong text-balance">
            {copy.pathsTitle}
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-body md:text-lg">
            {copy.pathsDescription}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <a href="#candidatura" data-theme="dark" className="group relative flex min-h-64 flex-col overflow-hidden rounded-[var(--radius-xl)] bg-ink-900 p-7 text-strong transition-transform duration-300 hover:-translate-y-1 md:p-9">
            <p className={`relative ${KICKER}`}>{copy.pathJoinEyebrow}</p>
            <h3 className="relative mt-4 font-display text-3xl font-extrabold tracking-tight text-strong md:text-4xl">{copy.pathJoinTitle}</h3>
            <p className="relative mt-3 max-w-md text-base leading-relaxed text-body">{copy.pathJoinDescription}</p>
            <span className="relative mt-auto inline-flex min-h-11 items-center gap-2 pt-8 text-sm font-bold text-strong transition-colors group-hover:text-brand">
              {copy.pathJoinCta}
              <ArrowRight size={16} {...ICON_PROPS} />
            </span>
          </a>

          <a href="#parceiros" className="group relative flex min-h-64 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line-subtle bg-sunken p-7 text-strong transition-transform duration-300 hover:-translate-y-1 hover:border-red-300 md:p-9">
            <p className={`relative ${KICKER}`}>{copy.pathFindEyebrow}</p>
            <h3 className="relative mt-4 font-display text-3xl font-extrabold tracking-tight text-strong md:text-4xl">{copy.pathFindTitle}</h3>
            <p className="relative mt-3 max-w-md text-base leading-relaxed text-body">{copy.pathFindDescription}</p>
            <span className="relative mt-auto inline-flex min-h-11 items-center gap-2 pt-8 text-sm font-bold text-strong transition-colors group-hover:text-brand">
              {copy.pathFindCta}
              <ArrowRight size={16} {...ICON_PROPS} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ---- Process ---- */
const PROCESS = [
  { t: 'Candidatura', d: 'Você preenche o formulário de interesse e nosso time avalia o perfil da sua empresa.' },
  { t: 'Onboarding', d: 'Apresentamos a plataforma, o método Ummix e as condições comerciais da parceria.' },
  { t: 'Ativação', d: 'Sua empresa ganha acesso à base de veículos e começa a montar campanhas para os clientes.' },
  { t: 'Crescimento', d: 'Você acompanha resultados em tempo real e amplia a operação com nosso suporte contínuo.' },
]

function Process() {
  const { locale } = useLocale()
  const copy = PARTNER_COPY[locale]
  return (
    <section id="processo" className="scroll-mt-28 bg-sunken py-18 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center md:mb-12">
          <span className={`inline-block mb-3 ${KICKER}`}>{copy.processKicker}</span>
          <h2 className="font-display font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-strong text-balance mb-4">
            {copy.processTitle}
          </h2>
          <p className="mx-auto max-w-xl text-center text-lg text-body text-pretty [hyphens:none]">
            {copy.processDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((s, i) => (
            <div
              key={i}
              className="group relative rounded-[var(--radius-xl)] border border-line-subtle bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[var(--shadow-md)] md:p-8"
            >
              <div className={`w-11 h-11 rounded-[var(--radius-lg)] flex items-center justify-center font-mono font-semibold text-lg mb-6 transition-colors duration-300 ${i === 0 ? 'bg-accent text-on-accent' : 'bg-accent-soft text-brand group-hover:bg-accent group-hover:text-on-accent'}`}>
                {i + 1}
              </div>
              <h3 className="font-display font-bold text-[19px] tracking-tight text-strong mb-2">{copy.process[i][0]}</h3>
              <p className="text-sm leading-relaxed text-body">{copy.process[i][1]}</p>
              {i < PROCESS.length - 1 && (
                <span className="hidden lg:block absolute top-14 -right-3 z-10 text-red-300" aria-hidden="true">
                  <ArrowRight size={24} strokeWidth={1.75} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Partners grid ---- */
const PARTNERS = [
  {
    id: 'opis',
    mark: 'OP!S',
    name: 'OP!S Publicidade',
    links: [
      { label: 'opisagencia.com.br', href: 'https://opisagencia.com.br/', external: true },
      { label: '@opispublicidade', href: 'https://www.instagram.com/opispublicidade/', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/opisagencia/', external: true },
    ],
  },
  {
    id: 'oqi',
    mark: 'OQI',
    name: 'OQI',
    links: [
      { label: 'agenciaoqi.com', href: 'https://agenciaoqi.com/', external: true },
      { label: '@agenciaoqi', href: 'https://www.instagram.com/agenciaoqi/', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/oqi-ag%C3%AAncia-que-cria-impacto-positivo/', external: true },
    ],
  },
  {
    id: 'nurion',
    mark: 'NUR',
    name: 'Nurion',
    links: [
      { label: 'nurionhubcrm.vercel.app', href: 'https://nurionhubcrm.vercel.app/', external: true },
      { label: '@nurionhub', href: 'https://www.instagram.com/nurionhub/', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cris-roiz-consultoria-de-neg-cios-e-log-stica-para-sa-de/', external: true },
    ],
  },
]

function PartnersGrid() {
  const { locale } = useLocale()
  const copy = PARTNER_COPY[locale]
  return (
    <section id="parceiros" aria-labelledby="partners-title" className="scroll-mt-28 bg-page py-18 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center md:mb-12">
          <span className={`inline-block mb-3 ${KICKER}`}>{copy.partnersKicker}</span>
          <h2 id="partners-title" className="font-display font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-strong text-balance mb-4">
            {copy.partnersTitle}
          </h2>
          <p className="mx-auto max-w-xl text-center text-lg text-body text-pretty [hyphens:none]">
            {copy.partnersDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner) => (
            <article
              key={partner.id}
              className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line-subtle bg-sunken p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[var(--shadow-md)] sm:p-7 md:p-8"
            >
              <div className="relative flex items-start gap-5">
                <div data-theme="dark" className="grid h-18 w-18 shrink-0 place-items-center rounded-[var(--radius-lg)] bg-ink-900 font-display text-xl font-extrabold tracking-tight text-strong">
                  {partner.mark}
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand">
                    {copy.partnerLabel}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-strong">
                    {partner.name}
                  </h3>
                </div>
              </div>

              <div className="relative mt-7 border-t border-line-subtle pt-6">
                <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted">{copy.partnerContactLabel}</p>
                <div className="flex flex-wrap gap-2.5">
                  {partner.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-[var(--radius-md)] border border-line bg-card px-4 py-2 font-sans text-xs font-bold text-strong transition-colors hover:border-red-300 hover:text-brand"
                    >
                      <span className="break-all">{link.label}</span>
                      <ArrowUpRight className="shrink-0" size={13} {...ICON_PROPS} />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-[var(--radius-xl)] border border-red-200 bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl">
            <p className={KICKER}>{copy.partnerFallbackKicker}</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-strong md:text-3xl">{copy.partnerFallbackTitle}</h3>
            <p className="mt-3 text-base leading-relaxed text-body">{copy.partnerFallbackDescription}</p>
          </div>
          <Button
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(copy.partnerFallbackSubject)}`}
            variant="primary"
            size="lg"
            className="shrink-0"
            iconRight={<ArrowRight size={16} {...ICON_PROPS} />}
          >
            {copy.partnerFallbackCta}
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ---- Form ---- */
const FORM_FIELDS = [
  { id: 'partner-nome', name: 'nome', type: 'text', autoComplete: 'name' },
  { id: 'partner-email', name: 'email', type: 'email', autoComplete: 'email' },
  { id: 'partner-empresa', name: 'empresa', type: 'text', autoComplete: 'organization' },
  { id: 'partner-telefone', name: 'telefone', type: 'tel', autoComplete: 'tel' },
]

function PartnerForm() {
  const { locale } = useLocale()
  const copy = PARTNER_COPY[locale]
  const [status, setStatus] = useState('idle')

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    try {
      await sendForm({
        nome: formData.get('nome'),
        email: formData.get('email'),
        empresa: formData.get('empresa'),
        telefone: formData.get('telefone'),
        _form_type: 'partner',
      })

      pushDataLayerEvent('ummix_lead_submitted', {
        form_name: 'partner',
        page_type: 'partner',
        language: locale === 'pt' ? 'pt-BR' : locale,
      })
      formElement.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="candidatura" className="scroll-mt-28 bg-sunken py-18 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div data-theme="dark" className="relative mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-10 overflow-hidden rounded-[var(--radius-xl)] bg-ink-900 p-6 text-strong sm:p-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:p-14">
          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-[clamp(28px,3.4vw,40px)] tracking-tight leading-tight text-strong text-balance mb-4">
              {copy.formTitle}
            </h2>
            <p className="mb-6 text-left text-base leading-relaxed text-body [hyphens:none]">
              {copy.formDescription}
            </p>
            <div className="grid gap-3">
              {copy.benefits.map(b => (
                <div key={b} className="flex items-start gap-3 text-sm text-body">
                  <Check className="text-brand shrink-0 mt-0.5" size={18} {...ICON_PROPS} />
                  {b}
                </div>
              ))}
            </div>
          </div>

          {status !== 'success' ? (
            <form className="relative z-10 grid gap-4" onSubmit={onSubmit}>
              {copy.fields.map(([label, placeholder], index) => {
                const f = { ...FORM_FIELDS[index], label, placeholder }
                return (
                  <Input
                    key={f.id}
                    id={f.id}
                    name={f.name}
                    type={f.type}
                    label={f.label}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    required
                  />
                )
              })}
              {status === 'error' && (
                <div role="alert" className="rounded-[var(--radius-lg)] border border-line">
                  <Toast tone="danger" message={copy.error} />
                </div>
              )}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={status === 'submitting'}
                className="mt-2"
                iconRight={<ArrowRight size={16} {...ICON_PROPS} />}
              >
                {status === 'submitting' ? copy.submitting : copy.submit}
              </Button>
            </form>
          ) : (
            <div className="relative z-10 flex justify-center py-8">
              <div className="w-full max-w-[360px] rounded-[var(--radius-lg)] border border-line">
                <Toast tone="success" title={copy.successTitle} message={copy.successDescription} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function PartnerPage() {
  const { locale } = useLocale()
  const labels = LABELS[locale]
  return (
    <>
      <Header active="/partner" />
      <a className="skip-link" href="#main-content">{labels.skipToContent}</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <AudiencePaths />
        <Process />
        <PartnersGrid />
        <PartnerForm />
      </main>
      <Footer />
    </>
  )
}

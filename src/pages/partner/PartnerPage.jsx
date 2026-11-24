import { useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, MessageCircle, Search, Star, TrendingUp, UserCheck, X } from 'lucide-react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Button, Input, Toast } from '../../ds/components'
import { CONTACT_EMAIL } from '../../constants/urls'
import { submitForm as sendForm } from '../../services/formSubmit'
import { pushDataLayerEvent } from '../../services/analytics'
import { useLocale } from '../../LocaleProvider.jsx'
import { LABELS } from '../../i18n-labels.js'
import { PARTNER_COPY } from '../../partner-copy.js'
import { formatPhone, linkLabel, normalizeText, partnerInitials, phoneDigits, uniqueSorted, usePartners } from './partners-data.js'

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
function PartnerLogo({ partner }) {
  const [failed, setFailed] = useState(false)
  const dark = partner.logoBg !== 'light'
  const showImage = partner.logo && !failed
  return (
    <div
      data-theme={dark ? 'dark' : undefined}
      className={`grid aspect-[16/9] w-full place-items-center rounded-[var(--radius-lg)] p-8 ${dark ? 'bg-ink-900' : 'border border-line-subtle bg-white'}`}
    >
      {showImage ? (
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-h-24 w-auto max-w-[75%] object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-display text-4xl font-extrabold tracking-tight text-strong" aria-hidden="true">
          {partnerInitials(partner.name)}
        </span>
      )}
    </div>
  )
}

function PartnerCard({ partner, copy }) {
  const links = [
    partner.site && { kind: 'site', href: partner.site },
    partner.instagram && { kind: 'instagram', href: partner.instagram },
    partner.linkedin && { kind: 'linkedin', href: partner.linkedin },
  ].filter(Boolean)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line-subtle bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[var(--shadow-md)] sm:p-5">
      <PartnerLogo partner={partner} />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand">
          {partner.type || copy.partnerLabel}
        </span>
        <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-strong">{partner.name}</h3>
        {partner.cities?.length > 0 && (
          <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-body">
            <MapPin className="mt-0.5 shrink-0 text-muted" size={15} {...ICON_PROPS} />
            <span>{partner.cities.join(' · ')}</span>
          </p>
        )}
        {(partner.phone || partner.email) && (
          <div className="mt-5 grid gap-2">
            {partner.phone && (
              <a
                href={`https://wa.me/${phoneDigits(partner.phone)}?text=${encodeURIComponent(copy.partnerWhatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 rounded-[var(--radius-md)] bg-[var(--accent)] px-4 py-2 font-sans text-sm font-bold text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                <MessageCircle className="shrink-0" size={16} {...ICON_PROPS} />
                <span>{copy.partnerWhatsapp} · {formatPhone(partner.phone)}</span>
              </a>
            )}
            {partner.email && (
              <a
                href={`mailto:${partner.email}?subject=${encodeURIComponent(copy.partnerEmailSubject)}`}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-[var(--radius-md)] border border-line bg-card px-4 py-2 font-sans text-sm font-bold text-strong transition-colors hover:border-red-300 hover:text-brand"
              >
                <Mail className="shrink-0" size={16} {...ICON_PROPS} />
                <span className="break-all">{partner.email}</span>
              </a>
            )}
          </div>
        )}
        <div className="mt-auto pt-5">
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 max-w-full items-center gap-2 rounded-[var(--radius-md)] border border-line bg-sunken px-3.5 py-2 font-sans text-xs font-bold text-strong transition-colors hover:border-red-300 hover:text-brand"
                >
                  <span className="break-all">{linkLabel(link.kind, link.href)}</span>
                  <ArrowUpRight className="shrink-0" size={13} {...ICON_PROPS} />
                </a>
              ))}
            </div>
          ) : !partner.phone && !partner.email && (
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${copy.partnerViaUmmixSubject} ${partner.name}`)}`}
              className="inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-md)] border border-line bg-sunken px-3.5 py-2 font-sans text-xs font-bold text-strong transition-colors hover:border-red-300 hover:text-brand"
            >
              {copy.partnerViaUmmix}
              <ArrowUpRight className="shrink-0" size={13} {...ICON_PROPS} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function PartnersGrid() {
  const { locale } = useLocale()
  const copy = PARTNER_COPY[locale]
  const partners = usePartners()
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const cities = useMemo(() => uniqueSorted(partners.flatMap((partner) => partner.cities || [])), [partners])
  const types = useMemo(() => uniqueSorted(partners.map((partner) => partner.type)), [partners])
  const filtered = useMemo(() => {
    const term = normalizeText(query.trim())
    return partners.filter((partner) =>
      (!city || partner.cities?.includes(city)) &&
      (!type || partner.type === type) &&
      (!term || normalizeText(`${partner.name} ${partner.type} ${(partner.cities || []).join(' ')}`).includes(term)),
    )
  }, [partners, query, city, type])
  const hasFilter = Boolean(query || city || type)
  const clearFilters = () => {
    setQuery('')
    setCity('')
    setType('')
  }
  const fieldClass = 'min-h-11 w-full rounded-[var(--radius-md)] border border-line bg-page px-3 font-sans text-sm text-strong focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200'
  const labelClass = 'font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted'
  return (
    <section id="parceiros" aria-labelledby="partners-title" className="scroll-mt-28 bg-sunken py-18 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className={`inline-block mb-3 ${KICKER}`}>{copy.partnersKicker}</span>
            <h2 id="partners-title" className="font-display font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-strong text-balance mb-4">
              {copy.partnersTitle}
            </h2>
            <p className="copy-justify text-lg text-body">{copy.partnersDescription}</p>
          </div>
          <div className="shrink-0 rounded-[var(--radius-xl)] border border-line bg-card px-6 py-4 text-center">
            <div className="font-mono text-4xl font-semibold leading-none text-brand">{partners.length}</div>
            <div className="mt-1 text-[13px] text-muted">{copy.partnersCountLabel}</div>
          </div>
        </div>

        <div role="search" className="mb-6 grid gap-3 rounded-[var(--radius-xl)] border border-line-subtle bg-card p-4 sm:p-5 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
          <label className="grid gap-1.5">
            <span className={labelClass}>{copy.filterSearch}</span>
            <span className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} {...ICON_PROPS} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.filterSearchPlaceholder}
                className={`${fieldClass} pl-9`}
              />
            </span>
          </label>
          <label className="grid gap-1.5">
            <span className={labelClass}>{copy.filterCity}</span>
            <select value={city} onChange={(event) => setCity(event.target.value)} className={fieldClass}>
              <option value="">{copy.filterAllCities}</option>
              {cities.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className={labelClass}>{copy.filterType}</span>
            <select value={type} onChange={(event) => setType(event.target.value)} className={fieldClass}>
              <option value="">{copy.filterAllTypes}</option>
              {types.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilter}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-line px-4 font-sans text-sm font-bold text-strong transition-colors hover:border-red-300 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X size={15} {...ICON_PROPS} />
            {copy.filterClear}
          </button>
        </div>

        <p className="mb-5 text-sm text-muted" aria-live="polite">
          {filtered.length === 1 ? copy.filterResultOne : copy.filterResultMany.replace('{n}', String(filtered.length))}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} copy={copy} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-xl)] border border-dashed border-line bg-card p-10 text-center">
            <p className="font-display text-xl font-extrabold text-strong">{copy.filterEmptyTitle}</p>
            <p className="mt-2 text-body">{copy.filterEmptyDescription}</p>
          </div>
        )}

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
        <PartnersGrid />
        <AudiencePaths />
        <Process />
        <PartnerForm />
      </main>
      <Footer />
    </>
  )
}

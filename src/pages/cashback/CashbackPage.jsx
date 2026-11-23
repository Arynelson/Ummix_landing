import { ArrowDownToLine, ArrowRight, Briefcase, Building2, CreditCard, FileText, UserPlus, Wallet } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Button } from '../../ds/components'
import { PLATFORM_SIGNUP } from '../../constants/urls'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'
import { useLocale } from '../../LocaleProvider.jsx'
import { LABELS } from '../../i18n-labels.js'
import { CASHBACK_COPY } from '../../cashback-copy.js'

const ICON_PROPS = { strokeWidth: 1.75, 'aria-hidden': true }

/* ---- Hero ---- */
function Eyebrow() {
  const { locale } = useLocale()
  const copy = CASHBACK_COPY[locale]
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] uppercase text-brand mb-7">
      <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
      {copy.eyebrow}
    </span>
  )
}

function HeroCTAs() {
  const { locale } = useLocale()
  const copy = CASHBACK_COPY[locale]
  return (
    <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
      <Button
        href={PLATFORM_SIGNUP}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        iconRight={<ArrowRight size={16} {...ICON_PROPS} />}
      >
        <span className="sm:hidden">{copy.platformShort}</span>
        <span className="hidden sm:inline">{copy.platformLong}</span>
      </Button>
      <Button href="#como-funciona" variant="secondary" size="lg" className="w-full sm:w-auto">
        {copy.howItWorks}
      </Button>
    </div>
  )
}

function Hero() {
  const { locale } = useLocale()
  const copy = CASHBACK_COPY[locale]
  const anim = useAnimateOnScroll()

  return (
    <section data-theme="dark" className="relative overflow-hidden bg-ink-900 text-strong">
      <div ref={anim.ref} style={anim.style} className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 pb-20 pt-36 text-center md:pb-24 md:pt-40">
        <Eyebrow />
        <h1 className="font-display font-extrabold text-[clamp(40px,5.4vw,68px)] leading-none tracking-tight text-balance text-strong mb-6">
          {copy.heroTitle} <em className="not-italic text-brand">{copy.heroAccent}</em>.
        </h1>
        <p className="section-subtitle max-w-[560px] text-[18px] leading-relaxed text-body sm:text-[19px]">
          {copy.heroDescription}
        </p>
        <HeroCTAs />
      </div>
    </section>
  )
}

/* ---- Who is eligible ---- */
const PARTICIPANTS = [
  {
    t: 'Contratante',
    d: 'O anunciante que realiza a contratação da campanha diretamente.',
    icon: <Building2 size={24} {...ICON_PROPS} />,
  },
  {
    t: 'Mídia',
    d: 'O veículo que assina o PI, quando aplicável à negociação.',
    icon: <img src="/assets/ds/icones-pixel/torre.svg" alt="" aria-hidden="true" width="28" height="28" />,
  },
  {
    t: 'Agência / Agência Digital / Gestor de Tráfego',
    d: 'Gestor ou intermediador responsável pela contratação.',
    icon: <Briefcase size={24} {...ICON_PROPS} />,
  },
]

function WhoIsEligible() {
  const { locale } = useLocale()
  const copy = CASHBACK_COPY[locale]
  const anim = useAnimateOnScroll()

  return (
    <section className="bg-page py-18 md:py-24">
      <div ref={anim.ref} style={anim.style} className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-center md:mb-12">
          <span className="inline-block font-mono text-xs font-medium tracking-[0.08em] uppercase text-brand mb-3">{copy.eligibility}</span>
          <h2 className="font-display font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-strong text-balance mb-4">
            {copy.eligibilityTitle}
          </h2>
          <p className="section-subtitle text-lg text-body">
            {copy.eligibilityDescription}
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PARTICIPANTS.map((p, index) => (
            <div key={p.t} className="rounded-[var(--radius-xl)] border border-line-subtle bg-card p-6 transition-colors hover:bg-sunken md:p-8">
              <div className="w-13 h-13 rounded-[var(--radius-lg)] bg-accent-soft text-brand flex items-center justify-center mb-5">
                {p.icon}
              </div>
              <h3 className="font-display font-bold text-[19px] tracking-tight text-strong mb-2">{copy.participants[index][0]}</h3>
              <p className="text-sm leading-relaxed text-body">{copy.participants[index][1]}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-brand text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                {copy.eachCashback}
              </div>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div className="mx-auto max-w-3xl rounded-[var(--radius-xl)] border border-line-subtle bg-sunken p-6 sm:p-8 md:p-10">
          <h3 className="font-display font-bold text-xl tracking-tight text-strong mb-6">{copy.rulesTitle}</h3>
          <ul className="space-y-4">
            {copy.rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-accent-soft text-brand font-mono text-xs font-medium flex items-center justify-center shrink-0">{i + 1}</span>
                <p className="text-sm leading-relaxed text-body">{rule}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---- How it works ---- */
const STEPS = [
  {
    n: '01', t: 'Cadastro',
    d: 'O participante realiza seu cadastro na Plataforma de Cashback da Ummix Ads.',
    icon: UserPlus,
  },
  {
    n: '02', t: 'Pagamento do contrato',
    d: 'Após a confirmação do pagamento dentro do prazo de vencimento, o cashback torna-se elegível.',
    icon: CreditCard,
  },
  {
    n: '03', t: 'Solicitação',
    d: 'O participante solicita o crédito direto na plataforma, informando os dados do contrato.',
    icon: FileText,
  },
  {
    n: '04', t: 'Crédito disponibilizado',
    d: 'Após a validação das informações, o valor é creditado na conta do participante dentro da plataforma.',
    icon: Wallet,
  },
  {
    n: '05', t: 'Utilização do benefício',
    d: 'O crédito pode ser usado para resgatar vouchers, trocar por produtos parceiros ou sacar em dinheiro.',
    icon: ArrowDownToLine,
  },
]

function HowItWorks() {
  const { locale } = useLocale()
  const copy = CASHBACK_COPY[locale]
  const anim = useAnimateOnScroll()

  return (
    <section id="como-funciona" className="bg-sunken py-18 md:py-24">
      <div ref={anim.ref} style={anim.style} className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-center md:mb-12">
          <span className="inline-block font-mono text-xs font-medium tracking-[0.08em] uppercase text-brand mb-3">{copy.howKicker}</span>
          <h2 className="font-display font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-strong text-balance mb-4">
            {copy.howTitle}
          </h2>
          <p className="section-subtitle text-lg text-body">
            {copy.howDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line-subtle bg-line-subtle sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={s.n}
                className={`group relative bg-card p-6 transition-colors hover:bg-page md:p-8 ${
                  i === STEPS.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="inline-flex items-center gap-2 text-brand font-mono text-xs font-medium tracking-[0.08em] uppercase mb-6">
                  <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                  {copy.stepLabel} {s.n}
                </div>
                <div className="w-11 h-11 rounded-[var(--radius-lg)] bg-accent-soft text-brand flex items-center justify-center mb-5">
                  <Icon size={20} {...ICON_PROPS} />
                </div>
                <h3 className="font-display font-bold text-[17px] tracking-tight text-strong mb-2">{copy.steps[i][0]}</h3>
                <p className="text-sm leading-relaxed text-body">{copy.steps[i][1]}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---- Big 3% highlight ---- */
function Highlight() {
  const { locale } = useLocale()
  const copy = CASHBACK_COPY[locale]
  const anim = useAnimateOnScroll()

  return (
    <section className="bg-page py-18 md:py-24">
      <div ref={anim.ref} style={anim.style} className="max-w-6xl mx-auto px-6">
        <div data-theme="dark" className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 overflow-hidden rounded-[var(--radius-xl)] bg-ink-900 p-6 text-strong sm:p-8 md:grid-cols-[auto_1fr] md:gap-12 md:p-12 lg:p-14">
          <div className="relative z-10 font-mono font-semibold leading-none text-strong flex items-start" style={{fontSize: 'clamp(80px, 12vw, 140px)', letterSpacing: '-0.04em'}}>
            3<span className="text-brand" style={{fontSize: '0.5em', marginTop: '0.15em'}}>%</span>
          </div>

          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-[clamp(26px,3.2vw,38px)] tracking-tight leading-tight text-strong text-balance mb-4">
              {copy.highlightTitle}
            </h2>
            <p className="copy-justify mb-6 text-base leading-relaxed text-body">
              {copy.highlightDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              {copy.split.map((label) => (
                <span key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-raised border border-line text-sm text-body">
                  <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- CTA / Form ---- */
function CTA() {
  const { locale } = useLocale()
  const copy = CASHBACK_COPY[locale]
  const anim = useAnimateOnScroll()

  return (
    <section id="formulario" data-theme="dark" className="bg-ink-900 text-strong py-12 md:py-16">
      <div ref={anim.ref} style={anim.style} className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-strong md:text-4xl">{copy.ctaHeading}</h2>
        <Button href={PLATFORM_SIGNUP} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
          {copy.cta}
        </Button>
      </div>
    </section>
  )
}

export default function CashbackPage() {
  const { locale } = useLocale()
  const labels = LABELS[locale]
  return (
    <>
      <Header active="/cashback" />
      <a className="skip-link" href="#main-content">{labels.skipToContent}</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <WhoIsEligible />
        <HowItWorks />
        <Highlight />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

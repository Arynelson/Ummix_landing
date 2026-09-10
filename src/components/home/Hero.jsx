import { getLocalizedPath, useLocale } from '../../LocaleProvider.jsx'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'
import ButtonLink from '../ui/ButtonLink'
import { HOME_COPY } from '../../home-copy.js'

function AwardsCard({ copy, locale }) {
  return (
    <ButtonLink
        href={getLocalizedPath(locale, '/premios')}
        size="md"
        className="w-fit max-w-full"
      >
        {copy.awardsCta}
      </ButtonLink>
  )
}

const FLOW_STEPS = [
  {
    id: 'planejar',
    label: 'PLANEJAR',
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'comprar',
    label: 'COMPRAR',
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="2" />
        <circle cx="20" cy="21" r="2" />
        <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1" />
      </svg>
    ),
  },
  {
    id: 'executar',
    label: 'EXECUTAR',
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'auditar',
    label: 'AUDITAR',
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: 'resultados',
    label: 'RESULTADOS',
    active: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
      </svg>
    ),
  },
]

function FlowArrow() {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" className="text-white/35 shrink-0">
      <path d="M0 4h14M10 0l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function FlowCard({ copy }) {
  return (
    <div className="relative rounded-3xl bg-ummix-dark p-6 text-white shadow-2xl sm:p-8">
      <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-ummix-red">
        {copy.flowKicker}
      </div>
      <div className="mt-4 font-heading font-extrabold text-2xl leading-tight">
        {copy.flowTitle}
      </div>
      <div className="mt-6 grid gap-2 sm:hidden">
        {FLOW_STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 ${
              step.active ? 'bg-ummix-red text-white' : 'bg-white/5 text-white/80'
            }`}
          >
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
              step.active ? 'bg-white/14 text-white' : 'bg-ummix-red/18 text-ummix-red'
            }`}>
              {step.icon}
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wide">{copy.flowLabels[index]}</span>
            <span className="ml-auto font-heading text-sm font-extrabold text-white/45">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-7 hidden items-center justify-between gap-2 sm:flex">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-2.5">
              <div
                className={
                  step.active
                    ? 'w-11 h-11 rounded-xl bg-ummix-red grid place-items-center text-white shadow-[0_8px_20px_-6px_rgba(155,25,26,0.6)]'
                    : 'w-11 h-11 rounded-xl bg-ummix-red/[0.18] grid place-items-center text-ummix-red'
                }
              >
                {step.icon}
              </div>
              <div
                className={
                  step.active
                    ? 'text-[10px] font-bold leading-none text-white text-center'
                    : 'text-[10px] font-bold leading-none text-white/80 text-center'
                }
              >
                {copy.flowLabels[i]}
              </div>
            </div>
            {i < FLOW_STEPS.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>
      <div className="mt-7 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/70 sm:mt-8 sm:pt-6">
        <span className="text-white font-bold">{copy.flowDescription}</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const { locale } = useLocale()
  const copy = HOME_COPY[locale].hero
  const anim = useAnimateOnScroll()

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:py-24">
      <div
        className="absolute -top-1/5 -right-[10%] w-[520px] h-[520px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(155,25,26,0.10), transparent 65%)',
        }}
      />
      <div ref={anim.ref} style={anim.style} className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">

        {/* Left — copy */}
        <div>
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-ummix-dark text-balance">
            {copy.headingLineOne} <span className="text-ummix-red">{copy.headingAccentOne}</span>.
            <br />
            {copy.headingLineTwo} <span className="text-ummix-red">{copy.headingAccentTwo}</span>.
          </h1>

          <p className="copy-justify mt-6 max-w-xl text-lg leading-relaxed text-ummix-gray-dark md:text-xl">
            {copy.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href="#metodo"
              className="w-full sm:w-auto"
            >
              {copy.primaryCta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </ButtonLink>
            <ButtonLink
              href="#contato"
              variant="outline-dark"
              className="w-full sm:w-auto"
            >
              {copy.secondaryCta}
            </ButtonLink>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 text-[11px] font-medium leading-snug text-ummix-gray-dark sm:gap-8 sm:text-[13px]">
            <div>
              <div className="font-heading font-black text-2xl text-ummix-dark leading-none">+150</div>
              {copy.stats[0]}
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-ummix-dark leading-none">10</div>
              {copy.stats[1]}
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-ummix-dark leading-none">+50</div>
              {copy.stats[2]}
            </div>
          </div>
        </div>

        {/* Right — 5-step flow visual card + awards */}
        <div>
          <FlowCard copy={copy} />
          <div className="mt-6 flex justify-center">
            <AwardsCard copy={copy} locale={locale} />
          </div>
        </div>

      </div>
    </section>
  )
}

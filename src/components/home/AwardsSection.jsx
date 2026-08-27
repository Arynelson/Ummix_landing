import ButtonLink from '../ui/ButtonLink'
import { useLocale } from '../../LocaleProvider.jsx'
import { HOME_COPY } from '../../home-copy.js'
import { AWARD_ASSETS } from './awards-data.js'

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

export default function AwardsSection() {
  const { locale } = useLocale()
  const copy = HOME_COPY[locale].awardsSection

  return (
    <section id="premios" aria-labelledby="awards-title" className="scroll-mt-28 relative overflow-hidden bg-ummix-dark px-6 py-20 text-white md:px-16 md:py-24">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-ummix-red/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-48 right-0 h-[28rem] w-[28rem] rounded-full bg-ummix-red/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-ummix-red">{copy.kicker}</p>
          <h2 id="awards-title" className="max-w-lg font-heading text-[clamp(34px,4.2vw,58px)] font-extrabold leading-[0.98] tracking-tight text-balance">
            {copy.title}{' '}
            <span className="text-ummix-red">{copy.accent}</span>
          </h2>
          <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-white/70 md:text-lg">
            {copy.description}
          </p>
          <ButtonLink href="#contato" size="md" className="mt-8">
            {copy.cta}
            <ArrowIcon />
          </ButtonLink>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {AWARD_ASSETS.map((award, index) => {
            const item = copy.items[index]
            return (
              <article key={award.id} className="group flex h-full flex-col rounded-3xl bg-white p-4 text-ummix-dark shadow-[0_24px_70px_-34px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-1 sm:p-5">
                <div className="flex min-h-32 items-center justify-center rounded-2xl bg-ummix-gray p-5 sm:min-h-36">
                  <img src={award.src} alt={award.alt[locale]} width="240" height="120" className="max-h-24 max-w-full object-contain" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col px-1 pb-1 pt-5 sm:px-2 sm:pt-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ummix-red">{item[0]}</p>
                  <h3 className="mt-2 font-heading text-2xl font-extrabold leading-tight tracking-tight text-balance">{item[1]}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ummix-gray-dark">{item[2]}</p>
                  <a href={award.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-1.5 self-start rounded-full px-2 text-xs font-bold text-ummix-dark transition-colors hover:text-ummix-red">
                    {copy.viewSource}
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

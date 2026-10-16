import { ArrowRight, Radio, Target, Tv, UsersRound } from 'lucide-react'
import { useLocale } from '../../LocaleProvider.jsx'
import { HOME_COPY } from '../../home-copy.js'
import { CAMPAIGN_START_URL } from '../../constants/campaign.js'
import ButtonLink from '../ui/ButtonLink'

function ResponsibilityDiagram({ copy }) {
  return (
    <div className="hidden rounded-2xl bg-ummix-dark p-7 text-white shadow-xl lg:block">
      <h2 className="max-w-sm font-heading text-[1.7rem] font-extrabold leading-tight">
        {copy.diagramTitle}
      </h2>
      <p className="mt-4 flex items-center gap-3 text-sm font-semibold text-white/85">
        <Radio size={19} aria-hidden="true" />
        {copy.diagramTag}
        <Tv size={19} aria-hidden="true" />
      </p>
      <div className="mt-6 divide-y divide-white/20">
        <div className="pb-5">
          <h3 className="flex items-center gap-3 text-lg font-bold">
            <UsersRound size={20} aria-hidden="true" />{copy.customerTitle}
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-white/85">
            {copy.customerItems.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="pt-5">
          <h3 className="flex items-center gap-3 text-lg font-bold">
            <Target size={20} aria-hidden="true" />{copy.ummixTitle}
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-white/85">
            {copy.ummixItems.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const { locale } = useLocale()
  const copy = HOME_COPY[locale].hero

  return (
    <section className="bg-white px-6 pb-7 pt-28 lg:pb-9 lg:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.25fr_.85fr] lg:gap-12">
        <div className="max-w-2xl">
          <h1 className="max-w-2xl font-heading font-black leading-[1.05] tracking-tight text-ummix-dark text-balance">
            <span className="block text-[2.25rem] sm:text-[2.8rem] lg:text-[3rem]">{copy.headingLineOne}</span>{' '}
            <span className="mt-2 block text-[1.85rem] text-ummix-red sm:text-[2.15rem] lg:text-[2.3rem]">{copy.headingLineTwo}</span>
          </h1>
          <p className="mt-4 text-sm font-semibold leading-relaxed text-ummix-gray-dark">{copy.audience}</p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ummix-gray-dark sm:text-lg">
            {copy.description}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={CAMPAIGN_START_URL} target="_blank" rel="noopener noreferrer" size="lg" className="w-full sm:w-auto">
              {copy.primaryCta}
              <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contato" variant="outline-dark" size="lg" className="w-full sm:w-auto">
              {copy.secondaryCta}
            </ButtonLink>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ummix-gray-dark">{copy.timeNote}</p>
        </div>

        <ResponsibilityDiagram copy={copy} />
      </div>
    </section>
  )
}

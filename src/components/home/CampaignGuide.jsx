import { Radio, SlidersHorizontal, Target, Tv, WalletCards } from 'lucide-react'
import { useLocale } from '../../LocaleProvider.jsx'
import { HOME_COPY } from '../../home-copy.js'

const STEP_ICONS = {
  media: Radio,
  audience: Target,
  budget: WalletCards,
  selection: SlidersHorizontal,
}

export default function CampaignGuide() {
  const { locale } = useLocale()
  const copy = HOME_COPY[locale].campaignGuide

  return (
    <section className="bg-ummix-gray px-6 py-20 md:py-24" aria-labelledby="campaign-guide-title">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 id="campaign-guide-title" className="font-heading text-4xl font-black leading-tight tracking-tight text-ummix-dark md:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ummix-gray-dark md:text-lg">
            {copy.description}
          </p>
        </div>

        <ol className="mt-12 divide-y divide-ummix-dark/12 border-y border-ummix-dark/12">
          {copy.steps.map((step, index) => {
            const Icon = STEP_ICONS[step.icon] || Target
            return (
              <li key={step.title} className="grid gap-5 py-6 md:grid-cols-[5rem_1.05fr_1fr_auto] md:items-center md:gap-8 md:py-7">
                <div className="flex items-center gap-3 md:block">
                  <span className="font-heading text-4xl font-black leading-none text-ummix-red">{step.number}</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-ummix-gray-dark md:mt-4">
                    {step.icon === 'media' ? (
                      <span className="inline-flex items-center gap-1 text-ummix-red" aria-hidden="true">
                        <Radio size={14} />
                        <Tv size={14} />
                      </span>
                    ) : <Icon size={14} className="text-ummix-red" aria-hidden="true" />}
                    {step.owner}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-extrabold leading-tight text-ummix-dark">{step.title}</h3>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-ummix-gray-dark md:text-base">{step.description}</p>
                <div className="hidden h-10 w-px bg-ummix-red/25 md:block" aria-hidden="true" />
              </li>
            )
          })}
        </ol>

        <p className="mt-7 max-w-3xl text-sm leading-relaxed text-ummix-gray-dark">
          {copy.note}
        </p>
      </div>
    </section>
  )
}

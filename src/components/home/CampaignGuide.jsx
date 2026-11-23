import { SlidersHorizontal, WalletCards } from 'lucide-react'
import { useLocale } from '../../LocaleProvider.jsx'
import { HOME_COPY } from '../../home-copy.js'

const PIXEL_ICONS = {
  media: ['radio', 'tv'],
  audience: ['alvo'],
}

const LUCIDE_ICONS = {
  budget: WalletCards,
  selection: SlidersHorizontal,
}

function StepIcon({ icon }) {
  const Icon = LUCIDE_ICONS[icon]
  if (Icon) return <Icon size={14} strokeWidth={1.75} className="text-brand" aria-hidden="true" />
  const pixel = PIXEL_ICONS[icon] || ['alvo']
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {pixel.map(name => (
        <img key={name} src={`/assets/ds/icones-pixel/${name}.svg`} alt="" aria-hidden="true" width={14} height={14} />
      ))}
    </span>
  )
}

export default function CampaignGuide() {
  const { locale } = useLocale()
  const copy = HOME_COPY[locale].campaignGuide

  return (
    <section className="bg-sunken px-6 py-20 md:py-24" aria-labelledby="campaign-guide-title">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 id="campaign-guide-title" className="font-display text-4xl font-black leading-tight tracking-tight text-strong md:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-body md:text-lg">
            {copy.description}
          </p>
        </div>

        <ol className="mt-12 divide-y divide-line-subtle border-y border-line-subtle">
          {copy.steps.map((step) => {
            return (
              <li key={step.title} className="grid gap-5 py-6 md:grid-cols-[5rem_1.05fr_1fr_auto] md:items-center md:gap-8 md:py-7">
                <div className="flex items-center gap-3 md:block">
                  <span className="font-mono text-4xl font-medium leading-none text-brand">{step.number}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-card whitespace-nowrap px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-body md:mt-4">
                    <StepIcon icon={step.icon} />
                    {step.owner}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-extrabold leading-tight text-strong">{step.title}</h3>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-body md:text-base">{step.description}</p>
              </li>
            )
          })}
        </ol>

        <p className="mt-7 max-w-3xl text-sm leading-relaxed text-muted">
          {copy.note}
        </p>
      </div>
    </section>
  )
}

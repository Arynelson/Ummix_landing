import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLocale } from '../../LocaleProvider.jsx'
import { HOME_COPY } from '../../home-copy.js'
import { CAMPAIGN_START_URL } from '../../constants/campaign.js'
import ButtonLink from '../ui/ButtonLink'

export default function CampaignQuestions() {
  const { locale } = useLocale()
  const copy = HOME_COPY[locale].campaignQuestions

  return (
    <section className="bg-page px-6 py-20 md:py-24" aria-labelledby="campaign-questions-title">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 id="campaign-questions-title" className="max-w-md font-display text-4xl font-black leading-tight tracking-tight text-strong md:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-body md:text-lg">
              {copy.description}
            </p>
          </div>

          <div className="divide-y divide-line-subtle border-y border-line-subtle">
            {copy.items.map((item) => (
              <details key={item.question} className="group py-5 first:pt-4 last:pb-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-extrabold leading-tight text-strong marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown strokeWidth={1.75} className="shrink-0 text-brand transition-transform duration-200 group-open:rotate-180" size={21} aria-hidden="true" />
                </summary>
                <p className="max-w-2xl pt-4 pr-10 text-sm leading-relaxed text-body md:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div data-theme="dark" className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-xl)] bg-ink-900 px-6 py-8 text-body xl:flex-row xl:items-center sm:px-8">
          <div>
            <h3 className="font-display text-3xl font-extrabold leading-tight text-strong">{copy.ctaTitle}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-body">{copy.ctaDescription}</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={CAMPAIGN_START_URL} target="_blank" rel="noopener noreferrer" variant="inverse" size="md" className="w-full sm:w-auto">
              {copy.ctaPrimary}
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contato" variant="outline-light" size="md" className="w-full sm:w-auto">
              {copy.ctaSecondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ButtonLink from '../../components/ui/ButtonLink'
import { getLocalizedPath, useLocale } from '../../LocaleProvider.jsx'
import { LABELS } from '../../i18n-labels.js'
import { AWARDS_PAGE_COPY, AWARDS_PAGE_DATA, localizedValue } from './awards-page-data.js'

function SectionIntro({ eyebrow, title, description, headingId }) {
  return (
    <header className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-ummix-red">{eyebrow}</p>
      <h2 id={headingId} className="mt-4 font-heading text-3xl font-black leading-tight tracking-tight text-ummix-dark md:text-4xl">
        {title}
      </h2>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-ummix-gray-dark md:text-lg">
        {description}
      </p>
    </header>
  )
}

function Meta({ label, value, wide = false }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-ummix-gray-dark">{label}</dt>
      <dd className="mt-1 break-words text-sm font-semibold leading-relaxed text-ummix-dark">{value}</dd>
    </div>
  )
}

function StatusBadge({ status, copy }) {
  if (!status) return null

  return (
    <span className={`inline-flex min-h-8 items-center rounded-full px-3 py-1 text-xs font-bold ${
      status === 'firstPlace'
        ? 'bg-ummix-red text-white'
        : 'bg-ummix-gray text-ummix-dark'
    }`}>
      {copy.statuses[status]}
    </span>
  )
}

function RecognitionSection({ locale, copy }) {
  return (
    <section id="premios" className="scroll-mt-28 bg-white px-6 py-20 md:px-16 md:py-28" aria-labelledby="awards-heading">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          headingId="awards-heading"
          eyebrow={copy.awardsSection.eyebrow}
          title={copy.awardsSection.title}
          description={copy.awardsSection.description}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {AWARDS_PAGE_DATA.awards.map((award) => {
            const category = localizedValue(award.category, locale) || copy.awardsSection.empty
            const status = award.status ? copy.awardsSection.statuses[award.status] : copy.awardsSection.empty

            return (
              <article key={award.id} className="rounded-3xl border border-ummix-dark/10 bg-white p-6 shadow-[0_14px_40px_-30px_rgba(30,30,30,0.5)] md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ummix-red">{award.state}</p>
                  <StatusBadge status={award.status} copy={copy.awardsSection} />
                </div>
                <h3 className="mt-5 max-w-xl font-heading text-xl font-extrabold leading-tight text-ummix-dark md:text-2xl">
                  {award.name}
                </h3>
                <dl className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  <Meta label={copy.awardsSection.fields.state} value={award.state} />
                  <Meta label={copy.awardsSection.fields.status} value={status} />
                  <Meta label={copy.awardsSection.fields.category} value={category} wide />
                  <Meta label={copy.awardsSection.fields.organizer} value={award.organizer} wide />
                </dl>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function MembersSection({ copy }) {
  return (
    <section id="membros" className="scroll-mt-28 border-y border-ummix-dark/10 bg-ummix-gray px-6 py-20 md:px-16 md:py-28" aria-labelledby="members-heading">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          headingId="members-heading"
          eyebrow={copy.membersSection.eyebrow}
          title={copy.membersSection.title}
          description={copy.membersSection.description}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {AWARDS_PAGE_DATA.members.map((member, index) => (
            <article key={member.id} className="flex min-h-52 flex-col rounded-3xl border border-ummix-dark/10 bg-white p-6 shadow-[0_14px_40px_-30px_rgba(30,30,30,0.5)] md:p-7">
              <p className="font-heading text-3xl font-black leading-none text-ummix-red">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-8 font-heading text-lg font-extrabold leading-snug text-ummix-dark">{member.name}</h3>
              <dl className="mt-auto pt-8">
                <Meta label={copy.membersSection.state} value={member.state} />
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventsSection({ copy }) {
  return (
    <section id="eventos" className="scroll-mt-28 bg-white px-6 py-20 md:px-16 md:py-28" aria-labelledby="events-heading">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          headingId="events-heading"
          eyebrow={copy.eventsSection.eyebrow}
          title={copy.eventsSection.title}
          description={copy.eventsSection.description}
        />

        <div className="mt-10 divide-y divide-ummix-dark/10 border-y border-ummix-dark/10">
          {AWARDS_PAGE_DATA.events.map((event) => (
            <article key={event.id} className="grid gap-4 py-6 md:grid-cols-[minmax(0,1.35fr)_minmax(80px,0.35fr)_minmax(0,0.85fr)] md:items-center md:gap-8">
              <h3 className="break-words font-heading text-lg font-extrabold leading-snug text-ummix-dark">{event.name}</h3>
              <Meta label={copy.eventsSection.fields.state} value={event.state} />
              <Meta label={copy.eventsSection.fields.organizer} value={event.organizer} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroNavigation({ copy }) {
  const items = [
    { href: '#premios', label: copy.navigation.awards },
    { href: '#membros', label: copy.navigation.members },
    { href: '#eventos', label: copy.navigation.events },
  ]

  return (
    <nav className="mt-12 max-w-4xl" aria-label={copy.pageNavLabel}>
      <div className="flex items-center gap-3">
        <span className="relative grid h-3 w-3 place-items-center" aria-hidden="true">
          <span className="absolute h-3 w-3 rounded-full bg-ummix-red/30 motion-safe:animate-ping" />
          <span className="h-1.5 w-1.5 rounded-full bg-ummix-red" />
        </span>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">{copy.navigationKicker}</p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            style={{ '--i': index }}
            className="awards-hero-link group relative flex min-h-16 flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition-colors duration-200 hover:border-ummix-red/70 hover:bg-white/[0.08]"
          >
            <span className="absolute inset-x-5 top-0 h-px origin-left scale-x-0 bg-ummix-red transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
            <span className="text-sm font-semibold leading-snug text-white/90">{item.label}</span>
            <span className="h-px w-8 bg-white/25 transition-[width,background-color] duration-300 group-hover:w-14 group-hover:bg-ummix-red" aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  )
}

function PageHero({ copy }) {
  return (
    <section className="relative overflow-hidden bg-ummix-dark px-6 pb-14 pt-32 text-white md:px-16 md:pb-20 md:pt-40">
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px]"
        style={{ background: 'radial-gradient(circle, rgba(155,25,26,0.26), transparent 68%)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ummix-red">{copy.eyebrow}</p>
          <h1 className="mt-5 text-balance font-heading text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/72 md:text-xl">
            {copy.description}
          </p>
        </div>

        <HeroNavigation copy={copy} />
      </div>
    </section>
  )
}

export default function AwardsPage() {
  const { locale } = useLocale()
  const copy = AWARDS_PAGE_COPY[locale]
  const labels = LABELS[locale]
  const contactPath = `${getLocalizedPath(locale, '/')}#contato`

  return (
    <>
      <Header active="/premios" surface="overlay" />
      <a className="skip-link" href="#main-content">{labels.skipToContent}</a>
      <main id="main-content" tabIndex="-1">
        <PageHero copy={copy} />
        <RecognitionSection locale={locale} copy={copy} />
        <MembersSection copy={copy} />
        <EventsSection copy={copy} />
        <section className="bg-ummix-gray px-6 py-20 md:px-16 md:py-28" aria-labelledby="awards-cta-heading">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-3xl bg-ummix-dark p-7 text-white md:flex-row md:items-end md:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ummix-red">{copy.cta.eyebrow}</p>
              <h2 id="awards-cta-heading" className="mt-4 text-balance font-heading text-3xl font-black leading-tight md:text-4xl">{copy.cta.title}</h2>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70">{copy.cta.description}</p>
            </div>
            <ButtonLink href={contactPath} className="w-full shrink-0 sm:w-auto">
              {copy.cta.label}
              <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

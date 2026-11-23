import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { ArrowRight, ArrowUpRight, CalendarDays, Network, Trophy } from 'lucide-react'
import { Button } from '../../ds/components'
import { getLocalizedPath, useLocale } from '../../LocaleProvider.jsx'
import { LABELS } from '../../i18n-labels.js'
import { AWARDS_PAGE_COPY, AWARDS_PAGE_DATA, localizedValue } from './awards-page-data.js'

function SectionIntro({ eyebrow, title, description, headingId }) {
  return (
    <header className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(14rem,0.9fr)] md:items-start">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">{eyebrow}</p>
        </div>
        <h2 id={headingId} className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-strong md:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-xl text-base leading-relaxed text-body md:pt-7 md:text-lg">
        {description}
      </p>
    </header>
  )
}

function Meta({ label, value, wide = false }) {
  if (!value) return null

  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted">{label}</dt>
      <dd className="mt-1 break-words text-sm font-semibold leading-relaxed text-strong">{value}</dd>
    </div>
  )
}

function StatusBadge({ status, copy }) {
  if (!status) return null

  return (
    <span className={`inline-flex min-h-8 items-center rounded-full px-3 py-1 text-xs font-bold ${
      status === 'firstPlace' || status === 'winner'
        ? 'bg-accent text-on-accent'
        : 'bg-sunken text-strong'
    }`}>
      {copy.statuses[status]}
    </span>
  )
}

function AwardArtwork({ award, copy }) {
  return (
    <div data-theme="dark" className="relative min-h-[19rem] overflow-hidden bg-ink-900 p-5 md:min-h-[26rem] md:p-7">
      <div className="relative flex h-full min-h-[16rem] flex-col justify-between rounded-[var(--radius-xl)] border border-line p-5 md:min-h-[22rem] md:p-7">
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted">
          <span>Ummix Ads</span>
          <span>{award.state}</span>
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="flex aspect-[1/0.82] w-full max-w-[18rem] items-center justify-center overflow-hidden rounded-[var(--radius-lg)] bg-ink-0 p-4 shadow-[var(--shadow-md)]">
            <img
              src={award.image}
              alt={copy.awardsSection.featuredImageAlt}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <p className="text-xs leading-relaxed text-muted">
          {copy.awardsSection.fields.organizer}: {award.organizer}
        </p>
      </div>
    </div>
  )
}

function FeaturedRecognition({ award, locale, copy }) {
  const category = localizedValue(award.category, locale)

  return (
    <article className="overflow-hidden rounded-[var(--radius-xl)] border border-line-subtle bg-card shadow-[var(--shadow-md)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <AwardArtwork award={award} copy={copy} />
      <div className="flex flex-col p-7 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">{copy.awardsSection.featuredLabel}</p>
            <p className="mt-3 font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted">{award.state}</p>
          </div>
          <StatusBadge status={award.status} copy={copy.awardsSection} />
        </div>
        <h3 className="mt-7 max-w-xl font-display text-3xl font-extrabold leading-tight tracking-tight text-strong md:text-4xl">
          {award.name}
        </h3>
        <dl className="mt-10 grid gap-x-6 gap-y-6 border-t border-line-subtle pt-7 sm:grid-cols-2">
          <Meta label={copy.awardsSection.fields.state} value={award.state} />
          <Meta label={copy.awardsSection.fields.status} value={copy.awardsSection.statuses[award.status]} />
          <Meta label={copy.awardsSection.fields.category} value={category} wide />
          <Meta label={copy.awardsSection.fields.organizer} value={award.organizer} wide />
        </dl>
      </div>
    </article>
  )
}

function CompactAwardCard({ award, locale, copy, index }) {
  const category = localizedValue(award.category, locale)

  return (
    <article className="group relative flex min-h-[14rem] flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line-subtle bg-card p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[var(--shadow-md)] md:p-6">
      <span className="absolute inset-x-6 top-0 h-px origin-left scale-x-[0.6] bg-red-300 transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-4xl font-semibold leading-none text-red-400">{String(index).padStart(2, '0')}</span>
        <div className="flex items-center gap-3">
          {award.image ? (
            <span data-theme="dark" className="grid h-16 w-28 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-lg)] border border-line bg-ink-900 p-2" aria-hidden="true">
              <img src={award.image} alt="" className="h-full w-full object-contain" />
            </span>
          ) : null}
          <StatusBadge status={award.status} copy={copy.awardsSection} />
        </div>
      </div>
      <h3 className="mt-5 max-w-xl font-display text-xl font-extrabold leading-tight text-strong md:text-2xl">
        {award.name}
      </h3>
      <dl className="mt-5 grid gap-x-6 gap-y-3 pt-0 sm:grid-cols-2">
        <Meta label={copy.awardsSection.fields.state} value={award.state} />
        <Meta label={copy.awardsSection.fields.status} value={copy.awardsSection.statuses[award.status]} />
        <Meta label={copy.awardsSection.fields.category} value={category} wide />
        <Meta label={copy.awardsSection.fields.organizer} value={award.organizer} wide />
      </dl>
    </article>
  )
}

function RecognitionSection({ locale, copy }) {
  return (
    <section id="premios" className="scroll-mt-28 bg-sunken px-6 py-20 md:px-16 md:py-28" aria-labelledby="awards-heading">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          headingId="awards-heading"
          eyebrow={copy.awardsSection.eyebrow}
          title={copy.awardsSection.title}
          description={copy.awardsSection.description}
        />

        <div className="mt-12">
          <FeaturedRecognition
            award={AWARDS_PAGE_DATA.awards.find((award) => award.id === 'premio-nacional-inovacao')}
            locale={locale}
            copy={copy}
          />
        </div>

        <div className="mt-14">
          <div className="flex items-end justify-between gap-6 border-b border-line-subtle pb-4">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-strong md:text-3xl">{copy.awardsSection.moreLabel}</h3>
            <span className="hidden h-px w-16 bg-accent md:block" aria-hidden="true" />
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {AWARDS_PAGE_DATA.awards
              .filter((award) => award.id !== 'premio-nacional-inovacao')
              .map((award, index) => (
                <CompactAwardCard key={award.id} award={award} locale={locale} copy={copy} index={index + 1} />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MembersSection({ copy }) {
  return (
    <section id="membros" className="scroll-mt-28 border-y border-line-subtle bg-page px-6 py-20 md:px-16 md:py-28" aria-labelledby="members-heading">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          headingId="members-heading"
          eyebrow={copy.membersSection.eyebrow}
          title={copy.membersSection.title}
          description={copy.membersSection.description}
        />

        <div className="mt-12 grid overflow-hidden rounded-[var(--radius-xl)] border border-line-subtle bg-sunken md:grid-cols-3">
          {AWARDS_PAGE_DATA.members.map((member, index) => (
            <article key={member.id} className="group flex min-h-56 flex-col border-b border-line-subtle p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-4xl font-semibold leading-none text-red-400">{String(index + 1).padStart(2, '0')}</span>
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted">{member.state}</span>
              </div>
              <span className="mt-9 h-px w-10 bg-red-300 transition-[width,background-color] duration-300 group-hover:w-16 group-hover:bg-accent" aria-hidden="true" />
              <h3 className="mt-6 font-display text-lg font-extrabold leading-snug text-strong">{member.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventsSection({ copy }) {
  return (
    <section id="eventos" className="scroll-mt-28 bg-sunken px-6 py-20 md:px-16 md:py-28" aria-labelledby="events-heading">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          headingId="events-heading"
          eyebrow={copy.eventsSection.eyebrow}
          title={copy.eventsSection.title}
          description={copy.eventsSection.description}
        />

        <div className="mt-12 overflow-hidden rounded-[var(--radius-xl)] border border-line-subtle bg-card">
          <div data-theme="dark" className="hidden grid-cols-[4rem_minmax(0,1.35fr)_minmax(7rem,0.35fr)_minmax(0,0.85fr)] gap-8 bg-ink-900 px-6 py-4 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted md:grid md:px-8">
            <span aria-hidden="true">&nbsp;</span>
            <span>{copy.eventsSection.fields.event}</span>
            <span>{copy.eventsSection.fields.state}</span>
            <span>{copy.eventsSection.fields.organizer}</span>
          </div>
          {AWARDS_PAGE_DATA.events.map((event, index) => (
            <article key={event.id} className="grid gap-5 border-b border-line-subtle px-6 py-6 last:border-b-0 md:grid-cols-[4rem_minmax(0,1.35fr)_minmax(7rem,0.35fr)_minmax(0,0.85fr)] md:items-center md:gap-8 md:px-8">
              <span className="font-mono text-2xl font-semibold leading-none text-red-400">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="break-words font-display text-lg font-extrabold leading-snug text-strong">{event.name}</h3>
              <dl className="grid grid-cols-2 gap-5 md:contents">
                <Meta label={copy.eventsSection.fields.state} value={event.state} />
                <Meta label={copy.eventsSection.fields.organizer} value={event.organizer} />
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const JOURNEY_ICONS = { award: Trophy, members: Network, events: CalendarDays }

function JourneyIcon({ name }) {
  const Icon = JOURNEY_ICONS[name]
  return <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
}

function HeroNavigation({ copy }) {
  const items = [
    { href: '#premios', label: copy.navigation.awards, icon: 'award', number: '01' },
    { href: '#membros', label: copy.navigation.members, icon: 'members', number: '02' },
    { href: '#eventos', label: copy.navigation.events, icon: 'events', number: '03' },
  ]

  return (
    <nav className="mt-12 max-w-4xl" aria-label={copy.pageNavLabel}>
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted">{copy.navigationKicker}</p>
      </div>

      <div className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line md:grid-cols-3">
        {items.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            style={{ '--i': index }}
            className="awards-hero-link group relative flex min-h-28 flex-col justify-between overflow-hidden bg-raised p-5 transition-colors duration-300 hover:bg-accent md:min-h-32 md:p-6"
          >
            <span className="flex items-center justify-between gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-lg)] border border-line text-body transition-colors duration-300 group-hover:border-red-300 group-hover:text-strong">
                <JourneyIcon name={item.icon} />
              </span>
              <span className="font-mono text-xs tracking-[0.08em] text-muted group-hover:text-strong">{item.number}</span>
            </span>
            <span className="flex items-end justify-between gap-4">
              <span className="max-w-[12rem] text-sm font-semibold leading-snug text-strong">{item.label}</span>
              <ArrowUpRight className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-strong" size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}

function PageHero({ copy }) {
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-ink-900 px-6 pb-14 pt-32 text-strong md:px-16 md:pb-20 md:pt-40">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">{copy.eyebrow}</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-body md:text-xl">
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
        <section className="bg-sunken px-6 py-20 md:px-16 md:py-28" aria-labelledby="awards-cta-heading">
          <div data-theme="dark" className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[var(--radius-xl)] bg-ink-900 p-7 text-strong md:flex-row md:items-end md:p-10">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">{copy.cta.eyebrow}</p>
              <h2 id="awards-cta-heading" className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight md:text-4xl">{copy.cta.title}</h2>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-body">{copy.cta.description}</p>
            </div>
            <Button
              href={contactPath}
              variant="primary"
              size="lg"
              className="w-full shrink-0 sm:w-auto"
              iconRight={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}
            >
              {copy.cta.label}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

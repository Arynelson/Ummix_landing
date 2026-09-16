import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ButtonLink from '../../components/ui/ButtonLink'
import { getLocalizedPath, useLocale } from '../../LocaleProvider.jsx'
import { LABELS } from '../../i18n-labels.js'
import { AWARDS_PAGE_COPY, AWARDS_PAGE_DATA, localizedValue } from './awards-page-data.js'

function SectionIntro({ eyebrow, title, description, headingId }) {
  return (
    <header className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(14rem,0.9fr)] md:items-start">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-ummix-red" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ummix-red">{eyebrow}</p>
        </div>
        <h2 id={headingId} className="mt-4 font-heading text-3xl font-black leading-tight tracking-tight text-ummix-dark md:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-xl text-base leading-relaxed text-ummix-gray-dark md:pt-7 md:text-lg">
        {description}
      </p>
    </header>
  )
}

function Meta({ label, value, wide = false }) {
  if (!value) return null

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

function AwardArtwork({ award, copy }) {
  return (
    <div className="relative min-h-[19rem] overflow-hidden bg-ummix-dark p-5 md:min-h-[26rem] md:p-7">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 20% 20%, rgba(155,25,26,0.38), transparent 48%)' }}
        aria-hidden="true"
      />
      <div className="relative flex h-full min-h-[16rem] flex-col justify-between rounded-[1.5rem] border border-white/15 p-5 md:min-h-[22rem] md:p-7">
        <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
          <span>Ummix Ads</span>
          <span>{award.state}</span>
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="flex aspect-[1/0.82] w-full max-w-[18rem] items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-[0_20px_40px_-25px_rgba(0,0,0,0.7)]">
            <img
              src={award.image}
              alt={copy.awardsSection.featuredImageAlt}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <p className="text-xs leading-relaxed text-white/60">
          {copy.awardsSection.fields.organizer}: {award.organizer}
        </p>
      </div>
    </div>
  )
}

function FeaturedRecognition({ award, locale, copy }) {
  const category = localizedValue(award.category, locale)

  return (
    <article className="overflow-hidden rounded-[2rem] border border-ummix-dark/10 bg-white shadow-[0_24px_70px_-42px_rgba(30,30,30,0.6)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <AwardArtwork award={award} copy={copy} />
      <div className="flex flex-col p-7 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ummix-red">{copy.awardsSection.featuredLabel}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-ummix-gray-dark">{award.state}</p>
          </div>
          <StatusBadge status={award.status} copy={copy.awardsSection} />
        </div>
        <h3 className="mt-7 max-w-xl font-heading text-3xl font-black leading-tight tracking-tight text-ummix-dark md:text-4xl">
          {award.name}
        </h3>
        <dl className="mt-10 grid gap-x-6 gap-y-6 border-t border-ummix-dark/10 pt-7 sm:grid-cols-2">
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
    <article className="group relative flex min-h-[17rem] flex-col overflow-hidden rounded-3xl border border-ummix-dark/10 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ummix-red/35 hover:shadow-[0_20px_48px_-32px_rgba(30,30,30,0.55)] md:p-7">
      <span className="absolute inset-x-6 top-0 h-px origin-left scale-x-[0.6] bg-ummix-red/35 transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
      <div className="flex items-center justify-between gap-4">
        <span className="font-heading text-4xl font-black leading-none text-ummix-red/25">{String(index).padStart(2, '0')}</span>
        <div className="flex items-center gap-3">
          {award.image ? (
            <span className="grid h-10 w-16 place-items-center overflow-hidden rounded-lg border border-white/10 bg-ummix-dark p-1.5" aria-hidden="true">
              <img src={award.image} alt="" className="h-full w-full object-contain" />
            </span>
          ) : null}
          <StatusBadge status={award.status} copy={copy.awardsSection} />
        </div>
      </div>
      <h3 className="mt-8 max-w-xl font-heading text-xl font-extrabold leading-tight text-ummix-dark md:text-2xl">
        {award.name}
      </h3>
      <dl className="mt-auto grid gap-x-6 gap-y-5 pt-8 sm:grid-cols-2">
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
    <section id="premios" className="scroll-mt-28 bg-ummix-gray px-6 py-20 md:px-16 md:py-28" aria-labelledby="awards-heading">
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
          <div className="flex items-end justify-between gap-6 border-b border-ummix-dark/10 pb-4">
            <h3 className="font-heading text-2xl font-black tracking-tight text-ummix-dark md:text-3xl">{copy.awardsSection.moreLabel}</h3>
            <span className="hidden h-px w-16 bg-ummix-red md:block" aria-hidden="true" />
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
    <section id="membros" className="scroll-mt-28 border-y border-ummix-dark/10 bg-white px-6 py-20 md:px-16 md:py-28" aria-labelledby="members-heading">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          headingId="members-heading"
          eyebrow={copy.membersSection.eyebrow}
          title={copy.membersSection.title}
          description={copy.membersSection.description}
        />

        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-ummix-dark/10 bg-ummix-gray md:grid-cols-3">
          {AWARDS_PAGE_DATA.members.map((member, index) => (
            <article key={member.id} className="group flex min-h-56 flex-col border-b border-ummix-dark/10 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-heading text-4xl font-black leading-none text-ummix-red/35">{String(index + 1).padStart(2, '0')}</span>
                <span className="rounded-full border border-ummix-dark/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ummix-gray-dark">{member.state}</span>
              </div>
              <span className="mt-9 h-px w-10 bg-ummix-red/45 transition-[width,background-color] duration-300 group-hover:w-16 group-hover:bg-ummix-red" aria-hidden="true" />
              <h3 className="mt-6 font-heading text-lg font-extrabold leading-snug text-ummix-dark">{member.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventsSection({ copy }) {
  return (
    <section id="eventos" className="scroll-mt-28 bg-ummix-gray px-6 py-20 md:px-16 md:py-28" aria-labelledby="events-heading">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          headingId="events-heading"
          eyebrow={copy.eventsSection.eyebrow}
          title={copy.eventsSection.title}
          description={copy.eventsSection.description}
        />

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-ummix-dark/10 bg-white">
          <div className="hidden grid-cols-[4rem_minmax(0,1.35fr)_minmax(7rem,0.35fr)_minmax(0,0.85fr)] gap-8 bg-ummix-dark px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 md:grid md:px-8">
            <span aria-hidden="true">&nbsp;</span>
            <span>{copy.eventsSection.fields.event}</span>
            <span>{copy.eventsSection.fields.state}</span>
            <span>{copy.eventsSection.fields.organizer}</span>
          </div>
          {AWARDS_PAGE_DATA.events.map((event, index) => (
            <article key={event.id} className="grid gap-5 border-b border-ummix-dark/10 px-6 py-6 last:border-b-0 md:grid-cols-[4rem_minmax(0,1.35fr)_minmax(7rem,0.35fr)_minmax(0,0.85fr)] md:items-center md:gap-8 md:px-8">
              <span className="font-heading text-2xl font-black leading-none text-ummix-red/35">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="break-words font-heading text-lg font-extrabold leading-snug text-ummix-dark">{event.name}</h3>
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

function JourneyIcon({ name }) {
  const paths = {
    award: (
      <>
        <path d="M12 3v3" />
        <path d="M7 5h10" />
        <path d="M8 5v3a4 4 0 0 0 8 0V5" />
        <path d="M12 12v4" />
        <path d="M8 20h8" />
        <path d="M9 16h6" />
      </>
    ),
    members: (
      <>
        <circle cx="8" cy="8" r="2.5" />
        <circle cx="16" cy="8" r="2.5" />
        <circle cx="12" cy="16" r="2.5" />
        <path d="m10 9.5 2 4" />
        <path d="m14 9.5-2 4" />
      </>
    ),
    events: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
        <path d="M8 14h3" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      {paths[name]}
    </svg>
  )
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
        <span className="relative grid h-3 w-3 place-items-center" aria-hidden="true">
          <span className="absolute h-3 w-3 rounded-full bg-ummix-red/30 motion-safe:animate-ping" />
          <span className="h-1.5 w-1.5 rounded-full bg-ummix-red" />
        </span>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">{copy.navigationKicker}</p>
      </div>

      <div className="mt-5 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-3">
        {items.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            style={{ '--i': index }}
            className="awards-hero-link group relative flex min-h-28 flex-col justify-between overflow-hidden bg-white/[0.035] p-5 transition-colors duration-300 hover:bg-ummix-red/90 md:min-h-32 md:p-6"
          >
            <span className="absolute inset-x-5 top-0 h-px origin-left scale-x-0 bg-ummix-red transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
            <span className="flex items-center justify-between gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/70 transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white">
                <JourneyIcon name={item.icon} />
              </span>
              <span className="font-mono text-xs tracking-[0.16em] text-white/40 group-hover:text-white/65">{item.number}</span>
            </span>
            <span className="flex items-end justify-between gap-4">
              <span className="max-w-[12rem] text-sm font-semibold leading-snug text-white/90">{item.label}</span>
              <span className="text-xl leading-none text-white/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" aria-hidden="true">↗</span>
            </span>
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

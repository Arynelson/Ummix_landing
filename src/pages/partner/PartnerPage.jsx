import { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { CONTACT_FORM_CC_EMAIL } from '../../constants/urls'
import { submitForm as sendForm } from '../../services/formSubmit'

/* ---- Hero ---- */
function Eyebrow() {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-ummix-red mb-7">
      <span className="w-2 h-2 rounded-full bg-ummix-red shadow-[0_0_0_4px_rgba(155,25,26,0.15)]" />
      Programa de Parcerias Ummix Ads
    </span>
  )
}

function HeroCTAs() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a
        href="#candidatura"
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ummix-red px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-ummix-red-dark sm:w-auto"
      >
        Quero ser partner
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>
      <a
        href="#processo"
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 font-semibold text-white/80 transition-all hover:border-white/50 hover:text-white sm:w-auto"
      >
        Como funciona
      </a>
    </div>
  )
}

function KpiPanel() {
  const kpis = [
    {
      value: '+80 veículos',
      label: 'disponíveis para campanhas das empresas parceiras',
      icon: <><path d="M3 3v18h18"/><polyline points="7 15 12 10 16 14 21 8"/></>,
    },
    {
      value: '24,5%',
      label: 'de comissão sobre a mídia veiculada',
      highlight: true,
      icon: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/><path d="M18 8l2 2 3-4"/></>,
    },
    {
      value: 'Suporte dedicado',
      label: 'planejamento e mensuração junto com você',
      icon: <><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6L5.7 21l2.3-7.2-6-4.4h7.6z"/></>,
    },
  ]
  return (
    <div className="grid gap-3">
      {kpis.map((k, i) => (
        <div key={i} className="flex items-center gap-4 rounded-2xl bg-ummix-gray p-5 text-ummix-dark shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] sm:p-6">
          <div className="w-11 h-11 rounded-xl bg-ummix-red/10 text-ummix-red flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{k.icon}</svg>
          </div>
          <div>
            <div className={`font-heading text-[22px] font-extrabold leading-none tracking-tight sm:text-[26px] ${k.highlight ? 'text-ummix-red' : ''}`}>{k.value}</div>
            <div className="text-[13px] text-ummix-gray-dark mt-1">{k.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ummix-dark text-white">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{background: 'radial-gradient(1100px 560px at 12% 20%, rgba(155,25,26,0.32), transparent 62%), radial-gradient(820px 460px at 88% 90%, rgba(155,25,26,0.14), transparent 66%)'}} />
        <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse 80% 70% at 40% 40%, #000 35%, transparent 100%)'}} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-36 md:pb-24 md:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Eyebrow />
          <h1 className="font-heading font-extrabold text-[clamp(40px,5.4vw,68px)] leading-none tracking-tight text-balance mb-6">
            Tenha agora acesso à{' '}
            <em className="not-italic text-ummix-red">mídia de massa orientada a dados</em>.
          </h1>
          <p className="copy-justify max-w-[560px] text-[18px] leading-relaxed text-white/75 sm:text-[19px]">
            Some a estratégia da sua empresa à inteligência de veiculação da Ummix em rádio, TV e mídia
            exterior. Amplie suas entregas e crie uma nova fonte de receita para o seu negócio.
          </p>
          <HeroCTAs />
        </div>
        <KpiPanel />
      </div>
    </section>
  )
}

/* ---- Process ---- */
const PROCESS = [
  { t: 'Candidatura', d: 'Você preenche o formulário de interesse e nosso time avalia o perfil da sua empresa.' },
  { t: 'Onboarding', d: 'Apresentamos a plataforma, o método Ummix e as condições comerciais da parceria.' },
  { t: 'Ativação', d: 'Sua empresa ganha acesso à base de veículos e começa a montar campanhas para os clientes.' },
  { t: 'Crescimento', d: 'Você acompanha resultados em tempo real e amplia a operação com nosso suporte contínuo.' },
]

function Process() {
  return (
    <section id="processo" className="bg-ummix-gray py-18 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center md:mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-ummix-red mb-3">Como virar parceiro</span>
          <h2 className="font-heading font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-ummix-dark text-balance mb-4">
            Quatro passos para começar.
          </h2>
          <p className="mx-auto max-w-xl text-center text-lg text-ummix-gray-dark text-pretty [hyphens:none]">
            Um processo simples e transparente, da candidatura à primeira campanha no ar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((s, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-black/6 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ummix-red/22 hover:shadow-[0_20px_50px_-22px_rgba(155,25,26,0.2)] md:p-8"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-heading font-extrabold text-lg text-white mb-6 transition-colors duration-300 ${i === 0 ? 'bg-ummix-red' : 'bg-ummix-dark group-hover:bg-ummix-red'}`}>
                {i + 1}
              </div>
              <h3 className="font-heading font-bold text-[19px] tracking-tight text-ummix-dark mb-2">{s.t}</h3>
              <p className="text-sm leading-relaxed text-ummix-gray-dark">{s.d}</p>
              {i < PROCESS.length - 1 && (
                <span className="hidden lg:block absolute top-14 -right-3 z-10 text-ummix-red/40">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Partners grid ---- */
const PARTNERS = [
  {
    id: 'opis',
    mark: 'OP!S',
    name: 'OP!S Publicidade',
    links: [
      { label: 'opisagencia.com.br', href: 'https://opisagencia.com.br/', external: true },
      { label: '@opispublicidade', href: 'https://www.instagram.com/opispublicidade/', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/opisagencia/', external: true },
    ],
  },
  {
    id: 'oqi',
    mark: 'OQI',
    name: 'OQI',
    links: [
      { label: 'agenciaoqi.com', href: 'http://agenciaoqi.com', external: true },
      { label: '@agenciaoqi', href: 'https://www.instagram.com/agenciaoqi/', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/oqi-ag%C3%AAncia-que-cria-impacto-positivo/', external: true },
    ],
  },
  {
    id: 'nurion',
    mark: 'NUR',
    name: 'Nurion',
    links: [
      { label: 'nurionhubcrm.vercel.app', href: 'https://nurionhubcrm.vercel.app/', external: true },
      { label: '@nurionhub', href: 'https://www.instagram.com/nurionhub/', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cris-roiz-consultoria-de-neg-cios-e-log-stica-para-sa-de/', external: true },
    ],
  },
]

function PartnersGrid() {
  return (
    <section id="parceiros" className="bg-white py-18 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center md:mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-ummix-red mb-3">Partners Ummix</span>
          <h2 className="font-heading font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-ummix-dark text-balance mb-4">
            Empresas que já operam com a Ummix.
          </h2>
          <p className="mx-auto max-w-xl text-center text-lg text-ummix-gray-dark text-pretty [hyphens:none]">
            Conheça as empresas que já integram nosso programa de parcerias.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner) => (
            <article
              key={partner.id}
              className="relative overflow-hidden rounded-3xl border border-black/8 bg-ummix-gray p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ummix-red/25 hover:shadow-[0_24px_60px_-30px_rgba(30,30,30,0.45)] sm:p-7 md:p-8"
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(155,25,26,0.13), transparent 68%)' }}
                aria-hidden="true"
              />

              <div className="relative flex items-start gap-5">
                <div className="grid h-18 w-18 shrink-0 place-items-center rounded-2xl bg-ummix-dark font-heading text-xl font-extrabold tracking-tight text-white shadow-[0_12px_30px_-18px_rgba(30,30,30,0.8)]">
                  {partner.mark}
                </div>
                <div className="min-w-0">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-ummix-red">
                    Partner Ummix
                  </span>
                  <h3 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-ummix-dark">
                    {partner.name}
                  </h3>
                </div>
              </div>

              <div className="relative mt-7 flex flex-wrap gap-2.5 border-t border-ummix-dark/10 pt-6">
                {partner.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-ummix-dark/12 bg-white px-4 py-2 font-sans text-xs font-bold text-ummix-dark transition-colors hover:border-ummix-red/35 hover:text-ummix-red"
                  >
                    <span className="break-all">{link.label}</span>
                    <svg className="shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Form ---- */
function PartnerForm() {
  const [status, setStatus] = useState('idle')

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    try {
      await sendForm({
        nome: formData.get('nome'),
        email: formData.get('email'),
        empresa: formData.get('empresa'),
        telefone: formData.get('telefone'),
        _subject: 'Nova candidatura ao Programa de Parcerias da Ummix',
        _cc: CONTACT_FORM_CC_EMAIL,
      })

      formElement.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="candidatura" className="bg-ummix-gray py-18 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl bg-ummix-dark p-6 text-white sm:p-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:p-14">
          <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(600px 360px at 0% 0%, rgba(155,25,26,0.32), transparent 62%)'}} />

          <div className="relative z-10">
            <h2 className="font-heading font-extrabold text-[clamp(28px,3.4vw,40px)] tracking-tight leading-tight text-white text-balance mb-4">
              Vamos construir essa parceria?
            </h2>
            <p className="mb-6 text-left text-base leading-relaxed text-white/70 [hyphens:none]">
              Conte um pouco sobre a sua empresa. Nosso time entra em contato para apresentar o programa.
            </p>
            <div className="grid gap-3">
              {['Acesso a mais de 80 veículos de mídia', '24,5% de comissão sobre a mídia veiculada', 'Planejamento e mensuração com nosso time'].map(b => (
                <div key={b} className="flex items-start gap-3 text-sm text-white/82">
                  <svg className="text-ummix-red shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {status !== 'success' ? (
            <form className="relative z-10 grid gap-4" onSubmit={onSubmit}>
              {[
                { id: 'partner-nome', name: 'nome', label: 'Nome', type: 'text', placeholder: 'Seu nome completo', autoComplete: 'name' },
                { id: 'partner-email', name: 'email', label: 'E-mail corporativo', type: 'email', placeholder: 'voce@suaempresa.com.br', autoComplete: 'email' },
                { id: 'partner-empresa', name: 'empresa', label: 'Nome da empresa', type: 'text', placeholder: 'Como sua empresa se chama', autoComplete: 'organization' },
                { id: 'partner-telefone', name: 'telefone', label: 'Telefone / WhatsApp', type: 'tel', placeholder: '(00) 00000-0000', autoComplete: 'tel' },
              ].map(f => (
                <div key={f.id} className="grid gap-2">
                  <label htmlFor={f.id} className="text-xs font-bold tracking-widest uppercase text-white/60">{f.label}</label>
                  <input
                    id={f.id}
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/6 border border-white/14 text-white placeholder-white/40 font-body text-[15px] focus:outline-none focus:border-ummix-red focus:bg-white/9 focus:shadow-[0_0_0_3px_rgba(155,25,26,0.3)] transition-all"
                  />
                </div>
              ))}
              {status === 'error' && (
                <p className="text-sm font-semibold text-red-200" role="alert">
                  Não foi possível enviar agora. Tente novamente em alguns instantes.
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-ummix-red hover:bg-ummix-red-dark text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-65"
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar candidatura'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </form>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center text-center gap-4 py-8" role="status">
              <div className="w-16 h-16 rounded-full bg-ummix-red/18 border border-ummix-red/50 flex items-center justify-center text-ummix-red">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">Candidatura recebida!</h3>
              <p className="text-base text-white/70">Nosso time de parcerias entra em contato em breve.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function PartnerPage() {
  return (
    <>
      <Header active="/partner" />
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <Process />
        <PartnersGrid />
        <PartnerForm />
      </main>
      <Footer />
    </>
  )
}

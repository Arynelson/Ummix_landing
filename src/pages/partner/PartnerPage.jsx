import { useState } from 'react'
import { SubHeader, SubFooter } from '../subpages/SubChrome'

const PARTNER_FORM_URL = '#'

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
    <div className="flex flex-wrap gap-3 mt-9">
      <a
        href="#candidatura"
        className="inline-flex items-center gap-2 bg-ummix-red hover:bg-ummix-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105"
      >
        Quero ser parceiro
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>
      <a
        href="#processo"
        className="inline-flex items-center gap-2 border border-white/25 text-white/80 hover:text-white hover:border-white/50 font-semibold px-6 py-3 rounded-xl transition-all"
      >
        Como funciona
      </a>
    </div>
  )
}

function KpiPanel() {
  const kpis = [
    {
      value: '+150 veículos',
      label: 'à disposição das agências parceiras',
      icon: <><path d="M3 3v18h18"/><polyline points="7 15 12 10 16 14 21 8"/></>,
    },
    {
      value: 'Comissionamento',
      label: 'recorrente sobre a mídia veiculada',
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
        <div key={i} className="bg-ummix-gray text-ummix-dark rounded-2xl p-6 flex items-center gap-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
          <div className="w-11 h-11 rounded-xl bg-ummix-red/10 text-ummix-red flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{k.icon}</svg>
          </div>
          <div>
            <div className="font-heading font-extrabold text-[26px] leading-none tracking-tight">{k.value}</div>
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-44 pb-24 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <div>
          <Eyebrow />
          <h1 className="font-heading font-extrabold text-[clamp(40px,5.4vw,68px)] leading-none tracking-tight text-balance mb-6">
            Sua agência, agora com acesso à{' '}
            <em className="not-italic text-ummix-red">mídia de massa orientada a dados</em>.
          </h1>
          <p className="text-[19px] leading-relaxed text-white/72 max-w-[560px] text-pretty">
            Some o seu trabalho de criação e estratégia à inteligência de veiculação da Ummix
            em rádio, TV e mídia exterior. Mais resultado para o seu cliente, mais margem para a sua agência.
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
  { t: 'Candidatura', d: 'Você preenche o formulário de interesse e nosso time avalia o perfil da sua agência.' },
  { t: 'Onboarding', d: 'Apresentamos a plataforma, o método Ummix e as condições comerciais da parceria.' },
  { t: 'Ativação', d: 'Sua agência ganha acesso à base de veículos e começa a montar campanhas para os clientes.' },
  { t: 'Crescimento', d: 'Você acompanha resultados em tempo real e amplia a operação com nosso suporte contínuo.' },
]

function Process() {
  return (
    <section id="processo" className="bg-ummix-gray py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-ummix-red mb-3">Como virar parceiro</span>
          <h2 className="font-heading font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-ummix-dark text-balance mb-4">
            Quatro passos para começar.
          </h2>
          <p className="text-lg text-ummix-gray-dark max-w-xl mx-auto text-pretty">
            Um processo simples e transparente, da candidatura à primeira campanha no ar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((s, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-8 border border-black/6 hover:-translate-y-1 hover:border-ummix-red/22 hover:shadow-[0_20px_50px_-22px_rgba(155,25,26,0.2)] transition-all duration-300 group"
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
  { mark: 'NA', name: 'Nome da Agência', city: 'Goiânia · GO', desc: 'Breve descrição da agência parceira: especialidade e foco de atuação.' },
  { mark: 'AG', name: 'Agência Exemplo', city: 'São Paulo · SP', desc: 'Performance e branding para marcas de varejo em todo o país.' },
  { mark: 'MK', name: 'Marca & Co.', city: 'Brasília · DF', desc: 'Comunicação integrada com forte atuação no setor público.' },
  { mark: 'PB', name: 'Publi Brasil', city: 'Curitiba · PR', desc: 'Mídia e criação para o agronegócio e indústria.' },
  { mark: 'ST', name: 'Studio Traço', city: 'Belo Horizonte · MG', desc: 'Branding e conteúdo para marcas em crescimento.' },
  { mark: 'VX', name: 'Vértice X', city: 'Recife · PE', desc: 'Performance marketing e mídia programática.' },
  { mark: 'ID', name: 'Ideia Viva', city: 'Porto Alegre · RS', desc: 'Campanhas regionais com forte presença em rádio e TV.' },
  { mark: 'CR', name: 'Criativa Hub', city: 'Florianópolis · SC', desc: 'Estratégia digital e mídia offline integradas.' },
]

function PartnersGrid() {
  return (
    <section id="parceiros" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-ummix-red mb-3">Quem já é parceiro</span>
          <h2 className="font-heading font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-ummix-dark text-balance mb-4">
            Agências que já operam com a Ummix.
          </h2>
          <p className="text-lg text-ummix-gray-dark max-w-xl mx-auto text-pretty">
            Passe o mouse sobre cada agência para conhecer um pouco mais.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PARTNERS.map((p, i) => (
            <div
              key={i}
              tabIndex={0}
              className="relative aspect-[16/10] rounded-2xl border border-black/8 bg-ummix-gray flex items-center justify-center overflow-hidden cursor-pointer group hover:border-ummix-red/30 hover:shadow-[0_22px_50px_-24px_rgba(30,30,30,0.4)] transition-all duration-300"
            >
              <span className="font-heading font-extrabold text-3xl tracking-tight text-ummix-dark opacity-55 group-hover:opacity-0 group-hover:scale-90 transition-all duration-300">
                {p.mark}
              </span>
              <div className="absolute inset-0 bg-ummix-dark opacity-0 group-hover:opacity-100 group-focus:opacity-100 translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0 transition-all duration-300 p-5 flex flex-col justify-center pointer-events-none">
                <div className="absolute inset-0" style={{background: 'radial-gradient(300px 160px at 80% 0%, rgba(155,25,26,0.4), transparent 65%)'}} />
                <p className="relative font-heading font-bold text-[17px] tracking-tight text-white mb-1">{p.name}</p>
                <span className="relative inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase text-ummix-red mb-2">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {p.city}
                </span>
                <p className="relative text-[12.5px] leading-relaxed text-white/70">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Form ---- */
function PartnerForm() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="candidatura" className="bg-ummix-gray py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-[1080px] mx-auto bg-ummix-dark text-white rounded-3xl p-14 md:p-14 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-14 items-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(600px 360px at 0% 0%, rgba(155,25,26,0.32), transparent 62%)'}} />

          <div className="relative z-10">
            <h2 className="font-heading font-extrabold text-[clamp(28px,3.4vw,40px)] tracking-tight leading-tight text-white text-balance mb-4">
              Vamos construir essa parceria?
            </h2>
            <p className="text-base leading-relaxed text-white/70 mb-6">
              Conte um pouco sobre a sua agência. Nosso time entra em contato para apresentar o programa.
            </p>
            <div className="grid gap-3">
              {['Acesso à base de 150+ veículos de mídia', 'Comissionamento recorrente', 'Planejamento e mensuração com nosso time'].map(b => (
                <div key={b} className="flex items-start gap-3 text-sm text-white/82">
                  <svg className="text-ummix-red shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {!sent ? (
            <form className="relative z-10 grid gap-4" onSubmit={onSubmit}>
              {[
                { id: 'nome', label: 'Nome', type: 'text', placeholder: 'Seu nome completo' },
                { id: 'email', label: 'E-mail corporativo', type: 'email', placeholder: 'voce@suaagencia.com.br' },
                { id: 'agencia', label: 'Nome da agência', type: 'text', placeholder: 'Como sua agência se chama' },
                { id: 'tel', label: 'Telefone / WhatsApp', type: 'tel', placeholder: '(00) 00000-0000' },
              ].map(f => (
                <div key={f.id} className="grid gap-2">
                  <label htmlFor={f.id} className="text-xs font-bold tracking-widest uppercase text-white/60">{f.label}</label>
                  <input
                    id={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/6 border border-white/14 text-white placeholder-white/40 font-body text-[15px] focus:outline-none focus:border-ummix-red focus:bg-white/9 focus:shadow-[0_0_0_3px_rgba(155,25,26,0.3)] transition-all"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-ummix-red hover:bg-ummix-red-dark text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02]"
              >
                Enviar candidatura
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
              <p className="text-xs text-center text-white/50 mt-1">
                Prefere o formulário completo?{' '}
                <a href={PARTNER_FORM_URL} target="_blank" rel="noopener" className="text-white/80 underline">
                  Abrir formulário →
                </a>
              </p>
            </form>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center text-center gap-4 py-8">
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
      <SubHeader active="/partner" />
      <main>
        <Hero />
        <Process />
        <PartnersGrid />
        <PartnerForm />
      </main>
      <SubFooter />
    </>
  )
}

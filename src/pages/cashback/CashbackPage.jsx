import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ButtonLink from '../../components/ui/ButtonLink'
import { PLATFORM_SIGNUP } from '../../constants/urls'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'

/* ---- Hero ---- */
function Eyebrow() {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-ummix-red mb-7">
      <span className="w-2 h-2 rounded-full bg-ummix-red shadow-[0_0_0_4px_rgba(155,25,26,0.15)]" />
      Programa de Cashback Ummix Ads
    </span>
  )
}

function HeroCTAs() {
  return (
    <div className="flex flex-wrap gap-3 mt-9">
      <ButtonLink
        href={PLATFORM_SIGNUP}
        target="_blank"
        rel="noopener noreferrer"
      >
        Acessar plataforma de cashback
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </ButtonLink>
      <ButtonLink
        href="#como-funciona"
        variant="outline-light"
      >
        Como funciona
      </ButtonLink>
    </div>
  )
}

function Hero() {
  const anim = useAnimateOnScroll()

  return (
    <section className="relative overflow-hidden bg-ummix-dark text-white">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{background: 'radial-gradient(1100px 560px at 12% 20%, rgba(155,25,26,0.32), transparent 62%), radial-gradient(820px 460px at 88% 90%, rgba(155,25,26,0.14), transparent 66%)'}} />
        <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse 80% 70% at 40% 40%, #000 35%, transparent 100%)'}} />
      </div>

      <div ref={anim.ref} style={anim.style} className="relative z-10 max-w-2xl mx-auto px-6 pt-44 pb-24 flex flex-col items-center text-center">
        <Eyebrow />
        <h1 className="font-heading font-extrabold text-[clamp(40px,5.4vw,68px)] leading-none tracking-tight text-balance mb-6">
          Anuncie pela Ummix Ads e gere{' '}
          <em className="not-italic text-ummix-red">até 3% de cashback</em>.
        </h1>
        <p className="text-[19px] leading-relaxed text-white/72 max-w-[560px] text-pretty">
          A cada contrato fechado, a Ummix Ads devolve parte do valor para quem
          participou da negociação. Cadastre-se e comece a receber.
        </p>
        <HeroCTAs />
      </div>
    </section>
  )
}

/* ---- Who is eligible ---- */
const PARTICIPANTS = [
  {
    t: 'Contratante',
    d: 'O anunciante que realiza a contratação da campanha diretamente.',
    icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>,
  },
  {
    t: 'Veículo de mídia',
    d: 'O veículo que assina o PI, quando aplicável à negociação.',
    icon: <><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></>,
  },
  {
    t: 'Agência / Intermediador',
    d: 'Gestor de tráfego ou intermediador responsável pela contratação.',
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  },
]

function WhoIsEligible() {
  const anim = useAnimateOnScroll()

  return (
    <section className="bg-white py-24 md:py-32">
      <div ref={anim.ref} style={anim.style} className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-ummix-red mb-3">Elegibilidade</span>
          <h2 className="font-heading font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-ummix-dark text-balance mb-4">
            Quem tem direito ao cashback?
          </h2>
          <p className="text-lg text-ummix-gray-dark max-w-xl mx-auto text-pretty">
            Cada participante elegível recebe <strong>1% de cashback</strong>, totalizando até <strong>3% distribuídos por contrato</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PARTICIPANTS.map((p) => (
            <div key={p.t} className="rounded-3xl border border-black/8 p-8 bg-white transition-all hover:-translate-y-1 hover:bg-ummix-gray">
              <div className="w-13 h-13 rounded-2xl bg-ummix-red/8 text-ummix-red flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
              </div>
              <h3 className="font-heading font-bold text-[19px] tracking-tight text-ummix-dark mb-2">{p.t}</h3>
              <p className="text-sm leading-relaxed text-ummix-gray-dark">{p.d}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-ummix-red text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-ummix-red" />
                1% de cashback
              </div>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-black/8 p-10 bg-ummix-gray">
          <h3 className="font-heading font-bold text-xl tracking-tight text-ummix-dark mb-6">Regras para receber o cashback</h3>
          <ul className="space-y-4">
            {[
              'O contrato esteja com o pagamento realizado integralmente até a data de vencimento.',
              'O participante possua cadastro ativo na Plataforma de Cashback da Ummix Ads.',
              'Solicite o crédito direto na Plataforma de Cashback da Ummix Ads.',
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-ummix-red/10 text-ummix-red text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <p className="text-sm leading-relaxed text-ummix-gray-dark">{rule}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---- How it works ---- */
const STEPS = [
  {
    n: '01', t: 'Cadastro',
    d: 'O participante realiza seu cadastro na Plataforma de Cashback da Ummix Ads.',
    icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></>,
  },
  {
    n: '02', t: 'Pagamento do contrato',
    d: 'Após a confirmação do pagamento dentro do prazo de vencimento, o cashback torna-se elegível.',
    icon: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  },
  {
    n: '03', t: 'Solicitação',
    d: 'O participante solicita o crédito direto na plataforma, informando os dados do contrato.',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></>,
  },
  {
    n: '04', t: 'Crédito disponibilizado',
    d: 'Após a validação das informações, o valor é creditado na conta do participante dentro da plataforma.',
    icon: <><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></>,
  },
  {
    n: '05', t: 'Utilização do benefício',
    d: 'O crédito pode ser usado para resgatar vouchers, trocar por produtos parceiros ou sacar em dinheiro.',
    icon: <><path d="M12 2v14M6 10l6 6 6-6"/><path d="M4 20h16"/></>,
  },
]

function HowItWorks() {
  const anim = useAnimateOnScroll()

  return (
    <section id="como-funciona" className="bg-ummix-gray py-24 md:py-32">
      <div ref={anim.ref} style={anim.style} className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-ummix-red mb-3">Como funciona</span>
          <h2 className="font-heading font-extrabold text-[clamp(30px,3.6vw,48px)] tracking-tight text-ummix-dark text-balance mb-4">
            Do cadastro ao resgate, em cinco passos.
          </h2>
          <p className="text-lg text-ummix-gray-dark max-w-xl mx-auto text-pretty">
            O processo é simples e transparente — acompanhe cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 rounded-3xl overflow-hidden border border-black/8">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`relative p-8 bg-white hover:bg-white/80 transition-colors group ${
                i < STEPS.length - 1 ? 'lg:border-r lg:border-black/8' : ''
              }`}
            >
              <div className="inline-flex items-center gap-2 text-ummix-red text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-ummix-red shadow-[0_0_0_4px_rgba(155,25,26,0.15)]" />
                PASSO {s.n}
              </div>
              <div className="w-11 h-11 rounded-2xl bg-ummix-red/8 text-ummix-red flex items-center justify-center mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              </div>
              <h3 className="font-heading font-bold text-[17px] tracking-tight text-ummix-dark mb-2">{s.t}</h3>
              <p className="text-sm leading-relaxed text-ummix-gray-dark">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Big 3% highlight ---- */
function Highlight() {
  const anim = useAnimateOnScroll()

  return (
    <section className="bg-white py-24 md:py-32">
      <div ref={anim.ref} style={anim.style} className="max-w-6xl mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-ummix-dark text-white rounded-3xl p-12 md:p-16 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-14 items-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(560px 340px at 100% 0%, rgba(155,25,26,0.4), transparent 60%)'}} />

          <div className="relative z-10 font-heading font-extrabold leading-none tracking-tighter text-white flex items-start" style={{fontSize: 'clamp(80px, 12vw, 140px)', letterSpacing: '-0.05em'}}>
            3<span className="text-ummix-red" style={{fontSize: '0.5em', marginTop: '0.15em'}}>%</span>
          </div>

          <div className="relative z-10">
            <h2 className="font-heading font-extrabold text-[clamp(26px,3.2vw,38px)] tracking-tight leading-tight text-white text-balance mb-4">
              Até 3% distribuídos por contrato.
            </h2>
            <p className="text-base leading-relaxed text-white/72 mb-6">
              Contratante, veículo de mídia e agência — cada um recebe 1%. O cashback é creditado de forma transparente e tem validade de <strong className="text-white">90 dias</strong> após a disponibilização.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Contratante: 1%', 'Veículo: 1%', 'Agência: 1%'].map((label) => (
                <span key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 border border-white/14 text-sm text-white/85">
                  <span className="w-2 h-2 rounded-full bg-ummix-red" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- CTA / Form ---- */
function CTA() {
  const anim = useAnimateOnScroll()

  return (
    <section id="formulario" className="bg-ummix-dark text-white py-24 md:py-32">
      <div ref={anim.ref} style={anim.style} className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-heading font-extrabold text-[clamp(32px,4vw,52px)] tracking-tight leading-tight text-balance mb-5">
          Ative seu cashback agora.
        </h2>
        <p className="text-lg text-white/70 mb-10 text-pretty">
          Acesse a Plataforma de Cashback da Ummix Ads, cadastre-se e solicite
          o crédito do seu contrato em poucos passos.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink
            href={PLATFORM_SIGNUP}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Solicitar meu cashback
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </ButtonLink>
          <ButtonLink
            href="#como-funciona"
            size="lg"
            variant="outline-light"
          >
            Rever como funciona
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-white/40">
          Dúvidas sobre o programa?{' '}
          <a href="mailto:fale@ummix.com.br" className="text-white/60 hover:text-white underline transition-colors">
            fale@ummix.com.br
          </a>
        </p>
      </div>
    </section>
  )
}

export default function CashbackPage() {
  return (
    <>
      <Header active="/cashback" />
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <WhoIsEligible />
        <HowItWorks />
        <Highlight />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

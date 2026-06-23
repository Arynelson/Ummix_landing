import { useEffect, useRef, useState } from 'react'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'

const AWARDS = [
  {
    id: 'cni',
    src: '/assets/cni_premio_inovacao.jpg',
    alt: 'Prêmio Nacional de Inovação',
    label: 'Vencedor · Prêmio Nacional de Inovação · CNI/SEBRAE',
    href: 'https://www.premiodeinovacao.com.br/vencedores/',
  },
  {
    id: 'abdi',
    src: '/assets/Logo_ABDI_Principal .png',
    alt: 'ABDI - Desafio Nacional de Inovação',
    label: 'Top 4 ideias mais inovadoras do Brasil · ABDI',
    href: 'https://curicaca.abdi.com.br/',
  },
  {
    id: 'go-ecommerce',
    src: '/assets/Selo_GO+E-commerce.png',
    alt: 'Certificação GO E-commerce',
    label: 'Certificação GO E-commerce',
    href: 'https://comunicacao.ielgoias.com.br/go-ecommerce',
  },
]

function AwardsCard() {
  const [activeId, setActiveId] = useState(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!activeId) return
    const handlePointerDown = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setActiveId(null)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [activeId])

  const handleLogoClick = (e, award) => {
    // On touch devices there's no hover, so the first tap only reveals
    // the tooltip; a second tap on an already-active logo navigates.
    if (activeId !== award.id) {
      e.preventDefault()
      e.stopPropagation()
      setActiveId(award.id)
    }
  }

  return (
    <div ref={cardRef} className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur border border-white/25 rounded-2xl sm:rounded-full px-4 py-2">
      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/70 whitespace-nowrap">
        Prêmios e Certificações
      </span>
      <div className="flex items-center gap-2">
        {AWARDS.map((award) => (
          <div key={award.id} className="relative">
            {activeId === award.id && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[220px] px-3 py-2 rounded-lg bg-ummix-dark border border-white/15 text-[11px] leading-snug text-white text-center shadow-lg pointer-events-none z-20">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-2 h-2 bg-ummix-dark border-l border-t border-white/15 rotate-45 -mb-1" />
                {award.label}
              </div>
            )}
            <a
              href={award.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveId(award.id)}
              onMouseLeave={() => setActiveId((current) => (current === award.id ? null : current))}
              onClick={(e) => handleLogoClick(e, award)}
              aria-label={award.label}
              className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-lg bg-white p-1.5 transition-transform hover:scale-105 cursor-pointer"
            >
              <img
                src={award.src}
                alt={award.alt}
                className="max-w-full max-h-full object-contain"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

const FLOW_STEPS = [
  {
    id: 'planejar',
    label: 'PLANEJAR',
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'comprar',
    label: 'COMPRAR',
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="2" />
        <circle cx="20" cy="21" r="2" />
        <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1" />
      </svg>
    ),
  },
  {
    id: 'executar',
    label: 'EXECUTAR',
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'auditar',
    label: 'AUDITAR',
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: 'resultados',
    label: 'RESULTADOS',
    active: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
      </svg>
    ),
  },
]

function FlowArrow() {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" className="text-white/35 shrink-0">
      <path d="M0 4h14M10 0l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function FlowCard() {
  return (
    <div className="relative bg-ummix-dark rounded-3xl p-8 text-white shadow-2xl">
      <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-ummix-red">
        Da contratação à prestação de contas
      </div>
      <div className="mt-4 font-heading font-extrabold text-2xl leading-tight">
        Uma operação única e integrada.
      </div>
      <div className="mt-7 flex items-center justify-between gap-2">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-2.5">
              <div
                className={
                  step.active
                    ? 'w-11 h-11 rounded-xl bg-ummix-red grid place-items-center text-white shadow-[0_8px_20px_-6px_rgba(155,25,26,0.6)]'
                    : 'w-11 h-11 rounded-xl bg-ummix-red/[0.18] grid place-items-center text-ummix-red'
                }
              >
                {step.icon}
              </div>
              <div
                className={
                  step.active
                    ? 'text-[10px] font-bold leading-none text-white text-center'
                    : 'text-[10px] font-bold leading-none text-white/80 text-center'
                }
              >
                {step.label}
              </div>
            </div>
            {i < FLOW_STEPS.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-white/10 text-sm leading-relaxed text-white/70">
        <span className="text-white font-bold">Método Ummix®</span> de Gestão de Campanhas — planejamento, negociação, execução, auditoria e resultados.
      </div>
    </div>
  )
}

export default function Hero() {
  const anim = useAnimateOnScroll()

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:py-24">
      <div
        className="absolute -top-1/5 -right-[10%] w-[520px] h-[520px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(155,25,26,0.10), transparent 65%)',
        }}
      />
      <div ref={anim.ref} style={anim.style} className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">

        {/* Left — copy */}
        <div>
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-ummix-dark text-balance">
            MÍDIA OFF.
            <br />
            INTELIGÊNCIA ON.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-ummix-gray-dark max-w-xl leading-relaxed">
            Anuncie em centenas de rádios e TVs. Filtre por localização,
            renda e comportamento, e veja o que cada veiculação gera.
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <a
              href="#metodo"
              className="inline-flex items-center gap-2.5 bg-ummix-red text-white font-bold text-sm px-7 py-4 rounded-full shadow-[0_12px_28px_-10px_rgba(155,25,26,0.6)] transition-transform hover:scale-105"
            >
              Conhecer o Método Ummix
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2.5 bg-transparent text-ummix-dark font-bold text-sm px-7 py-4 rounded-full border-[1.5px] border-ummix-dark transition-transform hover:scale-105"
            >
              Quero anunciar
            </a>
          </div>

          <div className="mt-12 flex gap-9 text-[13px] font-medium text-ummix-gray-dark">
            <div>
              <div className="font-heading font-black text-2xl text-ummix-dark leading-none">+150</div>
              Veículos parceiros
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-ummix-dark leading-none">10</div>
              Etapas estratégicas
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-ummix-dark leading-none">+50</div>
              Atividades operacionais
            </div>
          </div>
        </div>

        {/* Right — 5-step flow visual card + floating awards */}
        <div className="relative">
          <FlowCard />
          <div className="absolute -bottom-6 -left-6 hidden md:block">
            <AwardsCard />
          </div>
        </div>

      </div>
    </section>
  )
}

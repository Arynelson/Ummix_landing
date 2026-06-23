import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const AUTOPLAY_INTERVAL = 5000;

const SLIDES = [
  {
    id: 'validacao-estrategica',
    title: 'Validação Estratégica',
    description:
      'Conferência do contrato, investimentos, veículos e objetivos da campanha. Alinhamento total antes de qualquer execução.',
    tag: 'Briefing · Contrato · KPIs',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'inteligencia-de-midia',
    title: 'Inteligência de Mídia',
    description:
      'Mapeamento de veículos, análise de inventário e custo por CPM. A base estratégica que define onde sua mensagem terá mais impacto.',
    tag: 'Inventário · CPM · Mix de mídia',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: 'negociacao-e-reserva',
    title: 'Negociação e Reserva',
    description:
      'Negociação direta com veículos, reserva de espaços e garantia das melhores condições comerciais.',
    tag: 'Veículos · Espaços · Condições',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 17a3 3 0 0 0 4.24 0l3.54-3.54a3 3 0 0 0-4.24-4.24L13 11" />
        <path d="M13 7a3 3 0 0 0-4.24 0L5.22 10.54a3 3 0 0 0 4.24 4.24L11 13" />
      </svg>
    ),
  },
  {
    id: 'gestao-operacional',
    title: 'Gestão Operacional',
    description:
      'Emissão de PIs, distribuição de planejamentos e gestão de prazos. Cada detalhe operacional sob controle.',
    tag: 'PIs · Planejamentos · Prazos',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    id: 'gestao-de-materiais',
    title: 'Gestão de Materiais',
    description: 'Recebimento, conferência e aprovação de materiais. Produção sob demanda quando necessário.',
    tag: 'Recebimento · Aprovação · Produção',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polygon points="10 8 16 10 10 12 10 8" fill="currentColor" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'monitoramento-e-auditoria',
    title: 'Monitoramento e Auditoria',
    description: 'Monitoramento em tempo real, auditoria das inserções e validação contínua das veiculações.',
    tag: 'Tempo real · Auditoria · Validação',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'gestao-financeira',
    title: 'Gestão Financeira',
    description: 'Controle financeiro, repasses, cashback e conciliações com parceiros. Total transparência no dinheiro.',
    tag: 'Repasses · Cashback · Conciliação',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 1 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'governanca-e-controle',
    title: 'Governança e Controle',
    description: 'Gestão de contratos, acompanhamento por praça e indicadores de performance em todo o ecossistema.',
    tag: 'Contratos · Praças · KPIs',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'relatorios-e-resultados',
    title: 'Relatórios e Resultados',
    description: 'Consolidação de dados, auditoria final e entrega de relatórios com evidências comprobatórias.',
    tag: 'Dados · Evidências · Insights',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <rect x="7" y="13" width="3" height="6" />
        <rect x="12" y="9" width="3" height="10" />
        <rect x="17" y="5" width="3" height="14" />
      </svg>
    ),
  },
  {
    id: 'encerramento-e-beneficios',
    title: 'Encerramento e Benefícios',
    description: 'Conferência final, liberação de cashback/BV e encerramento estratégico da campanha.',
    tag: 'Conferência · Cashback · BV',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="22" x2="4" y2="15" />
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      </svg>
    ),
  },
];

const TOTAL_SLIDES = SLIDES.length;

export default function Method() {
  const anim = useAnimateOnScroll();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % TOTAL_SLIDES);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsPlaying(false);
  };

  const goPrev = () => {
    setActiveSlide((current) => (current - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
    setIsPlaying(false);
  };

  const goNext = () => {
    setActiveSlide((current) => (current + 1) % TOTAL_SLIDES);
    setIsPlaying(false);
  };

  const slide = SLIDES[activeSlide];

  return (
    <section id="metodo" className="relative overflow-hidden bg-ummix-gray px-6 py-24 md:px-16 md:py-36">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(155,25,26,.08), transparent 65%)' }}
      />

      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="font-sans text-[11px] font-bold uppercase leading-none tracking-[.22em] text-ummix-red">
              O método
            </div>
            <h2 className="mt-3.5 font-heading text-5xl font-black uppercase leading-none tracking-tight text-ummix-dark md:text-6xl">
              Método <span className="text-ummix-red">Ummix®</span>
            </h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-[#555]">
              10 etapas, do briefing ao encerramento. Cada uma é uma promessa cumprida.
            </p>
          </div>

          <div className="flex items-center gap-3.5 rounded-full border border-[#eee] bg-white px-3.5 py-2.5 shadow-[0_4px_12px_-4px_rgba(0,0,0,.08)]">
            <div className="flex items-center gap-2 px-2 font-sans text-[11px] font-bold uppercase leading-none tracking-[.16em] text-[#666]">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: isPlaying ? '#16A34A' : '#999',
                  boxShadow: isPlaying ? '0 0 6px #16A34A' : 'none',
                }}
              />
              Auto-play
            </div>
            <div className="h-3.5 w-px bg-[#ddd]" />
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Etapa anterior"
                className="grid h-8 w-8 place-items-center rounded-full border-none bg-ummix-gray text-ummix-dark"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Próxima etapa"
                className="grid h-8 w-8 place-items-center rounded-full border-none bg-ummix-red text-white shadow-[0_6px_14px_-6px_rgba(155,25,26,.7)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stage */}
        <div className="relative mt-16 overflow-hidden rounded-[32px] bg-ummix-dark p-10 text-white md:p-16">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(155,25,26,.30), transparent 65%)' }}
          />

          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]"
              >
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase leading-none tracking-[.22em] text-ummix-red">
                    {`Etapa ${String(activeSlide + 1).padStart(2, '0')} de ${TOTAL_SLIDES}`}
                  </div>
                  <div className="mt-4.5 flex items-baseline gap-5">
                    <div className="font-heading text-[90px] font-black leading-[.85] tracking-tight text-ummix-red md:text-[120px]">
                      {String(activeSlide + 1).padStart(2, '0')}
                    </div>
                    <h3 className="m-0 text-balance font-heading text-3xl font-extrabold leading-none tracking-tight text-white md:text-4xl">
                      {slide.title}
                    </h3>
                  </div>
                  <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/72">{slide.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-ummix-red/40 bg-ummix-red/[.18] px-4.5 py-2.5 font-sans text-[11px] font-bold uppercase leading-none tracking-[.16em] text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {slide.tag}
                  </div>
                </div>

                <div className="relative hidden h-[280px] place-items-center md:grid">
                  <div className="absolute inset-8 rounded-full border border-dashed border-ummix-red/40" />
                  <div className="absolute inset-16 rounded-full border border-dashed border-ummix-red/25" />
                  <div
                    className="relative grid h-40 w-40 place-items-center rounded-full border-[1.5px] border-ummix-red text-ummix-red shadow-[0_0_40px_rgba(155,25,26,.4)]"
                    style={{ background: 'radial-gradient(circle at 30% 30%, #3A1112, #1E1E1E)' }}
                  >
                    {slide.icon}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* chips + progress */}
          <div className="relative mt-12 border-t border-white/10 pt-7">
            <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
              {SLIDES.map((s, index) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir para etapa ${index + 1}`}
                  aria-current={index === activeSlide}
                  className={`rounded-xl border-none py-3 font-heading text-sm font-extrabold tracking-wide ${
                    index === activeSlide
                      ? 'bg-ummix-red text-white'
                      : 'bg-white/5 text-white/55 outline outline-1 outline-white/[.06]'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <div className="mt-3.5 h-0.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, var(--color-ummix-red), #D02326)' }}
                animate={{ width: `${((activeSlide + 1) / TOTAL_SLIDES) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

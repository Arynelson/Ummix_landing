import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChartColumn, ChevronLeft, ChevronRight, ClipboardCheck, DollarSign, Flag, Handshake, Send, Check } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { useLocale } from '../../LocaleProvider.jsx';
import { HOME_COPY } from '../../home-copy.js';
import { IconButton } from '../../ds/components';

const AUTOPLAY_INTERVAL = 5000;

const lucide = (Icon) => <Icon size={44} strokeWidth={1.75} aria-hidden="true" />;
// Ícones de sinal em pixel (versão branca: o palco é escuro).
const pixel = (name) => (
  <img src={`/assets/ds/icones-pixel/${name}-branco.svg`} alt="" aria-hidden="true" width="52" height="52" />
);

const SLIDES = [
  {
    id: 'validacao-estrategica',
    title: 'Validação Estratégica',
    description:
      'Conferência do contrato, investimentos, veículos e objetivos da campanha. Alinhamento total antes de qualquer execução.',
    tag: 'Briefing · Contrato · KPIs',
    icon: lucide(ClipboardCheck),
  },
  {
    id: 'inteligencia-de-midia',
    title: 'Inteligência de Mídia',
    description:
      'Mapeamento de veículos, análise de inventário e custo por CPM. A base estratégica que define onde sua mensagem terá mais impacto.',
    tag: 'Inventário · CPM · Mix de mídia',
    icon: pixel('alvo'),
  },
  {
    id: 'negociacao-e-reserva',
    title: 'Negociação e Reserva',
    description:
      'Negociação direta com veículos, reserva de espaços e garantia das melhores condições comerciais.',
    tag: 'Veículos · Espaços · Condições',
    icon: lucide(Handshake),
  },
  {
    id: 'gestao-operacional',
    title: 'Gestão Operacional',
    description:
      'Emissão de PIs, distribuição de planejamentos e gestão de prazos. Cada detalhe operacional sob controle.',
    tag: 'PIs · Planejamentos · Prazos',
    icon: lucide(Send),
  },
  {
    id: 'gestao-de-materiais',
    title: 'Gestão de Materiais',
    description: 'Recebimento, conferência e aprovação de materiais. Produção sob demanda quando necessário.',
    tag: 'Recebimento · Aprovação · Produção',
    icon: pixel('video'),
  },
  {
    id: 'monitoramento-e-auditoria',
    title: 'Monitoramento e Auditoria',
    description: 'Monitoramento em tempo real, auditoria das inserções e validação contínua das veiculações.',
    tag: 'Tempo real · Auditoria · Validação',
    icon: pixel('sinal'),
  },
  {
    id: 'gestao-financeira',
    title: 'Gestão Financeira',
    description: 'Controle financeiro, repasses, cashback e conciliações com parceiros. Total transparência no dinheiro.',
    tag: 'Repasses · Cashback · Conciliação',
    icon: lucide(DollarSign),
  },
  {
    id: 'governanca-e-controle',
    title: 'Governança e Controle',
    description: 'Gestão de contratos, acompanhamento por praça e indicadores de performance em todo o ecossistema.',
    tag: 'Contratos · Praças · KPIs',
    icon: pixel('praca'),
  },
  {
    id: 'relatorios-e-resultados',
    title: 'Relatórios e Resultados',
    description: 'Consolidação de dados, auditoria final e entrega de relatórios com evidências comprobatórias.',
    tag: 'Dados · Evidências · Insights',
    icon: lucide(ChartColumn),
  },
  {
    id: 'encerramento-e-beneficios',
    title: 'Encerramento e Benefícios',
    description: 'Conferência final, liberação de cashback/BV e encerramento estratégico da campanha.',
    tag: 'Conferência · Cashback · BV',
    icon: lucide(Flag),
  },
];

const TOTAL_SLIDES = SLIDES.length;

export default function Method() {
  const { locale } = useLocale();
  const copy = HOME_COPY[locale].method;
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
    <section id="metodo" className="relative overflow-hidden bg-sunken px-6 py-20 md:px-16 md:py-28">
      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-brand">
              {copy.kicker}
            </div>
            <h2 className="mt-3.5 font-display text-5xl font-bold leading-none tracking-tight text-strong md:text-6xl">
              {copy.title} <span className="text-brand">Ummix®</span>
            </h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-body">
              {copy.description}
            </p>
          </div>

          <div className="flex items-center gap-3.5 rounded-[var(--radius-lg)] border border-line-subtle bg-card px-3.5 py-2.5 shadow-[var(--shadow-xs)]">
            <div className="flex items-center gap-2 px-2 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-muted">
              <span
                className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-success' : 'bg-ink-400'}`}
                aria-hidden="true"
              />
              {copy.autoplay}
            </div>
            <div className="h-3.5 w-px bg-line" />
            <div className="flex gap-1.5">
              <IconButton label={copy.previous} onClick={goPrev} variant="secondary" size="lg">
                <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
              </IconButton>
              <IconButton label={copy.next} onClick={goNext} variant="primary" size="lg">
                <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Stage */}
        <div
          data-theme="dark"
          className="relative mt-12 overflow-hidden rounded-[var(--radius-xl)] bg-ink-900 p-6 text-body sm:p-8 md:mt-14 md:p-12 lg:p-16"
        >
          <div className="relative min-h-[280px] md:min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid min-w-0 items-center gap-12 md:grid-cols-[1.4fr_1fr]"
              >
                <div className="min-w-0">
                  <div className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-brand">
                    {`${copy.step} ${String(activeSlide + 1).padStart(2, '0')} ${copy.of} ${TOTAL_SLIDES}`}
                  </div>
                  <div className="mt-4 flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-baseline sm:gap-5">
                    <div className="shrink-0 font-mono text-[64px] font-medium leading-[.85] tracking-tight text-brand sm:text-[82px] md:text-[120px]">
                      {String(activeSlide + 1).padStart(2, '0')}
                    </div>
                    <h3 className="m-0 min-w-0 break-words text-balance font-display text-3xl font-bold leading-none tracking-tight text-strong md:text-4xl">
                      {copy.steps[activeSlide][0]}
                    </h3>
                  </div>
                  <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-body">{copy.steps[activeSlide][1]}</p>
                  <div className="mt-6 flex w-fit max-w-full flex-wrap items-center gap-2.5 rounded-[var(--radius-md)] border border-red-800 bg-accent-soft-strong px-4 py-3 font-mono text-[11px] font-medium uppercase leading-snug tracking-[0.08em] text-strong">
                    <Check size={12} strokeWidth={1.75} aria-hidden="true" />
                    {copy.steps[activeSlide][2]}
                  </div>
                </div>

                <div className="relative hidden h-[280px] place-items-center md:grid">
                  <div className="absolute inset-8 rounded-full border border-dashed border-red-800" />
                  <div className="absolute inset-16 rounded-full border border-dashed border-line" />
                  <div className="relative grid h-40 w-40 place-items-center rounded-full border-[1.5px] border-accent bg-ink-800 text-brand">
                    {slide.icon}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* chips + progress */}
          <div className="relative mt-10 border-t border-line pt-6 md:mt-12 md:pt-7">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 md:grid-cols-10">
              {SLIDES.map((s, index) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`${copy.goTo} ${index + 1}`}
                  aria-current={index === activeSlide}
                  className={`min-h-11 rounded-[var(--radius-md)] px-2 py-3 font-mono text-sm font-medium tracking-[0.08em] transition-colors ${
                    index === activeSlide
                      ? 'border border-transparent bg-accent text-white'
                      : 'border border-line-subtle bg-ink-800 text-muted hover:text-strong'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <div className="mt-3.5 h-0.5 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full bg-accent"
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

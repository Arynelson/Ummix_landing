import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const STAT_ROWS = [
  {
    id: 'etapas',
    value: '10',
    label: (
      <>
        Etapas
        <br />
        estratégicas
      </>
    ),
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'atividades',
    value: '+50',
    label: (
      <>
        Atividades
        <br />
        operacionais
      </>
    ),
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M9 14h6" />
        <path d="M9 18h4" />
      </svg>
    ),
  },
  {
    id: 'validacoes',
    value: 'Múltiplas',
    valueSize: 'text-2xl',
    label: 'Validações',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const ARC_LABELS = [
  { id: 'negociacao', text: 'Negociação Inteligente', left: 318, top: 45 },
  { id: 'operacao', text: 'Operação Especializada', left: 430, top: 105 },
  { id: 'monitoramento', text: 'Monitoramento em Tempo Real', left: 493, top: 214 },
  { id: 'auditoria', text: 'Auditoria Independente', left: 493, top: 326 },
  { id: 'financeira', text: 'Gestão Financeira', left: 430, top: 435 },
  { id: 'relatorios', text: 'Relatórios e Resultados', left: 318, top: 495 },
];

export default function Backstage() {
  const anim = useAnimateOnScroll();

  return (
    <section
      id="bastidores"
      className="relative overflow-hidden bg-ummix-dark px-6 py-20 text-white md:px-16 md:py-28"
    >
      <div
        className="pointer-events-none absolute -top-[20%] left-1/2 h-[900px] w-[1100px] -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(155,25,26,.18), transparent 60%)' }}
      />

      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
            O que a Ummix faz <br />
            <span className="text-ummix-red">nos bastidores</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:mt-16 xl:grid-cols-[0.55fr_1fr] xl:gap-16">
          {/* LEFT: stat rows */}
          <div className="grid gap-4 sm:grid-cols-3 xl:flex xl:flex-col xl:gap-9">
            {STAT_ROWS.map((row) => (
              <div key={row.id} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-4 xl:gap-6 xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0">
                <div className="grid h-14 w-14 flex-none place-items-center rounded-full border-[1.5px] border-ummix-red/55 text-ummix-red xl:h-16 xl:w-16">
                  {row.icon}
                </div>
                <div className="flex flex-col items-start gap-1 xl:flex-row xl:items-baseline xl:gap-3">
                  <div className={`font-heading font-black leading-none tracking-tight text-white ${row.valueSize ?? 'text-4xl'}`}>
                    {row.value}
                  </div>
                  <div className="font-heading text-[15px] font-bold uppercase leading-tight tracking-wide text-white">
                    {row.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile and tablet: compact diagram that preserves the same information. */}
          <div className="rounded-3xl border border-white/10 bg-white/3 p-5 sm:p-7 xl:hidden">
            <div
              className="mx-auto grid h-40 w-40 place-items-center rounded-full border-[1.5px] border-ummix-red text-center shadow-[0_0_40px_rgba(155,25,26,.35)] sm:h-44 sm:w-44"
              style={{ background: 'radial-gradient(circle at 30% 30%, #2A2A2A, #1A1A1A)' }}
            >
              <div className="font-heading text-2xl font-black uppercase leading-none tracking-wide text-white">
                Sua
                <br />
                Campanha
              </div>
            </div>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {ARC_LABELS.map((label) => (
                <div key={label.id} className="flex min-h-11 items-center gap-3 rounded-xl bg-white/5 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ummix-red shadow-[0_0_0_4px_rgba(155,25,26,.16)]" />
                  <span className="font-sans text-xs font-bold uppercase leading-snug tracking-wide text-white">
                    {label.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: full animated arc diagram. */}
          <div className="relative hidden h-[560px] w-full xl:block">
            <div className="absolute left-0 top-1/2 h-135 w-135 -translate-y-1/2">
              <svg
                viewBox="0 0 540 540"
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="arcGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(155,25,26,.85)" />
                    <stop offset="50%" stopColor="rgba(155,25,26,.55)" />
                    <stop offset="100%" stopColor="rgba(155,25,26,.85)" />
                  </linearGradient>
                </defs>
                <circle cx="270" cy="270" r="248" fill="none" stroke="rgba(155,25,26,.10)" strokeWidth="1" />
                <path d="M 270 40 A 230 230 0 0 1 270 500" fill="none" stroke="url(#arcGrad)" strokeWidth="1.5" />
                <circle cx="270" cy="270" r="148" fill="none" stroke="rgba(155,25,26,.35)" strokeWidth="1" strokeDasharray="3 6" />
              </svg>

              <div className="arc-dot" />
              <div className="arc-dot d2" />
              <div className="arc-dot d3" />

              <div
                className="pulse-ring absolute left-[270px] top-1/2 z-3 grid h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1.5px] border-ummix-red"
                style={{ background: 'radial-gradient(circle at 30% 30%, #2A2A2A, #1A1A1A)' }}
              >
                <div className="text-center">
                  <div className="font-heading text-[30px] font-black uppercase leading-[.95] tracking-wide text-white">
                    Sua
                    <br />
                    Campanha
                  </div>
                  <div className="mx-auto mt-3.5 h-0.5 w-9 bg-ummix-red" />
                </div>
              </div>

              {ARC_LABELS.map((label) => (
                <div
                  key={label.id}
                  className="arc-label absolute flex items-center gap-3.5 whitespace-nowrap"
                  style={{ left: `${label.left}px`, top: `${label.top}px`, transform: 'translate(0,-50%)' }}
                >
                  <div className="relative h-3.5 w-3.5 flex-none">
                    <div className="absolute inset-0 rounded-full bg-ummix-red" />
                    <div className="absolute -inset-1.5 rounded-full border border-ummix-red/45" />
                  </div>
                  <span className="font-sans text-[13px] font-bold uppercase leading-tight tracking-wide text-white">
                    {label.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center md:mt-12">
          <div className="text-balance font-heading text-3xl font-black leading-tight tracking-tight text-white">
            A Ummix simplifica o <span className="text-ummix-red">complexo</span> e centraliza tudo para você.
          </div>
        </div>
      </div>
    </section>
  );
}

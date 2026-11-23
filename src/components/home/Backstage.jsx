import { ClipboardList, ShieldCheck, Workflow } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { useLocale } from '../../LocaleProvider.jsx';
import { HOME_COPY } from '../../home-copy.js';

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
    icon: <Workflow size={30} strokeWidth={1.75} aria-hidden="true" />,
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
    icon: <ClipboardList size={30} strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    id: 'validacoes',
    value: 'Múltiplas',
    valueSize: 'text-2xl',
    label: 'Validações',
    icon: <ShieldCheck size={30} strokeWidth={1.75} aria-hidden="true" />,
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
  const { locale } = useLocale();
  const copy = HOME_COPY[locale].backstage;
  const anim = useAnimateOnScroll();

  return (
    <section
      id="bastidores"
      data-theme="dark"
      className="relative overflow-hidden bg-ink-900 px-6 py-20 text-body md:px-16 md:py-28"
    >
      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold leading-none tracking-tight text-strong md:text-5xl">
            {copy.title} <br />
            <span className="text-brand">{copy.accent}</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:mt-16 xl:grid-cols-[0.55fr_1fr] xl:gap-16">
          {/* LEFT: stat rows */}
          <div className="grid gap-4 sm:grid-cols-3 xl:flex xl:flex-col xl:gap-9">
            {STAT_ROWS.map((row, index) => (
              <div key={row.id} className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-line bg-card p-4 xl:gap-6 xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0">
                <div className="grid h-14 w-14 flex-none place-items-center rounded-full border-[1.5px] border-red-700 text-brand xl:h-16 xl:w-16">
                  {row.icon}
                </div>
                <div className="flex flex-col items-start gap-1 xl:flex-row xl:items-baseline xl:gap-3">
                  <div className={`font-mono font-medium leading-none tracking-tight text-strong ${row.valueSize ?? 'text-4xl'}`}>
                    {copy.statsValues[index]}
                  </div>
                  <div className="font-display text-[15px] font-semibold leading-tight text-strong">
                    {copy.stats[index]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile and tablet: compact diagram that preserves the same information. */}
          <div className="rounded-[var(--radius-xl)] border border-line bg-card p-5 sm:p-7 xl:hidden">
            <div className="mx-auto grid h-40 w-40 place-items-center rounded-full border-[1.5px] border-accent bg-ink-800 text-center sm:h-44 sm:w-44">
              <div className="font-display text-2xl font-bold leading-none text-strong">
                {copy.campaign}
              </div>
            </div>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {ARC_LABELS.map((label, index) => (
                <div key={label.id} className="flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] bg-ink-800 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                  <span className="font-mono text-xs font-medium uppercase leading-snug tracking-[0.08em] text-strong">
                    {copy.labels[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: full arc diagram (static, flat colors). */}
          <div className="relative hidden h-[560px] w-full xl:block">
            <div className="absolute left-0 top-1/2 h-135 w-135 -translate-y-1/2">
              <svg
                viewBox="0 0 540 540"
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                <circle cx="270" cy="270" r="248" fill="none" stroke="var(--border-subtle)" strokeWidth="1" />
                <path d="M 270 40 A 230 230 0 0 1 270 500" fill="none" stroke="var(--red-600)" strokeWidth="1.5" />
                <circle cx="270" cy="270" r="148" fill="none" stroke="var(--red-800)" strokeWidth="1" strokeDasharray="3 6" />
              </svg>

              <div className="absolute left-[270px] top-1/2 z-3 grid h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1.5px] border-accent bg-ink-800">
                <div className="text-center">
                  <div className="font-display text-[30px] font-bold leading-[.95] tracking-tight text-strong">
                    {copy.campaign}
                  </div>
                  <div className="mx-auto mt-3.5 h-0.5 w-9 bg-accent" />
                </div>
              </div>

              {ARC_LABELS.map((label, index) => (
                <div
                  key={label.id}
                  className="absolute flex items-center gap-3.5 whitespace-nowrap"
                  style={{ left: `${label.left}px`, top: `${label.top}px`, transform: 'translate(0,-50%)' }}
                >
                  <div className="relative h-3.5 w-3.5 flex-none">
                    <div className="absolute inset-0 rounded-full bg-accent" />
                    <div className="absolute -inset-1.5 rounded-full border border-red-800" />
                  </div>
                  <span className="font-mono text-[13px] font-medium uppercase leading-tight tracking-[0.08em] text-strong">
                    {copy.labels[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center md:mt-12">
          <div className="text-balance font-display text-3xl font-bold leading-tight tracking-tight text-strong">
            {copy.closing} <span className="text-brand">{copy.closingAccent}</span> {copy.closingRest}
          </div>
        </div>
      </div>
    </section>
  );
}

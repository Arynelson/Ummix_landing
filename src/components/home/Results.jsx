import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const RESULTS = [
  {
    id: 'eficiencia',
    title: 'Maior eficiência',
    description: 'Melhores negociações e uso inteligente do investimento.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    id: 'seguranca',
    title: 'Segurança e confiança',
    description: 'Processos auditados e dados validados em tempo real.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'agilidade',
    title: 'Agilidade e foco',
    description: 'Menos burocracia, mais tempo para estratégia.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: 'visibilidade',
    title: 'Visibilidade e controle',
    description: 'Informações claras para decisões mais assertivas.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v10l5 3" />
      </svg>
    ),
  },
];

export default function Results() {
  const anim = useAnimateOnScroll();

  return (
    <section id="resultados" className="bg-white py-24 md:py-30" ref={anim.ref} style={anim.style}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ummix-red">
            Resultados que geram impacto
          </div>
          <h2 className="mt-3.5 font-heading text-4xl font-extrabold leading-tight tracking-tight text-ummix-dark md:text-5xl">
            Mais que entregar mídia — entregar <span className="text-ummix-red">resultado</span>.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RESULTS.map((result) => (
            <div
              key={result.id}
              className="rounded-2xl border border-ummix-gray-light bg-ummix-gray p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ummix-red/10 text-ummix-red">
                {result.icon}
              </div>
              <div className="mt-4.5 font-heading text-lg font-extrabold text-ummix-dark">
                {result.title}
              </div>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ummix-gray-dark">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

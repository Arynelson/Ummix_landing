import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const DELIVERABLES = [
  {
    id: 'compra-inteligente',
    title: 'Compra inteligente',
    description: 'Melhor eficiência para o investimento.',
    highlight: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8" cy="21" r="2" />
        <circle cx="20" cy="21" r="2" />
        <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1" />
      </svg>
    ),
  },
  {
    id: 'gestao-operacional',
    title: 'Gestão operacional',
    description: 'Execução precisa e centralizada.',
    highlight: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 'auditoria-independente',
    title: 'Auditoria independente',
    description: 'Transparência e segurança na entrega.',
    highlight: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'prestacao-de-contas',
    title: 'Prestação de contas',
    description: 'Relatórios completos e confiáveis.',
    highlight: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'seguranca-financeira',
    title: 'Segurança financeira',
    description: 'Controle, repasses e benefícios garantidos.',
    highlight: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: 'transparencia-total',
    title: 'Transparência total',
    description: 'Você acompanha, a gente cuida do resto.',
    highlight: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
];

export default function Deliverables() {
  const anim = useAnimateOnScroll();

  return (
    <section className="relative overflow-hidden bg-ummix-dark px-6 py-24 text-white md:px-16 md:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[900px] -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse at top, rgba(155,25,26,.20), transparent 70%)' }}
      />

      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ummix-red">
            O que a Ummix realmente entrega
          </div>
          <h2 className="mt-3.5 font-heading text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Uma operação completa,
            <br />
            <span className="text-ummix-red">um único objetivo.</span>
          </h2>
        </div>

        <div className="mt-18 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
          {DELIVERABLES.map((item) => (
            <div
              key={item.id}
              className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-7"
            >
              <div
                className={`grid h-12 w-12 place-items-center rounded-xl ${
                  item.highlight ? 'bg-ummix-red text-white' : 'bg-ummix-red/[0.18] text-ummix-red'
                }`}
              >
                {item.icon}
              </div>
              <div className="mt-4 font-heading text-lg font-extrabold text-white">{item.title}</div>
              <p className="mt-2 font-sans text-sm font-medium leading-relaxed text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

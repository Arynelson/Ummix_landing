import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const CARDS = [
  {
    id: 'campanha',
    label: 'Uma única campanha',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    id: 'contrato',
    label: 'Um único contrato',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 12l-3-3-4 4 4 4 3-3" />
        <path d="M14 6l3 3" />
        <path d="M18 4l3 3-7 7-3-3z" />
        <path d="M9 18l3 3 9-9-3-3" />
      </svg>
    ),
  },
  {
    id: 'relatorio',
    label: 'Um único relatório',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <rect x="7" y="13" width="3" height="6" />
        <rect x="12" y="9" width="3" height="10" />
        <rect x="17" y="5" width="3" height="14" />
      </svg>
    ),
  },
];

export default function ClientView() {
  const anim = useAnimateOnScroll();

  return (
    <section className="bg-white py-24 md:py-30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div
            ref={anim.ref}
            style={anim.style}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ummix-red"
          >
            O que o cliente vê
          </div>
          <h2 className="mt-3.5 font-heading text-4xl font-extrabold leading-tight tracking-tight text-ummix-dark md:text-5xl">
            <span className="text-ummix-red">Simples</span> para quem contrata.
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-ummix-gray-dark md:text-lg">
            Toda a complexidade da mídia off, embrulhada em três entregáveis claros.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-3xl border border-transparent bg-ummix-gray p-8 text-center md:p-12"
            >
              <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-2xl bg-ummix-red/10 text-ummix-red">
                {card.icon}
              </div>
              <div className="mt-6 font-heading text-lg font-extrabold uppercase tracking-wide text-ummix-dark">
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

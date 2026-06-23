import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const ITEMS = [
  { id: 'negociar', label: 'Negociar com dezenas de veículos' },
  { id: 'entregas', label: 'Controlar entregas e prazos' },
  { id: 'veiculacoes', label: 'Conferir veiculações' },
  { id: 'pagamentos', label: 'Gerenciar pagamentos e repasses' },
  { id: 'dados', label: 'Consolidar dados e relatórios' },
  { id: 'cashback', label: 'Acompanhar cashback e benefícios' },
];

export default function Eliminates() {
  const anim = useAnimateOnScroll();

  return (
    <section className="bg-white py-24 md:py-30">
      <div ref={anim.ref} style={anim.style} className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ummix-red">
              O que isso elimina
            </div>
            <h2 className="mt-3.5 text-balance font-heading text-4xl font-extrabold leading-tight tracking-tight text-ummix-dark md:text-5xl">
              Menos complexidade. <span className="text-ummix-red">Mais tempo</span> para o que importa.
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ummix-gray-dark">
              A Ummix absorve toda a operação da mídia off para que você foque em estratégia e resultado.
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4.5 rounded-2xl border-l-3 border-ummix-red bg-ummix-gray px-5.5 py-4.5"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9B191A"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="flex-none"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <div className="font-sans text-[15px] font-semibold leading-snug text-ummix-dark">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

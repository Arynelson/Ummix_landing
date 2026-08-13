import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { useLocale } from '../../LocaleProvider.jsx';
import { HOME_COPY } from '../../home-copy.js';

const ITEMS = [
  { id: 'negociar', label: 'Negociar com dezenas de veículos' },
  { id: 'entregas', label: 'Controlar entregas e prazos' },
  { id: 'veiculacoes', label: 'Conferir veiculações' },
  { id: 'pagamentos', label: 'Gerenciar pagamentos' },
  { id: 'dados', label: 'Consolidar dados e relatórios' },
];

export default function Eliminates() {
  const { locale } = useLocale();
  const copy = HOME_COPY[locale].eliminates;
  const anim = useAnimateOnScroll();

  return (
    <section className="bg-white py-18 md:py-24">
      <div ref={anim.ref} style={anim.style} className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ummix-red">
              {copy.kicker}
            </div>
            <h2 className="mt-3.5 text-balance font-heading text-4xl font-extrabold leading-tight tracking-tight text-ummix-dark md:text-5xl">
              {copy.title} <span className="text-ummix-red">{copy.accent}</span> {copy.titleRest}
            </h2>
            <p className="copy-justify mt-4 font-sans text-base leading-relaxed text-ummix-gray-dark">
              {copy.description}
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {ITEMS.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-4.5 rounded-2xl border border-ummix-red/15 bg-ummix-gray px-5.5 py-4.5"
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
                  {copy.items[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

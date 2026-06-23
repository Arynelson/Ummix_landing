import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const STATS = [
  { id: 'anunciantes', value: '+500', label: 'Anunciantes atendidos' },
  { id: 'roi', value: '3x', label: 'ROI médio das campanhas' },
  { id: 'midia', value: 'R$50M+', label: 'Mídia gerenciada/ano' },
  { id: 'veiculos', value: '150+', label: 'Veículos parceiros' },
];

export default function Metrics() {
  const anim = useAnimateOnScroll();

  return (
    <section className="bg-ummix-gray py-16 md:py-24">
      <div
        ref={anim.ref}
        style={anim.style}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center gap-2">
            <span className="font-heading text-4xl font-bold text-ummix-red md:text-5xl">
              {stat.value}
            </span>
            <span className="font-sans text-sm text-ummix-dark md:text-base">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

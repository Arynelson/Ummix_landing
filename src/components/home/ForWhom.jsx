import { Building2, Landmark, TrendingUp } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { useLocale } from '../../LocaleProvider.jsx';
import { HOME_COPY } from '../../home-copy.js';

const lucide = (Icon) => <Icon size={28} strokeWidth={1.75} aria-hidden="true" />;
const pixel = (name) => (
  <img src={`/assets/ds/icones-pixel/${name}.svg`} alt="" aria-hidden="true" width="32" height="32" />
);

const AUDIENCES = [
  {
    id: 'anunciantes',
    title: 'Anunciantes',
    description: 'Mais eficiência, transparência e resultados para sua marca.',
    icon: lucide(Building2),
  },
  {
    id: 'agencias',
    title: 'Agências',
    description: 'Um parceiro estratégico que cuida de toda a operação de mídia.',
    icon: pixel('audiencia'),
  },
  {
    id: 'veiculos',
    title: 'Veículos',
    description: 'Relacionamento profissional, claro e de longo prazo.',
    icon: pixel('torre'),
  },
  {
    id: 'poder-publico',
    title: 'Poder Público',
    description: 'Comunicação institucional planejada para cada região e público.',
    icon: lucide(Landmark),
  },
  {
    id: 'musica',
    title: 'Bandas, cantores, duplas e escritórios musicais',
    description: 'Divulgação de lançamentos, shows e projetos para públicos locais.',
    icon: pixel('microfone'),
  },
  {
    id: 'agencias-digitais',
    title: 'Agências Digitais e Gestores de Tráfego',
    description: 'Rádio e TV para complementar estratégias e campanhas digitais.',
    icon: lucide(TrendingUp),
  },
];

export default function ForWhom() {
  const { locale } = useLocale();
  const copy = HOME_COPY[locale].forWhom;
  const anim = useAnimateOnScroll();

  return (
    <section className="bg-sunken py-20 md:py-24">
      <div ref={anim.ref} style={anim.style} className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand">
            {copy.kicker}
          </div>
          <h2 className="mt-3.5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-strong md:text-5xl">
            {copy.title}{' '}
            <span className="text-brand">{copy.accent}</span>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {AUDIENCES.map((audience, index) => (
            <div
              key={audience.id}
              className="rounded-[var(--radius-lg)] border border-line-subtle bg-card p-7 md:p-8"
            >
              <div className="grid h-14 w-14 place-items-center rounded-[var(--radius-md)] bg-accent-soft text-brand">
                {audience.icon}
              </div>
              <div className="mt-5 font-display text-[22px] font-bold text-strong">
                {copy.audiences[index][0]}
              </div>
              <p className="mt-2 font-body text-[15px] leading-[1.55] text-muted">
                {copy.audiences[index][1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

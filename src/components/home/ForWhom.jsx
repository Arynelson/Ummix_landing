import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const AUDIENCES = [
  {
    id: 'anunciantes',
    title: 'Anunciantes',
    description: 'Mais eficiência, transparência e resultados para sua marca.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="9" y1="6" x2="9" y2="6.01" />
        <line x1="15" y1="6" x2="15" y2="6.01" />
        <line x1="9" y1="10" x2="9" y2="10.01" />
        <line x1="15" y1="10" x2="15" y2="10.01" />
        <line x1="9" y1="14" x2="9" y2="14.01" />
        <line x1="15" y1="14" x2="15" y2="14.01" />
      </svg>
    ),
  },
  {
    id: 'agencias',
    title: 'Agências',
    description: 'Um parceiro estratégico que cuida de toda a operação de mídia.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'veiculos',
    title: 'Veículos',
    description: 'Relacionamento profissional, claro e de longo prazo.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <line x1="2" y1="11" x2="22" y2="11" />
      </svg>
    ),
  },
  {
    id: 'poder-publico',
    title: 'Poder Público',
    description: 'Comunicação institucional planejada para cada região e público.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M5 21V10h14v11" />
        <path d="M12 3l9 5H3l9-5z" />
        <path d="M9 14h6" />
      </svg>
    ),
  },
  {
    id: 'musica',
    title: 'Bandas, cantores, duplas e escritórios musicais',
    description: 'Divulgação de lançamentos, shows e projetos para públicos locais.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 18V5l10-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: 'agencias-digitais',
    title: 'Agências Digitais e Gestores de Tráfego',
    description: 'Mídia offline para complementar estratégias e campanhas digitais.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 2 5-6" />
        <path d="M16 7h3v3" />
      </svg>
    ),
  },
];

export default function ForWhom() {
  const anim = useAnimateOnScroll();

  return (
    <section className="bg-ummix-gray py-24 md:py-[120px]">
      <div ref={anim.ref} style={anim.style} className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-ummix-red">
            Para quem é
          </div>
          <h2 className="mt-3.5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ummix-dark md:text-5xl">
            Um ecossistema conectado.{' '}
            <span className="text-ummix-red">Resultados reais.</span>
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {AUDIENCES.map((audience) => (
            <div
              key={audience.id}
              className="rounded-[20px] border border-[#eee] bg-white p-9"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ummix-red/10 text-ummix-red">
                {audience.icon}
              </div>
              <div className="mt-5 font-heading text-[22px] font-extrabold text-ummix-dark">
                {audience.title}
              </div>
              <p className="mt-2 font-body text-[15px] font-medium leading-[1.55] text-[#666]">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

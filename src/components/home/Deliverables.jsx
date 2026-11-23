import { Eye, FileText, Settings } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { useLocale } from '../../LocaleProvider.jsx';
import { HOME_COPY } from '../../home-copy.js';

const lucide = (Icon) => <Icon size={22} strokeWidth={1.75} aria-hidden="true" />;

const DELIVERABLES = [
  {
    id: 'compra-inteligente',
    title: 'Compra inteligente',
    description: 'Melhor eficiência para o investimento.',
    // Alvo em pixel: compra certeira, eficiência do investimento.
    icon: <img src="/assets/ds/icones-pixel/alvo-branco.svg" alt="" aria-hidden="true" width="26" height="26" />,
  },
  {
    id: 'gestao-operacional',
    title: 'Gestão operacional',
    description: 'Execução precisa e centralizada.',
    icon: lucide(Settings),
  },
  {
    id: 'auditoria-independente',
    title: 'Auditoria independente',
    description: 'Transparência e segurança na entrega.',
    icon: lucide(Eye),
  },
  {
    id: 'prestacao-de-contas',
    title: 'Prestação de contas',
    description: 'Relatórios completos e confiáveis.',
    icon: lucide(FileText),
  },
];

export default function Deliverables() {
  const { locale } = useLocale();
  const copy = HOME_COPY[locale].deliverables;
  const anim = useAnimateOnScroll();

  return (
    <section data-theme="dark" className="relative overflow-hidden bg-ink-900 px-6 py-20 text-body md:px-16 md:py-28">
      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand">
            {copy.kicker}
          </div>
          <h2 className="mt-3.5 font-display text-4xl font-bold leading-tight tracking-tight text-strong md:text-5xl">
            {copy.title}
            <br />
            <span className="text-brand">{copy.accent}</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {DELIVERABLES.map((item, index) => (
            <div
              key={item.id}
              className="rounded-[var(--radius-lg)] border border-line bg-card p-7"
            >
              <div className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-accent-soft-strong text-brand">
                {item.icon}
              </div>
              <div className="mt-4 font-display text-lg font-bold text-strong">{copy.items[index][0]}</div>
              <p className="mt-2 text-left font-body text-sm leading-relaxed text-body">
                {copy.items[index][1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

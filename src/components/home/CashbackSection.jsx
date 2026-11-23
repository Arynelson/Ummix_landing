import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { Button } from '../../ds/components';
import { useLocale } from '../../LocaleProvider.jsx';
import { getLocalizedPath } from '../../LocaleProvider.jsx';
import { HOME_COPY } from '../../home-copy.js';

export default function CashbackSection() {
  const { locale } = useLocale();
  const copy = HOME_COPY[locale].cashbackSection;
  const anim = useAnimateOnScroll();

  return (
    <section data-theme="dark" className="relative overflow-hidden bg-ink-900 px-6 py-18 text-body md:px-16 md:py-24">
      {/* Espectro: grafismo oficial, à direita; o texto fica à esquerda sobre o grafite liso. */}
      <img
        src="/assets/ds/grafismo-espectro.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[60%] object-cover object-right-bottom md:block"
      />

      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-6xl">
        <div className="max-w-xl">
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand">
            {copy.kicker}
          </div>
          <h2 className="mt-3.5 font-display text-3xl font-bold leading-tight tracking-tight text-strong md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 font-body text-lg leading-relaxed text-body">
            {copy.description}
          </p>
          <Button
            href={getLocalizedPath(locale, '/cashback')}
            variant="primary"
            size="lg"
            className="mt-8"
          >
            {copy.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

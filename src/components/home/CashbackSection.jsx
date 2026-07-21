import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import ButtonLink from '../ui/ButtonLink';

export default function CashbackSection() {
  const anim = useAnimateOnScroll();

  return (
    <section className="relative overflow-hidden bg-ummix-dark px-6 py-24 text-white md:px-16 md:py-32">
      <div
        className="pointer-events-none absolute -top-[20%] left-1/2 h-[700px] w-[1000px] -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(155,25,26,.18), transparent 60%)' }}
        aria-hidden="true"
      />

      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-2xl text-center">
        <div className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ummix-red">
          Cashback Ummix
        </div>
        <h2 className="mt-3.5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
          Toda campanha fechada pela Ummix Ads gera até <span className="text-ummix-red">3% de cashback</span>
        </h2>
        <p className="mt-5 font-sans text-lg font-medium leading-relaxed text-white/70">
          Contratante, veículo e agência ficam com sua parte. Você só precisa fechar o contrato com a gente.
        </p>
        <ButtonLink
          href="/cashback.html"
          className="mt-10"
          size="xl"
        >
          Conhecer o cashback
        </ButtonLink>
      </div>
    </section>
  );
}

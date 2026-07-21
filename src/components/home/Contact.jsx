import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { PLATFORM_SIGNUP } from '../../constants/urls';
import ButtonLink from '../ui/ButtonLink';

export default function Contact() {
  const anim = useAnimateOnScroll();

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-ummix-dark px-6 pb-20 pt-32 text-white md:px-16 md:pt-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center bottom, rgba(155,25,26,.25), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-5xl text-center">
        <div className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ummix-red">
          Encerramento
        </div>

        <h2 className="mt-4.5 font-heading text-5xl font-black uppercase leading-[0.95] tracking-tight text-balance md:text-7xl">
          A mídia é o que o <span className="text-ummix-red">cliente vê.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
          O Método Ummix® é tudo o que acontece para garantir a entrega.
        </p>

        <div className="mt-10 inline-flex flex-wrap justify-center gap-3.5">
          <ButtonLink
            href="mailto:fale@ummix.com.br"
            size="lg"
          >
            Falar com a Ummix
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </ButtonLink>
          <ButtonLink
            href={PLATFORM_SIGNUP}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="outline-light"
          >
            Acessar a plataforma
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

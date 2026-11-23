import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

export default function ValueProp() {
  const anim = useAnimateOnScroll()

  return (
    <section data-theme="dark" className="py-20 md:py-28 bg-ink-900">
      <div ref={anim.ref} style={anim.style} className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-xl md:text-2xl leading-relaxed text-body">
          Entregamos sua mensagem e apresentamos seu produto ou serviço
          para as <strong className="text-strong">pessoas certas</strong> dentro
          das maiores emissoras de rádio e TV.
        </p>
      </div>
    </section>
  )
}

import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

export default function ValueProp() {
  const anim = useAnimateOnScroll()

  return (
    <section className="py-20 md:py-28 bg-white">
      <div ref={anim.ref} style={anim.style} className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-xl md:text-2xl leading-relaxed text-ummix-gray-dark">
          Entregamos sua mensagem e apresentamos seu produto ou serviço
          para as <strong className="text-ummix-dark">pessoas certas</strong> dentro
          das maiores mídias tradicionais.
        </p>
      </div>
    </section>
  )
}

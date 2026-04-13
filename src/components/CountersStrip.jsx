import { useCountUp } from '../hooks/useCountUp'

function Counter({ value, suffix = '', prefix = '', label }) {
  const { ref, count } = useCountUp(value)
  return (
    <div ref={ref} className="text-center px-4">
      <p className="text-3xl md:text-4xl font-black text-white">
        {prefix}{count}{suffix}
      </p>
      <p className="text-sm text-white/70 mt-1 font-medium">{label}</p>
    </div>
  )
}

export default function CountersStrip() {
  return (
    <section className="bg-ummix-red py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Counter value={500} suffix="+" label="Anunciantes" />
          <Counter value={3} suffix="x" label="ROI médio" />
          <Counter value={150} suffix="+" label="Veículos de mídia" />
          <Counter value={50} prefix="R$" suffix="M+" label="Mídia gerenciada" />
        </div>
      </div>
    </section>
  )
}

import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

export default function CashbackBanner() {
  const anim = useAnimateOnScroll()

  return (
    <section className="py-20 md:py-28 bg-ummix-gray">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div ref={anim.ref} style={anim.style}>
          <h2 className="text-3xl md:text-4xl font-bold text-ummix-dark mb-4">
            Toda campanha fechada pela Ummix Ads gera até 3% de cashback
          </h2>
          <p className="text-ummix-gray-dark mb-10 text-lg">
            Contratante, veículo e agência ficam com sua parte. Você só precisa fechar o contrato com a gente.
          </p>
          <a
            href="/cashback.html"
            className="inline-block bg-ummix-red hover:bg-ummix-red-dark text-white font-bold px-10 py-4 rounded-full text-base transition-all hover:scale-105 shadow-lg"
          >
            Conhecer o cashback
          </a>
        </div>
      </div>
    </section>
  )
}

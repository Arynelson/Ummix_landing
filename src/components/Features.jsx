import { motion } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { Target, BarChart3, Tv, Zap, Users, LineChart } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Impacto Real',
    description: 'Milhões de consumidores, zero desperdício. Filtre por cidade, faixa etária, renda e comportamento para veicular só onde seu cliente está.',
  },
  {
    icon: BarChart3,
    title: 'Precisão do Digital',
    description: 'Use dados de performance como no Google e Meta. Agora também nas principais rádios e TVs do Brasil.',
  },
  {
    icon: Tv,
    title: 'Os Principais Veículos',
    description: 'Jovem Pan, Alpha, SBT, Record, Band, Rede TV e mais de 200 emissoras. Sua marca nas maiores audiências do país, com inteligência de dados.',
  },
  {
    icon: Zap,
    title: 'Alta Performance',
    description: 'Nossos clientes aumentam em até 400% a eficiência ou reduzem em 50% o custo dos anúncios, sem trocar de veículo.',
  },
  {
    icon: Users,
    title: 'Segmentação Inteligente',
    description: 'Dados de comportamento, localização e renda de milhões de brasileiros. Sua mensagem vai para quem tem perfil para comprar, no canal e horário certos.',
  },
  {
    icon: LineChart,
    title: 'Resultados Mensuráveis',
    description: 'Pare de adivinhar o ROI de TV e rádio. Nossa tecnologia rastreia alcance, frequência e conversões em tempo real, em qualquer emissora.',
  },
]

export default function Features() {
  const anim = useAnimateOnScroll()

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-ummix-dark">
      <div className="max-w-7xl mx-auto px-6">

        <div ref={anim.ref} style={anim.style} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl md:text-2xl leading-relaxed text-white/80">
            Alcance de TV e rádio, controle de digital.{' '}
            <strong className="text-white">Seu anúncio chega a quem importa</strong>{' '}
            e você vê os números.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="rounded-2xl p-8 border border-transparent hover:border-white/20 transition-all duration-300 hover:-translate-y-2 group text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-14 h-14 bg-ummix-red/20 rounded-xl flex items-center justify-center mb-5 mx-auto group-hover:bg-ummix-red/30 transition-colors">
                <feat.icon className="w-7 h-7 text-ummix-red" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-white/65 leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

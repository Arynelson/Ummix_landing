import { motion } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { Target, BarChart3, Tv, Zap, Users, LineChart } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Impacto Real',
    description: 'Alcance milhões de pessoas com campanhas que geram resultados mensuráveis e tangíveis.',
  },
  {
    icon: BarChart3,
    title: 'Precisão do Digital',
    description: 'Aplique a inteligência do digital na mídia offline com segmentação avançada.',
  },
  {
    icon: Tv,
    title: 'Os Principais Veículos',
    description: 'Acesso direto às maiores emissoras de TV, rádio e mídia OOH do Brasil.',
  },
  {
    icon: Zap,
    title: 'Alta Performance',
    description: 'Otimização contínua de campanhas com dados em tempo real e machine learning.',
  },
  {
    icon: Users,
    title: 'Segmentação Inteligente',
    description: 'Encontre seu público ideal com segmentação demográfica, geográfica e comportamental.',
  },
  {
    icon: LineChart,
    title: 'Mensuração Inovadora',
    description: 'Dashboards em tempo real com atribuição multicanal e métricas de conversão.',
  },
]

export default function Features() {
  const anim = useAnimateOnScroll()

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-ummix-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={anim.ref} style={anim.style} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ummix-dark mb-4">
            Nossas Soluções
          </h2>
          <p className="text-ummix-gray-dark max-w-2xl mx-auto">
            Tecnologia de ponta para transformar mídia tradicional em performance mensurável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-14 h-14 bg-ummix-red/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-ummix-red/20 transition-colors">
                <feat.icon className="w-7 h-7 text-ummix-red" />
              </div>
              <h3 className="text-xl font-bold text-ummix-dark mb-3">{feat.title}</h3>
              <p className="text-ummix-gray-dark leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

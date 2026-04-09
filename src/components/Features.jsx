import { motion } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { Target, BarChart3, Tv, Zap, Users, LineChart } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Impacto Real',
    description: 'Acesse milhões de consumidores, filtrando por geolocalização, faixa etária, renda, interesses e até posicionamento político, garantindo anúncios mais eficientes e relevantes.',
  },
  {
    icon: BarChart3,
    title: 'Precisão do Digital',
    description: 'Anuncie em mídia exterior, jornais, rádios e TVs utilizando dados de performance e segmentação de ponta, garantindo que cada real investido gere mais impacto e conversões.',
  },
  {
    icon: Tv,
    title: 'Os Principais Veículos',
    description: 'Sua marca presente nas maiores rádios e TVs do país, como Jovem Pan, Alpha, SBT, Record, Band, Rede TV e muito mais, tudo com inteligência de dados e otimização em tempo real.',
  },
  {
    icon: Zap,
    title: 'Alta Performance',
    description: 'Aumente em 400% a eficiência ou reduza em 50% o custo dos seus anúncios nos principais veículos de rádio, TV e mídia impressa com tecnologia baseada em dados.',
  },
  {
    icon: Users,
    title: 'Segmentação Inteligente',
    description: 'Milhões de pessoas mapeadas com segmentação avançada por geolocalização, interesses, ocupação, renda, comportamento de consumo e muito mais. Alcance o público certo, no momento certo.',
  },
  {
    icon: LineChart,
    title: 'Resultados Mensuráveis',
    description: 'Com a UmMixAds, você tem acesso a métricas precisas mesmo em mídia tradicional. Acompanhe em tempo real o alcance, impacto e retorno de suas campanhas em rádio, TV e mídia impressa através de nossa tecnologia exclusiva de mensuração.',
  },
]

export default function Features() {
  const anim = useAnimateOnScroll()

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-ummix-dark">
      <div className="max-w-7xl mx-auto px-6">

        <div ref={anim.ref} style={anim.style} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl md:text-2xl leading-relaxed text-white/80">
            Entregamos sua mensagem e apresentamos seu produto ou serviço
            para as <strong className="text-white">pessoas certas</strong> dentro
            das maiores mídias tradicionais.
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

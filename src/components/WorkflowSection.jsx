import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Headphones, Database, Settings, Megaphone, Filter, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: Headphones,
    title: 'Pesquisa com o Público',
    description: 'Entendemos quem é o seu cliente ideal',
  },
  {
    icon: Database,
    title: 'Base de Dados',
    description: 'Dados qualificados para segmentação precisa',
  },
  {
    icon: Settings,
    title: 'Método Ummix',
    description: 'Nossa metodologia proprietária de mídia',
  },
  {
    icon: Megaphone,
    title: 'Criação de Campanha',
    description: 'Campanhas personalizadas para cada canal',
  },
  {
    icon: Filter,
    title: 'Leads Qualificados',
    description: 'Audiência filtrada e pronta para converter',
  },
  {
    icon: TrendingUp,
    title: 'Resultados',
    description: 'Marca, autoridade e vendas mensuráveis',
  },
]

export default function WorkflowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 md:py-28 bg-ummix-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Anunciar na Rádio e TV com a Ummix
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Um processo inteligente do briefing até os resultados
          </p>
        </motion.div>

        {/* Steps — desktop: horizontal row, mobile: 2-col grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:items-stretch gap-2">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === steps.length - 1

            const isFirst = i === 0
            const clipPath = isFirst
              ? 'polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)'
              : isLast
              ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 18px 50%)'
              : 'polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%)'

            return (
              <motion.div
                key={step.title}
                className="relative flex-1 min-w-0"
                initial={{ opacity: 0, x: 120, scale: 0.82 }}
                animate={isInView
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: 120, scale: 0.82 }}
                transition={{
                  type: 'spring',
                  stiffness: 55,
                  damping: 14,
                  delay: i * 0.25,
                }}
              >
                {/* Arrow card */}
                <div
                  className="relative h-full bg-ummix-red/15 hover:bg-ummix-red/25 border border-ummix-red/30 hover:border-ummix-red/60 transition-all duration-300 group cursor-default"
                  style={{ clipPath }}
                >
                  <div className="px-6 py-8 text-center flex flex-col items-center gap-3 h-full">
                    {/* Step number */}
                    <span className="text-xs font-bold text-ummix-red/60 tracking-widest uppercase">
                      0{i + 1}
                    </span>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-ummix-red/20 flex items-center justify-center group-hover:bg-ummix-red/35 transition-colors">
                      <Icon className="w-6 h-6 text-ummix-red" />
                    </div>

                    {/* Text */}
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Triple chevron connector (desktop only) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3.5 z-10 items-center gap-0.5">
                    {[0, 1, 2].map(j => (
                      <svg key={j} width="8" height="14" viewBox="0 0 8 14" fill="none">
                        <polyline
                          points="1,1 7,7 1,13"
                          stroke="rgb(220 38 38)"
                          strokeOpacity={0.35 + j * 0.25}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

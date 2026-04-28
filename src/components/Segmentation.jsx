import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const tabs = {
  'Geográfico': ['Estado', 'Cidade', 'Região', 'Bairro', 'Raio de Cobertura', 'Cidade de Nascimento', 'Estado de Nascimento'],
  'Demográfico': ['Idade', 'Sexo', 'Escolaridade', 'Ocupação', 'Renda Familiar', 'Possui Filhos', 'Mobilidade'],
  'Comportamento': ['Estilo de Vida', 'Atividades Físicas', 'Pets', 'Agronegócio', 'Conteúdo de Interesse', 'Consumo de Mídia', 'Meio', 'Dia', 'Horário'],
  'Intenções': ['Viagem', 'Eletrônicos', 'Automóveis', 'Imóveis', 'Reforma/Construção', 'Investimentos', 'Cursos', 'Procedimentos Estéticos'],
  'Opinião e Perfil': ['Posição Política', 'Aprovação de Gestões', 'Restrições Financeiras', 'Energia Residencial', 'Plano de Saúde', 'Seguros'],
}

const tabKeys = Object.keys(tabs)

export default function Segmentation() {
  const [active, setActive] = useState(tabKeys[0])
  const anim = useAnimateOnScroll()

  return (
    <section id="segmentacoes" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div ref={anim.ref} style={anim.style} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ummix-dark mb-4">
            Segmentações Disponíveis
          </h2>
          <p className="text-ummix-gray-dark max-w-xl mx-auto">
            Mais de 30 critérios, do bairro ao estilo de vida.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabKeys.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                active === tab
                  ? 'bg-ummix-red text-white shadow-lg'
                  : 'bg-ummix-gray text-ummix-gray-dark hover:bg-ummix-red/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tags */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {tabs[active].map((tag, i) => (
              <motion.span
                key={tag}
                className="px-5 py-2.5 bg-ummix-gray rounded-full text-sm font-medium text-ummix-dark border border-gray-200 hover:border-ummix-red hover:text-ummix-red transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'Antes, anunciar em rádio e TV era um tiro no escuro. Com a Ummix ads, conseguimos segmentar nossa campanha e aumentar o retorno sobre o investimento.',
    author: 'Gerente de Marketing',
    company: 'Cliente Ummix Ads',
  },
]

export default function Testimonials() {
  const anim = useAnimateOnScroll()

  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-ummix-red">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={anim.ref} style={anim.style}>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Anunciantes que confiam na Ummix
          </h2>
          <p className="text-white/70 text-center mb-14">
            O que nossos clientes dizem sobre a Ummix Ads
          </p>

          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-10 md:p-14 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Quote className="w-10 h-10 text-ummix-red/30 mb-6" />
              <blockquote className="text-lg md:text-xl text-ummix-dark leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>
              <div>
                <p className="font-bold text-ummix-dark">{t.author}</p>
                <p className="text-sm text-ummix-gray-dark">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

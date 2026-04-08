import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { Send } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const anim = useAnimateOnScroll()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contato" className="py-20 md:py-28 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div ref={anim.ref} style={anim.style}>
          <h2 className="text-3xl md:text-4xl font-bold text-ummix-dark text-center mb-4">
            Fale com um especialista
          </h2>
          <p className="text-ummix-gray-dark text-center mb-12">
            Descubra como a Ummix pode potencializar suas campanhas.
          </p>

          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                placeholder="E-mail corporativo"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-ummix-red focus:ring-2 focus:ring-ummix-red/20 outline-none transition-all text-ummix-dark"
              />
              <input
                type="text"
                placeholder="Empresa"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-ummix-red focus:ring-2 focus:ring-ummix-red/20 outline-none transition-all text-ummix-dark"
              />
              <select
                required
                defaultValue=""
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-ummix-red focus:ring-2 focus:ring-ummix-red/20 outline-none transition-all text-ummix-dark"
              >
                <option value="" disabled>Volume de investimento estimado</option>
                <option>Até R$ 10.000/mês</option>
                <option>R$ 10.000 - R$ 50.000/mês</option>
                <option>R$ 50.000 - R$ 200.000/mês</option>
                <option>Acima de R$ 200.000/mês</option>
              </select>
              <button
                type="submit"
                className="w-full bg-ummix-red hover:bg-ummix-red-dark text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-5 h-5" />
                Quero saber mais
              </button>
            </motion.form>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-ummix-dark mb-2">Obrigado!</h3>
              <p className="text-ummix-gray-dark">
                Nosso time entrará em contato em breve.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

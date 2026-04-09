import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote: 'Antes, anunciar em rádio e TV era um tiro no escuro. Com a Ummix Ads, conseguimos segmentar nossa campanha e aumentar o retorno sobre o investimento em mais de 3x.',
    author: 'Gerente de Marketing',
    company: 'Cliente Ummix Ads',
  },
  {
    quote: 'A precisão de segmentação que a Ummix oferece em mídia tradicional é impressionante. Conseguimos atingir exatamente o público que queríamos e reduzimos nosso custo por aquisição em 40%.',
    author: 'Diretor Comercial',
    company: 'Cliente Ummix Ads',
  },
  {
    quote: 'Nunca imaginei que seria possível ter dashboards em tempo real para campanhas de TV e rádio. A Ummix mudou completamente a forma como gerenciamos nossa verba de mídia.',
    author: 'CEO',
    company: 'Cliente Ummix Ads',
  },
]

const INTERVAL = 5000

export default function Testimonials() {
  const anim = useAnimateOnScroll()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const go = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % testimonials.length)
  }

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

          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl"
              >
                <Quote className="w-10 h-10 text-ummix-red/30 mb-6" />
                <blockquote className="text-lg md:text-xl text-ummix-dark leading-relaxed mb-8">
                  "{testimonials[current].quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-ummix-dark">{testimonials[current].author}</p>
                  <p className="text-sm text-ummix-gray-dark">{testimonials[current].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next */}
            <button
              onClick={prev}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Ir para depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

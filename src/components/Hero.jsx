import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/img_bg_hero.jpg')" }}
      />
      {/* Red Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-ummix-red/85 to-ummix-dark/80" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          MÍDIA INTELIGENTE{' '}
          <br className="hidden md:block" />
          NOS VEÍCULOS DE MASSA
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Anuncie nas maiores emissoras e canais do país com a precisão
          do digital. Segmentação, mensuração e performance em mídia offline.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#contato"
            className="bg-white text-ummix-red font-bold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
          >
            Começar agora
          </a>
          <a
            href="#solucoes"
            className="border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
          >
            Saiba mais
          </a>
        </motion.div>

        {/* Play Button */}
        <motion.button
          className="group mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur border-2 border-white/40 hover:bg-white/30 transition-all hover:scale-110"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          aria-label="Assistir vídeo"
        >
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

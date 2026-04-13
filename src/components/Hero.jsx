import { motion } from 'framer-motion'
import BrowserFrame from './BrowserFrame'
import { PLATFORM_SIGNUP, PLATFORM_LOGIN } from '../constants/urls'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/img_bg_hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-ummix-red/85 to-ummix-dark/90" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — copy */}
          <div className="flex-1 text-white text-center lg:text-left">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              MÍDIA INTELIGENTE{' '}
              <br className="hidden md:block" />
              NOS VEÍCULOS DE MASSA
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Anuncie nas maiores emissoras e canais do país com a precisão
              do digital. Segmentação, mensuração e performance em mídia offline.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href={PLATFORM_SIGNUP}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-ummix-red font-bold px-8 py-3 rounded-full text-base hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
              >
                Criar conta grátis
              </a>
              <a
                href={PLATFORM_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-full text-base hover:bg-white/10 transition-all"
              >
                Entrar
              </a>
            </motion.div>
          </div>

          {/* Right — platform screenshot */}
          <motion.div
            className="flex-1 w-full max-w-xl lg:max-w-none"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <BrowserFrame />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
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

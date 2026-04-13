import { motion } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { PLATFORM_SIGNUP, PLATFORM_LOGIN } from '../constants/urls'

export default function PlatformAccess() {
  const anim = useAnimateOnScroll()

  return (
    <section id="acesso" className="py-20 md:py-28 bg-ummix-dark">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div ref={anim.ref} style={anim.style}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-white/70 mb-10 text-lg">
            Acesse a plataforma e crie sua primeira campanha hoje.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href={PLATFORM_SIGNUP}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-ummix-red hover:bg-ummix-red-dark text-white font-bold px-10 py-4 rounded-full text-base transition-all hover:scale-105 shadow-lg"
            >
              Criar conta grátis
            </a>
            <a
              href={PLATFORM_LOGIN}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border-2 border-white/40 text-white font-semibold px-10 py-4 rounded-full text-base hover:bg-white/10 transition-all"
            >
              Já tenho conta — Entrar
            </a>
          </motion.div>

          <p className="mt-8 text-sm text-white/40">
            Dúvidas?{' '}
            <a
              href="mailto:fale@ummixads.com.br"
              className="underline hover:text-white/70 transition-colors"
            >
              fale@ummixads.com.br
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

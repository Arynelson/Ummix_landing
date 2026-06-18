import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import BrowserFrame from './BrowserFrame'
import { PLATFORM_SIGNUP, PLATFORM_LOGIN } from '../constants/urls'

const AWARDS = [
  {
    id: 'cni',
    src: '/assets/cni_premio_inovacao.jpg',
    alt: 'Prêmio Nacional de Inovação',
    label: 'Vencedor · Prêmio Nacional de Inovação · CNI/SEBRAE',
    href: 'https://www.premiodeinovacao.com.br/vencedores/',
  },
  {
    id: 'abdi',
    src: '/assets/Logo_ABDI_Principal .png',
    alt: 'ABDI - Desafio Nacional de Inovação',
    label: 'Top 4 ideias mais inovadoras do Brasil · ABDI',
    href: 'https://curicaca.abdi.com.br/',
  },
  {
    id: 'go-ecommerce',
    src: '/assets/Selo_GO+E-commerce.png',
    alt: 'Certificação GO E-commerce',
    label: 'Certificação GO E-commerce',
    href: 'https://comunicacao.ielgoias.com.br/go-ecommerce',
  },
]

function AwardsCard() {
  const [activeId, setActiveId] = useState(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!activeId) return
    const handlePointerDown = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setActiveId(null)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [activeId])

  const handleLogoClick = (e, award) => {
    // On touch devices there's no hover, so the first tap only reveals
    // the tooltip; a second tap on an already-active logo navigates.
    if (activeId !== award.id) {
      e.preventDefault()
      e.stopPropagation()
      setActiveId(award.id)
    }
  }

  return (
    <div ref={cardRef} className="inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/25 rounded-full px-4 py-2">
      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/70 whitespace-nowrap">
        Prêmios e Certificações
      </span>
      <div className="flex items-center gap-2">
        {AWARDS.map((award) => (
          <div key={award.id} className="relative">
            {activeId === award.id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] px-3 py-2 rounded-lg bg-ummix-dark border border-white/15 text-[11px] leading-snug text-white text-center shadow-lg pointer-events-none z-20">
                {award.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-ummix-dark border-r border-b border-white/15 rotate-45 -mt-1" />
              </div>
            )}
            <a
              href={award.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveId(award.id)}
              onMouseLeave={() => setActiveId((current) => (current === award.id ? null : current))}
              onClick={(e) => handleLogoClick(e, award)}
              aria-label={award.label}
              className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-lg bg-white p-1.5 transition-transform hover:scale-105 cursor-pointer"
            >
              <img
                src={award.src}
                alt={award.alt}
                className="max-w-full max-h-full object-contain"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ummix-dark">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Primary glow — left, behind copy */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 20% 50%, rgba(155,25,26,0.45) 0%, transparent 70%)',
        }}
      />
      {/* Secondary glow — top right, adds depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 85% 10%, rgba(155,25,26,0.18) 0%, transparent 60%)',
        }}
      />
      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ummix-dark to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — copy */}
          <div className="flex-1 text-white text-center lg:text-left">

            {/* Award badges */}
            <motion.div
              className="flex justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <AwardsCard />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              MÍDIA OFF.{' '}
              <br className="hidden md:block" />
              INTELIGÊNCIA ON.
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Anuncie em centenas de rádios e TVs. Filtre por localização,
              renda e comportamento, e veja o que cada veiculação gera.
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
      {/* <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </motion.div> */}
    </section>
  )
}

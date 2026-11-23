import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import BrowserFrame from './BrowserFrame'
import { Button } from '../ds/components'
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
    href: 'https://prosas.com.br/editais/16002-desafio-de-inovacao-festival-curicaca?subdominio=prosas',
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
    <div ref={cardRef} className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-card border border-line rounded-[var(--radius-lg)] px-4 py-2">
      <span className="font-mono text-[10px] md:text-xs font-medium tracking-[0.08em] uppercase text-muted whitespace-nowrap">
        Prêmios e Certificações
      </span>
      <div className="flex items-center gap-2">
        {AWARDS.map((award) => (
          <div key={award.id} className="relative">
            {activeId === award.id && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[220px] px-3 py-2 rounded-[var(--radius-md)] bg-card border border-line text-[11px] leading-snug text-strong text-center shadow-[var(--shadow-md)] pointer-events-none z-20">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-l border-t border-line rotate-45 -mb-1" />
                {award.label}
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
              className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-[var(--radius-md)] bg-white p-1.5 transition-transform hover:scale-105 cursor-pointer"
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
    <section data-theme="dark" className="relative min-h-screen flex items-center overflow-hidden bg-ink-900">
      {/* Grafismo Espectro: base da seção, sob grafite liso */}
      <img
        src="/assets/ds/grafismo-espectro.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full object-cover object-right"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — copy */}
          <div className="flex-1 text-strong text-center lg:text-left">

            {/* Award badges */}
            <motion.div
              className="flex justify-start mb-8"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <AwardsCard />
            </motion.div>

            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              RÁDIO E TV{' '}
              <br className="hidden md:block" />
              COM DADOS.
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-body max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
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
              <Button href={PLATFORM_SIGNUP} target="_blank" variant="primary" size="lg">
                Criar conta grátis
              </Button>
              <Button href={PLATFORM_LOGIN} target="_blank" variant="secondary" size="lg">
                Entrar
              </Button>
            </motion.div>
          </div>

          {/* Right — platform screenshot */}
          <motion.div
            className="flex-1 w-full max-w-xl lg:max-w-none"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <BrowserFrame />
          </motion.div>

        </div>
      </div>

    </section>
  )
}

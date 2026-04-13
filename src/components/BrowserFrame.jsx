// src/components/BrowserFrame.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DEFAULT_IMAGES = [
  { src: '/assets/platform-preview-dashboard.png', alt: 'Dashboard' },
  { src: '/assets/platform-preview-campanha.png', alt: 'Criar Campanha' },
  { src: '/assets/platform-preview-minhascampanhas.png', alt: 'Minhas Campanhas' },
  { src: '/assets/platform-preview-resumo.png', alt: 'Resumo' },
]

export default function BrowserFrame({ images = DEFAULT_IMAGES }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      {/* Browser chrome */}
      <div className="bg-[#1e1e1e] px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 bg-[#2a2a2a] rounded-md px-3 py-1 text-xs text-white/40 font-mono truncate">
          app.ummixads.com.br
        </div>
      </div>

      {/* Screenshot area */}
      <div className="relative bg-ummix-dark overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].alt}
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {/* Bottom fade mask */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ummix-dark to-transparent pointer-events-none z-10" />

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'
              }`}
              aria-label={`Screenshot ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

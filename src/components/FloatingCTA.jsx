import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PLATFORM_SIGNUP } from '../constants/urls'
import { ArrowRight } from 'lucide-react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight
      const accessSection = document.getElementById('acesso')
      const accessTop = accessSection ? accessSection.getBoundingClientRect().top : Infinity
      setVisible(window.scrollY > heroHeight && accessTop > 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href={PLATFORM_SIGNUP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-ummix-red hover:bg-ummix-red-dark text-white font-bold px-6 py-3 rounded-full shadow-2xl transition-all hover:scale-105"
          >
            Criar conta grátis
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

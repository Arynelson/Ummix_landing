import { useState, useEffect } from 'react'
import { PLATFORM_SIGNUP } from '../constants/urls'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/assets/logo-ummix-ads.png" alt="Ummix Ads" className={`h-10 transition-all ${
            scrolled ? 'opacity-100' : 'brightness-0 invert'
          }`} />
        </a>

        <a
          href={PLATFORM_SIGNUP}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ummix-red hover:bg-ummix-red-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
        >
          Plataforma Ummix Ads
        </a>
      </div>
    </header>
  )
}

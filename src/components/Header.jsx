import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Segmentações', href: '#segmentacoes' },
  { label: 'Veículos', href: '#veiculos' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
          <span className={`text-2xl font-black tracking-tight transition-colors ${
            scrolled ? 'text-ummix-dark' : 'text-white'
          }`}>
            ummix<span className="text-ummix-red">ads</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-ummix-red ${
                scrolled ? 'text-ummix-gray-dark' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-ummix-red hover:bg-ummix-red-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          >
            Falar com especialista
          </a>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className={`block w-6 h-0.5 transition-all ${
                scrolled ? 'bg-ummix-dark' : 'bg-white'
              }`}
            />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-3">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-ummix-gray-dark hover:text-ummix-red"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="block bg-ummix-red text-white text-center px-6 py-2.5 rounded-lg text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Falar com especialista
          </a>
        </div>
      )}
    </header>
  )
}

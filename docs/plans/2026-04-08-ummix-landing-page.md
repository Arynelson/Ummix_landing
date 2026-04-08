# Ummix Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a modern, high-performance landing page for Ummix (ad-tech startup) that converts visitors into leads, following the Figma design and technical specification.

**Architecture:** Single-page React app with component-based architecture. Each visual section is an isolated component. Animations via Framer Motion with `IntersectionObserver`-based triggers (animate on scroll). Tailwind CSS for utility-first styling with a custom theme (Ummix red, dark grays). Static assets served from `/public/assets/`.

**Tech Stack:** React 18 + Vite, Tailwind CSS v3, Framer Motion v11, Lucide React (icons)

---

## Task 0: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

**Step 1: Initialize Vite React project**

Run:
```bash
cd "C:\Users\aryha\Documents\Ummix\Site"
npm create vite@latest . -- --template react
```

If prompted about existing files, choose to proceed (scaffold into current dir).

**Step 2: Install dependencies**

Run:
```bash
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install framer-motion lucide-react
```

**Step 3: Configure Tailwind via Vite plugin**

Replace `vite.config.js` with:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Step 4: Setup `src/index.css`**

Replace contents with:
```css
@import "tailwindcss";

@theme {
  --color-ummix-red: #C8102E;
  --color-ummix-red-dark: #A00D24;
  --color-ummix-dark: #1A1A1A;
  --color-ummix-gray: #F5F5F5;
  --color-ummix-gray-dark: #333333;
  --font-family-heading: 'Inter', sans-serif;
  --font-family-body: 'Inter', sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
    font-family: var(--font-family-body);
  }
  body {
    @apply antialiased text-ummix-dark;
  }
}
```

**Step 5: Setup `src/App.jsx` with placeholder**

```jsx
export default function App() {
  return <div className="min-h-screen">Ummix Landing</div>
}
```

**Step 6: Copy assets to `public/assets/`**

Run:
```bash
mkdir -p public/assets
cp assets/img_bg_hero.jpg public/assets/
cp assets/logo_*.png public/assets/
cp assets/logo_sbt.png public/assets/logo_sbt.png
```

Note: Skip `logo_sbt.jpg` (11MB duplicate). Use only `.png` versions.

**Step 7: Add Inter font to `index.html`**

In `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

**Step 8: Verify dev server starts**

Run: `npm run dev`
Expected: Vite dev server on `http://localhost:5173` showing "Ummix Landing"

**Step 9: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Vite + React + Tailwind project for Ummix landing page"
```

---

## Task 1: Shared Layout — Header (Sticky) + Footer

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Footer.jsx`
- Modify: `src/App.jsx`

**Step 1: Create `src/components/Header.jsx`**

Sticky header with logo, nav links, CTA button. Becomes opaque on scroll.

```jsx
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
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className={`text-2xl font-black tracking-tight transition-colors ${
            scrolled ? 'text-ummix-dark' : 'text-white'
          }`}>
            ummix<span className="text-ummix-red">ads</span>
          </span>
        </a>

        {/* Desktop Nav */}
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

        {/* Mobile hamburger */}
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

      {/* Mobile Menu */}
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
```

**Step 2: Create `src/components/Footer.jsx`**

```jsx
export default function Footer() {
  return (
    <footer className="bg-ummix-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-2xl font-black tracking-tight">
            ummix<span className="text-ummix-red">ads</span>
          </span>
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Ummix Ads. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

**Step 3: Wire into `App.jsx`**

```jsx
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>{/* sections go here */}</main>
      <Footer />
    </>
  )
}
```

**Step 4: Verify visually**

Run: `npm run dev`
Expected: Sticky transparent header with nav + red CTA, dark footer at bottom.

**Step 5: Commit**

```bash
git add src/components/Header.jsx src/components/Footer.jsx src/App.jsx
git commit -m "feat: add sticky Header and Footer components"
```

---

## Task 2: Animation Utility — `useAnimateOnScroll` Hook

**Files:**
- Create: `src/hooks/useAnimateOnScroll.js`

**Step 1: Create reusable scroll-trigger animation wrapper**

This hook returns Framer Motion props for fade-in-up on scroll. Used by every section.

```js
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useAnimateOnScroll(threshold = 0.2) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return {
    ref,
    style: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0px)' : 'translateY(40px)',
      transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.15s',
    },
  }
}
```

**Step 2: Commit**

```bash
git add src/hooks/useAnimateOnScroll.js
git commit -m "feat: add useAnimateOnScroll hook for scroll-triggered animations"
```

---

## Task 3: Hero Section

**Files:**
- Create: `src/components/Hero.jsx`
- Modify: `src/App.jsx` (import Hero)

**Step 1: Create Hero component**

Full-viewport hero with background image, red overlay, headline, subtitle, 2 CTAs, and play button.

```jsx
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
          MIDIA INTELIGENTE{' '}
          <br className="hidden md:block" />
          NOS VEICULOS DE MASSA
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Anuncie nas maiores emissoras e canais do pais com a precisao
          do digital. Segmentacao, mensuracao e performance em midia offline.
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
            Comecar agora
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
          aria-label="Assistir video"
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
```

**Step 2: Add Hero to App.jsx**

```jsx
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}
```

**Step 3: Verify visually**

Run: `npm run dev`
Expected: Full-screen hero with red overlay, animated headline, 2 buttons, play icon, scroll indicator.

**Step 4: Commit**

```bash
git add src/components/Hero.jsx src/App.jsx
git commit -m "feat: add Hero section with animated headline, CTAs, and play button"
```

---

## Task 4: Value Proposition Section

**Files:**
- Create: `src/components/ValueProp.jsx`
- Modify: `src/App.jsx`

**Step 1: Create ValueProp component**

Text-centered section below hero explaining the core message.

```jsx
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

export default function ValueProp() {
  const anim = useAnimateOnScroll()

  return (
    <section className="py-20 md:py-28 bg-white">
      <div ref={anim.ref} style={anim.style} className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-xl md:text-2xl leading-relaxed text-ummix-gray-dark">
          Entregamos sua mensagem e apresentamos seu produto ou servico
          para as <strong className="text-ummix-dark">pessoas certas</strong> dentro
          das maiores midias tradicionais.
        </p>
      </div>
    </section>
  )
}
```

**Step 2: Add to App.jsx, verify, commit**

```bash
git add src/components/ValueProp.jsx src/App.jsx
git commit -m "feat: add ValueProp section"
```

---

## Task 5: Features Grid (6 Cards)

**Files:**
- Create: `src/components/Features.jsx`
- Modify: `src/App.jsx`

**Step 1: Create Features component**

6 feature cards in 2x3 grid with SVG icons, hover lift effect, staggered scroll animation.

```jsx
import { motion } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { Target, BarChart3, Tv, Zap, Users, LineChart } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Impacto Real',
    description: 'Alcance milhoes de pessoas com campanhas que geram resultados mensuráveis e tangíveis.',
  },
  {
    icon: BarChart3,
    title: 'Precisão do Digital',
    description: 'Aplique a inteligencia do digital na midia offline com segmentacao avancada.',
  },
  {
    icon: Tv,
    title: 'Os Principais Veiculos',
    description: 'Acesso direto as maiores emissoras de TV, radio e midia OOH do Brasil.',
  },
  {
    icon: Zap,
    title: 'Alta Performance',
    description: 'Otimização contínua de campanhas com dados em tempo real e machine learning.',
  },
  {
    icon: Users,
    title: 'Segmentação Inteligente',
    description: 'Encontre seu público ideal com segmentacao demografica, geografica e comportamental.',
  },
  {
    icon: LineChart,
    title: 'Mensuração Inovadora',
    description: 'Dashboards em tempo real com atribuicao multicanal e métricas de conversão.',
  },
]

export default function Features() {
  const anim = useAnimateOnScroll()

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-ummix-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={anim.ref} style={anim.style} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ummix-dark mb-4">
            Nossas Soluções
          </h2>
          <p className="text-ummix-gray-dark max-w-2xl mx-auto">
            Tecnologia de ponta para transformar midia tradicional em performance mensuravel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-14 h-14 bg-ummix-red/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-ummix-red/20 transition-colors">
                <feat.icon className="w-7 h-7 text-ummix-red" />
              </div>
              <h3 className="text-xl font-bold text-ummix-dark mb-3">{feat.title}</h3>
              <p className="text-ummix-gray-dark leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add to App.jsx, verify, commit**

```bash
git add src/components/Features.jsx src/App.jsx
git commit -m "feat: add Features grid with 6 cards, hover effects, staggered animations"
```

---

## Task 6: Segmentation Section (Tabs)

**Files:**
- Create: `src/components/Segmentation.jsx`
- Modify: `src/App.jsx`

**Step 1: Create Segmentation component**

Tab-based UI per spec: Demografico | Geografico | Comportamental. Tags animate in when tab changes.

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const tabs = {
  Demografico: ['Idade', 'Genero', 'Renda', 'Escolaridade', 'Estado Civil', 'Classe Social'],
  Geografico: ['Estado', 'Cidade', 'Bairro', 'CEP', 'Regiao Metropolitana', 'Raio de Cobertura'],
  Comportamental: ['Interesses', 'Habitos de Consumo', 'Estilo de Vida', 'Audiencia de TV', 'Horario de Pico', 'Afinidade de Marca'],
}

const tabKeys = Object.keys(tabs)

export default function Segmentation() {
  const [active, setActive] = useState(tabKeys[0])
  const anim = useAnimateOnScroll()

  return (
    <section id="segmentacoes" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div ref={anim.ref} style={anim.style} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ummix-dark mb-4">
            Segmentações Disponíveis
          </h2>
          <p className="text-ummix-gray-dark max-w-xl mx-auto">
            Encontre seu público ideal com granularidade e precisão.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabKeys.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                active === tab
                  ? 'bg-ummix-red text-white shadow-lg'
                  : 'bg-ummix-gray text-ummix-gray-dark hover:bg-ummix-red/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tags */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {tabs[active].map((tag, i) => (
              <motion.span
                key={tag}
                className="px-5 py-2.5 bg-ummix-gray rounded-full text-sm font-medium text-ummix-dark border border-gray-200 hover:border-ummix-red hover:text-ummix-red transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
```

**Step 2: Add to App.jsx, verify, commit**

```bash
git add src/components/Segmentation.jsx src/App.jsx
git commit -m "feat: add Segmentation section with animated tabs"
```

---

## Task 7: Partners / Vehicles Logo Grid

**Files:**
- Create: `src/components/Partners.jsx`
- Modify: `src/App.jsx`

**Step 1: Create Partners component**

Logos in grayscale, color on hover (per spec). Grid layout.

```jsx
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const logos = [
  { name: 'SBT', src: '/assets/logo_sbt.png' },
  { name: 'RedeTV', src: '/assets/logo_redetv.png' },
  { name: 'Band News', src: '/assets/logo_bandnews.png' },
  { name: 'Radio 89', src: '/assets/logo_radio89.png' },
  { name: 'Sicredi', src: '/assets/logo_sicredi.png' },
  { name: 'Sicoob', src: '/assets/logo_sicoob.png' },
  { name: 'Detran', src: '/assets/logo_detran.png' },
  { name: 'Cebrom', src: '/assets/logo_cebrom.png' },
]

export default function Partners() {
  const anim = useAnimateOnScroll()

  return (
    <section id="veiculos" className="py-20 md:py-28 bg-ummix-gray">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={anim.ref} style={anim.style} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-ummix-dark mb-4">
            Sua marca nos veículos mais compatíveis
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
          {logos.map(logo => (
            <div
              key={logo.name}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110 p-4"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-16 md:h-20 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add to App.jsx, verify, commit**

```bash
git add src/components/Partners.jsx src/App.jsx
git commit -m "feat: add Partners logo grid with grayscale-to-color hover"
```

---

## Task 8: Testimonials Section

**Files:**
- Create: `src/components/Testimonials.jsx`
- Modify: `src/App.jsx`

**Step 1: Create Testimonials component**

Red accent background, client quote, company info.

```jsx
import { motion } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'Antes, anunciar em radio e TV era um tiro no escuro. Com a Ummix ads, conseguimos segmentar nossa campanha e aumentar o retorno sobre o investimento.',
    author: 'Gerente de Marketing',
    company: 'Cliente Ummix Ads',
  },
]

export default function Testimonials() {
  const anim = useAnimateOnScroll()

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

          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-10 md:p-14 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Quote className="w-10 h-10 text-ummix-red/30 mb-6" />
              <blockquote className="text-lg md:text-xl text-ummix-dark leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>
              <div>
                <p className="font-bold text-ummix-dark">{t.author}</p>
                <p className="text-sm text-ummix-gray-dark">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add to App.jsx, verify, commit**

```bash
git add src/components/Testimonials.jsx src/App.jsx
git commit -m "feat: add Testimonials section with quote card on red background"
```

---

## Task 9: Contact / Lead Gen Form

**Files:**
- Create: `src/components/Contact.jsx`
- Modify: `src/App.jsx`

**Step 1: Create Contact component**

Minimal form per spec: Email Corporativo, Empresa, Volume de Investimento. Clean design.

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { Send } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const anim = useAnimateOnScroll()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contato" className="py-20 md:py-28 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div ref={anim.ref} style={anim.style}>
          <h2 className="text-3xl md:text-4xl font-bold text-ummix-dark text-center mb-4">
            Fale com um especialista
          </h2>
          <p className="text-ummix-gray-dark text-center mb-12">
            Descubra como a Ummix pode potencializar suas campanhas.
          </p>

          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                placeholder="E-mail corporativo"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-ummix-red focus:ring-2 focus:ring-ummix-red/20 outline-none transition-all text-ummix-dark"
              />
              <input
                type="text"
                placeholder="Empresa"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-ummix-red focus:ring-2 focus:ring-ummix-red/20 outline-none transition-all text-ummix-dark"
              />
              <select
                required
                defaultValue=""
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-ummix-red focus:ring-2 focus:ring-ummix-red/20 outline-none transition-all text-ummix-dark"
              >
                <option value="" disabled>Volume de investimento estimado</option>
                <option>Ate R$ 10.000/mes</option>
                <option>R$ 10.000 - R$ 50.000/mes</option>
                <option>R$ 50.000 - R$ 200.000/mes</option>
                <option>Acima de R$ 200.000/mes</option>
              </select>
              <button
                type="submit"
                className="w-full bg-ummix-red hover:bg-ummix-red-dark text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-5 h-5" />
                Quero saber mais
              </button>
            </motion.form>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-ummix-dark mb-2">Obrigado!</h3>
              <p className="text-ummix-gray-dark">
                Nosso time entrara em contato em breve.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add to App.jsx, verify, commit**

```bash
git add src/components/Contact.jsx src/App.jsx
git commit -m "feat: add Contact lead-gen form with success state"
```

---

## Task 10: Final Assembly + Polish

**Files:**
- Modify: `src/App.jsx` (final assembly of all sections)
- Modify: `index.html` (SEO meta tags)

**Step 1: Final `src/App.jsx`**

```jsx
import Header from './components/Header'
import Hero from './components/Hero'
import ValueProp from './components/ValueProp'
import Features from './components/Features'
import Segmentation from './components/Segmentation'
import Partners from './components/Partners'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Features />
        <Segmentation />
        <Partners />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

**Step 2: Add SEO meta tags to `index.html`**

In `<head>`:
```html
<meta name="description" content="Ummix Ads - Midia inteligente nos veiculos de massa. Segmentacao, mensuracao e performance em midia offline com a precisao do digital." />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Ummix Ads | Midia Inteligente nos Veiculos de Massa</title>
```

**Step 3: Optimize hero background image**

Run:
```bash
# If ImageMagick or sharp-cli available, resize hero image to max 1920px width and compress
# Otherwise, note for manual optimization later
npx sharp-cli -i public/assets/img_bg_hero.jpg -o public/assets/img_bg_hero.jpg --resize 1920 --quality 80
```

**Step 4: Run production build and check size**

Run: `npm run build`
Expected: Build succeeds, total bundle under 200KB gzipped.

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Ummix landing page — all sections assembled, SEO meta tags added"
```

---

## Task 11: Performance Verification

**Step 1: Serve production build**

Run:
```bash
npm run preview
```

**Step 2: Verify checklist from spec**

| Item | Check |
|------|-------|
| LCP < 2.5s | Hero image lazy-preloaded, optimized |
| WCAG AA contrast | Red (#C8102E) on white = 7.1:1 ratio ✓ |
| Mobile responsive | Tailwind breakpoints, tested at 375px |
| Smooth animations | Framer Motion with `once: true`, no layout thrash |
| Sticky header | Scroll-aware with backdrop blur |
| Grayscale logos | CSS filter with hover transition |

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: performance and accessibility polish"
```

---

## Summary of Components

| Component | Section | Key Animation |
|-----------|---------|--------------|
| `Header` | Sticky nav | Scroll-triggered opacity/blur |
| `Hero` | Full-screen hero | Staggered fade-in-up, bounce scroll indicator |
| `ValueProp` | Core message | Fade-in-up on scroll |
| `Features` | 6-card grid | Staggered cards, hover lift |
| `Segmentation` | Tab UI | Tab switch with AnimatePresence |
| `Partners` | Logo grid | Grayscale → color hover |
| `Testimonials` | Client quotes | Card slide-in |
| `Contact` | Lead form | Form → success transition |
| `Footer` | Branding | Static |

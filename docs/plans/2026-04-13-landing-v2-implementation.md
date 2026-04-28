# Landing Page v2 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Ummix Ads landing page into a dynamic, platform-first experience where all primary CTAs link directly to the platform auth page, with a split Hero featuring a platform screenshot, animated counters strip, and a floating CTA.

**Architecture:** New components are self-contained and dropped into the existing App.jsx flow. A central `urls.js` constants file makes the platform URL easy to swap at launch. No new dependencies — all animation uses Framer Motion already installed.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 4, Framer Motion 12, Lucide React.

---

## Pre-condition: Asset Required

Before starting, the user must place the platform screenshot at:

```
public/assets/platform-preview.png
```

The `BrowserFrame` component will show a placeholder box with instructions if the file is missing. Implementation can proceed without it.

---

### Task 1: URL Constants File

**Files:**
- Create: `src/constants/urls.js`

**Step 1: Create the file**

```js
// src/constants/urls.js
export const PLATFORM_SIGNUP = 'https://ummix.workintech.com.br/signup'
export const PLATFORM_LOGIN  = 'https://ummix.workintech.com.br/login'
```

**Step 2: Verify dev server still runs**

Run: `npm run dev`  
Expected: no errors, site loads normally.

**Step 3: Commit**

```bash
git add src/constants/urls.js
git commit -m "feat: add platform URL constants"
```

---

### Task 2: Update Header CTA

**Files:**
- Modify: `src/components/Header.jsx`

**Step 1: Import URL constant and update href**

Replace the CTA anchor in Header.jsx:

```jsx
import { PLATFORM_SIGNUP } from '../constants/urls'

// inside the return, replace the existing CTA anchor:
<a
  href={PLATFORM_SIGNUP}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-ummix-red hover:bg-ummix-red-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
>
  Plataforma Ummix Ads
</a>
```

**Step 2: Verify in browser**

Open dev server, right-click the header CTA → "Inspect" → confirm `href` is the signup URL.

**Step 3: Commit**

```bash
git add src/components/Header.jsx
git commit -m "feat: link header CTA to platform signup"
```

---

### Task 3: BrowserFrame Component

**Files:**
- Create: `src/components/BrowserFrame.jsx`

**Step 1: Create the component**

```jsx
// src/components/BrowserFrame.jsx
export default function BrowserFrame({ src, alt = 'Ummix Ads Platform' }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      {/* Browser chrome */}
      <div className="bg-ummix-dark px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 bg-[#2a2a2a] rounded-md px-3 py-1 text-xs text-white/40 font-mono">
          app.ummixads.com.br
        </div>
      </div>

      {/* Screenshot area */}
      <div className="relative">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full block"
            loading="eager"
          />
        ) : (
          <div className="w-full aspect-video bg-ummix-dark/60 flex items-center justify-center text-white/30 text-sm">
            platform-preview.png
          </div>
        )}
        {/* Bottom fade mask */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-ummix-dark to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
```

**Step 2: Verify no import errors**

Import it temporarily in App.jsx, run dev server, remove the temporary import.

**Step 3: Commit**

```bash
git add src/components/BrowserFrame.jsx
git commit -m "feat: add BrowserFrame component for platform screenshot"
```

---

### Task 4: Redesign Hero with Split Layout

**Files:**
- Modify: `src/components/Hero.jsx`

**Step 1: Rewrite Hero.jsx**

```jsx
// src/components/Hero.jsx
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 md:py-0">
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
            initial={{ opacity: 0, rotateY: -8, x: 40 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            style={{ perspective: 1000 }}
            whileHover={{ rotateY: 2, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <BrowserFrame src="/assets/platform-preview.png" />
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
```

**Step 2: Verify in browser**

- Desktop: two columns, screenshot on right
- Mobile (DevTools, 375px): stacked, copy on top, screenshot below
- Both CTAs have correct hrefs (inspect element)

**Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: redesign Hero with split layout and platform screenshot"
```

---

### Task 5: useCountUp Hook

**Files:**
- Create: `src/hooks/useCountUp.js`

**Step 1: Create the hook**

```js
// src/hooks/useCountUp.js
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function useCountUp(target, duration = 1800) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return { ref, count }
}
```

**Step 2: Verify dev server runs**

Run: `npm run dev` — no errors expected.

**Step 3: Commit**

```bash
git add src/hooks/useCountUp.js
git commit -m "feat: add useCountUp hook for animated number counters"
```

---

### Task 6: CountersStrip Component

**Files:**
- Create: `src/components/CountersStrip.jsx`

**Step 1: Create the component**

```jsx
// src/components/CountersStrip.jsx
import { useCountUp } from '../hooks/useCountUp'

function Counter({ value, suffix = '', prefix = '', label }) {
  const { ref, count } = useCountUp(value)
  return (
    <div ref={ref} className="text-center px-4">
      <p className="text-3xl md:text-4xl font-black text-white">
        {prefix}{count}{suffix}
      </p>
      <p className="text-sm text-white/70 mt-1 font-medium">{label}</p>
    </div>
  )
}

export default function CountersStrip() {
  return (
    <section className="bg-ummix-red py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Counter value={500}  suffix="+"      label="Anunciantes" />
          <Counter value={3}    suffix="x"      label="ROI médio" />
          <Counter value={150}  suffix="+"      label="Veículos de mídia" />
          <Counter value={50}   prefix="R$"suffix="M+" label="Mídia gerenciada" />
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add to App.jsx between Hero and VideoEmbed**

```jsx
// src/App.jsx — add import:
import CountersStrip from './components/CountersStrip'

// inside <main>, after <Hero />:
<Hero />
<CountersStrip />
<VideoEmbed />
```

**Step 3: Verify in browser**

Scroll down slowly past Hero — counters should animate up from 0 to their target values.

**Step 4: Commit**

```bash
git add src/components/CountersStrip.jsx src/App.jsx
git commit -m "feat: add CountersStrip with animated number counters"
```

---

### Task 7: FloatingCTA Component

**Files:**
- Create: `src/components/FloatingCTA.jsx`
- Modify: `src/App.jsx`

**Step 1: Create the component**

```jsx
// src/components/FloatingCTA.jsx
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
```

**Step 2: Add to App.jsx (outside `<main>`, before `<Footer>`)**

```jsx
import FloatingCTA from './components/FloatingCTA'

// inside the fragment, after </main>:
<FloatingCTA />
<Footer />
```

**Step 3: Verify in browser**

- Scroll past the Hero — floating button should fade in bottom-right
- Scroll to the `#acesso` section — button should fade out
- On mobile (375px DevTools) — button should not appear

**Step 4: Commit**

```bash
git add src/components/FloatingCTA.jsx src/App.jsx
git commit -m "feat: add FloatingCTA that appears after Hero and hides at access section"
```

---

### Task 8: PlatformAccess Component (replaces Contact)

**Files:**
- Create: `src/components/PlatformAccess.jsx`
- Modify: `src/App.jsx`

**Step 1: Create the component**

```jsx
// src/components/PlatformAccess.jsx
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
              href="mailto:tecnologia@ummix.com.br"
              className="underline hover:text-white/70 transition-colors"
            >
              tecnologia@ummix.com.br
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Replace Contact with PlatformAccess in App.jsx**

```jsx
// Remove:
import Contact from './components/Contact'

// Add:
import PlatformAccess from './components/PlatformAccess'

// In <main>, replace <Contact /> with:
<PlatformAccess />
```

**Step 3: Verify in browser**

- Section appears after Testimonials
- Both buttons render with correct hrefs
- Floating CTA disappears when this section is in view
- Responsive: buttons stack on mobile

**Step 4: Commit**

```bash
git add src/components/PlatformAccess.jsx src/App.jsx
git commit -m "feat: replace Contact with PlatformAccess section linking to platform auth"
```

---

### Task 9: Final verification

**Step 1: Full build check**

```bash
npm run build
```
Expected: no errors, `dist/` generated.

**Step 2: Preview production build**

```bash
npm run preview
```

Check all sections in sequence, verify no layout breaks.

**Step 3: Responsive check**

In DevTools, test at: 375px (iPhone SE), 768px (iPad), 1280px (desktop).

Confirm:
- Hero: stacked on mobile, split on desktop
- CountersStrip: 2 columns on mobile, 4 on desktop
- FloatingCTA: hidden on mobile, visible on desktop
- PlatformAccess: buttons stack on mobile

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: landing page v2 — platform-first hero, counters, floating CTA, access section"
```

---

## Asset Reminder

After Tasks are complete, user must:
1. Place platform screenshot at `public/assets/platform-preview.png`
2. Confirm the counter values (500 anunciantes, 3x ROI, 150+ veículos, R$50M+) are accurate or update them in `CountersStrip.jsx`
3. Update `PLATFORM_SIGNUP` and `PLATFORM_LOGIN` in `src/constants/urls.js` to production URLs before launch

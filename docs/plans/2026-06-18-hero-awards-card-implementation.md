# Hero Awards Card Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the two separate award pills in the Hero with one "Prêmios e Certificações" card showing 3 logos, with hover/tap-to-reveal tooltips and click-to-navigate behavior, adding the new GO E-commerce certification.

**Architecture:** A new local component `AwardsCard` inside `Hero.jsx` (or a separate file if it grows) renders a single pill container with a label and 3 logo buttons. Each logo tracks an `activeIndex` state (shared across the 3 logos) to control tooltip visibility on hover (desktop) and tap (mobile). Clicking/tapping an already-active logo navigates to its link; clicking an inactive one (on touch) just activates it first.

**Tech Stack:** React, Tailwind CSS v4, Framer Motion (already used in Hero.jsx for animations).

---

### Task 1: Copy the new certification asset into `public/assets/`

**Files:**
- Copy: `assets/Selo_GO+E-commerce.png` → `public/assets/Selo_GO+E-commerce.png`

**Step 1: Copy the file**

```bash
cp "assets/Selo_GO+E-commerce.png" "public/assets/Selo_GO+E-commerce.png"
```

**Step 2: Verify it copied**

```bash
ls "public/assets/Selo_GO+E-commerce.png"
```
Expected: file path printed, no "No such file" error.

**Step 3: Commit**

```bash
git add "public/assets/Selo_GO+E-commerce.png"
git commit -m "Add GO E-commerce certification asset to public/assets"
```

---

### Task 2: Build the `AwardsCard` component

**Files:**
- Modify: `src/components/Hero.jsx:39-81` (replace the existing award badges block)

**Step 1: Replace the award badges JSX block**

In `src/components/Hero.jsx`, replace lines 39-81 (the `{/* Award badges */}` `motion.div` containing the two `<a>` pills) with the new single-card markup below. This goes inside the same `motion.div` wrapper (keep the existing `initial`/`animate`/`transition` props), but the inner content changes completely.

First, add this data array and state logic. Place it **above** the `Hero` function (after the imports, before `export default function Hero()`):

```jsx
import { useState } from 'react'

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
    href: 'https://ecommercegoias.net/',
  },
]

function AwardsCard() {
  const [activeId, setActiveId] = useState(null)

  const handleLogoClick = (e, award) => {
    // On touch devices there's no hover, so the first tap only reveals
    // the tooltip; a second tap on an already-active logo navigates.
    if (activeId !== award.id) {
      e.preventDefault()
      setActiveId(award.id)
    }
  }

  return (
    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/25 rounded-full px-4 py-2">
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
```

Then replace the JSX usage. The existing block:

```jsx
{/* Award badges */}
<motion.div
  className="flex flex-row flex-nowrap gap-2 md:gap-3 justify-center lg:justify-start mb-8"
  initial={{ opacity: 0, y: -16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  <a href="https://www.premiodeinovacao.com.br/vencedores/" ...>
    ...
  </a>
  <a href="https://curicaca.abdi.com.br/" ...>
    ...
  </a>
</motion.div>
```

becomes:

```jsx
{/* Award badges */}
<motion.div
  className="flex justify-center lg:justify-start mb-8"
  initial={{ opacity: 0, y: -16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  <AwardsCard />
</motion.div>
```

**Step 2: Add the `useState` import**

Check the top of `Hero.jsx` — it currently imports only `motion` from `framer-motion`. Add a separate React import line:

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import BrowserFrame from './BrowserFrame'
import { PLATFORM_SIGNUP, PLATFORM_LOGIN } from '../constants/urls'
```

**Step 3: Run the dev server and visually verify**

```bash
npm run dev
```

Open the printed local URL in a browser. Verify:
- A single pill-shaped card appears where the two cards used to be, labeled "PRÊMIOS E CERTIFICAÇÕES"
- 3 logos appear side by side inside it (CNI, ABDI, GO E-commerce)
- Hovering over each logo (desktop) shows a dark tooltip above it with the correct phrase, with no layout shift
- Clicking a logo opens its link in a new tab
- Resize to mobile width / use device toolbar: tapping a logo shows the tooltip first; tapping the same logo again navigates

**Step 4: Run a production build to confirm no errors**

```bash
npm run build
```
Expected: build completes with no errors (exit code 0).

**Step 5: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "Consolidate Hero award badges into a single Prêmios e Certificações card"
```

---

### Task 3: Clean up unused emoji/text and confirm responsive layout

**Files:**
- Review: `src/components/Hero.jsx`

**Step 1: Confirm no leftover dead code**

Search the file for the old emoji spans (`🏆`, `🏅`) to make sure they were fully removed in Task 2 and not left dangling elsewhere.

```bash
grep -n "🏆\|🏅" src/components/Hero.jsx
```
Expected: no output (no matches).

**Step 2: Visually re-check at 3 breakpoints**

In the browser dev tools, check the Hero at:
- Mobile (375px wide): card should not overflow horizontally, label may wrap or shrink but stays on one line per the `whitespace-nowrap` + `text-[10px]` sizing
- Tablet (768px)
- Desktop (1280px+)

Expected: card stays compact and inline, doesn't break the `flex-row` alignment of the headline area above/below it.

**Step 3: Commit if any small fixes were needed**

```bash
git add src/components/Hero.jsx
git commit -m "Fix responsive spacing on awards card"
```
(Skip this commit if no changes were needed.)

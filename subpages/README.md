# Ummix Ads — Design System

**Ummix Ads** (stylized *ummix**ads***) is a Brazilian ad-tech startup that brings
the precision of digital advertising to **offline mass media** — radio, open TV,
newspapers and out-of-home. Advertisers buy on the biggest broadcasters in the
country (SBT, RedeTV, Band News, Jovem Pan, Alpha, Record, Rádio 89, etc.) with
demographic / geographic / behavioral segmentation, real-time dashboards and
mensuração normally reserved for digital.

> 🏆 Winner — 9ª Edição do Prêmio Nacional de Inovação · CNI / SEBRAE

The company's own positioning line, from the hero:

> **MÍDIA INTELIGENTE NOS VEÍCULOS DE MASSA**
> Anuncie nas maiores emissoras e canais do país com a precisão do digital.
> Segmentação, mensuração e performance em mídia offline.

Primary language of all product copy: **Portuguese (pt-BR)**.

---

## Surfaces represented

| Surface | Status | Notes |
|---|---|---|
| **Marketing landing** (`ummixads.com.br`) | Source of this system | React + Vite + Tailwind + Framer Motion + Lucide |
| **Platform** (`app.ummixads.com.br` / `ummix.workintech.com.br`) | Represented via screenshots only | Dashboard, Criar Campanha, Minhas Campanhas, Resumo. No source code provided. |

## Sources consulted

- **Codebase:** [`Arynelson/Ummix_landing`](https://github.com/Arynelson/Ummix_landing) `@main`
  — full React source for the landing page, including `src/index.css` with the color/type tokens,
  all section components under `src/components/`, and the dynamic-design plan in `docs/plans/`.
- **Assets:** `public/assets/` from the same repo — brand logo treatment is text-only
  (`ummix` + red `ads`), plus broadcaster/client logos and four platform screenshots.
- **Design doc:** `docs/plans/2026-04-13-landing-v2-dynamic-design.md` — canonical explanation
  of the v2 layout decisions (split hero, counters strip, floating CTA, platform gateway).

No Figma, no separate brand book. Everything in this design system is reverse-engineered
from the codebase and the copy inside it.

---

## Index

| File / folder | What's in it |
|---|---|
| `README.md` | This file. Brand context + content & visual foundations + iconography. |
| `SKILL.md` | Agent Skill entrypoint for reusing this system. |
| `colors_and_type.css` | CSS custom properties for colors, type roles, radii, shadows, motion. |
| `assets/` | Logos, platform screenshots, hero background, partner/client logos, flow diagram. |
| `preview/` | Small HTML cards that power the **Design System** tab (one concept per card). |
| `landing_v2/` | Canonical modernized landing (rebrand 2026) — editorial, 3 hero variants via Tweaks. This is the landing UI kit. |
| `subpages/` | **Partner** (`partner.html`) and **Cashback** (`cashback.html`) pages — same v2 design language, each with 2 hero variants via Tweaks. |

> **Rebrand 2026 note:** brand red is now `#9B191A`, graphite `#1E1E1E`, off-white `#F4F2F2`.
> Canonical logo lockups are `assets/logo_ummix_branca.png` (white, for dark surfaces) and
> `assets/logo_ummix_escura.png` (graphite, for light surfaces). Use these full lockups; the
> earlier cropped `logo_ummix_red.png` is deprecated. Primary platform/CTA URL is
> `https://ummix.workingtech.com.br/`.

---

## CONTENT FUNDAMENTALS

Ummix Ads copy is written for **brand-side marketers and founders in Brazil** who are
used to planning digital campaigns and are skeptical that offline media can deliver the
same rigor. The tone has to prove that it can.

### Language
- **Portuguese (pt-BR) only.** No English fallback in the product.
- Industry jargon is kept but explained in plain terms (`mensuração`, `segmentação`,
  `performance`, `ROI`, `leads qualificados`).

### Voice & tone
- **Confident, data-forward, slightly boastful.** The brand has awards and big-name
  broadcasters behind it, and the copy knows it.
- **Short, declarative headlines**, often all-caps when used as the display line
  (e.g. `MÍDIA INTELIGENTE NOS VEÍCULOS DE MASSA`).
- **Numbers do the heavy lifting.** Specific, concrete metrics appear everywhere:
  `+500 anunciantes`, `3x ROI médio`, `150+ veículos`, `R$ 50M+ mídia gerenciada`,
  `aumente em 400% a eficiência`, `reduza em 50% o custo`.
- **Second person plural ("nós") for the company, third-person "você" for the reader.**
  "**Entregamos** sua mensagem e apresentamos seu produto… para as pessoas certas."
- **No emoji in body copy.** The single 🏆 in the award badge is the only exception —
  it's attached to a real award.
- **Action-first CTAs** in the infinitive/imperative: `Criar conta grátis`, `Entrar`,
  `Quero saber mais`, `Já tenho conta — Entrar`.

### Casing
- **UPPERCASE** for hero display lines only.
- **Sentence case** for section headings (`Segmentações Disponíveis`,
  `Pronto para começar?`).
- **Title Case** for feature titles (`Impacto Real`, `Alta Performance`,
  `Resultados Mensuráveis`).
- **Product name is always lowercase** in the wordmark: `ummix` + red `ads`. In
  prose it may be capitalized `Ummix Ads` (copy refers to "a Ummix" — feminine,
  following "a plataforma").

### Sentence patterns seen in the wild
- *"Anuncie nas maiores emissoras e canais do país com a precisão do digital."*
  — verb-first, concrete noun, reassuring qualifier.
- *"Nunca imaginei que seria possível ter dashboards em tempo real para campanhas
  de TV e rádio."* — testimonial voice, overturns an assumption.
- *"Entregamos sua mensagem e apresentamos seu produto ou serviço para as pessoas
  certas dentro das maiores mídias tradicionais."* — "nós" + "você" + proof points.

### What to avoid
- Emoji-heavy marketing tone, soft generic copy like "unlock growth," or English terms
  where a Portuguese one exists. "Startup-bro" energy is wrong for this brand — the
  audience is buying mass-media with real money.

---

## VISUAL FOUNDATIONS

### Color
The palette is tightly constrained — it's a **three-color system** plus one tint.

- **Ummix Red `#C8102E`** — the signature. Used for CTAs, accents, counter strips,
  selected tab state, focus rings, link hovers. Dark variant `#A00D24` for pressed
  states.
- **Ummix Dark `#1A1A1A`** — primary dark surface (Features, WorkflowSection,
  PlatformAccess, Footer) and body text on light.
- **Ummix Gray `#F5F5F5`** — light "canvas" alternate to white for the Partners
  and Testimonials sections; also used as chip backgrounds on the Segmentation
  section.
- **White** — hero text on the red/dark gradient, cards on dark, and the logo wordmark.

Sections **alternate dark → light → dark** to create rhythm as the user scrolls.
There is no secondary brand color, no gradient-rainbow marketing shenanigans. The
most complex color treatment is the **`bg-linear-to-br from-ummix-red/85 to-ummix-dark/90`**
wash on the hero, which sits on top of a real photograph.

### Type
Two Google Fonts carry the whole system:
- **Baloo 2** — all headings (`h1`–`h6`). Chunky, rounded, slightly playful. Paired with
  `font-black` (900) on hero display lines, `font-bold` (700) elsewhere.
- **Plus Jakarta Sans** — body text, UI labels, buttons, counters-by-default,
  form inputs. Weights used: 400/500/600/700/800.

### Backgrounds
- The hero uses a **real lifestyle photo** (`img_bg_hero.jpg` — two women shopping in
  a boutique) at full-bleed, overlaid with the red→dark gradient at `85%–90%` opacity.
  This is the only background photo in the system.
- Dark sections are **flat `#1A1A1A`** — no gradients, no noise, no patterns.
- Light sections are **flat white or `#F5F5F5`** — no noise, no patterns, no textures.
- Workflow section uses **`bg-ummix-red/15`** as a translucent fill for the arrow-chevron
  step cards — the only place the red appears at <60% alpha.

### Animation
Framer Motion drives everything. The vocabulary is consistent:
- **Fade + rise** on enter: `opacity 0→1`, `y 20–30px → 0`, `duration 0.6–0.8s`,
  `ease 'easeOut'`.
- **Staggered children** on grids (`delay: i * 0.1`).
- **Spring** for the workflow row: `stiffness: 55, damping: 14, delay: i * 0.25`.
- **Hover** on CTAs: `scale 1.05` + color darken. On feature cards: `-translate-y-2`
  + border appears.
- **Infinite marquee** for broadcaster and client logos (28–40s linear, opposing
  directions).
- **Count-up** on the red metric strip (custom `useCountUp` hook).
- **Carousel cross-fade/slide** on testimonials and browser-frame screenshots
  (3–5s interval, manual prev/next).

### Hover & press states
- **Primary button (red):** hover → `bg-ummix-red-dark` + `scale-105`. No press scale-down.
- **Secondary button (outline on dark):** hover → `bg-white/10`, no scale.
- **Feature card:** hover → `-translate-y-2`, `border-white/20` reveal.
- **Tab chip:** inactive hover → `bg-ummix-red/10`. Active → solid red + white + `shadow-lg`.
- **Partner logo:** default `grayscale opacity-50`, hover → `grayscale-0 opacity-100`
  over 500ms.
- **Carousel arrow:** `bg-white/20` → `bg-white/40`.

### Borders
- Most surfaces are **borderless**. Borders appear only when they add meaning:
- Feature cards: `border-transparent` → `hover:border-white/20` (reveal).
- Workflow step: `border-ummix-red/30` → `hover:border-ummix-red/60`.
- Input: `border-gray-200` → `focus:border-ummix-red + ring-2 ring-ummix-red/20`.
- Award badge in hero: `border-white/25` on a `backdrop-blur` pill.

### Shadows
Three levels, all the default Tailwind scale:
- `shadow-md` on the sticky header once scrolled.
- `shadow-lg` on primary CTAs.
- `shadow-2xl` on the hero browser frame and testimonial cards — the heaviest
  shadow in the system, used only on hero-level objects.
- **No inner shadows.** No colored shadows other than the implicit red glow from
  primary buttons.

### Transparency & blur
- `backdrop-blur` appears in three places: the scrolled sticky header
  (`bg-white/95 backdrop-blur`), the hero award pill (`bg-white/10 backdrop-blur`),
  and the carousel arrows. Otherwise surfaces are opaque.
- Alpha is used extensively on white (`white/40`, `white/60`, `white/80`) for
  secondary/tertiary text on dark, and on red (`red/15`, `red/20`, `red/30`) for
  tonal accents.

### Corner radii
- **Fully rounded (`rounded-full`)** for CTAs, pill chips, dot indicators, and
  counter badges — this is the signature shape.
- `rounded-2xl` (24px) for hero browser frame, testimonial cards, feature cards.
- `rounded-xl` (16px) for inputs and small icon tiles.
- `rounded-md/lg` for smaller elements (header CTA button uses `rounded-lg`).
- No square corners anywhere in the system.

### Cards
- **On dark:** no background fill by default. A `border` appears on hover — that
  is the entire "card" treatment. This keeps the section breathable.
- **On light:** solid white with `shadow-2xl` (testimonial card); or muted
  `bg-ummix-gray` chips with a hoverable red border (segmentation tags).

### Layout rules
- Max content width: `max-w-7xl` (80rem) for most sections; narrower caps for
  testimonials (`max-w-4xl`), platform-access CTA (`max-w-2xl`), segmentation
  (`max-w-5xl`).
- Horizontal padding `px-6` at mobile, stays through lg. Vertical section padding
  `py-16` to `py-28`.
- **Fixed elements:** the header (`position: fixed top-0`) and the Floating CTA
  (`position: fixed bottom-6 right-6`, desktop-only).
- Hero is `min-h-screen`; every other section is content-sized.

### Motion summary
Easing is **always** `easeOut` for entrances, `easeInOut` for the testimonial
slide. Durations are **0.3–0.8s**. No bounces, no elastic. Scroll-triggered only
for sections below the fold; hero animates on mount.

---

## ICONOGRAPHY

**Primary icon system: [Lucide React](https://lucide.dev/)** (`lucide-react` at v1.7.0).
The codebase uses Lucide exclusively for functional icons. Stroke style, weight
(`strokeWidth: 2` default) and rounded line caps are consistent.

Icons seen in the source (by section):
- **Hero / access CTAs:** `ArrowRight`, `Send`
- **Features:** `Target`, `BarChart3`, `Tv`, `Zap`, `Users`, `LineChart`
- **Workflow:** `Headphones`, `Database`, `Settings`, `Megaphone`, `Filter`, `TrendingUp`
- **Testimonials:** `Quote`, `ChevronLeft`, `ChevronRight`

**Usage pattern:**
- Rendered at `w-6 h-6` or `w-7 h-7` inside a `rounded-xl` tile.
- Tile fill is `bg-ummix-red/20` (on dark backgrounds) with icon stroke
  `text-ummix-red`. On hover the tile fills to `bg-ummix-red/30`.
- Never used inline inside body text — always in a dedicated container.

**Logos / brand marks** are raster PNG/JPG only. The wordmark is **not** an image —
it's rendered as live text (`ummix<span class="text-ummix-red">ads</span>`) in
Plus Jakarta Sans Black, so it tints easily over dark vs. light headers.

**Emoji:** not used as functional UI. Exactly one appears in the product —
`🏆` in the Prêmio Nacional de Inovação award pill in the hero — and it's
attached to a real award. Do not introduce emoji elsewhere.

**Unicode characters as icons:** not used.

**Own SVG / hand-drawn illustration:** not used. The only branded diagram is
`Flow_ummix.png` (a PNG export of the sales/method flow). Do not invent SVG
mascots, blobs, or icons for this brand — stick to Lucide.

**CDN fallback:** because the Skill format expects CDN-friendly icons, the preview
cards and UI kit load Lucide via its standalone CDN (`unpkg.com/lucide@latest`) and
call `lucide.createIcons()` after mount. This matches the React version 1:1.

---

## FONT SUBSTITUTION NOTE

Both brand fonts (**Baloo 2** and **Plus Jakarta Sans**) are free Google Fonts —
no substitution is necessary. This design system loads them directly from
`fonts.googleapis.com` to match the production site exactly.

> If you want to self-host the fonts offline, drop the `.woff2` files into a new
> `fonts/` folder and replace the `@import` at the top of `colors_and_type.css`
> with `@font-face` blocks. Flag any future font change to the user.

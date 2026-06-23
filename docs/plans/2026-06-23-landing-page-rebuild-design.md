# Landing Page Rebuild — Design Doc

## Goal

Rebuild the main landing page (`src/App.jsx` and its section components) to match the new design provided in `Ummix Landing.dc.html` (+ `support.js`), a Claude-design-tool export with a denser, more narrative structure than the current site. Four content blocks from the current site must be preserved and re-skinned into the new visual language, and the Hero copy reverts to the old text.

## Source material

- `Ummix Landing.dc.html` (122KB) — readable HTML/CSS source of the new design. The companion `Ummix Landing New.html` is a self-extracting bundler artifact and is **not** used as source.
- `support.js` (55KB) — JS behavior for the new design (tab switching, carousel, scroll-reveal arming). Used as a behavioral reference only; not imported directly — logic gets reimplemented in React.

## Design system carry-over

The current Tailwind theme (`src/index.css` `@theme` block) already matches the new design's CSS vars almost exactly:

| New design var | Current Tailwind token | Match? |
|---|---|---|
| `--red: #9B191A` | `--color-ummix-red` | ✅ identical |
| `--red-d: #7A1415` | `--color-ummix-red-dark` | ✅ identical |
| `--dark: #1E1E1E` | `--color-ummix-dark` | ✅ identical |
| `--gray: #F4F2F2` | `--color-ummix-gray` | ✅ identical |
| `--gray-d: #333` | `--color-ummix-gray-dark` | ✅ identical |
| `'Baloo 2'` headings | `--font-family-heading` | ✅ already in use |
| `'Plus Jakarta Sans'` body | `--font-family-body` | ✅ already in use |
| `--grafite: #2A2A2A` | — | ➕ add as new token |
| `--red-g: rgba(155,25,26,.45)` | — | use as inline arbitrary value, no token needed |

Changes needed to `src/index.css` / `index.html`:
- Add `--color-ummix-grafite: #2A2A2A` to the `@theme` block.
- Add weight `900` to the Google Fonts link for Baloo 2 (used for the Hero H1 and the Método step numerals).

No other token migration is needed — this keeps `/cashback` and `/partner` visually consistent with the new homepage automatically.

## Section order (final)

1. **Hero** — old copy restored ("MÍDIA OFF. INTELIGÊNCIA ON." / "Anuncie em centenas de rádios e TVs...") + the 5-step flow visual card (PLANEJAR → COMPRAR → EXECUTAR → AUDITAR → RESULTADOS) from the new design + `AwardsCard` (CNI/SEBRAE, ABDI, GO E-commerce) ported in as a floating element
2. **Metrics** — 4-stat grid (+500 Anunciantes, 3x ROI, R$50M+ mídia gerenciada, 150+ veículos)
3. **ClientView** — "Simples para quem contrata" 3-card grid
4. **Backstage** — dark section, arc diagram with traveling dots and floating labels
5. **Method** — 10-step interactive carousel (prev/next, autoplay, numbered chips, progress bar)
6. **Eliminates** — "O que isso elimina" checklist (2-column)
7. **Deliverables** — "O que a Ummix realmente entrega" 6-card grid, dark
8. **Segmentations** — tabbed UI (Demográfica / Geográfica / Comportamental), 8 attributes per tab
9. **Results** — "Resultados que geram impacto" 4-card grid
10. **Cashback** — new section, content adapted from `CashbackBanner.jsx`, styled as a dark panel with red glow consistent with Backstage/Deliverables
11. **ForWhom** — "Para quem é" 3-card grid (Anunciantes / Agências / Veículos)
12. **Partners** — ported unchanged from `Partners.jsx` (Veículos + Anunciantes marquees), repositioned here, background aligned to `var(--gray)` to flow from ForWhom
13. **Contact** — closing CTA + footer content (existing `Footer.jsx` chrome stays separate, outside `<main>`)

`Header.jsx` and `FloatingCTA.jsx` remain unchanged and wrap the new section flow as they do today.

## Component architecture

New folder `src/components/home/`, one file per section:

```
src/components/home/
  Hero.jsx
  Metrics.jsx
  ClientView.jsx
  Backstage.jsx
  Method.jsx
  Eliminates.jsx
  Deliverables.jsx
  Segmentations.jsx
  Results.jsx
  CashbackSection.jsx
  ForWhom.jsx
  Contact.jsx
```

`Partners.jsx` stays in `src/components/` (unchanged), imported into the new `App.jsx` flow at position 12. `Header.jsx`, `Footer.jsx`, `FloatingCTA.jsx` stay where they are.

`src/App.jsx` is rewritten to assemble these 13 pieces in order, replacing the current component list (`Hero, CountersStrip, VideoEmbed, WorkflowSection, Features, CashbackBanner, Segmentation, Partners, Testimonials, PlatformAccess`). Components being fully replaced by the new design (`CountersStrip`, `VideoEmbed`, `WorkflowSection`, `Features`, `CashbackBanner`, `Segmentation`, `Testimonials`, `PlatformAccess`) are deleted once the new sections cover their content; `Hero.jsx` and `Partners.jsx` are kept/ported.

## Animation strategy

- **Scroll reveals** (`.anim`/`.armed` in the new design) → reuse the existing `useAnimateOnScroll` hook (`src/hooks/useAnimateOnScroll.js`) on each section, same pattern already used throughout the codebase.
- **Marquee** (Partners) → unchanged, already implemented via CSS `@keyframes marquee` / `marquee-reverse` in `index.css`.
- **Backstage arc diagram** (pulsing ring, traveling dots) → ported as CSS `@keyframes` (`redPulse`, `arcDot`-equivalent) added to `index.css`, since these are continuous loops independent of scroll position — simpler than Framer Motion for this.
- **Method carousel** → `useState` for active slide index + `setInterval` for autoplay (pause on manual nav), prev/next buttons, clickable numbered chips, progress bar tied to slide index. Slide transitions via Framer Motion `AnimatePresence` for the fade/slide effect.
- **Segmentations tabs** → simple `useState` for active tab, no animation library needed beyond a CSS transition on panel opacity.

## Ported items — visual adaptation

1. **AwardsCard** (from current `Hero.jsx`) — kept as-is structurally (CNI/SEBRAE, ABDI, GO E-commerce logos with hover/click tooltips), repositioned as a floating element anchored to a corner of the new Hero so it doesn't collide with the new 5-step flow card.
2. **CashbackSection** — new component; content sourced from `CashbackBanner.jsx` (H2 "até 3% de cashback" copy, CTA "Conhecer o cashback" → `/cashback.html`), restyled as a dark panel with red radial-gradient glow and Baloo 2 typography, matching the visual weight of Backstage/Deliverables rather than the current plain white-card style.
3 & 4. **Partners marquees** (Veículos + Anunciantes) — `Partners.jsx` component itself is unchanged (already neutral grayscale-logo styling); only its position in the page flow changes (moves to right before Contact) and its section background is aligned to `var(--gray)` to match the preceding `ForWhom` section.

## Out of scope

- `/cashback` and `/partner` subpages are not redesigned — only inherit the token/font changes automatically since they share the same Tailwind theme.
- No changes to `Header.jsx`, `Footer.jsx`, `FloatingCTA.jsx` structure (nav links already updated in a prior task).

# Landing Page Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the homepage's section structure (`src/App.jsx`) with a 13-piece flow based on the new design in `Ummix Landing.dc.html`, preserving the old Hero copy, the `AwardsCard`, and the `Partners.jsx` marquees, and adding a new `CashbackSection`.

**Architecture:** One new React component per new-design section, in `src/components/home/`. Each component is self-contained JSX using existing Tailwind tokens (`ummix-red`, `ummix-dark`, `ummix-gray`, `font-heading`, `font-sans` — already aligned with the new design's CSS vars, see design doc). `Partners.jsx` is reused unmodified at a new position. Old single-purpose components that the new design supersedes are deleted once their content has a new home. No test suite exists — verification is `npm run build` + manual visual check against `Ummix Landing.dc.html`.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 4, Framer Motion 12, existing `useAnimateOnScroll` hook.

**Design reference:** `Ummix Landing.dc.html` (122KB, readable HTML/CSS — the actual source of truth for copy, structure, and inline styles). Each task below tells you the exact line range to read. The CSS in that file's `<style>` block (lines 17-126) defines all animation keyframes referenced (`.anim`/`.armed`, `.method-slide`, `.seg-panel`, `arcDot`, `redPulse`, `orbit-cw/ccw`) — read it once at the start of Task 1 and keep it in mind for every later task since several components reuse the same `.anim` reveal pattern.

**Full design doc:** `docs/plans/2026-06-23-landing-page-rebuild-design.md`

---

## Before you start

Read these once, in order, so you have full context:

1. `docs/plans/2026-06-23-landing-page-rebuild-design.md` — the approved design doc (section order, architecture, token mapping, animation strategy).
2. `Ummix Landing.dc.html` lines 1-150 — root CSS vars, global styles, and **all animation keyframe definitions** you'll be translating into Tailwind/Framer Motion/CSS across the tasks below.
3. `src/App.jsx` — current homepage assembly, to understand what's being replaced.
4. `src/index.css` — current `@theme` token block.
5. `src/hooks/useAnimateOnScroll.js` — the scroll-reveal hook every new section will use.

---

### Task 1: Add missing design tokens

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`

**Step 1: Add the grafite token**

In `src/index.css`, inside the `@theme { ... }` block, add a line after `--color-ummix-gray-dark`:

```css
  --color-ummix-grafite: #2A2A2A;
```

**Step 2: Add font-weight 900 to the Google Fonts link**

In `index.html`, find the `<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />` line and change `Baloo+2:wght@400;500;600;700;800` to `Baloo+2:wght@400;500;600;700;800;900`.

**Step 3: Verify the build still runs**

Run: `npm run build`
Expected: build succeeds with no errors.

**Step 4: Commit**

```bash
git add src/index.css index.html
git commit -m "Add grafite token and Baloo 2 weight 900 for new design system"
```

---

### Task 2: Add shared keyframes to index.css

**Files:**
- Modify: `src/index.css`

**Step 1: Read the source keyframes**

Read `Ummix Landing.dc.html` lines 44-99. These define `redPulse`, `orbit-cw`, `orbit-ccw`, `spin`, `arcDot`, `labelIn`, `chipIn` — needed for the Backstage and Segmentations sections built in later tasks.

**Step 2: Add the keyframes**

Append to `src/index.css`, after the existing `@keyframes marquee-reverse` block:

```css
@keyframes redPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(155,25,26,.55), 0 0 40px rgba(155,25,26,.35); }
  50% { box-shadow: 0 0 0 22px rgba(155,25,26,0), 0 0 70px rgba(155,25,26,.55); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes labelIn {
  from { opacity: 0; transform: translateX(8px); }
  to { opacity: 1; transform: none; }
}
@keyframes chipIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
```

Do not port `arcDot`'s `offset-path` keyframe yet — that SVG path is specific to the Backstage diagram's exact dimensions and gets added in Task 6 alongside the diagram markup itself, not here.

**Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

**Step 4: Commit**

```bash
git add src/index.css
git commit -m "Add shared keyframes for Backstage and Segmentations animations"
```

---

### Task 3: Create the home components folder and Hero.jsx

**Files:**
- Create: `src/components/home/Hero.jsx`
- Reference (read-only): `src/components/Hero.jsx` (current Hero, for the `AwardsCard` component and old copy)

**Step 1: Read source material**

- Read `Ummix Landing.dc.html` lines 150-228 (new Hero markup: 5-step flow card, stats, CTAs).
- Read `src/components/Hero.jsx` in full (current Hero — copy this file's `AwardsCard` component verbatim into the new file, and reuse the exact H1/paragraph text).

**Step 2: Write `src/components/home/Hero.jsx`**

Build the new Hero with:
- H1: "MÍDIA OFF.<br/>INTELIGÊNCIA ON." (exact old copy, do not reword)
- Paragraph: "Anuncie em centenas de rádios e TVs. Filtre por localização, renda e comportamento, e veja o que cada veiculação gera." (exact old copy)
- The 5-step flow visual card from the new design (PLANEJAR → COMPRAR → EXECUTAR → AUDITAR → RESULTADOS) and the "Método Ummix® de Gestão de Campanhas" closing line, recreated in JSX/Tailwind matching the new design's dark-card visual.
- Two CTAs: "Conhecer o Método Ummix" → `href="#metodo"`, "Quero anunciar" → `href="#contato"`.
- Three inline stats: +150 Veículos parceiros, 10 Etapas estratégicas, +50 Atividades operacionais.
- The `AwardsCard` component (copied from current `src/components/Hero.jsx`) rendered as a floating element anchored to a corner, positioned so it doesn't overlap the 5-step flow card.
- Wrap the whole section in `useAnimateOnScroll` per the existing pattern used elsewhere in the codebase (see `src/components/Partners.jsx` for the `ref`/`style` usage pattern).

**Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds, no JSX errors.

**Step 4: Commit**

```bash
git add src/components/home/Hero.jsx
git commit -m "Add new Hero component with restored old copy and ported AwardsCard"
```

---

### Task 4: Create Metrics.jsx

**Files:**
- Create: `src/components/home/Metrics.jsx`

**Step 1: Read source material**

Read `Ummix Landing.dc.html` lines 229-238 (Métricas A section: 4-stat grid on `var(--gray)` background).

**Step 2: Write `src/components/home/Metrics.jsx`**

Recreate the 4-stat grid (+500 Anunciantes atendidos, 3x ROI médio das campanhas, R$50M+ Mídia gerenciada/ano, 150+ Veículos parceiros) using Tailwind, background `bg-ummix-gray`. Use `useAnimateOnScroll` for the reveal. The `data-count="500"` attribute in the source is a counter-animation hook from `support.js` — skip porting a JS counter animation (YAGNI per design doc scope); render the static final numbers.

**Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

**Step 4: Commit**

```bash
git add src/components/home/Metrics.jsx
git commit -m "Add Metrics section component"
```

---

### Task 5: Create ClientView.jsx

**Files:**
- Create: `src/components/home/ClientView.jsx`

**Step 1: Read source material**

Read `Ummix Landing.dc.html` lines 239-271 ("O que o cliente vê" section: H2 + 3-card grid).

**Step 2: Write `src/components/home/ClientView.jsx`**

Recreate the H2 "Simples para quem contrata." and the 3-card grid (Uma única campanha / Um único contrato / Um único relatório, each with icon + label), white background, using Tailwind. Use `useAnimateOnScroll`.

**Step 3: Verify the build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/home/ClientView.jsx
git commit -m "Add ClientView section component"
```

---

### Task 6: Create Backstage.jsx

**Files:**
- Create: `src/components/home/Backstage.jsx`
- Modify: `src/index.css`

**Step 1: Read source material**

Read `Ummix Landing.dc.html` lines 272-417 ("Bastidores" section in full: left-column stat rows, right-column SVG arc diagram with center badge, traveling dots, floating labels).

**Step 2: Add the arc-dot keyframe and SVG path to index.css**

Add the `.arc-dot` class and its `@keyframes arcDot` (copy the exact `offset-path` SVG path string from line 86 of the source file) to `src/index.css`, plus `.pulse-ring { animation: redPulse 2.8s cubic-bezier(0.16,1,0.3,1) infinite; }`.

**Step 3: Write `src/components/home/Backstage.jsx`**

Recreate the dark section with:
- Left column: 3 stat rows (10 Etapas estratégicas, +50 Atividades operacionais, "Múltiplas Validações").
- Right column: the SVG arc diagram — center "SUA CAMPANHA" pulsing badge using the `.pulse-ring` class, 3 traveling dots (`.arc-dot`, `.arc-dot.d2`, `.arc-dot.d3`) along the arc, and the floating labels ("Negociação Inteligente", "Operação Especializada", "Monitoramento em Tempo Real", "Auditoria Independente", plus the remaining 2 labels — read them directly from the source markup, do not guess).

Use `useAnimateOnScroll` to wrap the section for the `.anim`/`.in` reveal-on-scroll behavior the labels depend on (per the CSS read in Task 1's "before you start" step).

**Step 4: Verify the build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add src/components/home/Backstage.jsx src/index.css
git commit -m "Add Backstage section with arc diagram animation"
```

---

### Task 7: Create Method.jsx (interactive carousel)

**Files:**
- Create: `src/components/home/Method.jsx`

**Step 1: Read source material**

Read `Ummix Landing.dc.html` lines 417-697 in full (all 10 method slides, the chip/progress-bar markup, and the `.method-slide`/`.method-chip`/`.method-progress-fill` CSS classes from lines 100-106).

**Step 2: Write `src/components/home/Method.jsx`**

Build an interactive carousel:
- `useState` for `activeSlide` (0-9).
- `useState` for `isPlaying` (default `true`) to support autoplay with pause-on-manual-navigation.
- `useEffect` with `setInterval` (~5s per slide) that advances `activeSlide` when `isPlaying` is true; clear the interval on unmount.
- Prev/next buttons that call setters, and also set `isPlaying` to `false` on manual interaction (matching the new design's intent — autoplay stops once the user takes control).
- 10 numbered chips (`01`-`10`) that jump directly to a slide on click.
- A progress bar whose fill width reflects `(activeSlide + 1) / 10`.
- All 10 slides' exact copy (étapa title, description, tag-pill text) transcribed verbatim from the source — each slide has a unique title, description paragraph, and a 3-part tag-pill (e.g. "Briefing · Contrato · KPIs" for slide 1).
- Use Framer Motion's `AnimatePresence` + `motion.div` with a fade/translateY transition for the active slide swap, replacing the CSS `.method-slide.active` opacity/transform transition from the source.
- Wrap the whole section in `useAnimateOnScroll` for the initial reveal of the section itself (not the slide-to-slide transition, which is handled by Framer Motion).

**Step 3: Verify the build**

Run: `npm run build`

**Step 4: Manual check**

Run: `npm run dev`, open the homepage, confirm: autoplay advances slides automatically, clicking a chip jumps to that slide and stops autoplay, prev/next buttons work, progress bar updates.

**Step 5: Commit**

```bash
git add src/components/home/Method.jsx
git commit -m "Add interactive Method carousel with autoplay"
```

---

### Task 8: Create Eliminates.jsx

**Files:**
- Create: `src/components/home/Eliminates.jsx`

**Step 1: Read source material**

Read `Ummix Landing.dc.html` lines 699-739 ("O que isso elimina" section: 2-column layout, left text block, right 6-item checklist with X-circle icons).

**Step 2: Write `src/components/home/Eliminates.jsx`**

Recreate the kicker "O que isso elimina", H2 "Menos complexidade. Mais tempo para o que importa.", paragraph, and the 6-item checklist (Negociar com dezenas de veículos / Controlar entregas e prazos / Conferir veiculações / Gerenciar pagamentos e repasses / Consolidar dados e relatórios / Acompanhar cashback e benefícios), white background, using Tailwind. Use `useAnimateOnScroll`.

**Step 3: Verify the build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/home/Eliminates.jsx
git commit -m "Add Eliminates section component"
```

---

### Task 9: Create Deliverables.jsx

**Files:**
- Create: `src/components/home/Deliverables.jsx`

**Step 1: Read source material**

Read `Ummix Landing.dc.html` lines 739-783 ("O que a Ummix realmente entrega" section: dark background, 6-card grid).

**Step 2: Write `src/components/home/Deliverables.jsx`**

Recreate the H2 "Uma operação completa,<br/>um único objetivo." and the 6-card grid (Compra inteligente, Gestão operacional, Auditoria independente, Prestação de contas, Segurança financeira, Transparência total), dark background (`bg-ummix-dark`), using Tailwind. Use `useAnimateOnScroll`.

**Step 3: Verify the build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/home/Deliverables.jsx
git commit -m "Add Deliverables section component"
```

---

### Task 10: Create Segmentations.jsx (tabbed UI)

**Files:**
- Create: `src/components/home/Segmentations.jsx`

**Step 1: Read source material**

Read `Ummix Landing.dc.html` lines 783-920 in full ("Segmentações disponíveis" section: 3 tab buttons, 3 panels each with 8 attributes, and the `.seg-tab`/`.seg-panel`/`chipIn` CSS from lines 108-125).

**Step 2: Write `src/components/home/Segmentations.jsx`**

Build:
- `useState` for `activeTab` (`'demografica' | 'geografica' | 'comportamental'`, default `'demografica'`).
- 3 tab buttons that set `activeTab` on click, styled to highlight the active one (matching `data-seg-tab` source styling).
- 3 panels (`data-seg-panel`-equivalent), only the active one rendered/visible, each listing its 8 attributes exactly as transcribed from source:
  - Demográfica: Idade, Sexo, Renda familiar, Escolaridade, Profissão, Estado civil, Tamanho da família, Faixa etária
  - Geográfica: País, Região, Estado, Cidade, Bairro, CEP, Raio de alcance, Pontos de interesse
  - Comportamental: Interesses, Hábitos de consumo, Estilo de vida, Engajamento digital, Histórico de compras, Padrão de uso, Eventos sazonais, Perfil socioemocional
- Replace the source's inline `onmouseover`/`onmouseout` hover handlers with Tailwind `hover:` classes — no JS needed for the hover effect itself.
- Use a CSS transition (or Framer Motion stagger) for the panel-switch reveal, approximating the `chipIn` staggered entrance from the source CSS added in Task 2.
- White background, kicker "A precisão do digital, na mídia OFF", H2 "Segmentações disponíveis.".

**Step 3: Verify the build**

Run: `npm run build`

**Step 4: Manual check**

Run: `npm run dev`, confirm clicking each of the 3 tabs swaps the panel content correctly.

**Step 5: Commit**

```bash
git add src/components/home/Segmentations.jsx
git commit -m "Add Segmentations tabbed section component"
```

---

### Task 11: Create Results.jsx

**Files:**
- Create: `src/components/home/Results.jsx`

**Step 1: Read source material**

Read `Ummix Landing.dc.html` lines 920-952 ("Resultados" section: white background, 4-card grid).

**Step 2: Write `src/components/home/Results.jsx`**

Recreate the kicker "Resultados que geram impacto", H2 "Mais que entregar mídia — entregar resultado.", and the 4-card grid (Maior eficiência, Segurança e confiança, Agilidade e foco, Visibilidade e controle), using Tailwind. Use `useAnimateOnScroll`.

**Step 3: Verify the build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/home/Results.jsx
git commit -m "Add Results section component"
```

---

### Task 12: Create CashbackSection.jsx

**Files:**
- Create: `src/components/home/CashbackSection.jsx`
- Reference (read-only): `src/components/CashbackBanner.jsx` (current content source)

**Step 1: Read source material**

Read `src/components/CashbackBanner.jsx` in full for the exact existing copy (H2 "Toda campanha fechada pela Ummix Ads gera até 3% de cashback", paragraph about contratante/veículo/agência, CTA "Conhecer o cashback").

**Step 2: Write `src/components/home/CashbackSection.jsx`**

Recreate this content styled as a dark panel with a red radial-gradient glow, matching the visual weight of `Backstage.jsx`/`Deliverables.jsx` from earlier tasks (dark background, Baloo 2 heading, eyebrow/kicker badge) rather than the current plain white-card style. Keep the CTA "Conhecer o cashback" linking to `/cashback.html`, unchanged. Use `useAnimateOnScroll`.

**Step 3: Verify the build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/home/CashbackSection.jsx
git commit -m "Add new dark-styled CashbackSection component"
```

---

### Task 13: Create ForWhom.jsx

**Files:**
- Create: `src/components/home/ForWhom.jsx`

**Step 1: Read source material**

Read `Ummix Landing.dc.html` lines 952-979 ("Para quem é" section: `var(--gray)` background, 3-card grid: Anunciantes / Agências / Veículos).

**Step 2: Write `src/components/home/ForWhom.jsx`**

Recreate the H2 "Um ecossistema conectado. Resultados reais." and the 3-card grid (Anunciantes, Agências, Veículos, with their descriptions from the source), background `bg-ummix-gray`, using Tailwind. Use `useAnimateOnScroll`.

**Step 3: Verify the build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/home/ForWhom.jsx
git commit -m "Add ForWhom section component"
```

---

### Task 14: Create Contact.jsx

**Files:**
- Create: `src/components/home/Contact.jsx`
- Reference (read-only): `src/components/Contact.jsx` (an existing component with this name — check it first to avoid a naming collision)

**Step 1: Check for an existing Contact.jsx collision**

Read `src/components/Contact.jsx` if it exists, and check whether/where it's currently imported (search `src/App.jsx` and any other files for `from '../components/Contact'` or similar). The new design also has a "Contato" section — if the existing `Contact.jsx` is unused dead code, note it for removal in Task 15. If it's actively used elsewhere, name the new component `ContactCTA.jsx` instead of `Contact.jsx` to avoid confusion, and adjust the import in Task 15 accordingly.

**Step 2: Read source material**

Read `Ummix Landing.dc.html` lines 979-999+ (read until the end of the footer markup — confirm the exact end line by checking the file length first) for the "Contato"/footer section: dark background with radial gradient, kicker "Encerramento", H2 "A mídia é o que o cliente vê.", paragraph "O Método Ummix® é tudo o que acontece para garantir a entrega.", 2 CTAs.

**Step 3: Write the new component**

Recreate the closing CTA section. For the 2 CTAs ("Falar com a Ummix", "Acessar a plataforma"), use the existing `PLATFORM_SIGNUP` constant from `src/constants/urls.js` for "Acessar a plataforma" (the source file has a placeholder `href="#"` — replace it with the real platform URL, do not leave a placeholder). "Falar com a Ummix" can link to `mailto:fale@ummix.com.br` (matching the contact pattern used elsewhere in the codebase, e.g. `src/pages/cashback/CashbackPage.jsx`). Do not duplicate the site footer (logo, nav links, copyright) here — that's already handled by the existing `src/components/Footer.jsx`, which stays outside `<main>` in `App.jsx` per the design doc.

**Step 4: Verify the build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add src/components/home/Contact.jsx
git commit -m "Add closing Contact CTA section component"
```

(Substitute the actual filename chosen in Step 1 if it differs from `Contact.jsx`.)

---

### Task 15: Reassemble App.jsx and delete superseded components

**Files:**
- Modify: `src/App.jsx`
- Delete: `src/components/CountersStrip.jsx`
- Delete: `src/components/VideoEmbed.jsx`
- Delete: `src/components/WorkflowSection.jsx`
- Delete: `src/components/Features.jsx`
- Delete: `src/components/CashbackBanner.jsx`
- Delete: `src/components/Segmentation.jsx`
- Delete: `src/components/Testimonials.jsx`
- Delete: `src/components/PlatformAccess.jsx`
- Possibly delete: `src/components/Contact.jsx` (only if Task 14 confirmed it was unused dead code)

**Step 1: Read the current App.jsx**

Read `src/App.jsx` in full to see the current import list and JSX structure (`Header, Hero, CountersStrip, VideoEmbed, WorkflowSection, Features, CashbackBanner, Segmentation, Partners, Testimonials, PlatformAccess`, plus `FloatingCTA` and `Footer`).

**Step 2: Rewrite the imports and JSX**

Replace the imports for the 8 deleted components with imports from `src/components/home/`: `Hero, Metrics, ClientView, Backstage, Method, Eliminates, Deliverables, Segmentations, Results, CashbackSection, ForWhom, Contact` (or the renamed Contact-equivalent file). Keep the `Partners` import pointing at `src/components/Partners.jsx` (unchanged, unmoved).

Order the `<main>` JSX exactly as:

```jsx
<main>
  <Hero />
  <Metrics />
  <ClientView />
  <Backstage />
  <Method />
  <Eliminates />
  <Deliverables />
  <Segmentations />
  <Results />
  <CashbackSection />
  <ForWhom />
  <Partners />
  <Contact />
</main>
```

Keep `<Header />` before `<main>` and `<FloatingCTA />` / `<Footer />` after `<main>`, unchanged from the current structure.

**Step 3: Delete the 8 (or 9) superseded component files**

Use `git rm` for each file listed above whose content is now fully covered by a new `src/components/home/*` component, confirming no other file still imports them (re-check with a search before deleting each one).

**Step 4: Verify the build**

Run: `npm run build`
Expected: build succeeds with no missing-import errors.

**Step 5: Manual check**

Run: `npm run dev`, open the homepage in a browser, scroll through the full page top to bottom, and confirm:
- All 13 sections render in the correct order with no console errors.
- The Method carousel autoplays and the chips/buttons work.
- The Segmentations tabs switch correctly.
- The Partners marquees still scroll.
- The Hero shows the old copy and the AwardsCard.
- The CashbackSection CTA links to `/cashback.html`.
- The Contact section's platform CTA links to the real `app.ummix.com.br` URL, not a placeholder.

**Step 6: Commit**

```bash
git add src/App.jsx
git add -u
git commit -m "Reassemble homepage with new 13-section design, remove superseded components"
```

---

## Notes for the implementing engineer

- This codebase has no automated test suite. "Test" in this plan means: `npm run build` succeeds, and a manual visual/interaction check in the dev server against the corresponding section of `Ummix Landing.dc.html`.
- Every new component in `src/components/home/` should follow the existing `useAnimateOnScroll` usage pattern visible in `src/components/Partners.jsx` (`const anim = useAnimateOnScroll(); <div ref={anim.ref} style={anim.style}>`).
- Do not introduce new dependencies — Framer Motion is already installed and used elsewhere (check `src/components/Hero.jsx` or similar for existing `motion.div` usage patterns before writing new ones).
- Tailwind tokens (`ummix-red`, `ummix-dark`, `ummix-gray`, `font-heading`, `font-sans`) already match the new design's CSS vars — do not invent new ad hoc color values; use the existing tokens, falling back to Tailwind arbitrary values (e.g. `bg-[rgba(155,25,26,0.45)]`) only for one-off glow effects that don't warrant a new token.

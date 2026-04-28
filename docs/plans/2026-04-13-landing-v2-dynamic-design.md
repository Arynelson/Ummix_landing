# Ummix Ads Landing Page v2 — Design Document

**Date:** 2026-04-13  
**Status:** Approved  

---

## Context

The Ummix Ads landing page currently serves as a marketing site with a lead-gen contact form. The platform (campaign creator) is ~75% built and will launch together with the site. Going forward, the landing page has two roles:

1. **Marketing** — communicate value, build trust, drive scroll narrative
2. **Platform gateway** — all primary CTAs lead directly to the platform auth page

Stack: React + Vite + Tailwind CSS + Framer Motion (already installed).

---

## Goals

- Make the site feel like a dynamic, tech-forward ad-tech product
- Replace the lead-gen form with direct access to the platform
- Add scroll-driven storytelling and rich micro-interactions
- Maintain performance (no heavy pinned-scroll libraries)

---

## Platform Auth URL

Placeholder: `https://ummix.workintech.com.br`  
- Signup: `https://ummix.workintech.com.br/signup`  
- Login: `https://ummix.workintech.com.br/login`  

Replace with production URL before launch.

---

## Design Decisions

### 1. Hero — Split Layout

**Desktop:** Two-column layout (text left, platform screenshot right).  
**Mobile:** Stacked (text top, screenshot bottom, reduced height).

**Left panel:**
- Headline + subtitle (existing copy)
- Two CTAs: `Criar conta grátis` (primary, red) → `/signup` | `Entrar` (outline) → `/login`
- Both open in new tab (`target="_blank"`)

**Right panel:**
- Platform screenshot inside a stylized browser frame component (`BrowserFrame`)
- Browser frame: dark top bar with three colored dots + fake URL bar showing `app.ummixads.com.br`
- Screenshot: `public/assets/platform-preview.png` (to be provided by user)
- Subtle 3D tilt on load (`rotateY: -8deg → 0deg`) via Framer Motion, straightens on hover
- Bottom gradient fade masks any unfinished UI in the screenshot

### 2. Counters Strip

A slim `bg-ummix-red` strip between Hero and VideoEmbed. Four animated counters that trigger on viewport entry:

| Metric | Value |
|--------|-------|
| Anunciantes | +500 |
| ROI médio | 3x |
| Veículos de mídia | 150+ |
| Mídia gerenciada | R$ 50M+ |

Values are placeholders — confirm real numbers before launch. Uses a simple `useCountUp` hook built internally (no extra dependency).

### 3. Floating CTA

- **Desktop:** fixed button bottom-right, appears after scrolling 100vh past Hero
- **Mobile:** fixed bottom bar full-width
- Text: `Criar conta grátis →`
- Fades in/out with Framer Motion `AnimatePresence`
- Hidden when user reaches `#acesso` section (final section)

### 4. Contact Section → Platform Access Section (`#acesso`)

The current `Contact` component (lead-gen form) is replaced by `PlatformAccess`:

- Background: `bg-ummix-dark`
- Headline: `Pronto para começar?`
- Subtitle: `Acesse a plataforma e crie sua primeira campanha hoje.`
- Two buttons: `Criar conta grátis` (red, full) + `Já tenho conta — Entrar` (outline white)
- Optional: small link below — `Dúvidas? tecnologia@ummix.com.br`

---

## What Stays the Same

| Section | Change |
|---------|--------|
| Header | CTA text already updated ("Plataforma Ummix Ads") — update href to `/signup` |
| VideoEmbed | No change |
| Features | No change |
| Segmentation | No change |
| Partners | No change |
| Testimonials | No change (carousel already implemented) |
| Footer | No change |

---

## Components to Create

| Component | File | Description |
|-----------|------|-------------|
| `BrowserFrame` | `src/components/BrowserFrame.jsx` | Stylized browser chrome wrapper |
| `CountersStrip` | `src/components/CountersStrip.jsx` | Animated metrics row |
| `FloatingCTA` | `src/components/FloatingCTA.jsx` | Sticky CTA button/bar |
| `PlatformAccess` | `src/components/PlatformAccess.jsx` | Replaces Contact section |
| `useCountUp` | `src/hooks/useCountUp.js` | Count animation hook |

---

## Assets Required from User

- `public/assets/platform-preview.png` — screenshot of the platform dashboard/campaign creator

---

## Auth URL Constants

Centralize in one file to make future URL swap easy:

```js
// src/constants/urls.js
export const PLATFORM_SIGNUP = 'https://ummix.workintech.com.br/signup'
export const PLATFORM_LOGIN  = 'https://ummix.workintech.com.br/login'
```

---

## Out of Scope

- Actual authentication logic
- Backend integration for the counters (values are hardcoded)
- Apple-style pinned scroll sections (deferred — performance risk on mobile)

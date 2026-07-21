---
target: homepage and cashback
total_score: 25
p0_count: 0
p1_count: 3
timestamp: 2026-07-21T18-48-27Z
slug: src-app-jsx-src-pages-cashback-cashbackpage-jsx
---
## Impeccable critique — homepage and cashback

Method: dual-agent (design review and detector/static evidence). Browser automation was unavailable in this session.

### Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | Method autoplay is the only explicit progress/status cue. |
| 2 | Match System / Real World | 3 | PI, BV, CPM and inventory need plain-language bridges. |
| 3 | User Control and Freedom | 3 | Method controls exist; autoplay lacks an explicit pause state. |
| 4 | Consistency and Standards | 3 | Brand system is coherent; header CTA differs from shared pill CTAs. |
| 5 | Error Prevention | 2 | Platform CTAs do not set eligibility or next-step expectations. |
| 6 | Recognition Rather Than Recall | 3 | Cashback sequence is clear; homepage proposition is distributed across many sections. |
| 7 | Flexibility and Efficiency | 2 | Homepage makes the educational route primary over starting a campaign. |
| 8 | Aesthetic and Minimalist Design | 2 | Repeated eyebrow/card/glow treatment weakens narrative pacing. |
| 9 | Error Recovery | 2 | Cashback support is only a bottom-page email link. |
| 10 | Help and Documentation | 2 | Conditions and terms lack contextual explanations. |
| **Total** |  | **25/40** | **Promising system; needs sharper conversion and less repetition.** |

### Anti-patterns and evidence

- Design review: moderate AI-template risk from repeated uppercase eyebrows, icon-card grids and radial glows.
- Detector: one confirmed warning: `side-tab` at `src/components/home/Eliminates.jsx:35` (`border-l-3 border-ummix-red`). No false positives.
- Browser overlay: unavailable; no browser automation tool was exposed.
- Static evidence: no `prefers-reduced-motion` fallback for infinite CSS motion; no explicit global focus-visible treatment; mobile header hides navigation without a menu; cashback step dividers remain right borders when the grid wraps.

### What works

1. The red/graphite identity, typography and CTA treatment form a recognizable shared foundation.
2. The homepage's responsibility split between advertiser and Ummix communicates the offer clearly.
3. Cashback has a sensible eligibility-to-action narrative.

### Priority issues

1. **P1 — Homepage conversion story is overextended.** Combine overlapping proof sections into promise, how-it-works, proof and conversion.
2. **P1 — Homepage CTA hierarchy favours method education over campaign start.** Make campaign start primary; retain the method as supporting discovery.
3. **P1 — Repeated card/eyebrow grammar makes both pages feel templated.** Keep cards only where comparison is necessary and use a distinct proof artifact or diagram elsewhere.
4. **P2 — Cashback eligibility is not reassured at the external CTA.** Add a concise conditions/next-step note beneath each platform link.
5. **P2 — Motion and mobile accessibility need hardening.** Support reduced motion, visible keyboard focus, a mobile navigation route, and responsive step dividers.

### Persona red flags

- **Jordan (first-time advertiser):** operational acronyms and method-first CTA obscure how to start.
- **Riley (agency/intermediary):** cashback responsibility and PI-related conditions are not resolved near the action.
- **Casey (mobile/vehicle representative):** no mobile menu; vehicle path and partnership CTA are buried.

### Questions

1. Is the homepage's primary conversion a self-serve campaign, proposal request or specialist conversation?
2. Should advertisers, agencies and vehicles gain intentional entry routes earlier in the homepage?

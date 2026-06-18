---
name: ummix-design
description: Use this skill to generate well-branded interfaces and assets for Ummix Ads, either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the ad-tech landing page and related marketing surfaces.
user-invocable: true
---

Read the `README.md` in this skill first — it covers the brand context (Brazilian ad-tech, pt-BR, Prêmio Nacional de Inovação winner), content fundamentals, visual foundations (Ummix Red `#C8102E` + Ummix Dark `#1A1A1A` + Ummix Gray `#F5F5F5`, Baloo 2 for headings, Plus Jakarta Sans for body), and iconography (Lucide). Then:

- **`colors_and_type.css`** — drop-in custom properties. Import this from any HTML you generate so colors, type roles, radii and shadows all match the brand.
- **`assets/`** — real raster logos (broadcasters, clients, awards), platform screenshots, hero background photo, `Flow_ummix.png`. Copy what you need into the output folder — never draw your own SVG marks or invent new logos.
- **`landing_v2/`** — canonical modernized landing (the landing UI kit). `index.html` is a working reference; individual components (`V2Header`, `V2HeroA/B/C`, `V2Pillars`, `V2Method`, `V2Segmentation`, `V2Testimonial`, `V2Footer`) can be lifted piecemeal into prototypes.
- **`subpages/`** — `partner.html` (programa de parcerias) and `cashback.html` (cashback 3%), built in the same v2 language with shared `Chrome.jsx` (header/footer).
- **`preview/`** — small cards demonstrating each token / component in isolation; useful to cite when justifying a design choice.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. If working on production code, read the rules in the README to become an expert in designing with this brand.

If the user invokes this skill without other guidance, ask what they want to build or design, ask follow-up questions, and act as an expert designer who outputs HTML artifacts or production code as needed.

**Hard rules to carry into any Ummix output:**
- Portuguese (pt-BR) copy.
- Exactly one brand red; no secondary accent colors; no rainbow gradients.
- Pill-shaped primary CTAs (`rounded-full`), scale 1.05 on hover.
- Baloo 2 Black (900) + ALL-CAPS only on hero display lines.
- No emoji in body copy — the single 🏆 in the award pill is the sole exception.
- Lucide icons only, inside a `rounded-xl` red-tinted tile. Never hand-drawn mascots.
- Dark sections (`#1A1A1A`) alternate with light (white / `#F5F5F5`) to create rhythm.

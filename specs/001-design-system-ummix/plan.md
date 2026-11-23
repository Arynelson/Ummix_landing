# Implementation Plan: Migração do site para o design system oficial Ummix Ads

**Branch**: `001-design-system-ummix` | **Date**: 2026-11-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-design-system-ummix/spec.md`

## Summary

Trocar a identidade visual das 19 páginas pela do design system oficial `ummix-ads-design` e corrigir os textos que contrariam o posicionamento atual (só rádio e TV, central de dados, "Top N"), nos 3 idiomas.

Abordagem técnica (detalhes em [research.md](./research.md)):

1. **Ponte de tokens primeiro.** Os tokens oficiais são copiados para `src/ds/tokens/`. As variáveis antigas do `@theme` (`--color-ummix-*`, `--font-family-*`) passam a apontar para eles. Com isso, as 300+ classes `*-ummix-*` existentes em 24 arquivos mudam de cor e fonte numa única alteração, sem quebrar nada.
2. **Limpeza por página.** Cada página tem as classes antigas trocadas por classes semânticas (`text-strong`, `bg-accent`...) e os hexadecimais e efeitos proibidos removidos. No fim, a ponte é apagada.
3. **Componentes em `src/ds/`**, copiados do design system. São adaptados em três pontos registrados: `href` no Button, repasse de props nativas nos campos e um `Textarea` novo.
4. **Textos** corrigidos nos arquivos `*-copy.js`, nas metatags, no `llms.txt` e no JSON-LD.
5. **Um script de verificação**, `scripts/verify-design-system.mjs`, transforma os cenários estáticos da spec (CT-01, 02, 03, 05, 10, 12) em checagem automática.

## Technical Context

**Language/Version**: JavaScript (ES modules) + JSX. Node ≥ 20 (necessário para o Vite 8).

**Primary Dependencies**:
- React 19.2;
- Vite 8 com `@vitejs/plugin-react`;
- Tailwind CSS 4.2 (`@tailwindcss/vite`, configurado por `@theme` em CSS);
- Framer Motion 12;
- lucide-react 1.7;
- react-helmet-async 3.

Nenhuma dependência nova.

**Storage**: N/A (site estático).

**Testing**:
- Não há framework de teste. A verificação é feita por scripts Node em `scripts/` (`verify-build-assets`, `verify-hosting-routes`, `verify-site-form`, `verify-spanish-routes`), mais `npm run build`.
- Este plano acrescenta `scripts/verify-design-system.mjs` e as checagens de navegador do [quickstart.md](./quickstart.md).

**Target Platform**: navegadores modernos (desktop e mobile). Publicação estática na Locaweb (Apache + PHP para os formulários). Prévia na Vercel.

**Project Type**: site estático com várias páginas (multi-page app no Vite, 19 entradas HTML).

**Performance Goals**: Lighthouse Performance mobile na home ≥ valor atual − 3 (SC-006). A troca de fontes não pode aumentar o número de famílias carregadas: sai 2, entra 3, compensado com pesos limitados (ver research R-04).

**Constraints**:
- Nenhuma URL muda (`.htaccess`, `sitemap.xml`).
- O contrato dos formulários não muda (`POST /api/site-form.php`, mesmo payload).
- O site não importa nada de fora do repositório.
- Contraste WCAG 2.1 AA.

**Scale/Scope**:
- 19 páginas;
- cerca de 10 mil linhas em `src/`;
- 24 arquivos com classes `*-ummix-*`;
- 3 CSS de página grandes: `monetize.css` com 1.110 linhas, `investidores.css` com 785 e `campanha.css` com 1.525;
- 6 arquivos de texto, cada um em 3 idiomas;
- 4 formulários.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

`.specify/memory/constitution.md` ainda é o modelo vazio do spec-kit: o projeto não tem princípios ratificados. **Não há gates de constituição para avaliar.** Como substituto, este plano segue as regras obrigatórias do projeto e da empresa, que valem como gates:

| Gate | Fonte | Situação no plano |
|---|---|---|
| Vermelho único `#9A191A`, grafites quentes, Poppins + IBM Plex | `ummix-ads-design/SKILL.md` | Atendido por FR-001/002 e pela ponte de tokens (R-01) |
| Cores chapadas, sem gradiente e sem glow | `ummix-ads-design/SKILL.md` | Atendido por FR-003. O token `--glow-red` **não** é copiado para uso (R-06) |
| Copiar os assets e componentes, não apontar para o design system | `ummix-ads-design/SKILL.md` | Atendido por FR-005 (`src/ds/`, `public/assets/ds/`) |
| Só rádio e TV, central de dados, "Top N" | Regras comerciais de 17–18/11/2026 | Atendido por FR-010/011/012 e checado automaticamente (CT-10, CT-12) |
| Texto corrido justificado, títulos não | Regra da Ummix | Atendido por FR-013 (`.copy-justify` mantida) |
| Nada direto na `main` do repositório do Ary | Premissa da spec | Branch `001-design-system-ummix` + PR |

**Re-check pós-design:** nenhum gate violado. Sem itens de Complexity Tracking.

Recomendação para depois desta feature: ratificar uma constituição curta com essas regras (`/speckit-constitution`), para que as próximas specs tenham gates formais.

## Project Structure

### Documentation (this feature)

```text
specs/001-design-system-ummix/
├── spec.md              # Spec aprovada (entrevista 23/11/2026)
├── plan.md              # Este arquivo
├── research.md          # Fase 0: decisões técnicas R-01..R-09
├── data-model.md        # Fase 1: mapa de tokens antigo → oficial, entidades de texto
├── quickstart.md        # Fase 1: como validar de ponta a ponta
├── contracts/
│   ├── ds-components.md     # API das cópias locais em src/ds/ (e o que muda em relação ao original)
│   └── verify-design-system.md  # Contrato do script de verificação (entradas, regras, saída)
└── tasks.md             # Fase 2: gerado por /speckit-tasks (ainda não criado)
```

### Source Code (repository root)

```text
src/
├── ds/                          # NOVO: cópia local do design system
│   ├── README.md                # origem, data da cópia, adaptações (FR-005)
│   ├── tokens/                  # colors, typography, spacing, effects (sem fonts.css; ver R-04)
│   ├── ds.css                   # importa tokens/*.css e define .copy-justify e o foco
│   └── components/              # Button, IconButton, Logo, Card, Badge, Tag, StatCard,
│                                # Input, Textarea (novo), Select, Checkbox, Tabs, Toast
├── index.css                    # @theme passa a mapear os tokens oficiais (ponte → semântico)
├── components/                  # Header, Footer, Hero, Partners, BrowserFrame, home/*
├── pages/                       # cashback, partner, monetize, investidores, awards, campanha, subpages
├── *-copy.js                    # textos pt/en/es (FR-010/011)
└── services/formSubmit.js       # NÃO muda

public/
├── assets/ds/                   # NOVO: logos SVG, grafismo-espectro.svg, icones-pixel/*.svg
├── llms.txt, sitemap.xml        # textos revisados (URLs iguais)
└── api/*.php                    # NÃO muda

scripts/
└── verify-design-system.mjs     # NOVO: CT-01, 02, 03, 05, 10, 12

index.html, cashback.html, partner.html, monetize.html, investidores.html, premios.html,
en/*.html, es/*.html, lp/campanha.html   # link de fontes + metatags (19 arquivos)
```

**Structure Decision**: o projeto continua como site multi-página único na raiz. Não há separação frontend/backend: o PHP de formulários fica em `public/api/` e não é tocado. A única pasta estrutural nova é `src/ds/`, a fronteira entre o design system copiado e o código do site. As adaptações locais ficam documentadas no README dela, para facilitar uma futura re-sincronização com o original.

## Fases de implementação (ordem sugerida para `/speckit-tasks`)

| Fase | Entrega | Cobre | Risco |
|---|---|---|---|
| 0. Linha de base | Medir o Lighthouse atual da home; capturar as 19 rotas (screenshot) e o payload dos 4 formulários | SC-006, CT-07 | Baixo |
| 1. Fundação | `src/ds/` com tokens + `ds.css`; ponte no `@theme`; troca do link de fontes nos 19 HTMLs; `verify-design-system.mjs` (que começa falhando) | FR-001, FR-002, FR-005 | Médio: a ponte muda a cor do site inteiro de uma vez |
| 2. Marca | Logos SVG no Header e no Footer; remoção de `redPulse`, `pulse-ring`, `arc-dot` e dos glows e gradientes dos 10 arquivos | FR-003, FR-004 | Médio: o hero perde a animação atual e precisa de outro destaque (Espectro, fase 6) |
| 3. Componentes | Button/link, campos e feedback; migração dos 4 formulários | FR-006, FR-007, FR-015 | Médio: formulários são caminho de receita |
| 4. Páginas | Home → cashback → partner → monetize → investidores → premios → lp/campanha: classes semânticas, CSS de página sobre tokens e fim da ponte | FR-008, FR-013 | Alto em `campanha.css` (1.525 linhas) |
| 5. Textos | RN-01 nos 3 idiomas, posicionamento, "Top N", metatags, JSON-LD, `llms.txt` | FR-010, FR-011, FR-012, RN-02, RN-03 | Médio: tradução EN/ES precisa da revisão do Edy |
| 6. Espectro e ícones | Grafismo nas seções grafite; ícones pixel para meios e canais; Lucide com 1.75 | FR-009 | Baixo |
| 7. Validação | Script verde, build, `verify:*`, auditoria `web-design-guidelines`, crítica `impeccable`, Lighthouse | Todos os CT, SC-001..006 | — |

Skills por fase: `ummix-ads-design` (1–6), `impeccable` (2, 4, 6 e crítica na 7), `vercel-react-best-practices` (3–4), `seo` (5), `web-design-guidelines` (7).

## Complexity Tracking

Sem violações a justificar.

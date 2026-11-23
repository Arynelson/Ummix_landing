# Data Model: tokens, componentes e textos

Não há banco nem dados persistidos. As "entidades" desta feature são o vocabulário visual, os componentes locais e os blocos de texto por idioma.

## 1. Mapa de tokens: antigo → oficial

Usado na ponte (R-01) e na troca semântica por página (fase 4).

| Antigo (`src/index.css`) | Valor antigo | Ponte (fase 1) | Classe semântica alvo (fase 4) | Observação |
|---|---|---|---|---|
| `--color-ummix-red` / `--ummix-red` | `#9b191a` | `var(--red-600)` = `#9A191A` | `text-brand`, `bg-accent`, `border-accent` | Em fundo escuro, o texto de marca é `--text-brand` = `--red-400` (aplicado automaticamente pelo tema dark) |
| `--color-ummix-red-dark` / `--ummix-red-dark` | `#7a1415` | `var(--red-700)` | `bg-accent-hover` (hover) | Só para estados de hover/ativo |
| `--color-ummix-dark` / `--ummix-dark` | `#1e1e1e` | `var(--ink-900)` = `#211B1A` | `text-strong` (texto); `bg-inverse` + `data-theme="dark"` (seção) | É o fundo escuro de marca |
| `--color-ummix-grafite` | `#2A2A2A` | `var(--ink-800)` | `bg-card` dentro de seção dark | |
| `--color-ummix-gray` / `--ummix-gray` | `#f4f2f2` | `var(--ink-50)` | `bg-sunken` | |
| `--color-ummix-gray-dark` | `#333333` | `var(--ink-700)` | `text-body` | Para texto de corpo, o certo é `--text-body` (`--ink-800`); conferir o contraste |
| `text-ummix-dark/10..20` (bordas) | — | ponte | `border-line-subtle` / `border-line` | As opacidades viram tokens de borda |
| `bg-ummix-red/8..30` | — | ponte | `bg-accent-soft` / `bg-accent-soft-strong` | |
| `--font-family-heading` | Baloo 2 | `var(--font-display)` (Poppins) | `font-display` | 62 usos de `font-heading` |
| `--font-family-body` | Plus Jakarta Sans | `var(--font-body)` (IBM Plex Sans) | `font-body` | |
| — | — | — | `font-mono` (IBM Plex Mono) | Kickers, números de dado, rótulos técnicos |
| `--ummix-radius-control` | `9999px` | removido | `--radius-md` nos controles | Ver R-03 |
| `--ummix-ease-out` | `cubic-bezier(0.16,1,0.3,1)` | `var(--ease-out)` | `--ease-out` | |

**Hexadecimais soltos encontrados em `src/`**, que precisam de um token cada:

| Hex | Usos | Token sugerido |
|---|---|---|
| `#9b191a` | 7 | `--red-600` |
| `#d7605d` | 7 | `--red-400` |
| `#f4f2f2` | 5 | `--ink-50` |
| `#1e1e1e` | 5 | `--ink-900` |
| `#7a1415` | 4 | `--red-700` |
| `#2a2a2a` | 4 | `--ink-800` |
| `#6b6666`, `#4d4848` | 3 cada | `--ink-500` / `--ink-600` |
| `#181818`, `#101010`, `#090909`, `#1a1a1a`, `#242424` | 2–3 cada | `--ink-900` / `--ink-950` |
| `#fff0ef`, `#fff8f7` | 1–2 | `--red-50` |
| `#f24648` | 2 | `--red-400` (não há vermelho mais vivo no design system) |
| `#16a34a` | 2 | `--success-600` |
| `#fafafa`, `#d7d3d3`, `#333333` | 2 cada | `--ink-25`, `--ink-200`, `--ink-700` |

**Regra de validação:** depois da fase 4, nenhum hexadecimal de cor em `src/` fora de `src/ds/tokens/`, exceto `#FFFFFF`/`#fff` usado como `--on-accent` (CT-01).

## 2. Componentes locais (`src/ds/components/`)

| Componente | Origem | Adaptação local | Usado em |
|---|---|---|---|
| `Button` | `actions/Button.jsx` | `href`/`target`/`rel` → `<a>`; hover e pressionado em CSS | Header (CTA), CTAs de seção, envio dos formulários |
| `IconButton` | `actions/IconButton.jsx` | hover em CSS | Menu mobile, controles do Method |
| `Logo` | `brand/Logo.jsx` | nenhuma | Header, Footer, SubChrome |
| `Card`, `StatCard`, `Badge`, `Tag` | `display/*` | nenhuma | Deliverables, Segmentations, provas numéricas, kickers |
| `Tabs` | `navigation/Tabs.jsx` | nenhuma | Seletor de idioma / abas, se aplicável |
| `Toast` | `feedback/Toast.jsx` | nenhuma | Retorno de sucesso/erro dos formulários (CT-08) |
| `Input`, `Select`, `Checkbox` | `forms/*` | `forwardRef` + `...rest` + `id` ligado ao label | 4 formulários |
| `Textarea` | **novo** | visual do `Input` | Contato (home), formulários com mensagem |

Contrato de props: [contracts/ds-components.md](./contracts/ds-components.md).

## 3. Blocos de texto por idioma

| Arquivo | Estrutura | O que muda |
|---|---|---|
| `src/home-copy.js` | `{ pt, en, es }` | Hero (posicionamento), "mídia offline" (`:126`), revisão RN-01 |
| `src/partner-copy.js` | `{ pt, en, es }` | "out-of-home" (`:64`), "mídia offline" (`:19`) |
| `src/cashback-copy.js`, `src/monetize-copy.js` | `{ pt, en, es }` | Só a revisão RN-01 |
| `src/pages/investidores/investidores-copy.js` | `{ pt, en, es }` | Revisão RN-01; números de captação continuam como estão |
| `src/pages/awards/awards-page-data.js` | `statuses` por idioma | `fourthPlace` → "Top 4" (`:170`, `:252` e EN) |
| `src/pages/campanha/main.jsx` | texto direto no JSX (PT) | "mídia offline" (`:466,606,611,719`) |
| `src/components/home/ForWhom.jsx` | texto direto (`:74`) | "mídia offline" |
| 19 HTMLs | `<meta>`, OG, Twitter, JSON-LD | Descrição institucional (FR-011) e RN-01 |
| `public/llms.txt` | texto | Posicionamento e RN-01 |

**Regra de validação (RN-01):** lista de termos em [contracts/verify-design-system.md](./contracts/verify-design-system.md). Zero ocorrências, sem diferenciar maiúsculas, nos arquivos acima.

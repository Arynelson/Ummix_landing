---
description: "Tarefas da migração do site para o design system oficial Ummix Ads"
---

# Tasks: Migração do site para o design system oficial Ummix Ads

**Input**: documentos de `/specs/001-design-system-ummix/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: a spec define cenários obrigatórios (CT-01 a CT-18). O projeto não tem framework de teste. A verificação é feita pelo script `scripts/verify-design-system.mjs` (criado na fase 2 e que começa falhando), pelos `verify-*.mjs` existentes e pelas checagens de navegador e de auditoria do [quickstart.md](./quickstart.md).

**Organization**: as tarefas estão agrupadas por user story da spec (US1 a US4).

**Origem do design system** (para copiar, nunca importar): `U:\Drives compartilhados\Ummix Ads   Claude\Oraculo\design-system\ummix-ads-design\`, abreviado abaixo como `$DS`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência de tarefa incompleta)
- **[Story]**: user story da spec (US1, US2, US3, US4)

---

## Phase 1: Setup (linha de base e cópia do design system)

**Purpose**: registrar como o site está hoje e trazer o design system para dentro do repositório.

- [X] T001 Medir a linha de base: `npm install`, `npm run build`, rodar Lighthouse mobile na home (`npm run preview`) e salvar o resultado em `specs/001-design-system-ummix/baseline/lighthouse-home.json` (SC-006)
- [X] T002 [P] Capturar screenshots em 1280px e 375px das 19 rotas listadas no `vite.config.js` e salvar em `specs/001-design-system-ummix/baseline/screens/`
- [X] T003 [P] Registrar o payload atual dos 4 formulários (home `src/components/home/Contact.jsx`, `src/pages/MonetizePage.jsx`, `src/pages/partner/PartnerPage.jsx`, `src/pages/campanha/main.jsx`) rodando `node scripts/verify-site-form.mjs` e salvando a saída em `specs/001-design-system-ummix/baseline/form-payloads.txt` (CT-07)
- [X] T004 Copiar `$DS/tokens/colors.css`, `typography.css`, `spacing.css` e `effects.css` para `src/ds/tokens/`. **Não** copiar `fonts.css` nem `base.css` (research R-04)
- [X] T005 [P] Copiar `$DS/assets/logo-ummix-{vermelha,branca,preta}.svg`, `grafismo-espectro.svg` e `icones-pixel/*.svg` (exceto `outdoor.svg` e `outdoor-branco.svg`) para `public/assets/ds/` (research R-07)
- [X] T006 [P] Criar `src/ds/README.md` com "Origem: Oraculo/design-system/ummix-ads-design", "Copiado em: <data>", a lista de arquivos copiados e uma seção "Adaptações locais", que começa vazia (FR-005, contrato `ds-readme`)

---

## Phase 2: Foundational (bloqueia todas as user stories)

**Purpose**: ponte de tokens, fontes e verificação automática. Com esta fase pronta, o site inteiro já muda de cor e de fonte.

**⚠️ CRITICAL**: nenhuma user story começa antes desta fase.

- [X] T007 Criar `scripts/verify-design-system.mjs` conforme [contracts/verify-design-system.md](./contracts/verify-design-system.md) (10 regras, flag `--dist`, saída `arquivo:linha regra trecho`, código 1 em caso de violação) e adicionar `"verify:design-system": "node scripts/verify-design-system.mjs"` em `package.json`. Rodar e salvar a contagem inicial de violações em `specs/001-design-system-ummix/baseline/verify-inicial.txt`
- [X] T008 Criar `src/ds/ds.css`, que importa `./tokens/colors.css`, `typography.css`, `spacing.css` e `effects.css` e define o `body` com `var(--bg-page)`, `var(--text-body)` e `var(--type-body)`
- [X] T009 Em `src/index.css`: importar `./ds/ds.css` logo após `@import "tailwindcss"` e reescrever o `@theme` como **ponte**, seguindo [data-model.md §1](./data-model.md) (`Tokens.--color-ummix-red` → `var(--red-600)`, `--color-ummix-red-dark` → `var(--red-700)`, `--color-ummix-dark` → `var(--ink-900)`, `--color-ummix-grafite` → `var(--ink-800)`, `--color-ummix-gray` → `var(--ink-50)`, `--color-ummix-gray-dark` → `var(--ink-700)`, `--font-family-heading` → `var(--font-display)`, `--font-family-body` → `var(--font-body)`). Fazer o mesmo no `:root` (`--ummix-red` etc.) e trocar `--ummix-ease-out` por `var(--ease-out)` (research R-01)
- [X] T010 Em `src/index.css`, acrescentar ao `@theme` (usando `@theme inline`) as cores semânticas e as escalas do research R-02: `--color-strong`, `--color-body`, `--color-muted`, `--color-brand`, `--color-accent`, `--color-accent-hover`, `--color-accent-soft`, `--color-accent-soft-strong`, `--color-page`, `--color-sunken`, `--color-card`, `--color-inverse`, `--color-line`, `--color-line-subtle`, `--color-red-50..950`, `--color-ink-0..950`, `--font-display`, `--font-body`, `--font-mono`, `--radius-*`
- [X] T011 Validar a suposição do R-02: criar temporariamente uma seção com `data-theme="dark"` e `text-strong bg-card` em `src/App.jsx`, conferir no navegador que as cores se invertem e remover a seção. Se não funcionar, registrar a alternativa adotada em `research.md` (R-02) antes de seguir
- [X] T012 [P] Trocar o `<link>` do Google Fonts nos 19 HTMLs (`index.html`, `cashback.html`, `partner.html`, `monetize.html`, `investidores.html`, `premios.html`, `en/*.html`, `es/*.html`, `lp/campanha.html`) pelo link de Poppins, IBM Plex Sans e IBM Plex Mono do research R-04, mantendo os `preconnect` (FR-002, CT-02)
- [X] T013 Em `src/index.css`, manter `.copy-justify`, `.section-subtitle`, `.skip-link` e o bloco `prefers-reduced-motion`. Trocar `:focus-visible` para `outline: 3px solid var(--focus-ring)` (FR-013, FR-015)
- [X] T014 Rodar `npm run build` e `npm run verify:build-assets` e conferir visualmente 3 rotas: o site deve estar inteiro com as cores e fontes novas e sem quebra de layout

**Checkpoint**: o site já tem as cores e fontes oficiais via ponte; o script de verificação está rodando (ainda com violações).

---

## Phase 3: User Story 1 - Identidade visual oficial em todo o site (Priority: P1) 🎯 MVP

**Goal**: as 19 páginas com o vermelho, os grafites, as fontes e o logo oficiais, sem glow e sem gradiente, e sem nenhum resto do vocabulário antigo.

**Independent Test**: `npm run verify:design-system` sem violações das regras `old-tokens`, `loose-hex`, `old-fonts`, `new-fonts` e `glow-gradient`; navegador conforme o quickstart §4 (logo e fontes).

### Marca e efeitos

- [X] T015 [US1] Trocar o `<img src="/assets/logo-ummix-ads.png">` de `src/components/Header.jsx:87` pelo componente `Logo` (copiado em T016), com variante conforme a superfície (`vermelha` em fundo claro, `branca` em fundo escuro) (FR-004)
- [X] T016 [P] [US1] Copiar `$DS/components/brand/Logo.jsx` para `src/ds/components/Logo.jsx` (sem adaptação) e exportá-lo em `src/ds/components/index.js`
- [X] T017 [P] [US1] Trocar o logo em `src/components/Footer.jsx` e em `src/pages/subpages/SubChrome.jsx` pelo `Logo` (FR-004)
- [X] T018 [P] [US1] Atualizar `public/assets/og-image.png` com uma versão com o logo oficial e o fundo `--ink-900` (sem gradiente) e referenciá-la nos 19 HTMLs. Gerar os favicons (`public/favicon*.png`, `apple-touch-icon.png`, `android-chrome-*.png`) a partir do avatar oficial `$DS/assets/avatar-vermelho.png` (FR-004)
- [X] T019 [US1] Remover de `src/index.css` os `@keyframes redPulse`, `.pulse-ring`, `@keyframes arcDot`, `.arc-dot` (`.d2`, `.d3`) e os usos dessas classes nos JSX (localizar com `npm run verify:design-system`) (FR-003, R-06)
- [X] T020 [P] [US1] Remover glow e gradiente e trocar por cor chapada em `src/components/Hero.jsx` e `src/components/home/Hero.jsx` (FR-003)
- [X] T021 [P] [US1] Remover glow e gradiente em `src/components/home/Backstage.jsx`, `CashbackSection.jsx`, `Contact.jsx`, `Deliverables.jsx` e `Method.jsx` (FR-003)
- [X] T022 [P] [US1] Remover glow e gradiente em `src/pages/awards/AwardsPage.jsx`, `src/pages/cashback/CashbackPage.jsx` e `src/pages/partner/PartnerPage.jsx` (FR-003)
- [X] T023 [US1] Apagar de `public/assets/` os logos antigos (`logo-ummix-ads.png`, `Logo Ummix ads - Branca.png/.svg`, `Logo Ummix ads - Escura.svg`), depois de confirmar com uma busca que nada mais os referencia (FR-004, CT-04)

### Troca semântica por página (fim da ponte)

Para cada arquivo: trocar `*-ummix-*` pelas classes semânticas de [data-model.md §1](./data-model.md); trocar os hexadecimais soltos pelos tokens da tabela "Hexadecimais soltos"; envolver as seções de fundo escuro com `data-theme="dark"` e `bg-inverse`; trocar `font-heading` por `font-display`; usar `font-mono` em kickers e números de dado; rever `rounded-full` (R-03: só elementos circulares).

- [X] T024 [P] [US1] Home, parte 1: `src/components/Header.jsx`, `Footer.jsx`, `Partners.jsx`, `BrowserFrame.jsx`, `ValueProp.jsx`, `ui/ButtonLink.jsx`
- [X] T025 [P] [US1] Home, parte 2: `src/components/home/Hero.jsx`, `CampaignGuide.jsx`, `CampaignQuestions.jsx`, `ClientView.jsx`, `Segmentations.jsx`, `Eliminates.jsx`
- [X] T026 [P] [US1] Home, parte 3: `src/components/home/Deliverables.jsx`, `Backstage.jsx`, `Method.jsx`, `CashbackSection.jsx`, `ForWhom.jsx`, `Contact.jsx`, `src/components/Hero.jsx`
- [X] T027 [P] [US1] `src/pages/cashback/CashbackPage.jsx`
- [X] T028 [P] [US1] `src/pages/partner/PartnerPage.jsx`
- [X] T029 [P] [US1] `src/pages/MonetizePage.jsx` e `src/pages/monetize.css` (1.110 linhas): só variáveis de token para cor, fonte, raio, sombra e espaçamento (FR-008)
- [X] T030 [P] [US1] `src/pages/investidores/InvestidoresPage.jsx` e `src/pages/investidores/investidores.css` (785 linhas) (FR-008)
- [X] T031 [P] [US1] `src/pages/awards/AwardsPage.jsx`
- [X] T032 [P] [US1] `src/pages/campanha/main.jsx` e `src/pages/campanha/campanha.css` (1.525 linhas). Sem token equivalente → degrau mais próximo da escala, nunca valor novo (edge case da spec) (FR-008)
- [X] T033 [P] [US1] `src/pages/subpages/SubChrome.jsx`
- [X] T034 [US1] Remover a ponte: apagar `--color-ummix-*`, `--ummix-*` e `--font-family-*` de `src/index.css`. Rodar `npm run verify:design-system`: as regras `old-tokens`, `loose-hex`, `old-fonts`, `new-fonts` e `glow-gradient` devem passar (CT-01, CT-02, CT-03)
- [X] T035 [US1] Comparar as 19 rotas com os screenshots do T002 (1280px e 375px) e corrigir quebras de layout; conferir o logo e as fontes no navegador (quickstart §4, CT-04)

**Checkpoint**: US1 completa. O site já pode ser publicado com a identidade nova (MVP), mesmo antes das demais histórias.

---

## Phase 4: User Story 2 - Textos alinhados ao posicionamento atual (Priority: P1)

**Goal**: nenhum termo proibido (RN-01) nos 3 idiomas; posicionamento "central de dados que faz campanhas de rádio e TV performarem"; "Top N" nos prêmios.

**Independent Test**: `npm run verify:design-system` sem violações das regras `forbidden-terms`, `offline-media` e `awards-top-n`; revisão de texto do quickstart §6.

- [X] T036 [P] [US2] Em `src/home-copy.js` (pt/en/es): reescrever o hero com o posicionamento (FR-011; frases do research R-09) e trocar "mídia offline" (`:126` e equivalentes EN/ES) por "rádio e TV" (FR-010)
- [X] T037 [P] [US2] Em `src/partner-copy.js` (pt/en/es): tirar "out-of-home" (`:64`) e "mídia offline" (`:19`) (FR-010, RN-01)
- [X] T038 [P] [US2] Revisar contra a RN-01 `src/cashback-copy.js`, `src/monetize-copy.js` e `src/pages/investidores/investidores-copy.js` (pt/en/es), incluindo "pesquisa própria", periodicidade, "em Goiânia" e "licenciado" como ativo (FR-010)
- [X] T039 [P] [US2] Em `src/pages/awards/awards-page-data.js`: `fourthPlace` → "Top 4" em pt (`:170`), en e es (`:252`); conferir que "1º lugar" só aparece onde a Ummix foi primeira (FR-012, CT-12)
- [X] T040 [P] [US2] Em `src/pages/campanha/main.jsx`: trocar "mídia offline" nas linhas `:466`, `:606`, `:611`, `:719` (FR-010)
- [X] T041 [P] [US2] Em `src/components/home/ForWhom.jsx:74`: trocar "mídia offline" ou mover o texto para `home-copy.js` (FR-010)
- [X] T042 [US2] Reescrever meta description, `keywords`, OG, Twitter e JSON-LD `description` nos 19 HTMLs com o posicionamento e sem termos proibidos (`index.html:22-92` como referência; equivalentes em `en/` e `es/`). Usar a skill `seo` do repositório (FR-011, FR-010)
- [X] T043 [P] [US2] Revisar `public/llms.txt` (posicionamento, 6 cidades abrindo SP, RN-01) e os textos de `public/sitemap.xml`, sem mudar URLs (FR-010, FR-014)
- [X] T044 [US2] Rodar `npm run verify:design-system` (regras `forbidden-terms`, `offline-media` e `awards-top-n` passando) e fazer a revisão do quickstart §6: posicionamento nos 3 idiomas (CT-11), nenhum nome de cliente em case (RN-02) e no máximo 3 palavras em vermelho por frase (RN-03) (CT-10, CT-18)
- [X] T045 [US2] Gerar um resumo de antes e depois dos textos EN e ES alterados em `specs/001-design-system-ummix/revisao-textos-en-es.md`, para a revisão do Edy antes da publicação (premissa da spec)

**Checkpoint**: US1 + US2 = o site publicável completo do ponto de vista do visitante.

---

## Phase 5: User Story 3 - Componentes do design system no código (Priority: P2)

**Goal**: botões, campos e feedback vindos de `src/ds/`, com os formulários enviando exatamente o mesmo payload.

**Independent Test**: CT-05, CT-06, CT-07 e CT-08 (quickstart §1, §3 e §4).

- [X] T046 [P] [US3] Copiar `$DS/components/actions/Button.jsx` para `src/ds/components/Button.jsx` com as adaptações de [contracts/ds-components.md](./contracts/ds-components.md): `href`/`target`/`rel` → `<a>`, `rel="noopener noreferrer"` automático com `_blank`, `className` e `...rest`, hover e pressionado em CSS (classe em `src/ds/ds.css`), não em `useState` (R-05)
- [X] T047 [P] [US3] Copiar `IconButton.jsx` para `src/ds/components/` com hover em CSS
- [X] T048 [P] [US3] Copiar `Input.jsx`, `Select.jsx` e `Checkbox.jsx` de `$DS/components/forms/` para `src/ds/components/` com `forwardRef`, `...rest`, `id` ligado ao label (`useId` quando faltar), `aria-invalid` e `aria-describedby` (contrato ds-components)
- [X] T049 [P] [US3] Criar `src/ds/components/Textarea.jsx` com o visual do `Input` e `rows` padrão 3 (contrato ds-components)
- [X] T050 [P] [US3] Copiar `Card.jsx`, `StatCard.jsx`, `Badge.jsx`, `Tag.jsx`, `Tabs.jsx` e `Toast.jsx` para `src/ds/components/` sem adaptação
- [X] T051 [US3] Exportar todos em `src/ds/components/index.js` e registrar as adaptações (Button, IconButton, campos, Textarea) na seção "Adaptações locais" de `src/ds/README.md` (FR-005)
- [X] T052 [US3] Trocar `src/components/ui/ButtonLink.jsx` e todos os CTAs que navegam (header "Criar campanha", CTAs de seção) pelo `Button` com `href` (FR-006, CT-06)
- [X] T053 [US3] Migrar o formulário de `src/components/home/Contact.jsx` para `Input`/`Textarea`/`Button` de `src/ds/`, mantendo `id`, `name`, `required`, `autoComplete`, a ordem dos campos e a chamada a `submitForm()`. Mostrar sucesso e erro com `Toast`, preservando os campos em caso de erro (FR-007, CT-08)
- [X] T054 [P] [US3] Migrar o formulário de `src/pages/MonetizePage.jsx` (FR-007)
- [X] T055 [P] [US3] Migrar o formulário de `src/pages/partner/PartnerPage.jsx` (FR-007)
- [X] T056 [P] [US3] Migrar o formulário de `src/pages/campanha/main.jsx` (FR-007)
- [X] T057 [US3] Trocar cards, badges e números de prova feitos à mão por `Card`, `Badge`, `Tag` e `StatCard` onde o visual equivaler (Deliverables, Segmentations, provas de monetize, investidores)
- [X] T058 [US3] Rodar `node scripts/verify-site-form.mjs` e comparar com `baseline/form-payloads.txt` (payload idêntico, CT-07); testar no navegador o erro do endpoint e a validação obrigatória (CT-08); conferir que `src/services/formSubmit.js`, `src/constants/urls.js` e `public/api/*.php` não mudaram (`git diff --stat`)

**Checkpoint**: US3 completa. Formulários e CTAs vêm do design system.

---

## Phase 6: User Story 4 - Grafismo e ícones de marca (Priority: P3)

**Goal**: o Espectro e os ícones pixel no lugar das animações de arco e pulso.

**Independent Test**: CT-09 (quickstart §4); nenhum `outdoor` referenciado.

- [X] T059 [P] [US4] Aplicar o Espectro (`/assets/ds/grafismo-espectro.svg`, `alt=""`, `aria-hidden="true"`) no hero da home `src/components/home/Hero.jsx`, à direita, sobre grafite liso, com o texto à esquerda, ocupando o lugar visual das animações removidas em T019 (FR-009)
- [X] T060 [P] [US4] Aplicar o Espectro (no máximo um por seção) em `src/components/home/CashbackSection.jsx` e `src/components/home/Contact.jsx` (FR-009)
- [X] T061 [P] [US4] Trocar os ícones de meio e canal (rádio, TV, torre, sinal, praça, audiência, alvo, horário, microfone, fone, vídeo) por `/assets/ds/icones-pixel/*.svg` (vermelho em fundo claro, `-branco` em fundo escuro) em `Segmentations.jsx`, `Deliverables.jsx`, `ForWhom.jsx` e `src/pages/MonetizePage.jsx` (FR-009)
- [X] T062 [US4] Padronizar os ícones Lucide restantes com `strokeWidth={1.75}` (busca por `from 'lucide-react'` em `src/`) (FR-009)
- [X] T063 [US4] Conferir CT-09 no navegador (um Espectro por seção, posição certa, nenhum `outdoor`) e rodar `npm run verify:design-system`

**Checkpoint**: todas as histórias completas.

---

## Phase 7: Polish & validação final

- [X] T064 Rodar `npm run build`, `npm run verify:build-assets`, `npm run verify:hosting`, `node scripts/verify-spanish-routes.mjs` e `node scripts/verify-design-system.mjs --dist`: tudo verde (CT-14, CT-17, CT-02)
- [X] T065 [P] Auditoria com a skill `web-design-guidelines` nas páginas e componentes alterados: contraste AA e foco visível. Corrigir o que falhar (FR-015, CT-15)
- [X] T066 [P] Crítica com a skill `impeccable` na home e no cashback, comparando com `.impeccable/critique/2026-07-21T18-48-27Z__*.md`: meta ≥ 30/40 e "Aesthetic and Minimalist Design" ≥ 3 (SC-005) — feito: 29/40 (antes 25), Aesthetic 3; correções P1/P2 aplicadas depois (caixa alta, 1 Espectro, idioma, faixas finais, ritmo); nova nota não medida
- [X] T067 [P] Revisão com a skill `vercel-react-best-practices` nos componentes de `src/ds/` e nas seções com Framer Motion: nenhum estado de hover em React, nenhuma renderização desnecessária — feito: sem estado de hover React nos componentes usados; MotionConfig reducedMotion="user" global; useCountUp respeita movimento reduzido
- [X] T068 Lighthouse mobile na home: Performance ≥ `baseline/lighthouse-home.json` − 3 (SC-006). Se piorar, aplicar a alternativa do R-04 (fontes locais) e registrar no `research.md`
- [X] T069 Checagem de movimento reduzido no navegador (CT-16) e de texto justificado (CT-13)
- [ ] T070 Abrir o PR da branch `001-design-system-ummix` para `Arynelson/Ummix_landing`, com resumo, links da spec e do plano, screenshots de antes e depois e a lista de textos EN e ES para revisão (T045). **Só depois da autorização do Edy** (Q-02 da spec)
- [ ] T071 Depois da publicação na Locaweb: um envio real em cada um dos 4 formulários e conferência do e-mail recebido (SC-004)

---

## Dependencies & Execution Order

### Entre fases

- **Setup (1)** → **Foundational (2)** → bloqueia todas as histórias.
- **US1 (3)** e **US2 (4)** podem correr em paralelo depois da fase 2. Os arquivos se cruzam pouco: US1 mexe em classes e CSS, US2 em `*-copy.js` e metatags. Os pontos de contato são `src/pages/campanha/main.jsx` (T032 × T040) e `src/components/home/ForWhom.jsx` (T026 × T041), que devem ser feitos em sequência.
- **US3 (5)** depende de T016 (pasta `src/ds/components/`) e, de preferência, de US1 (as páginas já semânticas). T052 a T056 tocam os mesmos arquivos de T024 a T032, então US3 vem depois de US1.
- **US4 (6)** depende de T005 (assets copiados) e de T019 (animações removidas).
- **Polish (7)** depende de todas as histórias desejadas.

### Dentro das histórias

- US1: T016 → T015/T017; T019 → T020–T022; T024–T033 → T034 → T035; T023 só depois de T015 e T017.
- US2: T036–T043 → T044 → T045.
- US3: T046–T050 → T051 → T052–T057 → T058.
- US4: T059–T061 → T062 → T063.

## Parallel Example: User Story 1

```text
# Depois da fase 2, em paralelo (arquivos diferentes):
T024 Home parte 1 (Header, Footer, Partners...)
T025 Home parte 2 (Hero, CampaignGuide...)
T026 Home parte 3 (Deliverables, Backstage...)
T027 CashbackPage · T028 PartnerPage · T029 Monetize · T030 Investidores · T031 Awards · T032 Campanha · T033 SubChrome
# Em seguida, sozinha:
T034 remover a ponte + verify
```

## Parallel Example: User Story 2

```text
T036 home-copy · T037 partner-copy · T038 cashback/monetize/investidores-copy
T039 awards-page-data · T040 campanha/main.jsx (depois de T032) · T041 ForWhom (depois de T026) · T043 llms/sitemap
```

## Implementation Strategy

### MVP (só US1)

1. Fases 1 e 2: o site já muda de cor e de fonte pela ponte.
2. Fase 3 (US1): identidade completa, sem glow e sem vocabulário antigo.
3. **Parar e validar**: verify, build e screenshots. Já dá para publicar.

### Entrega incremental

1. Fundação → US1 → publicar (identidade nova).
2. US2 → revisão do Edy (EN/ES) → publicar (textos alinhados).
3. US3 → publicar (componentes e formulários). Conferir os 4 envios reais.
4. US4 → publicar (Espectro e ícones).
5. Polish → PR final, auditorias e Lighthouse.

### Resumo

- **71 tarefas**: Setup 6 · Foundational 8 · US1 21 · US2 10 · US3 13 · US4 5 · Polish 8.
- **Paralelizáveis [P]**: 42.

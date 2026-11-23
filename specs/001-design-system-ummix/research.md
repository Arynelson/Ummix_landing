# Research: Migração para o design system oficial

Fase 0 do plano. Cada item registra a decisão, o motivo e as alternativas avaliadas. Os números vêm de buscas no repositório em 23/11/2026.

## R-01: Como trocar os tokens sem quebrar 24 arquivos de uma vez

- **Situação:** há 300+ usos de classes `*-ummix-*` em 24 arquivos de `src/`. Os mais usados:
  - `text-ummix-red` (65);
  - `text-ummix-dark` (50);
  - `text-ummix-gray-dark` (32);
  - `bg-ummix-red` (32);
  - `bg-ummix-dark` (29);
  - `bg-ummix-gray` (28).

  Também há classes com opacidade (`border-ummix-dark/10`, `bg-ummix-red/10`).
- **Decisão:** migrar em duas etapas.
  1. **Ponte:** no `@theme` de `src/index.css`, as variáveis antigas passam a apontar para os tokens oficiais:
     - `--color-ummix-red: var(--red-600)`;
     - `--color-ummix-red-dark: var(--red-700)`;
     - `--color-ummix-dark: var(--ink-900)`;
     - `--color-ummix-gray: var(--ink-50)`;
     - `--color-ummix-gray-dark: var(--ink-700)`;
     - `--color-ummix-grafite: var(--ink-800)`.

     O site inteiro muda de cor num commit, e as opacidades (`/10`) continuam funcionando, porque o Tailwind 4 usa `color-mix()` sobre a variável.
  2. **Troca semântica por página** (fase 4 do plano): `text-ummix-dark` → `text-strong`, `bg-ummix-red` → `bg-accent` etc., conforme o [data-model.md](./data-model.md). Quando nenhum arquivo usar mais `ummix-*`, a ponte é removida e o CT-01 passa.
- **Alternativas:**
  - Busca e substituição global num passo só: diff enorme e impossível de revisar visualmente, e erra nos casos de contexto escuro, onde `text-ummix-dark` sobre fundo grafite deveria virar outro token.
  - Manter a ponte para sempre: deixa dois vocabulários e contraria o FR-001.

## R-02: Classes semânticas no Tailwind 4

- **Decisão:** registrar no `@theme` os aliases semânticos como cores do Tailwind:
  - `--color-strong: var(--text-strong)`;
  - `--color-body: var(--text-body)`;
  - `--color-muted: var(--text-muted)`;
  - `--color-brand: var(--text-brand)`;
  - `--color-accent: var(--accent)`;
  - `--color-accent-hover: var(--accent-hover)`;
  - `--color-accent-soft: var(--accent-soft)`;
  - `--color-page: var(--bg-page)`;
  - `--color-sunken: var(--bg-sunken)`;
  - `--color-card: var(--surface-card)`;
  - `--color-inverse: var(--surface-inverse)`;
  - `--color-line: var(--border-default)`;
  - `--color-line-subtle: var(--border-subtle)`.

  Também entram as escalas `--color-red-*` e `--color-ink-*` para os casos sem alias. Os nomes geram `text-strong`, `bg-accent`, `border-line`...
- **Motivo:** com aliases, as seções escuras funcionam só com `data-theme="dark"` no container (edge case da spec), sem duplicar classes `dark:`.
- **Atenção:** o Tailwind 4 resolve `var()` dentro do `@theme` em tempo de execução. Para os aliases funcionarem dentro de `[data-theme="dark"]`, as variáveis precisam ser declaradas com `@theme inline`. Validar isso na fase 1 com uma seção de teste.
- **Alternativa:** usar só as escalas (`text-ink-950`). Funciona, mas o tema escuro exigiria trocar as classes em cada seção grafite.

## R-03: Raio dos controles (pílula → 8px)

- **Situação:** há 52 usos de `rounded-full` e o token `--ummix-radius-control: 9999px`. Uma parte é de botões e chips; outra é de elementos que de fato são círculos (avatares, pontos, ícones redondos).
- **Decisão:**
  - Botões e campos passam a usar o `Button` e os campos de `src/ds/`, com `--radius-md` (8px).
  - Tags e badges seguem o próprio componente.
  - `rounded-full` continua só em elementos circulares de verdade, revistos um a um na fase 4.
  - `--ummix-radius-control` é removido.
- **Alternativa:** manter a pílula. Descartada na entrevista (D-05).

## R-04: Fontes e desempenho

- **Situação:** os 19 HTMLs carregam Baloo 2 (6 pesos) e Plus Jakarta Sans (5 pesos) por `<link>` do Google Fonts (ex.: `index.html:151`, `en/index.html:83`). O `tokens/fonts.css` oficial usa `@import`, que bloqueia a renderização.
- **Decisão:** **não** copiar `fonts.css`. Trocar o `<link>` em cada HTML (mantendo os `preconnect`) por:
  `family=Poppins:wght@500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap`
  São 9 pesos no total, contra 11 hoje. O itálico do Plex Sans fica de fora até alguma página precisar dele.
- **Motivo:** o `<link>` com `preconnect` é mais rápido que o `@import` no CSS, e menos pesos compensam a terceira família (SC-006).
- **Alternativa:** hospedar as fontes localmente (`@fontsource`). Seria dependência nova e mudança no pipeline de assets da Locaweb. Fica para depois, se o Lighthouse piorar.

## R-05: Componentes do design system no React 19 do site

- **Situação:** os componentes oficiais usam estilo inline e estado de hover em JavaScript. Eles não repassam props nativas:
  - o `Input` não aceita `id`, `name`, `required`, `autoComplete` nem `aria-*`, e os formulários atuais dependem disso (`Contact.jsx:116-128`);
  - o `Button` só renderiza `<button>`;
  - não existe `Textarea`, e o formulário de contato usa um.
- **Decisão:** copiar para `src/ds/components/` e fazer **três adaptações locais**, todas registradas no `src/ds/README.md` ([contracts/ds-components.md](./contracts/ds-components.md)):
  1. `Button` aceita `href` (e `target`/`rel`). Com `href`, renderiza `<a>` com o mesmo estilo (FR-006).
  2. `Input`, `Select`, `Checkbox` e `Textarea` repassam `...rest` ao elemento nativo, usam `forwardRef` e ligam `label` ao campo por `id` (`useId` quando não houver um).
  3. `Textarea` novo, com o mesmo visual do `Input`.
- **Desempenho:** o hover em JavaScript (`useState`) re-renderiza a cada passagem do mouse. Nas cópias, trocar o hover e o pressionado por `:hover` / `:active` em CSS (classe gerada em `ds.css`), mantendo os mesmos valores visuais. Isso segue a `vercel-react-best-practices` (evitar estado de interação desnecessário).
- **Alternativa:** reescrever os componentes em Tailwind. Afasta a cópia do original e dificulta re-sincronizar.

## R-06: Glow, gradiente e animação

- **Situação:**
  - em `src/index.css:34-63` há `redPulse`, `.pulse-ring` e `.arc-dot` com `box-shadow` de brilho;
  - há gradientes e glows em `components/Hero.jsx`, `home/Backstage.jsx`, `home/CashbackSection.jsx`, `home/Contact.jsx`, `home/Deliverables.jsx`, `home/Method.jsx`, `pages/awards/AwardsPage.jsx` e `pages/campanha/*`;
  - o `tokens/effects.css` oficial define `--glow-red`, mas o `SKILL.md` proíbe brilho em peças de marca.
- **Decisão:**
  - Remover as três animações e trocar glows e gradientes por cor chapada.
  - Copiar `effects.css` **sem** usar `--glow-red` / `--glow-red-soft`. O CT-03 falha se aparecerem em `src/`.
  - Exceção aceita e documentada: overlay escuro chapado ou semitransparente (`--overlay`) sobre foto, para dar legibilidade. Overlay não é gradiente decorativo.
  - O movimento que fica (entradas com Framer Motion, contadores) usa `--duration-*` e `--ease-out` oficiais e respeita `prefers-reduced-motion`.
- **Alternativa:** manter um glow discreto no hero. Contraria a regra do design system.

## R-07: Espectro e ícones pixel

- **Decisão:**
  - Copiar `grafismo-espectro.svg`, os 3 logos e os 26 SVGs de `icones-pixel` para `public/assets/ds/`. O `outdoor*.svg` **não** é copiado, para não ser usado por engano.
  - O Espectro é usado como `<img>` decorativa (`alt=""`, `aria-hidden`), posicionada à direita ou na base das seções grafite: hero, faixa de cashback, contato.
  - Os logos vêm do componente `Logo` (SVG inline): sem requisição extra e com a cor certa por variante.
- **Alternativa:** importar os SVGs como componentes React. Aumenta o bundle sem ganho.

## R-08: Verificação automática

- **Decisão:** criar `scripts/verify-design-system.mjs`, no mesmo estilo dos `verify-*.mjs` existentes (Node puro, sem dependências), com o script `npm run verify:design-system`. Ele cobre CT-01, 02, 03, 05, 10 e 12. Os demais cenários (navegador, auditoria, revisão de texto) estão no [quickstart.md](./quickstart.md).
- **Contrato:** [contracts/verify-design-system.md](./contracts/verify-design-system.md).
- **Alternativa:** Playwright para tudo. Seria dependência nova, e a maior parte das regras é verificável por busca estática.

## R-09: Textos nos 3 idiomas

- **Situação:**
  - o texto está separado por idioma nos objetos `pt` / `en` / `es` de `home-copy.js`, `partner-copy.js`, `cashback-copy.js`, `monetize-copy.js`, `investidores-copy.js` e `awards-page-data.js`;
  - `src/pages/campanha/main.jsx` tem texto direto no JSX, só em PT;
  - as metatags e o JSON-LD estão em cada HTML.
- **Decisão:**
  - Corrigir o PT primeiro e espelhar no EN e no ES na mesma alteração.
  - Para o posicionamento:
    - PT: "central de dados que faz campanhas de rádio e TV performarem";
    - EN: "the data hub that makes radio and TV campaigns perform";
    - ES: "la central de datos que hace que las campañas de radio y TV rindan".
  - EN e ES passam pela revisão do Edy antes da publicação (premissa da spec).
  - "4º lugar" / "4.º lugar" → "Top 4" (as chaves `fourthPlace` em `awards-page-data.js:170,252`).
- **Alternativa:** tradução automática sem revisão. Descartada por risco de tom e de termos proibidos.

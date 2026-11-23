# Feature Specification: Migração do site para o design system oficial Ummix Ads

**Feature Branch**: `001-design-system-ummix`

**Created**: 2026-11-23

**Status**: Draft

**Input**: Pedido do Edy Medrado (entrevista assistida, 23/11/2026): "atualização do front end com o novo design system", revendo quais skills de front end ajudam no design.

## Contexto

Em 06/11/2026 a Ummix Ads adotou um design system oficial, o `ummix-ads-design`, como obrigatório para tudo o que a empresa publica. O site (este repositório) foi feito antes disso e usa outra identidade. Em 17/11/2026 o posicionamento comercial também mudou: a Ummix hoje vende **só rádio e TV** e se apresenta como uma **central de dados que faz campanhas de rádio e TV performarem**.

**Estado atual (levantado no código):**

- Os tokens são próprios e antigos ([src/index.css:3-22](../../src/index.css)):
  - vermelho `#9b191a` (o oficial é `#9A191A`);
  - neutros frios `#1e1e1e` e `#f4f2f2` (os oficiais são os grafites quentes `--ink-*`);
  - fontes **Baloo 2** e **Plus Jakarta Sans**, carregadas em `index.html:151` (as oficiais são Poppins, IBM Plex Sans e IBM Plex Mono).
- Há efeitos que o design system proíbe em peças de marca: brilho/glow e pulsação vermelha (`redPulse`, `.pulse-ring`, `.arc-dot` com `box-shadow` de brilho em `src/index.css:34-63`). Gradientes e glows também aparecem em 10 arquivos: `components/Hero.jsx`, `home/Backstage.jsx`, `home/CashbackSection.jsx`, `home/Contact.jsx`, `home/Deliverables.jsx`, `home/Method.jsx`, `pages/awards/AwardsPage.jsx`, `pages/campanha/*`.
- O logo é um PNG antigo, `/assets/logo-ummix-ads.png` (`src/components/Header.jsx:87`), além de variações em `public/assets/Logo Ummix ads - *.svg`.
- Os botões e controles são em pílula (`--ummix-radius-control: 9999px`). O design system usa `--radius-md` (8px) nos botões.
- Há CSS próprio grande em `src/pages/monetize.css` (1.110 linhas), `src/pages/investidores/investidores.css` (785) e `src/pages/campanha/campanha.css` (1.525).
- O site tem **19 páginas** (`vite.config.js`): home, cashback, partner, monetize, investidores e premios em PT, EN e ES, mais `lp/campanha`.
- Os textos ficam em arquivos `*-copy.js` por idioma (`src/home-copy.js`, `src/partner-copy.js`, `src/cashback-copy.js`, `src/monetize-copy.js`, `src/pages/investidores/investidores-copy.js`, `src/pages/awards/awards-page-data.js`), além de `src/pages/campanha/main.jsx` e das metatags de cada HTML.
- **Textos que contrariam as regras atuais:**
  - "out-of-home" em `src/partner-copy.js:64` (EN);
  - "mídia offline" na descrição, OG e Twitter de `index.html:22-92`, em `src/home-copy.js:126`, em `src/components/home/ForWhom.jsx:74` e em `src/pages/campanha/main.jsx:466,606,611,719`;
  - "4º lugar" em `src/pages/awards/awards-page-data.js:170,252`.
- Hospedagem: os arquivos estáticos vão para a **Locaweb** (Apache, `public/.htaccess`). Os formulários são enviados por `public/api/site-form.php` e Brevo (`docs/site-form-brevo.md`). A Vercel (`ummix-landing.vercel.app`) serve de prévia.
- O design system oficial fica fora do repositório, em `Oraculo/design-system/ummix-ads-design/`, e traz:
  - `tokens/*.css` (colors, typography, spacing, effects, fonts, base), com tema escuro por `data-theme="dark"`;
  - 16 componentes React em `components/`, com `.d.ts` e `.prompt.md`;
  - logos SVG, o grafismo **Espectro** e os ícones de sinal em pixel em `assets/`;
  - a referência de landing em `ui_kits/site/`.

## Skills de front end recomendadas para a implementação

| Skill | Quando usar | Papel |
|---|---|---|
| `ummix-ads-design` | Antes de qualquer tela | Fonte das regras (vermelho único, tipografia, Espectro, ícones, voz) e dos tokens e componentes |
| `impeccable` | Migração de cada página e revisão final | Desenho e crítica de interface. O repositório já tem uma crítica salva em `.impeccable/critique/` (nota 25/40, com glow repetido como problema) que serve de base |
| `web-design-guidelines` | Antes de abrir o PR | Auditoria de acessibilidade e UX contra as Web Interface Guidelines |
| `vercel-react-best-practices` | Durante a troca de componentes | Evitar regressão de desempenho (renderizações, peso do bundle, Framer Motion) |
| `seo` (skill do repositório, em `.agents/skills/seo`) | Revisão de metatags, OG e `llms.txt` | Manter o SEO ao trocar os textos |

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identidade visual oficial em todo o site (Priority: P1)

Um visitante (anunciante, veículo, parceiro ou investidor) abre qualquer uma das 19 páginas, em qualquer idioma, e vê a identidade oficial da Ummix Ads:
- o vermelho único `#9A191A`;
- os neutros grafite quentes;
- Poppins, IBM Plex Sans e IBM Plex Mono;
- o logo oficial;
- cores chapadas, sem glow.

**Why this priority**: o design system é obrigatório desde 06/11/2026, e hoje o site é o ponto da marca com mais visitas fora do padrão.

**Independent Test**: fazer o build, abrir as 19 rotas e verificar, pelos estilos calculados e pela busca no código, que não há cor, fonte ou efeito fora dos tokens oficiais.

**Acceptance Scenarios**:

1. **Given** o site compilado, **When** se abre qualquer uma das 19 páginas, **Then** os títulos usam Poppins, o corpo usa IBM Plex Sans, os kickers e dados usam IBM Plex Mono, e Baloo 2 e Plus Jakarta Sans não são carregadas.
2. **Given** qualquer página, **When** se inspecionam as cores de marca, **Then** o vermelho é sempre `#9A191A` (ou um degrau `--red-*` da escala oficial) e não sobra nenhum `#9b191a`, `#7a1415`, `#1e1e1e` ou `#f4f2f2` no código-fonte.
3. **Given** qualquer página, **When** se procura brilho e gradiente, **Then** não há `redPulse`, `pulse-ring`, `arc-dot` com glow, `--glow-red` nem gradiente decorativo em peças de marca.
4. **Given** o header e o rodapé, **When** a página carrega, **Then** o logo é um SVG oficial (`logo-ummix-vermelha.svg`, `-branca` ou `-preta`, conforme o fundo), sem recolorir nem aplicar efeito.

---

### User Story 2 - Textos alinhados ao posicionamento atual (Priority: P1)

O visitante lê o site em PT, EN ou ES e entende a Ummix como **central de dados que faz campanhas de rádio e TV performarem**, que atua em 6 cidades e está abrindo São Paulo. O site não promete meios que a empresa não vende, nem dados que ela não garante.

**Why this priority**: o texto atual cita "out-of-home" e "mídia offline". Isso cria uma expectativa que a Ummix não entrega e contradiz o material comercial atual.

**Independent Test**: procurar nos arquivos de texto, nas metatags e no `llms.txt` dos 3 idiomas os termos proibidos (lista em RN-01) e ler as seções de abertura de cada página.

**Acceptance Scenarios**:

1. **Given** os 3 idiomas, **When** se procuram os termos proibidos de RN-01, **Then** não há nenhuma ocorrência em texto visível, metatags, JSON-LD, `llms.txt` ou `sitemap.xml`.
2. **Given** a home em qualquer idioma, **When** se lê o hero, **Then** a proposta de valor diz que a Ummix é uma central de dados que faz campanhas de rádio e TV performarem (adaptada ao idioma).
3. **Given** a página de prêmios, **When** se leem as colocações, **Then** só aparece "1º lugar" onde a Ummix de fato ficou em primeiro; as demais aparecem como "Top N" (EN "Top N", ES "Top N").

---

### User Story 3 - Componentes do design system no código (Priority: P2)

A equipe que mantém o site (Ary, ou um agente) cria ou altera uma seção usando os componentes oficiais (Button, Card, Badge, Input, Select, Tabs, Logo...) e os tokens semânticos, sem escrever cor, fonte ou raio solto.

**Why this priority**: sem os componentes, cada página nova volta a sair do padrão. Mesmo assim, a P1 já entrega valor ao visitante sem esta parte.

**Independent Test**: conferir que `src/ds/` contém os componentes e tokens copiados do design system, que botões e campos de formulário do site vêm de lá, e que uma busca por hexadecimais soltos em `src/**/*.jsx` não acha cor de marca fora dos tokens.

**Acceptance Scenarios**:

1. **Given** o repositório, **When** se abre `src/ds/`, **Then** lá estão os tokens oficiais (CSS) e os componentes React usados pelo site, com um README que aponta a origem e a data da cópia.
2. **Given** qualquer formulário do site (home, monetize, partner, lp/campanha), **When** é renderizado, **Then** os campos usam `Input`, `Select`, `Checkbox` e `Button` de `src/ds/`, e o envio continua indo para `/api/site-form.php` com o mesmo payload de hoje.
3. **Given** qualquer CTA que é um link (ex.: "Criar campanha" para `app.ummix.com.br`), **When** é renderizado, **Then** é um `<a>` com a aparência do `Button` oficial, e não um `<button>`.

---

### User Story 4 - Grafismo e ícones de marca (Priority: P3)

O visitante vê o grafismo **Espectro** e os ícones de sinal em pixel (rádio, TV, torre, sinal, praça, audiência, alvo, horário...) nos pontos de destaque, e não as animações de arco e pulso de hoje.

**Why this priority**: reforça a identidade, mas é a parte mais visual e a que menos risco corre se ficar para o fim.

**Independent Test**: abrir a home e as páginas de produto e verificar onde o Espectro e os ícones pixel aparecem e se seguem as regras de uso.

**Acceptance Scenarios**:

1. **Given** uma seção com fundo grafite que usa o Espectro, **When** é renderizada, **Then** o Espectro fica à direita ou na base, o texto fica sobre grafite liso à esquerda, e há no máximo um Espectro na seção.
2. **Given** um ícone de meio ou canal, **When** é renderizado, **Then** vem de `icones-pixel` (vermelho sobre claro, `-branco` sobre escuro). Ícones de interface usam Lucide com traço 1.75. O ícone `outdoor` não é usado.

---

### Edge Cases

- **Usuário com `prefers-reduced-motion`**: as animações que continuarem (Framer Motion, contadores) respeitam a preferência, como hoje em `src/index.css:128-137`.
- **Fontes do Google não carregam**: a pilha de fallback dos tokens (`"Helvetica Neue", Arial, sans-serif`) mantém o layout legível, sem texto invisível (`display=swap`).
- **Tema escuro em seções grafite**: seções com fundo `--ink-900` usam `data-theme="dark"` no container, para que os aliases (`--text-strong`, `--surface-card`) se invertam sem cor escrita à mão.
- **Página de campanha (`lp/campanha`)**: o CSS próprio (1.525 linhas) é reescrito sobre os tokens. Se alguma regra não tiver token equivalente, ela usa o degrau mais próximo da escala, e não um valor novo.
- **Logos de clientes e veículos** (SBT, RedeTV, Band News, Sicoob, Sicredi, Detran...): continuam como estão (imagem de terceiro), sem recolorir. A parede de logos de clientes não muda nesta spec (ver Questões em aberto).
- **Texto justificado**: o padrão da Ummix pede texto corrido justificado. A classe `.copy-justify` (justificado a partir de 48rem, com hifenização) continua. Títulos não são justificados.
- **Tradução**: um termo proibido trocado em PT também é trocado nas versões EN e ES do mesmo texto, mantendo as três versões equivalentes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (tokens)**: o site MUST usar os tokens oficiais do design system (cores, tipografia, espaçamento, raios, sombras, durações e easings) como única fonte de valores visuais. O `@theme` do Tailwind em `src/index.css` MUST expor esses tokens (ex.: `--color-red-600`, `--color-ink-900`, `--font-display`), no lugar de `--color-ummix-*`.
- **FR-002 (fontes)**: as 19 páginas MUST carregar Poppins, IBM Plex Sans e IBM Plex Mono, nos pesos definidos em `tokens/fonts.css`, e MUST NOT carregar Baloo 2 nem Plus Jakarta Sans.
- **FR-003 (sem glow nem gradiente)**: o site MUST NOT usar brilho, pulsação luminosa ou gradiente decorativo em elementos de marca. As animações `redPulse`, `.pulse-ring` e `.arc-dot` (`src/index.css:34-63`) e os gradientes e glows dos 10 arquivos listados no Contexto MUST ser removidos ou trocados por cores chapadas. As sombras funcionais de elevação (`--shadow-xs..lg`) continuam permitidas.
- **FR-004 (logo)**: header, rodapé, favicon-base e imagem OG MUST usar os logos oficiais (`assets/logo-ummix-{vermelha,branca,preta}.svg` ou o componente `Logo`). Os logos antigos (`logo-ummix-ads.png`, `Logo Ummix ads - *.svg`) MUST deixar de ser referenciados pelo código.
- **FR-005 (componentes copiados)**: os componentes do design system usados pelo site MUST ser copiados para `src/ds/`, com um `README.md` que registra a origem (`Oraculo/design-system/ummix-ads-design`) e a data da cópia. O site MUST NOT importar arquivos de fora do repositório.
- **FR-006 (CTA como link)**: os CTAs que navegam MUST ser renderizados como `<a href>` com a aparência do `Button` oficial (ex.: uma prop `href` ou `as="a"` na cópia local). Os botões de ação (enviar formulário, abrir menu) continuam como `<button>`.
- **FR-007 (formulários)**: os formulários de home, monetize, partner e lp/campanha MUST usar os componentes de formulário de `src/ds/` e MUST manter o contrato atual de envio: `POST /api/site-form.php`, mesmo payload, mesmos destinatários e mesmas mensagens de sucesso e erro de `src/services/formSubmit.js`.
- **FR-008 (CSS por página)**: `monetize.css`, `investidores.css` e `campanha.css` MUST usar só variáveis dos tokens oficiais para cor, fonte, raio, sombra e espaçamento. Nenhum hexadecimal de marca escrito à mão.
- **FR-009 (Espectro e ícones)**: os pontos de destaque visual MUST usar o grafismo Espectro (no máximo um por seção, à direita ou na base, sobre grafite) e os ícones `icones-pixel` para meios e canais. Os ícones de interface MUST ser Lucide com `strokeWidth={1.75}`. Os SVGs MUST ser copiados para `public/assets/ds/`.
- **FR-010 (texto: só rádio e TV)**: o texto visível, as metatags, o JSON-LD, `public/llms.txt` e `public/sitemap.xml`, nos 3 idiomas, MUST seguir RN-01.
- **FR-011 (texto: posicionamento)**: o hero da home e as descrições institucionais (meta description, OG, Twitter, JSON-LD `description`) MUST apresentar a Ummix como central de dados que faz campanhas de rádio e TV performarem, nos 3 idiomas.
- **FR-012 (texto: prêmios)**: `awards-page-data.js` MUST exibir "Top N" para colocações que não sejam o 1º lugar, nos 3 idiomas.
- **FR-013 (texto justificado)**: o texto corrido (parágrafos e descrições de seção) MUST continuar justificado a partir de 48rem via `.copy-justify`. Títulos, kickers e botões MUST NOT ser justificados.
- **FR-014 (rotas e hospedagem)**: as 19 entradas de `vite.config.js`, as regras do `public/.htaccess` e os scripts `verify:build-assets` e `verify:hosting` MUST continuar funcionando sem mudança de URL.
- **FR-015 (acessibilidade)**: o contraste de texto MUST atender WCAG 2.1 AA (4,5:1 para texto normal, 3:1 para texto grande) nas combinações de token usadas, e o foco visível (`:focus-visible`) MUST ser mantido com a cor de marca oficial.

### Regras de negócio

- **RN-01 (termos proibidos em material comercial)**:
  - Não pode aparecer:
    - "OOH", "out-of-home", "outdoor", "impresso", "jornal", "revista", "newspapers", "print";
    - "pesquisa própria" / "pesquisas próprias de audiência";
    - "a cada 120 dias" ou qualquer periodicidade de atualização;
    - "em Goiânia" associado à marca;
    - "licenciado(s)" como se estivessem ativos;
    - "mídia offline" quando significar algo além de rádio e TV.
  - Troca padrão: "rádio e TV" / "Rádio • TV" (EN "radio and TV"; ES "radio y TV").
  - Quando o texto precisar de abrangência geográfica: "6 cidades de atuação, abrindo São Paulo".
- **RN-02 (cases sem nome de cliente)**: textos novos ou reescritos que citem resultados usam o segmento ("concessionária de veículos", "instituição de educação"), não o nome do cliente. A parede de logos atual não muda nesta spec.
- **RN-03 (vermelho com parcimônia)**: no máximo 1 a 3 palavras em vermelho por frase de destaque. O vermelho não é cor de fundo de texto corrido.

### Key Entities

- **Tokens oficiais**: arquivos CSS copiados de `ummix-ads-design/tokens/` para `src/ds/tokens/`. São a fonte única de valores visuais.
- **Componentes `src/ds/`**: cópias locais dos componentes oficiais, com a adaptação `href` do FR-006. Toda adaptação fica registrada no `src/ds/README.md`.
- **Textos por idioma**: os objetos `pt` / `en` / `es` dos arquivos `*-copy.js` e `awards-page-data.js`, além das metatags de cada HTML.

## Cenários de teste obrigatórios

| ID | Cobre | Tipo | Dado / Quando / Então |
|---|---|---|---|
| CT-01 | FR-001, FR-008 | Estático (script) | Dado o código em `src/`, quando se procuram `#9b191a`, `#7a1415`, `#1e1e1e`, `#f4f2f2` e `ummix-red`, então não há ocorrências fora de `src/ds/` |
| CT-02 | FR-002 | Estático + build | Dado o build, quando se procuram `Baloo` e `Plus Jakarta` nos 19 HTMLs e no CSS gerado, então não há ocorrências, e Poppins, IBM Plex Sans e IBM Plex Mono estão presentes |
| CT-03 | FR-003 | Estático | Dado `src/`, quando se procuram `redPulse`, `pulse-ring`, `arc-dot`, `glow`, `linear-gradient` e `radial-gradient`, então só sobram ocorrências justificadas no README de `src/ds/` (ex.: fotos com overlay de legibilidade) |
| CT-04 | FR-004 | Navegador | Dadas as 19 rotas, quando se inspeciona o logo do header e do rodapé, então o `src` é um SVG oficial, e `logo-ummix-ads.png` não é requisitado na aba de rede |
| CT-05 | FR-005 | Estático | Dado o repositório, quando se procuram imports com `Oraculo` ou `design-system/ummix-ads-design`, então não há nenhum, e `src/ds/README.md` existe com a origem e a data |
| CT-06 | FR-006 | Navegador | Dado o CTA "Criar campanha" do header, quando se inspeciona, então é `<a href="https://app.ummix.com.br">` com a aparência do Button primário |
| CT-07 | FR-007 | Integração (fixture) | Dado `scripts/verify-site-form.mjs` com as fixtures atuais, quando se envia cada formulário, então o payload enviado a `/api/site-form.php` é idêntico ao de antes da migração (mesmas chaves, mesmo `_url`) |
| CT-08 | FR-007, Edge | Navegador | Dado o formulário da home, quando o endpoint retorna erro, então a mensagem de erro aparece com o componente oficial de feedback e os campos preenchidos são mantidos |
| CT-09 | FR-009 | Visual | Dadas as seções com Espectro, quando renderizadas, então há no máximo um por seção, à direita ou na base, sobre grafite, e nenhum ícone `outdoor` é referenciado |
| CT-10 | FR-010, RN-01 | Estático (script) | Dados os `*-copy.js`, `awards-page-data.js`, `src/pages/campanha/main.jsx`, os 19 HTMLs, `llms.txt` e `sitemap.xml`, quando se procuram os termos da RN-01 (sem diferenciar maiúsculas), então há zero ocorrências |
| CT-11 | FR-011 | Revisão de texto | Dada a home em PT, EN e ES, quando se lê o hero e a meta description, então a proposta "central de dados que faz campanhas de rádio e TV performarem" está presente, adaptada ao idioma |
| CT-12 | FR-012 | Estático + navegador | Dada `/premios` nos 3 idiomas, quando se leem as colocações, então "4º lugar", "4.º lugar" e "4th place" não aparecem, e aparece "Top 4" |
| CT-13 | FR-013 | Navegador | Dada uma página em 1280px, quando se inspeciona um parágrafo `.copy-justify`, então `text-align: justify`; e um `h2` tem `text-align` diferente de `justify` |
| CT-14 | FR-014 | Build + scripts | Dado `npm run build`, quando se rodam `verify:build-assets` e `verify:hosting`, então os dois passam e as 19 páginas existem em `dist/` |
| CT-15 | FR-015 | Auditoria | Dadas as 19 rotas, quando se roda a auditoria (`web-design-guidelines` + verificação de contraste), então não há falha de contraste AA e o foco é visível em todos os controles |
| CT-16 | Edge (reduced motion) | Navegador | Dado `prefers-reduced-motion: reduce`, quando se abre a home, então as animações ficam desativadas ou com duração mínima |
| CT-17 | Regressão i18n | Script | Dado `scripts/verify-spanish-routes.mjs`, quando executado após a migração, então passa como antes |
| CT-18 | RN-02, RN-03 | Revisão de texto | Dados os textos reescritos, quando se procuram nomes de clientes em cases e frases com mais de 3 palavras em vermelho, então não há nenhum caso |

Rastreabilidade: os 15 requisitos funcionais (FR-001 a FR-015) e as 3 regras de negócio (RN-01 a RN-03) aparecem em pelo menos um cenário. **18/18 cobertos.**

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 19 de 19 páginas abrem com as fontes, as cores e o logo oficiais (CT-02, CT-04).
- **SC-002**: zero ocorrências dos termos da RN-01 nos 3 idiomas (CT-10).
- **SC-003**: zero hexadecimais de marca antigos em `src/` fora de `src/ds/` (CT-01).
- **SC-004**: os 4 formulários continuam entregando e-mail pela Brevo, com o mesmo payload (CT-07 e um envio real de teste em cada um após a publicação).
- **SC-005**: a nota da crítica `impeccable` na home e no cashback sobe de 25/40 (21/07/2026) para pelo menos 30/40, com "Aesthetic and Minimalist Design" ≥ 3.
- **SC-006**: Lighthouse Performance na home (mobile) igual ou melhor que antes da migração, com tolerância de −3 pontos.

## Decisões tomadas

| # | Pergunta | Decisão | Alternativa descartada | Motivo |
|---|---|---|---|---|
| D-01 | Alcance da migração | Todas as 19 páginas, incluindo lp/campanha | Home primeiro; tudo menos lp/campanha | Os tokens são globais; migrar em partes deixa o site com duas identidades (Edy) |
| D-02 | Revisar textos junto? | Visual + textos | Só visual | O site cita "out-of-home" e "mídia offline", contrariando o posicionamento de 17/11/2026 (Edy) |
| D-03 | Como os componentes entram | Tokens no tema Tailwind + componentes copiados para `src/ds/` | Só tokens | Visual mais fiel e regra do design system de copiar, não apontar (Edy) |
| D-04 | Idiomas | PT, EN e ES | Só PT | Edy: "nos 3 idiomas" |
| D-05 | Raio dos botões | Seguir o design system (`--radius-md`, 8px) e abandonar a pílula | Manter pílula | Decisão do agente: o design system é a fonte; a pílula era um token local antigo |
| D-06 | Tailwind e Framer Motion | Manter os dois; Tailwind passa a ler os tokens oficiais | Trocar por CSS puro | Decisão do agente: menor risco e menor diff; o design system é agnóstico ao framework |
| D-07 | Outra frente comercial discutida na mesma entrevista | Fora desta spec | Escrever junto | Edy: tratar à parte |
| D-08 | Logos de TV Anhanguera, CBN e Eysecor na parede de veículos e clientes | Removidos | Manter | Decisão do Edy (23/11/2026) |
| D-09 | Favicon | Mantido o "U" branco sobre vermelho atual | Gerar do `avatar-vermelho.png` oficial | O avatar oficial é o logo inteiro sobre branco e fica ilegível em 16–32px; o design system não tem símbolo para favicon (pendência do design system) |
| D-10 | Colocação "Mulheres Inovadoras 2026" na página de prêmios | "Top 4" (antes "1º lugar") | Top 3 / manter "1º lugar" | Edy, 23/11/2026: "tenho certeza sobre o quarto" |
| D-11 | Desafio INDTECHS 2026 ("1º lugar") | Removido da página de prêmios | Manter | Edy, 23/11/2026: foi vitória de uma etapa, não prêmio nacional; a página mantém os prêmios nacionais |
| D-12 | Pessoas em /investidores | Ary Hauffe, Débora Freitas, Edy Medrado, Iuri Rincon Godinho, João Silva, Marcelo Bassetto, Monique Evelle (Vellore segue na seção de empresas) | Lista antiga (Ari, Débora, Edy, João, Monique) | Decisão do Edy (23/11/2026) |
| D-13 | Quais prêmios a página lista | Só nacionais: Prêmio Nacional de Inovação (1º lugar), Curicaca/ABDI (Top 4), Mulheres Inovadoras (Top 4), Brasil Criativo (Vencedora, categoria a definir) | Manter INDTECHS e Catalisa | Edy, 23/11/2026: INDTECHS foi vitória de etapa e Catalisa não é nacional; no Brasil Criativo a Ummix ficou como vencedora |

## Assumptions

- O design system em `Oraculo/design-system/ummix-ads-design/` é a versão vigente. Se mudar depois da cópia, a atualização de `src/ds/` fica em outra tarefa.
- A publicação continua manual na Locaweb (build + upload), conforme `docs/site-form-brevo.md`. Esta spec não muda a hospedagem.
- O dono do repositório é o Ary (`Arynelson/Ummix_landing`). A implementação sai numa branch e PR para revisão dele; nada vai direto para `main`.
- As imagens e capturas da plataforma (`platform-preview-*.png`) continuam as mesmas. Trocar as capturas não faz parte desta spec.
- "Mídia offline" pode continuar onde significar só rádio e TV (ex.: em comparação com o digital), mas a forma preferida é "rádio e TV".
- A tradução EN e ES dos textos reescritos é feita pelo implementador e revisada pelo Edy antes da publicação.

## Áreas vizinhas que esta spec não altera

- **Envio de formulários**: `src/services/formSubmit.js`, `public/api/site-form.php` e `public/api/pre-registration.php`, os destinatários de `src/constants/urls.js` e a integração com a Brevo continuam iguais. Muda só a aparência dos campos.
- **Rotas e URLs**: `.htaccess`, `sitemap.xml` (só o texto, não as URLs) e a estrutura `en/` e `es/`.
- **Plataforma** `app.ummix.com.br`: fora deste repositório. Os links para ela continuam os mesmos.
- **`subpages/`**: é a cópia antiga do pacote do design system ("sem build", com React por CDN) e não entra no build do Vite. Não é migrada. Recomenda-se removê-la depois, em outra tarefa.
- **Parede de logos de clientes e veículos** (`src/components/Partners.jsx`): mantida como está.

## Fora do escopo

- Outra frente comercial discutida na entrevista (D-07): tratada à parte.
- Novas seções, páginas ou produtos. Esta spec troca a identidade e corrige textos, mas não muda a estrutura de conteúdo das páginas.
- Redesenho da plataforma `app.ummix.com.br`.
- Troca de hospedagem (Locaweb → Vercel ou outra) e automação de deploy.
- Atualizar o próprio design system para tirar OOH, jornal e o ícone `outdoor`. Isso se faz no repositório do design system, não aqui.

## Questões em aberto

| # | Questão | Dono | Impacto |
|---|---|---|---|
| Q-01 | A parede de logos de clientes ("Marcas que...") continua aprovada para o site novo? | Edy | Baixo: se não, ela vira "segmentos atendidos" |
| Q-02 | O Ary aceita a migração como PR no repositório dele, ou prefere fazer ele mesmo a partir da spec? | Edy / Ary | Médio: define quem implementa |

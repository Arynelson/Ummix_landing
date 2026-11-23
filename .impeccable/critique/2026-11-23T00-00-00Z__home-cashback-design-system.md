---
target: home e cashback (pós-migração para o design system Ummix Ads)
total_score: 29
max_score: 40
na_heuristics: ""
p0_count: 0
p1_count: 2
timestamp: 2026-11-23T00-00-00Z
slug: home-cashback-design-system
previous: 2026-07-21T18-48-27Z__src-app-jsx-src-pages-cashback-cashbackpage-jsx.md (25/40)
---
## Impeccable critique — home e cashback (design system Ummix Ads)

⚠️ DEGRADED: single-context (delegated read-only run). Avaliação A inline; avaliação B = `impeccable detect --json` nas fontes e nas URLs `http://localhost:4173/` e `/cashback.html` em 1280x900 e 390x844; screenshots com Chrome headless 1280px. Sem overlay nem live-server.

### Design Health Score

| # | Heurística | Antes | Agora | Ponto-chave |
|---|---|---:|---:|---|
| 1 | Visibility of System Status | 3 | 3 | Nav ativa sublinhada, autoplay do Método com controles; nada de novo. |
| 2 | Match System / Real World | 3 | 3 | Linguagem PME clara ("Você define / A Ummix cuida"); "PI" ainda sem explicação no cashback. |
| 3 | User Control and Freedom | 3 | 3 | Menu mobile, Esc no modal e no menu; ok. |
| 4 | Consistency and Standards | 3 | 3 | Tokens e componentes do DS aplicados; mas títulos em CAIXA ALTA (Bastidores, Método, cards "Um único…") e números grandes em Plex Mono contrariam o DS. |
| 5 | Error Prevention | 2 | 3 | Nota "cinco minutos = criação, não veiculação" + FAQ e regras do cashback antes do CTA. |
| 6 | Recognition Rather Than Recall | 3 | 3 | Passo a passo 01–04 legível; proposta concentrada no hero. |
| 7 | Flexibility and Efficiency | 2 | 3 | CTA primário agora é "Criar minha campanha"; rota de conversa e cashback como secundárias. |
| 8 | Aesthetic and Minimalist Design | 2 | 3 | Cores chapadas, sem glow, Espectro e ícones pixel: salto real. 3 frágil: 3 Espectros na home, faixa de logos duplicada, dois fechamentos seguidos, faixas escuras só com botão, 16 "icon tiles". |
| 9 | Error Recovery | 2 | 2 | Formulário tem erro/sucesso, mas o cashback joga para plataforma externa sem rota de ajuda perto do CTA. |
| 10 | Help and Documentation | 2 | 3 | FAQ "Dúvidas sobre sua campanha" e lista de regras do cashback. |
| **Total** | | **25/40** | **29/40** | **Good (limite inferior). Faltam ~2 pontos para a meta de 30, quase todos baratos.** |

### Design Specificity Verdict

**LLM:** agora parece Ummix: grafite quente + vermelho único, Poppins/Plex, Espectro e ícones de sinal em pixel dão identidade própria que uma marca qualquer não reaproveitaria. O que ainda é genérico é a gramática repetida de "kicker mono → título → grid de cards com ícone em quadradinho rosado" em quase todas as seções, e o excesso de fechamentos no fim da home.

**Detector:** fontes JSX: 0 achados. Home 1280: 24 (icon-tile-stack 9, kicker-above-heading 6, undersized-ui-text 5, unbalanced-heading 3, straggler 1). Cashback 1280: 13 (icon-tile-stack 7, kicker-above-heading 2, straggler 2, undersized-ui-text 1, hero-eyebrow-chip 1). 390px: contagens equivalentes. Falsos positivos parciais: `kicker-above-heading` e `hero-eyebrow-chip` são padrão do DS (kicker mono); o problema real é a frequência, não o padrão. `side-tab` da crítica anterior sumiu.

### O que melhorou desde a última crítica
1. Hero com hierarquia correta: campanha primeiro, conversa em segundo, diagrama "Você define / A Ummix cuida" resolve a divisão de responsabilidades num olhar.
2. Migração de marca limpa: nada de gradiente/glow, cores chapadas, Espectro à direita sobre grafite, ícones pixel nos pontos certos.
3. Pendências de acessibilidade resolvidas: `prefers-reduced-motion` e `:focus-visible` em `src/index.css`, menu mobile no Header, tokens escuros ajustados para AA.

### Priority issues

1. **[P1] Faixas escuras que só têm um botão, logo após outro fechamento.** `src/components/home/Contact.jsx:62-84` (home) e `src/pages/cashback/CashbackPage.jsx:258-264` (cashback): título em `sr-only`, botão solto no meio de uma faixa grafite, e na home vem logo depois do card "Pronto para montar sua campanha?" (CampaignQuestions). Lê como resto de layout e dilui o fechamento. **Correção:** home: remover a faixa visível e fazer o botão "Falar com a Ummix" do card final abrir o modal (extrair o modal para `ContactModal` e reaproveitar); cashback: tornar o `h2` visível (`copy.ctaTitle`), layout `mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between`, título à esquerda, botão à direita, Espectro à direita/base como manda o DS.
2. **[P1] Títulos inteiros em CAIXA ALTA, contra a regra do DS (sentence case; caixa alta só em kicker mono).** `src/components/home/Backstage.jsx:62, 80, 91, 122`; `src/components/home/Method.jsx:138`; `src/components/home/ClientView.jsx:77`. **Correção:** tirar `uppercase` e `tracking-wide` desses elementos; manter só nos kickers `font-mono text-[11px]`.
3. **[P2] Três Espectros na home (DS: um por peça).** `src/components/home/Hero.jsx:26-31` (dentro do card do hero), `src/components/home/CashbackSection.jsx:15-20`, `src/components/home/Contact.jsx:64-69`. **Correção:** manter só o da `CashbackSection` (faixa manifesto); no card do hero remover o `<img>` e trocar `pb-28` por `p-7` e `shadow-[var(--shadow-md)]` por `shadow-[var(--shadow-xs)]`; a faixa do Contact some com o item 1.
4. **[P2] Cabeçalho com dois vermelhos cheios disputando atenção.** `src/components/Header.jsx:44` (rótulo "Idioma" em 10px, abaixo do piso de 11px) e `:66` (idioma ativo `bg-accent text-white`) competem com o CTA "Plataforma Ummix Ads". **Correção:** remover o `<span>` "Idioma" (o grupo já tem `aria-label`); idioma ativo → `bg-sunken text-strong` (ou `underline decoration-[var(--accent)]`); o vermelho cheio fica só no CTA.
5. **[P2] "Icon tile" repetido 16 vezes (template genérico).** `src/components/home/ForWhom.jsx:73`, `src/components/home/Deliverables.jsx:61`, `src/pages/cashback/CashbackPage.jsx:110` e `:201`, cards de `ClientView`. **Correção:** tirar o quadrado `bg-accent-soft` e colocar o ícone pixel (20px) inline antes do `h3`, como já feito em `Hero.jsx:43-44` (`flex items-center gap-3`). Nos passos do cashback, ficar só com o kicker "PASSO 0X" + título.
6. **[P2] Ritmo quebrado em três pontos baratos.** (a) `src/components/home/Segmentations.jsx:109` `min-h-[240px]` deixa ~100px vazios sob a grade de 2 linhas e a legenda flutua → `min-h-[136px]` e legenda com `mt-6`. (b) `src/components/home/CampaignGuide.jsx:50` selo "Você define / A Ummix cuida" em mono 10px quebra em 2–3 linhas → `whitespace-nowrap text-[11px]` e coluna `md:grid-cols-[8rem_1.05fr_1fr]`; `:59` barrinha vertical vermelha no fim de cada linha parece artefato → remover. (c) Logos de anunciantes aparecem duas vezes: `HeroProof` (`src/App.jsx:30`) e `src/components/Partners.jsx:139` → manter no topo e deixar em `Partners` só a faixa de veículos.

### Persona red flags
- **Jordan (PME, primeira campanha):** entende o que fazer em 5 s (hero). No fim da home encontra três convites seguidos (FAQ → card final → faixa com botão) e não sabe qual é "o" próximo passo.
- **Riley (agência/intermediário, cashback):** a regra está clara, mas "assina o PI" não é explicado e não há contato/ajuda ao lado de "Acessar plataforma de cashback"; ao cair na plataforma externa, não sabe a quem recorrer.
- **Casey (celular):** sem o card-diagrama do hero (`hidden lg:block`) o mobile perde o melhor resumo da oferta; selos 10px nos passos ficam ilegíveis.

### Minor observations
- Peso dos títulos: `font-black`/`font-extrabold` em 15 lugares (ex.: `Hero.jsx:72`, `CampaignGuide.jsx:36`, `CashbackPage.jsx:59`); o DS pede Poppins 600–700 → `font-bold`.
- Números grandes em Plex Mono (`CashbackPage.jsx:225` "3%", `Backstage.jsx:77`); o DS reserva números grandes para Poppins → `font-display font-bold`.
- Destaques grandes em fundo escuro usam `--text-brand` local (red-300 #DB8E8B), que fica rosado (`Backstage.jsx:64`, `Deliverables.jsx:51`, `CashbackPage.jsx:59`). Para texto ≥24px, `text-[var(--red-400)]` (#C65553, 3,9:1, passa AA para texto grande) fica mais perto do vermelho da marca; red-300 só nos kickers.
- Rodapé desalinhado: links com `px-2` (`Footer.jsx:16-17`) e "Siga a Ummix" sem padding (`:19`); três blocos `justify-between` de alturas diferentes.
- Órbita dos Bastidores em 1280px: "MONITORAMENTO EM TEMPO REAL" encosta na borda direita.
- Detector: 3 títulos desbalanceados e 3 linhas viúvas → `text-wrap: balance` nos `h2` e `text-wrap: pretty` no corpo.

### Questions to consider
- O fim da home precisa de mais que um fechamento? Um único bloco "Pronto para montar sua campanha?" com dois botões basta.
- Os cards "Para quem é" precisam ser cards? Uma lista com ícones pixel inline seria mais Ummix e menos template.
- O diagrama do hero poderia aparecer (compacto) no mobile, que é onde a PME mais chega?

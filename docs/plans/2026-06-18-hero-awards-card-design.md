# Hero: Card único "Prêmios e Certificações" — Design

## Contexto

O Hero ([src/components/Hero.jsx](../../src/components/Hero.jsx)) hoje mostra dois cards separados (`<a>` pill com emoji + texto + logo) para o prêmio CNI/SEBRAE e o reconhecimento ABDI. Vamos consolidar em um único card "Prêmios e Certificações" e adicionar uma terceira certificação: GO E-commerce.

## Objetivo

Substituir os dois cards atuais por um único card contendo os 3 logos lado a lado. Cada logo revela sua frase explicativa ao hover (desktop) ou tap (mobile), e leva ao link da instituição ao ser clicado/tocado novamente.

## Estrutura visual

- Container único: mesmo estilo dos cards atuais (`bg-white/10 backdrop-blur border border-white/25 rounded-full`)
- Label "PRÊMIOS E CERTIFICAÇÕES" em caps, pequeno, à esquerda dentro do card
- 3 logos à direita do label, cada um em container quadrado uniforme (40px mobile / 56px desktop), fundo branco sutil, `object-contain` para preservar proporção sem distorcer

## Dados dos 3 itens

| # | Logo | Asset | Frase | Link |
|---|------|-------|-------|------|
| 1 | CNI/SEBRAE | `/assets/cni_premio_inovacao.jpg` | "Vencedor · Prêmio Nacional de Inovação · CNI/SEBRAE" | `https://www.premiodeinovacao.com.br/vencedores/` |
| 2 | ABDI | `/assets/Logo_ABDI_Principal .png` | "Top 4 ideias mais inovadoras do Brasil · ABDI" | `https://curicaca.abdi.com.br/` |
| 3 | GO E-commerce (novo) | `/assets/Selo_GO+E-commerce.png` | "Certificação GO E-commerce" | `https://comunicacao.ielgoias.com.br/go-ecommerce` |

Asset novo precisa ser copiado de `assets/Selo_GO+E-commerce.png` (raiz do repo) para `public/assets/Selo_GO+E-commerce.png` para ser servido pelo Vite.

## Interação

**Desktop (hover):**
- Hover no logo individual → `scale-105` + tooltip flutuante acima do logo, com seta, fundo escuro sólido, `pointer-events-none`
- Clique no logo (com ou sem hover prévio) → abre o link em nova aba

**Mobile/touch (sem estado de hover):**
- Estado local `activeIndex` controla qual logo está "ativo"
- 1º tap em um logo → ativa o tooltip daquele logo (`activeIndex = index`)
- 2º tap no mesmo logo já ativo → navega para o link
- Tap em outro logo → troca o `activeIndex`, fecha tooltip anterior
- Tap fora dos logos → fecha tooltip ativo

## Implementação técnica

- Componente local dentro do Hero (ou extraído para `AwardsBadge.jsx` se preferir reuso) com array de dados (`AWARDS`) e `useState<number|null>` para `activeIndex`
- `onMouseEnter`/`onMouseLeave` para desktop, `onClick` com lógica condicional (ativar vs navegar) cobre mobile
- Cada logo é um `<button>` ou `<a>` com `onClick` que verifica se já está ativo antes de deixar o link prosseguir (usar `preventDefault()` se não estiver ativo ainda, no caso de touch)

## Fora de escopo

- Não há mudança nos outros prêmios/certificações além de adicionar GO E-commerce
- Não estamos alterando o restante do Hero (headline, CTAs, screenshot da plataforma)

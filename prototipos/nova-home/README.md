# Nova home: prévia para aprovação

Prévia navegável da nova home do site, aprovada pelo Edy em 24/11/2026. Já está no design system oficial (tokens, logo, Espectro, ícones pixel) e depende da migração do PR #1 (`001-design-system-ummix`).

## Como abrir

O simulador carrega `cidades.json` e `veiculos.json`, então abra por um servidor local (abrir o arquivo direto no navegador não carrega as listas):

```
npx serve prototipos/nova-home
```

## O que tem na página

1. **Hero:** "Mais vendas por real investido" + quadro "Quatro canais, um plano".
2. **Reconhecimentos:** banner com 6 prêmios (logo, colocação e descrição).
3. **Canais:** 4 cartões com "Por que…" e "Ideal para…".
4. **Como funciona:** 4 passos.
5. **Por que a Ummix:** diferenciais.
6. **Simulador:**
   - canal → cidades → segmentação;
   - investimento e frequência ficam no painel de resultado, fixo ao lado;
   - no celular, uma barra fixa embaixo mostra os números.
7. **Para quem:** anunciante, agência (`/partner`) e veículo (`/monetize`).
8. **Comparação, perguntas frequentes e chamada final.**

## Regras que a implementação precisa manter

- **Canais sempre em ordem alfabética:** Matéria Patrocinada, Pré-roll, Rádio, Televisão.
- **Preço por CPM:**

  | Canal | CPM base |
  |---|---|
  | Rádio | R$ 30 |
  | TV | R$ 112 |
  | Pré-roll | R$ 133,34 (30") |
  | Matéria Patrocinada | R$ 100 por mil visualizações |

  - Cada filtro com alguma opção marcada soma +10%.
  - Duração da peça: 7" ×0,5 · 15" ×0,7 · 30" ×1 · 45" ×1,3 · 60" ×1,5.
  - Testemunhal: ×2.
- **Resultados:** impactos = investimento ÷ CPM × 1.000; pessoas = impactos ÷ frequência. A frequência padrão de rádio e TV é 66, como na plataforma.
- **Cidades:**
  - rádio e TV, só as praças: Goiânia, Aparecida de Goiânia, Anápolis, Rio Verde, Jataí, Quirinópolis e São Paulo (em abertura);
  - pré-roll e Matéria Patrocinada, qualquer município (`cidades.json`, lista do IBGE).
- **Filtros de rádio e TV:** são os da plataforma (wizard, passo 3), com as mesmas opções, e mais os do painel do Tableau. Em `simulador-fonte.js`, os rótulos com `*` vêm só do Tableau e ainda têm opções aproximadas; vale trocar pelas opções reais da base.
- **Veículos:**
  - aparecem só como exemplo de "onde a campanha pode entrar";
  - **sem afinidade, nota ou ranking, e sem cidade**;
  - **TV Anhanguera, CBN e Eysecor não aparecem** no site.
- Os números do simulador são uma simulação; o plano real sai na plataforma.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | A prévia completa (CSS, JS, logos e ícones embutidos) |
| `cidades.json` | 5.571 municípios do IBGE |
| `veiculos.json` | Logos e nomes dos veículos de exemplo |
| `simulador-fonte.js` | Script do simulador, legível (os `__ICON_...__` são substituídos pelos ícones na montagem) |

## Para colocar no ar

Recriar a home em React (`src/App.jsx` e `src/components/home/`) usando os componentes de `src/ds/`, com o conteúdo nos 3 idiomas (`src/home-copy.js`). O simulador pode virar um componente próprio que lê `cidades.json` e `veiculos.json` de `public/`.

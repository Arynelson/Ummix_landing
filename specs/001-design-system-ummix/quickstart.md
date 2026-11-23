# Quickstart: validar a migração de ponta a ponta

## Pré-requisitos

- Node ≥ 20 e `npm install` feito na raiz.
- Branch `001-design-system-ummix`.
- A linha de base da fase 0 registrada em `specs/001-design-system-ummix/baseline/`: Lighthouse da home, screenshots das 19 rotas e payload dos 4 formulários.

## 1. Verificação estática (CT-01, 02, 03, 05, 10, 12)

```powershell
npm run verify:design-system
```

Esperado: `0 violações`. Regras em [contracts/verify-design-system.md](./contracts/verify-design-system.md).

## 2. Build e scripts existentes (CT-14, CT-17)

```powershell
npm run build
```

```powershell
npm run verify:build-assets
```

```powershell
npm run verify:hosting
```

```powershell
node scripts/verify-spanish-routes.mjs
```

```powershell
node scripts/verify-design-system.mjs --dist
```

Esperado: tudo passa; `dist/` contém as 19 páginas.

## 3. Formulários (CT-07, CT-08)

```powershell
node scripts/verify-site-form.mjs
```

Esperado: o payload de cada formulário é idêntico ao da linha de base (mesmas chaves, mesmo `_url`).

No navegador (`npm run dev`, depois a home → "Fale conosco"):
- envio com o endpoint simulando erro → mensagem de erro no `Toast` oficial e campos preservados;
- campos obrigatórios vazios → validação nativa, com `aria-invalid` no campo.

Depois da publicação na Locaweb, fazer 1 envio real em cada um dos 4 formulários e confirmar o e-mail (SC-004).

## 4. Navegador (CT-04, 06, 09, 13, 16)

Com `npm run dev`, abrir cada rota: `/`, `/cashback`, `/partner`, `/monetize`, `/investidores`, `/premios`, as mesmas com `/en` e `/es`, e `/lp/campanha.html`.

| Checagem | Como | Esperado |
|---|---|---|
| Logo (CT-04) | DevTools → header e footer; aba Rede | SVG oficial inline; nenhum pedido a `logo-ummix-ads.png` |
| CTA como link (CT-06) | Inspecionar "Criar campanha" no header | `<a href="https://app.ummix.com.br">` com o visual do Button primário |
| Espectro (CT-09) | Seções grafite | No máximo 1 por seção, à direita ou na base, sobre grafite |
| Justificado (CT-13) | Viewport 1280px; estilos calculados | `.copy-justify` = `justify`; `h1`/`h2` ≠ `justify` |
| Movimento reduzido (CT-16) | DevTools → Rendering → `prefers-reduced-motion: reduce` | Animações desligadas ou instantâneas |
| Fontes (CT-02) | Estilos calculados de `h1`, `p`, kicker | Poppins / IBM Plex Sans / IBM Plex Mono |

## 5. Auditorias (CT-15, SC-005, SC-006)

- Skill `web-design-guidelines` sobre os componentes e páginas alterados: sem falha de contraste AA; foco visível em todos os controles.
- Skill `impeccable` (crítica) na home e no cashback: nota ≥ 30/40 e "Aesthetic and Minimalist Design" ≥ 3, comparando com `.impeccable/critique/2026-07-21T18-48-27Z__*.md`.
- Lighthouse mobile na home: Performance ≥ linha de base − 3.

## 6. Revisão de texto (CT-11, CT-18)

Ler o hero e a meta description da home em PT, EN e ES. Conferir:
- o posicionamento "central de dados que faz campanhas de rádio e TV performarem";
- nenhum nome de cliente em case;
- no máximo 3 palavras em vermelho por frase;
- "licenciado" só como modelo de expansão.

O Edy revisa o EN e o ES antes da publicação.

# Contrato: `scripts/verify-design-system.mjs`

Script Node sem dependências, no padrão dos `scripts/verify-*.mjs` existentes. Rodado por `npm run verify:design-system`. Termina com código 0 se tudo passar e 1 se houver qualquer violação, imprimindo `arquivo:linha  regra  trecho`.

## Entradas

- `src/**/*.{js,jsx,css}`
- 19 HTMLs: `index.html`, `cashback.html`, `partner.html`, `monetize.html`, `investidores.html`, `premios.html`, `en/*.html`, `es/*.html`, `lp/campanha.html`
- `public/llms.txt`, `public/sitemap.xml`
- Opcional `--dist`: também varre `dist/**/*.{html,css}` depois do build (CT-02)

## Regras

| Regra | CT | Onde | Falha quando |
|---|---|---|---|
| `old-tokens` | CT-01 | `src/` fora de `src/ds/` | Encontra `#9b191a`, `#7a1415`, `#1e1e1e`, `#f4f2f2`, `ummix-red`, `ummix-dark`, `ummix-gray`, `ummix-grafite`, `--ummix-` |
| `loose-hex` | CT-01 | `src/` fora de `src/ds/` (cópias oficiais podem ter hex) | Encontra um hexadecimal de cor que não seja `#fff`/`#ffffff` |
| `old-fonts` | CT-02 | HTMLs, `src/`, `dist/` | Encontra `Baloo`, `Plus Jakarta`, `Plus+Jakarta` |
| `new-fonts` | CT-02 | Cada um dos 19 HTMLs | Não encontra `Poppins`, `IBM+Plex+Sans` e `IBM+Plex+Mono` no `<link>` de fontes |
| `glow-gradient` | CT-03 | `src/` | Encontra `redPulse`, `pulse-ring`, `arc-dot`, `--glow-red`, `linear-gradient(`, `radial-gradient(`, `conic-gradient(`, `bg-gradient-`, `bg-linear-`, `bg-radial-`. Exceção: linha com o comentário `/* ds-allow: overlay */` |
| `external-import` | CT-05 | `src/` | Encontra um import contendo `Oraculo`, `design-system/ummix-ads-design` ou um caminho absoluto de unidade (`U:`, `C:`) |
| `ds-readme` | CT-05 | `src/ds/README.md` | O arquivo não existe ou não contém "Origem:" e "Copiado em:" |
| `forbidden-terms` | CT-10 | arquivos de texto, HTMLs, `llms.txt`, `sitemap.xml` | Encontra, sem diferenciar maiúsculas: `OOH`, `out-of-home`, `out of home`, `outdoor`, `mídia exterior`, `publicidad exterior`, `medios exteriores`, `vía pública`, `billboard`, `impresso`, `jornal`, `revista`, `newspaper`, `pesquisa própria`, `pesquisas próprias`, `a cada 120 dias`, `every 120 days`, `cada 120 días`, `em Goiânia` |
| `offline-media` | CT-10 | idem | Encontra `mídia offline` / `mídia off` / `offline media` / `media off` / `medios offline` / `medios off`. Exceção: linha com `ds-allow: offline-vs-digital`, para comparação explícita com o digital |
| `awards-top-n` | CT-12 | `src/pages/awards/awards-page-data.js` | Encontra `4º lugar`, `4.º lugar`, `4th place`, `4.º puesto` |

Observações:
- `outdoor` também pega o nome do ícone `outdoor.svg`. Isso é intencional: o ícone não deve ser referenciado (FR-009).
- "licenciado" não entra na busca automática porque o termo pode aparecer legitimamente ao falar do modelo de expansão. Ele é checado na revisão de texto (CT-18).

## Saída esperada

```text
verify-design-system: 0 violações em 87 arquivos (10 regras)
```

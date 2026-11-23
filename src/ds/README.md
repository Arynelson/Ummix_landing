# src/ds — cópia local do design system Ummix Ads

Origem: `Oraculo/design-system/ummix-ads-design` (design system oficial da Ummix Ads, decisão de 06/11/2026).
Copiado em: 23/11/2026.

Não importe nada de fora do repositório. Para atualizar, copie de novo da origem e reaplique as adaptações abaixo.

## Arquivos copiados

| Destino | Origem |
|---|---|
| `src/ds/tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css` | `tokens/` |
| `public/assets/ds/logo-ummix-{vermelha,branca,preta}.svg`, `grafismo-espectro.svg`, `avatar-vermelho.png` | `assets/` |
| `public/assets/ds/icones-pixel/*.svg` (sem `outdoor*`, porque hoje a Ummix vende só rádio e TV) | `assets/icones-pixel/` |
| `src/ds/components/*` | `components/*` (ver adaptações) |

Não copiados:
- `tokens/fonts.css`: as fontes vêm por `<link>` em cada HTML, mais rápido que `@import`.
- `tokens/base.css`: substituído por `src/ds/ds.css`.

Os tokens `--glow-red` e `--glow-red-soft` existem em `effects.css`, mas **não** devem ser usados: o site não usa brilho em elementos de marca.

## Adaptações locais

Copiados sem alteração: `Logo`, `Card`, `StatCard`, `Badge`, `Tag`, `Tabs`, `Toast`.

| Componente | Adaptação | Motivo |
|---|---|---|
| `Button` | `href`/`target`/`rel` → renderiza `<a>` (com `rel="noopener noreferrer"` automático em `_blank`); `className`, `ref` e `...rest`; hover e pressionado em CSS (`.ds-btn` em `ds.css`) | CTAs que navegam precisam ser links (FR-006); hover em `useState` re-renderiza a cada passagem do mouse |
| `IconButton` | hover em CSS (`.ds-btn`); `className`, `ref`, `...rest` | Idem |
| `Input`, `Select` | `forwardRef`; `id`, `name`, `required`, `autoComplete`, `aria-*` repassados ao elemento nativo; `<label htmlFor>`; `aria-invalid` e `aria-describedby`; foco em CSS (`.ds-field`); altura `--control-lg` e fonte `--type-body` (16px, evita zoom no iOS). `Select` aceita `children` (`<option>`) | Os formulários do site dependem desses atributos (FR-007, FR-015) |
| `Checkbox` | `<input type="checkbox">` nativo escondido visualmente (`.ds-check-*` em `ds.css`); `onChange` recebe o evento nativo | O original simula o checkbox com `<span>` e não funciona com `required`/`name` nem com envio nativo |
| `Field.jsx` | **novo**: moldura comum (rótulo, ajuda, erro) | Compartilhado por Input, Select e Textarea |
| `Textarea` | **novo**, mesmo visual do `Input` | Não existe no design system; o formulário de contato precisa |

## Ajustes locais de tokens

| Token | Oficial (tema escuro) | Local | Motivo |
|---|---|---|---|
| `--text-brand` | `--red-400` (#C65553) | `--red-300` (#DB8E8B) | 3,9:1 sobre `--ink-900`; falha WCAG AA em texto pequeno (kickers). Com `red-300`: ~6,8:1 |
| `--text-muted` | `--ink-400` (#938783) | `--ink-300` (#B8AEAA) | 4,2:1 sobre `--ink-800` (cartões escuros). Com `ink-300`: ~6,7:1 |

Definidos em `src/ds/ds.css` sob `[data-theme="dark"]`. Sugestão para o design system oficial: adotar esses valores no tema escuro.

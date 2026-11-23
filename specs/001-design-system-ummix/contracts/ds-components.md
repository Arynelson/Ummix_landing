# Contrato: componentes locais em `src/ds/components/`

As cópias mantêm a API oficial (`.d.ts` do `ummix-ads-design`) e **acrescentam** só o que está abaixo. Toda adaptação fica listada em `src/ds/README.md`, com a data da cópia, para permitir re-sincronizar com o original.

## Button

Props oficiais: `variant` (`primary | secondary | soft | ghost | inverse`), `size` (`sm | md | lg`), `disabled`, `fullWidth`, `iconLeft`, `iconRight`, `children`, `onClick`, `type`, `style`.

Acréscimos locais:

| Prop | Tipo | Comportamento |
|---|---|---|
| `href` | `string` | Se presente, renderiza `<a href>` com o mesmo visual. `type` é ignorado |
| `target`, `rel` | `string` | Repassados ao `<a>`. Com `target="_blank"` sem `rel`, aplica `rel="noopener noreferrer"` |
| `className` | `string` | Repassada ao elemento raiz (posicionamento no layout, nunca cor) |
| `...rest` | atributos nativos | `aria-*`, `data-*`, `id` repassados |

Regras:
- No máximo um `variant="primary"` por bloco visual (orientação oficial: 1 por tela).
- Hover e pressionado são feitos em CSS (`:hover`, `:active`), não em estado React (R-05).
- Raio `--radius-md`. Altura pelos tokens `--control-*`.

## Input / Select / Checkbox / Textarea

Props oficiais (`Input`): `label`, `hint`, `error`, `placeholder`, `value`, `defaultValue`, `onChange`, `type`, `prefix`, `suffix`, `disabled`, `style`.

Acréscimos locais (todos os campos):

| Prop | Comportamento |
|---|---|
| `ref` (via `forwardRef`) | Chega ao elemento nativo |
| `id` | Liga `<label htmlFor>` ao campo. Sem `id`, gera um com `useId()` |
| `name`, `required`, `autoComplete`, `inputMode`, `rows` (Textarea), `aria-*` | Repassados ao elemento nativo |
| `error` | Também define `aria-invalid="true"` e `aria-describedby` apontando para a mensagem |
| `hint` | Ligado por `aria-describedby` |

`Textarea` é novo: mesma moldura, borda, raio e estados do `Input`, com `rows` padrão 3.

**Invariante de formulário (FR-007):** trocar `<input>` por `<Input>` não pode mudar `name`, `value`, a ordem dos campos nem o objeto enviado por `submitForm()` em `src/services/formSubmit.js`. O CT-07 compara o payload antes e depois.

## Logo

Sem adaptação. `variant`: `vermelha` (fundo claro), `branca` (fundo escuro ou vermelho), `preta` (P&B). `height` mínima de 16px. Nunca recebe `filter`, `opacity` decorativa nem cor diferente.

## Demais (Card, StatCard, Badge, Tag, Tabs, Toast, IconButton)

Sem adaptação de API. O `IconButton` recebe o mesmo tratamento de hover em CSS do `Button`.

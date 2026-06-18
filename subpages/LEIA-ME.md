# Ummix Ads — Site (landing + subpages)

Pacote pronto para rodar localmente. Tudo em HTML + React (via CDN) + CSS — **sem build**.

## Como abrir

As páginas usam React/Babel carregados por `<script src>` e arquivos `.jsx` carregados
por caminho relativo. Por causa disso, **abrir o arquivo direto com `file://` não funciona**
em alguns navegadores (bloqueio de CORS). Rode um servidor estático simples:

```bash
# dentro da pasta do projeto (onde está o index.html)
python3 -m http.server 8000
# depois abra:  http://localhost:8000
```

(ou `npx serve` se preferir Node.)

## Estrutura

```
index.html              → redireciona para a landing
landing_v2/index.html   → landing principal (3 variações de hero via Tweaks)
subpages/partner.html   → página Parceiros (2 variações de hero)
subpages/cashback.html  → página Cashback (2 variações de hero)
colors_and_type.css     → tokens da marca (cores, tipografia, sombras, raios)
styles.css              → atalho global (só faz @import do colors_and_type.css)
assets/                 → logos, screenshots da plataforma, logos de emissoras/clientes
```

Cada página tem seu próprio `styles.css` (`landing_v2/styles.css`, `subpages/styles.css`).

> Os arquivos `preview/`, `SKILL.md`, `README.md` e os que começam com `_ds_`/`_adherence`
> fazem parte do **design system** (referência da marca) e **não são necessários** para
> rodar o site — pode ignorá-los ou removê-los.

## Marca (rebrand 2026)

- Vermelho `#9B191A` · Grafite `#1E1E1E` · Off-white `#F4F2F2`
- Tipografia: **Baloo 2** (títulos) + **Plus Jakarta Sans** (corpo) — via Google Fonts
- Logo: `assets/logo_ummix_branca.png` (fundo escuro) e `assets/logo_ummix_escura.png` (fundo claro)

## ⚠️ Pendências para finalizar (placeholders deixados no código)

1. **Links dos formulários externos**
   - `subpages/Partner.jsx` → constante `PARTNER_FORM_URL` (hoje `'#'`)
   - `subpages/Cashback.jsx` → constante `CASHBACK_FORM_URL` (hoje `'#'`)
   Cole o link do Google Forms / Typeform.

2. **Texto oficial do processo de parceria**
   - `subpages/Partner.jsx` → array `PROCESS` (textos provisórios, com aviso visual na página).

3. **Logos reais das agências parceiras**
   - `subpages/Partner.jsx` → array `PARTNERS` (hoje monogramas + dados de exemplo).
   - Troque o monograma por `<img>` quando tiver os arquivos.

4. **Nome da plataforma de cashback**
   - `subpages/Cashback.jsx` → constante `CASHBACK_PLATFORM` (hoje `'Live'`).

5. **CTAs da plataforma** já apontam para `https://ummix.workingtech.com.br/`
   (constante `PLATFORM_URL` em `landing_v2/Header.jsx` e `subpages/Chrome.jsx`).

## Tweaks (variações de hero)

As variações de hero são controladas por uma constante `TWEAK_DEFAULTS` no topo do
`<script>` de cada `*.html`. Para fixar uma variação como padrão, troque o valor de
`"hero"` (`"a"`, `"b"` ou `"c"` na landing; `"a"`/`"b"` nas subpages).

---
© Ummix Ads

# SPEC — Site Ummix bilíngue PT/EN

## Objetivo

Entregar versões equivalentes em português e inglês para a página principal, a página de cashback e a página de partners, com um seletor de idioma compartilhado e URLs estáveis para indexação.

## Escopo da primeira entrega

- Português: `/`, `/cashback.html` e `/partner.html`.
- Inglês: `/en/`, `/en/cashback.html` e `/en/partner.html`.
- Seletor persistente `PT | EN` no header desktop e dentro do menu mobile.
- Troca de idioma preservando a página equivalente.
- Conteúdo, labels de navegação, CTAs, formulários, mensagens de sucesso/erro e textos de acessibilidade traduzidos nas três páginas.
- `html[lang]`, title, description, canonical, Open Graph e `hreflang` coerentes com cada versão.

## Decisões de UX/UI

O seletor fica no header, junto da navegação e antes do CTA da plataforma. É um controle segmentado compacto, com `PT` e `EN` visíveis — sem bandeiras, porque o idioma é a decisão relevante e bandeiras podem sugerir países em vez de idioma. O item ativo tem fundo vermelho Ummix e o outro permanece claramente acionável. No mobile, o mesmo controle aparece no painel expandido do menu, com área de toque mínima de 44px e nome acessível.

## Decisões técnicas

- O site continua multi-page Vite; não será convertido para SPA nesta etapa.
- O conteúdo é selecionado pelo `LocaleProvider`, compartilhado pelas três entradas React.
- A URL é a fonte de verdade para páginas em inglês. A escolha manual é persistida em `localStorage` (`ummix-locale`) para próximas visitas.
- O default sem escolha explícita é: `pt` quando o navegador informa `pt-BR`; `en` nos demais casos.
- As URLs PT legadas (`/cashback` e `/partner`) são explícitas e sempre preservam PT; a preferência geográfica/navegador orienta a entrada neutra (`/`) e os links do header levam o visitante à variante equivalente.
- O código aceita `window.__UMMIX_COUNTRY__` injetado pelo CDN/edge (`BR` → português; qualquer país válido fora do Brasil → inglês). Isso prepara a regra “Brasil por IP / fora do Brasil” sem adicionar uma chamada de geolocalização de terceiro ao frontend.
- A injeção real do país no CDN permanece uma tarefa de deploy, porque o repositório atual não contém configuração de edge ou endpoint de geolocalização.

## Não escopo

- Tradução de `/investidores`, artefatos legados em `subpages/` e da aplicação `app.ummix.com.br`.
- Redirecionamento automático agressivo que sobrescreva uma URL explícita ou a escolha manual do usuário.
- Dependência de API pública de IP no carregamento do site.

## Critérios de aceite

1. Cada URL PT e EN renderiza sua página correspondente sem depender de JavaScript de roteamento.
2. A navegação entre Home, Cashback e Partners permanece dentro do mesmo idioma.
3. O seletor funciona por teclado, tem foco visível, `aria-label`/estado compreensível e não é cortado em mobile.
4. A troca mantém a página equivalente, atualiza `lang` e persiste a escolha.
5. Não há texto em português visível nas versões inglesas das três páginas, incluindo header, footer, formulários e mensagens de estado.
6. A página não troca idioma quando o usuário acessa diretamente uma URL localizada ou já escolheu um idioma.
7. O build multi-page conclui sem erro e gera os três documentos ingleses.
8. A integração do país do edge fica documentada e pode ser verificada por `window.__UMMIX_COUNTRY__` sem expor dados sensíveis.

## Plano de verificação

- `npm.cmd run build`.
- `git diff --check`.
- Conferir os artefatos `dist/index.html`, `dist/cashback.html`, `dist/partner.html`, `dist/en/index.html`, `dist/en/cashback.html` e `dist/en/partner.html`.
- Testar seletor, links equivalentes e menu mobile em viewport estreito.
- Testar fallback com `navigator.language = pt-BR`, idioma não português e `window.__UMMIX_COUNTRY__ = 'BR'`/`'US'`.

## Pendência de deploy

Para cumprir literalmente o default por origem do Brasil no ambiente publicado, o host/CDN precisa injetar o país antes do bundle ou fazer o redirect inicial no edge. Até essa integração, o fallback de navegador é determinístico e o usuário sempre pode escolher manualmente.

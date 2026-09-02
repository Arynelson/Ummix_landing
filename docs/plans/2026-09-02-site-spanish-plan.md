# Plano de implementação — versão espanhola do site Ummix

Status: implementação local concluída; revisão nativa e publicação pendentes  
Data: 2026-09-02  
Escopo desta etapa: implementação da experiência espanhola e QA local

## Goal

Adicionar o espanhol como terceiro idioma do site público da Ummix, com a rota principal definida em:

    https://www.ummix.com.br/es/

O plano cobre o seletor de idioma, conteúdo, páginas públicas, roteamento, SEO, formulários, detecção regional, acessibilidade, QA funcional e responsividade.

## Implementation status

- Implementadas as rotas `/es/`, `/es/cashback`, `/es/partner`, `/es/monetize` e `/es/investidores`.
- Adicionado o espanhol ao seletor, com rótulos localizados e preservação da página atual.
- Incluída a tradução da página de investidores em espanhol e o entrypoint equivalente em inglês.
- Atualizados metadata, canonical, hreflang, JSON-LD, sitemap e rewrites Apache.
- Mantido o contrato de formulários e corrigido o idioma enviado nos eventos de contato para `es`.
- Adicionado `scripts/verify-spanish-routes.mjs` para validar chaves, rotas e metadata.
- QA local: build de produção aprovado; verificação de rotas aprovada; cinco páginas espanholas testadas em 25 combinações de viewport sem overflow horizontal.
- Pendências de release: revisão nativa do espanhol, validação em homologação/Locaweb e publicação.

Critério central: uma URL com prefixo explícito deve determinar o idioma. Portanto, páginas em /es/ devem permanecer em espanhol independentemente de localStorage, idioma do navegador ou parâmetro legado lang.

## Architecture

- O site continua como uma aplicação React/Vite com múltiplos entrypoints HTML.
- O prefixo de URL será a fonte de verdade para idiomas com URL dedicada:
  - Português: sem prefixo, por exemplo /cashback.
  - Inglês: /en/, /en/cashback.
  - Espanhol: /es/, /es/cashback.
- LocaleProvider continuará centralizando a resolução do idioma e a persistência da escolha do usuário.
- Os textos continuarão separados do JSX nos módulos de copy existentes.
- O seletor preservará a página atual ao trocar o idioma.
- O Apache/Locaweb continuará fazendo rewrite de URLs limpas para os HTML gerados pelo Vite.
- Cada versão indexável terá canonical e hreflang recíprocos.

## Tech Stack

React, Vite, JavaScript/JSX, HTML estático de entrada, Apache .htaccess, sitemap XML e QA via navegador em múltiplos viewports.

## Estimated Time

- Engenharia de roteamento, conteúdo, HTML, SEO e QA automatizável: aproximadamente 22 tarefas pequenas, 2–3 horas.
- Tradução e revisão nativa do espanhol para cinco páginas, incluindo mensagens de formulário: 2–4 horas adicionais.
- Homologação visual e revisão de conteúdo: 1–2 horas.

Essa estimativa não inclui publicação em produção, configuração de CDN/cache ou uma revisão jurídica das alegações comerciais.

## Prerequisites and decisions

1. Trabalhar em uma branch própria, sem apagar ou reverter as alterações PT/EN que já existem no worktree.
2. Usar o código de locale es e o código BCP-47 es.
3. Manter a regra regional já estabelecida: Brasil abre em português e acessos fora do Brasil abrem em inglês.
4. Não transformar automaticamente países hispanofalantes em espanhol nesta entrega. O espanhol ficará disponível por /es/ e pelo seletor. Uma mudança da regra regional exige uma decisão de produto separada, pois altera o comportamento anteriormente definido para acessos fora do Brasil.
5. Incluir inicialmente todas as páginas HTML públicas atuais:
   - /es/
   - /es/cashback
   - /es/partner
   - /es/monetize
   - /es/investidores
6. A inclusão de /es/investidores é uma recomendação: investidores.html é uma página pública existente, embora não esteja no mesmo fluxo bilíngue atual. Se a intenção for limitar o primeiro release às páginas já traduzidas para inglês, esse item pode ser movido para uma segunda fase sem alterar a arquitetura.
7. Excluir do release público os previews em subpages/, arquivos HTML antigos e a aplicação app.ummix.com.br. Eles devem apenas ser auditados para evitar que sejam confundidos com rotas de produção.
8. Usar espanhol internacional/neutro, sem adaptar valores, percentuais, claims ou regras comerciais sem aprovação da Ummix.
9. Manter nomes próprios e marcas, como Ummix, Ummix Ads, FINEP e nomes de parceiros, sem tradução.

## Language selector decision

O seletor deve usar rótulos localizados para evitar o problema já identificado na versão inglesa: o inglês não deve exibir o rótulo nativo Português.

| Página atual | Rótulo PT | Rótulo EN | Rótulo ES |
| --- | --- | --- | --- |
| Português | Português | Inglês | Espanhol |
| English | Portuguese | English | Spanish |
| Español | Portugués | Inglés | Español |

Comportamento visual e de acessibilidade:

- Ordem fixa: PT, EN, ES.
- No desktop, manter o componente compacto já existente.
- No mobile, manter o seletor dentro do menu, com área de toque mínima de 44 por 44 px.
- Marcar a opção atual com aria-current="page" e estado visual evidente.
- Usar aria-label e title traduzidos, por exemplo “Mudar para espanhol”, “Switch to Spanish” e “Cambiar a español”.
- O código curto continuará sendo PT, EN e ES no modo compacto.
- O idioma do elemento html deve acompanhar o locale: pt-BR, en ou es.

## Inventory of pages and translation surfaces

### Home — /es/

Arquivo de copy: src/home-copy.js

Traduzir e revisar todos os campos do objeto HOME_COPY.es, sem deixar strings fixas no JSX:

- Hero, CTA e texto de apoio.
- ClientView.
- Segmentations.
- Backstage.
- Method.
- Eliminates.
- Deliverables.
- ForWhom.
- CashbackSection.
- Contact.
- Partners.
- Labels compartilhados de Header e Footer.

### Cashback — /es/cashback

Arquivo de copy: src/cashback-copy.js

Traduzir integralmente:

- eyebrow, heroTitle, heroAccent e heroDescription.
- Títulos e textos de como funciona.
- Elegibilidade, participantes, cálculo e regras.
- Steps, highlights, split e CTA.
- Botões, textos de navegação e acessibilidade.
- Qualquer mensagem de erro, sucesso ou estado vazio que apareça na página.

O percentual, a mecânica e os critérios de cashback devem permanecer semanticamente idênticos ao PT/EN. Não traduzir cashback como reembolso se isso mudar o significado comercial.

### Partners — /es/partner

Arquivo de copy: src/partner-copy.js

Traduzir integralmente:

- Hero, CTAs e caminhos de parceria.
- KPIs, processo, benefícios e diretório.
- Rótulos de contato, fallback e estados de ausência de dados.
- Título, descrição, campos, placeholders e consentimento do formulário.
- Mensagens de erro, envio, sucesso e assunto interno do formulário.

Manter nomes de parceiros e dados enviados ao backend exatamente nos identificadores atuais. Traduzir apenas o texto visível e o assunto destinado ao fluxo de contato, se esse assunto for exibido ou enviado como conteúdo.

### Monetize — /es/monetize

Arquivo de copy: src/monetize-copy.js

Traduzir integralmente:

- Hero, nota, CTA e descrição do visual.
- Rótulos de status, rota, conteúdo, horário, formato, audiência e anúncio.
- Proposta, bullets, processo e prova.
- Steps, princípios e mensagens de expansão.
- Formulário, etapas, privacidade, consentimento, validações, estados e sucesso.
- Placeholders, tipos de veículo, tipos de streaming, estados, opções de custo e respostas yes/no.

Os nomes/UFs dos estados brasileiros e campos técnicos do formulário devem continuar identificáveis. Confirmar com produto se as opções de veículo e streaming precisam de adaptação regional ou apenas de tradução.

### Quem somos / Investidores — /es/investidores

Arquivo recomendado: src/pages/investidores/investidores-copy.js

InvestidoresPage.jsx hoje é um caso separado do fluxo de copy. O trabalho deve:

1. Inventariar todos os textos visíveis, metadata, alt texts e labels fixos.
2. Extrair esses textos para uma estrutura PT/EN/ES, em vez de adicionar condicionais espalhadas pelo JSX.
3. Conectar a página ao LocaleProvider existente.
4. Preservar imagens, links, nomes próprios e claims.
5. Criar a entrada HTML espanhola e os links hreflang.

Se a página não estiver aprovada para o lançamento espanhol, registrar explicitamente no changelog e removê-la do sitemap e da matriz de aceite; não deixá-la parcialmente traduzida.

### Shared shell

Arquivos principais:

- src/LocaleProvider.jsx
- src/i18n-labels.js
- src/components/Header.jsx
- src/components/Footer.jsx
- src/components/Partners.jsx
- App e componentes compartilhados que ainda contenham strings estáticas

Fazer uma busca final por texto português dentro dos componentes que são importados pelas páginas públicas. A busca deve distinguir texto de produção de comentários, nomes próprios e arquivos legados não utilizados.

## Execution plan

Cada tarefa abaixo é intencionalmente pequena. A execução deve parar e registrar o resultado de cada checkpoint antes da próxima fase.

### Fase 0 — baseline e preparação

#### T01 — Registrar o estado inicial do worktree

Arquivos: nenhum.

Ação:

1. Criar branch de trabalho com prefixo codex/, por exemplo codex/site-spanish.
2. Registrar o status e não alterar arquivos que já estejam modificados.

Verificação:

    git status --short --branch

Saída esperada: a branch nova aparece e as alterações PT/EN existentes continuam listadas; nenhum arquivo existente é revertido.

Commit: não fazer commit nesta tarefa.

#### T02 — Confirmar inventário de entradas públicas

Arquivos de referência:

- index.html
- cashback.html
- partner.html
- monetize.html
- investidores.html
- vite.config.js
- public/.htaccess
- public/sitemap.xml

Ação:

1. Confirmar quais desses HTML são gerados/publicados.
2. Confirmar se investidores.html entra no primeiro release.
3. Registrar qualquer divergência no próprio plano antes de implementar.

Verificação:

    rg --files -g "*.html" -g "vite.config.js" -g ".htaccess" -g "sitemap.xml"

Saída esperada: os arquivos de produção são distinguidos dos previews e artefatos legados.

Commit: não fazer commit; esta é uma decisão de escopo.

#### T03 — Fechar glossário de tradução

Arquivo de documentação: docs/plans/2026-09-02-site-spanish-plan.md

Ação:

1. Definir espanhol internacional.
2. Listar termos que não podem mudar de sentido: cashback, mídia, audiência, parceiros, alcance, campanha, streaming, consentimento e claims de performance.
3. Marcar nomes próprios e percentuais como invariáveis.
4. Solicitar revisão de uma pessoa fluente antes do deploy.

Verificação: não há comando; o resultado é a aprovação do glossário.

Commit: incluir o glossário no mesmo checkpoint documental ou deixá-lo na tarefa de copy; não criar alteração de código nesta tarefa.

### Fase 1 — modelo de locale e seletor

#### T04 — Adicionar es ao catálogo de locales

Arquivo: src/LocaleProvider.jsx

Ação:

Adicionar a entrada:

    es: { code: 'es', label: 'Español', shortLabel: 'ES' }

Atualizar normalizeLocale para aceitar es. Não substituir o fallback atual de pt/en.

Verificação:

    rg -n "LOCALES|normalizeLocale|shortLabel" src/LocaleProvider.jsx

Saída esperada: pt, en e es são aceitos; valores desconhecidos continuam caindo no fallback seguro.

Commit: checkpoint sugerido “feat(i18n): add Spanish locale model”.

#### T05 — Implementar precedência correta das URLs

Arquivo: src/LocaleProvider.jsx

Ação:

1. Fazer localeFromPath reconhecer /en e /es com ou sem barra final.
2. Fazer a resolução reconhecer versões clean e .html das páginas PT explícitas.
3. Manter a precedência:
   - prefixo /en/ ou /es/ explícito;
   - rota PT explícita;
   - query lang quando aplicável;
   - localStorage;
   - país injetado;
   - idioma do navegador.
4. Manter /cashback.html?lang=en em português, preservando a correção anterior.
5. Fazer /es/cashback?lang=en permanecer em espanhol.

Implementação de referência para a remoção do prefixo:

    const withoutLocalePrefix =
      pathname.replace(/^\/(?:en|es)(?=\/|$)/, '') || '/'

    if (normalizedLocale === 'pt') return withoutLocalePrefix
    return withoutLocalePrefix === '/'
      ? '/' + normalizedLocale + '/'
      : '/' + normalizedLocale + withoutLocalePrefix

Verificação manual mínima:

    /          -> pt
    /en/       -> en
    /es/       -> es
    /cashback.html?lang=en -> pt
    /es/cashback?lang=en   -> es

Commit: incluído no checkpoint de T04 se a resolução estiver completa; caso contrário, “fix(i18n): prioritize explicit locale paths”.

#### T06 — Adicionar rótulos localizados do seletor

Arquivo: src/i18n-labels.js

Ação:

1. Adicionar es ao objeto de labels.
2. Adicionar languageOptions.es nos três idiomas.
3. Adicionar switchToSpanish e equivalentes que faltarem.
4. Garantir que EN use Portuguese, English e Spanish; não usar Português como rótulo nativo na interface inglesa.

Estrutura esperada:

    pt.languageOptions = {
      pt: 'Português',
      en: 'Inglês',
      es: 'Espanhol'
    }

    en.languageOptions = {
      pt: 'Portuguese',
      en: 'English',
      es: 'Spanish'
    }

    es.languageOptions = {
      pt: 'Portugués',
      en: 'Inglés',
      es: 'Español'
    }

Verificação:

    rg -n "languageOptions|switchToSpanish|Portuguese|Spanish|Portugués" src/i18n-labels.js

Saída esperada: os três objetos possuem a mesma forma de chaves.

Commit: “feat(i18n): localize Spanish language selector labels”.

#### T07 — Expandir o Header sem alterar o layout aprovado

Arquivo: src/components/Header.jsx

Ação:

1. Trocar a lista fixa pt/en por pt/en/es.
2. Usar getLocalizedPath para preservar o pathname equivalente.
3. Aplicar lang="es" ao link espanhol.
4. Usar label e aria-label vindos de i18n-labels.
5. Preservar aria-current, foco, área de toque e o comportamento do menu mobile.
6. Verificar que navegação principal e seletor não misturam textos do idioma anterior.

Verificação:

    rg -n "['\"]pt['\"].*['\"]en['\"]|languageOptions|getLocalizedPath|aria-current" src/components/Header.jsx

Saída esperada: uma única fonte de opções com três idiomas e nenhum texto fixo de idioma fora do catálogo.

Commit: “feat(header): add Spanish language option”.

#### T08 — Atualizar o idioma do documento e metadados em runtime

Arquivos:

- src/LocaleProvider.jsx
- src/main.jsx
- src/pages/cashback/main.jsx
- src/pages/partner/main.jsx
- src/pages/monetize-main.jsx
- src/pages/investidores/main.jsx

Ação:

Confirmar que document.documentElement.lang é atualizado para pt-BR, en ou es quando o locale muda. Não duplicar efeitos em cada página; centralizar a responsabilidade no provider ou em uma função compartilhada.

Verificação no navegador:

    document.documentElement.lang

Saída esperada: es em todas as rotas /es/.

Commit: “fix(i18n): keep document language in sync”.

### Fase 2 — conteúdo espanhol

#### T09 — Adicionar HOME_COPY.es

Arquivo: src/home-copy.js

Ação:

Adicionar um objeto es com exatamente o mesmo conjunto de chaves de pt e en. Traduzir todos os blocos da home e revisar CTA, headings, alt texts e textos de apoio.

Verificação:

    rg -n "HOME_COPY|pt:|en:|es:" src/home-copy.js

Saída esperada: HOME_COPY.es possui todas as chaves consumidas pelos componentes home.

Commit: “feat(copy): add Spanish home content”.

#### T10 — Adicionar CASHBACK_COPY.es

Arquivo: src/cashback-copy.js

Ação:

Adicionar todas as chaves es com a mesma forma de pt/en. Revisar especialmente regras, elegibilidade, números, CTA e mensagens de estado.

Verificação: comparar a lista de chaves de CASHBACK_COPY.pt, CASHBACK_COPY.en e CASHBACK_COPY.es.

Saída esperada: nenhum campo usado por CashbackPage fica undefined em es.

Commit: “feat(copy): add Spanish cashback content”.

#### T11 — Adicionar PARTNER_COPY.es

Arquivo: src/partner-copy.js

Ação:

Adicionar todas as chaves es, incluindo diretório, fallback, formulário, validações, sucesso e assunto. Não traduzir identificadores de campos, endpoints, nomes de propriedades ou nomes próprios.

Verificação: abrir /es/partner e percorrer o formulário sem submeter dados reais.

Saída esperada: todos os estados visíveis ficam em espanhol.

Commit: “feat(copy): add Spanish partner content”.

#### T12 — Adicionar MONETIZE_COPY.es

Arquivo: src/monetize-copy.js

Ação:

Adicionar todas as chaves es, inclusive listas de opções e mensagens do formulário. Preservar o sentido das opções brasileiras e os valores técnicos.

Verificação: abrir /es/monetize e percorrer todos os campos, incluindo validação de obrigatório, consentimento e estado de sucesso simulado.

Saída esperada: nenhuma string de interface fica em português ou inglês por falta de tradução.

Commit: “feat(copy): add Spanish monetize content”.

#### T13 — Extrair e traduzir InvestidoresPage

Arquivos:

- src/pages/investidores/InvestidoresPage.jsx
- src/pages/investidores/investidores-copy.js
- src/pages/investidores/main.jsx

Ação:

1. Extrair as strings atualmente fixas.
2. Criar pt, en e es com a mesma estrutura.
3. Consumir o copy via useLocale.
4. Traduzir alt texts e labels acessíveis.
5. Confirmar links externos, imagens e claims.

Verificação:

    rg -n "[À-ÿ]|Portugu|Parceir|Quem Somos" src/pages/investidores

Saída esperada: apenas nomes próprios, URLs ou conteúdo explicitamente preservado permanecem fora do copy.

Commit: “feat(copy): localize investors page”.

#### T14 — Fazer auditoria de strings compartilhadas

Arquivos:

- src/App.jsx
- src/components/*.jsx
- src/components/home/*.jsx
- src/pages/cashback/*.jsx
- src/pages/partner/*.jsx
- src/pages/MonetizePage.jsx

Ação:

Procurar strings visíveis hardcoded e decidir para cada ocorrência: mover para copy, preservar como nome próprio ou excluir por ser componente legado não importado.

Verificação:

    rg -n "[À-ÿ]|Português|English|Cashback|Partners|Monetize" src

Saída esperada: nenhum texto de produção fica dependente do idioma do arquivo fonte.

Commit: “refactor(i18n): remove remaining hardcoded UI strings”.

### Fase 3 — HTML, MPA e URLs públicas

#### T15 — Criar entrada HTML da home espanhola

Arquivo novo: es/index.html

Ação:

Copiar a estrutura de index.html e ajustar:

    <html lang="es">
    <title>...</title>
    <meta name="description" content="...">
    <link rel="canonical" href="https://www.ummix.com.br/es/">
    <link rel="alternate" hreflang="pt-BR" href="https://www.ummix.com.br/">
    <link rel="alternate" hreflang="en" href="https://www.ummix.com.br/en/">
    <link rel="alternate" hreflang="es" href="https://www.ummix.com.br/es/">
    <link rel="alternate" hreflang="x-default" href="https://www.ummix.com.br/">

Preservar o module script para /src/main.jsx e atualizar OG/Twitter para espanhol.

Verificação: validar que o HTML não aponta para /en/ nem usa lang incorreto.

Commit: “feat(routes): add Spanish home entrypoint”.

#### T16 — Criar entrada HTML de cashback

Arquivo novo: es/cashback.html

Ação:

Copiar cashback.html, manter /src/pages/cashback/main.jsx, definir lang es, canonical /es/cashback e alternates PT/EN/ES da mesma página.

Verificação: confirmar title, description, og:locale, canonical e script.

Commit: “feat(routes): add Spanish cashback entrypoint”.

#### T17 — Criar entrada HTML de partners

Arquivo novo: es/partner.html

Ação:

Copiar partner.html, manter /src/pages/partner/main.jsx e ajustar metadata, canonical e hreflang para /es/partner.

Verificação: a entrada carrega PartnerPage, não CashbackPage.

Commit: “feat(routes): add Spanish partner entrypoint”.

#### T18 — Criar entrada HTML de monetize

Arquivo novo: es/monetize.html

Ação:

Copiar monetize.html, manter /src/pages/monetize-main.jsx e ajustar metadata, canonical e hreflang para /es/monetize.

Verificação: a entrada carrega MonetizePage, não a home.

Commit: “feat(routes): add Spanish monetize entrypoint”.

#### T19 — Criar entrada HTML de investidores

Arquivo novo: es/investidores.html

Ação:

Copiar investidores.html, manter /src/pages/investidores/main.jsx e ajustar metadata, canonical e hreflang para /es/investidores.

Verificação: somente criar e publicar este arquivo se T02 confirmar a inclusão da página no release.

Commit: “feat(routes): add Spanish investors entrypoint”.

#### T20 — Registrar as entradas no Vite

Arquivo: vite.config.js

Ação:

Adicionar inputs MPA:

    spanish: resolve(__dirname, 'es/index.html'),
    spanishCashback: resolve(__dirname, 'es/cashback.html'),
    spanishPartner: resolve(__dirname, 'es/partner.html'),
    spanishMonetize: resolve(__dirname, 'es/monetize.html'),
    spanishInvestors: resolve(__dirname, 'es/investidores.html'),

Adicionar spanishInvestors somente se a página for aprovada em T02. Manter todos os inputs atuais.

Verificação:

    npm.cmd run build -- --outDir .tmp-dist-es

Saída esperada: build concluído sem erro e os cinco HTML espanhóis aparecem no diretório de saída correspondente.

Commit: “build(vite): include Spanish MPA entrypoints”.

#### T21 — Adicionar rewrites limpos

Arquivo: public/.htaccess

Ação:

Adicionar antes do fallback final:

    RewriteRule ^es/?$ /es/index.html [L]
    RewriteRule ^es/cashback/?$ /es/cashback.html [L]
    RewriteRule ^es/partner/?$ /es/partner.html [L]
    RewriteRule ^es/monetize/?$ /es/monetize.html [L]
    RewriteRule ^es/investidores/?$ /es/investidores.html [L]

Preservar as regras de assets e as regras PT/EN. Não colocar o rewrite espanhol depois da regra SPA genérica.

Verificação: testar URLs com e sem barra final; confirmar que /es/assets/... não cai no HTML.

Commit: “fix(hosting): route Spanish clean URLs”.

#### T22 — Atualizar sitemap e hreflang recíproco

Arquivos:

- public/sitemap.xml
- index.html
- cashback.html
- partner.html
- monetize.html
- investidores.html, se indexável
- es/*.html

Ação:

1. Adicionar /es/, /es/cashback, /es/partner, /es/monetize e /es/investidores quando aplicável ao sitemap.
2. Adicionar hreflang es às páginas PT e EN equivalentes.
3. Conferir que as páginas ES apontam de volta para PT e EN.
4. Manter x-default na URL pública principal escolhida, sem apontar para uma query lang.
5. Usar og:locale es_ES nas páginas espanholas.

Verificação:

    rg -n "hreflang|sitemap|/es/" index.html cashback.html partner.html monetize.html investidores.html public/sitemap.xml es

Saída esperada: cada página indexável tem um conjunto recíproco PT/EN/ES; não há URL ES órfã.

Commit: “seo(site): publish Spanish alternates and sitemap URLs”.

### Fase 4 — integração de comportamento

#### T23 — Preservar a página atual no seletor

Arquivos:

- src/LocaleProvider.jsx
- src/components/Header.jsx
- src/components/Footer.jsx

Ação:

Testar e corrigir o mapeamento equivalente:

    /       <-> /en/       <-> /es/
    /cashback <-> /en/cashback <-> /es/cashback
    /partner  <-> /en/partner  <-> /es/partner
    /monetize <-> /en/monetize <-> /es/monetize
    /investidores <-> /en/investidores <-> /es/investidores

Incluir versões .html no teste de compatibilidade, sem alterar canonical clean.

Verificação: clicar nos três idiomas em cada página e confirmar URL, copy e página equivalente.

Commit: “fix(i18n): preserve page path across locales”.

#### T24 — Validar formulários em espanhol sem envio real

Arquivos:

- src/pages/partner/PartnerPage.jsx
- src/pages/MonetizePage.jsx
- src/partner-copy.js
- src/monetize-copy.js

Ação:

1. Testar campos obrigatórios e mensagens de validação.
2. Conferir consentimento e texto de privacidade.
3. Conferir estado submitting e sucesso simulado.
4. Confirmar que o endpoint, nomes dos campos e destinatários internos não foram alterados.
5. Confirmar que o assunto e o conteúdo visível usam espanhol quando aplicável.

Verificação: submeter somente com dados de teste e interromper antes do envio real, ou usar mock aprovado.

Saída esperada: UX pública em espanhol, contrato técnico de envio preservado.

Commit: “test(forms): validate Spanish form states”.

### Fase 5 — QA e release gate

#### T25 — Criar matriz automatizável de rotas e locale

Arquivo recomendado: scripts/verify-spanish-routes.mjs

Ação:

Criar uma verificação pequena que confirme:

- os HTML espanhóis existem;
- cada HTML tem lang es;
- cada HTML tem canonical /es/ correspondente;
- cada HTML referencia o entrypoint correto;
- todas as páginas possuem hreflang PT/EN/ES;
- o catálogo de copy es tem as mesmas chaves dos catálogos base;
- não há locale es ausente em LOCALES ou i18n-labels.

Verificação:

    node scripts/verify-spanish-routes.mjs

Saída esperada: “Spanish route and locale checks passed” e exit code 0. Em caso de divergência, listar arquivo e chave faltante.

Commit: “test(i18n): add Spanish route completeness check”.

#### T26 — Rodar build isolado e checagem de diff

Arquivos de saída temporários: .tmp-dist-es, se necessário.

Ação:

Executar:

    npm.cmd run build -- --outDir .tmp-dist-es
    git diff --check

Saída esperada:

- build Vite concluído;
- todos os entrypoints ES gerados;
- git diff --check sem saída;
- nenhum arquivo PT/EN removido ou alterado fora do escopo.

Após a verificação, remover somente o diretório temporário de build criado para esta tarefa, desde que o caminho esteja confirmado como .tmp-dist-es dentro do workspace.

Commit: checkpoint “chore(qa): validate Spanish production build”.

#### T27 — QA funcional via navegador

Ferramenta: agente de QA do projeto e/ou agent-browser disponível no ambiente.

Rotas:

- /
- /en/
- /es/
- /cashback
- /en/cashback
- /es/cashback
- /partner
- /en/partner
- /es/partner
- /monetize
- /en/monetize
- /es/monetize
- /investidores e equivalentes, se publicados

Casos obrigatórios:

1. Conteúdo visível correto em cada locale.
2. /cashback.html?lang=en continua em português.
3. /es/cashback?lang=en continua em espanhol.
4. Seletor mostra nomes localizados e não exibe Português na interface inglesa.
5. Alternância preserva a página.
6. Header, footer, CTAs, links internos e âncoras funcionam.
7. Nenhum erro de console ou request 4xx/5xx causado pela alteração.
8. document.documentElement.lang está correto.
9. Formulários exibem validações e sucesso no idioma correto.

Comandos de apoio:

    npm.cmd run dev -- --host 127.0.0.1 --port 5173

Saída esperada: todas as rotas carregam localmente e a matriz de casos passa.

Commit: registrar evidências em um relatório de QA antes do commit final; não marcar como aprovado apenas com base no build.

#### T28 — QA responsivo

Viewports mínimos:

- 360 x 800.
- 390 x 844.
- 768 x 1024.
- 1280 x 800.
- 1440 x 900.

Verificar em PT, EN e ES, pelo menos na home, cashback e partner; incluir monetize e investidores se publicados.

Checklist:

1. Nenhum overflow horizontal.
2. Hero não corta texto espanhol nem cria sobreposição.
3. Seletor permanece acessível e não quebra o header.
4. Menu mobile abre, fecha e mantém foco/teclado utilizável.
5. Botões e campos mantêm alvos de toque adequados.
6. Textos longos em espanhol não estouram cards, KPIs, tabelas ou rodapés.
7. Imagens, logos e ícones não deformam.
8. Não há mudança visual regressiva em PT/EN.

Verificação de overflow no navegador:

    document.documentElement.scrollWidth <= window.innerWidth

Saída esperada: true em todos os viewports testados; qualquer exceção deve ter screenshot, rota e viewport registrados.

Commit: “test(ui): validate Spanish responsive layouts”.

#### T29 — Revisão nativa e de claims

Arquivos: todos os módulos de copy es e HTML ES.

Ação:

1. Revisar espanhol com pessoa fluente.
2. Confirmar acentuação, gênero, concordância e consistência terminológica.
3. Confirmar que nenhum claim foi aumentado, reduzido ou reinterpretado.
4. Confirmar que nomes de marcas, parceiros e instituições permanecem corretos.

Saída esperada: aprovação textual registrada como gate de publicação.

Commit: “docs(copy): approve Spanish content review”.

#### T30 — Commit final e checklist de publicação

Arquivos: todos os arquivos da feature.

Ação:

1. Revisar git diff e git status.
2. Confirmar que somente os arquivos previstos estão no commit.
3. Executar build isolado, diff check e QA final.
4. Criar um commit final apenas depois de T27–T29 aprovadas.
5. Publicar primeiro em homologação, validar URLs reais e só então promover para produção.

Comandos:

    git diff --stat
    git diff --check
    git status --short

Commit sugerido, se os checkpoints anteriores não tiverem sido usados:

    git add es src public vite.config.js scripts docs/plans
    git commit -m "feat(site): add Spanish public experience"

Não fazer push, deploy ou alteração de DNS automaticamente sem uma solicitação explícita.

## Definition of done

- /es/ carrega a home completamente em espanhol.
- /es/cashback, /es/partner e /es/monetize carregam seus conteúdos completos em espanhol.
- /es/investidores também está completo, se incluído no release.
- O seletor tem PT, EN e ES, usa rótulos localizados e preserva a página atual.
- A interface inglesa exibe Portuguese, English e Spanish; nunca exibe Português como rótulo nativo.
- Rotas explícitas vencem query, localStorage e detecção regional.
- Brasil continua com padrão PT; fora do Brasil continua com padrão EN.
- HTML, canonical, hreflang, OG e sitemap estão coerentes.
- Formulários preservam o contrato técnico e exibem estados em espanhol.
- Build, diff check, QA funcional e QA responsivo passam.
- Não existem strings PT/EN acidentais nas páginas ES.
- A revisão nativa do espanhol está aprovada.

## Risks and open questions

1. Tradução sem revisão nativa pode produzir espanhol gramaticalmente correto, mas inadequado para venda B2B. Isso é um gate real, não um detalhe cosmético.
2. A página investidores.html está fora do fluxo bilíngue atual. A recomendação é incluí-la para não publicar uma experiência parcialmente traduzida, mas a decisão deve ser confirmada em T02.
3. A regra “fora do Brasil = inglês” entra em conflito com uma futura detecção automática de países hispanofalantes. Nesta fase, /es/ explícito é a decisão mais segura.
4. O build local não comprova publicação, MIME, cache ou rewrite na Locaweb. Depois do deploy, validar status, content-type, HTML servido e carregamento dos assets com cache-busting.
5. Claims comerciais, cashback, regras de elegibilidade e textos de privacidade podem exigir aprovação jurídica/comercial independente da tradução.
6. Conteúdo vindo de APIs ou diretórios de parceiros deve ser classificado como dado próprio e não ser traduzido automaticamente sem regra de governança.

## Release evidence to attach

- Saída de npm.cmd run build -- --outDir .tmp-dist-es.
- Saída de git diff --check.
- Relatório de rotas e chaves de copy.
- Screenshots dos cinco viewports nas rotas críticas.
- Resultado do agente de QA.
- Aprovação da revisão nativa.
- Após homologação: URLs reais, status HTTP, content-type, canonical e assets.

# Banner de cashback na página principal — Design

## Contexto

A landing principal ([src/App.jsx](../../src/App.jsx)) não tem nenhum link para a página `/cashback.html`, que já existe com o programa completo. Precisamos de uma chamada na página principal para que visitantes descubram o programa de cashback.

## Objetivo

Adicionar uma seção banner simples (texto + botão) entre `Features` e `Segmentation`, com uma frase curta sobre o cashback e um link para `/cashback.html`. Não duplica o conteúdo da página de cashback — só desperta interesse e direciona.

## Posição e estilo

- Novo componente `src/components/CashbackBanner.jsx`
- Inserido em `App.jsx` entre `<Features />` e `<Segmentation />`
- `Features` termina com `bg-ummix-dark`; `Segmentation` começa com `bg-white` — o banner usa `bg-ummix-gray` para manter a alternância visual das seções
- Segue o padrão de espaçamento `py-20 md:py-28`, container centralizado `max-w-2xl mx-auto px-6 text-center` (mesma estrutura do `PlatformAccess`)
- Usa o hook `useAnimateOnScroll` para fade-in ao rolar, como as demais seções

## Conteúdo

- Título curto + uma frase de teaser sobre o cashback (sem detalhar regras/percentuais — isso fica na página dedicada)
- Botão único: **"Conhecer o cashback"** → `<a href="/cashback.html">` (link relativo simples, sem `target="_blank"`, já que é uma navegação dentro do mesmo site — build multi-page do Vite, sem client-side router)

## Fora de escopo

- Não duplica a tabela de regras, passos ou percentuais da página `/cashback`
- Não adiciona link de cashback no Header ou Footer (decisão do usuário: só o banner dedicado)

## Texto

Copy será redigido em português e revisado pelo skill `/humanizer` antes da implementação final.

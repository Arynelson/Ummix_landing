# Cashback page: clarify Google Form requirement — Design

## Contexto

A página de cashback ([src/pages/cashback/CashbackPage.jsx](../../src/pages/cashback/CashbackPage.jsx)) menciona o formulário de resgate de forma genérica em alguns pontos, mas:

- A constante `CASHBACK_FORM_URL` ainda é um placeholder (`'#'`)
- Nenhum texto deixa claro que esse mesmo formulário também serve como avaliação de serviço para a Ummix
- O botão final de CTA não comunica isso com clareza

Link real do formulário: `https://docs.google.com/forms/d/e/1FAIpQLSeXwkuDIqiwtV0tCk1tN7LAbXWs9TySbv6h3O66xRXkxnoU3g/viewform`

## Objetivo

Tornar explícito, em pontos já existentes da página, que (a) preencher o formulário é obrigatório para receber o cashback e (b) o formulário também funciona como avaliação do serviço Ummix. Sem adicionar blocos novos — reforça através da estrutura atual.

## Pontos de mudança

1. **`CASHBACK_FORM_URL`** — substituir `'#'` pela URL real do Google Form.

2. **Regra #3 (`WhoIsEligible` → "Regras para receber o cashback")** — reescrever para deixar explícito que a solicitação é feita pelo formulário, e que ele também serve como avaliação do serviço.

3. **Passo 03 "Solicitação" (`HowItWorks`)** — reescrever a descrição para mencionar o formulário explicitamente e sua dupla função (resgate + avaliação). Mantém a posição/ordem atual dos 5 passos.

4. **CTA final (`CTA`)** — trocar o texto do botão de "Preencher formulário de cashback" para **"Solicitar meu cashback"**, e ajustar o parágrafo de apoio acima do botão para comunicar com clareza que o formulário é obrigatório e que também serve como avaliação do serviço.

## Fora de escopo

- Nenhum bloco/seção nova na página
- Nenhuma mudança na ordem dos 5 passos do "Como funciona"
- Nenhuma mudança visual/estrutural fora dos 4 pontos de texto acima

## Processo de texto

Copy será redigido em português e revisado pelo skill `/humanizer` antes da implementação final no código.

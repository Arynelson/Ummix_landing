# Envio dos formulários do site por Brevo

Os formulários de `/`, `/monetize`, `/partner` e `/lp/campanha` enviam JSON para `/api/site-form.php` no mesmo domínio. O PHP valida os dados, mantém os destinatários fixos e usa a API transacional do Brevo. Nenhuma chave é enviada ao navegador.

## Configuração na Locaweb

1. No **Web FTP**, crie `ummix-mail-secrets.php` no mesmo nível de `public_html` (fora dela). O endpoint em `public_html/api/site-form.php` lê `dirname(__DIR__, 2) . '/ummix-mail-secrets.php'`.
2. Conteúdo do arquivo, preenchido diretamente no servidor:

```php
<?php
return [
    'brevo_api_key' => 'SUA_CHAVE_DE_API_BREVO',
    'sender_email' => 'REMETENTE_JA_VERIFICADO_NO_BREVO',
    'sender_name' => 'Ummix Ads',
];
```

Use **chave de API v3**, não a chave SMTP. `sender_email` deve ser o remetente verificado já usado no backend (`EMAIL_SENDER`). Nunca copie a chave para o projeto, `dist`, JavaScript ou conversa.

3. Gere `npm.cmd run build -- --outDir dist-site-mail-brevo` e envie **todo o conteúdo** de `dist-site-mail-brevo/` para `public_html/`, incluindo `api/site-form.php`, os HTMLs e os arquivos `assets/` gerados juntos. Não envie `docs/` nem o arquivo de segredos para `public_html`.
4. Teste uma submissão real em cada formulário. Confirme `POST /api/site-form.php` com HTTP 200 e `{"success":true,"accepted":true}`, depois confira o recebimento no e-mail. O HTTP 200 significa que o Brevo aceitou a mensagem; entrega final deve ser conferida na caixa postal ou nos logs do Brevo.

## Diagnóstico

- HTTP 503 `Serviço de e-mail não configurado.`: arquivo privado ausente, chave vazia ou remetente inválido.
- HTTP 503 `Serviço de e-mail indisponível.`: extensão PHP cURL indisponível.
- HTTP 502: o servidor não alcançou o Brevo ou o Brevo rejeitou a chamada. Confira o log PHP por `[ummix-site-form] brevo_failed status=... curl_errno=...`; não exponha a chave nem os dados do lead.
- HTTP 422: campos obrigatórios ou inválidos.
- HTTP 429: mais de oito tentativas do mesmo IP em dez minutos.

O evento `ummix_lead_submitted` só é disparado no navegador depois da resposta de sucesso do envio pela Brevo. O envio não usa FormSubmit nem o arquivo antigo `/api/pre-registration.php`.

## Pré-cadastro da landing page

Somente o formulário de `/lp/campanha` também chama a API de pré-cadastro, pelo servidor PHP. Os demais formulários continuam enviando apenas e-mail. O endpoint padrão é `https://app.ummix.com.br/api/integrations/pre-registrations`.

No Web FTP, mantenha `ummix-pre-registration-secrets.php` ao lado de `public_html`, fora da pasta pública. Preencha diretamente no servidor:

```php
<?php
return [
    'service_token' => 'SOMENTE_O_VALOR_DO_SEU_TOKEN',
    'api_url' => 'https://app.ummix.com.br/api/integrations/pre-registrations',
];
```

O arquivo é separado de `ummix-mail-secrets.php`; não altere a configuração de e-mail que já funciona. `service_token` contém apenas o token, sem `x-service-token:`. O PHP monta o cabeçalho `X-Service-Token` e não expõe o token no navegador. `api_url` é opcional; para testar em homologação, pode ser `https://ummix.workingtech.com.br/api/integrations/pre-registrations`, com o token daquele ambiente.

| Campo do formulário | Campo enviado à API |
| --- | --- |
| Nome (`name`) | `fullName` |
| E-mail (`email`) | `email` |
| Telefone (`phone`) | `phone`, formatado com DDD |
| Já anunciou: `sim` / `nao` | `advertisedRadioTv`: `true` / `false` |
| Origem definida pelo PHP | `source`: `lp/campanha` |

O PHP confirma a gravação quando a API responde HTTP 200 ou 201, com JSON contendo `id`. A chamada usa verificação TLS, não segue redirecionamentos e tem limite de oito segundos. O cabeçalho CORS da API não controla essa chamada entre servidores.

Se a gravação falhar, o PHP continua enviando pela Brevo. O assunto recebe `[Pré-cadastro pendente]`, e o corpo informa o código de falha, o HTTP da API e o `x-request-id` quando disponível. Os dados do lead continuam no e-mail. A confirmação ao visitante e o evento GTM continuam dependendo do aceite pela Brevo; não há repetição automática do envio.

No Network, um envio aceito pode retornar `preRegistrationSaved: true` e `preRegistrationId`, ou `preRegistrationSaved: false` e `preRegistrationCode`. Confira o registro na plataforma e o recebimento do e-mail para validar o fluxo completo. Os logs PHP usam `[ummix-site-form] pre_registration_failed`, sem token, corpo da API ou dados pessoais.

Para publicar somente esta integração, substitua `public_html/api/site-form.php` pela cópia atualizada em `dist-site-mail-brevo/api/site-form.php`; não é necessário alterar HTML, JavaScript ou backend. Se também for publicar o botão de WhatsApp da landing, envie o build completo conforme as instruções anteriores.

## Validação local da integração

Execute `node scripts/verify-site-form.mjs CAMINHO_DO_PHP_CLI`. O script inicia uma cópia temporária do PHP real, substituindo apenas as chamadas cURL por respostas simuladas. Os arquivos privados usam valores fictícios; nenhuma mensagem ou registro real é enviado. O teste cobre onze cenários: criação, resposta de registro existente, resposta qualificadora "não" e telefone de dez dígitos, API 401, timeout, resposta inválida, token ausente, falha da Brevo, formulário de contato, honeypot e telefone inválido. Também verifica que o token não aparece na resposta ao navegador nem nos logs PHP.

Esses testes validam o contrato e as regras do PHP. Depois do upload, confirme um envio real na Locaweb, `preRegistrationSaved: true`, o ID retornado pela API e a chegada do e-mail para verificar a comunicação entre os servidores.

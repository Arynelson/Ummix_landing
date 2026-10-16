<?php
declare(strict_types=1);

// Same-origin endpoint for the four public forms. The Brevo key is loaded only on the server.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function siteFormRespond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function siteFormText(mixed $value, int $maxLength): ?string
{
    if (!is_string($value)) return null;
    $text = trim($value);
    if (strlen($text) > $maxLength || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $text)) return null;
    return $text;
}

function siteFormRateLimited(): ?bool
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $path = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'ummix-site-form-' . hash('sha256', $ip) . '.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false) return null;
    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return null;
    }
    $stored = stream_get_contents($handle);
    $timestamps = json_decode($stored ?: '[]', true);
    if (!is_array($timestamps)) $timestamps = [];
    $now = time();
    $timestamps = array_values(array_filter($timestamps, static fn ($value): bool => is_int($value) && $value > $now - 600));
    $limited = count($timestamps) >= 8;
    if (!$limited) $timestamps[] = $now;
    $json = json_encode($timestamps);
    rewind($handle);
    ftruncate($handle, 0);
    $written = is_string($json) ? fwrite($handle, $json) : false;
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    return $written === false || $written !== strlen($json) ? null : $limited;
}

function siteFormPreRegister(array $values): array
{
    $fail = static function (string $code, int $status = 0, int $curlError = 0, string $requestId = ''): array {
        error_log('[ummix-site-form] pre_registration_failed code=' . $code . ' status=' . $status
            . ' curl_errno=' . $curlError . ' request_id=' . $requestId);
        return ['saved' => false, 'code' => $code, 'http_status' => $status, 'request_id' => $requestId];
    };

    try {
        $secretPath = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'ummix-pre-registration-secrets.php';
        if (!is_file($secretPath)) return $fail('pre_registration_secrets_missing');
        $config = require $secretPath;
        $token = is_array($config) ? trim((string) ($config['service_token'] ?? '')) : '';
        if ($token === '' || preg_match('/[\r\n]/', $token) || str_starts_with(strtolower($token), 'x-service-token:')) {
            return $fail('pre_registration_token_invalid');
        }
        $apiUrl = is_array($config)
            ? (string) ($config['api_url'] ?? 'https://app.ummix.com.br/api/integrations/pre-registrations')
            : '';
        if (!in_array($apiUrl, [
            'https://app.ummix.com.br/api/integrations/pre-registrations',
            'https://ummix.workingtech.com.br/api/integrations/pre-registrations',
        ], true)) return $fail('pre_registration_url_invalid');

        $digits = preg_replace('/\D/', '', $values['phone']);
        $phone = '(' . substr($digits, 0, 2) . ') '
            . substr($digits, 2, strlen($digits) - 6) . '-' . substr($digits, -4);
        $encoded = json_encode([
            'fullName' => trim(preg_replace('/\s+/u', ' ', $values['name']) ?? ''),
            'email' => $values['email'],
            'phone' => $phone,
            'advertisedRadioTv' => $values['already_advertised_radio_tv'] === 'sim',
            'source' => 'lp/campanha',
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

        $requestId = '';
        $curl = curl_init($apiUrl);
        if ($curl === false) return $fail('pre_registration_client_unavailable');
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $encoded,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json', 'X-Service-Token: ' . $token],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 3,
            CURLOPT_TIMEOUT => 8,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_HEADERFUNCTION => static function ($handle, string $header) use (&$requestId): int {
                if (str_starts_with(strtolower($header), 'x-request-id:')) {
                    $value = trim(substr($header, strlen('x-request-id:')));
                    if (preg_match('/^[A-Za-z0-9._:-]{1,100}$/', $value)) $requestId = $value;
                }
                return strlen($header);
            },
        ]);
        $result = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        $curlError = curl_errno($curl);
        curl_close($curl);
        if ($curlError !== 0 || $result === false) {
            return $fail('pre_registration_connection_failed', $status, $curlError, $requestId);
        }
        if (!in_array($status, [200, 201], true)) {
            return $fail('pre_registration_http_' . $status, $status, 0, $requestId);
        }
        $response = is_string($result) ? json_decode($result, true) : null;
        if (!is_array($response) || !is_string($response['id'] ?? null) || trim($response['id']) === '') {
            return $fail('pre_registration_response_invalid', $status, 0, $requestId);
        }
        return ['saved' => true, 'id' => $response['id'], 'http_status' => $status, 'request_id' => $requestId];
    } catch (Throwable $error) {
        // Do not log exception text: configuration errors may contain private data.
        return $fail('pre_registration_client_error');
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    siteFormRespond(405, ['success' => false, 'message' => 'Método não permitido.']);
}
$contentType = strtolower(trim(explode(';', (string) ($_SERVER['CONTENT_TYPE'] ?? ''))[0]));
if ($contentType !== 'application/json') {
    siteFormRespond(415, ['success' => false, 'message' => 'Formato de envio não aceito.']);
}
$origin = rtrim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''), '/');
if ($origin !== '' && !in_array($origin, ['https://ummix.com.br', 'https://www.ummix.com.br'], true)) {
    siteFormRespond(403, ['success' => false, 'message' => 'Origem não permitida.']);
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) {
    siteFormRespond(413, ['success' => false, 'message' => 'Envio acima do limite permitido.']);
}
$raw = file_get_contents('php://input', false, null, 0, 16385);
if (!is_string($raw) || strlen($raw) > 16384) {
    siteFormRespond(413, ['success' => false, 'message' => 'Envio acima do limite permitido.']);
}
$data = json_decode($raw, true);
if (!is_array($data) || array_is_list($data)) {
    siteFormRespond(400, ['success' => false, 'message' => 'Dados do formulário inválidos.']);
}
$honeypot = siteFormText($data['website'] ?? '', 200);
if ($honeypot === null) {
    siteFormRespond(400, ['success' => false, 'message' => 'Dados do formulário inválidos.']);
}
if ($honeypot !== '') {
    siteFormRespond(200, ['success' => true, 'accepted' => false]);
}

$formType = $data['_form_type'] ?? '';
$forms = [
    'campaign' => [
        'subject' => 'Ummix | Lead (LP campanha)',
        'name_field' => 'name',
        'cc' => ['midiaummix@googlegroups.com'],
        'required' => ['name', 'email', 'phone', 'already_advertised_radio_tv'],
        'fields' => ['name' => 'Nome', 'email' => 'E-mail', 'phone' => 'Telefone', 'already_advertised_radio_tv' => 'Já anunciou em rádio e TV?'],
    ],
    'contact' => [
        'subject' => 'Ummix | Contato',
        'name_field' => 'name',
        'cc' => ['falecoma@ummix.com.br', 'bruno.araujo@ummix.com.br'],
        'required' => ['name', 'email', 'phone'],
        'fields' => ['name' => 'Nome', 'email' => 'E-mail', 'phone' => 'Telefone', 'message' => 'Mensagem'],
    ],
    'partner' => [
        'subject' => 'Ummix | Partner',
        'name_field' => 'nome',
        'cc' => ['falecoma@ummix.com.br', 'bruno.araujo@ummix.com.br'],
        'required' => ['nome', 'email', 'empresa', 'telefone'],
        'fields' => ['nome' => 'Nome', 'email' => 'E-mail', 'empresa' => 'Empresa', 'telefone' => 'Telefone'],
    ],
    'monetize' => [
        'subject' => 'Ummix | Cadastro de veículo',
        'name_field' => 'nomeResponsavel',
        'cc' => ['falecoma@ummix.com.br'],
        'required' => ['nomeVeiculo', 'nomeResponsavel', 'email', 'whatsapp'],
        'fields' => [
            'nomeVeiculo' => 'Veículo', 'tipoVeiculo' => 'Tipo de veículo', 'razaoSocial' => 'Razão social',
            'cnpj' => 'CNPJ', 'cidade' => 'Cidade', 'estado' => 'Estado', 'site' => 'Site',
            'nomeResponsavel' => 'Responsável', 'cargo' => 'Cargo', 'email' => 'E-mail',
            'whatsapp' => 'WhatsApp', 'possuiStreaming' => 'Possui streaming',
            'linkStreaming' => 'Link do streaming', 'tipoStreaming' => 'Tipo de streaming',
            'fornecedorStreaming' => 'Fornecedor de streaming', 'custoStreaming' => 'Custo de streaming',
            'conheceAudiencia' => 'Conhece a audiência', 'audienciaMensal' => 'Audiência mensal',
            'consentimento' => 'Consentimento', 'origem' => 'Origem',
        ],
    ],
];
if (!is_string($formType) || !isset($forms[$formType])) {
    siteFormRespond(422, ['success' => false, 'message' => 'Formulário inválido.']);
}
$form = $forms[$formType];
$values = [];
foreach ($form['fields'] as $key => $label) {
    $value = siteFormText($data[$key] ?? '', $key === 'message' ? 3000 : 500);
    if ($value === null) siteFormRespond(422, ['success' => false, 'message' => 'Confira os campos e tente novamente.']);
    $values[$key] = $value;
}
foreach ($form['required'] as $key) {
    if ($values[$key] === '') siteFormRespond(422, ['success' => false, 'message' => 'Preencha os campos obrigatórios.']);
}
$email = $values['email'];
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false || strlen($email) > 254) {
    siteFormRespond(422, ['success' => false, 'message' => 'Informe um e-mail válido.']);
}
if ($formType === 'campaign') {
    $digits = preg_replace('/\D/', '', $values['phone']);
    if (!in_array(strlen($digits), [10, 11], true) || !in_array($values['already_advertised_radio_tv'], ['sim', 'nao'], true)) {
        siteFormRespond(422, ['success' => false, 'message' => 'Confira o telefone e a resposta do formulário.']);
    }
}
$limited = siteFormRateLimited();
if ($limited === null) {
    siteFormRespond(503, ['success' => false, 'message' => 'Serviço temporariamente indisponível.']);
}
if ($limited) {
    header('Retry-After: 600');
    siteFormRespond(429, ['success' => false, 'message' => 'Muitas tentativas. Aguarde alguns minutos.']);
}

$secretPath = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'ummix-mail-secrets.php';
if (!is_file($secretPath)) {
    error_log('[ummix-site-form] secrets_missing');
    siteFormRespond(503, ['success' => false, 'message' => 'Serviço de e-mail não configurado.']);
}
$config = require $secretPath;
$key = is_array($config) ? trim((string) ($config['brevo_api_key'] ?? '')) : '';
$senderEmail = is_array($config) ? trim((string) ($config['sender_email'] ?? '')) : '';
$senderName = is_array($config) ? trim((string) ($config['sender_name'] ?? 'Ummix Ads')) : 'Ummix Ads';
if ($key === '' || filter_var($senderEmail, FILTER_VALIDATE_EMAIL) === false) {
    error_log('[ummix-site-form] secrets_invalid');
    siteFormRespond(503, ['success' => false, 'message' => 'Serviço de e-mail não configurado.']);
}
if (!function_exists('curl_init')) {
    error_log('[ummix-site-form] curl_unavailable');
    siteFormRespond(503, ['success' => false, 'message' => 'Serviço de e-mail indisponível.']);
}

$lines = ['Formulário: ' . $formType, ''];
foreach ($form['fields'] as $field => $label) {
    if ($values[$field] !== '') $lines[] = $label . ': ' . $values[$field];
}
$pageUrl = siteFormText($data['_url'] ?? '', 1000);
if ($pageUrl !== null && $pageUrl !== '') $lines[] = 'Página: ' . $pageUrl;
if ($formType === 'campaign') {
    $attribution = $data['attribution'] ?? [];
    if (is_array($attribution)) {
        foreach (['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_matchtype', 'utm_network', 'utm_device', 'gclid', 'fbclid'] as $keyName) {
            $value = siteFormText($attribution[$keyName] ?? '', 300);
            if ($value !== null && $value !== '') $lines[] = $keyName . ': ' . $value;
        }
    }
}
$preRegistration = null;
if ($formType === 'campaign') {
    $preRegistration = siteFormPreRegister($values);
    if ($preRegistration['saved']) {
        $lines[] = 'Pré-cadastro salvo na plataforma. ID: ' . $preRegistration['id'];
    } else {
        $warning = [
            'ATENÇÃO: pré-cadastro não confirmado no banco. O lead foi recebido por e-mail; a equipe deve revisar a integração.',
            'Código: ' . $preRegistration['code'],
        ];
        if ($preRegistration['http_status'] > 0) $warning[] = 'HTTP da API: ' . $preRegistration['http_status'];
        if ($preRegistration['request_id'] !== '') $warning[] = 'Request ID: ' . $preRegistration['request_id'];
        $lines = array_merge($warning, [''], $lines);
    }
}
$subjectName = trim(preg_replace('/\s+/u', ' ', $values[$form['name_field']]) ?? '');
$subject = $form['subject'] . ' | ' . $subjectName;
if ($preRegistration !== null && !$preRegistration['saved']) $subject = '[Pré-cadastro pendente] ' . $subject;
$payload = [
    'sender' => ['email' => $senderEmail, 'name' => $senderName],
    'to' => [['email' => 'tecnologia@ummix.com.br']],
    'cc' => array_map(static fn (string $address): array => ['email' => $address], $form['cc']),
    'replyTo' => ['email' => $email],
    'subject' => $subject,
    'htmlContent' => '<html><body><pre style="font:14px/1.5 sans-serif;white-space:pre-wrap">' . htmlspecialchars(implode("\n", $lines), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</pre></body></html>',
    'textContent' => implode("\n", $lines),
];
$encoded = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$curl = curl_init('https://api.brevo.com/v3/smtp/email');
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $encoded,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json', 'api-key: ' . $key],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_SSL_VERIFYPEER => true,
]);
$result = curl_exec($curl);
$status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
$curlError = curl_errno($curl);
curl_close($curl);
$response = is_string($result) ? json_decode($result, true) : null;
if ($status !== 201 || !is_array($response) || empty($response['messageId'])) {
    error_log('[ummix-site-form] brevo_failed status=' . $status . ' curl_errno=' . $curlError);
    siteFormRespond(502, [
        'success' => false,
        'code' => $curlError !== 0 ? 'brevo_connection_failed' : 'brevo_http_' . $status,
        'message' => 'Não foi possível enviar seus dados agora. Tente novamente em instantes.',
    ]);
}
$submission = ['success' => true, 'accepted' => true];
if ($preRegistration !== null) {
    $submission['preRegistrationSaved'] = $preRegistration['saved'];
    if ($preRegistration['saved']) $submission['preRegistrationId'] = $preRegistration['id'];
    else $submission['preRegistrationCode'] = $preRegistration['code'];
}
siteFormRespond(200, $submission);

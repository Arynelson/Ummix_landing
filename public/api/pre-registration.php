<?php
declare(strict_types=1);

const UMMIX_MAX_REQUEST_BYTES = 8192;
const UMMIX_RATE_LIMIT_WINDOW_SECONDS = 600;
const UMMIX_RATE_LIMIT_MAX_REQUESTS = 8;
const UMMIX_PRE_REGISTRATION_URL = 'https://app.ummix.com.br/api/integrations/pre-registrations';
const UMMIX_FORMSUBMIT_URL = 'https://formsubmit.co/ajax/tecnologia@ummix.com.br';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function ummixCampaignRespond($status, $payload)
{
    http_response_code((int) $status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function ummixCampaignUtf8Length($value)
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }

    $length = preg_match_all('/./us', $value, $matches);
    return $length === false ? PHP_INT_MAX : $length;
}

function ummixCampaignNormalizePhone($value)
{
    $digits = preg_replace('/\D+/', '', $value);
    if (!is_string($digits)) {
        return null;
    }

    if ((strlen($digits) === 12 || strlen($digits) === 13) && substr($digits, 0, 2) === '55') {
        $digits = substr($digits, 2);
    }

    if (strlen($digits) === 11) {
        return '(' . substr($digits, 0, 2) . ') ' . substr($digits, 2, 5) . '-' . substr($digits, 7, 4);
    }

    if (strlen($digits) === 10) {
        return '(' . substr($digits, 0, 2) . ') ' . substr($digits, 2, 4) . '-' . substr($digits, 6, 4);
    }

    return null;
}

function ummixCampaignLoadServiceToken()
{
    $token = getenv('UMMIX_PRE_REGISTRATION_SERVICE_TOKEN');

    if (!is_string($token) || trim($token) === '') {
        $documentRoot = isset($_SERVER['DOCUMENT_ROOT']) ? rtrim((string) $_SERVER['DOCUMENT_ROOT'], '/\\') : '';
        if ($documentRoot !== '') {
            $privateConfigPath = dirname($documentRoot) . DIRECTORY_SEPARATOR . 'ummix-pre-registration-secrets.php';
            if (is_file($privateConfigPath) && is_readable($privateConfigPath)) {
                try {
                    $privateConfig = require $privateConfigPath;
                } catch (Throwable $error) {
                    $privateConfig = null;
                }

                if (is_array($privateConfig) && isset($privateConfig['service_token'])) {
                    $token = $privateConfig['service_token'];
                }
            }
        }
    }

    return is_string($token) ? trim($token) : '';
}

function ummixCampaignConsumeRateLimit($token)
{
    $remoteAddress = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '';
    if (filter_var($remoteAddress, FILTER_VALIDATE_IP) === false) {
        return null;
    }

    $temporaryRoot = rtrim(sys_get_temp_dir(), '/\\');
    $directory = $temporaryRoot . DIRECTORY_SEPARATOR . 'ummix-lead-rate-' . substr(hash('sha256', __DIR__), 0, 16);

    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        return null;
    }

    @chmod($directory, 0700);
    $key = hash_hmac('sha256', $remoteAddress, $token);
    $path = $directory . DIRECTORY_SEPARATOR . $key . '.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return null;
    }

    $now = time();
    $contents = stream_get_contents($handle);
    $record = is_string($contents) ? json_decode($contents, true) : null;
    $windowStartedAt = is_array($record) && isset($record['window_started_at']) && is_int($record['window_started_at'])
        ? $record['window_started_at']
        : $now;
    $requestCount = is_array($record) && isset($record['request_count']) && is_int($record['request_count'])
        ? $record['request_count']
        : 0;

    if ($now < $windowStartedAt || $now - $windowStartedAt >= UMMIX_RATE_LIMIT_WINDOW_SECONDS) {
        $windowStartedAt = $now;
        $requestCount = 0;
    }

    if ($requestCount >= UMMIX_RATE_LIMIT_MAX_REQUESTS) {
        $retryAfter = max(1, $windowStartedAt + UMMIX_RATE_LIMIT_WINDOW_SECONDS - $now);
        flock($handle, LOCK_UN);
        fclose($handle);
        return ['limited' => true, 'retry_after' => $retryAfter];
    }

    $requestCount++;
    $encodedRecord = json_encode([
        'window_started_at' => $windowStartedAt,
        'request_count' => $requestCount,
    ]);

    rewind($handle);
    $truncated = ftruncate($handle, 0);
    $written = $encodedRecord === false ? false : fwrite($handle, $encodedRecord);
    $flushed = fflush($handle);
    @chmod($path, 0600);
    flock($handle, LOCK_UN);
    fclose($handle);

    if (!$truncated || $written === false || !$flushed || $written !== strlen($encodedRecord)) {
        return null;
    }

    return ['limited' => false, 'retry_after' => 0];
}

function ummixCampaignPostJson($url, $body, $headers, $timeout = 12)
{
    if (!function_exists('curl_init')) {
        return null;
    }

    $curl = curl_init($url);
    if ($curl === false) {
        return null;
    }

    $optionsSet = curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => array_merge([
            'Content-Type: application/json',
            'Accept: application/json',
        ], $headers),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => (int) $timeout,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);

    if (!$optionsSet) {
        curl_close($curl);
        return null;
    }

    $responseBody = curl_exec($curl);
    $responseStatus = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if (!is_string($responseBody)) {
        return null;
    }

    return ['status' => $responseStatus, 'body' => $responseBody];
}

function ummixCampaignNotificationAccepted($response)
{
    if (!is_array($response) || !in_array($response['status'], [200, 201], true)) {
        return false;
    }

    $body = json_decode($response['body'], true);
    if (!is_array($body)) {
        return false;
    }

    $success = $body['success'] ?? null;
    $message = isset($body['message']) && is_string($body['message']) ? $body['message'] : '';

    return $success !== false
        && $success !== 'false'
        && preg_match('/activation|unable to submit/i', $message) !== 1;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    ummixCampaignRespond(405, ['success' => false, 'message' => 'Método não permitido.']);
}

$contentType = strtolower(trim(explode(';', (string) ($_SERVER['CONTENT_TYPE'] ?? ''))[0]));
if ($contentType !== 'application/json') {
    ummixCampaignRespond(415, ['success' => false, 'message' => 'Formato de envio não aceito.']);
}

$origin = isset($_SERVER['HTTP_ORIGIN']) ? rtrim(trim((string) $_SERVER['HTTP_ORIGIN']), '/') : '';
if ($origin !== '' && !in_array($origin, ['https://ummix.com.br', 'https://www.ummix.com.br'], true)) {
    ummixCampaignRespond(403, ['success' => false, 'message' => 'Origem não permitida.']);
}

$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > UMMIX_MAX_REQUEST_BYTES) {
    ummixCampaignRespond(413, ['success' => false, 'message' => 'Envio acima do limite permitido.']);
}

$rawBody = file_get_contents('php://input', false, null, 0, UMMIX_MAX_REQUEST_BYTES + 1);
if (!is_string($rawBody) || strlen($rawBody) > UMMIX_MAX_REQUEST_BYTES) {
    ummixCampaignRespond(413, ['success' => false, 'message' => 'Envio acima do limite permitido.']);
}

$input = json_decode($rawBody, true);
if (json_last_error() !== JSON_ERROR_NONE || !is_array($input)) {
    ummixCampaignRespond(400, ['success' => false, 'message' => 'Dados do formulário inválidos.']);
}

$honeypot = $input['website'] ?? '';
if (!is_string($honeypot)) {
    ummixCampaignRespond(400, ['success' => false, 'message' => 'Dados do formulário inválidos.']);
}
if (trim($honeypot) !== '') {
    ummixCampaignRespond(200, ['success' => true, 'accepted' => false, 'notificationSent' => false]);
}

$fullName = isset($input['fullName']) && is_string($input['fullName']) ? trim($input['fullName']) : '';
$email = isset($input['email']) && is_string($input['email']) ? trim($input['email']) : '';
$phoneInput = isset($input['phone']) && is_string($input['phone']) ? trim($input['phone']) : '';
$advertisedRadioTv = $input['advertisedRadioTv'] ?? null;
$phone = ummixCampaignNormalizePhone($phoneInput);

if (
    ummixCampaignUtf8Length($fullName) < 2
    || ummixCampaignUtf8Length($fullName) > 255
    || preg_match('/[\x00-\x1F\x7F]/u', $fullName)
    || strlen($email) > 254
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false
    || strlen($phoneInput) > 32
    || $phone === null
    || !is_bool($advertisedRadioTv)
) {
    ummixCampaignRespond(422, ['success' => false, 'message' => 'Confira os campos e tente novamente.']);
}

$serviceToken = ummixCampaignLoadServiceToken();
if ($serviceToken === '') {
    ummixCampaignRespond(503, ['success' => false, 'message' => 'Serviço temporariamente indisponível.']);
}

$rateLimit = ummixCampaignConsumeRateLimit($serviceToken);
if ($rateLimit === null) {
    ummixCampaignRespond(503, ['success' => false, 'message' => 'Serviço temporariamente indisponível.']);
}
if ($rateLimit['limited']) {
    header('Retry-After: ' . (int) $rateLimit['retry_after']);
    ummixCampaignRespond(429, ['success' => false, 'message' => 'Muitas tentativas. Aguarde alguns minutos e tente novamente.']);
}

$attributionInput = isset($input['attribution']) && is_array($input['attribution'])
    ? $input['attribution']
    : [];
$attributionKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'utm_matchtype',
    'utm_network',
    'utm_device',
    'gclid',
    'fbclid',
];
$attribution = [];
foreach ($attributionKeys as $key) {
    $value = $attributionInput[$key] ?? null;
    if (is_string($value) && strlen($value) <= 300 && preg_match('/[\x00-\x1F\x7F]/u', $value) !== 1) {
        $attribution[$key] = $value;
    }
}

$registrationBody = json_encode([
    'fullName' => $fullName,
    'email' => $email,
    'phone' => $phone,
    'advertisedRadioTv' => $advertisedRadioTv,
    'source' => 'lp/campanha',
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if ($registrationBody === false) {
    ummixCampaignRespond(400, ['success' => false, 'message' => 'Dados do formulário inválidos.']);
}

$registrationResponse = ummixCampaignPostJson(
    UMMIX_PRE_REGISTRATION_URL,
    $registrationBody,
    ['X-Service-Token: ' . $serviceToken]
);

if (!is_array($registrationResponse) || !in_array($registrationResponse['status'], [200, 201], true)) {
    ummixCampaignRespond(502, ['success' => false, 'message' => 'Não foi possível registrar seus dados agora.']);
}

$registrationData = json_decode($registrationResponse['body'], true);
$created = is_array($registrationData) && isset($registrationData['created']) && is_bool($registrationData['created'])
    ? $registrationData['created']
    : null;

$notificationPayload = [
    'name' => $fullName,
    'email' => $email,
    'phone' => $phone,
    'already_advertised_radio_tv' => $advertisedRadioTv ? 'sim' : 'nao',
    '_subject' => 'Novo lead da landing page de campanha',
    '_template' => 'table',
    '_captcha' => 'false',
    '_cc' => 'midiaummix@googlegroups.com',
    '_url' => 'https://ummix.com.br/lp/campanha',
];
foreach ($attribution as $key => $value) {
    $notificationPayload[$key] = $value;
}

$notificationBody = json_encode($notificationPayload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$notificationResponse = $notificationBody === false
    ? null
    : ummixCampaignPostJson(UMMIX_FORMSUBMIT_URL, $notificationBody, [], 10);
$notificationSent = ummixCampaignNotificationAccepted($notificationResponse);

ummixCampaignRespond(200, [
    'success' => true,
    'accepted' => true,
    'created' => $created,
    'notificationSent' => $notificationSent,
]);

<?php
declare(strict_types=1);

const UMMIX_MAX_REQUEST_BYTES = 8192;
const UMMIX_RATE_LIMIT_WINDOW_SECONDS = 600;
const UMMIX_RATE_LIMIT_MAX_REQUESTS = 8;

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

    if (strlen($digits) === 11) {
        return '(' . substr($digits, 0, 2) . ') ' . substr($digits, 2, 5) . '-' . substr($digits, 7, 4);
    }

    if (strlen($digits) === 10) {
        return '(' . substr($digits, 0, 2) . ') ' . substr($digits, 2, 4) . '-' . substr($digits, 6, 4);
    }

    return null;
}

function ummixCampaignConsumeRateLimit()
{
    $remoteAddress = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '';
    if (filter_var($remoteAddress, FILTER_VALIDATE_IP) === false) {
        error_log('[ummix-pre-registration][rate_limit] client_address_unavailable');
        return null;
    }

    $temporaryRoots = [];
    $configuredTemporaryRoot = ini_get('upload_tmp_dir');
    if (is_string($configuredTemporaryRoot) && $configuredTemporaryRoot !== '') {
        $temporaryRoots[] = $configuredTemporaryRoot;
    }
    $documentRoot = isset($_SERVER['DOCUMENT_ROOT']) ? rtrim((string) $_SERVER['DOCUMENT_ROOT'], '/\\') : '';
    if ($documentRoot !== '') {
        $temporaryRoots[] = dirname($documentRoot) . DIRECTORY_SEPARATOR . 'tmp';
    }

    $systemTemporaryRoot = sys_get_temp_dir();
    if (is_string($systemTemporaryRoot) && $systemTemporaryRoot !== '') {
        $temporaryRoots[] = $systemTemporaryRoot;
    }

    $temporaryRoot = null;
    foreach ($temporaryRoots as $candidate) {
        if (is_dir($candidate) && is_writable($candidate)) {
            $temporaryRoot = rtrim($candidate, '/\\');
            break;
        }
    }

    if ($temporaryRoot === null) {
        error_log('[ummix-pre-registration][rate_limit] writable_temp_directory_unavailable');
        return null;
    }

    $directory = $temporaryRoot . DIRECTORY_SEPARATOR . 'ummix-lead-rate-' . substr(hash('sha256', __DIR__), 0, 16);
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        error_log('[ummix-pre-registration][rate_limit] storage_directory_unavailable');
        return null;
    }

    $path = $directory . DIRECTORY_SEPARATOR . hash('sha256', $remoteAddress) . '.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        error_log('[ummix-pre-registration][rate_limit] storage_lock_failed');
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
    flock($handle, LOCK_UN);
    fclose($handle);

    if (!$truncated || $written === false || !$flushed || $written !== strlen($encodedRecord)) {
        error_log('[ummix-pre-registration][rate_limit] storage_write_failed');
        return null;
    }

    return ['limited' => false, 'retry_after' => 0];
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
    ummixCampaignRespond(200, ['success' => true, 'accepted' => false, 'emailAccepted' => false]);
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

$rateLimit = ummixCampaignConsumeRateLimit();
if ($rateLimit === null) {
    ummixCampaignRespond(503, [
        'success' => false,
        'code' => 'rate_limit_unavailable',
        'message' => 'Serviço temporariamente indisponível.',
    ]);
}if ($rateLimit['limited']) {
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

$messageLines = [
    'Novo lead recebido pela landing page /lp/campanha',
    '',
    'Nome: ' . $fullName,
    'E-mail: ' . $email,
    'Telefone: ' . $phone,
    'Já anunciou em rádio e TV?: ' . ($advertisedRadioTv ? 'Sim' : 'Não'),
];
if (count($attribution) > 0) {
    $messageLines[] = '';
    $messageLines[] = 'Atribuição da visita:';
    foreach ($attribution as $key => $value) {
        $messageLines[] = $key . ': ' . $value;
    }
}
$message = implode("\r\n", $messageLines);

$emailHeaders = [
    'MIME-Version: 1.1',
    'Content-Type: text/plain; charset=UTF-8',
    'From: tecnologia@ummix.com.br',
    'Return-Path: tecnologia@ummix.com.br',
    'Reply-To: ' . $email,
    'Cc: midiaummix@googlegroups.com',
];
$isWindowsRuntime = strtoupper(substr(PHP_OS, 0, 3)) === 'WIN';
$headerLineEnding = $isWindowsRuntime ? "\r\n" : "\n";
$headerString = implode($headerLineEnding, $emailHeaders);

$emailAccepted = false;
$deliveryFailureCode = function_exists('mail') ? 'email_rejected' : 'mail_unavailable';

if (function_exists('mail')) {
    if ($isWindowsRuntime) {
        $emailAccepted = @mail(
            'tecnologia@ummix.com.br',
            'Novo lead - Landing page de campanha Ummix',
            $message,
            $headerString
        );
    } else {
        $emailAccepted = @mail(
            'tecnologia@ummix.com.br',
            'Novo lead - Landing page de campanha Ummix',
            $message,
            $headerString,
            '-rtecnologia@ummix.com.br'
        );
    }
}

if ($emailAccepted !== true && !$isWindowsRuntime) {
    $sendmailPath = trim((string) ini_get('sendmail_path'));
    $sendmailParts = $sendmailPath === '' ? [] : preg_split('/\s+/', $sendmailPath);
    $sendmailBinary = is_array($sendmailParts) && isset($sendmailParts[0])
        ? $sendmailParts[0]
        : '';

    if (!function_exists('proc_open')) {
        $deliveryFailureCode = 'sendmail_process_unavailable';
    } elseif ($sendmailBinary === '') {
        $deliveryFailureCode = 'sendmail_not_configured';
    } else {
        $descriptors = [
            0 => ['pipe', 'r'],
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w'],
        ];
        $process = @proc_open(
            [$sendmailBinary, '-t', '-i', '-f', 'tecnologia@ummix.com.br'],
            $descriptors,
            $pipes
        );

        if (!is_resource($process)) {
            $deliveryFailureCode = 'sendmail_start_failed';
        } else {
            $sendmailBody = str_replace(["\r\n", "\r"], "\n", $message);
            $sendmailLines = array_merge(
                [
                    'To: tecnologia@ummix.com.br',
                    'Subject: Novo lead - Landing page de campanha Ummix',
                ],
                $emailHeaders,
                ['', $sendmailBody, '']
            );
            $sendmailPayload = implode("\n", $sendmailLines);
            $bytesWritten = fwrite($pipes[0], $sendmailPayload);
            fclose($pipes[0]);
            stream_get_contents($pipes[1]);
            fclose($pipes[1]);
            stream_get_contents($pipes[2]);
            fclose($pipes[2]);
            $processExitCode = proc_close($process);
            $emailAccepted = $processExitCode === 0
                && is_int($bytesWritten)
                && $bytesWritten === strlen($sendmailPayload);

            if (!$emailAccepted) {
                $deliveryFailureCode = 'sendmail_rejected';
            }
        }
    }
}

if ($emailAccepted !== true) {
    error_log('[ummix-pre-registration][email] delivery_failed_' . $deliveryFailureCode);
    ummixCampaignRespond(503, [
        'success' => false,
        'code' => $deliveryFailureCode,
        'message' => 'Não foi possível enviar seus dados agora.',
    ]);
}
ummixCampaignRespond(200, [
    'success' => true,
    'accepted' => true,
    'emailAccepted' => true,
]);

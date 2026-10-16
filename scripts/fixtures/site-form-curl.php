<?php
// Loaded only by the local test server with php -n. No external HTTP calls are made.
if (function_exists('curl_init')) throw new RuntimeException('Tests require php -n without the cURL extension.');
foreach ([
    'CURLOPT_POST', 'CURLOPT_POSTFIELDS', 'CURLOPT_HTTPHEADER', 'CURLOPT_RETURNTRANSFER',
    'CURLOPT_CONNECTTIMEOUT', 'CURLOPT_TIMEOUT', 'CURLOPT_SSL_VERIFYPEER',
    'CURLOPT_SSL_VERIFYHOST', 'CURLOPT_FOLLOWLOCATION', 'CURLOPT_HEADERFUNCTION',
    'CURLINFO_RESPONSE_CODE',
] as $index => $constant) define($constant, 1000 + $index);

$_SERVER['REMOTE_ADDR'] = '198.51.100.' . (1 + (int) ($_SERVER['HTTP_X_FIXTURE_INDEX'] ?? 0));

if (!function_exists('curl_init')) {
    function curl_init($url) {
        return (object) ['url' => $url, 'options' => [], 'status' => 0, 'error' => 0];
    }
    function curl_setopt_array($handle, $options) {
        $handle->options = $options;
        return true;
    }
    function curl_exec($handle) {
        $scenario = $_SERVER['HTTP_X_FIXTURE_CASE'] ?? 'created';
        file_put_contents(__DIR__ . '/calls.ndjson', json_encode([
            'url' => $handle->url,
            'headers' => $handle->options[CURLOPT_HTTPHEADER],
            'payload' => json_decode($handle->options[CURLOPT_POSTFIELDS], true),
            'tls' => $handle->options[CURLOPT_SSL_VERIFYPEER],
            'redirects' => $handle->options[CURLOPT_FOLLOWLOCATION] ?? false,
        ]) . "\n", FILE_APPEND);
        if ($handle->url === 'https://app.ummix.com.br/api/integrations/pre-registrations') {
            if (isset($handle->options[CURLOPT_HEADERFUNCTION])) {
                $callback = $handle->options[CURLOPT_HEADERFUNCTION];
                $callback($handle, 'X-Request-Id: fixture-' . $scenario . "\r\n");
            }
            if ($scenario === 'api_timeout') {
                $handle->error = 28;
                return false;
            }
            if ($scenario === 'api_401') {
                $handle->status = 401;
                return '{"message":"private-upstream-marker"}';
            }
            $handle->status = $scenario === 'existing' ? 200 : 201;
            if ($scenario === 'api_invalid_json') return '{}';
            return json_encode(['id' => 'e9178ade-e3e2-4f13-9351-aad9d6eecbfa', 'created' => $scenario !== 'existing']);
        }
        if ($handle->url !== 'https://api.brevo.com/v3/smtp/email') {
            throw new RuntimeException('Unexpected external URL in fixture.');
        }
        $handle->status = $scenario === 'mail_401' ? 401 : 201;
        return $scenario === 'mail_401' ? '{}' : '{"messageId":"fixture-message"}';
    }
    function curl_getinfo($handle, $option) { return $handle->status; }
    function curl_errno($handle) { return $handle->error; }
    function curl_close($handle) {}
}

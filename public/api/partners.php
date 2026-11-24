<?php
declare(strict_types=1);

// Lista pública de Partners aprovados para a página /partner.
// Fonte: aba "Site (público)" da planilha "Cadastro de Partner Ummix Ads (respostas)",
// publicada na web como CSV. Essa aba só traz quem tem "Status no site" = Aprovado
// e só colunas públicas (nada de CNPJ, dados do contato pessoal ou respostas internas).
// Colunas esperadas: ID | Nome | Tipo | Cidades | Logo | Fundo da logo | Site | Instagram | LinkedIn | E-mail comercial | WhatsApp comercial

const PARTNERS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlP_IgyifBUxGbxomhtUeDq6arlAgCGi6YqgOXeglHG_S0piVJfVLVJ2SqQefJo4O7ZHMdtUJQHvvF/pub?gid=502&single=true&output=csv';
const PARTNERS_CACHE_SECONDS = 900;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');
header('X-Content-Type-Options: nosniff');

function partnersRespond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function partnersCleanUrl(string $value): string
{
    $value = trim($value);
    if ($value === '') return '';
    if (!preg_match('#^https?://#i', $value)) $value = 'https://' . ltrim($value, '/');
    return filter_var($value, FILTER_VALIDATE_URL) ? $value : '';
}

function partnersInstagramUrl(string $value): string
{
    $value = trim($value);
    if ($value === '') return '';
    if (preg_match('#instagram\.com/#i', $value)) return partnersCleanUrl($value);
    $handle = ltrim($value, '@ ');
    return preg_match('/^[A-Za-z0-9._]{1,30}$/', $handle) ? 'https://www.instagram.com/' . $handle . '/' : '';
}

// Link de arquivo do Google Drive vira endereço de imagem direto (o arquivo precisa estar público).
function partnersLogoUrl(string $value): string
{
    $value = trim($value);
    if ($value === '') return '';
    if (str_starts_with($value, '/assets/')) return $value;
    if (preg_match('#drive\.google\.com/(?:file/d/|open\?id=|uc\?(?:export=\w+&)?id=)([A-Za-z0-9_-]{10,})#', $value, $m)) {
        return 'https://lh3.googleusercontent.com/d/' . $m[1] . '=w800';
    }
    return partnersCleanUrl($value);
}

function partnersSlug(string $value): string
{
    $value = strtolower(iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value) ?: $value);
    return trim(preg_replace('/[^a-z0-9]+/', '-', $value) ?? '', '-');
}

function partnersFetchCsv(): ?string
{
    $cache = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'ummix-partners-' . hash('sha256', PARTNERS_CSV_URL) . '.csv';
    if (is_file($cache) && filemtime($cache) > time() - PARTNERS_CACHE_SECONDS) {
        return (string) file_get_contents($cache);
    }
    $context = stream_context_create(['http' => ['timeout' => 8, 'follow_location' => 1, 'user_agent' => 'UmmixSite/1.0']]);
    $csv = @file_get_contents(PARTNERS_CSV_URL, false, $context);
    if ($csv === false || $csv === '') {
        return is_file($cache) ? (string) file_get_contents($cache) : null;
    }
    @file_put_contents($cache, $csv, LOCK_EX);
    return $csv;
}

if (PARTNERS_CSV_URL === '') partnersRespond(503, ['partners' => [], 'error' => 'not_configured']);

$csv = partnersFetchCsv();
if ($csv === null) partnersRespond(502, ['partners' => [], 'error' => 'source_unavailable']);

$handle = fopen('php://memory', 'r+');
fwrite($handle, $csv);
rewind($handle);
$header = fgetcsv($handle, 0, ',', '"', '');
$partners = [];
$seen = [];

while (($row = fgetcsv($handle, 0, ',', '"', '')) !== false) {
    $row = array_pad($row, 11, '');
    [$id, $name, $type, $cities, $logo, $logoBg, $site, $instagram, $linkedin, $email, $phone] = array_map(static fn ($v): string => trim((string) $v), $row);
    if ($name === '') continue;
    $id = partnersSlug($id !== '' ? $id : $name);
    if ($id === '' || isset($seen[$id])) continue;
    $seen[$id] = true;

    $cityList = array_values(array_filter(array_map(
        static fn (string $c): string => trim(preg_replace('/^.*>\s*/', '', $c) ?? ''),
        preg_split('/[,;]/', $cities) ?: []
    )));

    $partners[] = [
        'id' => $id,
        'name' => mb_substr($name, 0, 80),
        'type' => mb_substr($type, 0, 60),
        'cities' => $cityList,
        'logo' => partnersLogoUrl($logo),
        'logoBg' => mb_strtolower($logoBg) === 'claro' ? 'light' : 'dark',
        'site' => partnersCleanUrl($site),
        'instagram' => partnersInstagramUrl($instagram),
        'linkedin' => partnersCleanUrl($linkedin),
        'email' => filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '',
        'phone' => preg_replace('/\D/', '', $phone) ?? '',
    ];
}
fclose($handle);

partnersRespond(200, ['partners' => $partners]);

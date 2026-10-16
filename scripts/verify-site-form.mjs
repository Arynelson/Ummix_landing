import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { basename, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'

const php = process.argv[2] || 'php'
const source = fileURLToPath(new URL('../public/api/site-form.php', import.meta.url))
const fixture = fileURLToPath(new URL('./fixtures/site-form-curl.php', import.meta.url))
const temporaryRoot = resolve(tmpdir())
const root = await mkdtemp(join(temporaryRoot, 'ummix-site-form-test-'))
const publicRoot = join(root, 'public_html')
let server
let serverOutput = ''

try {
  await mkdir(join(publicRoot, 'api'), { recursive: true })
  await copyFile(source, join(publicRoot, 'api', 'site-form.php'))
  await copyFile(fixture, join(root, 'mock-curl.php'))
  await writeFile(join(root, 'ummix-mail-secrets.php'),
    "<?php return ['brevo_api_key'=>'fixture-brevo-key','sender_email'=>'sender@example.test','sender_name'=>'Ummix'];")

  const reservation = createServer()
  await new Promise((resolveReady, reject) => {
    reservation.once('error', reject)
    reservation.listen(0, '127.0.0.1', resolveReady)
  })
  const port = reservation.address().port
  await new Promise((resolveClosed) => reservation.close(resolveClosed))
  const baseUrl = 'http://127.0.0.1:' + port + '/api/site-form.php'
  server = spawn(php, [
    '-n', '-d', 'auto_prepend_file=' + join(root, 'mock-curl.php'),
    '-d', 'sys_temp_dir=' + root, '-d', 'log_errors=1',
    '-d', 'error_log=' + join(root, 'php-errors.log'),
    '-S', '127.0.0.1:' + port, '-t', publicRoot,
  ], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] })
  let serverError
  server.once('error', (error) => { serverError = error })
  server.stdout.on('data', (chunk) => { serverOutput += chunk })
  server.stderr.on('data', (chunk) => { serverOutput += chunk })
  let ready = false
  for (let attempt = 0; attempt < 50; attempt++) {
    if (serverError) throw serverError
    if (server.exitCode !== null) throw new Error('PHP server exited: ' + serverOutput)
    try {
      const response = await fetch(baseUrl, { signal: AbortSignal.timeout(300) })
      if (response.status === 405) { ready = true; break }
    } catch {}
    await delay(100)
  }
  assert(ready, 'Local PHP endpoint did not start: ' + serverOutput)

  const lead = {
    _form_type: 'campaign', name: ' Maria   Silva ', email: 'maria@example.test',
    phone: '(62) 99999-8888', already_advertised_radio_tv: 'sim', website: '',
    _url: 'https://ummix.com.br/lp/campanha', attribution: { utm_source: 'google' },
  }
  const scenarios = [
    { name: 'created', saved: true },
    { name: 'existing', saved: true },
    { name: 'not_advertised', saved: true, fields: { phone: '6233338888', already_advertised_radio_tv: 'nao' } },
    { name: 'api_401', saved: false, code: 'pre_registration_http_401' },
    { name: 'api_timeout', saved: false, code: 'pre_registration_connection_failed' },
    { name: 'api_invalid_json', saved: false, code: 'pre_registration_response_invalid' },
    { name: 'missing_token', saved: false, code: 'pre_registration_token_invalid' },
    { name: 'mail_401', status: 502 },
    { name: 'contact', fields: { _form_type: 'contact' } },
    { name: 'honeypot', fields: { website: 'bot' }, accepted: false },
    { name: 'bad_phone', fields: { phone: '123' }, status: 422 },
  ]
  for (const [index, scenario] of scenarios.entries()) {
    const token = scenario.name === 'missing_token' ? '' : 'fixture-service-token'
    await writeFile(join(root, 'ummix-pre-registration-secrets.php'),
      "<?php return ['service_token'=>'" + token + "'];")
    await writeFile(join(root, 'calls.ndjson'), '')
    const input = { ...lead, ...scenario.fields }
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', Origin: 'https://ummix.com.br',
        'X-Fixture-Case': scenario.name, 'X-Fixture-Index': String(index),
      },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(5000),
    })
    const result = await response.json()
    assert.equal(response.status, scenario.status || 200, scenario.name)
    assert.equal(result.success, !scenario.status, scenario.name)
    if (!scenario.status) assert.equal(result.accepted, scenario.accepted !== false, scenario.name)
    if (scenario.saved !== undefined) {
      assert.equal(result.preRegistrationSaved, scenario.saved, scenario.name)
      if (scenario.saved) assert.equal(result.preRegistrationId, 'e9178ade-e3e2-4f13-9351-aad9d6eecbfa')
      else assert.equal(result.preRegistrationCode, scenario.code)
    }
    const calls = (await readFile(join(root, 'calls.ndjson'), 'utf8')).trim()
    const requests = calls ? calls.split('\n').map((line) => JSON.parse(line)) : []
    const api = requests.filter((call) => call.url.includes('/pre-registrations'))
    const mail = requests.filter((call) => call.url.includes('brevo.com'))
    const skipped = ['honeypot', 'bad_phone'].includes(scenario.name)
    assert.equal(mail.length, skipped ? 0 : 1, scenario.name)
    assert.equal(api.length, skipped || ['contact', 'missing_token'].includes(scenario.name) ? 0 : 1, scenario.name)
    if (api.length) {
      assert.deepEqual(api[0].payload, {
        fullName: 'Maria Silva', email: 'maria@example.test',
        phone: scenario.name === 'not_advertised' ? '(62) 3333-8888' : '(62) 99999-8888',
        advertisedRadioTv: scenario.name !== 'not_advertised', source: 'lp/campanha',
      })
      assert.deepEqual(api[0].headers.filter((header) => /^x-service-token:/i.test(header)),
        ['X-Service-Token: fixture-service-token'])
      assert.equal(api[0].tls, true)
      assert.equal(api[0].redirects, false)
    }
    if (mail.length) {
      assert.equal(mail[0].payload.replyTo.email, 'maria@example.test')
      assert(mail[0].payload.subject.includes('Maria Silva'))
      assert(!mail[0].payload.textContent.includes('private-upstream-marker'))
      assert(!mail[0].headers.some((header) => /x-service-token/i.test(header)))
      if (scenario.saved === false) {
        assert(mail[0].payload.subject.startsWith('[Pré-cadastro pendente]'))
        assert(mail[0].payload.textContent.includes(scenario.code))
        if (scenario.name !== 'missing_token') assert(mail[0].payload.textContent.includes('fixture-' + scenario.name))
      } else {
        assert(!mail[0].payload.subject.startsWith('[Pré-cadastro pendente]'))
      }
    }
    assert(!JSON.stringify(result).includes('fixture-service-token'))
    assert(!JSON.stringify(result).includes('fixture-brevo-key'))
    console.log('PASS ' + scenario.name)
  }
  const logs = await readFile(join(root, 'php-errors.log'), 'utf8')
  for (const privateValue of ['fixture-service-token', 'fixture-brevo-key', 'maria@example.test', 'private-upstream-marker']) {
    assert(!logs.includes(privateValue), 'Private data leaked to PHP logs.')
  }
  console.log('Site form verified: 11 scenarios with mocked API and Brevo.')
} finally {
  if (server?.pid && server.exitCode === null) {
    const exited = new Promise((resolveExit) => server.once('exit', resolveExit))
    server.kill()
    await exited
  }
  const target = resolve(root)
  if (!target.startsWith(temporaryRoot + sep) || !basename(target).startsWith('ummix-site-form-test-')) {
    throw new Error('Unsafe temporary cleanup target.')
  }
  await rm(target, { recursive: true, force: true })
}

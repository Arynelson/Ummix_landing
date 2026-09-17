#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const htaccessPath = resolve(process.cwd(), 'public/.htaccess')
const htaccess = readFileSync(htaccessPath, 'utf8')

const requiredRules = [
  'RewriteRule ^assets/ - [L]',
  'RewriteRule ^cashback/?$ /cashback.html [L]',
  'RewriteRule ^partner/?$  /partner.html  [L]',
  'RewriteRule ^premios/?$ /premios.html [L]',
  'RewriteRule ^monetize/?$ /monetize.html [L]',
  'RewriteRule ^investidores/?$ /investidores.html [L]',
  'RewriteRule ^en/?$ /en/index.html [L]',
  'RewriteRule ^en/cashback/?$ /en/cashback.html [L]',
  'RewriteRule ^en/partner/?$  /en/partner.html [L]',
  'RewriteRule ^en/monetize/?$ /en/monetize.html [L]',
  'RewriteRule ^en/investidores/?$ /en/investidores.html [L]',
  'RewriteRule ^en/premios/?$ /en/premios.html [L]',
  'RewriteRule ^es/?$ /es/index.html [L]',
  'RewriteRule ^es/cashback/?$ /es/cashback.html [L]',
  'RewriteRule ^es/partner/?$ /es/partner.html [L]',
  'RewriteRule ^es/monetize/?$ /es/monetize.html [L]',
  'RewriteRule ^es/investidores/?$ /es/investidores.html [L]',
  'RewriteRule ^es/premios/?$ /es/premios.html [L]',
]

const missingRules = requiredRules.filter((rule) => !htaccess.includes(rule))
const forbiddenRules = [
  'RewriteRule ^ index.html [QSA,L]',
  'RewriteCond %{REQUEST_FILENAME} !-f',
  'RewriteCond %{REQUEST_FILENAME} !-d',
].filter((rule) => htaccess.includes(rule))

if (missingRules.length > 0 || forbiddenRules.length > 0) {
  if (missingRules.length > 0) {
    console.error('Missing hosting rules:')
    missingRules.forEach((rule) => console.error(`- ${rule}`))
  }
  if (forbiddenRules.length > 0) {
    console.error('Generic SPA fallback rules must not be present:')
    forbiddenRules.forEach((rule) => console.error(`- ${rule}`))
  }
  process.exit(1)
}

if (!htaccess.includes('-[A-Za-z0-9_-]{8,}')) {
  console.error('Immutable caching is not restricted to fingerprinted asset names.')
  process.exit(1)
}

console.log('Hosting rules verified: explicit routes, asset guard, scoped cache and no SPA catch-all.')

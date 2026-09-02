import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { HOME_COPY } from '../src/home-copy.js'
import { CASHBACK_COPY } from '../src/cashback-copy.js'
import { PARTNER_COPY } from '../src/partner-copy.js'
import { MONETIZE_COPY } from '../src/monetize-copy.js'
import { INVESTORS_COPY } from '../src/pages/investidores/investidores-copy.js'
import { LABELS } from '../src/i18n-labels.js'

const root = resolve(process.cwd())
const failures = []

function compareShape(base, candidate, path) {
  if (Array.isArray(base)) {
    if (!Array.isArray(candidate)) {
      failures.push(path + ' should be an array')
      return
    }
    if (base.length !== candidate.length) {
      failures.push(path + ' has ' + candidate.length + ' items; expected ' + base.length)
      return
    }
    base.forEach((item, index) => compareShape(item, candidate[index], path + '[' + index + ']'))
    return
  }

  if (base && typeof base === 'object') {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
      failures.push(path + ' should be an object')
      return
    }
    for (const key of Object.keys(base)) {
      if (!(key in candidate)) failures.push(path + '.' + key + ' is missing')
      else compareShape(base[key], candidate[key], path + '.' + key)
    }
    return
  }

  if (typeof base !== typeof candidate) {
    failures.push(path + ' has type ' + typeof candidate + '; expected ' + typeof base)
  }
}

function checkCopy(name, copy) {
  compareShape(copy.pt, copy.es, name + '.es')
  compareShape(copy.en, copy.es, name + '.es')
}

checkCopy('HOME_COPY', HOME_COPY)
checkCopy('CASHBACK_COPY', CASHBACK_COPY)
checkCopy('PARTNER_COPY', PARTNER_COPY)
checkCopy('MONETIZE_COPY', MONETIZE_COPY)
checkCopy('INVESTORS_COPY', INVESTORS_COPY)

const localeProviderSource = readFileSync(resolve(root, 'src/LocaleProvider.jsx'), 'utf8')
if (!/es:\s*\{\s*code:\s*['"]es['"]/.test(localeProviderSource)) {
  failures.push('LOCALES.es must use the es language code')
}

for (const locale of ['pt', 'en', 'es']) {
  const options = LABELS[locale]?.languageOptions
  for (const option of ['pt', 'en', 'es']) {
    if (!options?.[option]) failures.push('LABELS.' + locale + '.languageOptions.' + option + ' is missing')
  }
}

const spanishRoutes = [
  ['es/index.html', 'https://www.ummix.com.br/es/', '/src/main.jsx'],
  ['es/cashback.html', 'https://www.ummix.com.br/es/cashback', '/src/pages/cashback/main.jsx'],
  ['es/partner.html', 'https://www.ummix.com.br/es/partner', '/src/pages/partner/main.jsx'],
  ['es/monetize.html', 'https://www.ummix.com.br/es/monetize', '/src/pages/monetize-main.jsx'],
  ['es/investidores.html', 'https://www.ummix.com.br/es/investidores', '/src/pages/investidores/main.jsx'],
]

for (const [relativePath, canonical, entrypoint] of spanishRoutes) {
  const filePath = resolve(root, relativePath)
  if (!existsSync(filePath)) {
    failures.push(relativePath + ' is missing')
    continue
  }

  const html = readFileSync(filePath, 'utf8')
  if (!html.includes('<html lang="es">')) failures.push(relativePath + ' must declare lang="es"')
  if (!html.includes('<link rel="canonical" href="' + canonical + '"')) failures.push(relativePath + ' has the wrong canonical')
  if (!html.includes('src="' + entrypoint + '"')) failures.push(relativePath + ' has the wrong entrypoint')
  for (const hreflang of ['pt-BR', 'en', 'es']) {
    if (!html.includes('hreflang="' + hreflang + '"')) failures.push(relativePath + ' is missing hreflang ' + hreflang)
  }
}

if (failures.length) {
  console.error('Spanish route and locale checks failed:')
  failures.forEach((failure) => console.error('- ' + failure))
  process.exitCode = 1
} else {
  console.log('Spanish route and locale checks passed')
}

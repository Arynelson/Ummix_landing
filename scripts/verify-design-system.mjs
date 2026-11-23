#!/usr/bin/env node
// Verifica as regras do design system oficial e do posicionamento comercial.
// Contrato: specs/001-design-system-ummix/contracts/verify-design-system.md

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const root = process.cwd()
const withDist = process.argv.includes('--dist')
const rel = (p) => relative(root, p).split(sep).join('/')

function walk(dir, exts, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, exts, out)
    else if (exts.some((e) => name.endsWith(e))) out.push(full)
  }
  return out
}

const HTML_PAGES = [
  'index.html', 'cashback.html', 'partner.html', 'monetize.html', 'investidores.html', 'premios.html',
  ...['en', 'es'].flatMap((l) => ['index', 'cashback', 'partner', 'monetize', 'investidores', 'premios'].map((p) => `${l}/${p}.html`)),
  'lp/campanha.html',
].map((p) => join(root, p))

const srcFiles = walk(join(root, 'src'), ['.js', '.jsx', '.css'])
const notDs = (f) => !rel(f).startsWith('src/ds/')
const textFiles = [
  ...srcFiles.filter((f) => /-copy\.js$|awards-page-data\.js$|\.jsx$/.test(f) && notDs(f)),
  ...HTML_PAGES,
  join(root, 'public/llms.txt'),
  join(root, 'public/sitemap.xml'),
]
const distFiles = withDist ? walk(join(root, 'dist'), ['.html', '.css']) : []

const violations = []
const scanned = new Set()

function check(rule, files, patterns, { allow } = {}) {
  for (const file of files) {
    if (!existsSync(file)) continue
    scanned.add(file)
    const lines = readFileSync(file, 'utf8').split(/\r?\n/)
    lines.forEach((line, i) => {
      if (allow && line.includes(allow)) return
      for (const re of patterns) {
        const m = line.match(re)
        if (m) {
          violations.push(`${rel(file)}:${i + 1}  ${rule}  ${m[0].slice(0, 60)}`)
          break
        }
      }
    })
  }
}

// CT-01
check('old-tokens', srcFiles.filter(notDs), [/#9b191a/i, /#7a1415/i, /#1e1e1e/i, /#f4f2f2/i, /ummix-(red|dark|gray|grafite)/, /--ummix-/])
check('loose-hex', srcFiles.filter(notDs), [/#(?!fff\b|ffffff\b)[0-9a-f]{6}\b|#(?!fff\b)[0-9a-f]{3}\b(?![0-9a-f])/i], { allow: 'ds-allow: hex' })

// CT-02
check('old-fonts', [...HTML_PAGES, ...srcFiles, ...distFiles], [/Baloo/i, /Plus[ +]Jakarta/i])
for (const page of HTML_PAGES) {
  if (!existsSync(page)) { violations.push(`${rel(page)}:0  new-fonts  arquivo ausente`); continue }
  const html = readFileSync(page, 'utf8')
  for (const fam of ['Poppins', 'IBM+Plex+Sans', 'IBM+Plex+Mono']) {
    if (!html.includes(fam)) violations.push(`${rel(page)}:0  new-fonts  falta ${fam}`)
  }
}

// CT-03
// src/ds/tokens define --glow-red (cópia oficial) mas o site não pode usá-lo: a definição é ignorada, o uso não.
check('glow-gradient', srcFiles.filter((f) => !rel(f).startsWith('src/ds/tokens/')), [
  /redPulse/, /pulse-ring/, /arc-dot/, /--glow-red/, /linear-gradient\(/, /radial-gradient\(/, /conic-gradient\(/,
  /bg-gradient-/, /bg-linear-/, /bg-radial-/,
], { allow: 'ds-allow: overlay' })

// CT-05
check('external-import', srcFiles, [/from\s+['"][^'"]*(Oraculo|design-system\/ummix-ads-design|[A-Za-z]:[\\/])/, /import\s+['"][^'"]*(Oraculo|design-system\/ummix-ads-design)/])
const readme = join(root, 'src/ds/README.md')
if (!existsSync(readme)) violations.push('src/ds/README.md:0  ds-readme  arquivo ausente')
else {
  const txt = readFileSync(readme, 'utf8')
  if (!txt.includes('Origem:') || !txt.includes('Copiado em:')) violations.push('src/ds/README.md:0  ds-readme  faltam "Origem:" ou "Copiado em:"')
}

// CT-10
check('forbidden-terms', textFiles, [
  /\bOOH\b/, /out-of-home/i, /out of home/i, /outdoor/i, /m[íi]dia exterior/i, /publicidad exterior/i, /medios exteriores/i, /v[íi]a p[úu]blica/i, /billboard/i,
  /\bimpresso/i, /\bjornal\b/i, /\brevista\b/i, /newspaper/i,
  /pesquisas? pr[óo]pria/i, /a cada 120 dias/i, /every 120 days/i, /cada 120 d[íi]as/i, /em Goi[âa]nia/i,
])
check('offline-media', textFiles, [/m[íi]dia off(line)?(?![a-z])/i, /offline media/i, /\bmedia off(?![a-z])/i, /medios? off(line)?(?![a-z])/i], { allow: 'ds-allow: offline-vs-digital' })

// CT-12
check('awards-top-n', [join(root, 'src/pages/awards/awards-page-data.js')], [/4º lugar/i, /4\.º lugar/i, /4th place/i, /4\.º puesto/i])

if (violations.length) {
  console.error(violations.join('\n'))
  console.error(`\nverify-design-system: ${violations.length} violações em ${scanned.size} arquivos (10 regras)`)
  process.exit(1)
}
console.log(`verify-design-system: 0 violações em ${scanned.size} arquivos (10 regras)`)

#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'

const outputDir = resolve(process.cwd(), process.argv[2] || 'dist')

if (!existsSync(outputDir) || !statSync(outputDir).isDirectory()) {
  console.error(`Build output directory not found: ${outputDir}`)
  process.exit(1)
}

function collectHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name)
    if (entry.isDirectory()) return collectHtmlFiles(entryPath)
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : []
  })
}

const htmlFiles = collectHtmlFiles(outputDir)
const assetPattern = /\/assets\/([^"'?\s>]+)/g
const missingAssets = []
let checkedReferences = 0

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, 'utf8')
  assetPattern.lastIndex = 0

  for (let match = assetPattern.exec(html); match; match = assetPattern.exec(html)) {
    const assetName = decodeURIComponent(match[1])
    const assetPath = resolve(outputDir, 'assets', assetName)
    const relativeAssetPath = relative(outputDir, assetPath)
    const isOutsideBuild = relativeAssetPath === '..' || relativeAssetPath.startsWith(`..${sep}`)

    checkedReferences += 1
    if (isOutsideBuild || !existsSync(assetPath) || !statSync(assetPath).isFile()) {
      missingAssets.push({
        html: relative(outputDir, htmlFile),
        asset: `/assets/${assetName}`,
      })
    }
  }
}

if (missingAssets.length > 0) {
  console.error(`Missing build assets: ${missingAssets.length}`)
  for (const missing of missingAssets) {
    console.error(`- ${missing.html} -> ${missing.asset}`)
  }
  process.exit(1)
}

console.log(`Build asset references verified: ${checkedReferences} references across ${htmlFiles.length} HTML files.`)

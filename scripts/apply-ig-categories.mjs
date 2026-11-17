/**
 * Apply categories/titles from IG import JSON into build-gallery-data.mjs
 * then rebuild galleryData.ts
 */
import fs from 'fs'
import { spawnSync } from 'child_process'

const importedPath = '_media_extract/instagram/all-posts-imported.json'
const imported = fs.existsSync(importedPath)
  ? JSON.parse(fs.readFileSync(importedPath, 'utf8'))
  : []

const buildPath = 'scripts/build-gallery-data.mjs'
let src = fs.readFileSync(buildPath, 'utf8')

const catObj = {}
const titleObj = {}
for (const it of imported) {
  catObj[it.index] = it.category || 'Pre-Wedding'
  titleObj[it.index] = String(it.title || it.category || 'Photo').slice(0, 80)
}

const assignBlock = `
// === IG_IMPORT_ASSIGN ===
Object.assign(categoryByIndex, ${JSON.stringify(catObj, null, 2)})
Object.assign(titles, ${JSON.stringify(titleObj, null, 2)})
// === END_IG_IMPORT_ASSIGN ===
`

if (src.includes('// === IG_IMPORT_ASSIGN ===')) {
  src = src.replace(
    /\/\/ === IG_IMPORT_ASSIGN ===[\s\S]*?\/\/ === END_IG_IMPORT_ASSIGN ===/,
    assignBlock.trim(),
  )
} else {
  // Place after titles object closes — before locations
  if (!src.includes('const locations = {')) throw new Error('locations marker missing')
  src = src.replace('const locations = {', `${assignBlock}\nconst locations = {`)
}

// Widen auto-fill so new pIDs without explicit cat still appear
const maxIdx = Math.max(
  500,
  ...imported.map((x) => Number(x.index) || 0),
  ...Object.keys(catObj).map(Number),
)
src = src.replace(
  /for \(let i = 123; i <= \d+; i\+\+\) \{\s*\n?\s*if \(categoryByIndex\[i\] == null\) categoryByIndex\[i\] = '[^']+'\s*\n?\}/,
  `for (let i = 123; i <= ${maxIdx}; i++) {\n  if (categoryByIndex[i] == null) categoryByIndex[i] = 'Pre-Wedding'\n}`,
)

fs.writeFileSync(buildPath, src)
console.log('patched', imported.length, 'import assignments')

const r = spawnSync('node', ['scripts/build-gallery-data.mjs'], {
  stdio: 'inherit',
  shell: true,
})
process.exit(r.status ?? 1)

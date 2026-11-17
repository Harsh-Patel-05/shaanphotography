import fs from 'fs'

const files = fs
  .readdirSync('public/media/photos')
  .filter((f) => f.endsWith('.jpg') && f.includes('-ig-'))

// Use galleryData categories
const g = fs.readFileSync('src/data/galleryData.ts', 'utf8')
const weddingIds = new Set(
  [...g.matchAll(/"id": "(p\d+)"[\s\S]*?"category": "Wedding"/g)].map((m) => m[1]),
)

const counts = {}
for (const f of files) {
  const id = f.match(/^(p\d+)/)?.[1]
  if (!id || !weddingIds.has(id)) continue
  const post = f.toLowerCase().match(/-ig-([a-z0-9_-]+)-/)?.[1]
  if (!post || post === 'hv-wed') continue
  counts[post] = (counts[post] || 0) + 1
}

const singles = Object.entries(counts)
  .filter(([, n]) => n === 1)
  .map(([k]) => k)
const multi = Object.entries(counts)
  .filter(([, n]) => n > 1)
  .sort((a, b) => b[1] - a[1])

console.log('wedding singles', singles.length)
console.log('wedding multi', multi.length, multi.slice(0, 10))
fs.writeFileSync(
  '_media_extract/instagram/wedding-singles.json',
  JSON.stringify(singles, null, 2),
)

// Prefer recent shortcodes (start with D) first
const priority = singles
  .filter((s) => s.startsWith('d'))
  .concat(singles.filter((s) => !s.startsWith('d')))
fs.writeFileSync(
  '_media_extract/instagram/wedding-singles-priority.json',
  JSON.stringify(priority, null, 2),
)
console.log('priority head', priority.slice(0, 25).join(','))

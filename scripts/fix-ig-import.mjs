import fs from 'fs'
import path from 'path'

const OUT = 'public/media/photos'
const meta = [
  { old: 'p-Infinity-ig-2026-10-31.jpg.jpg', category: 'Pre-Wedding', title: 'Udaipur Steps', location: 'Udaipur' },
  { old: 'p-Infinity-ig-2026-10-25.jpg.jpg', category: 'Wedding', title: 'Smoke Walk' },
  { old: 'p-Infinity-ig-2026-10-11.jpg.jpg', category: 'Pre-Wedding', title: 'Fairway Light' },
  { old: 'p-Infinity-ig-2026-09-26.jpg.jpg', category: 'Pre-Wedding', title: 'Forest Rails' },
  { old: 'p-Infinity-ig-2026-09-15.jpg.jpg', category: 'Pre-Wedding', title: 'Taj Twirl', location: 'Mumbai' },
  { old: 'p-Infinity-ig-2026-08-12.jpg.jpg', category: 'Events', title: 'Haldi Embrace' },
  { old: 'p-Infinity-ig-2026-04-27.jpg.jpg', category: 'Wedding', title: 'Aisle Petals' },
]

const existing = fs
  .readdirSync(OUT)
  .filter((f) => /^p\d+/.test(f))
  .map((f) => Number(f.match(/^p(\d+)/)[1]))
let next = Math.max(0, ...existing) + 1
const results = []

for (const item of meta) {
  const idNum = next++
  const id = `p${String(idNum).padStart(3, '0')}`
  const slug = item.old
    .replace(/^p-Infinity-/, '')
    .replace(/\.jpg\.jpg$/i, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase()
  const outName = `${id}-${slug}.jpg`
  const from = path.join(OUT, item.old)
  const to = path.join(OUT, outName)
  if (!fs.existsSync(from)) {
    console.log('missing', item.old)
    continue
  }
  fs.renameSync(from, to)
  results.push({
    id,
    idNum,
    outName,
    category: item.category,
    title: item.title,
    location: item.location,
    src: `/media/photos/${outName}`,
  })
  console.log('renamed', outName, item.category)
}

fs.writeFileSync('_media_extract/instagram-imported.json', JSON.stringify(results, null, 2))
console.log('done', results.length)

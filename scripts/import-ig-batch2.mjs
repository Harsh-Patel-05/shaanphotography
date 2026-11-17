import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import crypto from 'crypto'

const SRC = '_media_extract/instagram/batch2'
const OUT = 'public/media/photos'

/** Only unique frames — skip near-dups of existing bridal/BW/sangeet already in library. */
const META = [
  { file: 'ig-2026-07-01.jpg', category: 'Portrait', title: 'Little Sage' },
  { file: 'ig-2026-06-30.jpg', category: 'Maternity', title: 'Under the Tree' },
  {
    file: 'ig-2026-04-20.jpg',
    category: 'Couple Photography',
    title: 'Gunjan & Nisarg',
  },
  { file: 'ig-2026-03-17.jpg', category: 'Events', title: "Reema's Haldi" },
  { file: 'ig-2026-03-05.jpg', category: 'Events', title: 'Mehndi Hands' },
]

function phash(buf) {
  return crypto.createHash('md5').update(buf).digest('hex')
}

const existingFiles = fs.readdirSync(OUT).filter((f) => f.endsWith('.jpg'))
const existingHashes = new Set()
for (const f of existingFiles) {
  const thumb = await sharp(path.join(OUT, f))
    .resize(16, 16, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer()
  existingHashes.add(phash(thumb))
}

const nums = existingFiles
  .map((f) => Number(f.match(/^p(\d+)/)?.[1]))
  .filter((n) => Number.isFinite(n))
let next = Math.max(0, ...nums) + 1
const results = []

for (const item of META) {
  const abs = path.join(SRC, item.file)
  if (!fs.existsSync(abs)) {
    console.log('missing', item.file)
    continue
  }
  const thumb = await sharp(abs, { failOn: 'none' })
    .resize(16, 16, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer()
  const h = phash(thumb)
  if (existingHashes.has(h)) {
    console.log('skip exact-dup', item.file)
    continue
  }

  const id = `p${String(next).padStart(3, '0')}`
  const outName = `${id}-${item.file.replace(/\.jpg$/i, '')}.jpg`
  const img = sharp(abs, { failOn: 'none' }).rotate()
  const meta = await img.metadata()
  const w = meta.width ?? 1
  const hgt = meta.height ?? 1
  const ratio = w / hgt
  let orientation = 'landscape'
  if (ratio < 0.85) orientation = 'portrait'
  else if (ratio > 0.9 && ratio < 1.1) orientation = 'square'

  await img
    .resize({
      width: orientation === 'portrait' ? 1200 : 1600,
      height: orientation === 'portrait' ? 1600 : 1200,
      fit: 'inside',
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(OUT, outName))

  existingHashes.add(h)
  results.push({
    id,
    idNum: next,
    outName,
    category: item.category,
    title: item.title,
    orientation,
    src: `/media/photos/${outName}`,
  })
  console.log('import', id, item.category, item.title)
  next++
}

fs.writeFileSync(
  '_media_extract/instagram-batch2-imported.json',
  JSON.stringify(results, null, 2),
)
console.log('done', results.length)

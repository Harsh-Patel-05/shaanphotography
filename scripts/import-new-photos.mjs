import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const SRC = path.resolve('_media_extract/shaan-new-photos')
const OUT = path.resolve('public/media/photos')
const unique = JSON.parse(
  fs.readFileSync('_media_extract/shaan-new-unique.json', 'utf8'),
)

/** Skip low-quality WhatsApp copies of DSC originals already in the set. */
const SKIP = new Set([
  'WhatsApp Image 2026-11-17 at 3.11.07 PM.jpeg', // dup of DSC03076
  'WhatsApp Image 2026-11-17 at 3.11.08 PM.jpeg', // dup of DSC03086
  'WhatsApp Image 2026-11-17 at 3.11.11 PM.jpeg', // tiny 61KB, unusable
])

/**
 * Visual categories (reviewed from thumbs).
 * Almost all are wedding-day bridal / ceremony / baraat / reception.
 * One guest portrait → Portrait.
 */
const META = {
  'DSC000047.JPG.jpeg': { category: 'Wedding', title: 'Bridal Glow' },
  'DSC000109.JPG.jpeg': { category: 'Wedding', title: 'Veil & Palms' },
  'DSC00113.JPG.jpeg': { category: 'Wedding', title: 'Bridal Entrance' },
  'DSC00134.JPG.jpeg': { category: 'Wedding', title: 'Petal Celebration' },
  'DSC00141.JPG.jpeg': { category: 'Wedding', title: 'Spark & Roses' },
  'DSC00205.JPG.jpeg': { category: 'Wedding', title: 'Garden Veil' },
  'DSC00208.JPG.jpeg': { category: 'Wedding', title: 'Red Veil Portrait' },
  'DSC00424.JPG.jpeg': { category: 'Wedding', title: 'Bridal Gaze' },
  'DSC00607.JPG.jpeg': { category: 'Wedding', title: 'Camel Dupatta' },
  'DSC00654.JPG.jpeg': { category: 'Wedding', title: 'Mother & Bride' },
  'DSC00817.JPG.jpeg': { category: 'Wedding', title: 'Garden Twirl' },
  'DSC00835.JPG.jpeg': { category: 'Wedding', title: 'Bride & Pup' },
  'DSC01047.JPG.jpeg': { category: 'Wedding', title: 'Couple Portrait' },
  'DSC03076.JPG.jpeg': { category: 'Wedding', title: 'Reception Light' },
  'DSC03086.JPG.jpeg': { category: 'Wedding', title: 'Evening Glance' },
  'DSC03194.JPG.jpeg': { category: 'Wedding', title: 'String Lights' },
  'DSC03205.JPG.jpeg': { category: 'Wedding', title: 'Garden Chandelier' },
  'DSC04829.JPG.jpeg': { category: 'Wedding', title: 'Quiet Profile' },
  'DSC04889.JPG.jpeg': { category: 'Wedding', title: 'Motion Circle' },
  'DSC04904.JPG.jpeg': { category: 'Wedding', title: 'Bridal Party' },
  'DSC05008.JPG.jpeg': { category: 'Wedding', title: 'Veil Frame' },
  'DSC05037.JPG.jpeg': { category: 'Wedding', title: 'Motion Study' },
  'DSC05950.JPG.jpeg': { category: 'Wedding', title: 'Floral Frame' },
  'DSC06047.JPG.jpeg': { category: 'Wedding', title: 'Ceremony Seats' },
  'DSC07023.JPG.jpeg': { category: 'Wedding', title: 'Archway Bride' },
  'DSC07925.JPG.jpeg': { category: 'Wedding', title: 'First Dance' },
  'DSC08068.JPG.jpeg': { category: 'Wedding', title: 'Sunlit Stair' },
  'DSC09658.JPG.jpeg': { category: 'Wedding', title: 'Vintage Baraat' },
  'DSC09728.JPG.jpeg': { category: 'Wedding', title: 'Gold Details' },
  'DSC09872.JPG.jpeg': { category: 'Wedding', title: 'Getting Ready' },
  'WhatsApp Image 2026-11-17 at 3.11.05 PM.jpeg': {
    category: 'Wedding',
    title: 'Through the Veil',
  },
  'WhatsApp Image 2026-11-17 at 3.11.06 PM.jpeg': {
    category: 'Portrait',
    title: 'Warm Smile',
  },
  'WhatsApp Image 2026-11-17 at 3.11.09 PM.jpeg': {
    category: 'Wedding',
    title: 'Golden Walk',
  },
  'WhatsApp Image 2026-11-17 at 3.11.10 PM.jpeg': {
    category: 'Wedding',
    title: 'Soft Close',
  },
  'WhatsApp Image 2026-11-17 at 3.11.12 PM.jpeg': {
    category: 'Wedding',
    title: 'Joyful Glance',
  },
  'WhatsApp Image 2026-11-17 at 3.11.13 PM.jpeg': {
    category: 'Wedding',
    title: 'Light Trails',
  },
  'WhatsApp Image 2026-11-171 at 3.11.10 PM.jpeg': {
    category: 'Wedding',
    title: 'Red Frame',
  },
  'edited  (37).JPG.jpeg': { category: 'Wedding', title: 'Ritual Moment' },
  'edited  (53).JPG.jpeg': { category: 'Wedding', title: 'Temple Walk' },
}

function slugify(name) {
  return name
    .replace(/\.(jpe?g|png|webp)+$/i, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 40)
}

const existing = fs
  .readdirSync(OUT)
  .filter((f) => /^p\d+/.test(f))
  .map((f) => Number(f.match(/^p(\d+)/)[1]))
const startId = Math.max(0, ...existing) + 1

const toImport = unique.filter((f) => !SKIP.has(f) && META[f])
const results = []

for (let i = 0; i < toImport.length; i++) {
  const file = toImport[i]
  const idNum = startId + i
  const id = `p${String(idNum).padStart(3, '0')}`
  const outName = `${id}-${slugify(file)}.jpg`
  const abs = path.join(SRC, file)
  const outPath = path.join(OUT, outName)
  const { category, title } = META[file]

  const img = sharp(abs, { failOn: 'none' }).rotate()
  const meta = await img.metadata()
  const w = meta.width ?? 1
  const h = meta.height ?? 1
  const ratio = w / h
  let orientation = 'landscape'
  if (ratio < 0.85) orientation = 'portrait'
  else if (ratio > 0.9 && ratio < 1.1) orientation = 'square'

  await img
    .resize({
      width: orientation === 'portrait' ? 1400 : 1920,
      height: orientation === 'portrait' ? 1920 : 1400,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath)

  results.push({ id, idNum, outName, category, title, orientation, src: `/media/photos/${outName}` })
  console.log(`[${i + 1}/${toImport.length}] ${id} ${category} ← ${file}`)
}

fs.writeFileSync(
  '_media_extract/shaan-new-imported.json',
  JSON.stringify(results, null, 2),
)
console.log(`Imported ${results.length} photos starting at p${String(startId).padStart(3, '0')}`)

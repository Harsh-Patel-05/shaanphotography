import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { URL } from 'url'
import sharp from 'sharp'
import crypto from 'crypto'

const OUT = 'public/media/photos'
const TMP = '_media_extract/instagram/wedding-carousel'
fs.mkdirSync(TMP, { recursive: true })
const items = JSON.parse(
  fs.readFileSync('_media_extract/instagram/wedding-carousel.json', 'utf8'),
)

function fetchBuf(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Referer: 'https://www.instagram.com/',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchBuf(res.headers.location).then(resolve, reject)
        }
        if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode))
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      },
    )
    req.on('error', reject)
  })
}

function phash(buf) {
  return crypto.createHash('md5').update(buf).digest('hex')
}

const existing = fs.readdirSync(OUT).filter((f) => f.endsWith('.jpg'))
const hashes = new Set()
for (const f of existing) {
  const t = await sharp(path.join(OUT, f))
    .resize(16, 16, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer()
  hashes.add(phash(t))
}
const nums = existing
  .map((f) => Number(f.match(/^p(\d+)/)?.[1]))
  .filter((n) => Number.isFinite(n))
let next = Math.max(0, ...nums) + 1
const results = []
const titles = [
  'Mandap Glow',
  'Varmala Moment',
  'Ritual Hands',
  'Bride Portrait',
  'Groom Portrait',
  'Family Blessing',
  'Procession Walk',
  'Quiet Glance',
  'Ceremony Light',
  'Floral Frame',
  'Guest Joy',
  'Sacred Fire',
  'Couple Embrace',
  'Evening Dance',
  'Detail Shot',
  'Laughing Together',
  'Exit Sparks',
  'Reception Frame',
  'Final Look',
]

for (let i = 0; i < items.length; i++) {
  const item = items[i]
  const rawPath = path.join(TMP, `${item.key}.jpg`)
  try {
    if (!fs.existsSync(rawPath)) {
      const buf = await fetchBuf(item.src)
      fs.writeFileSync(rawPath, buf)
      console.log('dl', item.key, buf.length)
    }
  } catch (e) {
    console.log('fail dl', item.key, e.message)
    continue
  }

  const thumb = await sharp(rawPath, { failOn: 'none' })
    .resize(16, 16, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer()
  const h = phash(thumb)
  if (hashes.has(h)) {
    console.log('skip dup', item.key)
    continue
  }

  const id = `p${String(next).padStart(3, '0')}`
  const outName = `${id}-ig-hv-wed-${String(i + 1).padStart(2, '0')}.jpg`
  const img = sharp(rawPath, { failOn: 'none' }).rotate()
  const meta = await img.metadata()
  const w = meta.width ?? 1
  const ht = meta.height ?? 1
  const ratio = w / ht
  let orientation = 'landscape'
  if (ratio < 0.85) orientation = 'portrait'
  else if (ratio > 0.9 && ratio < 1.1) orientation = 'square'

  await img
    .resize({
      width: orientation === 'portrait' ? 1400 : 1800,
      height: orientation === 'portrait' ? 1800 : 1400,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(OUT, outName))

  hashes.add(h)
  const title = titles[i] ?? `Wedding Frame ${i + 1}`
  results.push({
    id,
    idNum: next,
    outName,
    category: 'Wedding',
    title,
    orientation,
    location: 'Ujjain',
    src: `/media/photos/${outName}`,
  })
  console.log('import', id, title)
  next++
}

fs.writeFileSync(
  '_media_extract/instagram-wedding-imported.json',
  JSON.stringify(results, null, 2),
)
console.log('done', results.length)

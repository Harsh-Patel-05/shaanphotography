/**
 * Import from _media_extract/instagram/all-posts-batch.json
 * [{ post, couple?, category, urls: string[] }]
 * Skips exact + near-duplicates (dHash).
 */
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import sharp from 'sharp'

const OUT = 'public/media/photos'
const JSON_PATH = '_media_extract/instagram/all-posts-batch.json'
const THRESHOLD = 6

fs.mkdirSync(OUT, { recursive: true })
const batches = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'))

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

async function dhashBuf(buf) {
  const raw = await sharp(buf)
    .resize(9, 8, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer()
  let bits = ''
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      bits += raw[row * 9 + col] < raw[row * 9 + col + 1] ? '1' : '0'
    }
  }
  return BigInt('0b' + bits)
}

function hamming(a, b) {
  let x = a ^ b
  let n = 0
  while (x) {
    n += Number(x & 1n)
    x >>= 1n
  }
  return n
}

const existing = fs.readdirSync(OUT).filter((f) => f.endsWith('.jpg'))
const hashes = []
for (const f of existing) {
  const buf = await sharp(path.join(OUT, f)).jpeg().toBuffer()
  hashes.push(await dhashBuf(buf))
}
const nums = existing
  .map((f) => Number(f.match(/^p(\d+)/)?.[1]))
  .filter((n) => Number.isFinite(n))
let next = Math.max(0, ...nums) + 1

const imported = []
for (const batch of batches) {
  let i = 0
  for (const url of batch.urls || []) {
    i += 1
    try {
      const buf = await fetchBuf(url)
      const h = await dhashBuf(buf)
      if (hashes.some((x) => hamming(x, h) <= THRESHOLD)) {
        console.log('skip dup', batch.post, i)
        continue
      }
      hashes.push(h)
      const id = `p${String(next).padStart(3, '0')}`
      next += 1
      const slug = `${id}-ig-${batch.post.toLowerCase()}-${String(i).padStart(2, '0')}.jpg`
      await sharp(buf).rotate().jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(OUT, slug))
      const title =
        batch.titles?.[i - 1] ||
        `${batch.couple || batch.post} ${String(i).padStart(2, '0')}`
      imported.push({
        index: Number(id.slice(1)),
        id,
        file: slug,
        category: batch.category || 'Wedding',
        title,
        post: batch.post,
      })
      console.log('import', id, title, batch.category || 'Wedding')
    } catch (e) {
      console.log('fail', batch.post, i, e.message)
    }
  }
}

fs.writeFileSync(
  '_media_extract/instagram/all-posts-imported.json',
  JSON.stringify(imported, null, 2),
)
console.log('done', imported.length)

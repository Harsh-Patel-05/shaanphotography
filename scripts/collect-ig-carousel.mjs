/**
 * Helper: given a list of {post, couple, category, urls}, write JSON for import.
 * Collection itself is done via browser CDP; this just merges + imports.
 */
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import sharp from 'sharp'
import crypto from 'crypto'

const OUT = 'public/media/photos'
const TMP = '_media_extract/instagram/wedding-batch2'
const JSON_PATH = '_media_extract/instagram/wedding-batch2.json'

fs.mkdirSync(TMP, { recursive: true })
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

const imported = []
for (const batch of batches) {
  let i = 0
  for (const url of batch.urls) {
    i += 1
    try {
      const buf = await fetchBuf(url)
      const thumb = await sharp(buf)
        .resize(16, 16, { fit: 'fill' })
        .greyscale()
        .raw()
        .toBuffer()
      const h = phash(thumb)
      if (hashes.has(h)) {
        console.log('skip dup', batch.post, i)
        continue
      }
      hashes.add(h)
      const id = `p${String(next).padStart(3, '0')}`
      next += 1
      const slug = `${id}-ig-${batch.post.toLowerCase()}-${String(i).padStart(2, '0')}.jpg`
      const outPath = path.join(OUT, slug)
      await sharp(buf)
        .rotate()
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(outPath)
      const title =
        batch.titles?.[i - 1] ||
        `${batch.couple || 'Wedding'} ${String(i).padStart(2, '0')}`
      imported.push({
        index: Number(id.slice(1)),
        id,
        file: slug,
        category: batch.category || 'Wedding',
        title,
        post: batch.post,
      })
      console.log('import', id, title)
    } catch (e) {
      console.log('fail', batch.post, i, e.message)
    }
  }
}

fs.writeFileSync(
  path.join(TMP, 'imported.json'),
  JSON.stringify(imported, null, 2),
)
console.log('done', imported.length)

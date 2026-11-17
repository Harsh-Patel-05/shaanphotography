import fs from 'fs'
import sharp from 'sharp'
import crypto from 'crypto'

const files = fs.readdirSync('public/media/photos').filter((f) => f.endsWith('.jpg'))
const hashes = new Map()
let dups = 0
for (const f of files) {
  const t = await sharp('public/media/photos/' + f)
    .resize(16, 16, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer()
  const h = crypto.createHash('md5').update(t).digest('hex')
  if (hashes.has(h)) {
    dups++
    console.log('dup', hashes.get(h), f)
  } else hashes.set(h, f)
}
console.log('photos', files.length, 'unique', hashes.size, 'dups', dups)
const g = fs.readFileSync('src/data/galleryData.ts', 'utf8')
const wed = (g.match(/"category": "Wedding"/g) || []).length
console.log('gallery wedding entries', wed)

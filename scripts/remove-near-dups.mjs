/**
 * Remove near-duplicate photos (dHash Hamming distance <= threshold).
 * Keeps the lowest p-number (older) file; deletes later duplicates.
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const OUT = 'public/media/photos'
const THRESHOLD = 6

async function dhash(file) {
  const raw = await sharp(path.join(OUT, file))
    .resize(9, 8, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer()
  let bits = ''
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const left = raw[row * 9 + col]
      const right = raw[row * 9 + col + 1]
      bits += left < right ? '1' : '0'
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

const files = fs
  .readdirSync(OUT)
  .filter((f) => f.endsWith('.jpg'))
  .sort((a, b) => {
    const na = Number(a.match(/^p(\d+)/)?.[1] || 0)
    const nb = Number(b.match(/^p(\d+)/)?.[1] || 0)
    return na - nb
  })

const hashes = []
for (const f of files) {
  hashes.push({ f, h: await dhash(f) })
}

const removed = []
const keep = []
for (const item of hashes) {
  const near = keep.find((k) => hamming(k.h, item.h) <= THRESHOLD)
  if (near) {
    fs.unlinkSync(path.join(OUT, item.f))
    removed.push({ removed: item.f, kept: near.f })
    console.log('remove', item.f, '≈', near.f)
  } else {
    keep.push(item)
  }
}

console.log('kept', keep.length, 'removed', removed.length)
fs.writeFileSync(
  '_media_extract/instagram/near-dups-removed.json',
  JSON.stringify(removed, null, 2),
)

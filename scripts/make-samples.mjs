import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const SRC = path.resolve('_media_extract/shaan photography photos & videos')
const OUT = path.resolve('_samples')
fs.mkdirSync(OUT, { recursive: true })

const files = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f)).sort()

for (let i = 0; i < files.length; i++) {
  const file = files[i]
  const dest = path.join(OUT, `${String(i + 1).padStart(3, '0')}.jpg`)
  await sharp(path.join(SRC, file), { failOn: 'none' })
    .rotate()
    .resize(640, 640, { fit: 'inside' })
    .jpeg({ quality: 65 })
    .toFile(dest)
}
console.log(`Wrote ${files.length} samples`)
fs.writeFileSync(
  path.join(OUT, 'map.json'),
  JSON.stringify(
    files.map((f, i) => ({ i: i + 1, file: f, sample: `${String(i + 1).padStart(3, '0')}.jpg` })),
    null,
    2,
  ),
)

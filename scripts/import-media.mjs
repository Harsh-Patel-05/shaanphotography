import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import sharp from 'sharp'

const SRC = path.resolve('_media_extract/shaan photography photos & videos')
const OUT_PHOTOS = path.resolve('public/media/photos')
const OUT_VIDEOS = path.resolve('public/media/videos')
const OUT_POSTERS = path.resolve('public/media/posters')

fs.mkdirSync(OUT_PHOTOS, { recursive: true })
fs.mkdirSync(OUT_VIDEOS, { recursive: true })
fs.mkdirSync(OUT_POSTERS, { recursive: true })

function slugify(name) {
  return name
    .replace(/\.(jpe?g|png|webp|mp4|mov)$/i, '')
    .replace(/copy/gi, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

const files = fs.readdirSync(SRC)
const photos = files.filter((f) => /\.jpe?g$/i.test(f))
const videos = files.filter((f) => /\.mp4$/i.test(f))

console.log(`Photos: ${photos.length}, Videos: ${videos.length}`)

const gallery = []

for (let i = 0; i < photos.length; i++) {
  const file = photos[i]
  const id = `p${String(i + 1).padStart(3, '0')}`
  const outName = `${id}-${slugify(file)}.jpg`
  const outPath = path.join(OUT_PHOTOS, outName)
  const abs = path.join(SRC, file)

  try {
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

    const outMeta = await sharp(outPath).metadata()
    gallery.push({
      id,
      src: `/media/photos/${outName}`,
      alt: `Shaan Photography — ${file.replace(/\.(jpe?g)+$/i, '')}`,
      orientation,
      width: outMeta.width,
      height: outMeta.height,
      sourceFile: file,
    })
    console.log(`[${i + 1}/${photos.length}] ${outName} (${orientation})`)
  } catch (err) {
    console.error('FAIL', file, err.message)
  }
}

// Compress videos for web
const videoMap = []
for (const file of videos) {
  const base = slugify(file)
  const outName = `${base}.mp4`
  const posterName = `${base}.jpg`
  const inPath = path.join(SRC, file)
  const outPath = path.join(OUT_VIDEOS, outName)
  const posterPath = path.join(OUT_POSTERS, posterName)

  console.log(`Compressing video: ${file}`)
  try {
    execFileSync(
      'ffmpeg',
      [
        '-y',
        '-i',
        inPath,
        '-vf',
        'scale=1920:-2',
        '-c:v',
        'libx264',
        '-preset',
        'medium',
        '-crf',
        '28',
        '-movflags',
        '+faststart',
        '-an',
        outPath,
      ],
      { stdio: 'inherit' },
    )

    execFileSync(
      'ffmpeg',
      ['-y', '-ss', '00:00:02', '-i', outPath, '-frames:v', '1', '-q:v', '3', posterPath],
      { stdio: 'inherit' },
    )

    const sizeMb = (fs.statSync(outPath).size / (1024 * 1024)).toFixed(1)
    videoMap.push({
      id: base,
      src: `/media/videos/${outName}`,
      poster: `/media/posters/${posterName}`,
      title: file.replace(/\.mp4$/i, ''),
      sizeMb: Number(sizeMb),
    })
    console.log(`Video done: ${outName} (${sizeMb} MB)`)
  } catch (err) {
    console.error('VIDEO FAIL', file, err.message)
  }
}

fs.writeFileSync(
  path.resolve('src/data/mediaManifest.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), gallery, videos: videoMap }, null, 2),
)

console.log('\nDone.')
console.log(`Gallery items: ${gallery.length}`)
console.log(`Videos: ${videoMap.length}`)

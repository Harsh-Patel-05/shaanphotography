import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

const SRC = path.resolve('_media_extract/shaan photography photos & videos')
const OUT_VIDEOS = path.resolve('public/media/videos')
const OUT_POSTERS = path.resolve('public/media/posters')
fs.mkdirSync(OUT_VIDEOS, { recursive: true })
fs.mkdirSync(OUT_POSTERS, { recursive: true })

function slugify(name) {
  return name
    .replace(/\.mp4$/i, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

const videos = [
  'aryan & vishwa save the date.mp4', // shortest — hero first
  'AANGI WED TEASER.mp4',
  'HARDIK & VISHAKHA WEDDING TEASER BY SHAAN PHOTOGRAPHY.mp4',
  '001 KARAN & AANGI SAVE THE DATE.mp4',
  'KARAN & AANGI PRE WEDDING.mp4',
]

const result = []

for (const file of videos) {
  const base = slugify(file)
  const inPath = path.join(SRC, file)
  const outPath = path.join(OUT_VIDEOS, `${base}.mp4`)
  const posterPath = path.join(OUT_POSTERS, `${base}.jpg`)

  console.log(`\n=== Compressing ${file} ===`)
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      inPath,
      '-vf',
      'scale=1280:-2,fps=30',
      '-c:v',
      'libx264',
      '-preset',
      'veryfast',
      '-crf',
      '28',
      '-c:a',
      'aac',
      '-b:a',
      '160k',
      '-ac',
      '2',
      '-ar',
      '44100',
      '-movflags',
      '+faststart',
      outPath,
    ],
    { stdio: 'inherit' },
  )

  execFileSync(
    'ffmpeg',
    ['-y', '-ss', '00:00:01.5', '-i', outPath, '-frames:v', '1', '-q:v', '3', posterPath],
    { stdio: 'inherit' },
  )

  const sizeMb = Number((fs.statSync(outPath).size / (1024 * 1024)).toFixed(1))
  result.push({
    id: base,
    src: `/media/videos/${base}.mp4`,
    poster: `/media/posters/${base}.jpg`,
    title: file.replace(/\.mp4$/i, ''),
    sizeMb,
  })
  console.log(`Done ${base}.mp4 (${sizeMb} MB)`)
}

fs.writeFileSync(
  path.resolve('src/data/videosData.json'),
  JSON.stringify({ videos: result, heroVideoId: result[0]?.id }, null, 2),
)
console.log('\nAll videos ready.')

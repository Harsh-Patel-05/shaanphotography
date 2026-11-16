import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

const DIR = path.resolve('public/media/videos')
const POSTERS = path.resolve('public/media/posters')
fs.mkdirSync(POSTERS, { recursive: true })

const titleMap = {
  'aryan-vishwa-save-the-date': 'Aryan & Vishwa — Save the Date',
  'aangi-wed-teaser': 'Aangi — Wedding Teaser',
  'hardik-vishakha-wedding-teaser-by-shaan-photography':
    'Hardik & Vishakha — Wedding Teaser',
  '001-karan-aangi-save-the-date': 'Karan & Aangi — Save the Date',
  'karan-aangi-pre-wedding': 'Karan & Aangi — Pre Wedding',
}

const videos = []

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.mp4')).sort()) {
  const full = path.join(DIR, file)
  const id = file.replace(/\.mp4$/i, '')
  try {
    const duration = execFileSync(
      'ffprobe',
      ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', full],
      { encoding: 'utf8' },
    ).trim()
    if (!duration || Number(duration) < 1) throw new Error('bad duration')

    const poster = path.join(POSTERS, `${id}.jpg`)
    if (!fs.existsSync(poster)) {
      execFileSync('ffmpeg', ['-y', '-ss', '00:00:01.5', '-i', full, '-frames:v', '1', '-q:v', '3', poster])
    }

    videos.push({
      id,
      src: `/media/videos/${file}`,
      poster: `/media/posters/${id}.jpg`,
      title: titleMap[id] ?? id.replace(/-/g, ' '),
      sizeMb: Number((fs.statSync(full).size / (1024 * 1024)).toFixed(1)),
    })
    console.log('OK', id)
  } catch (err) {
    console.log('SKIP (incomplete)', id, err.message)
  }
}

const payload = {
  heroVideoId: 'aryan-vishwa-save-the-date',
  videos,
}

fs.writeFileSync(path.resolve('src/data/videosData.json'), JSON.stringify(payload, null, 2))
console.log(`Wrote ${videos.length} videos`)

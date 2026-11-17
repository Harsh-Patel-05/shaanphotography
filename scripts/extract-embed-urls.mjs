import https from 'https'
import fs from 'fs'

const posts = [
  { post: 'DM63rttS8XU', couple: 'Neel & Mira', category: 'Wedding' },
  { post: 'DMkQNczo4g6', couple: 'Shivani & Mitul', category: 'Wedding' },
  { post: 'DOpukVYkhZZ', couple: 'Avesh & Konain', category: 'Wedding' },
  { post: 'Db70DUzgr29', couple: 'Haldi Celebration', category: 'Wedding' },
]

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location).then(resolve, reject)
        }
        let d = ''
        res.on('data', (c) => (d += c))
        res.on('end', () => resolve(d))
      })
      .on('error', reject)
  })
}

function extractFull(html) {
  const urls = [...html.matchAll(/https:\/\/[^"'\\\s]+?\.jpg[^"'\\\s]*/g)].map((m) =>
    m[0].replace(/&amp;/g, '&'),
  )
  const byKey = new Map()
  for (const u of urls) {
    if (/s150x150|s50x50|p240x240|s320x320/.test(u)) continue
    const key = u.match(/\/([0-9]+_[0-9]+_[0-9]+_n)\.jpg/)?.[1]
    if (!key) continue
    const stp = u.match(/stp=[^&]+/)?.[0] || ''
    const full = !/_s\d|_p\d/.test(stp)
    const prev = byKey.get(key)
    if (!prev || (full && !prev.full)) byKey.set(key, { u, full })
  }
  return [...byKey.values()].filter((x) => x.full).map((x) => x.u)
}

const outPath = '_media_extract/instagram/wedding-batch2.json'
const arr = JSON.parse(fs.readFileSync(outPath, 'utf8'))

for (const p of posts) {
  if (arr.find((x) => x.post === p.post)) {
    console.log('skip existing', p.post)
    continue
  }
  const html = await get(`https://www.instagram.com/p/${p.post}/embed/captioned/`)
  const urls = extractFull(html)
  console.log(p.post, 'html-full', urls.length, 'htmlLen', html.length)
  arr.push({ ...p, urls })
}

fs.writeFileSync(outPath, JSON.stringify(arr, null, 2))
console.log(
  'batches',
  arr.map((x) => `${x.post}:${x.urls.length}`).join(', '),
)

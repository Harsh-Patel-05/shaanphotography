/**
 * Fetch Instagram embed pages for a list of posts, extract full-size image URLs
 * + category hint from hashtags. Writes all-posts-batch.json
 */
import fs from 'fs'
import https from 'https'

const posts = JSON.parse(
  fs.readFileSync('_media_extract/instagram/profile-posts.json', 'utf8'),
)

const already = new Set(
  fs
    .readdirSync('public/media/photos')
    .filter((f) => f.includes('-ig-'))
    .map((f) => {
      const m = f.match(/-ig-([a-z0-9_-]+)-/i)
      return m ? m[1].toLowerCase() : null
    })
    .filter(Boolean),
)

// Also mark known shortcodes from earlier imports
for (const code of [
  'dxom7o1gpqq',
  'db70duzgr29',
  'dmiizwcowwl',
  'dnsdm-qrgpr',
  'dm63rtts8xu',
  'dmkqncz04g6',
  'dmkqncz04g6',
  'dopukvykhzz',
]) {
  already.add(code)
}

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location).then(resolve, reject)
        }
        let d = ''
        res.on('data', (c) => (d += c))
        res.on('end', () => resolve({ status: res.statusCode, html: d }))
      })
      .on('error', reject)
  })
}

function extractUrls(html) {
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

function categoryFrom(html, alt = '') {
  const tags = [...html.matchAll(/#[A-Za-z0-9_]+/g)].map((m) => m[0].toLowerCase())
  const blob = (tags.join(' ') + ' ' + alt).toLowerCase()
  if (/maternity|babybump|pregnancy/.test(blob)) return 'Maternity'
  if (/prewedding|pre-wedding|pre_wedding|propose|engagement|engaged/.test(blob))
    return 'Pre-Wedding'
  if (/haldi|mehndi|sangeet|ringceremony|baby.?shower|birthday|event/.test(blob))
    return 'Events'
  if (/wedding|bride|groom|nikah|baraat|reception|pheras|varmala|mandap/.test(blob))
    return 'Wedding'
  if (/portrait|fashion|model/.test(blob)) return 'Portrait'
  if (/couple|love/.test(blob)) return 'Couple Photography'
  return 'Pre-Wedding'
}

function coupleFrom(html) {
  const plain = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
  const m = plain.match(
    /shaan_photography_\s+([A-Za-z][A-Za-z .]{1,40}\/\/\s*[A-Za-z][A-Za-z .]{1,40})/,
  )
  if (m) return m[1].replace(/\s*\/\/\s*/, ' & ').trim()
  return null
}

const results = []
const needBrowser = []
let i = 0
for (const id of posts) {
  i++
  const low = id.toLowerCase()
  if (already.has(low) || [...already].some((a) => low.includes(a) || a.includes(low))) {
    console.log('skip known', id)
    continue
  }
  // skip weird/malformed ids
  if (id.length > 20) {
    console.log('skip weird', id)
    continue
  }
  try {
    const { html, status } = await get(
      `https://www.instagram.com/p/${id}/embed/captioned/`,
    )
    if (status !== 200) {
      console.log('http', status, id)
      continue
    }
    const urls = extractUrls(html)
    const category = categoryFrom(html)
    const couple = coupleFrom(html)
    const hasNext = /aria-label=["']Next["']|>Next</i.test(html)
    console.log(
      `${i}/${posts.length}`,
      id,
      'urls',
      urls.length,
      category,
      hasNext ? 'carousel?' : 'single',
    )
    if (urls.length) {
      results.push({
        post: id,
        couple: couple || id,
        category,
        urls,
        maybeCarousel: hasNext && urls.length < 3,
      })
    }
    if (hasNext && urls.length < 3) needBrowser.push(id)
    await new Promise((r) => setTimeout(r, 250))
  } catch (e) {
    console.log('fail', id, e.message)
  }
}

fs.mkdirSync('_media_extract/instagram', { recursive: true })
fs.writeFileSync(
  '_media_extract/instagram/all-posts-batch.json',
  JSON.stringify(results, null, 2),
)
fs.writeFileSync(
  '_media_extract/instagram/need-browser-carousels.json',
  JSON.stringify(needBrowser, null, 2),
)
console.log(
  'batches',
  results.length,
  'images',
  results.reduce((n, b) => n + b.urls.length, 0),
  'needBrowser',
  needBrowser.length,
)

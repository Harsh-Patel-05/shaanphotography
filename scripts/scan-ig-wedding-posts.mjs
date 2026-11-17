import https from 'https'

const ids = [
  'DN5FHvxEiAK',
  'DMxlz_vocce',
  'DMIIzwcowwl',
  'Db70DUzgr29',
  'DONcw4lkq1e',
  'DPBlUKPgk1O',
  'DNsDM-QRGPr',
  'DM63rttS8XU',
  'DMkQNczo4g6',
  'DK630-svUd6',
  'DOpukVYkhZZ',
  'DPGuO54AlF4',
  'DTufkkWAgZQ',
  'DdTQFockm_n',
  'DeWh0QHgrSq',
  'Ddx_dyRAhmh',
  'DfJnKTjCFPU',
]

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchText(res.headers.location).then(resolve, reject)
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      })
      .on('error', reject)
  })
}

const weddingRe = /wedding|bride|groom|haldi|mehndi|sangeet|baraat|shaadi|reception|pheras|varmala|mandap|bridal/i

for (const id of ids) {
  try {
    const html = await fetchText(`https://www.instagram.com/p/${id}/embed/captioned/`)
    const tags = [...html.matchAll(/#[A-Za-z0-9_]+/g)].map((m) => m[0])
    const uniq = [...new Set(tags)]
    const captionMatch = html.match(/ClassifiedPageEmbed.*?<\/blockquote>/is)
    const plain = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .slice(0, 500)
    const wed = weddingRe.test(uniq.join(' ') + ' ' + plain)
    console.log(`${id} wed=${wed} tags=${uniq.slice(0, 15).join(',')}`)
    if (wed) console.log('  snip:', plain.slice(0, 220))
  } catch (e) {
    console.log(`${id} ERR ${e.message}`)
  }
}

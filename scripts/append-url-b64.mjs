import fs from 'fs'

const dir = '_media_extract/instagram'
const post = process.argv[2]
const category = process.argv[3]
const urlB64 = process.argv[4]
if (!post || !category || !urlB64) {
  console.error('usage: node scripts/append-url-b64.mjs <post> <category> <urlB64>')
  process.exit(1)
}
const url = Buffer.from(urlB64, 'base64').toString('utf8')
const path = `${dir}/_batch_${post}.json`
let item = { post, category, urls: [] }
if (fs.existsSync(path)) {
  try {
    item = JSON.parse(fs.readFileSync(path, 'utf8'))
  } catch {}
}
if (!item.urls.includes(url)) item.urls.push(url)
fs.writeFileSync(path, JSON.stringify(item, null, 2))
console.log(item.urls.length)

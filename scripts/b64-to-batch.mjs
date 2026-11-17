import fs from 'fs'

const b64 = process.argv[2]
if (!b64) {
  console.error('usage: node scripts/b64-to-batch.mjs <base64json> [--append]')
  process.exit(1)
}
const item = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'))
const path = '_media_extract/instagram/all-posts-batch.json'
let arr = []
if (process.argv.includes('--append') && fs.existsSync(path)) {
  try {
    arr = JSON.parse(fs.readFileSync(path, 'utf8'))
    if (!Array.isArray(arr)) arr = []
  } catch {
    arr = []
  }
}
const i = arr.findIndex((x) => x.post === item.post)
if (i >= 0) arr[i] = item
else arr.push(item)
fs.writeFileSync(path, JSON.stringify(arr, null, 2))
console.log('saved', item.post, item.urls.length, item.category, 'batch', arr.length)

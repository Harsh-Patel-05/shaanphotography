/** Usage: node scripts/save-batch-from-cdp.mjs <path-to-json-string-file> */
import fs from 'fs'

const src = process.argv[2]
const outPath = '_media_extract/instagram/wedding-batch2.json'
const item = JSON.parse(fs.readFileSync(src, 'utf8'))
const arr = JSON.parse(fs.readFileSync(outPath, 'utf8'))
if (!arr.find((x) => x.post === item.post)) arr.push(item)
fs.writeFileSync(outPath, JSON.stringify(arr, null, 2))
console.log(
  'ok',
  item.post,
  item.urls.length,
  '→',
  arr.map((x) => `${x.post}:${x.urls.length}`).join(', '),
)

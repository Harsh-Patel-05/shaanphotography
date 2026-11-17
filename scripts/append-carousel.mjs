import fs from 'fs'

const path = '_media_extract/instagram/carousel-expand-batch.json'
const itemPath = process.argv[2]
if (!itemPath) {
  console.error('usage: node append-carousel.mjs <item.json>')
  process.exit(1)
}
const item = JSON.parse(fs.readFileSync(itemPath, 'utf8'))
const arr = JSON.parse(fs.readFileSync(path, 'utf8'))
const i = arr.findIndex((x) => x.post === item.post)
if (i >= 0) arr[i] = item
else arr.push(item)
fs.writeFileSync(path, JSON.stringify(arr, null, 2))
console.log(
  'batch size',
  arr.length,
  'last',
  item.post,
  item.urls?.length || 0,
  item.category,
)

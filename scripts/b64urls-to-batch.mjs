import fs from 'fs'

const [,, post, category, b64ListPath] = process.argv
if (!post || !category || !b64ListPath) {
  console.error('usage: node scripts/b64urls-to-batch.mjs <post> <category> <b64urls.json>')
  process.exit(1)
}
const list = JSON.parse(fs.readFileSync(b64ListPath, 'utf8'))
const urls = list.map((b) => Buffer.from(b, 'base64').toString('utf8'))
const item = { post, category, urls }
const dir = '_media_extract/instagram'
fs.writeFileSync(`${dir}/_batch_${post}.json`, JSON.stringify(item, null, 2))
fs.writeFileSync(`${dir}/all-posts-batch.json`, JSON.stringify([item], null, 2))
console.log('saved', post, urls.length, category)

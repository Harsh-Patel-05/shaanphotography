/**
 * Usage: node scripts/write-batch-from-cdp.mjs <postId> <category> <urls.json>
 * Or:    node scripts/write-batch-from-cdp.mjs --merge
 * Merges all _batch_*.json into all-posts-batch.json
 */
import fs from 'fs'
import path from 'path'

const dir = '_media_extract/instagram'
const args = process.argv.slice(2)

if (args[0] === '--merge') {
  const files = fs.readdirSync(dir).filter((f) => f.startsWith('_batch_') && f.endsWith('.json'))
  const items = files.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
  fs.writeFileSync(path.join(dir, 'all-posts-batch.json'), JSON.stringify(items, null, 2))
  console.log(
    'merged',
    items.length,
    items.map((i) => `${i.post}:${i.urls?.length || 0}`).join(', '),
  )
  process.exit(0)
}

const [post, category, urlsPath] = args
if (!post || !category || !urlsPath) {
  console.error('usage: node scripts/write-batch-from-cdp.mjs <post> <category> <urls.json>')
  process.exit(1)
}
const urls = JSON.parse(fs.readFileSync(urlsPath, 'utf8'))
const item = { post, category, urls: Array.isArray(urls) ? urls : urls.urls }
fs.writeFileSync(path.join(dir, `_batch_${post}.json`), JSON.stringify(item, null, 2))
console.log('wrote', post, item.urls.length, category)

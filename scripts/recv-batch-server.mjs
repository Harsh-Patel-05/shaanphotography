import http from 'http'
import fs from 'fs'

const PORT = 8767
const dir = '_media_extract/instagram'

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }
  if (req.method === 'POST' && req.url === '/save') {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      try {
        const item = JSON.parse(Buffer.concat(chunks).toString('utf8'))
        if (!item.post || !Array.isArray(item.urls)) throw new Error('bad payload')
        fs.writeFileSync(`${dir}/_batch_${item.post}.json`, JSON.stringify(item, null, 2))
        fs.writeFileSync(`${dir}/all-posts-batch.json`, JSON.stringify([item], null, 2))
        console.log('saved', item.post, item.urls.length, item.category || '')
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: true, count: item.urls.length }))
      } catch (e) {
        console.error(e)
        res.writeHead(400)
        res.end(String(e))
      }
    })
    return
  }
  res.writeHead(404)
  res.end('not found')
})

server.listen(PORT, '127.0.0.1', () => console.log('listening', PORT))

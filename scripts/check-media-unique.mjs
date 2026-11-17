import fs from 'fs'
const t = fs.readFileSync('src/data/mediaMap.ts', 'utf8')
const ids = [...t.matchAll(/'(p\d+)'/g)].map((m) => m[1])
const seen = new Map()
const dups = []
for (const id of ids) {
  if (seen.has(id)) dups.push(id)
  seen.set(id, (seen.get(id) || 0) + 1)
}
console.log('total refs', ids.length, 'unique', seen.size)
console.log('dups', [...new Set(dups)])

import fs from 'fs'
const t = fs.readFileSync('src/data/galleryData.ts', 'utf8')
const start = t.indexOf('export const galleryImages')
const end = t.indexOf('export const portfolioCategories')
const block = t.slice(start, end)
const cats = {}
const re = /"id": "(p\d+)"[\s\S]*?"category": "([^"]+)"/g
let m
while ((m = re.exec(block))) {
  ;(cats[m[2]] ||= []).push(m[1])
}
for (const [k, v] of Object.entries(cats)) {
  console.log(k, v.length)
  console.log(' ', v.join(','))
}
console.log('total', Object.values(cats).reduce((a, b) => a + b.length, 0))

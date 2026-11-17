import fs from 'fs'

const gallery = fs.readFileSync('src/data/galleryData.ts', 'utf8')
const start = gallery.indexOf('export const galleryImages')
const end = gallery.indexOf('export const portfolioCategories')
const block = gallery.slice(start, end)
const map = {}
const re = /"id": "(p\d+)"[\s\S]*?"category": "([^"]+)"/g
let m
while ((m = re.exec(block))) map[m[1]] = m[2]

const media = fs.readFileSync('src/data/mediaMap.ts', 'utf8')
const mediaIdsMatch = media.match(/export const mediaIds = \{([\s\S]*?)\n\} as const/)
if (!mediaIdsMatch) throw new Error('mediaIds not found')
const body = mediaIdsMatch[1]

function extractBlock(name) {
  // find top-level key inside mediaIds (2-space indent)
  const rx = new RegExp(`\\n  ${name}: \\{([\\s\\S]*?)\\n  \\}`, 'm')
  return body.match(rx)?.[1] || ''
}

function idsIn(text) {
  return [...text.matchAll(/'(p\d+)'/g)].map((x) => x[1])
}

function nested(block, key) {
  const rx = new RegExp(`${key}:\\s*'(p\\d+)'`)
  return block.match(rx)?.[1]
}

const report = []
function check(label, expected, ids) {
  for (const id of ids) {
    const actual = map[id]
    if (actual !== expected) {
      report.push(`${label} ${id}: want ${expected}, got ${actual || 'MISSING'}`)
    }
  }
}

const wedding = extractBlock('wedding')
const preWedding = extractBlock('preWedding')
const portrait = extractBlock('portrait')
const couple = extractBlock('couple')
const events = extractBlock('events')
const services = extractBlock('services')
const home = extractBlock('home')
const collections = home.match(/collections: \{([\s\S]*?)\}/)?.[1] || ''

check('wedding.page', 'Wedding', idsIn(wedding))
check('preWedding.page', 'Pre-Wedding', idsIn(preWedding))
check('portrait.page', 'Portrait', idsIn(portrait))
check('couple.page', 'Couple Photography', idsIn(couple))
check('events.page', 'Events', idsIn(events))

for (const [k, cat] of [
  ['wedding', 'Wedding'],
  ['preWedding', 'Pre-Wedding'],
  ['portrait', 'Portrait'],
  ['events', 'Events'],
  ['couple', 'Couple Photography'],
]) {
  const sid = nested(services, k)
  const cid = nested(collections, k)
  if (sid) check(`services.${k}`, cat, [sid])
  if (cid) check(`collections.${k}`, cat, [cid])
}

console.log(report.length ? report.join('\n') : 'ALL MATCH')
console.log('--- counts ---')
const byCat = {}
for (const [id, cat] of Object.entries(map)) (byCat[cat] ||= []).push(id)
for (const [cat, ids] of Object.entries(byCat)) console.log(cat, ids.length)

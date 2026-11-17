import fs from 'fs'

const path = 'src/data/galleryData.ts'
let t = fs.readFileSync(path, 'utf8')

/** Move these into Wedding so the wedding page has a real gallery. */
const toWedding = [
  'p025',
  'p031',
  'p032',
  'p035',
  'p037',
  'p038',
  'p040',
  'p042',
  'p048',
  'p061',
  'p064',
  'p066',
]

for (const id of toWedding) {
  const re = new RegExp(
    `("id": "${id}"[\\s\\S]*?"category": ")([^"]+)(")`,
    'm',
  )
  const next = t.replace(re, `$1Wedding$3`)
  if (next === t) console.warn('miss', id)
  else t = next
}

fs.writeFileSync(path, t)
console.log('updated', toWedding.length)

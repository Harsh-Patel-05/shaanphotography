import fs from 'fs'

const path = 'src/data/galleryData.ts'
let t = fs.readFileSync(path, 'utf8')

/** These were Pre-Wedding originally; keep only true Wedding (p071). */
const backToPreWedding = [
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

for (const id of backToPreWedding) {
  const catRe = new RegExp(`("id": "${id}"[\\s\\S]*?"category": ")([^"]+)(")`, 'm')
  t = t.replace(catRe, `$1Pre-Wedding$3`)
  const titleRe = new RegExp(`("id": "${id}"[\\s\\S]*?"title": ")([^"]+)(")`, 'm')
  t = t.replace(titleRe, `$1Pre-Wedding$3`)
  const altRe = new RegExp(
    `("id": "${id}"[\\s\\S]*?"alt": ")([^"]+)(")`,
    'm',
  )
  t = t.replace(altRe, `$1Shaan Photography — Pre-Wedding$3`)
}

fs.writeFileSync(path, t)
console.log('reverted', backToPreWedding.length, 'to Pre-Wedding; Wedding should be p071 only')

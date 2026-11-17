import fs from 'fs'
const path = 'src/data/galleryData.ts'
let t = fs.readFileSync(path, 'utf8')
const ids = [
  'p025','p031','p032','p035','p037','p038','p040','p042','p048','p061','p064','p066',
]
for (const id of ids) {
  const re = new RegExp(
    `("id": "${id}"[\\s\\S]*?"title": ")([^"]+)(")`,
    'm',
  )
  t = t.replace(re, `$1Wedding$3`)
}
fs.writeFileSync(path, t)
console.log('titles updated')

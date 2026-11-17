import fs from 'fs'

const path = 'scripts/build-gallery-data.mjs'
let s = fs.readFileSync(path, 'utf8')
const marker = 'const titles = {'
const inject = `// Auto-fill IG wedding imports as Wedding (p123+)
for (let i = 123; i <= 300; i++) {
  if (categoryByIndex[i] == null) categoryByIndex[i] = 'Wedding'
}

`
if (!s.includes('Auto-fill IG wedding imports')) {
  if (!s.includes(marker)) throw new Error('marker missing')
  s = s.replace(marker, inject + marker)
  fs.writeFileSync(path, s)
  console.log('injected')
} else {
  console.log('already present')
}

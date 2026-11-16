import fs from 'fs'
import path from 'path'

const file = path.resolve('src/data/galleryData.ts')
let source = fs.readFileSync(file, 'utf8')

if (!source.includes("from '../utils/asset'")) {
  source = `import { asset } from '../utils/asset'\n\n${source}`
}

source = source.replace(/"(\/media\/[^"]+)"/g, 'asset("$1")')

fs.writeFileSync(file, source)
console.log('Prefixed /media paths with asset()')

import fs from 'fs'
import sharp from 'sharp'

const SVG = 'public/favicon.svg'
const brown = { r: 42, g: 31, b: 26, alpha: 1 }

async function raster(size, out) {
  await sharp(SVG, { density: Math.max(384, size * 12) })
    .resize(size, size, {
      fit: 'contain',
      background: brown,
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9 })
    .toFile(out)
  console.log('wrote', out)
}

await raster(16, 'public/favicon-16x16.png')
await raster(32, 'public/favicon-32x32.png')
await raster(48, 'public/favicon-48x48.png')
await raster(180, 'public/apple-touch-icon.png')
await raster(192, 'public/icon-192.png')
await raster(512, 'public/icon-512.png')
await sharp('public/favicon-32x32.png').toFile('public/favicon.png')

try {
  const toIco = (await import('to-ico')).default
  const ico = await toIco([
    fs.readFileSync('public/favicon-16x16.png'),
    fs.readFileSync('public/favicon-32x32.png'),
    fs.readFileSync('public/favicon-48x48.png'),
  ])
  fs.writeFileSync('public/favicon.ico', ico)
  console.log('wrote public/favicon.ico')
} catch (err) {
  fs.copyFileSync('public/favicon-32x32.png', 'public/favicon.ico')
  console.log('favicon.ico fallback copy', String(err?.message ?? err))
}

console.log('done')

import fs from 'fs'
import sharp from 'sharp'

const white = 'src/assets/logos/shaan-logo-white.png'
const brown = { r: 48, g: 37, b: 31, alpha: 1 }

/** Full "Shaan" wordmark on deep brown square */
async function makeWordmark(size, out) {
  const pad = Math.round(size * 0.16)
  const innerW = size - pad * 2
  const innerH = Math.round(size * 0.42)
  const logo = await sharp(white)
    .resize({
      width: innerW,
      height: innerH,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  const meta = await sharp(logo).metadata()
  const left = Math.round((size - (meta.width ?? 0)) / 2)
  const top = Math.round((size - (meta.height ?? 0)) / 2)

  await sharp({
    create: { width: size, height: size, channels: 4, background: brown },
  })
    .composite([{ input: logo, left, top }])
    .png()
    .toFile(out)

  console.log('wrote', out)
}

/** Stylized "S" mark — clearer at 16/32px tab sizes */
async function makeSMark(size, out) {
  // Left portion of the signature is the large "S"
  const sCrop = await sharp(white)
    .extract({ left: 0, top: 0, width: 220, height: 240 })
    .trim({ threshold: 10 })
    .png()
    .toBuffer()

  const pad = Math.round(size * 0.18)
  const inner = size - pad * 2
  const logo = await sharp(sCrop)
    .resize({
      width: inner,
      height: inner,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  const meta = await sharp(logo).metadata()
  const left = Math.round((size - (meta.width ?? 0)) / 2)
  const top = Math.round((size - (meta.height ?? 0)) / 2)

  await sharp({
    create: { width: size, height: size, channels: 4, background: brown },
  })
    .composite([{ input: logo, left, top }])
    .png()
    .toFile(out)

  console.log('wrote', out)
}

await makeSMark(16, 'public/favicon-16x16.png')
await makeSMark(32, 'public/favicon-32x32.png')
await makeSMark(48, 'public/favicon-48x48.png')
await makeWordmark(180, 'public/apple-touch-icon.png')
await makeWordmark(192, 'public/icon-192.png')
await makeWordmark(512, 'public/icon-512.png')
await sharp('public/favicon-32x32.png').toFile('public/favicon.png')

const png48 = fs.readFileSync('public/favicon-48x48.png').toString('base64')
fs.writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><image href="data:image/png;base64,${png48}" width="48" height="48"/></svg>`,
)

// Build .ico from 16 + 32 (+48 if supported)
try {
  const toIco = (await import('to-ico')).default
  const ico = await toIco([
    fs.readFileSync('public/favicon-16x16.png'),
    fs.readFileSync('public/favicon-32x32.png'),
  ])
  fs.writeFileSync('public/favicon.ico', ico)
  console.log('wrote public/favicon.ico')
} catch (err) {
  // Fallback: browsers accept PNG named as favicon via link tags
  fs.copyFileSync('public/favicon-32x32.png', 'public/favicon.ico')
  console.log('favicon.ico fallback copy', String(err?.message ?? err))
}

console.log('done')

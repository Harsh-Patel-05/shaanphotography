import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const PHOTOS = path.resolve('public/media/photos')
const files = fs
  .readdirSync(PHOTOS)
  .filter((f) => f.endsWith('.jpg'))
  .sort()

/**
 * Only these categories (no Fashion / Travel / Lifestyle):
 * Wedding | Pre-Wedding | Portrait | Events | Couple Photography
 */
const categoryByIndex = {
  // Mumbai Taj / Gateway urban couple shoot → Pre-Wedding
  1: 'Couple Photography',
  2: 'Pre-Wedding',
  3: 'Pre-Wedding',
  4: 'Pre-Wedding',
  5: 'Pre-Wedding',
  6: 'Couple Photography',
  7: 'Pre-Wedding',
  8: 'Pre-Wedding',
  9: 'Couple Photography',
  10: 'Pre-Wedding',
  11: 'Couple Photography',
  12: 'Pre-Wedding',
  13: 'Pre-Wedding',
  14: 'Couple Photography',
  15: 'Couple Photography',
  16: 'Pre-Wedding',
  17: 'Couple Photography',
  18: 'Pre-Wedding',
  19: 'Portrait',
  20: 'Couple Photography',
  // Mountain / scenic styled shoots → Pre-Wedding
  21: 'Pre-Wedding',
  22: 'Couple Photography',
  23: 'Pre-Wedding',
  24: 'Couple Photography',
  25: 'Pre-Wedding',
  26: 'Pre-Wedding',
  27: 'Couple Photography',
  28: 'Portrait',
  29: 'Portrait',
  30: 'Couple Photography',
  31: 'Pre-Wedding',
  32: 'Pre-Wedding',
  33: 'Portrait',
  34: 'Pre-Wedding',
  35: 'Pre-Wedding',
  36: 'Couple Photography',
  // Lake / beach romantic → Pre-Wedding + Couple
  37: 'Pre-Wedding',
  38: 'Pre-Wedding',
  39: 'Couple Photography',
  40: 'Pre-Wedding',
  41: 'Portrait',
  42: 'Pre-Wedding',
  43: 'Couple Photography',
  44: 'Couple Photography',
  45: 'Pre-Wedding',
  46: 'Couple Photography',
  47: 'Pre-Wedding',
  48: 'Pre-Wedding',
  49: 'Couple Photography',
  // Proposal / decorated setups → Events
  50: 'Events',
  51: 'Events',
  52: 'Events',
  53: 'Events',
  54: 'Events',
  55: 'Events',
  56: 'Events',
  57: 'Events',
  58: 'Events',
  59: 'Events',
  60: 'Events',
  // Urban / destination couple → Couple + Pre-Wedding
  61: 'Pre-Wedding',
  62: 'Couple Photography',
  63: 'Couple Photography',
  64: 'Pre-Wedding',
  65: 'Couple Photography',
  66: 'Pre-Wedding',
  67: 'Couple Photography',
  68: 'Couple Photography',
  69: 'Couple Photography',
  70: 'Couple Photography',
  // Traditional wedding ceremony
  71: 'Wedding',
}

const titles = {
  1: 'Shoreline Walk',
  5: 'Taj Palace',
  10: 'Gateway Light',
  15: 'City Walls',
  19: 'Soft Gaze',
  20: 'Station Stories',
  25: 'Mountain Path',
  28: 'Quiet Frame',
  29: 'Golden Hour',
  33: 'Close Moment',
  35: 'Blue Train',
  40: 'Lake Embrace',
  41: 'Portrait Light',
  45: 'Coastal Breeze',
  48: 'Heart Arch',
  50: 'The Proposal',
  55: 'Roses & Promises',
  58: 'Will You Marry Me',
  60: 'Beach Setup',
  65: 'City Birds',
  68: 'White Streets',
  71: 'Wedding Walk',
}

const gallery = []

for (const file of files) {
  const match = file.match(/^p(\d+)/)
  const index = match ? Number(match[1]) : 0
  const meta = await sharp(path.join(PHOTOS, file)).metadata()
  const w = meta.width ?? 1
  const h = meta.height ?? 1
  const ratio = w / h
  let orientation = 'landscape'
  if (ratio < 0.85) orientation = 'portrait'
  else if (ratio > 0.9 && ratio < 1.1) orientation = 'square'

  const category = categoryByIndex[index] ?? 'Pre-Wedding'
  gallery.push({
    id: `p${String(index).padStart(3, '0')}`,
    src: `/media/photos/${file}`,
    alt: `Shaan Photography — ${titles[index] ?? category}`,
    category,
    orientation,
    title: titles[index] ?? category,
  })
}

const videosPath = path.resolve('src/data/videosData.json')
const videosFile = fs.existsSync(videosPath)
  ? JSON.parse(fs.readFileSync(videosPath, 'utf8'))
  : { videos: [], heroVideoId: null }

const byCat = (cat) => gallery.filter((g) => g.category === cat)
const first = (cat) => byCat(cat)[0]

const featured = [
  {
    id: 'col-wedding',
    title: 'Weddings',
    subtitle: 'The big day, honestly told',
    path: '/wedding',
    image: first('Wedding')?.src ?? gallery[0].src,
  },
  {
    id: 'col-prewedding',
    title: 'Pre-Wedding',
    subtitle: 'Before the vows',
    path: '/pre-wedding',
    image: first('Pre-Wedding')?.src ?? gallery[0].src,
  },
  {
    id: 'col-portrait',
    title: 'Portrait',
    subtitle: 'You, simply',
    path: '/portrait',
    image: first('Portrait')?.src ?? gallery[0].src,
  },
  {
    id: 'col-events',
    title: 'Events',
    subtitle: 'Gatherings worth keeping',
    path: '/events',
    image: first('Events')?.src ?? gallery[0].src,
  },
  {
    id: 'col-couple',
    title: 'Couple',
    subtitle: 'Just the two of you',
    path: '/couple',
    image: first('Couple Photography')?.src ?? gallery[0].src,
  },
]

const used = new Set(featured.map((f) => f.image))
const about = byCat('Couple Photography').find((g) => !used.has(g.src)) ?? gallery[0]
used.add(about.src)
const cinematic =
  byCat('Pre-Wedding').find((g) => !used.has(g.src) && g.orientation === 'landscape') ??
  byCat('Pre-Wedding').find((g) => !used.has(g.src)) ??
  gallery[1]
used.add(cinematic.src)

const aboutBts = byCat('Events')
  .filter((g) => !used.has(g.src))
  .slice(0, 3)
  .map((g) => {
    used.add(g.src)
    return g.src
  })

const instagramFeed = gallery
  .filter((g) => !used.has(g.src))
  .slice(0, 6)
  .map((g) => {
    used.add(g.src)
    return { id: g.id, src: g.src, alt: g.alt }
  })

const selectedWorks = gallery
  .filter((g) => !used.has(g.src))
  .slice(0, 12)

const counts = {}
for (const g of gallery) counts[g.category] = (counts[g.category] || 0) + 1
console.log('Category counts:', counts)

const ts = `export type GalleryCategory =
  | 'Wedding'
  | 'Pre-Wedding'
  | 'Portrait'
  | 'Events'
  | 'Couple Photography'

export type GalleryImage = {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  orientation: 'landscape' | 'portrait' | 'square'
  title?: string
  location?: string
}

export type VideoItem = {
  id: string
  src: string
  poster: string
  title: string
  sizeMb?: number
}

/** All original Shaan Photography images (optimized for web). */
export const galleryImages: GalleryImage[] = ${JSON.stringify(gallery, null, 2)}

export const portfolioCategories: Array<'All' | GalleryCategory> = [
  'All',
  'Wedding',
  'Pre-Wedding',
  'Portrait',
  'Events',
  'Couple Photography',
]

export const getImagesByCategory = (category: GalleryCategory | 'All') =>
  category === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === category)

export const featuredCollections = ${JSON.stringify(featured, null, 2)}

export const heroImage = ${JSON.stringify(first('Wedding')?.src ?? gallery[0].src)}
export const cinematicBanner = ${JSON.stringify(cinematic.src)}
export const aboutPortrait = ${JSON.stringify(about.src)}

export const aboutBts = ${JSON.stringify(aboutBts, null, 2)}

export const instagramFeed = ${JSON.stringify(instagramFeed, null, 2)}

/** Homepage selected gallery — unique IDs not reused in other home sections */
export const homeSelectedGallery: GalleryImage[] = ${JSON.stringify(selectedWorks, null, 2)}

export const videos: VideoItem[] = ${JSON.stringify(videosFile.videos ?? [], null, 2)}

const heroVideoId = ${JSON.stringify(videosFile.heroVideoId ?? null)}
export const heroVideo: VideoItem | null =
  videos.find((v) => v.id === heroVideoId) ?? videos[0] ?? null
`

fs.writeFileSync(path.resolve('src/data/galleryData.ts'), ts)
console.log(`Wrote galleryData.ts with ${gallery.length} images`)
console.log(`Home selected unique: ${selectedWorks.length}`)

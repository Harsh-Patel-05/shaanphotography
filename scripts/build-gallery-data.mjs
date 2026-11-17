import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const PHOTOS = path.resolve('public/media/photos')
const files = fs
  .readdirSync(PHOTOS)
  .filter((f) => f.endsWith('.jpg'))
  .sort()

/**
 * Categories:
 * Wedding | Pre-Wedding | Portrait | Events | Couple Photography | Maternity
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
  // New wedding batch (Nov 2026) — bridal, ceremony, baraat, reception
  72: 'Wedding',
  73: 'Wedding',
  74: 'Wedding',
  75: 'Wedding',
  76: 'Wedding',
  77: 'Wedding',
  78: 'Wedding',
  79: 'Wedding',
  80: 'Wedding',
  81: 'Wedding',
  82: 'Wedding',
  83: 'Wedding',
  84: 'Wedding',
  85: 'Wedding',
  86: 'Wedding',
  87: 'Wedding',
  88: 'Wedding',
  89: 'Wedding',
  90: 'Wedding',
  91: 'Wedding',
  92: 'Wedding',
  93: 'Wedding',
  94: 'Wedding',
  95: 'Wedding',
  96: 'Wedding',
  97: 'Wedding',
  98: 'Wedding',
  99: 'Wedding',
  100: 'Wedding',
  101: 'Wedding',
  103: 'Portrait',
  109: 'Wedding',
  110: 'Wedding',
  // Instagram imports (unique frames not already in library)
  111: 'Pre-Wedding',
  112: 'Wedding',
  113: 'Pre-Wedding',
  114: 'Pre-Wedding',
  115: 'Pre-Wedding',
  116: 'Events',
  117: 'Wedding',
  118: 'Portrait',
  119: 'Maternity',
  120: 'Couple Photography',
  121: 'Events',
  122: 'Events',
  // Hardik–Vishakha Ujjain wedding carousel (IG embed)
  123: 'Wedding',
  124: 'Wedding',
  125: 'Wedding',
  126: 'Wedding',
  127: 'Wedding',
  128: 'Wedding',
  129: 'Wedding',
  130: 'Wedding',
  131: 'Wedding',
  132: 'Wedding',
  133: 'Wedding',
  134: 'Wedding',
  135: 'Wedding',
  136: 'Wedding',
  137: 'Wedding',
  138: 'Wedding',
  139: 'Wedding',
  140: 'Wedding',
  141: 'Wedding',
  // More IG wedding carousels (Bhakti–Prerak, Prachi–Jekin, …)
  142: 'Wedding',
  143: 'Wedding',
  144: 'Wedding',
  145: 'Wedding',
  146: 'Wedding',
  147: 'Wedding',
  148: 'Wedding',
  149: 'Wedding',
  150: 'Wedding',
  151: 'Wedding',
  152: 'Wedding',
  153: 'Wedding',
  154: 'Wedding',
  155: 'Wedding',
  156: 'Wedding',
  157: 'Wedding',
  158: 'Wedding',
  159: 'Wedding',
  160: 'Wedding',
  161: 'Wedding',
  162: 'Wedding',
  163: 'Wedding',
  164: 'Wedding',
  165: 'Wedding',
  166: 'Wedding',
  167: 'Wedding',
  168: 'Wedding',
}

// Auto-fill IG wedding imports as Wedding (p123+)
for (let i = 123; i <= 518; i++) {
  if (categoryByIndex[i] == null) categoryByIndex[i] = 'Pre-Wedding'
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
  72: 'Bridal Glow',
  73: 'Veil & Palms',
  74: 'Bridal Entrance',
  75: 'Petal Celebration',
  76: 'Spark & Roses',
  77: 'Garden Veil',
  78: 'Red Veil Portrait',
  79: 'Bridal Gaze',
  80: 'Camel Dupatta',
  81: 'Mother & Bride',
  82: 'Garden Twirl',
  83: 'Bride & Pup',
  84: 'Couple Portrait',
  85: 'Reception Light',
  86: 'Evening Glance',
  87: 'String Lights',
  88: 'Garden Chandelier',
  89: 'Quiet Profile',
  90: 'Motion Circle',
  91: 'Bridal Party',
  92: 'Veil Frame',
  93: 'Motion Study',
  94: 'Floral Frame',
  95: 'Ceremony Seats',
  96: 'Archway Bride',
  97: 'First Dance',
  98: 'Sunlit Stair',
  99: 'Vintage Baraat',
  100: 'Gold Details',
  101: 'Getting Ready',
  103: 'Warm Smile',
  109: 'Ritual Moment',
  110: 'Temple Walk',
  111: 'Udaipur Steps',
  112: 'Smoke Walk',
  113: 'Fairway Light',
  114: 'Forest Rails',
  115: 'Taj Twirl',
  116: 'Haldi Embrace',
  117: 'Aisle Petals',
  118: 'Little Sage',
  119: 'Under the Tree',
  120: 'Gunjan & Nisarg',
  121: "Reema's Haldi",
  122: 'Mehndi Hands',
  123: 'Mandap Glow',
  124: 'Varmala Moment',
  125: 'Ritual Hands',
  126: 'Bride Portrait',
  127: 'Groom Portrait',
  128: 'Family Blessing',
  129: 'Procession Walk',
  130: 'Quiet Glance',
  131: 'Ceremony Light',
  132: 'Floral Frame',
  133: 'Guest Joy',
  134: 'Sacred Fire',
  135: 'Couple Embrace',
  136: 'Evening Dance',
  137: 'Detail Shot',
  138: 'Laughing Together',
  139: 'Exit Sparks',
  140: 'Reception Frame',
  141: 'Final Look',
  142: 'Bhakti & Prerak 01',
  143: 'Bhakti & Prerak 02',
  144: 'Bhakti & Prerak 03',
  145: 'Bhakti & Prerak 04',
  146: 'Bhakti & Prerak 05',
  147: 'Bhakti & Prerak 06',
  148: 'Bhakti & Prerak 07',
  149: 'Bhakti & Prerak 08',
  150: 'Bhakti & Prerak 09',
  151: 'Bhakti & Prerak 10',
  152: 'Bhakti & Prerak 11',
  153: 'Bhakti & Prerak 12',
  154: 'Bhakti & Prerak 13',
  155: 'Bhakti & Prerak 14',
  156: 'Bhakti & Prerak 15',
  157: 'Prachi & Jekin 01',
  158: 'Prachi & Jekin 02',
  159: 'Prachi & Jekin 03',
  160: 'Prachi & Jekin 04',
  161: 'Prachi & Jekin 05',
  162: 'Prachi & Jekin 06',
  163: 'Prachi & Jekin 07',
  164: 'Prachi & Jekin 08',
  165: 'Prachi & Jekin 09',
  166: 'Prachi & Jekin 10',
  167: 'Prachi & Jekin 11',
  168: 'Prachi & Jekin 12',
}


// === IG_IMPORT_ASSIGN ===
Object.assign(categoryByIndex, {
  "210": "Pre-Wedding",
  "223": "Wedding",
  "224": "Wedding",
  "225": "Wedding",
  "226": "Wedding",
  "227": "Events",
  "229": "Wedding",
  "240": "Wedding",
  "242": "Wedding",
  "243": "Wedding",
  "403": "Wedding",
  "404": "Wedding",
  "405": "Wedding",
  "406": "Wedding",
  "407": "Wedding",
  "408": "Wedding",
  "409": "Wedding",
  "410": "Wedding",
  "411": "Wedding",
  "412": "Wedding",
  "413": "Wedding",
  "414": "Wedding",
  "415": "Wedding",
  "416": "Wedding",
  "417": "Wedding",
  "418": "Pre-Wedding",
  "419": "Pre-Wedding",
  "420": "Pre-Wedding",
  "421": "Pre-Wedding",
  "422": "Pre-Wedding",
  "423": "Pre-Wedding",
  "424": "Pre-Wedding",
  "425": "Pre-Wedding",
  "426": "Pre-Wedding",
  "427": "Pre-Wedding",
  "428": "Pre-Wedding",
  "429": "Pre-Wedding",
  "430": "Pre-Wedding",
  "431": "Pre-Wedding",
  "432": "Wedding",
  "433": "Wedding",
  "434": "Wedding",
  "435": "Wedding",
  "436": "Wedding",
  "437": "Wedding",
  "438": "Wedding",
  "439": "Wedding",
  "440": "Wedding",
  "441": "Wedding",
  "442": "Wedding",
  "443": "Wedding",
  "444": "Wedding",
  "445": "Wedding",
  "446": "Wedding",
  "447": "Wedding",
  "448": "Wedding",
  "449": "Wedding",
  "450": "Wedding",
  "451": "Wedding",
  "452": "Wedding",
  "453": "Wedding",
  "454": "Wedding",
  "455": "Wedding",
  "456": "Wedding",
  "457": "Wedding",
  "458": "Wedding",
  "459": "Wedding",
  "460": "Wedding",
  "461": "Wedding",
  "462": "Wedding",
  "463": "Wedding",
  "464": "Wedding",
  "465": "Wedding",
  "466": "Wedding",
  "467": "Wedding",
  "468": "Wedding",
  "469": "Wedding",
  "470": "Wedding",
  "471": "Wedding",
  "472": "Wedding",
  "473": "Wedding",
  "474": "Wedding",
  "475": "Wedding",
  "476": "Wedding",
  "477": "Wedding",
  "478": "Wedding",
  "479": "Wedding",
  "480": "Wedding",
  "481": "Wedding",
  "482": "Wedding",
  "483": "Wedding",
  "484": "Wedding",
  "485": "Wedding",
  "486": "Wedding",
  "487": "Wedding",
  "488": "Wedding",
  "489": "Wedding",
  "490": "Wedding",
  "491": "Wedding",
  "492": "Wedding",
  "493": "Wedding",
  "494": "Wedding",
  "495": "Wedding",
  "496": "Wedding",
  "497": "Wedding",
  "498": "Wedding",
  "499": "Wedding",
  "500": "Wedding",
  "501": "Wedding",
  "502": "Wedding",
  "503": "Wedding",
  "504": "Wedding",
  "505": "Wedding",
  "506": "Wedding",
  "507": "Events",
  "508": "Events",
  "509": "Events",
  "510": "Events",
  "511": "Events",
  "512": "Events",
  "513": "Events",
  "514": "Events",
  "515": "Events",
  "516": "Events",
  "517": "Events",
  "518": "Events"
})
Object.assign(titles, {
  "210": "dtufkkwagzq 01",
  "223": "ds2yriodai9 01",
  "224": "dspzuppjod9 01",
  "225": "dr6m5gudmo6 01",
  "226": "dr2ncvmjbve 01",
  "227": "drzvjjejknn 01",
  "229": "dreocbgjblq 01",
  "240": "dl7qysbprq4 01",
  "242": "dkt_p5lvjph 01",
  "243": "dko4q5wot_t 01",
  "403": "ds2yriodai9 02",
  "404": "ds2yriodai9 03",
  "405": "ds2yriodai9 04",
  "406": "ds2yriodai9 05",
  "407": "ds2yriodai9 06",
  "408": "ds2yriodai9 07",
  "409": "ds2yriodai9 08",
  "410": "dspzuppjod9 02",
  "411": "dspzuppjod9 03",
  "412": "dspzuppjod9 04",
  "413": "dspzuppjod9 05",
  "414": "dspzuppjod9 06",
  "415": "dspzuppjod9 07",
  "416": "dspzuppjod9 08",
  "417": "dspzuppjod9 09",
  "418": "dtufkkwagzq 02",
  "419": "dtufkkwagzq 03",
  "420": "dtufkkwagzq 04",
  "421": "dtufkkwagzq 05",
  "422": "dtufkkwagzq 06",
  "423": "dtufkkwagzq 07",
  "424": "dtufkkwagzq 08",
  "425": "dtufkkwagzq 09",
  "426": "dtufkkwagzq 10",
  "427": "dtufkkwagzq 11",
  "428": "dtufkkwagzq 12",
  "429": "dtufkkwagzq 13",
  "430": "dtufkkwagzq 14",
  "431": "dtufkkwagzq 15",
  "432": "dr6m5gudmo6 02",
  "433": "dr6m5gudmo6 03",
  "434": "dr6m5gudmo6 04",
  "435": "dr6m5gudmo6 05",
  "436": "dr6m5gudmo6 06",
  "437": "dr6m5gudmo6 07",
  "438": "dr6m5gudmo6 08",
  "439": "dr6m5gudmo6 09",
  "440": "dr6m5gudmo6 10",
  "441": "dr6m5gudmo6 11",
  "442": "dr6m5gudmo6 12",
  "443": "dr6m5gudmo6 13",
  "444": "dr6m5gudmo6 14",
  "445": "dr6m5gudmo6 15",
  "446": "dr6m5gudmo6 16",
  "447": "dr6m5gudmo6 17",
  "448": "dr6m5gudmo6 18",
  "449": "dr6m5gudmo6 19",
  "450": "dr2ncvmjbve 02",
  "451": "dr2ncvmjbve 03",
  "452": "dr2ncvmjbve 04",
  "453": "dr2ncvmjbve 05",
  "454": "dr2ncvmjbve 06",
  "455": "dr2ncvmjbve 07",
  "456": "dr2ncvmjbve 08",
  "457": "dr2ncvmjbve 09",
  "458": "dr2ncvmjbve 10",
  "459": "dr2ncvmjbve 11",
  "460": "dr2ncvmjbve 12",
  "461": "dr2ncvmjbve 13",
  "462": "dr2ncvmjbve 14",
  "463": "dr2ncvmjbve 15",
  "464": "dr2ncvmjbve 16",
  "465": "dr2ncvmjbve 17",
  "466": "dr2ncvmjbve 18",
  "467": "dr2ncvmjbve 19",
  "468": "dreocbgjblq 02",
  "469": "dreocbgjblq 03",
  "470": "dreocbgjblq 04",
  "471": "dreocbgjblq 05",
  "472": "dreocbgjblq 06",
  "473": "dreocbgjblq 07",
  "474": "dreocbgjblq 08",
  "475": "dl7qysbprq4 02",
  "476": "dl7qysbprq4 03",
  "477": "dl7qysbprq4 04",
  "478": "dl7qysbprq4 05",
  "479": "dl7qysbprq4 06",
  "480": "dl7qysbprq4 07",
  "481": "dl7qysbprq4 08",
  "482": "dl7qysbprq4 09",
  "483": "dl7qysbprq4 10",
  "484": "dl7qysbprq4 11",
  "485": "dl7qysbprq4 12",
  "486": "dl7qysbprq4 13",
  "487": "dl7qysbprq4 14",
  "488": "dl7qysbprq4 15",
  "489": "dl7qysbprq4 16",
  "490": "dl7qysbprq4 17",
  "491": "dl7qysbprq4 18",
  "492": "dl7qysbprq4 19",
  "493": "dl7qysbprq4 20",
  "494": "dkt_p5lvjph 02",
  "495": "dkt_p5lvjph 03",
  "496": "dkt_p5lvjph 04",
  "497": "dkt_p5lvjph 05",
  "498": "dkt_p5lvjph 06",
  "499": "dkt_p5lvjph 07",
  "500": "dkt_p5lvjph 08",
  "501": "dko4q5wot_t 02",
  "502": "dko4q5wot_t 03",
  "503": "dko4q5wot_t 04",
  "504": "dko4q5wot_t 05",
  "505": "dko4q5wot_t 06",
  "506": "dko4q5wot_t 07",
  "507": "drzvjjejknn 02",
  "508": "drzvjjejknn 03",
  "509": "drzvjjejknn 04",
  "510": "drzvjjejknn 05",
  "511": "drzvjjejknn 06",
  "512": "drzvjjejknn 08",
  "513": "drzvjjejknn 09",
  "514": "drzvjjejknn 10",
  "515": "drzvjjejknn 11",
  "516": "drzvjjejknn 12",
  "517": "drzvjjejknn 13",
  "518": "drzvjjejknn 14"
})
// === END_IG_IMPORT_ASSIGN ===

const locations = {
  5: 'Mumbai',
  111: 'Udaipur',
  115: 'Mumbai',
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
    srcPath: `/media/photos/${file}`,
    alt: `Shaan Photography — ${titles[index] ?? category}`,
    category,
    orientation,
    title: titles[index] ?? category,
    location: locations[index],
  })
}

const videosPath = path.resolve('src/data/videosData.json')
const videosFile = fs.existsSync(videosPath)
  ? JSON.parse(fs.readFileSync(videosPath, 'utf8'))
  : { videos: [], heroVideoId: null }

const byCat = (cat) => gallery.filter((g) => g.category === cat)
const first = (cat) => byCat(cat)[0]
const srcOf = (g) => g.srcPath

const featured = [
  {
    id: 'col-wedding',
    title: 'Weddings',
    subtitle: 'The big day, honestly told',
    path: '/wedding',
    image: srcOf(first('Wedding') ?? gallery[0]),
  },
  {
    id: 'col-prewedding',
    title: 'Pre-Wedding',
    subtitle: 'Before the vows',
    path: '/pre-wedding',
    image: srcOf(first('Pre-Wedding') ?? gallery[0]),
  },
  {
    id: 'col-portrait',
    title: 'Portrait',
    subtitle: 'You, simply',
    path: '/portrait',
    image: srcOf(first('Portrait') ?? gallery[0]),
  },
  {
    id: 'col-events',
    title: 'Events',
    subtitle: 'Gatherings worth keeping',
    path: '/events',
    image: srcOf(first('Events') ?? gallery[0]),
  },
  {
    id: 'col-couple',
    title: 'Couple',
    subtitle: 'Just the two of you',
    path: '/couple',
    image: srcOf(first('Couple Photography') ?? gallery[0]),
  },
]

const used = new Set(featured.map((f) => f.image))
const about = byCat('Couple Photography').find((g) => !used.has(g.srcPath)) ?? gallery[0]
used.add(about.srcPath)
const cinematic =
  byCat('Pre-Wedding').find((g) => !used.has(g.srcPath) && g.orientation === 'landscape') ??
  byCat('Pre-Wedding').find((g) => !used.has(g.srcPath)) ??
  gallery[1]
used.add(cinematic.srcPath)

const aboutBts = byCat('Events')
  .filter((g) => !used.has(g.srcPath))
  .slice(0, 3)
  .map((g) => {
    used.add(g.srcPath)
    return g.srcPath
  })

const instagramFeed = gallery
  .filter((g) => !used.has(g.srcPath))
  .slice(0, 6)
  .map((g) => {
    used.add(g.srcPath)
    return { id: g.id, src: g.srcPath, alt: g.alt }
  })

const selectedWorks = gallery
  .filter((g) => !used.has(g.srcPath))
  .slice(0, 12)
  .map((g) => ({
    id: g.id,
    src: g.srcPath,
    alt: g.alt,
    category: g.category,
    orientation: g.orientation,
    title: g.title,
  }))

const counts = {}
for (const g of gallery) counts[g.category] = (counts[g.category] || 0) + 1
console.log('Category counts:', counts)

function assetExpr(p) {
  return `asset(${JSON.stringify(p)})`
}

function emitImage(g) {
  const lines = [
    '  {',
    `    "id": ${JSON.stringify(g.id)},`,
    `    "src": ${assetExpr(g.srcPath ?? g.src)},`,
    `    "alt": ${JSON.stringify(g.alt)},`,
    `    "category": ${JSON.stringify(g.category)},`,
    `    "orientation": ${JSON.stringify(g.orientation)},`,
  ]
  if (g.title) lines.push(`    "title": ${JSON.stringify(g.title)},`)
  if (g.location) lines.push(`    "location": ${JSON.stringify(g.location)},`)
  lines.push('  }')
  return lines.join('\n')
}

const galleryBlock = `[\n${gallery.map(emitImage).join(',\n')}\n]`

const selectedBlock = `[\n${selectedWorks
  .map((g) =>
    emitImage({
      ...g,
      srcPath: g.src,
      alt: g.alt,
    }),
  )
  .join(',\n')}\n]`

const featuredBlock = JSON.stringify(featured, null, 2)
const instagramBlock = JSON.stringify(
  instagramFeed.map((g) => ({ id: g.id, src: g.src, alt: g.alt })),
  null,
  2,
).replace(/"src": "([^"]+)"/g, '"src": asset("$1")')

const aboutBtsBlock = JSON.stringify(aboutBts, null, 2).replace(
  /"(\/media\/[^"]+)"/g,
  'asset("$1")',
)

const ts = `import { asset } from '../utils/asset'

export type GalleryCategory =
  | 'Wedding'
  | 'Pre-Wedding'
  | 'Portrait'
  | 'Events'
  | 'Couple Photography'
  | 'Maternity'

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
export const galleryImages: GalleryImage[] = ${galleryBlock}

export const portfolioCategories: Array<'All' | GalleryCategory> = [
  'All',
  'Wedding',
  'Pre-Wedding',
  'Portrait',
  'Events',
  'Couple Photography',
  'Maternity',
]

export const getImagesByCategory = (category: GalleryCategory | 'All') =>
  category === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === category)

export const featuredCollections = ${featuredBlock}

export const heroImage = ${assetExpr(srcOf(first('Wedding') ?? gallery[0]))}
export const cinematicBanner = ${assetExpr(cinematic.srcPath)}
export const aboutPortrait = ${assetExpr(about.srcPath)}

export const aboutBts = ${aboutBtsBlock}

export const instagramFeed = ${instagramBlock}

/** Homepage selected gallery — unique IDs not reused in other home sections */
export const homeSelectedGallery: GalleryImage[] = ${selectedBlock}

export const videos: VideoItem[] = ${(
  JSON.stringify(videosFile.videos ?? [], null, 2)
    .replace(/"src": "(\/media\/[^"]+)"/g, '"src": asset("$1")')
    .replace(/"poster": "(\/media\/[^"]+)"/g, '"poster": asset("$1")')
)}

const heroVideoId = ${JSON.stringify(videosFile.heroVideoId ?? null)}
export const heroVideo: VideoItem | null =
  videos.find((v) => v.id === heroVideoId) ?? videos[0] ?? null
`

fs.writeFileSync(path.resolve('src/data/galleryData.ts'), ts)
console.log(`Wrote galleryData.ts with ${gallery.length} images`)
console.log(`Home selected unique: ${selectedWorks.length}`)

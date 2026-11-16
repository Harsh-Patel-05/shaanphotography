import { galleryImages } from './galleryData'

const byCategory = (category: string) =>
  galleryImages.find((i) => i.category === category)?.src ?? galleryImages[0]?.src ?? ''

export type ServiceItem = {
  id: string
  title: string
  slug: string
  description: string
  includes: string[]
  image: string
  path: string
}

export const services: ServiceItem[] = [
  {
    id: 'svc-wedding',
    title: 'Wedding Photography',
    slug: 'wedding',
    description:
      'Your wedding day, told as it unfolds — the quiet prep, the vows, the dance floor, and all the little in-between moments.',
    includes: [
      'Full-day or multi-day coverage',
      'Candid and guided portraits',
      'Ceremony and reception coverage',
      'Online gallery of your selects',
      'Highlight image set',
    ],
    image: byCategory('Wedding'),
    path: '/wedding',
  },
  {
    id: 'svc-prewedding',
    title: 'Pre-Wedding Photography',
    slug: 'pre-wedding',
    description:
      'A relaxed shoot before the big day — good light, easy posing, and photos that feel like the two of you.',
    includes: [
      'Location ideas and planning',
      'Gentle posing guidance',
      'Golden-hour or destination options',
      'Full story set of images',
      'Print-ready files',
    ],
    image: byCategory('Pre-Wedding'),
    path: '/pre-wedding',
  },
  {
    id: 'svc-portrait',
    title: 'Portrait Photography',
    slug: 'portrait',
    description:
      'Simple, flattering portraits for you or your family — soft light, natural expressions, nothing forced.',
    includes: [
      'Studio or outdoor session',
      'Wardrobe suggestions',
      'Easy, directed posing',
      'Retouched selects',
      'Private gallery delivery',
    ],
    image: byCategory('Portrait'),
    path: '/portrait',
  },
  {
    id: 'svc-events',
    title: 'Event Photography',
    slug: 'events',
    description:
      'Proposals, celebrations, and gatherings covered with a light touch — so people stay present while the moments get saved.',
    includes: [
      'Timeline planning together',
      'Candid guest coverage',
      'Key moments documented',
      'Same-day selects on request',
      'Full event gallery',
    ],
    image: byCategory('Events'),
    path: '/events',
  },
  {
    id: 'svc-couple',
    title: 'Couple Photography',
    slug: 'couple',
    description:
      'Just the two of you — walks, laughs, quiet frames. A session that feels easy and looks beautiful.',
    includes: [
      'Location planning',
      'Natural posing help',
      'City, beach, or golden-hour options',
      'Story set of images',
      'Private gallery delivery',
    ],
    image: byCategory('Couple Photography'),
    path: '/couple',
  },
]

export const serviceOptions = services.map((s) => s.title)

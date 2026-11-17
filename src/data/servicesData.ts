import { img, mediaIds } from './mediaMap'

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
      'I stay with your day from quiet prep to the last song — candid when it counts, guided only when you need it.',
    includes: [
      'Full-day or multi-day coverage',
      'Candid and guided portraits',
      'Ceremony and reception coverage',
      'Private online gallery',
      'Curated highlight set',
    ],
    image: img(mediaIds.services.wedding, 'Wedding').src,
    path: '/wedding',
  },
  {
    id: 'svc-prewedding',
    title: 'Pre-Wedding Photography',
    slug: 'pre-wedding',
    description:
      'A few unhurried hours together before the wedding — good light, easy prompts, photos that still feel like you.',
    includes: [
      'Location ideas and planning',
      'Gentle posing guidance',
      'Golden-hour or short-trip options',
      'Full edited story set',
      'Print-ready files',
    ],
    image: img(mediaIds.services.preWedding, 'Pre-Wedding').src,
    path: '/pre-wedding',
  },
  {
    id: 'svc-portrait',
    title: 'Portrait Photography',
    slug: 'portrait',
    description:
      'Calm sessions for you or your family — flattering light, simple direction, no stiff studio energy.',
    includes: [
      'Outdoor or soft indoor light',
      'Wardrobe notes if you want them',
      'Easy, natural posing',
      'Retouched selects',
      'Private gallery delivery',
    ],
    image: img(mediaIds.services.portrait, 'Portrait').src,
    path: '/portrait',
  },
  {
    id: 'svc-events',
    title: 'Event Photography',
    slug: 'events',
    description:
      'Proposals, parties, and private gatherings — covered lightly so guests stay present while the night is saved.',
    includes: [
      'Simple timeline planning',
      'Candid guest coverage',
      'Key moments documented',
      'Same-day selects on request',
      'Full event gallery',
    ],
    image: img(mediaIds.services.events, 'Events').src,
    path: '/events',
  },
  {
    id: 'svc-couple',
    title: 'Couple Photography',
    slug: 'couple',
    description:
      'An easy date with a camera nearby — walks, laughs, and quiet frames of the two of you.',
    includes: [
      'Location planning',
      'Natural posing help',
      'City, water, or golden-hour options',
      'Story set of images',
      'Private gallery delivery',
    ],
    image: img(mediaIds.services.couple, 'Couple Photography').src,
    path: '/couple',
  },
]

export const serviceOptions = services.map((s) => s.title)

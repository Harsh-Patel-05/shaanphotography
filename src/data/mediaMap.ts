import {
  galleryImages,
  type GalleryCategory,
  type GalleryImage,
} from './galleryData'

/** Resolve a gallery image by id (throws if missing). */
export function img(id: string, category?: GalleryCategory): GalleryImage {
  const found = galleryImages.find((g) => g.id === id)
  if (!found) throw new Error(`Missing gallery image: ${id}`)
  if (category && found.category !== category) {
    throw new Error(
      `Image ${id} is "${found.category}" but must be "${category}"`,
    )
  }
  return found
}

export function imgs(...ids: string[]): GalleryImage[] {
  return ids.map((id) => img(id))
}

/**
 * Unique marketing / page feature assignments.
 * One photo = one primary surface (galleries may still list others once).
 */
export const mediaIds = {
  home: {
    /** Brand hero — couple frame (not tied to one service page) */
    hero: 'p068',
    cinematic: 'p065',
    about: 'p055',
    collections: {
      wedding: 'p074',
      preWedding: 'p002',
      portrait: 'p028',
      events: 'p056',
      couple: 'p001',
    },
    /** Instagram strip — IG imports + library frames not used in selected */
    instagram: ['p111', 'p119', 'p121', 'p120', 'p118', 'p122'],
    /** Favorites masonry — distinct from collections + instagram + about */
    selected: [
      'p011',
      'p012',
      'p013',
      'p014',
      'p015',
      'p016',
      'p017',
      'p018',
      'p020',
      'p021',
      'p022',
      'p023',
    ],
  },
  about: {
    portrait: 'p006',
    secondary: 'p036',
    story: 'p058',
    cinematic: 'p043',
    bts: ['p051', 'p052', 'p053'],
  },
  services: {
    wedding: 'p109',
    preWedding: 'p004',
    portrait: 'p033',
    events: 'p054',
    couple: 'p039',
  },
  /** Wedding page — only Wedding-category ids */
  wedding: {
    hero: 'p076',
  },
  /** Pre-Wedding page — only Pre-Wedding-category ids */
  preWedding: {
    hero: 'p005',
    band: 'p008',
    locations: ['p007', 'p010', 'p003'],
  },
  /** Portrait page — only Portrait-category ids */
  portrait: {
    lead: 'p019',
    side: 'p041',
  },
  /** Couple page — only Couple Photography ids */
  couple: {
    lead: 'p009',
    side: 'p044',
  },
  /** Events page — only Events-category ids */
  events: {
    stories: ['p050', 'p057'],
  },
} as const

/** Deduplicate by id + src so galleries never repeat the same frame. */
function uniqueByIdSrc(list: GalleryImage[]): GalleryImage[] {
  const seen = new Set<string>()
  return list.filter((g) => {
    const key = `${g.id}|${g.src}`
    if (seen.has(g.id) || seen.has(g.src) || seen.has(key)) return false
    seen.add(g.id)
    seen.add(g.src)
    seen.add(key)
    return true
  })
}

/** Category gallery excluding feature images already shown on that page. */
export function getUniqueCategoryImages(
  category: GalleryCategory,
  excludeIds: readonly string[],
): GalleryImage[] {
  const exclude = new Set(excludeIds)
  return uniqueByIdSrc(
    galleryImages.filter((g) => g.category === category && !exclude.has(g.id)),
  )
}

export function getPortfolioImages(
  category: GalleryCategory | 'All',
  excludeIds: readonly string[] = [],
): GalleryImage[] {
  const exclude = new Set(excludeIds)
  const base =
    category === 'All'
      ? galleryImages
      : galleryImages.filter((g) => g.category === category)
  return uniqueByIdSrc(base.filter((g) => !exclude.has(g.id)))
}

export const featuredCollections = [
  {
    id: 'col-wedding',
    title: 'Weddings',
    subtitle: 'The day, as it unfolded',
    path: '/wedding',
    image: img(mediaIds.home.collections.wedding, 'Wedding').src,
  },
  {
    id: 'col-prewedding',
    title: 'Pre-Wedding',
    subtitle: 'Before the rush',
    path: '/pre-wedding',
    image: img(mediaIds.home.collections.preWedding, 'Pre-Wedding').src,
  },
  {
    id: 'col-portrait',
    title: 'Portrait',
    subtitle: 'Simple and flattering',
    path: '/portrait',
    image: img(mediaIds.home.collections.portrait, 'Portrait').src,
  },
  {
    id: 'col-events',
    title: 'Events',
    subtitle: 'Nights worth keeping',
    path: '/events',
    image: img(mediaIds.home.collections.events, 'Events').src,
  },
  {
    id: 'col-couple',
    title: 'Couple',
    subtitle: 'Just the two of you',
    path: '/couple',
    image: img(mediaIds.home.collections.couple, 'Couple Photography').src,
  },
] as const

export const homeHeroImage = img(mediaIds.home.hero).src
export const homeCinematicImage = img(mediaIds.home.cinematic).src
export const homeAboutImage = img(mediaIds.home.about).src
export const homeSelectedGallery = imgs(...mediaIds.home.selected)
export const homeInstagramFeed = mediaIds.home.instagram.map((id) => {
  const image = img(id)
  return { id: image.id, src: image.src, alt: image.alt }
})

/** Dev helper: every category-page / service thumb must match its category. */
export function assertCategoryMedia() {
  img(mediaIds.wedding.hero, 'Wedding')
  img(mediaIds.preWedding.hero, 'Pre-Wedding')
  img(mediaIds.preWedding.band, 'Pre-Wedding')
  mediaIds.preWedding.locations.forEach((id) => img(id, 'Pre-Wedding'))
  img(mediaIds.portrait.lead, 'Portrait')
  img(mediaIds.portrait.side, 'Portrait')
  img(mediaIds.couple.lead, 'Couple Photography')
  img(mediaIds.couple.side, 'Couple Photography')
  mediaIds.events.stories.forEach((id) => img(id, 'Events'))
  img(mediaIds.services.wedding, 'Wedding')
  img(mediaIds.services.preWedding, 'Pre-Wedding')
  img(mediaIds.services.portrait, 'Portrait')
  img(mediaIds.services.events, 'Events')
  img(mediaIds.services.couple, 'Couple Photography')
  img(mediaIds.home.collections.wedding, 'Wedding')
  img(mediaIds.home.collections.preWedding, 'Pre-Wedding')
  img(mediaIds.home.collections.portrait, 'Portrait')
  img(mediaIds.home.collections.events, 'Events')
  img(mediaIds.home.collections.couple, 'Couple Photography')
}

if (import.meta.env.DEV) {
  assertCategoryMedia()
}

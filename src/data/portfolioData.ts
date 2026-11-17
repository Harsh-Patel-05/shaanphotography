import type { GalleryCategory } from './galleryData'

export const portfolioHero = {
  eyebrow: 'Portfolio',
  title: 'The work',
  description:
    'Browse by category or take it all in. Tap any photograph to open it — if something feels like your day, tell me when you inquire.',
}

export const portfolioNotes = [
  {
    title: 'Filter freely',
    text: 'Jump between categories or stay on All to browse the full set.',
  },
  {
    title: 'Tap to enlarge',
    text: 'Open any photograph in the lightbox — swipe or use arrows to move through.',
  },
  {
    title: 'Ask about a look',
    text: 'If a frame feels like your day, mention it when you inquire.',
  },
]

export const categoryIntros: Record<
  GalleryCategory | 'All',
  { label: string; blurb: string; path?: string }
> = {
  All: {
    label: 'Full archive',
    blurb: 'A cross-section of recent work — soft light, warm tones, and real moments.',
  },
  Wedding: {
    label: 'Weddings',
    blurb: 'Ceremony frames, quiet prep, and the night as it unfolded.',
    path: '/wedding',
  },
  'Pre-Wedding': {
    label: 'Pre-Wedding',
    blurb: 'Relaxed location sessions before the big day.',
    path: '/pre-wedding',
  },
  Portrait: {
    label: 'Portrait',
    blurb: 'Simple, flattering frames with soft direction.',
    path: '/portrait',
  },
  Events: {
    label: 'Events',
    blurb: 'Proposals, celebrations, and gatherings kept with a light touch.',
    path: '/events',
  },
  'Couple Photography': {
    label: 'Couple Photography',
    blurb: 'Walks, laughs, and quiet frames of modern love.',
    path: '/couple',
  },
}

import { asset } from '../utils/asset'

export type GalleryCategory =
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
export const galleryImages: GalleryImage[] = [
  {
    "id": "p001",
    "src": asset("/media/photos/p001-dsc00638-jpg.jpg"),
    "alt": "Shaan Photography — Shoreline Walk",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Shoreline Walk"
  },
  {
    "id": "p002",
    "src": asset("/media/photos/p002-dsc01625-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p003",
    "src": asset("/media/photos/p003-dsc01685-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p004",
    "src": asset("/media/photos/p004-dsc01710-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p005",
    "src": asset("/media/photos/p005-dsc01723-jpg.jpg"),
    "alt": "Shaan Photography — Taj Palace",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Taj Palace"
  },
  {
    "id": "p006",
    "src": asset("/media/photos/p006-dsc01763-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p007",
    "src": asset("/media/photos/p007-dsc01822-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p008",
    "src": asset("/media/photos/p008-dsc01867-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p009",
    "src": asset("/media/photos/p009-dsc02125-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p010",
    "src": asset("/media/photos/p010-dsc02161-jpg.jpg"),
    "alt": "Shaan Photography — Gateway Light",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Gateway Light"
  },
  {
    "id": "p011",
    "src": asset("/media/photos/p011-dsc02233-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p012",
    "src": asset("/media/photos/p012-dsc02314-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p013",
    "src": asset("/media/photos/p013-dsc02436-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p014",
    "src": asset("/media/photos/p014-dsc02459-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p015",
    "src": asset("/media/photos/p015-dsc02541-jpg.jpg"),
    "alt": "Shaan Photography — City Walls",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "City Walls"
  },
  {
    "id": "p016",
    "src": asset("/media/photos/p016-dsc02658-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p017",
    "src": asset("/media/photos/p017-dsc02837-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p018",
    "src": asset("/media/photos/p018-dsc03169-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p019",
    "src": asset("/media/photos/p019-dsc03196-jpg.jpg"),
    "alt": "Shaan Photography — Soft Gaze",
    "category": "Portrait",
    "orientation": "portrait",
    "title": "Soft Gaze"
  },
  {
    "id": "p020",
    "src": asset("/media/photos/p020-dsc03909-jpg.jpg"),
    "alt": "Shaan Photography — Station Stories",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Station Stories"
  },
  {
    "id": "p021",
    "src": asset("/media/photos/p021-dsc04465-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p022",
    "src": asset("/media/photos/p022-dsc04510-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p023",
    "src": asset("/media/photos/p023-dsc04545-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p024",
    "src": asset("/media/photos/p024-dsc04563-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p025",
    "src": asset("/media/photos/p025-dsc05335-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p026",
    "src": asset("/media/photos/p026-dsc05365-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p027",
    "src": asset("/media/photos/p027-dsc05392-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p028",
    "src": asset("/media/photos/p028-dsc05404-jpg.jpg"),
    "alt": "Shaan Photography — Quiet Frame",
    "category": "Portrait",
    "orientation": "portrait",
    "title": "Quiet Frame"
  },
  {
    "id": "p029",
    "src": asset("/media/photos/p029-dsc05410-jpg.jpg"),
    "alt": "Shaan Photography — Golden Hour",
    "category": "Portrait",
    "orientation": "portrait",
    "title": "Golden Hour"
  },
  {
    "id": "p030",
    "src": asset("/media/photos/p030-dsc05411-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p031",
    "src": asset("/media/photos/p031-dsc05452-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p032",
    "src": asset("/media/photos/p032-dsc05496-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p033",
    "src": asset("/media/photos/p033-dsc05934-jpg.jpg"),
    "alt": "Shaan Photography — Close Moment",
    "category": "Portrait",
    "orientation": "portrait",
    "title": "Close Moment"
  },
  {
    "id": "p034",
    "src": asset("/media/photos/p034-dsc05948-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p035",
    "src": asset("/media/photos/p035-dsc05989-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p036",
    "src": asset("/media/photos/p036-dsc06040-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p037",
    "src": asset("/media/photos/p037-dsc06654-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p038",
    "src": asset("/media/photos/p038-dsc06726-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p039",
    "src": asset("/media/photos/p039-dsc06915-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p040",
    "src": asset("/media/photos/p040-dsc06964-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p041",
    "src": asset("/media/photos/p041-dsc07012-jpg.jpg"),
    "alt": "Shaan Photography — Portrait Light",
    "category": "Portrait",
    "orientation": "portrait",
    "title": "Portrait Light"
  },
  {
    "id": "p042",
    "src": asset("/media/photos/p042-dsc07469-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p043",
    "src": asset("/media/photos/p043-dsc07493-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "landscape",
    "title": "Couple Photography"
  },
  {
    "id": "p044",
    "src": asset("/media/photos/p044-dsc07562-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "landscape",
    "title": "Couple Photography"
  },
  {
    "id": "p045",
    "src": asset("/media/photos/p045-dsc07863-jpg.jpg"),
    "alt": "Shaan Photography — Coastal Breeze",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Coastal Breeze"
  },
  {
    "id": "p046",
    "src": asset("/media/photos/p046-dsc07912-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p047",
    "src": asset("/media/photos/p047-dsc07928-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p048",
    "src": asset("/media/photos/p048-dsc07938-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p049",
    "src": asset("/media/photos/p049-dsc07969-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "landscape",
    "title": "Couple Photography"
  },
  {
    "id": "p050",
    "src": asset("/media/photos/p050-dsc07998-jpg.jpg"),
    "alt": "Shaan Photography — The Proposal",
    "category": "Events",
    "orientation": "landscape",
    "title": "The Proposal"
  },
  {
    "id": "p051",
    "src": asset("/media/photos/p051-dsc08001-jpg.jpg"),
    "alt": "Shaan Photography — Events",
    "category": "Events",
    "orientation": "landscape",
    "title": "Events"
  },
  {
    "id": "p052",
    "src": asset("/media/photos/p052-dsc08008-jpg.jpg"),
    "alt": "Shaan Photography — Events",
    "category": "Events",
    "orientation": "portrait",
    "title": "Events"
  },
  {
    "id": "p053",
    "src": asset("/media/photos/p053-dsc08042-jpg.jpg"),
    "alt": "Shaan Photography — Events",
    "category": "Events",
    "orientation": "portrait",
    "title": "Events"
  },
  {
    "id": "p054",
    "src": asset("/media/photos/p054-dsc08081-jpg.jpg"),
    "alt": "Shaan Photography — Events",
    "category": "Events",
    "orientation": "landscape",
    "title": "Events"
  },
  {
    "id": "p055",
    "src": asset("/media/photos/p055-dsc08085-jpg.jpg"),
    "alt": "Shaan Photography — Roses & Promises",
    "category": "Events",
    "orientation": "portrait",
    "title": "Roses & Promises"
  },
  {
    "id": "p056",
    "src": asset("/media/photos/p056-dsc08110-jpg.jpg"),
    "alt": "Shaan Photography — Events",
    "category": "Events",
    "orientation": "landscape",
    "title": "Events"
  },
  {
    "id": "p057",
    "src": asset("/media/photos/p057-dsc08194-jpg.jpg"),
    "alt": "Shaan Photography — Events",
    "category": "Events",
    "orientation": "portrait",
    "title": "Events"
  },
  {
    "id": "p058",
    "src": asset("/media/photos/p058-dsc08256-jpg.jpg"),
    "alt": "Shaan Photography — Will You Marry Me",
    "category": "Events",
    "orientation": "portrait",
    "title": "Will You Marry Me"
  },
  {
    "id": "p059",
    "src": asset("/media/photos/p059-dsc08261-jpg.jpg"),
    "alt": "Shaan Photography — Events",
    "category": "Events",
    "orientation": "portrait",
    "title": "Events"
  },
  {
    "id": "p060",
    "src": asset("/media/photos/p060-dsc08272-jpg.jpg"),
    "alt": "Shaan Photography — Beach Setup",
    "category": "Events",
    "orientation": "portrait",
    "title": "Beach Setup"
  },
  {
    "id": "p061",
    "src": asset("/media/photos/p061-dsc08334-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p062",
    "src": asset("/media/photos/p062-dsc08345-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p063",
    "src": asset("/media/photos/p063-dsc08797-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "landscape",
    "title": "Couple Photography"
  },
  {
    "id": "p064",
    "src": asset("/media/photos/p064-dsc08832-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p065",
    "src": asset("/media/photos/p065-dsc08879-jpg.jpg"),
    "alt": "Shaan Photography — City Birds",
    "category": "Couple Photography",
    "orientation": "landscape",
    "title": "City Birds"
  },
  {
    "id": "p066",
    "src": asset("/media/photos/p066-dsc08912-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p067",
    "src": asset("/media/photos/p067-dsc09100-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p068",
    "src": asset("/media/photos/p068-dsc09102-jpg.jpg"),
    "alt": "Shaan Photography — White Streets",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "White Streets"
  },
  {
    "id": "p069",
    "src": asset("/media/photos/p069-dsc09127-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p070",
    "src": asset("/media/photos/p070-dsc09150-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p071",
    "src": asset("/media/photos/p071-img-6360-jpg.jpg"),
    "alt": "Shaan Photography — Wedding Walk",
    "category": "Wedding",
    "orientation": "portrait",
    "title": "Wedding Walk"
  }
]

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

export const featuredCollections = [
  {
    "id": "col-wedding",
    "title": "Weddings",
    "subtitle": "The big day, honestly told",
    "path": "/wedding",
    "image": asset("/media/photos/p071-img-6360-jpg.jpg")
  },
  {
    "id": "col-prewedding",
    "title": "Pre-Wedding",
    "subtitle": "Before the vows",
    "path": "/pre-wedding",
    "image": asset("/media/photos/p002-dsc01625-jpg.jpg")
  },
  {
    "id": "col-portrait",
    "title": "Portrait",
    "subtitle": "You, simply",
    "path": "/portrait",
    "image": asset("/media/photos/p019-dsc03196-jpg.jpg")
  },
  {
    "id": "col-events",
    "title": "Events",
    "subtitle": "Gatherings worth keeping",
    "path": "/events",
    "image": asset("/media/photos/p050-dsc07998-jpg.jpg")
  },
  {
    "id": "col-couple",
    "title": "Couple",
    "subtitle": "Just the two of you",
    "path": "/couple",
    "image": asset("/media/photos/p001-dsc00638-jpg.jpg")
  }
]

export const heroImage = asset("/media/photos/p071-img-6360-jpg.jpg")
export const cinematicBanner = asset("/media/photos/p004-dsc01710-jpg.jpg")
export const aboutPortrait = asset("/media/photos/p006-dsc01763-jpg.jpg")

export const aboutBts = [
  asset("/media/photos/p051-dsc08001-jpg.jpg"),
  asset("/media/photos/p052-dsc08008-jpg.jpg"),
  asset("/media/photos/p053-dsc08042-jpg.jpg")
]

export const instagramFeed = [
  {
    "id": "p003",
    "src": asset("/media/photos/p003-dsc01685-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding"
  },
  {
    "id": "p005",
    "src": asset("/media/photos/p005-dsc01723-jpg.jpg"),
    "alt": "Shaan Photography — Taj Palace"
  },
  {
    "id": "p007",
    "src": asset("/media/photos/p007-dsc01822-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding"
  },
  {
    "id": "p008",
    "src": asset("/media/photos/p008-dsc01867-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding"
  },
  {
    "id": "p009",
    "src": asset("/media/photos/p009-dsc02125-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography"
  },
  {
    "id": "p010",
    "src": asset("/media/photos/p010-dsc02161-jpg.jpg"),
    "alt": "Shaan Photography — Gateway Light"
  }
]

/** Homepage selected gallery — unique IDs not reused in other home sections */
export const homeSelectedGallery: GalleryImage[] = [
  {
    "id": "p011",
    "src": asset("/media/photos/p011-dsc02233-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p012",
    "src": asset("/media/photos/p012-dsc02314-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p013",
    "src": asset("/media/photos/p013-dsc02436-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p014",
    "src": asset("/media/photos/p014-dsc02459-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p015",
    "src": asset("/media/photos/p015-dsc02541-jpg.jpg"),
    "alt": "Shaan Photography — City Walls",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "City Walls"
  },
  {
    "id": "p016",
    "src": asset("/media/photos/p016-dsc02658-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p017",
    "src": asset("/media/photos/p017-dsc02837-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p018",
    "src": asset("/media/photos/p018-dsc03169-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "landscape",
    "title": "Pre-Wedding"
  },
  {
    "id": "p020",
    "src": asset("/media/photos/p020-dsc03909-jpg.jpg"),
    "alt": "Shaan Photography — Station Stories",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Station Stories"
  },
  {
    "id": "p021",
    "src": asset("/media/photos/p021-dsc04465-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  },
  {
    "id": "p022",
    "src": asset("/media/photos/p022-dsc04510-jpg.jpg"),
    "alt": "Shaan Photography — Couple Photography",
    "category": "Couple Photography",
    "orientation": "portrait",
    "title": "Couple Photography"
  },
  {
    "id": "p023",
    "src": asset("/media/photos/p023-dsc04545-jpg.jpg"),
    "alt": "Shaan Photography — Pre-Wedding",
    "category": "Pre-Wedding",
    "orientation": "portrait",
    "title": "Pre-Wedding"
  }
]

export const videos: VideoItem[] = [
  {
    "id": "001-karan-aangi-save-the-date",
    "src": asset("/media/videos/001-karan-aangi-save-the-date.mp4"),
    "poster": asset("/media/posters/001-karan-aangi-save-the-date.jpg"),
    "title": "Karan & Aangi — Save the Date",
    "sizeMb": 12.7
  },
  {
    "id": "aangi-wed-teaser",
    "src": asset("/media/videos/aangi-wed-teaser.mp4"),
    "poster": asset("/media/posters/aangi-wed-teaser.jpg"),
    "title": "Aangi — Wedding Teaser",
    "sizeMb": 25.9
  },
  {
    "id": "aryan-vishwa-save-the-date",
    "src": asset("/media/videos/aryan-vishwa-save-the-date.mp4"),
    "poster": asset("/media/posters/aryan-vishwa-save-the-date.jpg"),
    "title": "Aryan & Vishwa — Save the Date",
    "sizeMb": 11.3
  },
  {
    "id": "hardik-vishakha-wedding-teaser-by-shaan-photography",
    "src": asset("/media/videos/hardik-vishakha-wedding-teaser-by-shaan-photography.mp4"),
    "poster": asset("/media/posters/hardik-vishakha-wedding-teaser-by-shaan-photography.jpg"),
    "title": "Hardik & Vishakha — Wedding Teaser",
    "sizeMb": 34.9
  },
  {
    "id": "karan-aangi-pre-wedding",
    "src": asset("/media/videos/karan-aangi-pre-wedding.mp4"),
    "poster": asset("/media/posters/karan-aangi-pre-wedding.jpg"),
    "title": "Karan & Aangi — Pre Wedding",
    "sizeMb": 30.5
  }
]

const heroVideoId = "aryan-vishwa-save-the-date"
export const heroVideo: VideoItem | null =
  videos.find((v) => v.id === heroVideoId) ?? videos[0] ?? null

import { asset } from '../utils/asset'

export type VideoItem = {
  id: string
  src: string
  poster: string
  title: string
  sizeMb?: number
}

export const videos: VideoItem[] = [
  {
    id: '001-karan-aangi-save-the-date',
    src: asset('/media/videos/001-karan-aangi-save-the-date.mp4'),
    poster: asset('/media/posters/001-karan-aangi-save-the-date.jpg'),
    title: 'Karan & Aangi — Save the Date',
    sizeMb: 12.7,
  },
  {
    id: 'aangi-wed-teaser',
    src: asset('/media/videos/aangi-wed-teaser.mp4'),
    poster: asset('/media/posters/aangi-wed-teaser.jpg'),
    title: 'Aangi — Wedding Teaser',
    sizeMb: 25.9,
  },
  {
    id: 'aryan-vishwa-save-the-date',
    src: asset('/media/videos/aryan-vishwa-save-the-date.mp4'),
    poster: asset('/media/posters/aryan-vishwa-save-the-date.jpg'),
    title: 'Aryan & Vishwa — Save the Date',
    sizeMb: 11.3,
  },
  {
    id: 'hardik-vishakha-wedding-teaser-by-shaan-photography',
    src: asset('/media/videos/hardik-vishakha-wedding-teaser-by-shaan-photography.mp4'),
    poster: asset('/media/posters/hardik-vishakha-wedding-teaser-by-shaan-photography.jpg'),
    title: 'Hardik & Vishakha — Wedding Teaser',
    sizeMb: 34.9,
  },
  {
    id: 'karan-aangi-pre-wedding',
    src: asset('/media/videos/karan-aangi-pre-wedding.mp4'),
    poster: asset('/media/posters/karan-aangi-pre-wedding.jpg'),
    title: 'Karan & Aangi — Pre Wedding',
    sizeMb: 30.5,
  },
]

const heroVideoId = 'aryan-vishwa-save-the-date'
export const heroVideo: VideoItem | null =
  videos.find((v) => v.id === heroVideoId) ?? videos[0] ?? null

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { VideoItem } from '../../data/galleryData'

type Props = {
  video: VideoItem
}

const FILM_PLAY_EVENT = 'shaan:film-play'

type FilmPlayDetail = { id: string }

export function VideoPlayer({ video }: Props) {
  const containerRef = useRef<HTMLElement>(null)
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const stopPlayback = () => {
    const el = ref.current
    if (!el) return
    el.pause()
    el.muted = true
    el.volume = 0
    setPlaying(false)
  }

  /** Stop every other film so only one plays with sound. */
  const stopOtherFilms = () => {
    document.querySelectorAll<HTMLVideoElement>('video[data-film-video]').forEach((other) => {
      if (other === ref.current) return
      other.pause()
      other.muted = true
      other.volume = 0
    })
    window.dispatchEvent(
      new CustomEvent<FilmPlayDetail>(FILM_PLAY_EVENT, { detail: { id: video.id } }),
    )
  }

  const startWithSound = async () => {
    const el = ref.current
    if (!el) return

    stopOtherFilms()

    el.defaultMuted = false
    el.muted = false
    el.volume = 1
    setPlaying(true)

    try {
      await el.play()
    } catch {
      el.controls = true
    }
  }

  // Another film started → stop this one (UI + audio)
  useEffect(() => {
    const onOtherPlay = (event: Event) => {
      const id = (event as CustomEvent<FilmPlayDetail>).detail?.id
      if (id && id !== video.id) stopPlayback()
    }
    window.addEventListener(FILM_PLAY_EVENT, onOtherPlay)
    return () => window.removeEventListener(FILM_PLAY_EVENT, onOtherPlay)
  }, [video.id])

  // Scroll away → stop this film
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const check = () => {
      const rect = root.getBoundingClientRect()
      const viewH = window.innerHeight || 1
      const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0)
      const ratio = visible <= 0 ? 0 : visible / Math.max(rect.height, 1)
      if (ratio < 0.35) stopPlayback()
    }

    window.addEventListener('scroll', check, { passive: true, capture: true })
    window.addEventListener('resize', check, { passive: true })

    const observer = new IntersectionObserver(check, {
      threshold: [0, 0.25, 0.35, 0.5, 1],
    })
    observer.observe(root)

    const onVisibility = () => {
      if (document.hidden) stopPlayback()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', check, true)
      window.removeEventListener('resize', check)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <motion.article
      ref={containerRef}
      className="group"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="relative aspect-video overflow-hidden bg-chocolate">
        <video
          ref={ref}
          data-film-video={video.id}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          src={video.src}
          poster={video.poster}
          preload="metadata"
          playsInline
          controls={playing}
          muted={!playing}
          onPlay={(e) => {
            const el = e.currentTarget
            stopOtherFilms()
            el.muted = false
            el.volume = 1
            setPlaying(true)
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />

        {!playing ? (
          <button
            type="button"
            onClick={startWithSound}
            className="absolute inset-0 z-10 flex items-center justify-center bg-deep-brown/25 transition hover:bg-deep-brown/35"
            aria-label={`Play ${video.title}`}
          >
            <motion.span
              className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/70 bg-deep-brown/45 text-ivory backdrop-blur-sm"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
                <path d="M5 3.5v11l10-5.5L5 3.5z" />
              </svg>
            </motion.span>
          </button>
        ) : null}
      </div>
      <p className="mt-3 font-serif text-xl text-ivory">{video.title}</p>
    </motion.article>
  )
}

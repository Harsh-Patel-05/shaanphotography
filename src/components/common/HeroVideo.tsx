import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  poster?: string
  className?: string
}

function atHeroTop() {
  return (window.scrollY || document.documentElement.scrollTop || 0) < 80
}

/**
 * Hero plays with sound only while mounted at page top.
 * Scroll away → unmount <video> entirely (only way to guarantee audio dies).
 */
export function HeroVideo({ src, poster, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(() =>
    typeof window === 'undefined' ? true : atHeroTop(),
  )
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  const mediaSrc = src.includes('?') ? `${src}&v=audio` : `${src}?v=audio`

  // Scroll → mount/unmount video
  useEffect(() => {
    const sync = () => setActive(atHeroTop())
    sync()
    window.addEventListener('scroll', sync, { passive: true, capture: true })
    window.addEventListener('resize', sync, { passive: true })
    return () => {
      window.removeEventListener('scroll', sync, true)
      window.removeEventListener('resize', sync)
    }
  }, [])

  // While mounted, play with sound; cleanup pauses before unmount
  useEffect(() => {
    if (!active) return
    const video = videoRef.current
    if (!video) return

    let cancelled = false
    let retryTimer: number | undefined

    const stop = () => {
      video.pause()
      video.muted = true
      video.volume = 0
    }

    const play = async () => {
      if (cancelled || !atHeroTop()) {
        stop()
        return
      }
      video.defaultMuted = false
      video.muted = false
      video.volume = 1
      video.removeAttribute('muted')
      try {
        await video.play()
        if (cancelled || !atHeroTop()) stop()
      } catch {
        // retry below
      }
    }

    void play()

    let attempts = 0
    const retry = () => {
      if (cancelled || !atHeroTop()) return
      attempts += 1
      void play().then(() => {
        if (cancelled || !atHeroTop()) return
        if (video.paused && attempts < 25) {
          retryTimer = window.setTimeout(retry, 350)
        }
      })
    }
    retryTimer = window.setTimeout(retry, 200)

    const onVisibility = () => {
      if (document.hidden) stop()
      else void play()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      if (retryTimer) window.clearTimeout(retryTimer)
      document.removeEventListener('visibilitychange', onVisibility)
      stop()
    }
  }, [active, mediaSrc])

  return (
    <div className={`absolute inset-0 overflow-hidden bg-deep-brown ${className}`}>
      {poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            active && ready && !failed ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : null}

      {/* Unmounting is the only reliable way to stop audio on all browsers */}
      {active && !failed ? (
        <video
          ref={videoRef}
          key={mediaSrc}
          data-hero-video="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
          src={mediaSrc}
          poster={poster}
          autoPlay
          loop
          playsInline
          preload="auto"
          onCanPlay={(e) => {
            setReady(true)
            const el = e.currentTarget
            el.muted = false
            el.volume = 1
            void el.play().catch(() => {})
          }}
          onPlaying={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/45 to-deep-brown/25" />
    </div>
  )
}

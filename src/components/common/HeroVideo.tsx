import { useEffect, useRef, useState } from 'react'
import { useIntro } from '../../context/IntroContext'

type Props = {
  src: string
  poster?: string
  className?: string
}

function atHeroTop() {
  return (window.scrollY || document.documentElement.scrollTop || 0) < 80
}

/**
 * Hero background video — autoplays without any click/button.
 * Starts muted (browser-required for autoplay). Tries sound when policy allows.
 */
export function HeroVideo({ src, poster, className = '' }: Props) {
  const { introDone } = useIntro()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(() =>
    typeof window === 'undefined' ? true : atHeroTop(),
  )
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  const shouldMount = introDone && inView && !failed

  useEffect(() => {
    let raf = 0
    const sync = () => {
      raf = 0
      setInView((prev) => {
        const next = atHeroTop()
        return prev === next ? prev : next
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync)
    }
    sync()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (!shouldMount) return
    const video = videoRef.current
    if (!video) return

    let cancelled = false

    const playAuto = async () => {
      if (cancelled || !atHeroTop()) return

      // Autoplay without click = must be muted (browser policy)
      video.defaultMuted = true
      video.muted = true
      video.volume = 0
      video.setAttribute('muted', '')

      try {
        await video.play()
        if (!cancelled) setReady(true)
      } catch {
        // rare
      }

      // If browser already trusts this site (MEI), sound may be allowed
      try {
        video.muted = false
        video.volume = 1
        video.removeAttribute('muted')
        await video.play()
      } catch {
        video.muted = true
        video.volume = 0
        video.setAttribute('muted', '')
        void video.play().catch(() => {})
      }
    }

    void playAuto()

    const onVisibility = () => {
      if (document.hidden) video.pause()
      else if (atHeroTop()) void playAuto()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibility)
      video.pause()
    }
  }, [shouldMount, src])

  return (
    <div className={`absolute inset-0 overflow-hidden bg-deep-brown ${className}`}>
      {poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            shouldMount && ready ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : null}

      {shouldMount ? (
        <video
          ref={videoRef}
          key={`${src}-hero`}
          data-hero-video="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
          src={src}
          poster={poster}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          onPlaying={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/45 to-deep-brown/25" />
    </div>
  )
}

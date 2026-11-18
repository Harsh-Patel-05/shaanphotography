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
 * Hero background video.
 * Autoplay starts muted (browser policy). Sound unlocks on user tap —
 * required on mobile Safari/Chrome where unmuted autoplay is blocked.
 */
export function HeroVideo({ src, poster, className = '' }: Props) {
  const { introDone } = useIntro()
  const videoRef = useRef<HTMLVideoElement>(null)
  const soundOnRef = useRef(false)
  const [inView, setInView] = useState(() =>
    typeof window === 'undefined' ? true : atHeroTop(),
  )
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [soundOn, setSoundOn] = useState(false)

  const shouldMount = introDone && inView && !failed

  useEffect(() => {
    soundOnRef.current = soundOn
  }, [soundOn])

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
    if (!shouldMount) {
      setReady(false)
      return
    }
    const video = videoRef.current
    if (!video) return

    let cancelled = false

    const applySoundPreference = () => {
      if (soundOnRef.current) {
        video.defaultMuted = false
        video.muted = false
        video.volume = 1
        video.removeAttribute('muted')
      } else {
        video.defaultMuted = true
        video.muted = true
        video.volume = 0
      }
    }

    const playHero = async () => {
      if (cancelled || !atHeroTop()) return
      applySoundPreference()
      try {
        await video.play()
        if (!cancelled) setReady(true)
      } catch {
        // If unmuted play fails, fall back to muted autoplay.
        if (soundOnRef.current) {
          soundOnRef.current = false
          setSoundOn(false)
          video.defaultMuted = true
          video.muted = true
          video.volume = 0
          try {
            await video.play()
            if (!cancelled) setReady(true)
          } catch {
            // poster stays
          }
        }
      }
    }

    void playHero()

    const onVisibility = () => {
      if (document.hidden) video.pause()
      else if (atHeroTop()) void playHero()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibility)
      video.pause()
    }
  }, [shouldMount, src])

  const enableSound = async () => {
    const video = videoRef.current
    if (!video) return

    // Keep this in the user-gesture stack — required on iOS/Android.
    video.defaultMuted = false
    video.muted = false
    video.volume = 1
    video.removeAttribute('muted')

    try {
      await video.play()
      soundOnRef.current = true
      setSoundOn(true)
      setReady(true)
    } catch {
      video.muted = true
      video.volume = 0
      soundOnRef.current = false
      setSoundOn(false)
      void video.play().catch(() => {})
    }
  }

  const muteSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.volume = 0
    video.defaultMuted = true
    soundOnRef.current = false
    setSoundOn(false)
  }

  const toggleSound = () => {
    if (soundOn) muteSound()
    else void enableSound()
  }

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
          muted={!soundOn}
          autoPlay
          loop
          playsInline
          preload="auto"
          onPlaying={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/45 to-deep-brown/25" />

      {shouldMount && ready ? (
        <button
          type="button"
          onClick={toggleSound}
          className="pointer-events-auto absolute top-[max(5.5rem,calc(env(safe-area-inset-top)+4.75rem))] right-3 z-20 inline-flex min-h-11 items-center gap-2 rounded-full border border-ivory/25 bg-deep-brown/55 px-3.5 py-2.5 text-[0.62rem] tracking-[0.16em] text-ivory uppercase backdrop-blur-md transition hover:bg-deep-brown/75 active:scale-[0.98] touch-manipulation sm:right-5 sm:top-[max(6.25rem,calc(env(safe-area-inset-top)+5.25rem))] sm:px-4"
          aria-label={soundOn ? 'Mute hero video' : 'Unmute hero video'}
          aria-pressed={soundOn}
        >
          {soundOn ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
          <span>{soundOn ? 'Sound on' : 'Tap for sound'}</span>
        </button>
      ) : null}
    </div>
  )
}

function SpeakerOnIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9v6h3.5L12 19V5L7.5 9H4Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M15.5 8.5a4.5 4.5 0 0 1 0 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M17.8 6a7.5 7.5 0 0 1 0 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

function SpeakerOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9v6h3.5L12 19V5L7.5 9H4Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M16 9.5 20.5 14.5M20.5 9.5 16 14.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

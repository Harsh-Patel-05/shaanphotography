import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ScrollProgress } from '../animations/ScrollProgress'
import { SoftCursor } from '../animations/SoftCursor'
import { BackToTop } from '../common/BackToTop'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

/** Safety net: pause off-screen videos (rAF-throttled). */
function usePauseOffscreenVideos() {
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const viewH = window.innerHeight || 1
      document.querySelectorAll('video').forEach((video) => {
        // Hero manages its own play/pause + sound — never mute it here
        if (video.hasAttribute('data-hero-video')) return

        const rect = video.getBoundingClientRect()
        const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0)
        const ratio = visible <= 0 ? 0 : visible / Math.max(rect.height, 1)
        if (ratio < 0.35 && !video.paused) {
          video.pause()
          video.muted = true
          video.volume = 0
        }
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}

export function MainLayout() {
  usePauseOffscreenVideos()

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <ScrollProgress />
      <SoftCursor />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

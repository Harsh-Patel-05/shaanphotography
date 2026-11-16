import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { BackToTop } from '../common/BackToTop'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

/** Safety net: any video mostly off-screen gets paused + muted. */
function pauseOffscreenVideos() {
  const viewH = window.innerHeight || 1
  document.querySelectorAll('video').forEach((video) => {
    const rect = video.getBoundingClientRect()
    const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0)
    const ratio = visible <= 0 ? 0 : visible / Math.max(rect.height, 1)
    if (ratio < 0.35) {
      video.pause()
      video.muted = true
      video.volume = 0
    }
  })
}

export function MainLayout() {
  useEffect(() => {
    const onScroll = () => pauseOffscreenVideos()
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [])

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

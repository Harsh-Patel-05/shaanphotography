import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Lightweight cursor glow — direct DOM updates, no React re-renders on move.
 */
export function SoftCursor() {
  const reduced = useReducedMotion()
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const el = elRef.current
    if (!el) return

    let raf = 0
    let targetX = -200
    let targetY = -200
    let x = -200
    let y = -200
    let visible = false

    const tick = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      if (Math.abs(targetX - x) > 0.4 || Math.abs(targetY - y) > 0.4) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) {
        visible = true
        el.style.opacity = '0.55'
      }
      wake()
    }
    const onLeave = () => {
      visible = false
      el.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={elRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[45] hidden h-36 w-36 rounded-full opacity-0 transition-opacity duration-300 md:block"
      style={{
        background:
          'radial-gradient(circle, color-mix(in srgb, var(--color-camel) 30%, transparent) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import logo from '../../assets/logos/shaan-logo-white.png'
import { siteConfig } from '../../config/site'
import { useScrollLock } from '../../hooks/useScrollLock'

type Props = {
  onComplete?: () => void
}

export function PageLoader({ onComplete }: Props) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useScrollLock(visible)

  useEffect(() => {
    if (reduced) {
      setVisible(false)
      onComplete?.()
      return
    }

    let frame = 0
    let raf = 0
    const duration = 2100
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Ease-out progress so it feels cinematic, not linear
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        frame = window.setTimeout(() => {
          setVisible(false)
          onComplete?.()
        }, 280)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(frame)
    }
  }, [onComplete, reduced])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-deep-brown"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-busy="true"
          aria-live="polite"
          role="status"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(101,71,53,0.35)_0%,transparent_65%)]" />

          <motion.div
            className="relative z-[1] flex flex-col items-center px-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={logo}
              alt={siteConfig.brand.name}
              className="h-16 w-auto object-contain mix-blend-screen sm:h-20 md:h-[5.5rem]"
              width={240}
              height={96}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="mt-5 font-serif text-lg italic tracking-wide text-sand/85 sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              {siteConfig.brand.tagline}
            </motion.p>

            <div className="mt-10 w-44 sm:w-52">
              <div className="h-px w-full overflow-hidden bg-chocolate/80">
                <div
                  className="h-full bg-camel transition-[width] duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-center text-[0.65rem] tracking-[0.28em] text-sand/70 uppercase">
                {String(progress).padStart(2, '0')}
              </p>
            </div>
          </motion.div>

          <motion.p
            className="absolute bottom-8 left-0 right-0 text-center text-[0.62rem] tracking-[0.32em] text-soft-gray/80 uppercase sm:bottom-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {siteConfig.brand.name}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

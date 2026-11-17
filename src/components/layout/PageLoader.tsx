import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import logo from '../../assets/logos/shaan-logo-white.png'
import { siteConfig } from '../../config/site'
import { useScrollLock } from '../../hooks/useScrollLock'

type Props = {
  onComplete?: () => void
}

const ease = [0.22, 1, 0.36, 1] as const
const exitEase = [0.76, 0, 0.24, 1] as const

const STATUS = ['Framing', 'Focusing', 'Developing', 'Ready'] as const

/** Intro loader — React Bits blur/clip + MotionSites layered curtain. */
export function PageLoader({ onComplete }: Props) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(() => reduced !== true)
  const [phase, setPhase] = useState<'load' | 'hold' | 'exit'>('load')
  const [progress, setProgress] = useState(0)

  const words = useMemo(
    () => siteConfig.brand.tagline.split(' ').filter(Boolean),
    [],
  )

  const statusLabel = useMemo(() => {
    if (progress < 28) return STATUS[0]
    if (progress < 58) return STATUS[1]
    if (progress < 92) return STATUS[2]
    return STATUS[3]
  }, [progress])

  useScrollLock(visible)

  useEffect(() => {
    if (reduced) {
      onComplete?.()
      return
    }

    let raf = 0
    let holdTimer = 0
    let exitTimer = 0
    const duration = 1900
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Slight pause near the end feels more premium
      const shaped = t < 0.85 ? t / 0.85 * 0.92 : 0.92 + ((t - 0.85) / 0.15) * 0.08
      const eased = 1 - Math.pow(1 - Math.min(1, shaped), 3)
      setProgress(Math.round(eased * 100))

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        setPhase('hold')
        holdTimer = window.setTimeout(() => {
          setPhase('exit')
          exitTimer = window.setTimeout(() => {
            setVisible(false)
            onComplete?.()
          }, 1150)
        }, 420)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(holdTimer)
      window.clearTimeout(exitTimer)
    }
  }, [onComplete, reduced])

  const exiting = phase === 'exit'

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          aria-busy="true"
          aria-live="polite"
          role="status"
        >
          {/* Curtain stack — bottom → top */}
          <motion.div
            className="absolute inset-0 bg-camel"
            initial={false}
            animate={exiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.78, ease: exitEase, delay: exiting ? 0.2 : 0 }}
          />
          <motion.div
            className="absolute inset-0 bg-chocolate"
            initial={false}
            animate={exiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.84, ease: exitEase, delay: exiting ? 0.1 : 0 }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-deep-brown"
            initial={false}
            animate={exiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.9, ease: exitEase }}
          >
            {/* Film grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_560px_at_50%_42%,rgb(193_154_107/0.2),transparent_62%)]" />

            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-[18%] left-[12%] h-40 w-40 rounded-full bg-camel/15 blur-3xl sm:h-56 sm:w-56"
              animate={{ y: [0, -14, 0], x: [0, 8, 0], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute right-[10%] bottom-[20%] h-48 w-48 rounded-full bg-sand/10 blur-3xl sm:h-64 sm:w-64"
              animate={{ y: [0, 12, 0], x: [0, -10, 0], opacity: [0.22, 0.4, 0.22] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />

            {/* Editorial corner marks */}
            <motion.span
              aria-hidden
              className="absolute top-6 left-6 h-8 w-8 border-t border-l border-camel/35 sm:top-8 sm:left-8 sm:h-10 sm:w-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            />
            <motion.span
              aria-hidden
              className="absolute top-6 right-6 h-8 w-8 border-t border-r border-camel/35 sm:top-8 sm:right-8 sm:h-10 sm:w-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.span
              aria-hidden
              className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-camel/35 sm:bottom-8 sm:left-8 sm:h-10 sm:w-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            />
            <motion.span
              aria-hidden
              className="absolute right-6 bottom-6 h-8 w-8 border-r border-b border-camel/35 sm:right-8 sm:bottom-8 sm:h-10 sm:w-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />

            {/* Watermark */}
            <motion.p
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[46%] -translate-y-1/2 text-center font-serif text-[clamp(4.5rem,20vw,13rem)] leading-none text-ivory/[0.04] select-none"
              initial={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
              animate={{
                opacity: exiting ? 0 : 1,
                scale: exiting ? 1.04 : 1,
                filter: 'blur(0px)',
              }}
              transition={{ duration: 1.25, ease }}
            >
              {siteConfig.brand.shortName}
            </motion.p>

            {/* Main content — fades before curtain */}
            <motion.div
              className="relative z-[1] flex flex-col items-center px-8"
              animate={
                exiting
                  ? { opacity: 0, y: -28, scale: 0.97, filter: 'blur(6px)' }
                  : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              }
              transition={{ duration: 0.45, ease }}
            >
              <motion.p
                className="mb-5 text-[0.62rem] tracking-[0.36em] text-camel uppercase sm:mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55, ease }}
              >
                Est. studio
              </motion.p>

              {/* Logo clip reveal */}
              <motion.div
                className="overflow-hidden"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.1, ease, delay: 0.12 }}
              >
                <motion.img
                  src={logo}
                  alt={siteConfig.brand.name}
                  className="h-[4.25rem] w-auto object-contain mix-blend-screen sm:h-20 md:h-[5.75rem]"
                  width={240}
                  height={96}
                  initial={{ scale: 1.14, y: 28, opacity: 0.7 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease, delay: 0.12 }}
                />
              </motion.div>

              {/* Hairline under logo */}
              <motion.div
                className="mt-7 h-px w-16 origin-center bg-gradient-to-r from-transparent via-camel/70 to-transparent sm:mt-8 sm:w-20"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.7, ease }}
              />

              {/* Blur-text tagline */}
              <p className="mt-5 flex max-w-lg flex-wrap justify-center gap-x-2.5 gap-y-1 font-serif text-[1.05rem] italic tracking-wide text-sand/90 sm:mt-6 sm:text-xl md:text-[1.35rem]">
                {words.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="inline-block will-change-[filter,transform]"
                    initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.62 + i * 0.075,
                      ease,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>

              {/* Progress block */}
              <motion.div
                className="mt-12 w-52 sm:mt-14 sm:w-64"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.55, ease }}
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={statusLabel}
                      className="text-[0.62rem] tracking-[0.3em] text-sand/60 uppercase"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      {statusLabel}
                    </motion.span>
                  </AnimatePresence>
                  <span className="font-serif text-[1.75rem] leading-none tabular-nums text-ivory sm:text-3xl">
                    {String(progress).padStart(2, '0')}
                    <span className="ml-0.5 text-sm text-camel/80">%</span>
                  </span>
                </div>

                <div className="relative h-[2px] w-full overflow-hidden bg-chocolate/80">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-desert via-camel to-sand"
                    style={{ width: `${progress}%` }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-ivory/55 to-transparent"
                    animate={{ x: [`-30%`, `${progress * 2.4}%`] }}
                    transition={{ duration: 0.35, ease: 'linear' }}
                  />
                </div>

                {/* Tick marks */}
                <div className="mt-2 flex justify-between px-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-px ${
                        progress >= i * 25 ? 'bg-camel/70' : 'bg-chocolate'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.p
              className="absolute bottom-9 left-0 right-0 text-center text-[0.62rem] tracking-[0.34em] text-soft-gray/70 uppercase sm:bottom-11"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {siteConfig.brand.name}
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import logo from '../../assets/logos/shaan-logo-white.png'
import { siteConfig } from '../../config/site'
import { useIntro } from '../../context/IntroContext'
import { useScrollLock } from '../../hooks/useScrollLock'

const ease = [0.22, 1, 0.36, 1] as const
const exitEase = [0.76, 0, 0.24, 1] as const

const STATUS = ['Framing', 'Focusing', 'Developing', 'Ready'] as const

const RING = 168
const RING_R = 74
const RING_C = 2 * Math.PI * RING_R

const STAIR_COUNT = 6

/** Intro loader — React Bits circle/blur + MotionSites layered curtain. */
export function PageLoader() {
  const reduced = useReducedMotion()
  const { setIntroDone } = useIntro()
  const [visible, setVisible] = useState(() => reduced !== true)
  const [phase, setPhase] = useState<'load' | 'hold' | 'exit'>('load')
  const [progress, setProgress] = useState(0)

  const words = useMemo(
    () => siteConfig.brand.tagline.split(' ').filter(Boolean),
    [],
  )

  const orbitText = useMemo(
    () => `${siteConfig.brand.name.toUpperCase()}  ·  EST. STUDIO  ·  `,
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
      setIntroDone(true)
      return
    }

    let raf = 0
    let holdTimer = 0
    let exitTimer = 0
    const duration = 2200
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const shaped = t < 0.82 ? (t / 0.82) * 0.9 : 0.9 + ((t - 0.82) / 0.18) * 0.1
      const eased = 1 - Math.pow(1 - Math.min(1, shaped), 3)
      setProgress(Math.round(eased * 100))

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        setPhase('hold')
        holdTimer = window.setTimeout(() => {
          setIntroDone(true)
          setPhase('exit')
          exitTimer = window.setTimeout(() => setVisible(false), 1280)
        }, 420)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(holdTimer)
      window.clearTimeout(exitTimer)
    }
  }, [reduced, setIntroDone])

  const exiting = phase === 'exit'
  const strokeOffset = RING_C - (progress / 100) * RING_C

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          aria-busy="true"
          aria-live="polite"
          role="status"
          aria-label="Loading studio"
        >
          {/* MotionSites curtain stack */}
          <motion.div
            className="absolute inset-0 bg-sand"
            initial={false}
            animate={exiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.72, ease: exitEase, delay: exiting ? 0.28 : 0 }}
          />
          <motion.div
            className="absolute inset-0 bg-camel"
            initial={false}
            animate={exiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.78, ease: exitEase, delay: exiting ? 0.18 : 0 }}
          />
          <motion.div
            className="absolute inset-0 bg-chocolate"
            initial={false}
            animate={exiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.86, ease: exitEase, delay: exiting ? 0.08 : 0 }}
          />

          {/* React Bits stairs reveal on exit */}
          {exiting
            ? Array.from({ length: STAIR_COUNT }, (_, i) => (
                <motion.div
                  key={`stair-${i}`}
                  className="absolute inset-y-0 bg-deep-brown"
                  style={{
                    left: `${(i / STAIR_COUNT) * 100}%`,
                    width: `${100 / STAIR_COUNT + 0.35}%`,
                  }}
                  initial={{ y: 0 }}
                  animate={{ y: '-110%' }}
                  transition={{
                    duration: 0.85,
                    ease: exitEase,
                    delay: 0.04 + i * 0.055,
                  }}
                />
              ))
            : null}

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-deep-brown"
            initial={false}
            animate={exiting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.35, ease }}
          >
            {/* Film grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(920px_520px_at_50%_40%,rgb(193_154_107/0.22),transparent_60%)]" />

            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-[16%] left-[10%] h-44 w-44 rounded-full bg-camel/20 blur-3xl sm:h-60 sm:w-60"
              animate={{ y: [0, -16, 0], x: [0, 10, 0], opacity: [0.28, 0.52, 0.28] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute right-[8%] bottom-[18%] h-52 w-52 rounded-full bg-sand/12 blur-3xl sm:h-72 sm:w-72"
              animate={{ y: [0, 14, 0], x: [0, -12, 0], opacity: [0.2, 0.42, 0.2] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />

            {/* Corner marks */}
            {(
              [
                'top-6 left-6 border-t border-l sm:top-8 sm:left-8',
                'top-6 right-6 border-t border-r sm:top-8 sm:right-8',
                'bottom-6 left-6 border-b border-l sm:bottom-8 sm:left-8',
                'right-6 bottom-6 border-r border-b sm:right-8 sm:bottom-8',
              ] as const
            ).map((cls, i) => (
              <motion.span
                key={cls}
                aria-hidden
                className={`absolute h-8 w-8 border-camel/40 sm:h-11 sm:w-11 ${cls}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: exiting ? 0 : 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.55, ease }}
              />
            ))}

            {/* Soft watermark */}
            <motion.p
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[44%] -translate-y-1/2 text-center font-serif text-[clamp(5rem,22vw,14rem)] leading-none text-ivory/[0.035] select-none"
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              animate={{
                opacity: exiting ? 0 : 1,
                scale: exiting ? 1.06 : 1,
                filter: 'blur(0px)',
              }}
              transition={{ duration: 1.3, ease }}
            >
              {siteConfig.brand.shortName}
            </motion.p>

            <motion.div
              className="relative z-[1] flex flex-col items-center px-8"
              animate={
                exiting
                  ? { opacity: 0, y: -36, scale: 0.96, filter: 'blur(8px)' }
                  : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              }
              transition={{ duration: 0.42, ease }}
            >
              <motion.p
                className="mb-6 text-[0.62rem] tracking-[0.4em] text-camel uppercase sm:mb-7"
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.12, duration: 0.6, ease }}
              >
                Est. studio
              </motion.p>

              {/* Circular progress + orbit text around logo */}
              <div className="relative flex h-[11.5rem] w-[11.5rem] items-center justify-center sm:h-[13.5rem] sm:w-[13.5rem]">
                <motion.svg
                  aria-hidden
                  className="absolute inset-0 h-full w-full -rotate-90"
                  viewBox={`0 0 ${RING} ${RING}`}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease, delay: 0.1 }}
                >
                  <circle
                    cx={RING / 2}
                    cy={RING / 2}
                    r={RING_R}
                    fill="none"
                    stroke="rgb(92 64 51 / 0.55)"
                    strokeWidth="1.25"
                  />
                  <circle
                    cx={RING / 2}
                    cy={RING / 2}
                    r={RING_R}
                    fill="none"
                    stroke="url(#loaderRing)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={strokeOffset}
                    className="transition-[stroke-dashoffset] duration-100 ease-out"
                  />
                  <defs>
                    <linearGradient id="loaderRing" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C19A6B" />
                      <stop offset="55%" stopColor="#E8D9C5" />
                      <stop offset="100%" stopColor="#A67C52" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* React Bits–style circular text */}
                <motion.div
                  aria-hidden
                  className="absolute inset-[-6%] sm:inset-[-8%]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7, rotate: 360 }}
                  transition={{
                    opacity: { delay: 0.35, duration: 0.8 },
                    rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
                  }}
                >
                  <svg viewBox="0 0 200 200" className="h-full w-full">
                    <defs>
                      <path
                        id="loaderOrbit"
                        d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
                      />
                    </defs>
                    <text className="fill-sand/55 text-[9px] tracking-[0.32em] uppercase">
                      <textPath href="#loaderOrbit" startOffset="0%">
                        {orbitText.repeat(2)}
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                <motion.div
                  className="relative overflow-hidden rounded-full"
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  animate={{ clipPath: 'inset(0% 0 0 0)' }}
                  transition={{ duration: 1.05, ease, delay: 0.15 }}
                >
                  <motion.img
                    src={logo}
                    alt={siteConfig.brand.name}
                    className="h-[3.6rem] w-auto object-contain mix-blend-screen sm:h-[4.4rem]"
                    width={220}
                    height={88}
                    initial={{ scale: 1.16, y: 22, opacity: 0.65 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ duration: 1.15, ease, delay: 0.15 }}
                  />
                </motion.div>
              </div>

              {/* Percentage + status */}
              <motion.div
                className="mt-9 flex flex-col items-center sm:mt-10"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.55, ease }}
              >
                <div className="flex items-end gap-1.5">
                  <span className="font-serif text-[2.75rem] leading-none tabular-nums text-ivory sm:text-[3.35rem]">
                    {String(progress).padStart(2, '0')}
                  </span>
                  <span className="mb-1.5 text-sm tracking-[0.12em] text-camel/85">%</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusLabel}
                    className="mt-3 text-[0.64rem] tracking-[0.34em] text-sand/65 uppercase"
                    initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{ duration: 0.28 }}
                  >
                    {statusLabel}
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              {/* Thin progress bar */}
              <motion.div
                className="mt-8 w-48 sm:mt-9 sm:w-56"
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.55, ease }}
              >
                <div className="relative h-[1.5px] w-full overflow-hidden bg-chocolate/90">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-desert via-camel to-sand"
                    style={{ width: `${progress}%` }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-ivory/50 to-transparent"
                    animate={{ x: [`-40%`, `${Math.max(progress * 2.2, 8)}%`] }}
                    transition={{ duration: 0.3, ease: 'linear' }}
                  />
                </div>
              </motion.div>

              {/* Blur-text tagline */}
              <p className="mt-8 flex max-w-md flex-wrap justify-center gap-x-2.5 gap-y-1 font-serif text-[1.02rem] italic tracking-wide text-sand/88 sm:mt-9 sm:text-xl">
                {words.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="inline-block will-change-[filter,transform]"
                    initial={{ opacity: 0, y: 14, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.58,
                      delay: 0.78 + i * 0.07,
                      ease,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>

            <motion.p
              className="absolute bottom-9 left-0 right-0 text-center text-[0.62rem] tracking-[0.36em] text-soft-gray/65 uppercase sm:bottom-11"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: 1, duration: 0.55 }}
            >
              {siteConfig.brand.name}
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

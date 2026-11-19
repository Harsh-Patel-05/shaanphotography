import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import logoWhite from '../../assets/logos/shaan-logo-white.png'
import { siteConfig } from '../../config/site'
import { useIntro } from '../../context/IntroContext'
import { asset } from '../../utils/asset'
import { useScrollLock } from '../../hooks/useScrollLock'

const ease = [0.22, 1, 0.36, 1] as const
const progressEase = [0.33, 0.0, 0.12, 1] as const

const RING = 210
const STROKE = 1.5
const RADIUS = (RING - STROKE) / 2 - 4
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** User-selected loader backdrop (IMG_6360 wedding frame). */
const LOADER_BG = asset('/media/photos/p071-img-6360-jpg.jpg')

/**
 * Studio intro — blurred photo, camel ring, centered Shaan Photography mark.
 */
export function PageLoader() {
  const reduced = useReducedMotion()
  const { setIntroDone } = useIntro()
  const [visible, setVisible] = useState(() => reduced !== true)
  const [exiting, setExiting] = useState(false)
  const [percent, setPercent] = useState(0)

  const progress = useMotionValue(0)
  const dashOffset = useTransform(progress, (v) => CIRCUMFERENCE * (1 - v))

  useScrollLock(visible)

  useMotionValueEvent(progress, 'change', (v) => {
    const next = Math.round(v * 100)
    setPercent((prev) => (prev === next ? prev : next))
  })

  useEffect(() => {
    if (reduced) {
      setIntroDone(true)
      return
    }

    let holdTimer = 0
    let exitTimer = 0
    let cancelled = false

    const controls = animate(progress, 1, {
      duration: 2.35,
      ease: progressEase,
      onComplete: () => {
        if (cancelled) return
        holdTimer = window.setTimeout(() => {
          setIntroDone(true)
          setExiting(true)
          exitTimer = window.setTimeout(() => setVisible(false), 820)
        }, 420)
      },
    })

    return () => {
      cancelled = true
      controls.stop()
      window.clearTimeout(holdTimer)
      window.clearTimeout(exitTimer)
    }
  }, [progress, reduced, setIntroDone])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="studio-loader"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-deep-brown"
          style={{ color: '#faf7f2', willChange: 'opacity' }}
          aria-busy="true"
          aria-live="polite"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Photo — full-bleed cover, framed on the couple (portrait src) */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0.94 }}
            animate={{
              opacity: exiting ? 0.8 : 1,
              scale: exiting ? 1.04 : 1,
            }}
            transition={{ duration: exiting ? 0.85 : 1.6, ease }}
          >
            <img
              src={LOADER_BG}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                /* Portrait 2:3 on wide screens — bias up so heads stay in frame */
                objectPosition: 'center 28%',
                filter: 'blur(4px) saturate(1.12) brightness(0.9)',
              }}
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>

          {/* Warm desert wash — brand palette, not flat black */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(55% 45% at 50% 42%, rgba(193,154,107,0.18), transparent 70%),
                radial-gradient(90% 70% at 50% 50%, rgba(42,31,26,0.22), rgba(42,31,26,0.62)),
                linear-gradient(180deg, rgba(42,31,26,0.35), rgba(42,31,26,0.55) 55%, rgba(28,21,18,0.72))
              `,
            }}
          />

          {/* Center mark */}
          <div className="relative z-[1] flex flex-col items-center px-6">
            <motion.div
              className="relative flex items-center justify-center"
              style={{ width: RING, height: RING }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={
                exiting
                  ? { scale: 1.1, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: exiting ? 0.55 : 0.75, ease }}
            >
              {/* Soft glass plate */}
              <div
                className="pointer-events-none absolute inset-3 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 50% 40%, rgba(250,247,242,0.08), rgba(42,31,26,0.45) 62%, rgba(42,31,26,0.15) 100%)',
                  boxShadow:
                    'inset 0 1px 0 rgba(232,217,197,0.18), 0 20px 50px rgba(0,0,0,0.28)',
                  border: '1px solid rgba(232,217,197,0.12)',
                }}
                aria-hidden
              />

              <svg
                className="absolute inset-0 -rotate-90"
                width={RING}
                height={RING}
                viewBox={`0 0 ${RING} ${RING}`}
                aria-hidden
              >
                {/* Track */}
                <circle
                  cx={RING / 2}
                  cy={RING / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(232,217,197,0.18)"
                  strokeWidth={STROKE}
                />
                {/* Camel glow */}
                <motion.circle
                  cx={RING / 2}
                  cy={RING / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(193,154,107,0.45)"
                  strokeWidth={STROKE + 4}
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  style={{
                    strokeDashoffset: dashOffset,
                    filter: 'blur(3px)',
                  }}
                />
                {/* Progress — desert → camel */}
                <motion.circle
                  cx={RING / 2}
                  cy={RING / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="url(#loaderRingGrad)"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  style={{
                    strokeDashoffset: dashOffset,
                    willChange: 'stroke-dashoffset',
                  }}
                />
                <defs>
                  <linearGradient id="loaderRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a67b52" />
                    <stop offset="55%" stopColor="#c19a6b" />
                    <stop offset="100%" stopColor="#e8d9c5" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div
                className="relative z-[1] flex flex-col items-center px-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.65, ease }}
              >
                <img
                  src={logoWhite}
                  alt=""
                  aria-hidden
                  className="h-10 w-auto object-contain sm:h-11"
                  style={{ filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.4))' }}
                  width={240}
                  height={96}
                  decoding="async"
                />
                <div
                  className="mt-2.5 h-px w-8"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(193,154,107,0.85), transparent)',
                  }}
                  aria-hidden
                />
                <p
                  className="mt-2.5 text-[0.6rem] uppercase sm:text-[0.64rem]"
                  style={{
                    letterSpacing: '0.38em',
                    color: '#c19a6b',
                    textShadow: '0 2px 12px rgba(0,0,0,0.35)',
                    marginLeft: '0.38em',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                  }}
                >
                  Photography
                </p>
                <span className="sr-only">{siteConfig.brand.name}</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-7 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: 0.3, duration: 0.45 }}
            >
              <p
                className="tabular-nums"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.2em',
                  color: '#e8d9c5',
                  textShadow: '0 2px 14px rgba(0,0,0,0.4)',
                }}
              >
                {String(percent).padStart(2, '0')}
                <span style={{ color: 'rgba(193,154,107,0.7)', marginLeft: 2 }}>%</span>
              </p>
              <p
                className="text-[0.58rem] uppercase"
                style={{
                  letterSpacing: '0.3em',
                  color: 'rgba(232,217,197,0.55)',
                }}
              >
                {percent < 100 ? 'Opening studio' : 'Welcome in'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

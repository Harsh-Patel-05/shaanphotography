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
import { siteConfig } from '../../config/site'
import { useIntro } from '../../context/IntroContext'
import { useScrollLock } from '../../hooks/useScrollLock'

const ease = [0.22, 1, 0.36, 1] as const
const progressEase = [0.33, 0.0, 0.12, 1] as const

const RING = 156
const STROKE = 1.75
const RADIUS = (RING - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Studio ring intro — GPU-smooth progress (motion values, no per-frame React).
 */
export function PageLoader() {
  const reduced = useReducedMotion()
  const { setIntroDone } = useIntro()
  const [visible, setVisible] = useState(() => reduced !== true)
  const [exiting, setExiting] = useState(false)
  const [percent, setPercent] = useState(0)
  const [status, setStatus] = useState('Opening gallery')

  const progress = useMotionValue(0)
  const dashOffset = useTransform(progress, (v) => CIRCUMFERENCE * (1 - v))
  const barScale = useTransform(progress, (v) => Math.max(0.001, v))

  useScrollLock(visible)

  useMotionValueEvent(progress, 'change', (v) => {
    const next = Math.round(v * 100)
    setPercent((prev) => (prev === next ? prev : next))
    if (v >= 0.995) setStatus('Welcome in')
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
      duration: 2.15,
      ease: progressEase,
      onComplete: () => {
        if (cancelled) return
        holdTimer = window.setTimeout(() => {
          setIntroDone(true)
          setExiting(true)
          exitTimer = window.setTimeout(() => setVisible(false), 820)
        }, 380)
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
          className="fixed inset-0 z-[100] flex flex-col bg-[#1c1512]"
          style={{ color: '#faf7f2', willChange: 'opacity' }}
          aria-busy="true"
          aria-live="polite"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease }}
        >
          {/* Warm glow */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(620px 400px at 50% 40%, rgba(193,154,107,0.18), transparent 65%)',
            }}
            initial={{ opacity: 0.55, scale: 0.96 }}
            animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.04 : 1 }}
            transition={{ duration: exiting ? 0.7 : 1.2, ease }}
          />

          {/* Floating accents */}
          <motion.span
            className="pointer-events-none absolute top-[20%] left-[14%] size-1.5 rounded-full"
            style={{ background: 'rgba(193,154,107,0.55)' }}
            animate={{ y: [0, -10, 0], opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="pointer-events-none absolute top-[32%] right-[18%] size-1 rounded-full"
            style={{ background: 'rgba(232,217,197,0.45)' }}
            animate={{ y: [0, 12, 0], opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.span
            className="pointer-events-none absolute bottom-[26%] left-[20%] size-1 rounded-full"
            style={{ background: 'rgba(193,154,107,0.4)' }}
            animate={{ x: [0, 8, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          />

          {/* Top meta */}
          <motion.div
            className="relative z-[1] flex items-center justify-between px-6 pt-8 sm:px-10"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: exiting ? 0 : 1, y: exiting ? -6 : 0 }}
            transition={{ duration: 0.55, ease, delay: exiting ? 0 : 0.12 }}
          >
            <p
              className="text-[0.65rem] uppercase"
              style={{ letterSpacing: '0.28em', color: 'rgba(232,217,197,0.55)' }}
            >
              {siteConfig.contact.location}
            </p>
            <div
              className="h-px w-12 sm:w-16"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(193,154,107,0.7), transparent)',
              }}
            />
            <p
              className="text-[0.65rem] uppercase"
              style={{ letterSpacing: '0.28em', color: 'rgba(232,217,197,0.55)' }}
            >
              Est. Studio
            </p>
          </motion.div>

          {/* Center stage */}
          <div className="relative z-[1] flex flex-1 flex-col items-center justify-center px-6">
            <motion.div
              className="relative flex items-center justify-center"
              style={{ width: RING, height: RING }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={
                exiting
                  ? { scale: 1.08, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: exiting ? 0.55 : 0.7, ease }}
            >
              <svg
                className="absolute inset-0 -rotate-90"
                width={RING}
                height={RING}
                viewBox={`0 0 ${RING} ${RING}`}
                aria-hidden
              >
                <circle
                  cx={RING / 2}
                  cy={RING / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={STROKE}
                />
                {/* Soft under-glow stroke */}
                <motion.circle
                  cx={RING / 2}
                  cy={RING / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(193,154,107,0.28)"
                  strokeWidth={STROKE + 3}
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  style={{
                    strokeDashoffset: dashOffset,
                    filter: 'blur(2.5px)',
                  }}
                />
                <motion.circle
                  cx={RING / 2}
                  cy={RING / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="#c19a6b"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  style={{
                    strokeDashoffset: dashOffset,
                    willChange: 'stroke-dashoffset',
                  }}
                />
              </svg>

              <div className="relative z-[1] flex flex-col items-center">
                <motion.p
                  className="font-serif italic"
                  style={{
                    fontSize: '2.05rem',
                    letterSpacing: '0.04em',
                    color: '#faf7f2',
                    lineHeight: 1,
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.65, ease }}
                >
                  {siteConfig.brand.shortName}
                </motion.p>
                <motion.p
                  className="mt-2.5 tabular-nums"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    color: 'rgba(193,154,107,0.92)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                >
                  {String(percent).padStart(2, '0')}
                </motion.p>
              </div>
            </motion.div>

            <motion.p
              className="mt-9 max-w-[18rem] text-center font-serif italic sm:max-w-[22rem]"
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.55,
                color: 'rgba(232,217,197,0.78)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: exiting ? 0 : 1, y: exiting ? 6 : 0 }}
              transition={{ delay: exiting ? 0 : 0.28, duration: 0.6, ease }}
            >
              {siteConfig.brand.tagline}
            </motion.p>

            <motion.div
              className="mt-7 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: exiting ? 0 : 0.42, duration: 0.5 }}
            >
              <span className="h-px w-7" style={{ background: 'rgba(193,154,107,0.55)' }} />
              <span
                className="text-[0.62rem] uppercase"
                style={{ letterSpacing: '0.26em', color: 'rgba(232,217,197,0.5)' }}
              >
                Photography
              </span>
              <span className="h-px w-7" style={{ background: 'rgba(193,154,107,0.55)' }} />
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            className="relative z-[1] px-6 pb-8 sm:px-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: exiting ? 0 : 1, y: exiting ? 8 : 0 }}
            transition={{ duration: 0.55, ease, delay: exiting ? 0 : 0.2 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className="text-[0.62rem] uppercase"
                style={{ letterSpacing: '0.24em', color: 'rgba(232,217,197,0.45)' }}
              >
                {status}
              </span>
              <span
                className="text-[0.62rem] uppercase"
                style={{ letterSpacing: '0.24em', color: 'rgba(193,154,107,0.75)' }}
              >
                Shaan Photography
              </span>
            </div>
            <div
              className="h-[2px] w-full overflow-hidden rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <motion.div
                className="h-full w-full origin-left rounded-full"
                style={{
                  scaleX: barScale,
                  background: 'linear-gradient(90deg, #a67b52, #c19a6b, #e8d9c5)',
                  willChange: 'transform',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { siteConfig } from '../../config/site'
import { useIntro } from '../../context/IntroContext'
import { useScrollLock } from '../../hooks/useScrollLock'

const ease = [0.22, 1, 0.36, 1] as const

const RING = 148
const STROKE = 2
const RADIUS = (RING - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Studio ring intro — balanced, not empty, not flashy.
 * Wordmark inside progress ring + tagline + soft status.
 */
export function PageLoader() {
  const reduced = useReducedMotion()
  const { setIntroDone } = useIntro()
  const [visible, setVisible] = useState(() => reduced !== true)
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)

  const percent = Math.round(progress * 100)
  const dashOffset = useMemo(
    () => CIRCUMFERENCE * (1 - progress),
    [progress],
  )

  useScrollLock(visible)

  useEffect(() => {
    if (reduced) {
      setIntroDone(true)
      return
    }

    let raf = 0
    let holdTimer = 0
    let exitTimer = 0
    const duration = 2400
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(1 - Math.pow(1 - t, 2.6))

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(1)
        holdTimer = window.setTimeout(() => {
          setIntroDone(true)
          setExiting(true)
          exitTimer = window.setTimeout(() => setVisible(false), 750)
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

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="studio-loader"
          className="fixed inset-0 z-[100] flex flex-col bg-[#1c1512]"
          style={{ color: '#faf7f2' }}
          aria-busy="true"
          aria-live="polite"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {/* Warm glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(620px 400px at 50% 40%, rgba(193,154,107,0.18), transparent 65%)',
            }}
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
          <div className="relative z-[1] flex items-center justify-between px-6 pt-8 sm:px-10">
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
          </div>

          {/* Center stage */}
          <div className="relative z-[1] flex flex-1 flex-col items-center justify-center px-6">
            <motion.div
              className="relative flex items-center justify-center"
              style={{ width: RING, height: RING }}
              animate={exiting ? { scale: 1.06, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease }}
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
                <circle
                  cx={RING / 2}
                  cy={RING / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="#c19a6b"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  style={{ transition: 'stroke-dashoffset 40ms linear' }}
                />
              </svg>

              <div className="relative z-[1] flex flex-col items-center">
                <p
                  className="font-serif italic"
                  style={{
                    fontSize: '2rem',
                    letterSpacing: '0.04em',
                    color: '#faf7f2',
                    lineHeight: 1,
                  }}
                >
                  {siteConfig.brand.shortName}
                </p>
                <p
                  className="mt-2 tabular-nums"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    color: 'rgba(193,154,107,0.9)',
                  }}
                >
                  {String(percent).padStart(2, '0')}
                </p>
              </div>
            </motion.div>

            <motion.p
              className="mt-9 max-w-[18rem] text-center font-serif italic sm:max-w-[22rem]"
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.55,
                color: 'rgba(232,217,197,0.78)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease }}
            >
              {siteConfig.brand.tagline}
            </motion.p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-7" style={{ background: 'rgba(193,154,107,0.55)' }} />
              <span
                className="text-[0.62rem] uppercase"
                style={{ letterSpacing: '0.26em', color: 'rgba(232,217,197,0.5)' }}
              >
                Photography
              </span>
              <span className="h-px w-7" style={{ background: 'rgba(193,154,107,0.55)' }} />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-[1] px-6 pb-8 sm:px-10">
            <div className="mb-3 flex items-center justify-between">
              <span
                className="text-[0.62rem] uppercase"
                style={{ letterSpacing: '0.24em', color: 'rgba(232,217,197,0.45)' }}
              >
                {percent < 100 ? 'Opening gallery' : 'Welcome in'}
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
              <div
                className="h-full rounded-full origin-left"
                style={{
                  width: `${percent}%`,
                  background: 'linear-gradient(90deg, #a67b52, #c19a6b, #e8d9c5)',
                }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

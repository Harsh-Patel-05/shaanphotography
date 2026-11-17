import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

/**
 * MotionSites-style clip-path wipe reveal for imagery.
 */
export function ClipReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: Props) {
  const reduced = useReducedMotion()

  const clips = {
    up: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'],
    down: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
    left: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'],
    right: ['inset(0 0 0 100%)', 'inset(0 0 0 0)'],
  } as const

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: clips[direction][0], opacity: 0.85 }}
      whileInView={{ clipPath: clips[direction][1], opacity: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 1.25, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

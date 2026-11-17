import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  /** Opt-in only — filter blur is expensive while scrolling. */
  blur?: boolean
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  once = true,
  blur = false,
}: Props) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
        ...(blur ? { filter: 'blur(8px)' } : null),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        ...(blur ? { filter: 'blur(0px)' } : null),
      }}
      viewport={{ once, margin: '-6% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

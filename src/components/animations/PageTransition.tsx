import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

/** Soft page enter — MotionSites fade + lift, no heavy blur. */
export function PageTransition({ children }: Props) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

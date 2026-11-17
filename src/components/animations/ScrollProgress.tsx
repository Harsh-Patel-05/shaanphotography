import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/** Thin top progress bar — MotionSites portfolio polish. */
export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 left-0 z-[45] h-[2px] origin-left bg-camel/90"
      style={{ scaleX }}
    />
  )
}

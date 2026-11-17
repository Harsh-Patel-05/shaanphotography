import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useRef, type PointerEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  rotateAmplitude?: number
  scaleOnHover?: number
}

/**
 * React Bits Tilted Card–inspired 3D tilt — subtle for photography.
 */
export function TiltCard({
  children,
  className = '',
  rotateAmplitude = 8,
  scaleOnHover = 1.02,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude])

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  const onMove = (e: PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`[transform-style:preserve-3d] ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: scaleOnHover }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}

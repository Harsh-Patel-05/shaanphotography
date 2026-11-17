import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { useState, useRef, type PointerEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/** Soft cursor spotlight on a surface — React Bits vibe. */
export function SpotlightCard({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spot = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgb(193 154 107 / 0.2), transparent 55%)`

  const onMove = (e: PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const rect = el.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onPointerMove={onMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: spot, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
      <div className="relative z-[2]">{children}</div>
    </motion.div>
  )
}

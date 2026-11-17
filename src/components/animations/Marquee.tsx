import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
}

/** Infinite horizontal marquee — MotionSites-style strip. */
export function Marquee({ children, className = '', speed = 'normal' }: Props) {
  const duration =
    speed === 'slow' ? '48s' : speed === 'fast' ? '28s' : '38s'

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div className="marquee-track" style={{ animationDuration: duration }}>
        <div className="flex shrink-0 items-center gap-10 pr-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10 pr-10">{children}</div>
      </div>
    </div>
  )
}

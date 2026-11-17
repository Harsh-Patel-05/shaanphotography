import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Soft camel sheen across text — React Bits Shiny Text, photography palette. */
  speed?: number
}

/** Lightweight text sheen in desert/camel tones. */
export function ShinyText({ children, className = '', speed = 3.2 }: Props) {
  return (
    <span
      className={`shiny-text inline-block bg-clip-text text-transparent ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {children}
    </span>
  )
}

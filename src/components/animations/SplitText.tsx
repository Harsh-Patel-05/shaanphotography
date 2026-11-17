import { motion, useReducedMotion } from 'framer-motion'
import type { ElementType } from 'react'

type Props = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  /** Word-by-word entrance — React Bits Split Text vibe. */
  by?: 'words' | 'chars'
}

const ease = [0.22, 1, 0.36, 1] as const

export function SplitText({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.045,
  by = 'words',
}: Props) {
  const reduced = useReducedMotion()
  const parts = by === 'chars' ? Array.from(text) : text.split(/(\s+)/)

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      {parts.map((part, i) => {
        if (by === 'words' && /^\s+$/.test(part)) {
          return <span key={`s-${i}`}>{part}</span>
        }
        return (
          <motion.span
            key={`${part}-${i}`}
            className="inline-block will-change-transform"
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.55,
              delay: delay + i * stagger,
              ease,
            }}
          >
            {part === ' ' ? '\u00A0' : part}
          </motion.span>
        )
      })}
    </Tag>
  )
}

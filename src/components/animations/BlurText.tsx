import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useMemo, useRef } from 'react'

type Props = {
  text: string
  className?: string
  delay?: number
  /** Extra wait before the stagger starts (seconds). */
  startDelay?: number
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  stepDuration?: number
  blur?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function BlurText({
  text,
  className = '',
  delay = 80,
  startDelay = 0,
  animateBy = 'words',
  direction = 'bottom',
  stepDuration = 0.45,
  blur = 12,
  as: Tag = 'p',
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()
  const offset = direction === 'top' ? -28 : 28

  const pieces = useMemo(() => {
    const words = text.split(' ')
    const list: { content: string; key: string }[] = []
    words.forEach((word, w) => {
      const last = w === words.length - 1
      if (animateBy === 'words') {
        list.push({ content: last ? word : `${word}\u00A0`, key: `w-${w}` })
        return
      }
      Array.from(word).forEach((char, c) => {
        list.push({ content: char, key: `c-${w}-${c}` })
      })
      if (!last) list.push({ content: '\u00A0', key: `s-${w}` })
    })
    return list
  }, [text, animateBy])

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag ref={ref as never} className={className}>
      <span className="sr-only">{text}</span>
      {pieces.map((piece, i) => (
        <motion.span
          key={piece.key}
          aria-hidden="true"
          className="inline-block will-change-[transform,filter,opacity]"
          initial={{
            opacity: 0,
            y: offset,
            filter: `blur(${blur}px)`,
          }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: offset, filter: `blur(${blur}px)` }
          }
          transition={{
            duration: stepDuration,
            delay: startDelay + (delay / 1000) * i,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {piece.content}
        </motion.span>
      ))}
    </Tag>
  )
}

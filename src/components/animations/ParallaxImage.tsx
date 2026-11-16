import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className={`h-[115%] w-full object-cover ${imgClassName}`}
        loading="lazy"
      />
    </div>
  )
}

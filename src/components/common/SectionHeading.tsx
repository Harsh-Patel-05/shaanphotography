import { Reveal } from '../animations/Reveal'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  className = '',
}: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const titleColor = light ? 'text-ivory' : 'text-deep-brown'
  const muted = light ? 'text-sand' : 'text-soft-gray'
  const eyebrowColor = light ? 'text-camel' : 'text-desert'

  return (
    <Reveal className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-[0.7rem] uppercase tracking-[0.28em] ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-serif text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.15] font-medium ${titleColor} text-balance`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-3 text-sm leading-relaxed sm:mt-4 sm:text-[0.95rem] ${muted}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

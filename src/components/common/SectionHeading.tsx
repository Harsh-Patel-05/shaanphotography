import { BlurText } from '../animations/BlurText'
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
  const muted = light ? 'text-sand/85' : 'text-soft-gray'
  const eyebrowColor = light ? 'text-camel' : 'text-desert'

  return (
    <Reveal className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-3 inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] ${eyebrowColor}`}
        >
          <span
            aria-hidden
            className={`h-px w-6 ${light ? 'bg-camel/70' : 'bg-desert/60'}`}
          />
          {eyebrow}
          {align === 'center' ? (
            <span
              aria-hidden
              className={`h-px w-6 ${light ? 'bg-camel/70' : 'bg-desert/60'}`}
            />
          ) : null}
        </p>
      ) : null}
      <BlurText
        as="h2"
        text={title}
        className={`font-serif text-[clamp(1.85rem,4.8vw,3.4rem)] leading-[1.12] font-medium ${titleColor} text-balance`}
        delay={55}
        blur={10}
        direction="bottom"
      />
      {description ? (
        <p className={`mt-4 text-sm leading-relaxed sm:mt-5 sm:text-[0.95rem] ${muted}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

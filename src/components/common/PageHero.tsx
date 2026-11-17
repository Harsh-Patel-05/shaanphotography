import type { ReactNode } from 'react'
import { BlurText } from '../animations/BlurText'
import { Reveal } from '../animations/Reveal'
import { SplitText } from '../animations/SplitText'

type Props = {
  eyebrow: string
  title: string
  description?: string
  italicTitle?: boolean
  children?: ReactNode
}

/** Shared page intro — React Bits blur title + split description. */
export function PageHero({
  eyebrow,
  title,
  description,
  italicTitle = false,
  children,
}: Props) {
  return (
    <section className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14 md:pt-36 md:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(820px_420px_at_12%_-10%,rgb(193_154_107/0.14),transparent_55%),radial-gradient(560px_320px_at_100%_0%,rgb(232_217_197/0.35),transparent_50%)]" />

      <div className="section-pad container-wide relative">
        <div
          className={
            children
              ? 'grid items-end gap-8 lg:grid-cols-2 lg:gap-12'
              : 'max-w-3xl'
          }
        >
          <Reveal>
            <p className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.28em] text-desert uppercase">
              <span className="h-px w-6 bg-desert/55" aria-hidden />
              {eyebrow}
            </p>
            <BlurText
              as="h1"
              text={title}
              className={`mt-3 font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.06] text-deep-brown text-balance ${
                italicTitle ? 'italic' : ''
              }`}
              delay={70}
              blur={10}
              startDelay={0.05}
            />
            {description ? (
              <SplitText
                text={description}
                className="mt-4 max-w-xl text-soft-gray leading-relaxed sm:mt-5 sm:text-base"
                delay={0.18}
                stagger={0.02}
              />
            ) : null}
          </Reveal>
          {children ? <Reveal delay={0.1}>{children}</Reveal> : null}
        </div>
      </div>
    </section>
  )
}

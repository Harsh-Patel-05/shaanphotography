import type { ReactNode } from 'react'
import { BlurText } from '../animations/BlurText'
import { Magnet } from '../animations/Magnet'
import { Reveal } from '../animations/Reveal'
import { SplitText } from '../animations/SplitText'
import { Button } from './Button'

type Props = {
  title: string
  description?: string
  primary?: { to: string; label: string }
  secondary?: { to: string; label: string }
  children?: ReactNode
  tone?: 'light' | 'stone'
}

/** End-of-page CTA — blur title, split copy, magnetic buttons. */
export function CtaBand({
  title,
  description,
  primary,
  secondary,
  children,
  tone = 'light',
}: Props) {
  return (
    <section
      className={`relative overflow-hidden py-16 sm:py-20 md:py-28 ${
        tone === 'stone' ? 'surface-stone' : ''
      }`}
    >
      {tone === 'light' ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_380px_at_50%_0%,rgb(193_154_107/0.14),transparent_60%)]" />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_320px_at_50%_10%,rgb(193_154_107/0.1),transparent_55%)]" />
      )}
      <div className="section-pad container-wide relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            {children}
            <BlurText
              as="h2"
              text={title}
              className="font-serif text-[clamp(1.85rem,4vw,3rem)] text-deep-brown text-balance"
              delay={60}
              blur={8}
            />
            {description ? (
              <SplitText
                text={description}
                className="mx-auto mt-4 max-w-xl text-soft-gray"
                delay={0.12}
                stagger={0.018}
              />
            ) : null}
            {(primary || secondary) && (
              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
                {primary ? (
                  <Magnet maxOffset={10} magnetStrength={3.6}>
                    <Button to={primary.to}>{primary.label}</Button>
                  </Magnet>
                ) : null}
                {secondary ? (
                  <Magnet maxOffset={10} magnetStrength={3.6}>
                    <Button to={secondary.to} variant="secondary">
                      {secondary.label}
                    </Button>
                  </Magnet>
                ) : null}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BlurText } from '../../components/animations/BlurText'
import { Magnet } from '../../components/animations/Magnet'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { SplitText } from '../../components/animations/SplitText'
import { Button } from '../../components/common/Button'
import { CtaBand } from '../../components/common/CtaBand'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { siteConfig } from '../../config/site'
import { getUniqueCategoryImages, img, mediaIds } from '../../data/mediaMap'
import { weddingFaq, weddingHero } from '../../data/weddingData'

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-t border-sand">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 py-5 text-left sm:py-6"
      >
        <span className="font-serif text-lg text-deep-brown sm:text-xl">{question}</span>
        <span
          aria-hidden
          className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center border border-sand text-camel transition ${
            open ? 'rotate-45 border-camel bg-sand/40' : ''
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-soft-gray sm:pb-7 sm:text-[0.95rem]">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function WeddingPage() {
  const featureIds = [mediaIds.wedding.hero] as const
  const images = getUniqueCategoryImages('Wedding', featureIds)
  const reduced = useReducedMotion()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const heroImg = img(mediaIds.wedding.hero, 'Wedding').src

  return (
    <PageTransition>
      <SEO
        title="Wedding Photography"
        description="Wedding photography by Shaan — real ceremonies, warm portraits, and the moments in between across Ahmedabad and destination celebrations."
        path="/wedding"
      />

      {/* Full-bleed hero */}
      <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-deep-brown sm:min-h-[80vh] md:min-h-[92vh]">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.12, opacity: 0.55 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {heroImg ? (
            <img
              src={heroImg}
              alt="Wedding photography by Shaan"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/45 to-deep-brown/15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(42_31_26/0.45)_100%)]" />
        </motion.div>

        <div className="section-pad container-wide relative z-10 w-full pb-12 pt-28 sm:pb-16 sm:pt-32 md:pb-20">
          <motion.p
            className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.3em] text-camel uppercase"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span className="h-px w-7 bg-camel/70" aria-hidden />
            {weddingHero.eyebrow}
          </motion.p>

          <BlurText
            as="h1"
            text={weddingHero.title}
            className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,7vw,5.25rem)] leading-[1.05] text-ivory text-balance"
            delay={80}
            blur={12}
            startDelay={0.35}
          />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.65 }}
          >
            <p className="mt-5 max-w-xl text-sm text-sand/90 sm:mt-6 sm:text-base md:text-lg">
              {weddingHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <Magnet maxOffset={10} magnetStrength={3.6}>
                <Button to="/booking" variant="light">
                  Request a Quote
                </Button>
              </Magnet>
              <Magnet maxOffset={10} magnetStrength={3.6}>
                <Button
                  to="/portfolio"
                  variant="secondary"
                  className="border-sand/40 text-ivory hover:border-ivory/50 hover:bg-ivory/10"
                >
                  View Portfolio
                </Button>
              </Magnet>
            </div>
            <p className="mt-6 text-[0.65rem] tracking-[0.18em] text-sand/70 uppercase">
              {images.length} wedding frames · {siteConfig.contact.location}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery — Wedding category only */}
      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Gallery"
            title="Wedding photographs"
            description="Only wedding-day frames live here. Tap any photo to open it."
            className="max-w-xl"
          />
          <Link
            to="/portfolio"
            className="text-[0.68rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
          >
            Full portfolio →
          </Link>
        </div>

        {images.length > 0 ? (
          <MasonryGrid images={images} pageSize={9} />
        ) : (
          <p className="border border-dashed border-sand py-16 text-center text-soft-gray">
            More wedding photographs will appear here as new galleries are added.
          </p>
        )}
      </section>

      {/* FAQ */}
      <section className="surface-mist py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Wedding details, answered"
              description="Hours, travel, delivery, and how the day usually feels."
              className="max-w-md"
            />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/booking">Request a Quote</Button>
                <Button to="/contact" variant="secondary">
                  Ask a question
                </Button>
              </div>
            </Reveal>
          </div>

          <div>
            {weddingFaq.map((item, i) => (
              <FaqItem
                key={item.q}
                question={item.q}
                answer={item.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
            <div className="border-t border-sand" />
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="surface-stone py-14 sm:py-16">
        <div className="section-pad container-wide">
          <Reveal>
            <div className="grid gap-6 border border-sand/80 bg-warm-white/55 px-6 py-8 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-10">
              <div>
                <p className="text-[0.68rem] tracking-[0.24em] text-desert uppercase">Next step</p>
                <SplitText
                  text="Share your date, venues, and a little about your day — I’ll reply with availability and a clear quote."
                  className="mt-3 max-w-xl font-serif text-[clamp(1.4rem,3vw,2rem)] leading-snug text-deep-brown"
                  delay={0.05}
                  stagger={0.03}
                />
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button to="/booking">Book Wedding Coverage</Button>
                <Button to="/pre-wedding" variant="secondary">
                  Pre-Wedding too?
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Planning your wedding?"
        description="Share your date and venues — I’ll put together a coverage plan that fits your day."
        primary={{ to: '/booking', label: 'Request a Quote' }}
        secondary={{ to: '/contact', label: 'Contact' }}
      />
    </PageTransition>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BlurText } from '../../components/animations/BlurText'
import { ClipReveal } from '../../components/animations/ClipReveal'
import { PageTransition } from '../../components/animations/PageTransition'
import { ParallaxImage } from '../../components/animations/ParallaxImage'
import { Reveal } from '../../components/animations/Reveal'
import { ScrollFloat } from '../../components/animations/ScrollFloat'
import { SplitText } from '../../components/animations/SplitText'
import { SpotlightCard } from '../../components/animations/SpotlightCard'
import { Stagger, StaggerItem } from '../../components/animations/Stagger'
import { TiltCard } from '../../components/animations/TiltCard'
import { Button } from '../../components/common/Button'
import { CtaBand } from '../../components/common/CtaBand'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { siteConfig } from '../../config/site'
import { getUniqueCategoryImages, img, mediaIds } from '../../data/mediaMap'
import {
  preWeddingApproach,
  preWeddingFaq,
  preWeddingFlow,
  preWeddingHero,
  preWeddingIncludes,
  preWeddingLocations,
  preWeddingMoods,
} from '../../data/preWeddingData'
import { testimonials } from '../../data/testimonialsData'

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

export function PreWeddingPage() {
  const featureIds = [
    mediaIds.preWedding.hero,
    mediaIds.preWedding.band,
    ...mediaIds.preWedding.locations,
  ]
  const images = getUniqueCategoryImages('Pre-Wedding', featureIds)
  const reduced = useReducedMotion()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const heroImg = img(mediaIds.preWedding.hero, 'Pre-Wedding').src
  const bandImg = img(mediaIds.preWedding.band, 'Pre-Wedding').src
  const locationImages = mediaIds.preWedding.locations.map((id) =>
    img(id, 'Pre-Wedding'),
  )
  const quotes = testimonials.filter((t) =>
    t.detail.toLowerCase().includes('pre-wedding'),
  )
  const kindWords = quotes.length > 0 ? quotes : testimonials.slice(1, 3)

  return (
    <PageTransition>
      <SEO
        title="Pre-Wedding Photography"
        description="Pre-wedding photography by Shaan — easy sessions, beautiful locations, and photos that feel like you across Ahmedabad and beyond."
        path="/pre-wedding"
      />

      {/* Hero */}
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
              alt="Pre-wedding photography by Shaan"
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
            {preWeddingHero.eyebrow}
          </motion.p>

          <BlurText
            as="h1"
            text={preWeddingHero.title}
            className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,7vw,5.25rem)] leading-[1.05] text-ivory italic text-balance"
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
              {preWeddingHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <Button to="/booking" variant="light">
                Inquire Now
              </Button>
              <Button
                to="/wedding"
                variant="secondary"
                className="border-sand/40 text-ivory hover:border-ivory/50 hover:bg-ivory/10"
              >
                Wedding Coverage
              </Button>
            </div>
            <p className="mt-6 text-[0.65rem] tracking-[0.18em] text-sand/70 uppercase">
              {images.length} frames · {siteConfig.contact.location}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Approach"
              title="Relaxed sessions. Real chemistry."
              description="This isn’t a stiff shoot — it’s time together, kept with soft light and easy direction."
              className="max-w-md"
            />
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              {preWeddingApproach.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.07}>
                  <SpotlightCard className="h-full border-t border-sand pt-6">
                    <p className="text-[0.65rem] tracking-[0.26em] text-camel uppercase">
                      {item.num}
                    </p>
                    <h3 className="mt-3 font-serif text-xl text-deep-brown sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-soft-gray">{item.text}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="surface-mist py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="Locations"
            title="Places that set the mood"
            description="We choose spots for light, space, and how you feel there — not for cluttered backdrops."
          />

          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 md:grid-cols-3 md:gap-7">
            {preWeddingLocations.map((loc, i) => (
              <Reveal key={loc.title} delay={i * 0.06}>
                <article className="group">
                  <TiltCard rotateAmplitude={5} scaleOnHover={1.015}>
                    <ClipReveal delay={i * 0.04}>
                      <div className="film-frame overflow-hidden">
                        <img
                          src={locationImages[i]?.src}
                          alt={`${loc.title} — ${loc.location}`}
                          className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </ClipReveal>
                  </TiltCard>
                  <p className="mt-3 text-[0.65rem] tracking-[0.2em] text-camel uppercase sm:mt-4">
                    {loc.location}
                  </p>
                  <h2 className="mt-1 font-serif text-xl text-deep-brown sm:text-2xl">
                    {loc.title}
                  </h2>
                  <p className="mt-2 text-sm text-soft-gray">{loc.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Moods */}
      <section className="section-pad container-wide py-14 sm:py-16 md:py-20">
        <SectionHeading
          eyebrow="Mood"
          title="What do you want it to feel like?"
        />
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3 md:gap-8">
          {preWeddingMoods.map((mood, i) => (
            <Reveal key={mood.title} delay={i * 0.06}>
              <div className="border-t border-sand pt-6">
                <p className="text-[0.65rem] tracking-[0.22em] text-camel uppercase">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-deep-brown">{mood.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soft-gray">{mood.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Flow */}
      <section className="surface-stone py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              align="left"
              eyebrow="The session"
              title="Calm from first chat to final gallery"
              description="A simple path so you can enjoy the shoot — not stress the logistics."
              className="max-w-md"
            />

            <Stagger className="space-y-0" stagger={0.07}>
              {preWeddingFlow.map((step, i) => (
                <StaggerItem key={step.title}>
                  <div className="grid grid-cols-[3rem_1fr] gap-4 border-t border-camel/25 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-7">
                    <p className="pt-1 font-serif text-2xl text-camel/80 sm:text-3xl">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-serif text-xl text-deep-brown sm:text-2xl">
                          {step.title}
                        </h3>
                        <span className="text-[0.65rem] tracking-[0.16em] text-soft-gray uppercase">
                          {step.detail}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-soft-gray sm:text-[0.95rem]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Includes */}
      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="What’s included"
            title="Everything you need for a beautiful session"
            description="No rigid packages online — tell me your vibe and I’ll send a clear quote."
            className="max-w-md"
          />

          <Stagger className="divide-y divide-sand/90" stagger={0.05}>
            {preWeddingIncludes.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="grid gap-2 py-5 sm:grid-cols-[2.5rem_1fr] sm:gap-5 sm:py-6">
                  <span className="text-[0.65rem] tracking-[0.2em] text-camel uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-deep-brown">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-soft-gray">{item.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Cinematic band */}
      <section className="relative h-[46vh] min-h-[300px] overflow-hidden sm:h-[54vh] sm:min-h-[380px] md:h-[62vh]">
        <ScrollFloat distance={40} className="absolute inset-0 h-[120%] -top-[10%]">
          <ParallaxImage
            src={bandImg}
            alt="Pre-wedding photograph"
            className="absolute inset-0 h-full"
          />
        </ScrollFloat>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/40 to-deep-brown/20" />
        <div className="section-pad container-wide relative z-10 flex h-full flex-col justify-end pb-10 sm:pb-14">
          <p className="text-[0.68rem] tracking-[0.28em] text-camel uppercase">Before the vows</p>
          <BlurText
            as="p"
            text="Soft light, easy laughs, and the two of you."
            className="mt-3 max-w-2xl font-serif text-[clamp(1.6rem,4.2vw,3.2rem)] text-ivory italic"
            delay={70}
            blur={12}
            animateBy="words"
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Gallery"
            title="Pre-wedding gallery"
            description="Warm, romantic, and real — tap any frame to view it larger."
            className="max-w-xl"
          />
          <Link
            to="/portfolio"
            className="text-[0.68rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
          >
            Full portfolio →
          </Link>
        </div>

        <MasonryGrid images={images} pageSize={9} />
      </section>

      {/* Kind words */}
      <section className="surface-mist py-16 sm:py-20 md:py-24">
        <div className="section-pad container-wide">
          <SectionHeading eyebrow="Kind words" title="From couples I’ve photographed" />
          <div className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-2">
            {kindWords.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <SpotlightCard className="relative h-full border-t border-sand pt-6 sm:pt-8">
                  <blockquote>
                    <p className="font-serif text-lg leading-relaxed text-chocolate italic sm:text-xl">
                      “{item.quote}”
                    </p>
                    <footer className="mt-5">
                      <p className="text-sm tracking-[0.14em] text-deep-brown uppercase">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-soft-gray">{item.detail}</p>
                    </footer>
                  </blockquote>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Good to know before we shoot"
              description="Timing, outfits, locations, and delivery — answered simply."
              className="max-w-md"
            />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/booking">Inquire Now</Button>
                <Button to="/contact" variant="secondary">
                  Ask a question
                </Button>
              </div>
            </Reveal>
          </div>

          <div>
            {preWeddingFaq.map((item, i) => (
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

      {/* Next step */}
      <section className="surface-stone py-14 sm:py-16">
        <div className="section-pad container-wide">
          <Reveal>
            <div className="grid gap-6 border border-camel/30 bg-warm-white/55 px-6 py-8 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-10">
              <div>
                <p className="text-[0.68rem] tracking-[0.24em] text-desert uppercase">Next step</p>
                <SplitText
                  text="Tell me your favorite locations and vibe — we’ll shape an easy session around that."
                  className="mt-3 max-w-xl font-serif text-[clamp(1.4rem,3vw,2rem)] leading-snug text-deep-brown"
                  delay={0.05}
                  stagger={0.03}
                />
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button to="/booking">Plan a Shoot</Button>
                <Button to="/couple" variant="secondary">
                  Couple session?
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Want to plan a shoot?"
        description="Tell me your favorite locations and vibe — we’ll shape a day around that."
        primary={{ to: '/booking', label: 'Inquire Now' }}
        secondary={{ to: '/contact', label: 'Contact' }}
      />
    </PageTransition>
  )
}

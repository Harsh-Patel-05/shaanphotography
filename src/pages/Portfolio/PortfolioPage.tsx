import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlurText } from '../../components/animations/BlurText'
import { ClipReveal } from '../../components/animations/ClipReveal'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { SplitText } from '../../components/animations/SplitText'
import { Stagger, StaggerItem } from '../../components/animations/Stagger'
import { TiltCard } from '../../components/animations/TiltCard'
import { CtaBand } from '../../components/common/CtaBand'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { FilterBar } from '../../components/gallery/FilterBar'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { siteConfig } from '../../config/site'
import { galleryImages, portfolioCategories, type GalleryCategory } from '../../data/galleryData'
import { featuredCollections, getPortfolioImages } from '../../data/mediaMap'
import {
  categoryIntros,
  portfolioHero,
  portfolioNotes,
} from '../../data/portfolioData'

export function PortfolioPage() {
  const [active, setActive] = useState<'All' | GalleryCategory>('All')
  const reduced = useReducedMotion()
  const images = useMemo(() => getPortfolioImages(active), [active])
  const intro = categoryIntros[active]

  const counts = useMemo(() => {
    const map: Partial<Record<'All' | GalleryCategory, number>> = {
      All: galleryImages.length,
    }
    for (const cat of portfolioCategories) {
      if (cat === 'All') continue
      map[cat] = galleryImages.filter((img) => img.category === cat).length
    }
    return map
  }, [])

  return (
    <PageTransition>
      <SEO
        title="Portfolio"
        description="Browse Shaan Photography portfolio — weddings, pre-wedding, portraits, events, and couple sessions in warm desert tones."
        path="/portfolio"
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-36 md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(880px_480px_at_8%_-12%,rgb(193_154_107/0.16),transparent_55%),radial-gradient(640px_380px_at_100%_0%,rgb(232_217_197/0.4),transparent_50%)]" />

        <div className="section-pad container-wide relative">
          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <motion.p
                className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.28em] text-desert uppercase"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <span className="h-px w-6 bg-desert/55" aria-hidden />
                {portfolioHero.eyebrow}
              </motion.p>

              <BlurText
                as="h1"
                text={portfolioHero.title}
                className="mt-3 font-serif text-[clamp(2.4rem,7vw,5rem)] leading-[1.05] text-deep-brown text-balance"
                delay={70}
                blur={11}
                startDelay={0.08}
              />

              <SplitText
                text={portfolioHero.description}
                className="mt-5 max-w-xl text-soft-gray leading-relaxed sm:mt-6 sm:text-[1.02rem]"
                delay={0.2}
                stagger={0.022}
              />

              <Reveal delay={0.35}>
                <p className="mt-6 text-[0.68rem] tracking-[0.18em] text-soft-gray uppercase">
                  {galleryImages.length}+ frames · {siteConfig.contact.location}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <Stagger className="grid gap-4 border-t border-sand pt-6 sm:grid-cols-3 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:border-sand lg:pl-10 lg:pt-0" stagger={0.07}>
                {portfolioNotes.map((note) => (
                  <StaggerItem key={note.title}>
                    <p className="text-[0.65rem] tracking-[0.2em] text-camel uppercase">
                      {note.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-soft-gray">{note.text}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured collections */}
      <section className="surface-mist py-12 sm:py-14 md:py-16">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="Collections"
            title="Start with a chapter"
            description="Jump into a focused gallery, or stay here and filter the full portfolio."
          />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {featuredCollections.map((col, i) => (
              <Reveal key={col.id} delay={i * 0.05}>
                <Link to={col.path} className="group block">
                  <TiltCard rotateAmplitude={5} scaleOnHover={1.015}>
                    <ClipReveal delay={i * 0.03}>
                      <div className="film-frame overflow-hidden">
                        <img
                          src={col.image}
                          alt={col.title}
                          loading="lazy"
                          className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                    </ClipReveal>
                  </TiltCard>
                  <div className="mt-3 flex items-baseline justify-between gap-2">
                    <p className="font-serif text-lg text-deep-brown sm:text-xl">{col.title}</p>
                    <span className="text-[0.6rem] tracking-[0.18em] text-soft-gray/70 uppercase transition group-hover:text-camel">
                      →
                    </span>
                  </div>
                  <p className="text-xs text-soft-gray">{col.subtitle}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad container-wide py-14 sm:py-16 md:py-24">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-[0.68rem] tracking-[0.26em] text-desert uppercase">Gallery</p>
            <h2 className="mt-2 font-serif text-[clamp(1.75rem,3.5vw,2.6rem)] text-deep-brown">
              Browse the frames
            </h2>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="max-w-md text-sm text-soft-gray sm:text-right"
            >
              {intro.blurb}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="sticky top-20 z-20 -mx-1 mb-8 bg-ivory/85 px-1 py-3 backdrop-blur-md sm:mb-10 sm:py-4">
          <FilterBar
            categories={portfolioCategories}
            active={active}
            onChange={setActive}
            counts={counts}
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <p className="text-xs tracking-[0.16em] text-soft-gray uppercase">
                {images.length} {images.length === 1 ? 'photograph' : 'photographs'}
                {active !== 'All' ? ` · ${intro.label}` : ''}
              </p>
              {intro.path ? (
                <Link
                  to={intro.path}
                  className="text-[0.65rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
                >
                  Open {intro.label} page →
                </Link>
              ) : null}
            </motion.div>
          </AnimatePresence>

          {active !== 'All' ? (
            <button
              type="button"
              onClick={() => setActive('All')}
              className="text-[0.65rem] tracking-[0.16em] text-soft-gray uppercase transition hover:text-deep-brown"
            >
              Clear filter
            </button>
          ) : null}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {images.length > 0 ? (
              <MasonryGrid images={images} pageSize={12} />
            ) : (
              <div className="border border-dashed border-sand py-20 text-center">
                <p className="font-serif text-2xl text-deep-brown">No photographs here yet</p>
                <p className="mt-2 text-sm text-soft-gray">Try another category or view All.</p>
                <button
                  type="button"
                  onClick={() => setActive('All')}
                  className="mt-6 text-[0.7rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
                >
                  Show all →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Viewing tips */}
      <section className="surface-stone py-14 sm:py-16 md:py-20">
        <div className="section-pad container-wide">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-14">
            <SectionHeading
              align="left"
              eyebrow="How to look"
              title="Find the feeling that fits your day"
              className="max-w-md"
            />
            <Stagger className="space-y-5" stagger={0.06}>
              <StaggerItem>
                <p className="text-soft-gray leading-relaxed">
                  Don’t hunt for a perfect match — look for light, mood, and honesty. If a frame
                  feels like your people, that’s usually the right direction.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-soft-gray leading-relaxed">
                  Prefer a deeper dive into one chapter? Open Weddings, Pre-Wedding, Portrait,
                  Events, or Couple for a focused story page.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    to="/services"
                    className="text-[0.68rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
                  >
                    View services →
                  </Link>
                  <Link
                    to="/booking"
                    className="text-[0.68rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
                  >
                    Request a quote →
                  </Link>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      <CtaBand
        title="See something you love?"
        description="Tell me the kind of day you’re planning — I’ll share availability and a clear quote."
        primary={{ to: '/booking', label: 'Book a Session' }}
        secondary={{ to: '/contact', label: 'Contact' }}
      />
    </PageTransition>
  )
}

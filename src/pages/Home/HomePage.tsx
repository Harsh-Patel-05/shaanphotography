import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageTransition } from '../../components/animations/PageTransition'
import { ParallaxImage } from '../../components/animations/ParallaxImage'
import { Reveal } from '../../components/animations/Reveal'
import { Button } from '../../components/common/Button'
import { HeroVideo } from '../../components/common/HeroVideo'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { VideoPlayer } from '../../components/common/VideoPlayer'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { siteConfig } from '../../config/site'
import {
  aboutPortrait,
  cinematicBanner,
  featuredCollections,
  heroImage,
  heroVideo,
  homeSelectedGallery,
  instagramFeed,
  videos,
} from '../../data/galleryData'
import { services } from '../../data/servicesData'
import { testimonials } from '../../data/testimonialsData'

export function HomePage() {
  const reduced = useReducedMotion()

  return (
    <PageTransition>
      <SEO path="/" />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-deep-brown">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.08, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {heroVideo && !reduced ? (
            <HeroVideo src={heroVideo.src} poster={heroVideo.poster || heroImage} />
          ) : (
            <>
              <img
                src={heroVideo?.poster || heroImage}
                alt="Photography by Shaan"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/45 to-deep-brown/25" />
            </>
          )}
        </motion.div>

        <div className="section-pad container-wide relative z-10 w-full pb-14 pt-28 sm:pb-16 md:pb-24 md:pt-32">
          <motion.p
            className="mb-3 text-[0.68rem] tracking-[0.28em] text-camel uppercase sm:mb-4 sm:text-[0.72rem] sm:tracking-[0.3em]"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {siteConfig.brand.name}
          </motion.p>
          <motion.h1
            className="max-w-4xl font-serif text-[clamp(2.25rem,8vw,5.5rem)] leading-[1.05] font-medium text-ivory text-balance"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.85 }}
          >
            {siteConfig.brand.tagline}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-sm text-sand/90 sm:mt-5 sm:text-base md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.75 }}
          >
            Weddings, pre-weddings, portraits, events, and couple shoots — photographed with care,
            so they still feel like you years later.
          </motion.p>
          <motion.div
            className="mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <Button to="/portfolio" variant="light">
              See the Work
            </Button>
            <Button
              to="/booking"
              variant="secondary"
              className="border-sand/50 text-ivory hover:bg-ivory/10"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <SectionHeading
          eyebrow="Collections"
          title="What I shoot"
          description="A few places to start — pick what feels closest to your story."
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {featuredCollections.map((col, i) => (
            <Reveal key={col.id} delay={i * 0.06}>
              <Link to={col.path} className="group block">
                <div className="overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 font-serif text-lg text-deep-brown sm:mt-4 sm:text-2xl">
                  {col.title}
                </p>
                <p className="text-xs text-soft-gray sm:text-sm">{col.subtitle}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="section-pad container-wide grid items-center gap-8 py-16 sm:gap-10 sm:py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <Reveal>
            <div className="overflow-hidden">
              <img
                src={aboutPortrait}
                alt="Photography by Shaan"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[0.7rem] tracking-[0.28em] text-desert uppercase">About Shaan</p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,4vw,3rem)] text-deep-brown">
              I look for the feeling, not the pose
            </h2>
            <p className="mt-5 text-soft-gray leading-relaxed">
              The best photos don’t feel staged. They’re the glance across a room, the laugh you
              didn’t plan, the quiet second before everything starts. That’s what I try to keep.
            </p>
            <div className="mt-8">
              <Button to="/about" variant="secondary">
                More About Me
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <SectionHeading
          eyebrow="Services"
          title="How we can work together"
          description="Every session is planned around your day, your people, and your pace."
        />
        <div className="mt-10 grid gap-8 sm:mt-14 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05}>
              <Link to={service.path} className="group block h-full">
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-4 font-serif text-xl text-deep-brown sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-soft-gray">{service.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center sm:mt-12">
          <Button to="/services" variant="secondary">
            All Services
          </Button>
        </div>
      </section>

      <section className="section-pad container-wide py-10 md:py-16">
        <SectionHeading
          eyebrow="Portfolio"
          title="A few favorites"
          description="Tap any photo to view it larger."
        />
        <div className="mt-10 sm:mt-12">
          <MasonryGrid images={homeSelectedGallery} />
        </div>
        <div className="mt-10 flex justify-center sm:mt-12">
          <Button to="/portfolio">Full Portfolio</Button>
        </div>
      </section>

      {videos.length > 0 ? (
        <section className="bg-deep-brown py-16 sm:py-20 md:py-28">
          <div className="section-pad container-wide">
            <SectionHeading
              light
              eyebrow="Films"
              title="Recent films"
              description="A few recent films — tap play to watch."
            />
            <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((clip, i) => (
                <Reveal key={clip.id} delay={i * 0.05}>
                  <VideoPlayer video={clip} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative mt-8 h-[50vh] min-h-[320px] sm:mt-10 sm:h-[60vh] sm:min-h-[420px] md:h-[75vh]">
        <ParallaxImage
          src={cinematicBanner}
          alt="Couple photograph"
          className="absolute inset-0 h-full"
          imgClassName="object-center"
        />
        <div className="absolute inset-0 bg-deep-brown/35" />
        <div className="section-pad relative z-10 flex h-full items-end pb-10 sm:pb-14">
          <Reveal>
            <p className="max-w-2xl font-serif text-[clamp(1.5rem,4vw,3.2rem)] text-ivory italic">
              Light, memory, and the spaces between.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <SectionHeading eyebrow="Kind Words" title="What clients say" />
        <div className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <blockquote className="border-t border-sand pt-6 sm:pt-8">
                <p className="font-serif text-lg leading-relaxed text-chocolate italic sm:text-xl md:text-2xl">
                  “{item.quote}”
                </p>
                <footer className="mt-5 sm:mt-6">
                  <p className="text-sm tracking-[0.12em] text-deep-brown uppercase">{item.name}</p>
                  <p className="mt-1 text-xs text-soft-gray">{item.detail}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand/30 py-16 sm:py-20 md:py-24">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="Instagram"
            title="Follow along"
            description={siteConfig.social.instagramHandle}
          />
          <div className="mt-10 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-3 md:grid-cols-3 md:gap-4">
            {instagramFeed.map((img, i) => (
              <Reveal key={img.id} delay={i * 0.04}>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[0.7rem] tracking-[0.28em] text-desert uppercase">Let’s talk</p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,5vw,3.75rem)] text-deep-brown text-balance">
              Ready when you are
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-soft-gray">
              Tell me a little about your wedding, shoot, or celebration — I’ll get back to you
              soon.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-9 sm:gap-4">
              <Button to="/booking">Book a Session</Button>
              <Button to="/contact" variant="secondary">
                Contact
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}

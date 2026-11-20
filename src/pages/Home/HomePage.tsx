import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BlurText } from '../../components/animations/BlurText'
import { ClipReveal } from '../../components/animations/ClipReveal'
import { CountUp } from '../../components/animations/CountUp'
import { Marquee } from '../../components/animations/Marquee'
import { PageTransition } from '../../components/animations/PageTransition'
import { ParallaxImage } from '../../components/animations/ParallaxImage'
import { Reveal } from '../../components/animations/Reveal'
import { ScrollFloat } from '../../components/animations/ScrollFloat'
import { ShinyText } from '../../components/animations/ShinyText'
import { SplitText } from '../../components/animations/SplitText'
import { TiltCard } from '../../components/animations/TiltCard'
import { Button } from '../../components/common/Button'
import { CtaBand } from '../../components/common/CtaBand'
import { HeroVideo } from '../../components/common/HeroVideo'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { VideoPlayer } from '../../components/common/VideoPlayer'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { siteConfig } from '../../config/site'
import { heroVideo, videos } from '../../data/filmData'
import {
  featuredCollections,
  homeAboutImage,
  homeCinematicImage,
  homeHeroImage,
  homeInstagramFeed,
  homeSelectedGallery,
} from '../../data/mediaMap'
import { aboutStats } from '../../data/aboutData'
import { services } from '../../data/servicesData'

const marqueeItems = [
  'Weddings',
  'Pre-Wedding',
  'Portraits',
  'Events',
  'Couples',
  'Films',
  'Stories',
]

export function HomePage() {
  const reduced = useReducedMotion()

  return (
    <PageTransition>
      <SEO path="/" />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-deep-brown">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.1, opacity: 0.55 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {heroVideo && !reduced ? (
            <HeroVideo src={heroVideo.src} poster={heroVideo.poster || homeHeroImage} />
          ) : (
            <>
              <img
                src={heroVideo?.poster || homeHeroImage}
                alt="Photography by Shaan"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/50 to-deep-brown/20" />
            </>
          )}
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(42_31_26/0.48)_100%)]" />

        <div className="section-pad container-wide relative z-10 w-full pb-14 pt-28 sm:pb-16 md:pb-24 md:pt-32">
          <motion.p
            className="mb-3 inline-flex items-center gap-3 text-[0.68rem] tracking-[0.3em] text-camel uppercase sm:mb-4 sm:text-[0.72rem]"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span className="h-px w-8 bg-camel/70" aria-hidden />
            {siteConfig.brand.name}
          </motion.p>
          <BlurText
            as="h1"
            text={siteConfig.brand.tagline}
            className="max-w-4xl font-serif text-[clamp(2.05rem,7.2vw,5.75rem)] leading-[1.06] font-medium text-ivory text-balance sm:leading-[1.02]"
            delay={90}
            startDelay={0.4}
            blur={14}
            stepDuration={0.55}
            direction="bottom"
          />
          <motion.p
            className="mt-5 max-w-xl text-sm leading-relaxed text-sand/90 sm:mt-6 sm:text-base md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Weddings, pre-weddings, portraits, events, and couple shoots — photographed with care,
            so they still feel like you years later.
          </motion.p>
          <motion.div
            className="mt-8 flex w-full flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap sm:mt-10 sm:gap-4"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <Button to="/portfolio" variant="light" className="w-full min-[400px]:w-auto">
              See the Work
            </Button>
            <Button
              to="/booking"
              variant="secondary"
              className="w-full border-sand/40 text-ivory hover:bg-ivory/10 hover:border-ivory/50 min-[400px]:w-auto"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-sand/60 bg-deep-brown py-4 text-ivory">
        <Marquee speed="slow">
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="flex items-center gap-10 text-[0.72rem] tracking-[0.32em] text-sand/80 uppercase"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-camel/80" />
            </span>
          ))}
        </Marquee>
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
                <TiltCard className="film-frame overflow-hidden" rotateAmplitude={6} scaleOnHover={1.015}>
                  <ClipReveal delay={i * 0.04}>
                    <img
                      src={col.image}
                      alt={col.title}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </ClipReveal>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-brown/55 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                </TiltCard>
                <div className="mt-3 sm:mt-4">
                  <p className="font-serif text-lg text-deep-brown sm:text-2xl">{col.title}</p>
                </div>
                <p className="mt-1 text-xs text-soft-gray sm:text-sm">{col.subtitle}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="surface-mist">
        <div className="section-pad container-wide grid items-center gap-8 py-16 sm:gap-10 sm:py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <ClipReveal>
            <div className="film-frame overflow-hidden">
              <img
                src={homeAboutImage}
                alt="Photography by Shaan"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
          </ClipReveal>
          <Reveal delay={0.1}>
            <p className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.28em] text-desert uppercase">
              <span className="h-px w-6 bg-desert/60" aria-hidden />
              About Shaan
            </p>
            <BlurText
              as="h2"
              text="I’m usually watching the in-between"
              className="mt-3 font-serif text-[clamp(1.85rem,4vw,3rem)] text-deep-brown"
              delay={70}
              blur={10}
            />
            <SplitText
              text="A glance across a room. A laugh nobody planned. The second before everyone lines up. That’s the part I try not to miss."
              className="mt-5 text-soft-gray leading-relaxed"
              delay={0.08}
              stagger={0.028}
            />
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-sand/80 pt-8">
              {aboutStats.map((stat) => (
                <div key={`${stat.label}-${stat.to}`}>
                  <p className="font-serif text-3xl text-deep-brown sm:text-4xl">
                    <CountUp key={stat.to} to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-[0.62rem] tracking-[0.2em] text-soft-gray uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
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
                <TiltCard className="film-frame overflow-hidden" rotateAmplitude={5} scaleOnHover={1.01}>
                  <ClipReveal delay={i * 0.03} direction="up">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </ClipReveal>
                </TiltCard>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl text-deep-brown sm:text-2xl">{service.title}</h3>
                  <span className="mt-2 text-[0.62rem] tracking-[0.18em] text-soft-gray/60 transition group-hover:text-camel">
                    →
                  </span>
                </div>
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

      <section className="surface-stone py-16 sm:py-20 md:py-24">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="Portfolio"
            title="A few favorites"
            description="Tap any photo to view it larger."
          />
          <div className="mt-10 sm:mt-12">
            <MasonryGrid images={homeSelectedGallery} pageSize={9} />
          </div>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Button to="/portfolio">Full Portfolio</Button>
          </div>
        </div>
      </section>

      {videos.length > 0 ? (
        <section className="surface-ink py-16 sm:py-20 md:py-28">
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

      <section className="relative h-[50vh] min-h-[320px] overflow-hidden sm:h-[60vh] sm:min-h-[420px] md:h-[75vh]">
        <ScrollFloat distance={40} className="absolute inset-0 h-[120%] -top-[10%]">
          <ParallaxImage
            src={homeCinematicImage}
            alt="Couple photograph"
            className="absolute inset-0 h-full"
            imgClassName="object-center"
          />
        </ScrollFloat>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/70 via-deep-brown/30 to-deep-brown/15" />
        <div className="section-pad container-wide relative z-10 flex h-full items-end pb-10 sm:pb-14">
          <BlurText
            as="p"
            text="Light, memory, and the spaces between."
            className="max-w-2xl font-serif text-[clamp(1.6rem,4.2vw,3.4rem)] text-ivory italic"
            delay={70}
            blur={12}
            animateBy="words"
          />
        </div>
      </section>

      <section className="surface-mist overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="Instagram"
            title="Follow along"
            description={siteConfig.social.instagramHandle}
          />
          <div className="mt-10 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-3 md:grid-cols-3 md:gap-4">
            {homeInstagramFeed.map((img, i) => (
              <Reveal key={img.id} delay={i * 0.04}>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group film-frame relative block overflow-hidden"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-deep-brown/0 transition duration-500 group-hover:bg-deep-brown/25" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready when you are"
        description="Tell me a little about your wedding, shoot, or celebration — I’ll get back to you soon."
        primary={{ to: '/booking', label: 'Book a Session' }}
        secondary={{ to: '/contact', label: 'Contact' }}
      >
        <p className="mb-4 text-[0.7rem] tracking-[0.28em] uppercase">
          <ShinyText className="tracking-[0.28em]">Let’s talk</ShinyText>
        </p>
      </CtaBand>
    </PageTransition>
  )
}

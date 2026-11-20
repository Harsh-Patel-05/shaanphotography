import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
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
import { SpotlightCard } from '../../components/animations/SpotlightCard'
import { Stagger, StaggerItem } from '../../components/animations/Stagger'
import { TiltCard } from '../../components/animations/TiltCard'
import { Button } from '../../components/common/Button'
import { CtaBand } from '../../components/common/CtaBand'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { SocialIcons } from '../../components/common/SocialIcons'
import {
  getMailtoLink,
  getWhatsAppLink,
  siteConfig,
} from '../../config/site'
import {
  aboutBtsCaptions,
  aboutFaq,
  aboutFocus,
  aboutHero,
  aboutMarquee,
  aboutPrinciples,
  aboutProcess,
  aboutStats,
  aboutStory,
} from '../../data/aboutData'
import { img, mediaIds } from '../../data/mediaMap'
import logo from '../../assets/logos/shaan-logo-dark.png'

const aboutPortrait = img(mediaIds.about.portrait).src
const aboutSecondaryImage = img(mediaIds.about.secondary).src
const aboutStoryImage = img(mediaIds.about.story).src
const aboutCinematic = img(mediaIds.about.cinematic).src
const aboutBts = mediaIds.about.bts.map((id) => img(id).src)

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
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition sm:py-6"
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

export function AboutPage() {
  const reduced = useReducedMotion()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <PageTransition>
      <SEO
        title="About"
        description="Meet Shaan — wedding and portrait photographer in Kalol focused on real moments, soft light, and honest storytelling."
        path="/about"
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_12%_-10%,rgb(193_154_107/0.18),transparent_55%),radial-gradient(700px_420px_at_100%_20%,rgb(232_217_197/0.45),transparent_50%)]" />

        <div className="section-pad container-wide relative">
          <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
            <div>
              <motion.p
                className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.3em] text-desert uppercase"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="h-px w-7 bg-desert/60" aria-hidden />
                {aboutHero.eyebrow}
              </motion.p>

              <motion.p
                className="mt-5 font-serif text-[clamp(3.2rem,12vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.03em] text-deep-brown"
                initial={reduced ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {siteConfig.brand.shortName}
              </motion.p>

              <BlurText
                as="h1"
                text={aboutHero.headline}
                className="mt-4 max-w-xl font-serif text-[clamp(1.65rem,3.8vw,2.75rem)] leading-[1.15] text-chocolate italic"
                delay={70}
                blur={10}
                startDelay={0.28}
              />

              <SplitText
                text={aboutHero.intro}
                className="mt-6 max-w-lg text-soft-gray leading-relaxed sm:mt-7 sm:text-[1.02rem]"
                delay={0.35}
                stagger={0.022}
              />

              <Reveal delay={0.45}>
                <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
                  <Button to="/booking">Book a Session</Button>
                  <Button to="/portfolio" variant="secondary">
                    View Portfolio
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.55}>
                <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-sand/80 pt-6 sm:mt-10">
                  <SocialIcons tone="dark" size="sm" />
                  <div className="text-xs text-soft-gray">
                    <p className="tracking-[0.14em] text-chocolate uppercase">
                      {siteConfig.contact.location}
                    </p>
                    <p className="mt-1">{siteConfig.social.instagramHandle}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="relative">
              <motion.div
                aria-hidden
                className="absolute -top-6 -right-4 hidden select-none font-serif text-[clamp(5rem,14vw,9rem)] leading-none text-camel/15 sm:block lg:-right-8"
                initial={reduced ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                01
              </motion.div>

              <div className="grid grid-cols-[1fr_0.72fr] gap-3 sm:gap-4">
                <TiltCard rotateAmplitude={6} scaleOnHover={1.015}>
                  <ClipReveal delay={0.12} direction="up">
                    <div className="film-frame relative overflow-hidden">
                      <img
                        src={aboutPortrait}
                        alt={`${siteConfig.brand.shortName} — photographer`}
                        className="aspect-[4/5] w-full object-cover"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-brown/25 via-transparent to-transparent" />
                    </div>
                  </ClipReveal>
                </TiltCard>

                <div className="flex flex-col gap-3 pt-8 sm:gap-4 sm:pt-14">
                  <ClipReveal delay={0.22} direction="left">
                    <div className="film-frame overflow-hidden">
                      <img
                        src={aboutSecondaryImage}
                        alt="Photography by Shaan"
                        className="aspect-[3/4] w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </ClipReveal>
                  <Reveal delay={0.4}>
                    <p className="text-[0.65rem] leading-relaxed tracking-[0.16em] text-soft-gray uppercase">
                      Based in {siteConfig.contact.address.city}
                      <br />
                      Available for travel
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-sand/70 bg-deep-brown py-3.5 text-ivory">
        <Marquee speed="slow">
          {aboutMarquee.map((item) => (
            <span
              key={item}
              className="flex items-center gap-10 text-[0.7rem] tracking-[0.3em] text-sand/80 uppercase"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-camel/80" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* Story */}
      <section className="surface-mist py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeading
                align="left"
                eyebrow={aboutStory.eyebrow}
                title={aboutStory.title}
                className="max-w-md"
              />
              <Reveal delay={0.1}>
                <div className="mt-8 overflow-hidden film-frame sm:mt-10">
                  <ClipReveal delay={0.05}>
                    <img
                      src={aboutStoryImage}
                      alt="Storytelling photograph"
                      className="aspect-[4/5] w-full object-cover"
                      loading="lazy"
                    />
                  </ClipReveal>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:pt-4">
              <Stagger className="space-y-6" stagger={0.08}>
                {aboutStory.paragraphs.map((p) => (
                  <StaggerItem key={p.slice(0, 28)}>
                    <p className="text-soft-gray leading-relaxed sm:text-[1.05rem]">{p}</p>
                  </StaggerItem>
                ))}
                <StaggerItem>
                  <p className="border-l-2 border-camel/70 pl-5 font-serif text-xl leading-snug text-deep-brown italic sm:text-2xl">
                    “{aboutStory.quote}”
                  </p>
                </StaggerItem>
              </Stagger>

              <Reveal delay={0.15}>
                <dl className="mt-10 grid gap-5 border-t border-sand/80 pt-8 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <dt className="text-[0.65rem] tracking-[0.2em] text-desert uppercase">Studio</dt>
                    <dd className="mt-2 text-sm text-deep-brown leading-relaxed">
                      {siteConfig.contact.address.line1}
                      <br />
                      {siteConfig.contact.address.line2}
                      <br />
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] tracking-[0.2em] text-desert uppercase">Reach out</dt>
                    <dd className="mt-2 space-y-1.5 text-sm">
                      <a
                        href={getMailtoLink()}
                        className="block text-deep-brown transition hover:text-chocolate"
                      >
                        {siteConfig.contact.email}
                      </a>
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="block text-deep-brown transition hover:text-chocolate"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-deep-brown transition hover:text-chocolate"
                      >
                        WhatsApp
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy band */}
      <section className="relative h-[48vh] min-h-[300px] overflow-hidden sm:h-[56vh] sm:min-h-[380px] md:h-[64vh]">
        <ScrollFloat distance={36} className="absolute inset-0 h-[120%] -top-[10%]">
          <ParallaxImage
            src={aboutCinematic}
            alt="Soft light photograph"
            className="absolute inset-0 h-full"
          />
        </ScrollFloat>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/45 to-deep-brown/20" />
        <div className="section-pad container-wide relative z-10 flex h-full flex-col justify-end gap-4 pb-10 sm:pb-14 md:pb-16">
          <p className="text-[0.68rem] tracking-[0.28em] text-camel uppercase">Philosophy</p>
          <BlurText
            as="p"
            text="I look for the feeling, not the pose."
            className="max-w-2xl font-serif text-[clamp(1.7rem,4.5vw,3.4rem)] text-ivory italic"
            delay={70}
            blur={12}
            animateBy="words"
          />
        </div>
      </section>

      {/* Principles */}
      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <SectionHeading
          eyebrow="How I work"
          title="Be yourselves. I’ll do the rest."
          description="Less posing pressure, more presence. The photos look best when you stop worrying about the camera."
        />

        <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-3 md:gap-10">
          {aboutPrinciples.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <SpotlightCard className="h-full border-t border-sand pt-7">
                <p className="text-[0.65rem] tracking-[0.28em] text-camel uppercase">{item.num}</p>
                <h3 className="mt-3 font-serif text-2xl text-deep-brown sm:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-soft-gray sm:text-[0.95rem]">
                  {item.text}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="surface-stone py-14 sm:py-16 md:py-20">
        <div className="section-pad container-wide">
          <div className="grid grid-cols-3 gap-6 border-y border-camel/25 py-10 sm:gap-4 sm:py-12">
            {aboutStats.map((stat, i) => (
              <Reveal key={`${stat.label}-${stat.to}`} delay={i * 0.06}>
                <div className="text-center">
                  <p className="font-serif text-[clamp(2rem,5.5vw,3.5rem)] leading-none text-deep-brown">
                    <CountUp key={stat.to} to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-[0.62rem] tracking-[0.24em] text-soft-gray uppercase">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Focus / what I shoot */}
      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <SectionHeading
          eyebrow="Focus"
          title="What I love photographing"
          description="Pick a lane that fits your day — every session is planned around your people and pace."
        />

        <Stagger className="mt-10 divide-y divide-sand/90 sm:mt-14" stagger={0.05}>
          {aboutFocus.map((item, i) => (
            <StaggerItem key={item.title}>
              <Link
                to={item.path}
                className="group grid gap-2 py-5 transition sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-8 sm:py-6"
              >
                <span className="text-[0.65rem] tracking-[0.22em] text-camel uppercase">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-deep-brown transition group-hover:text-chocolate sm:text-[1.85rem]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-soft-gray">{item.text}</p>
                </div>
                <span className="text-[0.7rem] tracking-[0.18em] text-soft-gray uppercase transition group-hover:text-desert">
                  Explore →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section className="surface-mist py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              align="left"
              eyebrow="The process"
              title="Calm from first chat to final gallery"
              description="Clear communication, no overwhelm — a simple path from inquiry to delivery."
              className="max-w-md"
            />

            <Stagger className="space-y-0" stagger={0.07}>
              {aboutProcess.map((step, i) => (
                <StaggerItem key={step.title}>
                  <div className="grid grid-cols-[3rem_1fr] gap-4 border-t border-sand py-6 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-7">
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

      {/* Behind the scenes */}
      <section className="surface-ink py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <SectionHeading
            light
            eyebrow="Behind the scenes"
            title="Quiet work. Warm frames."
            description="A peek at how days feel on location — calm process, soft light, clear communication."
          />

          <div className="mt-10 grid gap-6 sm:mt-14 sm:gap-5 md:grid-cols-3 md:gap-6">
            {aboutBts.map((src, i) => (
              <Reveal key={src} delay={i * 0.08}>
                <TiltCard
                  rotateAmplitude={5}
                  scaleOnHover={1.02}
                  className={i === 1 ? 'md:translate-y-8' : ''}
                >
                  <ClipReveal delay={i * 0.05} direction={i % 2 === 0 ? 'up' : 'left'}>
                    <div className="film-frame overflow-hidden">
                      <img
                        src={src}
                        alt={aboutBtsCaptions[i]?.title ?? 'Behind the scenes'}
                        className="aspect-[4/5] w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </ClipReveal>
                  <div className="mt-4">
                    <p className="text-[0.65rem] tracking-[0.2em] text-camel uppercase">
                      {aboutBtsCaptions[i]?.title}
                    </p>
                    <p className="mt-1 text-sm text-sand/80">{aboutBtsCaptions[i]?.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="surface-mist py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Good to know before we begin"
              description="Quick answers about travel, booking, posing, and delivery."
              className="max-w-md"
            />

            <div>
              {aboutFaq.map((item, i) => (
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
        </div>
      </section>

      {/* Studio contact strip */}
      <section className="section-pad container-wide py-14 sm:py-16 md:py-20">
        <Reveal>
          <div className="grid gap-8 border border-sand/80 bg-warm-white/60 px-6 py-8 sm:px-8 sm:py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12">
            <div>
              <p className="text-[0.68rem] tracking-[0.26em] text-desert uppercase">Studio</p>
              <h2 className="mt-3 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-deep-brown">
                Come say hello in {siteConfig.contact.address.city}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-soft-gray">
                {siteConfig.contact.address.line1}, {siteConfig.contact.address.line2},{' '}
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{' '}
                {siteConfig.contact.address.postal}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/contact">Contact</Button>
                <Button href={getWhatsAppLink()} target="_blank" rel="noreferrer" variant="secondary">
                  WhatsApp
                </Button>
              </div>
            </div>
            <div className="space-y-4 md:text-right">
              <div>
                <p className="text-[0.65rem] tracking-[0.2em] text-desert uppercase">Email</p>
                <a
                  href={getMailtoLink()}
                  className="mt-1 inline-block font-serif text-lg text-deep-brown transition hover:text-chocolate sm:text-xl"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <p className="text-[0.65rem] tracking-[0.2em] text-desert uppercase">Phone</p>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="mt-1 inline-block font-serif text-lg text-deep-brown transition hover:text-chocolate sm:text-xl"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <SocialIcons tone="dark" className="md:justify-end" />
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand
        title="Let’s make something you’ll keep"
        description="Wedding, portrait, couple session, or celebration — tell me what you’re planning and I’ll reply with a clear next step."
        primary={{ to: '/booking', label: 'Book a Session' }}
        secondary={{ to: '/portfolio', label: 'View Portfolio' }}
      >
        <img
          src={logo}
          alt="Shaan signature"
          className="mx-auto mb-5 h-11 w-auto object-contain sm:mb-7 sm:h-14"
          width={199}
          height={80}
        />
        <p className="mb-4 text-[0.7rem] tracking-[0.28em] uppercase">
          <ShinyText>Meet Shaan</ShinyText>
        </p>
      </CtaBand>
    </PageTransition>
  )
}

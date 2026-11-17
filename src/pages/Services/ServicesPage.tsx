import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BlurText } from '../../components/animations/BlurText'
import { ClipReveal } from '../../components/animations/ClipReveal'
import { Magnet } from '../../components/animations/Magnet'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { SplitText } from '../../components/animations/SplitText'
import { SpotlightCard } from '../../components/animations/SpotlightCard'
import { Stagger, StaggerItem } from '../../components/animations/Stagger'
import { TiltCard } from '../../components/animations/TiltCard'
import { Button } from '../../components/common/Button'
import { CtaBand } from '../../components/common/CtaBand'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { siteConfig } from '../../config/site'
import { services } from '../../data/servicesData'
import {
  servicesFaq,
  servicesHero,
  servicesHowItWorks,
  servicesPromises,
} from '../../data/servicesPageData'

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

export function ServicesPage() {
  const reduced = useReducedMotion()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <PageTransition>
      <SEO
        title="Services"
        description="Photography services by Shaan — weddings, pre-wedding, portraits, events, and couple sessions with clear quotes and warm delivery."
        path="/services"
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-36 md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(880px_480px_at_8%_-12%,rgb(193_154_107/0.16),transparent_55%),radial-gradient(640px_380px_at_100%_0%,rgb(232_217_197/0.4),transparent_50%)]" />

        <div className="section-pad container-wide relative">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <motion.p
                className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.28em] text-desert uppercase"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <span className="h-px w-6 bg-desert/55" aria-hidden />
                {servicesHero.eyebrow}
              </motion.p>

              <BlurText
                as="h1"
                text={servicesHero.title}
                className="mt-3 font-serif text-[clamp(2.4rem,7vw,5rem)] leading-[1.05] text-deep-brown text-balance"
                delay={70}
                blur={11}
                startDelay={0.08}
              />

              <SplitText
                text={servicesHero.description}
                className="mt-5 max-w-xl text-soft-gray leading-relaxed sm:mt-6 sm:text-[1.02rem]"
                delay={0.2}
                stagger={0.02}
              />

              <Reveal delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                  <Magnet maxOffset={10} magnetStrength={3.6}>
                    <Button to="/booking">Request a Quote</Button>
                  </Magnet>
                  <Magnet maxOffset={10} magnetStrength={3.6}>
                    <Button to="/portfolio" variant="secondary">
                      View Portfolio
                    </Button>
                  </Magnet>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <nav aria-label="Jump to a service" className="border-t border-sand pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                <p className="text-[0.65rem] tracking-[0.2em] text-camel uppercase">Jump to</p>
                <ul className="mt-4 space-y-3">
                  {services.map((service, i) => (
                    <li key={service.id}>
                      <a
                        href={`#${service.slug}`}
                        className="group flex items-baseline justify-between gap-3 text-sm text-soft-gray transition hover:text-deep-brown"
                      >
                        <span className="font-serif text-lg text-deep-brown transition group-hover:text-chocolate sm:text-xl">
                          {service.title.replace(' Photography', '')}
                        </span>
                        <span className="text-[0.62rem] tracking-[0.16em] text-camel uppercase">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="surface-mist py-14 sm:py-16 md:py-20">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="How it works"
            title="Simple from inquiry to gallery"
            description={`Based in ${siteConfig.contact.location} — available for local and destination coverage.`}
          />

          <div className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-3 md:gap-10">
            {servicesHowItWorks.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07}>
                <SpotlightCard className="h-full border-t border-sand pt-6">
                  <p className="text-[0.65rem] tracking-[0.26em] text-camel uppercase">
                    {step.num}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-deep-brown">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-soft-gray">{step.text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service list */}
      <section className="section-pad container-wide space-y-20 py-16 sm:space-y-24 sm:py-20 md:space-y-32 md:py-28">
        {services.map((service, i) => {
          const reverse = i % 2 === 1
          return (
            <article
              key={service.id}
              id={service.slug}
              className={`scroll-mt-28 grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                reverse ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <TiltCard rotateAmplitude={4} scaleOnHover={1.01}>
                <ClipReveal delay={0.05} direction={reverse ? 'left' : 'right'}>
                  <SpotlightCard className="film-frame overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="aspect-[4/5] w-full object-cover md:aspect-[5/6]"
                      loading="lazy"
                    />
                  </SpotlightCard>
                </ClipReveal>
              </TiltCard>

              <Reveal delay={0.08}>
                <p className="text-[0.7rem] tracking-[0.24em] text-desert uppercase">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <BlurText
                  as="h2"
                  text={service.title}
                  className="mt-3 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] text-deep-brown"
                  delay={60}
                  blur={10}
                />
                <p className="mt-4 text-soft-gray leading-relaxed">{service.description}</p>

                <Stagger className="mt-6" stagger={0.05}>
                  {service.includes.map((item) => (
                    <StaggerItem key={item}>
                      <p className="border-b border-sand/80 py-2.5 text-sm text-chocolate">
                        {item}
                      </p>
                    </StaggerItem>
                  ))}
                </Stagger>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button to="/booking">Request a Quote</Button>
                  <Button to={service.path} variant="secondary">
                    See examples
                  </Button>
                </div>
              </Reveal>
            </article>
          )
        })}
      </section>

      {/* Promises */}
      <section className="surface-stone py-16 sm:py-20 md:py-24">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="What you can expect"
            title="The same care, every session"
          />
          <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {servicesPromises.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="border-t border-camel/30 pt-5">
                  <p className="text-[0.65rem] tracking-[0.22em] text-camel uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-serif text-xl text-deep-brown">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft-gray">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links strip */}
      <section className="section-pad container-wide py-14 sm:py-16">
        <Reveal>
          <div className="flex flex-col gap-6 border border-sand/80 bg-warm-white/55 px-6 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[0.68rem] tracking-[0.24em] text-desert uppercase">Explore</p>
              <p className="mt-2 font-serif text-2xl text-deep-brown sm:text-3xl">
                Prefer browsing by chapter?
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={service.path}
                  className="text-[0.68rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
                >
                  {service.title.replace(' Photography', '')} →
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="surface-mist py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="FAQ"
                title="Before you inquire"
                description="Pricing style, combining services, and what delivery looks like."
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
              {servicesFaq.map((item, i) => (
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

      {/* Next step */}
      <section className="section-pad container-wide py-14 sm:py-16">
        <Reveal>
          <div className="grid gap-6 border border-sand/80 bg-ivory/80 px-6 py-8 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-10">
            <div>
              <p className="text-[0.68rem] tracking-[0.24em] text-desert uppercase">Next step</p>
              <SplitText
                text="Not sure which fit is right? Share your date and what you’re dreaming of — I’ll suggest a clear plan."
                className="mt-3 max-w-xl font-serif text-[clamp(1.4rem,3vw,2rem)] leading-snug text-deep-brown"
                delay={0.05}
                stagger={0.025}
              />
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button to="/booking">Get a Quote</Button>
              <Button to="/about" variant="secondary">
                About Shaan
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand
        title="Ready to plan something?"
        description="Share your date and what you’re dreaming of — I’ll reply with availability and a clear quote."
        primary={{ to: '/booking', label: 'Request a Quote' }}
        secondary={{ to: '/contact', label: 'Contact' }}
      />
    </PageTransition>
  )
}

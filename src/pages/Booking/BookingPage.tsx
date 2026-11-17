import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BlurText } from '../../components/animations/BlurText'
import { Magnet } from '../../components/animations/Magnet'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { ShinyText } from '../../components/animations/ShinyText'
import { SplitText } from '../../components/animations/SplitText'
import { SpotlightCard } from '../../components/animations/SpotlightCard'
import { Stagger, StaggerItem } from '../../components/animations/Stagger'
import { Button } from '../../components/common/Button'
import { CtaBand } from '../../components/common/CtaBand'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { SocialIcons } from '../../components/common/SocialIcons'
import { BookingForm } from '../../components/forms/BookingForm'
import {
  getMailtoLink,
  getWhatsAppLink,
  siteConfig,
} from '../../config/site'
import {
  bookingFaq,
  bookingHero,
  bookingSteps,
  bookingTips,
} from '../../data/bookingData'
import { services } from '../../data/servicesData'

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

export function BookingPage() {
  const reduced = useReducedMotion()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <PageTransition>
      <SEO
        title="Booking"
        description="Book a photography session with Shaan — share your date and details for a personal quote on weddings, pre-wedding, portraits, events, and couples."
        path="/booking"
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
                {bookingHero.eyebrow}
              </motion.p>

              <BlurText
                as="h1"
                text={bookingHero.title}
                className="mt-3 font-serif text-[clamp(2.4rem,7vw,5rem)] leading-[1.05] text-deep-brown text-balance"
                delay={70}
                blur={11}
                startDelay={0.08}
              />

              <SplitText
                text={bookingHero.description}
                className="mt-5 max-w-xl text-soft-gray leading-relaxed sm:mt-6 sm:text-[1.02rem]"
                delay={0.2}
                stagger={0.02}
              />

              <Reveal delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                  <Magnet maxOffset={10} magnetStrength={3.6}>
                    <Button href={getWhatsAppLink()} target="_blank" rel="noreferrer">
                      WhatsApp first
                    </Button>
                  </Magnet>
                  <Magnet maxOffset={10} magnetStrength={3.6}>
                    <Button to="/services" variant="secondary">
                      View services
                    </Button>
                  </Magnet>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <SpotlightCard className="border border-sand/70 bg-warm-white/55 p-6 backdrop-blur-[2px] sm:p-7">
                <p className="text-[0.65rem] tracking-[0.2em] text-camel uppercase">Based in</p>
                <p className="mt-3 font-serif text-2xl text-deep-brown sm:text-3xl">
                  <ShinyText speed={4.2}>{siteConfig.contact.location}</ShinyText>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-soft-gray">
                  Local and destination coverage. After the form, WhatsApp or email locks things in
                  fastest.
                </p>
                <SocialIcons tone="dark" className="mt-5" />
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="surface-mist py-14 sm:py-16 md:py-20">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="How booking works"
            title="Three easy steps"
            description="The form starts the conversation — we finalize together."
          />

          <div className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-3 md:gap-10">
            {bookingSteps.map((step, i) => (
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

      {/* Form + side tips */}
      <section className="section-pad container-wide grid gap-10 py-16 sm:gap-12 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 md:py-28">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Before you fill"
            title="A few things that help"
            description="Short notes beat long essays — I’ll ask if I need more."
            className="max-w-md"
          />

          <Stagger className="mt-10 space-y-6" stagger={0.06}>
            {bookingTips.map((tip) => (
              <StaggerItem key={tip.title}>
                <div className="border-t border-sand pt-5">
                  <h3 className="font-serif text-xl text-deep-brown">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft-gray">{tip.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-3 sm:grid-cols-1">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="group border border-sand/80 bg-warm-white/70 px-4 py-4 transition hover:border-camel/70"
              >
                <p className="text-[0.65rem] tracking-[0.2em] text-desert uppercase">WhatsApp</p>
                <p className="mt-2 text-sm text-deep-brown transition group-hover:text-chocolate">
                  Fast replies
                </p>
              </a>
              <a
                href={getMailtoLink()}
                className="group border border-sand/80 bg-warm-white/70 px-4 py-4 transition hover:border-camel/70"
              >
                <p className="text-[0.65rem] tracking-[0.2em] text-desert uppercase">Email</p>
                <p className="mt-2 truncate text-sm text-deep-brown transition group-hover:text-chocolate">
                  {siteConfig.contact.email}
                </p>
              </a>
              <Link
                to="/contact"
                className="group border border-sand/80 bg-warm-white/70 px-4 py-4 transition hover:border-camel/70"
              >
                <p className="text-[0.65rem] tracking-[0.2em] text-desert uppercase">Studio</p>
                <p className="mt-2 text-sm text-deep-brown transition group-hover:text-chocolate">
                  {siteConfig.contact.location}
                </p>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <p className="text-[0.65rem] tracking-[0.2em] text-camel uppercase">Or browse</p>
              <ul className="mt-3 space-y-2">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={service.path}
                      className="text-sm text-soft-gray transition hover:text-deep-brown"
                    >
                      {service.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mb-5">
            <p className="text-[0.7rem] tracking-[0.22em] text-desert uppercase">Request</p>
            <h2 className="mt-2 font-serif text-[clamp(1.6rem,3vw,2.25rem)] text-deep-brown">
              Booking inquiry
            </h2>
          </div>
          <SpotlightCard className="border border-sand/70 bg-warm-white/85 p-5 sm:p-7 md:p-8">
            <BookingForm />
          </SpotlightCard>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="surface-stone py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="FAQ"
                title="Booking questions"
                description="Inquiry vs booking, reply timing, budget, and combining sessions."
                className="max-w-md"
              />
              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={getWhatsAppLink()} target="_blank" rel="noreferrer">
                    WhatsApp
                  </Button>
                  <Button to="/contact" variant="secondary">
                    Contact page
                  </Button>
                </div>
              </Reveal>
            </div>

            <div>
              {bookingFaq.map((item, i) => (
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
          <div className="grid gap-6 border border-sand/80 bg-warm-white/60 px-6 py-8 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-10">
            <div>
              <p className="text-[0.68rem] tracking-[0.24em] text-desert uppercase">Prefer chatting?</p>
              <SplitText
                text="Skip the form and message me directly — I’ll ask for the same details there."
                className="mt-3 max-w-xl font-serif text-[clamp(1.4rem,3vw,2rem)] leading-snug text-deep-brown"
                delay={0.05}
                stagger={0.025}
              />
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button href={getWhatsAppLink()} target="_blank" rel="noreferrer">
                WhatsApp
              </Button>
              <Button href={getMailtoLink()} variant="secondary">
                Email
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand
        title="Looking for inspiration first?"
        description="Browse the portfolio, then come back with a date — or inquire now and we’ll shape the plan together."
        primary={{ to: '/portfolio', label: 'View Portfolio' }}
        secondary={{ to: '/services', label: 'View Services' }}
      />
    </PageTransition>
  )
}

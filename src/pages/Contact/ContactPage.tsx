import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BlurText } from '../../components/animations/BlurText'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { SplitText } from '../../components/animations/SplitText'
import { SpotlightCard } from '../../components/animations/SpotlightCard'
import { Stagger, StaggerItem } from '../../components/animations/Stagger'
import { Button } from '../../components/common/Button'
import { CtaBand } from '../../components/common/CtaBand'
import { MapEmbed } from '../../components/common/MapEmbed'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { SocialIcons } from '../../components/common/SocialIcons'
import { ContactForm } from '../../components/forms/ContactForm'
import {
  getFullAddress,
  getMailtoLink,
  getMapsSearchUrl,
  getWhatsAppLink,
  siteConfig,
} from '../../config/site'
import {
  contactChannels,
  contactExpect,
  contactFaq,
  contactHero,
} from '../../data/contactData'

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

function channelHref(id: (typeof contactChannels)[number]['id']) {
  switch (id) {
    case 'whatsapp':
      return getWhatsAppLink()
    case 'email':
      return getMailtoLink()
    case 'phone':
      return `tel:${siteConfig.contact.phoneRaw}`
    case 'visit':
      return getMapsSearchUrl()
  }
}

export function ContactPage() {
  const address = siteConfig.contact.address
  const reduced = useReducedMotion()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <PageTransition>
      <SEO
        title="Contact"
        description="Get in touch with Shaan Photography in Ahmedabad — weddings, portraits, events, and couple sessions via form, WhatsApp, or studio visit."
        path="/contact"
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-36 md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(880px_480px_at_10%_-12%,rgb(193_154_107/0.16),transparent_55%),radial-gradient(640px_380px_at_100%_0%,rgb(232_217_197/0.42),transparent_50%)]" />

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
                {contactHero.eyebrow}
              </motion.p>

              <BlurText
                as="h1"
                text={contactHero.title}
                className="mt-3 font-serif text-[clamp(2.4rem,7vw,5rem)] leading-[1.05] text-deep-brown text-balance"
                delay={70}
                blur={11}
                startDelay={0.08}
              />

              <SplitText
                text={contactHero.description}
                className="mt-5 max-w-xl text-soft-gray leading-relaxed sm:mt-6 sm:text-[1.02rem]"
                delay={0.2}
                stagger={0.022}
              />

              <Reveal delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                  <Button href={getWhatsAppLink()} target="_blank" rel="noreferrer">
                    WhatsApp
                  </Button>
                  <Button to="/booking" variant="secondary">
                    Book a Session
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="border-t border-sand pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                <p className="text-[0.65rem] tracking-[0.2em] text-camel uppercase">Studio</p>
                <p className="mt-3 font-serif text-2xl text-deep-brown sm:text-3xl">
                  {address.city}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-soft-gray">
                  {address.line1}
                  <br />
                  {address.line2}
                </p>
                <p className="mt-4 text-[0.65rem] tracking-[0.16em] text-soft-gray uppercase">
                  {siteConfig.social.instagramHandle}
                </p>
                <SocialIcons tone="dark" className="mt-5" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quick channels */}
      <section className="surface-mist py-12 sm:py-14 md:py-16">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="Reach out"
            title="Pick what feels easiest"
            description="Every path reaches me directly — choose the one you prefer."
          />

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {contactChannels.map((channel, i) => {
              const href = channelHref(channel.id)
              const external = channel.id !== 'phone'
              const value =
                channel.id === 'email'
                  ? siteConfig.contact.email
                  : channel.id === 'phone'
                    ? siteConfig.contact.phone
                    : channel.id === 'whatsapp'
                      ? 'Chat on WhatsApp'
                      : siteConfig.contact.location

              return (
                <Reveal key={channel.id} delay={i * 0.05}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="group block h-full border border-sand/80 bg-warm-white/70 p-5 transition hover:border-camel/70 hover:bg-warm-white sm:p-6"
                  >
                    <p className="text-[0.65rem] tracking-[0.2em] text-desert uppercase">
                      {channel.label}
                    </p>
                    <p className="mt-3 font-serif text-xl text-deep-brown transition group-hover:text-chocolate sm:text-2xl">
                      {channel.detail}
                    </p>
                    <p className="mt-2 truncate text-sm text-soft-gray">{value}</p>
                    <p className="mt-5 text-[0.65rem] tracking-[0.16em] text-chocolate uppercase transition group-hover:text-deep-brown">
                      {channel.cta} →
                    </p>
                  </a>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form + details */}
      <section className="section-pad container-wide grid gap-10 py-16 sm:gap-12 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 md:py-28">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Details"
            title="Studio & direct lines"
            description="Prefer writing it out? Use the form — or jump straight to WhatsApp or email."
            className="max-w-md"
          />

          <Stagger className="mt-10 space-y-8" stagger={0.06}>
            <StaggerItem>
              <p className="text-[0.7rem] tracking-[0.2em] text-desert uppercase">Studio</p>
              <address className="mt-2 not-italic">
                <p className="font-serif text-xl text-deep-brown sm:text-2xl">{address.line1}</p>
                <p className="mt-1 text-soft-gray leading-relaxed">
                  {address.line2}
                  <br />
                  {address.city}, {address.state} {address.postal}
                  <br />
                  {address.country}
                </p>
              </address>
              <a
                href={getMapsSearchUrl()}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-[0.68rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
              >
                Get directions →
              </a>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[0.7rem] tracking-[0.2em] text-desert uppercase">Email</p>
              <a
                href={getMailtoLink()}
                className="mt-2 block break-all font-serif text-xl text-deep-brown transition hover:text-chocolate sm:text-2xl"
              >
                {siteConfig.contact.email}
              </a>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[0.7rem] tracking-[0.2em] text-desert uppercase">Phone</p>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="mt-2 block font-serif text-xl text-deep-brown transition hover:text-chocolate sm:text-2xl"
              >
                {siteConfig.contact.phone}
              </a>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[0.7rem] tracking-[0.2em] text-desert uppercase">WhatsApp</p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block font-serif text-xl text-deep-brown transition hover:text-chocolate sm:text-2xl"
              >
                Message on WhatsApp
              </a>
            </StaggerItem>

            <StaggerItem>
              <p className="mb-3 text-[0.7rem] tracking-[0.2em] text-desert uppercase">Social</p>
              <SocialIcons tone="dark" />
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-sm text-soft-gray transition hover:text-deep-brown"
              >
                {siteConfig.social.instagramHandle}
              </a>
            </StaggerItem>
          </Stagger>
        </div>

        <Reveal delay={0.08}>
          <div className="mb-5">
            <p className="text-[0.7rem] tracking-[0.22em] text-desert uppercase">Write to me</p>
            <h2 className="mt-2 font-serif text-[clamp(1.6rem,3vw,2.25rem)] text-deep-brown">
              Send a note
            </h2>
            <p className="mt-2 max-w-md text-sm text-soft-gray">
              Share a few details and continue on WhatsApp or email after submit — that’s the
              fastest way to lock things in.
            </p>
          </div>
          <SpotlightCard className="border border-sand/70 bg-warm-white/80 p-5 sm:p-7">
            <ContactForm />
          </SpotlightCard>
        </Reveal>
      </section>

      {/* What to expect */}
      <section className="surface-stone py-14 sm:py-16 md:py-20">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="After you write"
            title="What happens next"
          />
          <div className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-3 md:gap-10">
            {contactExpect.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="border-t border-camel/30 pt-6">
                  <p className="text-[0.65rem] tracking-[0.22em] text-camel uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-deep-brown">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft-gray">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
            <div>
              <p className="text-[0.7rem] tracking-[0.24em] text-desert uppercase">Find us</p>
              <h2 className="mt-2 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] text-deep-brown">
                Studio location
              </h2>
            </div>
            <p className="max-w-md text-sm text-soft-gray sm:text-right">{getFullAddress()}</p>
          </div>
          <MapEmbed className="film-frame min-h-[340px] sm:min-h-[440px]" />
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
                title="Before you reach out"
                description="Reply timing, what to include, studio visits, and travel."
                className="max-w-md"
              />
              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={getWhatsAppLink()} target="_blank" rel="noreferrer">
                    WhatsApp
                  </Button>
                  <Button to="/services" variant="secondary">
                    View services
                  </Button>
                </div>
              </Reveal>
            </div>

            <div>
              {contactFaq.map((item, i) => (
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
              <p className="text-[0.68rem] tracking-[0.24em] text-desert uppercase">Next step</p>
              <SplitText
                text="Ready to plan a session? Share a few details and I’ll reply with availability."
                className="mt-3 max-w-xl font-serif text-[clamp(1.4rem,3vw,2rem)] leading-snug text-deep-brown"
                delay={0.05}
                stagger={0.025}
              />
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button to="/booking">Book a Session</Button>
              <Button to="/portfolio" variant="secondary">
                View Portfolio
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand
        title="Let’s talk about your day"
        description="Wedding, portrait, couple session, or celebration — I’d love to hear what you’re planning."
        primary={{ to: '/booking', label: 'Book a Session' }}
        secondary={{ to: '/services', label: 'View Services' }}
      >
        <p className="mb-3 text-sm text-soft-gray">
          Or{' '}
          <Link to="/about" className="text-chocolate underline-offset-4 hover:underline">
            meet Shaan
          </Link>{' '}
          first.
        </p>
      </CtaBand>
    </PageTransition>
  )
}

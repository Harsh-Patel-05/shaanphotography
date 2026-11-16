import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { ContactForm } from '../../components/forms/ContactForm'
import { getMailtoLink, getWhatsAppLink, siteConfig } from '../../config/site'

export function ContactPage() {
  return (
    <PageTransition>
      <SEO
        title="Contact"
        description="Get in touch with Shaan Photography for weddings, portraits, events, and couple sessions."
        path="/contact"
      />

      <section className="section-pad container-wide pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-36">
        <SectionHeading
          eyebrow="Contact"
          title="Say hello"
          description="Fill in the form, or message on WhatsApp / email if that’s easier."
        />
      </section>

      <section className="section-pad container-wide grid gap-10 pb-20 sm:gap-12 sm:pb-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="space-y-7 sm:space-y-8">
            <div>
              <p className="text-[0.7rem] tracking-[0.2em] text-desert uppercase">Email</p>
              <a
                href={getMailtoLink()}
                className="mt-2 block break-all font-serif text-xl text-deep-brown transition hover:text-chocolate sm:text-2xl"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div>
              <p className="text-[0.7rem] tracking-[0.2em] text-desert uppercase">Phone</p>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="mt-2 block font-serif text-xl text-deep-brown transition hover:text-chocolate sm:text-2xl"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div>
              <p className="text-[0.7rem] tracking-[0.2em] text-desert uppercase">WhatsApp</p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block font-serif text-xl text-deep-brown transition hover:text-chocolate sm:text-2xl"
              >
                Message on WhatsApp
              </a>
            </div>
            <div>
              <p className="text-[0.7rem] tracking-[0.2em] text-desert uppercase">Instagram</p>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block font-serif text-xl text-deep-brown transition hover:text-chocolate sm:text-2xl"
              >
                {siteConfig.social.instagramHandle}
              </a>
            </div>
            <p className="max-w-sm text-sm text-soft-gray leading-relaxed">
              Based in {siteConfig.contact.location}. Happy to travel for weddings and destination
              shoots.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </section>
    </PageTransition>
  )
}

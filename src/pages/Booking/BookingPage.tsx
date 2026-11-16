import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { BookingForm } from '../../components/forms/BookingForm'

export function BookingPage() {
  return (
    <PageTransition>
      <SEO
        title="Booking"
        description="Book a photography session with Shaan — share your date and details for a personal quote."
        path="/booking"
      />

      <section className="section-pad container-wide pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-36">
        <SectionHeading
          eyebrow="Booking"
          title="Tell me about your day"
          description="Share a few details below. After you submit, continue on WhatsApp or email so we can lock things in."
        />
      </section>

      <section className="section-pad container-wide max-w-4xl pb-20 sm:pb-24 md:pb-32">
        <Reveal>
          <BookingForm />
        </Reveal>
      </section>
    </PageTransition>
  )
}

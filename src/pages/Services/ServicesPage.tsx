import { Link } from 'react-router-dom'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { Button } from '../../components/common/Button'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { services } from '../../data/servicesData'

export function ServicesPage() {
  return (
    <PageTransition>
      <SEO
        title="Services"
        description="Photography services by Shaan — weddings, pre-wedding, portraits, events, and couple sessions."
        path="/services"
      />

      <section className="section-pad container-wide pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-36">
        <SectionHeading
          eyebrow="Services"
          title="What I offer"
          description="No fixed packages online — tell me about your day and I’ll send a clear quote."
        />
      </section>

      <section className="section-pad container-wide space-y-16 pb-20 sm:space-y-20 sm:pb-24 md:space-y-28 md:pb-32">
        {services.map((service, i) => {
          const reverse = i % 2 === 1
          return (
            <article
              key={service.id}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                reverse ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Reveal>
                <img
                  src={service.image}
                  alt={service.title}
                  className="aspect-[4/5] w-full object-cover md:aspect-[5/6]"
                  loading="lazy"
                />
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[0.7rem] tracking-[0.24em] text-desert uppercase">
                  0{i + 1}
                </p>
                <h2 className="mt-3 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] text-deep-brown">
                  {service.title}
                </h2>
                <p className="mt-4 text-soft-gray leading-relaxed">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="border-b border-sand/80 py-2 text-sm text-chocolate"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to="/booking">Request a Quote</Button>
                  <Link
                    to={service.path}
                    className="inline-flex items-center px-2 text-[0.72rem] tracking-[0.16em] text-soft-gray uppercase transition hover:text-deep-brown"
                  >
                    See examples
                  </Link>
                </div>
              </Reveal>
            </article>
          )
        })}
      </section>
    </PageTransition>
  )
}

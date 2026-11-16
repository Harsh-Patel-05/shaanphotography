import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { Button } from '../../components/common/Button'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { getImagesByCategory } from '../../data/galleryData'

export function PreWeddingPage() {
  const images = getImagesByCategory('Pre-Wedding')

  const locations = [
    {
      title: 'By the water',
      location: 'Seaside',
      image: images[0]?.src,
      text: 'Soft wind, golden light, and room to just walk and talk.',
    },
    {
      title: 'In the city',
      location: 'Urban',
      image: images[2]?.src ?? images[1]?.src,
      text: 'Quiet streets, old walls, and frames that feel like a film still.',
    },
    {
      title: 'Open skies',
      location: 'Outdoors',
      image: images[4]?.src ?? images[1]?.src,
      text: 'Hills, dusk light, and space for the two of you.',
    },
  ]

  return (
    <PageTransition>
      <SEO
        title="Pre-Wedding Photography"
        description="Pre-wedding photography by Shaan — easy sessions, beautiful locations, and photos that feel like you."
        path="/pre-wedding"
      />

      <section className="section-pad container-wide pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-20">
        <Reveal>
          <p className="text-[0.7rem] tracking-[0.28em] text-desert uppercase">Pre-Wedding</p>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.08] text-deep-brown italic">
            Before the big day
          </h1>
          <p className="mt-4 max-w-xl text-soft-gray leading-relaxed sm:mt-5">
            A relaxed shoot to celebrate where you are right now — no rush, no stiff posing, just
            the two of you.
          </p>
        </Reveal>
      </section>

      <section className="section-pad container-wide pb-12 sm:pb-16">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {locations.map((loc, i) => (
            <Reveal key={loc.title} delay={i * 0.06}>
              <article>
                <img
                  src={loc.image}
                  alt={`${loc.title} — ${loc.location}`}
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
                <p className="mt-3 text-[0.65rem] tracking-[0.2em] text-camel uppercase sm:mt-4">
                  {loc.location}
                </p>
                <h2 className="mt-1 font-serif text-xl text-deep-brown sm:text-2xl">{loc.title}</h2>
                <p className="mt-2 text-sm text-soft-gray">{loc.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-warm-white py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="Gallery"
            title="Pre-wedding gallery"
            description="Styled sessions before the wedding — warm, romantic, and real."
          />
          <div className="mt-10 sm:mt-12">
            <MasonryGrid images={images} />
          </div>
        </div>
      </section>

      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.85rem,4vw,3rem)] text-deep-brown">
              Want to plan a shoot?
            </h2>
            <p className="mt-4 text-soft-gray">
              Tell me your favorite locations and vibe — we’ll shape a day around that.
            </p>
            <div className="mt-8">
              <Button to="/booking">Inquire Now</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}

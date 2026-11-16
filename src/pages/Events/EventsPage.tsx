import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { Button } from '../../components/common/Button'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { getImagesByCategory } from '../../data/galleryData'

export function EventsPage() {
  const images = getImagesByCategory('Events')

  const stories = [
    {
      title: 'A proposal by the water',
      detail: 'Private proposal',
      image: images[0]?.src,
      text: 'The setup, the nerves, the yes — kept gently, without getting in the way.',
    },
    {
      title: 'A celebration evening',
      detail: 'Event coverage',
      image: images[1]?.src ?? images[0]?.src,
      text: 'Decor, guests, and the mood of the night in one place.',
    },
  ]

  return (
    <PageTransition>
      <SEO
        title="Event Photography"
        description="Event photography by Shaan — proposals, celebrations, and gatherings captured with a light touch."
        path="/events"
      />

      <section className="section-pad container-wide pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-36">
        <Reveal>
          <p className="text-[0.7rem] tracking-[0.28em] text-desert uppercase">Events</p>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.25rem,6vw,4.5rem)] text-deep-brown">
            Celebrations, kept with care
          </h1>
          <p className="mt-4 max-w-xl text-soft-gray sm:mt-5">
            Proposals, parties, and private gatherings — covered so you can stay present while the
            night gets remembered.
          </p>
        </Reveal>
      </section>

      <section className="section-pad container-wide pb-16 sm:pb-20">
        <SectionHeading eyebrow="Gallery" title="Event gallery" />
        <div className="mt-10 sm:mt-12">
          <MasonryGrid images={images} />
        </div>
      </section>

      <section className="bg-warm-white py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <SectionHeading eyebrow="Featured" title="A couple of stories" />
          <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 md:grid-cols-2">
            {stories.map((story, i) => (
              <Reveal key={story.title} delay={i * 0.06}>
                <article>
                  <img
                    src={story.image}
                    alt={story.title}
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                  />
                  <p className="mt-3 text-[0.65rem] tracking-[0.2em] text-camel uppercase sm:mt-4">
                    {story.detail}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-deep-brown sm:text-2xl">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-sm text-soft-gray">{story.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad container-wide py-16 text-center sm:py-20">
        <Reveal>
          <h2 className="font-serif text-2xl text-deep-brown sm:text-3xl md:text-4xl">
            Hosting something special?
          </h2>
          <div className="mt-8">
            <Button to="/booking">Request Coverage</Button>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}

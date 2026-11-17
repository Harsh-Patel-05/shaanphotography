import { ClipReveal } from '../../components/animations/ClipReveal'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { CtaBand } from '../../components/common/CtaBand'
import { PageHero } from '../../components/common/PageHero'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { getUniqueCategoryImages, img, mediaIds } from '../../data/mediaMap'

const stories = [
  {
    title: 'A proposal by the water',
    detail: 'Private proposal',
    text: 'The setup, the nerves, the yes — kept gently, without getting in the way.',
  },
  {
    title: 'A celebration evening',
    detail: 'Event coverage',
    text: 'Decor, guests, and the mood of the night in one place.',
  },
]

export function EventsPage() {
  const featureIds = [...mediaIds.events.stories]
  const images = getUniqueCategoryImages('Events', featureIds)
  const storyImages = mediaIds.events.stories.map((id) => img(id, 'Events'))

  return (
    <PageTransition>
      <SEO
        title="Event Photography"
        description="Event photography by Shaan — proposals, celebrations, and gatherings captured with a light touch."
        path="/events"
      />

      <PageHero
        eyebrow="Events"
        title="Celebrations, kept with care"
        description="Proposals, parties, and private gatherings — covered so you can stay present while the night gets remembered."
      />

      <section className="section-pad container-wide pb-16 sm:pb-20">
        <SectionHeading
          eyebrow="Gallery"
          title="Event gallery"
          description="Tap a frame to view it full screen."
        />
        <div className="mt-10 sm:mt-12">
          <MasonryGrid images={images} pageSize={9} />
        </div>
      </section>

      <section className="surface-mist py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <SectionHeading eyebrow="Featured" title="A couple of stories" />
          <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 md:grid-cols-2">
            {stories.map((story, i) => (
              <Reveal key={story.title} delay={i * 0.06}>
                <article className="group">
                  <ClipReveal delay={i * 0.04}>
                    <div className="film-frame overflow-hidden">
                      <img
                        src={storyImages[i]?.src}
                        alt={story.title}
                        className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  </ClipReveal>
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

      <CtaBand
        title="Hosting something special?"
        description="Share the date and what kind of night it is — I’ll tell you how I’d cover it."
        primary={{ to: '/booking', label: 'Request Coverage' }}
        secondary={{ to: '/contact', label: 'Contact' }}
        tone="stone"
      />
    </PageTransition>
  )
}

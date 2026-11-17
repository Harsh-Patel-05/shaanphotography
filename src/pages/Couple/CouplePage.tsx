import { ClipReveal } from '../../components/animations/ClipReveal'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { CtaBand } from '../../components/common/CtaBand'
import { PageHero } from '../../components/common/PageHero'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { getUniqueCategoryImages, img, mediaIds } from '../../data/mediaMap'

export function CouplePage() {
  const featureIds = [mediaIds.couple.lead, mediaIds.couple.side]
  const images = getUniqueCategoryImages('Couple Photography', featureIds)
  const lead = img(mediaIds.couple.lead, 'Couple Photography')
  const side = img(mediaIds.couple.side, 'Couple Photography')

  return (
    <PageTransition>
      <SEO
        title="Couple Photography"
        description="Couple sessions with Shaan — easy walks, natural connection, and photos that feel like home."
        path="/couple"
      />

      <PageHero
        eyebrow="Couple Photography"
        title="Just the two of you"
        description="Walks, laughs, quiet frames. A session that feels easy and looks like your kind of love."
      />

      <section className="section-pad container-wide pb-10">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-12 md:gap-5">
          <Reveal className="md:col-span-7">
            <ClipReveal>
              <div className="film-frame overflow-hidden">
                <img
                  src={lead.src}
                  alt={lead.alt}
                  className="aspect-[16/11] w-full object-cover"
                />
              </div>
            </ClipReveal>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <ClipReveal direction="left" delay={0.05}>
              <div className="film-frame overflow-hidden">
                <img
                  src={side.src}
                  alt={side.alt}
                  className="aspect-[4/5] w-full object-cover md:h-full"
                />
              </div>
            </ClipReveal>
          </Reveal>
        </div>
      </section>

      <section className="surface-mist py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="Gallery"
            title="Couple gallery"
            description="Natural frames — warm, simple, and true. Tap any photo to open it."
          />
          <div className="mt-10 sm:mt-12">
            <MasonryGrid images={images} pageSize={9} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Book a couple session"
        description="Share a place you both like — beach, city, or somewhere quieter — and we’ll build around that."
        primary={{ to: '/booking', label: 'Inquire Now' }}
        secondary={{ to: '/pre-wedding', label: 'Pre-Wedding' }}
      />
    </PageTransition>
  )
}

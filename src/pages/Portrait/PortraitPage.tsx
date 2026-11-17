import { ClipReveal } from '../../components/animations/ClipReveal'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { CtaBand } from '../../components/common/CtaBand'
import { PageHero } from '../../components/common/PageHero'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { getUniqueCategoryImages, img, mediaIds } from '../../data/mediaMap'

export function PortraitPage() {
  const featureIds = [mediaIds.portrait.lead, mediaIds.portrait.side]
  const images = getUniqueCategoryImages('Portrait', featureIds)
  const lead = img(mediaIds.portrait.lead, 'Portrait')
  const side = img(mediaIds.portrait.side, 'Portrait')

  return (
    <PageTransition>
      <SEO
        title="Portrait Photography"
        description="Portrait sessions with Shaan in Ahmedabad — calm direction, flattering light, and photos you’ll actually like."
        path="/portrait"
      />

      <PageHero eyebrow="Portrait" title="Portraits that feel like you">
        <p className="max-w-md text-soft-gray leading-relaxed lg:justify-self-end lg:text-right">
          Soft light, a little guidance, and room to breathe. No stiff studio energy — just a calm
          session and frames that still look like you.
        </p>
      </PageHero>

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

      <section className="section-pad container-wide py-14 sm:py-16 md:py-24">
        <SectionHeading
          eyebrow="Gallery"
          title="Portrait gallery"
          description="A few favorites from recent sessions — tap to view larger."
        />
        <div className="mt-8 sm:mt-10">
          <MasonryGrid images={images} pageSize={9} />
        </div>
      </section>

      <CtaBand
        title="Want a portrait session?"
        description="Tell me if you’d like outdoor light or a quieter indoor spot — I’ll suggest a simple plan."
        primary={{ to: '/booking', label: 'Get in Touch' }}
        secondary={{ to: '/services', label: 'All Services' }}
        tone="stone"
      />
    </PageTransition>
  )
}

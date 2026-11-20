import { ClipReveal } from '../../components/animations/ClipReveal'
import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { SpotlightCard } from '../../components/animations/SpotlightCard'
import { Stagger, StaggerItem } from '../../components/animations/Stagger'
import { TiltCard } from '../../components/animations/TiltCard'
import { CtaBand } from '../../components/common/CtaBand'
import { PageHero } from '../../components/common/PageHero'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { getUniqueCategoryImages, img, mediaIds } from '../../data/mediaMap'

const approach = [
  {
    title: 'Easy together',
    text: 'Walks, laughs, and quiet frames — no forced poses.',
  },
  {
    title: 'Your kind of place',
    text: 'Beach, city, or somewhere quieter — we build around you.',
  },
  {
    title: 'Natural connection',
    text: 'Photos that feel like home, not a performance.',
  },
]

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
            <TiltCard rotateAmplitude={5} className="h-full">
              <ClipReveal>
                <div className="film-frame overflow-hidden">
                  <img
                    src={lead.src}
                    alt={lead.alt}
                    className="aspect-[16/11] w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </ClipReveal>
            </TiltCard>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <TiltCard rotateAmplitude={5} className="h-full">
              <ClipReveal direction="left" delay={0.05}>
                <div className="film-frame overflow-hidden">
                  <img
                    src={side.src}
                    alt={side.alt}
                    className="aspect-[4/5] w-full object-cover md:h-full"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </ClipReveal>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad container-wide py-14 sm:py-16">
        <SectionHeading
          eyebrow="Approach"
          title="Keep it easy"
          description="A couple session should feel like time together — not a shoot you have to perform for."
        />
        <Stagger className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8" stagger={0.08}>
          {approach.map((item, i) => (
            <StaggerItem key={item.title}>
              <SpotlightCard className="h-full border-t border-sand pt-6">
                <p className="text-[0.65rem] tracking-[0.22em] text-camel uppercase">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-serif text-xl text-deep-brown sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-soft-gray">{item.text}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
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

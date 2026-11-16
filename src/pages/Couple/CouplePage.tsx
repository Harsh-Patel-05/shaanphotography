import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { Button } from '../../components/common/Button'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { getImagesByCategory } from '../../data/galleryData'

export function CouplePage() {
  const images = getImagesByCategory('Couple Photography')

  return (
    <PageTransition>
      <SEO
        title="Couple Photography"
        description="Couple photography by Shaan — easy sessions, natural connection, and photos that feel like home."
        path="/couple"
      />

      <section className="section-pad container-wide pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-20">
        <Reveal>
          <p className="text-[0.7rem] tracking-[0.28em] text-desert uppercase">Couple Photography</p>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.08] text-deep-brown">
            Just the two of you
          </h1>
          <p className="mt-4 max-w-xl text-soft-gray leading-relaxed sm:mt-5">
            Walks, laughs, quiet frames. A session that feels easy and looks like your kind of love.
          </p>
        </Reveal>
      </section>

      <section className="section-pad container-wide pb-10">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-12 md:gap-5">
          <Reveal className="md:col-span-7">
            <img
              src={images[0]?.src}
              alt="Couple photography"
              className="aspect-[16/11] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <img
              src={images[1]?.src ?? images[0]?.src}
              alt="Couple portrait"
              className="aspect-[4/5] w-full object-cover md:h-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-warm-white py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <SectionHeading
            eyebrow="Gallery"
            title="Couple gallery"
            description="Natural frames of modern love — warm, simple, and true."
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
              Book a couple session
            </h2>
            <p className="mt-4 text-soft-gray">
              Share a location and mood you like — we’ll take it from there.
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

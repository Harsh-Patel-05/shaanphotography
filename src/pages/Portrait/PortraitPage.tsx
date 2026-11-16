import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { Button } from '../../components/common/Button'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { getImagesByCategory } from '../../data/galleryData'

export function PortraitPage() {
  const images = getImagesByCategory('Portrait')

  return (
    <PageTransition>
      <SEO
        title="Portrait Photography"
        description="Portrait photography by Shaan — soft light, natural expressions, and photos you’ll actually like."
        path="/portrait"
      />

      <section className="section-pad container-wide pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-36">
        <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <p className="text-[0.7rem] tracking-[0.28em] text-desert uppercase">Portrait</p>
            <h1 className="mt-3 font-serif text-[clamp(2.25rem,5.5vw,4.25rem)] text-deep-brown">
              Portraits that feel like you
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-soft-gray leading-relaxed lg:justify-self-end">
              Soft light, gentle direction, and room to breathe. No stiff studio energy — just a
              calm session and flattering frames.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad container-wide pb-10">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-12 md:gap-5">
          <Reveal className="md:col-span-7">
            <img
              src={images[0]?.src}
              alt="Portrait photography"
              className="aspect-[16/11] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <img
              src={images[1]?.src ?? images[0]?.src}
              alt="Portrait close-up"
              className="aspect-[4/5] w-full object-cover md:h-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad container-wide py-14 sm:py-16 md:py-24">
        <SectionHeading eyebrow="Gallery" title="Portrait gallery" />
        <div className="mt-8 sm:mt-10">
          <MasonryGrid images={images} />
        </div>
      </section>

      <section className="bg-sand/25 py-16 sm:py-20">
        <div className="section-pad container-wide text-center">
          <Reveal>
            <h2 className="font-serif text-2xl text-deep-brown sm:text-3xl md:text-4xl">
              Book a portrait session
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Button to="/booking">Get in Touch</Button>
              <Button to="/services" variant="secondary">
                View Services
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}

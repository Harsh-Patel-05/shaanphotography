import { PageTransition } from '../../components/animations/PageTransition'
import { ParallaxImage } from '../../components/animations/ParallaxImage'
import { Reveal } from '../../components/animations/Reveal'
import { Button } from '../../components/common/Button'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import { getImagesByCategory } from '../../data/galleryData'

export function WeddingPage() {
  const images = getImagesByCategory('Wedding')

  return (
    <PageTransition>
      <SEO
        title="Wedding Photography"
        description="Wedding photography by Shaan — real ceremonies, warm portraits, and the moments in between."
        path="/wedding"
      />

      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-deep-brown sm:min-h-[70vh] md:min-h-[85vh]">
        <div className="absolute inset-0">
          <img
            src={images[0]?.src}
            alt="Wedding photography"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/40 to-transparent" />
        </div>
        <div className="section-pad container-wide relative z-10 pb-12 pt-28 sm:pb-16 sm:pt-32">
          <Reveal>
            <p className="text-[0.7rem] tracking-[0.28em] text-camel uppercase">Weddings</p>
            <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.25rem,6vw,4.75rem)] text-ivory">
              Your day, as it really felt
            </h1>
            <p className="mt-4 max-w-xl text-sm text-sand/90 sm:mt-5 sm:text-base">
              From getting ready to the last dance — I stay close, stay calm, and keep the moments
              that matter.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <SectionHeading
          eyebrow="Gallery"
          title="Wedding stories"
          description="Ceremony frames, couple portraits, and the quiet bits in between."
        />
        <div className="mt-10 sm:mt-12">
          <MasonryGrid images={images} />
        </div>
      </section>

      <section className="relative h-[40vh] min-h-[280px] sm:h-[50vh] sm:min-h-[360px]">
        <ParallaxImage
          src={images[2]?.src ?? images[0]?.src}
          alt="Wedding photograph"
          className="absolute inset-0 h-full"
        />
        <div className="absolute inset-0 bg-deep-brown/30" />
      </section>

      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.85rem,4vw,3rem)] text-deep-brown">
              Planning your wedding?
            </h2>
            <p className="mt-4 text-soft-gray">
              Share your date and venues — I’ll put together a coverage plan that fits your day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Button to="/booking">Request a Quote</Button>
              <Button to="/contact" variant="secondary">
                Contact
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}

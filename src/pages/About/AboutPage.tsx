import { PageTransition } from '../../components/animations/PageTransition'
import { Reveal } from '../../components/animations/Reveal'
import { Button } from '../../components/common/Button'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { aboutBts, aboutPortrait } from '../../data/galleryData'
import logo from '../../assets/logos/shaan-logo-dark.png'

export function AboutPage() {
  return (
    <PageTransition>
      <SEO
        title="About"
        description="Meet Shaan — wedding and portrait photographer focused on real moments and honest storytelling."
        path="/about"
      />

      <section className="section-pad container-wide pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24">
        <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="text-[0.7rem] tracking-[0.28em] text-desert uppercase">About</p>
            <h1 className="mt-3 font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] text-deep-brown">
              Soft light. Honest stories.
            </h1>
            <p className="mt-5 max-w-xl text-soft-gray leading-relaxed sm:mt-6">
              I’m Shaan — a photographer who cares more about how a moment feels than how perfect it
              looks. Weddings, pre-weddings, portraits, events, and couple sessions.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={aboutPortrait}
              alt="Photograph by Shaan"
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-warm-white py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide grid gap-10 md:grid-cols-2 md:gap-20">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="The story"
              title="It started with watching people"
              className="max-w-md"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-soft-gray leading-relaxed">
              <p>
                I’ve always been drawn to the small things — a hand squeeze, a nervous smile, the
                way light hits a room at the end of the day. Photography became the way I hold onto
                that.
              </p>
              <p>
                Today I work with couples and families who want photos that feel warm and real —
                not overly polished, not stiff. Just true to who they are.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <SectionHeading
          eyebrow="How I work"
          title="Be yourselves. I’ll do the rest."
          description="Less posing pressure, more presence. The photos look best when you stop worrying about the camera."
        />
        <div className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-3">
          {[
            {
              title: 'Emotion first',
              text: 'I chase connection — laughter, glances, quiet pauses — more than perfect poses.',
            },
            {
              title: 'Simple direction',
              text: 'I’ll guide you when you need it, then step back so things stay natural.',
            },
            {
              title: 'Photos that last',
              text: 'Clean edits and warm tones you’ll still love looking at years from now.',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="border-t border-sand pt-6">
                <h3 className="font-serif text-2xl text-deep-brown">{item.title}</h3>
                <p className="mt-3 text-sm text-soft-gray leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-deep-brown py-16 sm:py-20 md:py-28">
        <div className="section-pad container-wide">
          <SectionHeading
            light
            eyebrow="Behind the scenes"
            title="Calm process, clear communication"
            description="From the first chat to your final gallery, I keep things simple and personal."
          />
          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
            {aboutBts.map((src, i) => (
              <Reveal key={src} delay={i * 0.06}>
                <img
                  src={src}
                  alt="Behind the scenes"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad container-wide py-16 sm:py-20 md:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <img
              src={logo}
              alt="Shaan signature"
              className="mb-6 h-12 w-auto object-contain sm:mb-8 sm:h-16"
              width={199}
              height={80}
            />
            <h2 className="font-serif text-[clamp(1.85rem,4vw,3rem)] text-deep-brown">
              Let’s make something you’ll keep
            </h2>
            <p className="mt-4 text-soft-gray">
              Wedding, portrait, couple session, or celebration — I’d love to hear what you’re
              planning.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Button to="/contact">Get in Touch</Button>
              <Button to="/portfolio" variant="secondary">
                View Portfolio
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}

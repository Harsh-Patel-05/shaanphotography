import { Link } from 'react-router-dom'
import {
  getMailtoLink,
  getMapsSearchUrl,
  getWhatsAppLink,
  siteConfig,
} from '../../config/site'
import { footerNavLinks } from '../../data/navigationData'
import { Reveal } from '../animations/Reveal'
import { SplitText } from '../animations/SplitText'
import { Stagger, StaggerItem } from '../animations/Stagger'
import { Logo } from '../common/Logo'
import { SocialIcons } from '../common/SocialIcons'

const YEAR = new Date().getFullYear()

export function Footer() {
  const address = siteConfig.contact.address

  return (
    <footer className="surface-ink relative overflow-hidden text-ivory">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-camel/50 to-transparent" />

      <div className="section-pad container-wide py-16 md:py-24">
        <Reveal>
          <SplitText
            text="Let’s make something you’ll still love looking at years from now."
            as="p"
            className="max-w-3xl font-serif text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.15] text-ivory/95 text-balance"
            delay={0.05}
            stagger={0.04}
          />
        </Reveal>

        <Stagger
          className="mt-12 grid gap-12 border-t border-chocolate/70 pt-12 md:mt-16 md:grid-cols-2 md:gap-14 md:pt-16 lg:grid-cols-4"
          stagger={0.07}
        >
          <StaggerItem className="lg:col-span-1">
            <Logo variant="dark" className="mb-5" />
            <p className="max-w-sm text-sm leading-relaxed text-sand/85">
              {siteConfig.brand.description}
            </p>
            <SocialIcons tone="light" className="mt-6" />
          </StaggerItem>

          <StaggerItem>
            <p className="mb-4 text-[0.68rem] tracking-[0.26em] text-camel uppercase">
              Explore
            </p>
            <ul className="space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="nav-link inline-block text-sm text-ivory/75 transition hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="mb-4 text-[0.68rem] tracking-[0.26em] text-camel uppercase">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-ivory/75">
              <li>
                <a href={getMailtoLink()} className="transition hover:text-ivory">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="transition hover:text-ivory"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-ivory"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-ivory"
                >
                  Instagram {siteConfig.social.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.threads}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-ivory"
                >
                  Threads {siteConfig.social.threadsHandle}
                </a>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="mb-4 text-[0.68rem] tracking-[0.26em] text-camel uppercase">
              Address
            </p>
            <address className="not-italic text-sm leading-relaxed text-ivory/75">
              <p className="text-ivory/90">{address.line1}</p>
              <p className="mt-1">
                {address.line2}
                <br />
                {address.city}, {address.state} {address.postal}
                <br />
                {address.country}
              </p>
            </address>
            <a
              href={getMapsSearchUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-[0.65rem] tracking-[0.16em] text-camel uppercase transition hover:text-ivory"
            >
              View on map →
            </a>
          </StaggerItem>
        </Stagger>

        <div className="mt-12 flex flex-col gap-3 border-t border-chocolate/70 pt-8 text-xs tracking-wide text-soft-gray sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {siteConfig.brand.name}. All rights reserved.
          </p>
          <p className="font-serif text-sm italic text-sand/65">
            Made with care and good light
          </p>
        </div>
      </div>
    </footer>
  )
}

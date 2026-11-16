import { Link } from 'react-router-dom'
import { getMailtoLink, getWhatsAppLink, siteConfig } from '../../config/site'
import { footerNavLinks } from '../../data/navigationData'
import { Logo } from '../common/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-sand bg-deep-brown text-ivory">
      <div className="section-pad container-wide py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo variant="dark" className="mb-5" />
            <p className="max-w-sm text-sm leading-relaxed text-sand/90">
              {siteConfig.brand.description}
            </p>
          </div>

          <div>
            <p className="mb-4 text-[0.7rem] tracking-[0.24em] text-camel uppercase">
              Explore
            </p>
            <ul className="space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-ivory/80 transition hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[0.7rem] tracking-[0.24em] text-camel uppercase">
              Connect
            </p>
            <ul className="space-y-3 text-sm text-ivory/80">
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
                  {siteConfig.social.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-10 border-0 border-t border-chocolate/60" />

        <div className="flex flex-col gap-3 text-xs tracking-wide text-soft-gray sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.brand.name}. All rights reserved.
          </p>
          <p className="font-serif text-sm italic text-sand/70">
            Made with care and good light
          </p>
        </div>
      </div>
    </footer>
  )
}

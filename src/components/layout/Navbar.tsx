import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { getWhatsAppLink, siteConfig } from '../../config/site'
import { mainNavLinks, mobileNavLinks } from '../../data/navigationData'
import { useScrolled } from '../../hooks/useScrolled'
import { useScrollLock } from '../../hooks/useScrollLock'
import { Button } from '../common/Button'
import { Logo } from '../common/Logo'

export function Navbar() {
  const scrolled = useScrolled(50)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const transparent = isHome && !scrolled && !open

  useScrollLock(open)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const linkTone = (isActive: boolean) =>
    transparent
      ? isActive
        ? 'text-ivory'
        : 'text-ivory/75 hover:text-ivory'
      : isActive
        ? 'text-deep-brown'
        : 'text-soft-gray hover:text-deep-brown'

  const mobileMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-deep-brown/35 backdrop-blur-[2px]"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-ivory shadow-[-12px_0_40px_rgba(48,37,31,0.12)] sm:w-[24rem]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:h-20 sm:px-6">
                <Logo variant="light" />
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center text-deep-brown"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex w-5 flex-col gap-1.5">
                    <span className="h-px w-full translate-y-[7px] rotate-45 bg-current" />
                    <span className="h-px w-full opacity-0 bg-current" />
                    <span className="h-px w-full -translate-y-[7px] -rotate-45 bg-current" />
                  </div>
                </button>
              </div>

              <nav
                className="flex flex-1 flex-col overflow-y-auto px-6 pb-4 pt-2 sm:px-8"
                aria-label="Mobile"
              >
                <ul className="flex flex-col">
                  {mobileNavLinks.map((link, i) => (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.28 }}
                    >
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `flex items-center justify-between border-b border-sand/70 py-3.5 text-[0.95rem] tracking-[0.04em] transition-colors ${
                            isActive
                              ? 'text-deep-brown'
                              : 'text-chocolate hover:text-deep-brown'
                          }`
                        }
                        onClick={() => setOpen(false)}
                      >
                        {({ isActive }) => (
                          <>
                            <span className={isActive ? 'font-medium' : undefined}>
                              {link.label}
                            </span>
                            {isActive ? (
                              <span className="h-1 w-1 rounded-full bg-desert" aria-hidden />
                            ) : null}
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto border-t border-sand/80 px-6 py-6 sm:px-8">
                <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.65rem] tracking-[0.18em] text-soft-gray uppercase">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-deep-brown"
                  >
                    Instagram
                  </a>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-deep-brown"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="transition hover:text-deep-brown"
                  >
                    Call
                  </a>
                </div>
                <div className="w-full [&_>div]:flex [&_>div]:w-full [&_a]:w-full">
                  <Button to="/booking" onClick={() => setOpen(false)}>
                    Book a Session
                  </Button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          transparent
            ? 'bg-transparent'
            : 'border-b border-sand/60 bg-ivory/95 backdrop-blur-md'
        }`}
      >
        <div className="section-pad container-wide flex h-16 items-center justify-between gap-3 sm:h-20">
          <Logo variant={transparent ? 'dark' : 'light'} />

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `whitespace-nowrap text-[0.68rem] tracking-[0.16em] uppercase transition-colors xl:text-[0.72rem] xl:tracking-[0.18em] ${linkTone(isActive)}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button to="/booking" size="sm" variant={transparent ? 'light' : 'primary'}>
              Book Now
            </Button>

            <button
              type="button"
              className={`relative z-50 flex h-11 w-11 shrink-0 items-center justify-center lg:hidden ${
                transparent ? 'text-ivory' : 'text-deep-brown'
              }`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex w-5 flex-col gap-1.5">
                <span
                  className={`h-px w-full bg-current transition ${open ? 'translate-y-[7px] rotate-45' : ''}`}
                />
                <span className={`h-px w-full bg-current transition ${open ? 'opacity-0' : ''}`} />
                <span
                  className={`h-px w-full bg-current transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  )
}

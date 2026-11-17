import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getWhatsAppLink, siteConfig } from '../../config/site'
import { mainNavLinks, mobileNavLinks } from '../../data/navigationData'
import { useScrolled } from '../../hooks/useScrolled'
import { useScrollLock } from '../../hooks/useScrollLock'
import { Magnet } from '../animations/Magnet'
import { Button } from '../common/Button'
import { Logo } from '../common/Logo'

const ease = [0.22, 1, 0.36, 1] as const

export function Navbar() {
  const scrolled = useScrolled(28)
  const [open, setOpen] = useState(false)
  const [mounted] = useState(() => typeof document !== 'undefined')
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === ''
  const transparent = isHome && !scrolled && !open
  const reduced = useReducedMotion()

  useScrollLock(open)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const desktopTone = (isActive: boolean) =>
    transparent
      ? isActive
        ? 'text-deep-brown'
        : 'text-ivory/80 hover:text-ivory'
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
            transition={{ duration: 0.3 }}
          >
            {/* Atmosphere layers — StaggeredMenu vibe, photography palette */}
            <motion.div
              className="absolute inset-0 bg-camel"
              initial={reduced ? false : { y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.45, ease }}
            />
            <motion.div
              className="absolute inset-0 bg-chocolate"
              initial={reduced ? false : { y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
            />

            <motion.div
              className="absolute inset-0 flex flex-col overflow-hidden bg-deep-brown text-ivory"
              initial={reduced ? false : { y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.55, delay: 0.08, ease }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_-10%,rgb(184_160_120/0.22),transparent_55%)]" />
              <div className="pointer-events-none absolute -right-8 bottom-24 select-none font-serif text-[clamp(6rem,28vw,14rem)] leading-none text-ivory/[0.04]">
                Shaan
              </div>

              {/* Floating glass top bar — matches site navbar */}
              <div className="relative z-[1] px-3 pt-3 sm:px-4 sm:pt-4">
                <div className="flex h-14 items-center justify-between rounded-full border border-ivory/15 bg-ivory/5 px-3 shadow-[0_12px_40px_rgb(0_0_0/0.25)] backdrop-blur-xl sm:h-16 sm:px-4">
                  <Logo
                    variant="dark"
                    className="[&_img]:h-8 sm:[&_img]:h-9"
                  />
                  <button
                    type="button"
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition hover:bg-ivory/10"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute h-px w-3.5 rotate-45 bg-current" />
                    <span className="absolute h-px w-3.5 -rotate-45 bg-current" />
                  </button>
                </div>
              </div>

              <nav
                className="relative z-[1] flex flex-1 flex-col justify-center px-6 py-6 sm:px-10"
                aria-label="Mobile"
              >
                <ul className="mx-auto flex w-full max-w-md flex-col">
                  {mobileNavLinks.map((link, i) => (
                    <motion.li
                      key={link.path}
                      className="overflow-hidden"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.28 + i * 0.045, duration: 0.35 }}
                    >
                      <NavLink
                        to={link.path}
                        end={link.path === '/'}
                        onClick={() => setOpen(false)}
                        className="group relative block"
                      >
                        {({ isActive }) => (
                          <motion.span
                            className="relative flex items-center justify-between gap-4 border-b border-ivory/10 py-3.5 sm:py-4"
                            initial={
                              reduced
                                ? false
                                : { y: '110%', rotate: 6 }
                            }
                            animate={{ y: 0, rotate: 0 }}
                            transition={{
                              delay: 0.3 + i * 0.05,
                              duration: 0.75,
                              ease,
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span
                              className={`font-serif text-[clamp(1.9rem,8vw,2.85rem)] leading-[0.95] tracking-[-0.03em] transition-colors duration-300 ${
                                isActive
                                  ? 'text-camel'
                                  : 'text-ivory group-hover:text-camel'
                              }`}
                            >
                              {link.label}
                            </span>
                            <span
                              aria-hidden
                              className={`text-lg transition-all duration-300 ${
                                isActive
                                  ? 'translate-x-0 text-camel opacity-100'
                                  : 'translate-x-[-6px] text-sand/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                              }`}
                            >
                              →
                            </span>
                            <span
                              aria-hidden
                              className={`absolute bottom-0 left-0 h-px origin-left bg-camel transition-transform duration-500 ease-out ${
                                isActive
                                  ? 'w-full scale-x-100'
                                  : 'w-full scale-x-0 group-hover:scale-x-100'
                              }`}
                            />
                          </motion.span>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="relative z-[1] px-3 pb-3 sm:px-4 sm:pb-4"
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease }}
              >
                <div className="rounded-2xl border border-ivory/12 bg-ivory/5 px-5 py-5 backdrop-blur-xl sm:px-6">
                  <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] tracking-[0.18em] text-sand/70 uppercase">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-ivory"
                    >
                      Instagram
                    </a>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-ivory"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="transition hover:text-ivory"
                    >
                      Call
                    </a>
                  </div>
                  <div className="w-full [&_>div]:flex [&_>div]:w-full [&_a]:w-full">
                    <Button to="/booking" variant="light" onClick={() => setOpen(false)}>
                      Book a Session
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:px-5">
        <div
          className={`pointer-events-auto mx-auto flex h-14 max-w-[90rem] items-center justify-between gap-3 rounded-full px-3 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 sm:h-16 sm:px-4 md:px-5 ${
            transparent
              ? 'border border-ivory/15 bg-deep-brown/25 shadow-[0_12px_40px_rgb(18_17_15/0.18)] backdrop-blur-xl'
              : 'border border-sand/60 bg-ivory/80 shadow-[0_14px_40px_rgb(18_17_15/0.08)] backdrop-blur-2xl'
          } ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <Logo
            variant={transparent ? 'dark' : 'light'}
            className="[&_img]:h-8 sm:[&_img]:h-9 md:[&_img]:h-10"
          />

          <nav
            className="relative hidden items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative z-[1] whitespace-nowrap rounded-full px-3.5 py-2 text-[0.64rem] tracking-[0.16em] uppercase transition-colors xl:px-4 xl:text-[0.68rem] xl:tracking-[0.18em] ${desktopTone(isActive)}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-gooey-pill"
                        className={`absolute inset-0 -z-10 rounded-full shadow-[0_6px_18px_rgb(18_17_15/0.12)] ${
                          transparent ? 'bg-ivory' : 'bg-sand/75'
                        }`}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    <motion.span
                      className="relative z-[1] inline-block"
                      whileHover={reduced ? undefined : { y: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                    >
                      {link.label}
                    </motion.span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <Magnet
              padding={40}
              magnetStrength={3.2}
              maxOffset={8}
              wrapperClassName="hidden sm:inline-flex"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/booking"
                  className={`group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full px-5 text-[0.68rem] tracking-[0.16em] uppercase transition-colors duration-300 xl:h-11 xl:px-6 ${
                    transparent
                      ? 'bg-ivory text-deep-brown shadow-[0_10px_28px_rgb(18_17_15/0.28)] hover:bg-warm-white'
                      : 'bg-deep-brown text-ivory shadow-[0_10px_24px_rgb(18_17_15/0.16)] hover:bg-chocolate'
                  }`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative z-[1]">Book Now</span>
                  <span
                    aria-hidden
                    className="relative z-[1] inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            </Magnet>

            <button
              type="button"
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden ${
                transparent
                  ? 'border-ivory/25 text-ivory hover:bg-ivory/10'
                  : 'border-sand text-deep-brown hover:bg-sand/30'
              }`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex w-4 flex-col gap-[5px]" aria-hidden>
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3 self-end bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  )
}

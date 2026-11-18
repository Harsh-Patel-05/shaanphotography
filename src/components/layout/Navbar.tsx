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

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

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
            className="fixed inset-0 z-[90] lg:hidden"
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingLeft: 'env(safe-area-inset-left)',
              paddingRight: 'env(safe-area-inset-right)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Atmosphere layers */}
            <motion.div
              className="absolute inset-0 bg-camel"
              initial={reduced ? false : { y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease }}
            />
            <motion.div
              className="absolute inset-0 bg-chocolate"
              initial={reduced ? false : { y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.45, delay: 0.04, ease }}
            />

            <motion.div
              className="absolute inset-0 flex h-[100dvh] max-h-[100dvh] flex-col bg-deep-brown text-ivory"
              initial={reduced ? false : { y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, delay: 0.06, ease }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_-10%,rgb(184_160_120/0.22),transparent_55%)]" />
              <div className="pointer-events-none absolute -right-8 bottom-[18%] select-none font-serif text-[clamp(5rem,24vw,12rem)] leading-none text-ivory/[0.04]">
                Shaan
              </div>

              {/* Sticky top bar */}
              <div className="relative z-[2] shrink-0 px-3 pt-3 sm:px-4 sm:pt-4">
                <div className="flex h-12 items-center justify-between rounded-full border border-ivory/15 bg-ivory/5 px-3 shadow-[0_12px_40px_rgb(0_0_0/0.25)] backdrop-blur-xl sm:h-14 sm:px-4">
                  <Logo
                    variant="dark"
                    className="[&_img]:h-7 sm:[&_img]:h-8"
                  />
                  <button
                    type="button"
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-ivory transition hover:bg-ivory/10 active:scale-95"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute h-px w-3.5 rotate-45 bg-current" />
                    <span className="absolute h-px w-3.5 -rotate-45 bg-current" />
                  </button>
                </div>
              </div>

              {/* Scrollable links — fits short phones */}
              <nav
                className="relative z-[1] min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-8 sm:py-5 [-webkit-overflow-scrolling:touch]"
                aria-label="Mobile"
              >
                <ul className="mx-auto flex w-full max-w-lg flex-col">
                  {mobileNavLinks.map((link, i) => (
                    <motion.li
                      key={link.path}
                      className="overflow-hidden"
                      initial={reduced ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.18 + i * 0.035,
                        duration: 0.45,
                        ease,
                      }}
                    >
                      <NavLink
                        to={link.path}
                        end={link.path === '/'}
                        onClick={() => setOpen(false)}
                        className="group relative block touch-manipulation"
                      >
                        {({ isActive }) => (
                          <span className="relative flex min-h-11 items-center justify-between gap-3 border-b border-ivory/10 py-2.5 sm:min-h-12 sm:py-3.5">
                            <span
                              className={`font-serif text-[clamp(1.45rem,6.2vw,2.35rem)] leading-[1.05] tracking-[-0.03em] transition-colors duration-300 ${
                                isActive
                                  ? 'text-camel'
                                  : 'text-ivory group-hover:text-camel'
                              }`}
                            >
                              {link.label}
                            </span>
                            <span
                              aria-hidden
                              className={`shrink-0 text-base transition-all duration-300 sm:text-lg ${
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
                          </span>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Sticky bottom CTA */}
              <motion.div
                className="relative z-[2] shrink-0 px-3 pb-3 sm:px-4 sm:pb-4"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.45, ease }}
              >
                <div className="rounded-2xl border border-ivory/12 bg-ivory/5 px-4 py-4 backdrop-blur-xl sm:px-5 sm:py-5">
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.62rem] tracking-[0.16em] text-sand/70 uppercase sm:mb-4 sm:gap-x-5 sm:text-[0.68rem] sm:tracking-[0.18em]">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="touch-manipulation transition hover:text-ivory"
                    >
                      Instagram
                    </a>
                    <a
                      href={siteConfig.social.threads}
                      target="_blank"
                      rel="noreferrer"
                      className="touch-manipulation transition hover:text-ivory"
                    >
                      Threads
                    </a>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="touch-manipulation transition hover:text-ivory"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="touch-manipulation transition hover:text-ivory"
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
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:px-5"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <div
          className={`pointer-events-auto mx-auto flex h-12 max-w-[90rem] items-center justify-between gap-2 rounded-full px-2.5 transition-[background-color,box-shadow,border-color,backdrop-filter,opacity] duration-500 sm:h-14 sm:gap-3 sm:px-4 md:h-16 md:px-5 ${
            transparent
              ? 'border border-ivory/15 bg-deep-brown/25 shadow-[0_12px_40px_rgb(18_17_15/0.18)] backdrop-blur-xl'
              : 'border border-sand/60 bg-ivory/80 shadow-[0_14px_40px_rgb(18_17_15/0.08)] backdrop-blur-2xl'
          } ${open ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
          <Logo
            variant={transparent ? 'dark' : 'light'}
            className="min-w-0 shrink [&_img]:h-7 sm:[&_img]:h-8 md:[&_img]:h-10"
          />

          <nav
            className="relative hidden min-w-0 items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative z-[1] whitespace-nowrap rounded-full px-2.5 py-2 text-[0.6rem] tracking-[0.14em] uppercase transition-colors xl:px-3.5 xl:text-[0.68rem] xl:tracking-[0.18em] 2xl:px-4 ${desktopTone(isActive)}`
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

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <Magnet
              padding={40}
              magnetStrength={3.2}
              maxOffset={8}
              wrapperClassName="hidden sm:inline-flex"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/booking"
                  className={`group relative inline-flex h-9 items-center gap-2 overflow-hidden rounded-full px-4 text-[0.64rem] tracking-[0.14em] uppercase transition-colors duration-300 sm:h-10 sm:px-5 sm:text-[0.68rem] sm:tracking-[0.16em] xl:h-11 xl:px-6 ${
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
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition touch-manipulation active:scale-95 lg:hidden ${
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

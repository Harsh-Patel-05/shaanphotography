import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduced ? undefined : { y: -3 }}
          whileTap={reduced ? undefined : { scale: 0.96 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group fixed right-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-deep-brown text-ivory shadow-[0_12px_32px_rgb(42_31_26/0.22)] transition-[background-color,box-shadow] duration-300 hover:bg-chocolate hover:shadow-[0_16px_36px_rgb(42_31_26/0.28)] sm:right-6 sm:bottom-6 sm:h-12 sm:w-12 md:right-8 md:bottom-8"
          aria-label="Back to top"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-camel/30 ring-inset"
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <path
              d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}

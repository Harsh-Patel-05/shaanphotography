import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import type { GalleryImage } from '../../data/galleryData'
import { useScrollLock } from '../../hooks/useScrollLock'

type Props = {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const open = index !== null
  const image = index !== null ? images[index] : null
  const touchStartX = useRef<number | null>(null)

  useScrollLock(open)

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [open, onClose, onPrev, onNext],
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <AnimatePresence>
      {open && image ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-deep-brown/95 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          onClick={onClose}
        >
          <button
            type="button"
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center text-ivory/80 transition hover:text-ivory sm:top-6 sm:right-6"
            aria-label="Close lightbox"
            onClick={onClose}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <button
            type="button"
            className="absolute top-1/2 left-1 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory/80 transition hover:text-ivory sm:left-2 sm:h-12 sm:w-12 md:left-6"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <button
            type="button"
            className="absolute top-1/2 right-1 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory/80 transition hover:text-ivory sm:right-2 sm:h-12 sm:w-12 md:right-6"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <motion.div
            key={image.id}
            className="relative max-h-[85dvh] w-full max-w-5xl px-10 sm:px-14"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0]?.clientX ?? null
            }}
            onTouchEnd={(e) => {
              const start = touchStartX.current
              const end = e.changedTouches[0]?.clientX
              if (start == null || end == null) return
              const delta = end - start
              if (Math.abs(delta) < 50) return
              if (delta > 0) onPrev()
              else onNext()
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[78vh] w-auto max-w-full object-contain"
            />
            <div className="mt-4 flex flex-col gap-1 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                {image.title ? (
                  <p className="font-serif text-xl text-ivory">{image.title}</p>
                ) : null}
                <p className="text-xs tracking-[0.16em] text-sand/80 uppercase">
                  {image.category}
                  {image.location ? ` · ${image.location}` : ''}
                </p>
              </div>
              <p className="text-xs text-soft-gray">
                {(index ?? 0) + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

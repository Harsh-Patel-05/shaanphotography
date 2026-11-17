import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import type { GalleryImage } from '../../data/galleryData'
import { Button } from '../common/Button'
import { Lightbox } from './Lightbox'

type Props = {
  images: GalleryImage[]
  className?: string
  /** When set, gallery loads in pages instead of dumping every frame at once. */
  pageSize?: number
}

export function MasonryGrid({ images, className = '', pageSize }: Props) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(() => pageSize ?? images.length)

  const uniqueImages = useMemo(() => {
    const seen = new Set<string>()
    return images.filter((image) => {
      if (seen.has(image.id) || seen.has(image.src)) return false
      seen.add(image.id)
      seen.add(image.src)
      return true
    })
  }, [images])

  useEffect(() => {
    setVisibleCount(pageSize ?? uniqueImages.length)
    setIndex(null)
  }, [uniqueImages, pageSize])

  const items = useMemo(
    () => uniqueImages.slice(0, visibleCount),
    [uniqueImages, visibleCount],
  )
  const hasMore = pageSize != null && visibleCount < uniqueImages.length

  const onPrev = () => {
    if (index === null || uniqueImages.length === 0) return
    setIndex((index - 1 + uniqueImages.length) % uniqueImages.length)
  }

  const onNext = () => {
    if (index === null || uniqueImages.length === 0) return
    setIndex((index + 1) % uniqueImages.length)
  }

  return (
    <>
      <div
        className={`columns-1 gap-x-4 sm:columns-2 sm:gap-x-5 lg:columns-3 lg:gap-x-6 ${className}`}
      >
        <AnimatePresence mode="popLayout">
          {items.map((image, i) => {
            const fullIndex = uniqueImages.findIndex((img) => img.id === image.id)
            return (
              <motion.button
                key={image.id}
                type="button"
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 28, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.55,
                  delay: Math.min((i % (pageSize ?? 12)) * 0.045, 0.4),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group film-frame relative mb-4 w-full break-inside-avoid overflow-hidden bg-sand/25 text-left sm:mb-5 lg:mb-6"
                onClick={() => setIndex(fullIndex >= 0 ? fullIndex : i)}
                aria-label={`View ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={i < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="block h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Hover veil */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-brown/75 via-deep-brown/15 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Corner index */}
                <span className="pointer-events-none absolute top-3 left-3 text-[0.62rem] tracking-[0.2em] text-ivory/0 uppercase transition duration-500 group-hover:text-ivory/70">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Caption + open cue */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 translate-y-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                  <div className="min-w-0">
                    <p className="truncate font-serif text-base text-ivory sm:text-lg">
                      {image.title ?? image.category}
                    </p>
                    <p className="mt-0.5 text-[0.6rem] tracking-[0.18em] text-sand/90 uppercase">
                      {image.category}
                      {image.location ? ` · ${image.location}` : ''}
                    </p>
                  </div>
                  <span className="hidden shrink-0 border border-ivory/35 px-2.5 py-1 text-[0.58rem] tracking-[0.16em] text-ivory/90 uppercase sm:inline-flex">
                    View
                  </span>
                </div>

                {/* Mobile: always-readable thin caption bar */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-brown/70 to-transparent p-3 sm:hidden">
                  <p className="truncate font-serif text-sm text-ivory">
                    {image.title ?? image.category}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {hasMore ? (
        <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
          <p className="text-[0.65rem] tracking-[0.18em] text-soft-gray uppercase">
            Showing {items.length} of {uniqueImages.length}
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setVisibleCount((n) =>
                Math.min(n + (pageSize ?? 12), uniqueImages.length),
              )
            }
          >
            Load more
          </Button>
        </div>
      ) : null}

      <Lightbox
        images={uniqueImages}
        index={index}
        onClose={() => setIndex(null)}
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  )
}

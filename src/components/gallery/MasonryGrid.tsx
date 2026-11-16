import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import type { GalleryImage } from '../../data/galleryData'
import { Lightbox } from './Lightbox'

type Props = {
  images: GalleryImage[]
  className?: string
}

export function MasonryGrid({ images, className = '' }: Props) {
  const [index, setIndex] = useState<number | null>(null)

  const onPrev = () => {
    if (index === null || images.length === 0) return
    setIndex((index - 1 + images.length) % images.length)
  }

  const onNext = () => {
    if (index === null || images.length === 0) return
    setIndex((index + 1) % images.length)
  }

  const items = useMemo(() => images, [images])

  return (
    <>
      <div
        className={`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 ${className}`}
      >
        <AnimatePresence mode="popLayout">
          {items.map((image, i) => (
            <motion.button
              key={image.id}
              type="button"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.3) }}
              className={`group relative overflow-hidden bg-sand/30 text-left ${
                image.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
              }`}
              onClick={() => setIndex(i)}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-brown/60 via-transparent to-transparent opacity-100 transition duration-500 sm:opacity-0 sm:group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:translate-y-2 sm:p-4 sm:opacity-0 sm:transition sm:duration-500 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                <p className="font-serif text-base text-ivory sm:text-lg">
                  {image.title ?? image.category}
                </p>
                <p className="text-[0.62rem] tracking-[0.18em] text-sand uppercase">
                  {image.category}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox
        images={items}
        index={index}
        onClose={() => setIndex(null)}
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  )
}

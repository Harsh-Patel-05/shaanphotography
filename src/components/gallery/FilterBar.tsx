import { motion } from 'framer-motion'
import type { GalleryCategory } from '../../data/galleryData'

type Props = {
  categories: Array<'All' | GalleryCategory>
  active: 'All' | GalleryCategory
  onChange: (category: 'All' | GalleryCategory) => void
}

export function FilterBar({ categories, active, onChange }: Props) {
  return (
    <div
      className="flex flex-nowrap justify-start gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-2 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Portfolio categories"
    >
      {categories.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`relative shrink-0 px-3.5 py-2 text-[0.65rem] tracking-[0.14em] whitespace-nowrap uppercase transition-colors sm:px-5 sm:text-[0.68rem] sm:tracking-[0.16em] ${
              isActive ? 'text-deep-brown' : 'text-soft-gray hover:text-chocolate'
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 border border-camel bg-sand/40"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10">{category}</span>
          </button>
        )
      })}
    </div>
  )
}

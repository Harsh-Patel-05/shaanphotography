import { useMemo, useState } from 'react'
import { PageTransition } from '../../components/animations/PageTransition'
import { SEO } from '../../components/common/SEO'
import { SectionHeading } from '../../components/common/SectionHeading'
import { FilterBar } from '../../components/gallery/FilterBar'
import { MasonryGrid } from '../../components/gallery/MasonryGrid'
import {
  getImagesByCategory,
  portfolioCategories,
  type GalleryCategory,
} from '../../data/galleryData'

export function PortfolioPage() {
  const [active, setActive] = useState<'All' | GalleryCategory>('All')
  const images = useMemo(() => getImagesByCategory(active), [active])

  return (
    <PageTransition>
      <SEO
        title="Portfolio"
        description="Browse Shaan Photography — weddings, pre-wedding, portraits, events, and couple sessions."
        path="/portfolio"
      />

      <section className="section-pad container-wide pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-36">
        <SectionHeading
          eyebrow="Portfolio"
          title="The work"
          description="Filter by category, then tap any photo to open it full screen."
        />
        <div className="mt-8 overflow-x-auto pb-1 sm:mt-10">
          <FilterBar categories={portfolioCategories} active={active} onChange={setActive} />
        </div>
      </section>

      <section className="section-pad container-wide pb-16 sm:pb-20 md:pb-28">
        <p className="mb-5 text-center text-xs tracking-[0.16em] text-soft-gray uppercase sm:mb-6">
          {images.length} {images.length === 1 ? 'photograph' : 'photographs'}
        </p>
        <MasonryGrid images={images} />
      </section>
    </PageTransition>
  )
}

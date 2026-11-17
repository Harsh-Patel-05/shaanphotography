import { getMapsEmbedUrl, getMapsSearchUrl, siteConfig } from '../../config/site'

type Props = {
  className?: string
  title?: string
  /** Hide the bottom address bar when parent already shows address. */
  showBar?: boolean
}

/** Google Maps embed — fixed iframe height so no empty gap under the map. */
export function MapEmbed({
  className = '',
  title = `${siteConfig.brand.name} location`,
  showBar = true,
}: Props) {
  return (
    <div className={`flex flex-col overflow-hidden bg-sand/30 ${className}`}>
      <iframe
        title={title}
        src={getMapsEmbedUrl()}
        className="block w-full flex-1 border-0 grayscale-[15%] contrast-[1.04] min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      {showBar ? (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-sand/70 bg-warm-white/90 px-4 py-3">
          <p className="truncate text-xs text-soft-gray">
            {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
          </p>
          <a
            href={getMapsSearchUrl()}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-[0.65rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
          >
            Open in Maps →
          </a>
        </div>
      ) : null}
    </div>
  )
}

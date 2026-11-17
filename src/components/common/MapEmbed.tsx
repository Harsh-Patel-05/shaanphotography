import { getMapsEmbedUrl, getMapsSearchUrl, siteConfig } from '../../config/site'

type Props = {
  className?: string
  title?: string
}

/** Google Maps embed — no API key needed. */
export function MapEmbed({
  className = '',
  title = `${siteConfig.brand.name} location`,
}: Props) {
  return (
    <div className={`overflow-hidden bg-sand/40 ${className}`}>
      <iframe
        title={title}
        src={getMapsEmbedUrl()}
        className="h-full min-h-[280px] w-full border-0 grayscale-[20%] contrast-[1.05]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="flex items-center justify-between gap-3 border-t border-sand/70 bg-warm-white/80 px-4 py-3">
        <p className="text-xs text-soft-gray">{siteConfig.contact.mapQuery}</p>
        <a
          href={getMapsSearchUrl()}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-[0.65rem] tracking-[0.16em] text-chocolate uppercase transition hover:text-deep-brown"
        >
          Open in Maps →
        </a>
      </div>
    </div>
  )
}

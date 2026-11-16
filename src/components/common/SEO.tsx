import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../../config/site'

type Props = {
  title?: string
  description?: string
  path?: string
  image?: string
}

export function SEO({
  title,
  description = siteConfig.brand.description,
  path = '/',
  image,
}: Props) {
  const fullTitle = title
    ? `${title} · ${siteConfig.brand.name}`
    : `${siteConfig.brand.name} · ${siteConfig.brand.tagline}`
  const url = `${siteConfig.urls.site}${path}`
  const ogImage = image ?? `${siteConfig.urls.site}/og-default.jpg`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}

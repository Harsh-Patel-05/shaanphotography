export const siteConfig = {
  brand: {
    name: 'Shaan Photography',
    shortName: 'Shaan',
    tagline: 'Photographs that still feel like you.',
    description:
      'Kalol-based wedding and portrait photographer. I keep the small, true moments — the ones you’ll want to look at again years later.',
  },
  contact: {
    email: 'Shaandigitalstudio@gmail.com',
    phone: '+91 96012 73841',
    phoneRaw: '919601273841',
    whatsapp: '919601273841',
    location: 'Kalol, Gujarat',
    address: {
      line1: 'F/7, Municipal shopping',
      line2: 'Near Tower police chowki, Tower chowk',
      city: 'Kalol',
      state: 'Gujarat',
      postal: '382721',
      country: 'India',
    },
    /** Used for Google Maps “Open in Maps” link */
    mapQuery: 'Shaan photography, Tower chowk, Kalol, Gujarat 382721',
    /** Exact Google Maps embed iframe src */
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.9212765702646!2d72.49516867601237!3d23.24595160795437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c25e4b34b552b%3A0xe487dc35919281a9!2sShaan%20photography!5e0!3m2!1sen!2sin!4v1794909614288!5m2!1sen!2sin',
  },
  social: {
    instagram: 'https://instagram.com/shaan_photography_',
    instagramHandle: '@shaan_photography_',
    threads: 'https://www.threads.net/@shaan_photography_',
    threadsHandle: '@shaan_photography_',
  },
  urls: {
    site: 'https://Harsh-Patel-05.github.io/shaanphotography',
  },
} as const

export const getWhatsAppLink = (message?: string) => {
  const text = encodeURIComponent(
    message ?? 'Hi Shaan, I’d like to ask about a photography session.',
  )
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`
}

export const getMailtoLink = (subject?: string) => {
  const sub = encodeURIComponent(subject ?? 'Photography inquiry')
  return `mailto:${siteConfig.contact.email}?subject=${sub}`
}

export const getFullAddress = () => {
  const a = siteConfig.contact.address
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.state} ${a.postal}, ${a.country}`
}

export const getMapsSearchUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.mapQuery)}`

export const getMapsEmbedUrl = () => siteConfig.contact.mapEmbedUrl

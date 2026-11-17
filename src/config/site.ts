export const siteConfig = {
  brand: {
    name: 'Shaan Photography',
    shortName: 'Shaan',
    tagline: 'Photographs that still feel like you.',
    description:
      'Ahmedabad-based wedding and portrait photographer. I keep the small, true moments — the ones you’ll want to look at again years later.',
  },
  contact: {
    email: 'hello@shaanphotography.com',
    phone: '+91 98765 43210',
    phoneRaw: '919876543210',
    whatsapp: '919876543210',
    location: 'Ahmedabad, India',
    address: {
      line1: 'Shaan Photography Studio',
      line2: 'Near CG Road, Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      postal: '380009',
      country: 'India',
    },
    /** Used for Google Maps embed + “Open in Maps” link */
    mapQuery: 'Navrangpura, Ahmedabad, Gujarat, India',
  },
  social: {
    instagram: 'https://instagram.com/shaanphotography',
    instagramHandle: '@shaanphotography',
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

export const getMapsEmbedUrl = () =>
  `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapQuery)}&z=14&output=embed`

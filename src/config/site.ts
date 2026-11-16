export const siteConfig = {
  brand: {
    name: 'Shaan Photography',
    shortName: 'Shaan',
    tagline: 'Real moments. Real stories.',
    description:
      'Wedding, pre-wedding, portrait, event, and couple photography — honest frames, soft light, and stories that feel like you.',
  },
  contact: {
    email: 'hello@shaanphotography.com',
    phone: '+91 98765 43210',
    phoneRaw: '919876543210',
    whatsapp: '919876543210',
    location: 'India',
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
    message ??
      'Hi Shaan, I’d like to ask about a photography session.',
  )
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`
}

export const getMailtoLink = (subject?: string) => {
  const sub = encodeURIComponent(subject ?? 'Photography inquiry')
  return `mailto:${siteConfig.contact.email}?subject=${sub}`
}

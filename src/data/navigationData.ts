export type NavLink = {
  label: string
  path: string
}

/** Desktop navbar — keep it slim */
export const mainNavLinks: NavLink[] = [
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Wedding', path: '/wedding' },
  { label: 'Pre-Wedding', path: '/pre-wedding' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
]

/** Full mobile menu — same as a complete site nav */
export const mobileNavLinks: NavLink[] = [
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Wedding', path: '/wedding' },
  { label: 'Pre-Wedding', path: '/pre-wedding' },
  { label: 'Portrait', path: '/portrait' },
  { label: 'Events', path: '/events' },
  { label: 'Couple', path: '/couple' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
]

export const footerNavLinks: NavLink[] = [
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Wedding', path: '/wedding' },
  { label: 'Pre-Wedding', path: '/pre-wedding' },
  { label: 'Portrait', path: '/portrait' },
  { label: 'Events', path: '/events' },
  { label: 'Couple', path: '/couple' },
  { label: 'Services', path: '/services' },
  { label: 'Booking', path: '/booking' },
  { label: 'Contact', path: '/contact' },
]

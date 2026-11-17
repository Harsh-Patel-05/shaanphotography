import { getMailtoLink, getWhatsAppLink, siteConfig } from '../../config/site'

type Props = {
  /** `light` = ivory icons on dark bg; `dark` = chocolate icons on light bg */
  tone?: 'light' | 'dark'
  className?: string
  size?: 'sm' | 'md'
}

const iconSize = { sm: 18, md: 20 } as const

function InstagramIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function WhatsAppIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.5-1.2A8.5 8.5 0 1 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 9.4c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.1-.1.3 0 .4.4.7 1.1 1.4 1.9 1.8.2.1.3.1.5 0l.6-.4c.2-.1.4-.1.5 0l1.5.8c.3.2.4.3.3.6-.2.7-1.1 1.2-1.8 1.1-.9-.1-2.5-.6-4.1-2.1-1.4-1.4-2.1-2.9-2.3-3.9-.1-.6.3-1.5.9-1.7Z"
        fill="currentColor"
      />
    </svg>
  )
}

function MailIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5h2.2l1 3.2-1.4 1.4a12.5 12.5 0 0 0 4.6 4.6l1.4-1.4 3.2 1v2.2c0 .8-.7 1.5-1.5 1.5A13.5 13.5 0 0 1 5 7c0-.8.7-1.5 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SocialIcons({ tone = 'light', className = '', size = 'md' }: Props) {
  const px = iconSize[size]
  const chip =
    tone === 'light'
      ? 'border-ivory/20 text-ivory/80 hover:border-camel hover:text-ivory hover:bg-ivory/5'
      : 'border-sand text-chocolate hover:border-camel hover:text-deep-brown hover:bg-sand/30'

  const items = [
    {
      label: 'Instagram',
      href: siteConfig.social.instagram,
      external: true,
      icon: <InstagramIcon size={px} />,
    },
    {
      label: 'WhatsApp',
      href: getWhatsAppLink(),
      external: true,
      icon: <WhatsAppIcon size={px} />,
    },
    {
      label: 'Email',
      href: getMailtoLink(),
      external: false,
      icon: <MailIcon size={px} />,
    },
    {
      label: 'Call',
      href: `tel:${siteConfig.contact.phoneRaw}`,
      external: false,
      icon: <PhoneIcon size={px} />,
    },
  ] as const

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noreferrer' : undefined}
          aria-label={item.label}
          title={item.label}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition duration-300 ${chip}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  )
}

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

function ThreadsIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.98 13.98 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L8.554 7.287C9.534 5.833 11.122 5.031 13.032 5.031h.044c3.194.02 5.097 1.975 5.287 5.388.107.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65zm1.003-11.69c-.246 0-.493.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
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
      label: 'Threads',
      href: siteConfig.social.threads,
      external: true,
      icon: <ThreadsIcon size={px} />,
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

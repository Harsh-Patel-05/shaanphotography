import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoDark from '../../assets/logos/shaan-logo-dark.png'
import logoWhite from '../../assets/logos/shaan-logo-white.png'
import { siteConfig } from '../../config/site'

type Props = {
  /** `light` = dark brown mark on ivory; `dark` = white mark on dark/hero */
  variant?: 'light' | 'dark'
  className?: string
  to?: string
}

export function Logo({ variant = 'light', className = '', to = '/' }: Props) {
  const src = variant === 'dark' ? logoWhite : logoDark

  return (
    <Link
      to={to}
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label={`${siteConfig.brand.name} home`}
    >
      <motion.img
        src={src}
        alt={siteConfig.brand.name}
        className="h-10 w-auto object-contain sm:h-11 md:h-12"
        width={240}
        height={96}
        decoding="async"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      />
    </Link>
  )
}

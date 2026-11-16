import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never
    href?: never
  }

type ButtonAsLink = CommonProps & {
  to: string
  href?: never
  onClick?: () => void
}

type ButtonAsAnchor = CommonProps & {
  href: string
  to?: never
  target?: string
  rel?: string
  onClick?: () => void
}

type Props = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const base =
  'inline-flex items-center justify-center gap-2 font-sans tracking-[0.08em] uppercase transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-chocolate text-ivory hover:bg-deep-brown border border-chocolate',
  secondary:
    'bg-transparent text-chocolate border border-camel hover:bg-sand/50',
  ghost: 'bg-transparent text-chocolate border border-transparent hover:border-sand',
  light:
    'bg-ivory/95 text-deep-brown border border-ivory hover:bg-warm-white',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[0.7rem]',
  md: 'px-7 py-3.5 text-[0.75rem]',
  lg: 'px-9 py-4 text-[0.8rem]',
}

export function Button(props: Props) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
  } = props
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if ('to' in props && props.to) {
    return (
      <motion.div className="inline-flex" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
        <Link to={props.to} className={classes} onClick={props.onClick}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if ('href' in props && props.href) {
    return (
      <motion.div className="inline-flex" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
        <a
          href={props.href}
          className={classes}
          target={props.target}
          rel={props.rel}
          onClick={props.onClick}
        >
          {children}
        </a>
      </motion.div>
    )
  }

  const buttonProps = props as ButtonAsButton
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      type={buttonProps.type ?? 'button'}
      className={classes}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
    >
      {children}
    </motion.button>
  )
}

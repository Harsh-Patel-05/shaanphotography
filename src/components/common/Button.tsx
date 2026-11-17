import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
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
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden font-sans tracking-[0.14em] uppercase transition-[color,background-color,border-color,box-shadow] duration-300 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-deep-brown text-ivory border border-deep-brown hover:bg-chocolate hover:border-chocolate shadow-[0_10px_30px_rgb(42_31_26/0.14)]',
  secondary:
    'bg-transparent text-chocolate border border-sand hover:border-camel hover:bg-sand/35',
  ghost: 'bg-transparent text-chocolate border border-transparent hover:border-sand',
  light:
    'bg-ivory/95 text-deep-brown border border-ivory/80 hover:bg-warm-white shadow-[0_12px_30px_rgb(42_31_26/0.2)]',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[0.65rem]',
  md: 'px-7 py-3.5 text-[0.7rem]',
  lg: 'px-9 py-4 text-[0.75rem]',
}

function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
    />
  )
}

export function Button(props: Props) {
  const reduced = useReducedMotion()
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
  } = props
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const hover = reduced ? undefined : { y: -2 }
  const tap = reduced ? undefined : { scale: 0.98 }

  if ('to' in props && props.to) {
    return (
      <motion.div className="inline-flex" whileHover={hover} whileTap={tap}>
        <Link to={props.to} className={classes} onClick={props.onClick}>
          <Sheen />
          <span className="relative z-[1]">{children}</span>
        </Link>
      </motion.div>
    )
  }

  if ('href' in props && props.href) {
    return (
      <motion.div className="inline-flex" whileHover={hover} whileTap={tap}>
        <a
          href={props.href}
          className={classes}
          target={props.target}
          rel={props.rel}
          onClick={props.onClick}
        >
          <Sheen />
          <span className="relative z-[1]">{children}</span>
        </a>
      </motion.div>
    )
  }

  const buttonProps = props as ButtonAsButton
  return (
    <motion.button
      whileHover={hover}
      whileTap={tap}
      type={buttonProps.type ?? 'button'}
      className={classes}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
    >
      <Sheen />
      <span className="relative z-[1]">{children}</span>
    </motion.button>
  )
}

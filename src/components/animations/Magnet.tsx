import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  padding?: number
  magnetStrength?: number
  maxOffset?: number
  disabled?: boolean
  wrapperClassName?: string
  innerClassName?: string
}

type Point = { x: number; y: number }

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * Magnetic hover — listens only while pointer is over the element
 * (no global window listeners per instance).
 */
export function Magnet({
  children,
  padding = 72,
  magnetStrength = 3.2,
  maxOffset = 14,
  disabled = false,
  wrapperClassName = '',
  innerClassName = '',
  style,
  ...props
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const inner = innerRef.current
    if (!wrapper || !inner) return

    const reduce =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
    if (reduce || disabled || coarse) return

    const current = { x: 0, y: 0 }
    const velocity = { x: 0, y: 0 }
    let pointer: Point | null = null
    let raf = 0
    let last = 0

    const reach = (rect: DOMRect, p: Point) => {
      const dx = p.x - (rect.left + rect.width / 2)
      const dy = p.y - (rect.top + rect.height / 2)
      const outside = Math.hypot(
        Math.max(0, Math.abs(dx) - rect.width / 2),
        Math.max(0, Math.abs(dy) - rect.height / 2),
      )
      return { dx, dy, outside }
    }

    const measure = () => {
      if (!pointer) return { x: 0, y: 0, engaged: false }
      const rect = wrapper.getBoundingClientRect()
      const { dx, dy, outside } = reach(rect, pointer)
      if (outside > padding) return { x: 0, y: 0, engaged: false }
      const pull = padding > 0 ? 1 - smoothstep(padding * 0.45, padding, outside) : 1
      let x = (dx / magnetStrength) * pull
      let y = (dy / magnetStrength) * pull
      const length = Math.hypot(x, y)
      if (length > maxOffset) {
        x *= maxOffset / length
        y *= maxOffset / length
      }
      return { x, y, engaged: true }
    }

    const frame = (now: number) => {
      raf = 0
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
      last = now
      const target = measure()
      const stiffness = 170
      const damping = 18
      ;(['x', 'y'] as const).forEach((key) => {
        const force =
          stiffness * (target[key] - current[key]) - damping * velocity[key]
        velocity[key] += force * dt
        current[key] += velocity[key] * dt
      })
      inner.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`
      const resting =
        Math.abs(target.x - current.x) < 0.05 &&
        Math.abs(target.y - current.y) < 0.05 &&
        Math.abs(velocity.x) < 0.05 &&
        Math.abs(velocity.y) < 0.05
      if (!resting || target.engaged) raf = requestAnimationFrame(frame)
      else last = 0
    }

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY }
      wake()
    }
    const onEnter = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY }
      wake()
    }
    const onLeave = () => {
      pointer = null
      wake()
    }

    wrapper.addEventListener('pointerenter', onEnter)
    wrapper.addEventListener('pointermove', onMove)
    wrapper.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      wrapper.removeEventListener('pointerenter', onEnter)
      wrapper.removeEventListener('pointermove', onMove)
      wrapper.removeEventListener('pointerleave', onLeave)
      inner.style.transform = ''
    }
  }, [disabled, magnetStrength, maxOffset, padding])

  return (
    <div
      ref={wrapperRef}
      // Avoid `inline-block hidden` conflicts — wrapperClassName owns display when set.
      className={wrapperClassName || 'inline-block'}
      style={style}
      {...props}
    >
      <div ref={innerRef} className={`will-change-transform ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}

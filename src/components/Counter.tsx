import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  value: number
  suffix?: string
  duration?: number
}

export function Counter({ value, suffix = '', duration = 1.4 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const reduced = usePrefersReducedMotion()
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      setDisplay(value)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / (duration * 1000))
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(Math.round(value * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      },
      { threshold: 0.4 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [value, duration, reduced])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

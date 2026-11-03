import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  y?: number
  duration?: number
  delay?: number
  stagger?: number
}

/** Fade + translateY ao entrar na viewport (GSAP + ScrollTrigger). */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()
  const { y = 24, duration = 0.8, delay = 0, stagger } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      gsap.set(el, { clearProps: 'all', opacity: 1, y: 0 })
      return
    }

    const targets = stagger ? el.children : el

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger: stagger ?? 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced, y, duration, delay, stagger])

  return ref
}

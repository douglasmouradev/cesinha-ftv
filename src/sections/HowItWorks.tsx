import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTENT } from '../config/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || reduced) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.clearScrollMemory()

      const total = track.scrollWidth - window.innerWidth + 64

      const tween = gsap.to(track, {
        x: () => -Math.max(total, 0),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(total, 400)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [reduced])

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="relative overflow-hidden bg-sand text-ink"
    >
      <div className="container-site pt-[clamp(5rem,10vw,9rem)] pb-8 md:pb-4">
        <p className="label-quiet mb-3 text-ocean/50">Passo a passo</p>
        <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-ocean">
          Como funciona
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex w-full flex-col gap-0 px-4 pb-[clamp(5rem,10vw,9rem)] md:w-max md:flex-row md:gap-0 md:px-8 md:will-change-transform"
      >
        {CONTENT.steps.map((step) => (
          <article
            key={step.num}
            className="flex w-full shrink-0 flex-col border-t border-ocean/15 py-10 md:w-[min(72vw,520px)] md:border-t-0 md:border-l md:px-10 md:py-6"
          >
            <p className="font-display text-[clamp(5rem,14vw,9rem)] leading-none text-ocean/12">
              {step.num}
            </p>
            <h3 className="mt-2 font-display text-3xl text-ocean md:text-4xl">{step.title}</h3>
            <p className="mt-4 max-w-sm text-[1.02rem] leading-relaxed text-ink/70">
              {step.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

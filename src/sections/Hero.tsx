import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '../components/Button'
import { CONTENT } from '../config/content'
import { LINKS } from '../config/links'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = { ready: boolean }

export function Hero({ ready }: Props) {
  const rootRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!ready || reduced || !rootRef.current) return

    const lines = rootRef.current.querySelectorAll('.hero-line span')
    const rest = rootRef.current.querySelectorAll('.hero-fade')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      lines,
      { y: '110%' },
      { y: '0%', duration: 0.9, stagger: 0.12 },
    ).fromTo(
      rest,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
      '-=0.4',
    )

    return () => {
      tl.kill()
    }
  }, [ready, reduced])

  useEffect(() => {
    if (reduced || !bgRef.current) return
    const el = bgRef.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) {
      gsap.fromTo(el, { scale: 1.06 }, { scale: 1, duration: 6, ease: 'power1.out' })
      return
    }

    gsap.fromTo(el, { scale: 1.08 }, { scale: 1, duration: 8, ease: 'power1.out' })

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12
        const y = (e.clientY / window.innerHeight - 0.5) * 8
        el.style.transform = `scale(1.04) translate3d(${x}px, ${y}px, 0)`
      })
    }
    const onLeave = () => {
      el.style.transform = 'scale(1.04) translate3d(0,0,0)'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <section
      id="topo"
      ref={rootRef}
      className="relative min-h-[100svh] min-h-[100dvh] w-full overflow-hidden bg-ocean text-sand"
    >
      {/* Full-bleed — sem inset negativo (evita buracos nas bordas no mobile) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform transition-transform duration-700 ease-out"
        >
          <img
            src="/images/hero.webp"
            alt=""
            width={1440}
            height={2556}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_28%]"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-ocean/80 via-ocean/55 to-ocean/90 md:bg-gradient-to-r md:from-ocean md:via-ocean/75 md:to-ocean/30"
          aria-hidden="true"
        />
      </div>

      <div className="container-site relative z-[2] flex min-h-[100svh] min-h-[100dvh] flex-col justify-end pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+2rem)] md:justify-center md:pb-20">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="hero-fade mb-5 font-body text-[0.8rem] font-medium text-sun opacity-0 md:text-[0.85rem]">
            {CONTENT.city} · {CONTENT.arena}
          </p>

          <h1 className="font-display text-[clamp(2.85rem,11vw,6.5rem)]">
            <span className="mask-reveal hero-line">
              <span>{CONTENT.hero.line1}</span>
            </span>
            <span className="mask-reveal hero-line mt-1 block text-sun">
              <span>{CONTENT.hero.line2}</span>
            </span>
          </h1>

          <p className="hero-fade mt-5 max-w-md text-[1.02rem] leading-relaxed text-sand/80 opacity-0 md:mt-6 md:text-[1.1rem]">
            {CONTENT.hero.subtitle}
          </p>

          <div className="hero-fade mt-8 flex w-full flex-col gap-3 opacity-0 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button href={LINKS.booking} variant="sun" className="w-full sm:w-auto">
              Agendar aula
            </Button>
            <Button href={LINKS.whatsapp} variant="ghost-light" className="w-full sm:w-auto">
              Falar no WhatsApp
            </Button>
          </div>
        </div>

        <a
          href="#sobre"
          className="hero-fade mt-12 inline-flex items-center gap-3 self-start text-[0.7rem] font-medium uppercase tracking-[0.18em] text-sand/45 opacity-0 transition-colors hover:text-sun md:mt-20"
        >
          <span className="block h-10 w-px bg-sand/30" aria-hidden="true" />
          Descer
        </a>
      </div>
    </section>
  )
}

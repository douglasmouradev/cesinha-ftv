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

    gsap.fromTo(
      el,
      { scale: 1.08 },
      { scale: 1, duration: 8, ease: 'power1.out' },
    )

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
      className="relative min-h-[100svh] overflow-hidden bg-ocean text-sand"
    >
      {/* Full-bleed photo plane */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-[-4%] will-change-transform transition-transform duration-700 ease-out"
        >
          <img
            src="/images/hero.webp"
            alt=""
            width={1440}
            height={2556}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-[center_28%]"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-ocean via-ocean/85 to-ocean/25 md:via-ocean/75 md:to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ocean via-transparent to-ocean/50"
          aria-hidden="true"
        />
      </div>

      <div className="container-site relative z-[2] flex min-h-[100svh] flex-col justify-end pb-14 pt-[calc(var(--header-h)+2.5rem)] md:pb-20 md:justify-center">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="hero-fade mb-5 font-body text-[0.8rem] font-medium text-sun opacity-0 md:text-[0.85rem]">
            {CONTENT.city} · {CONTENT.arena}
          </p>

          <h1 className="font-display text-[clamp(3.2rem,10vw,6.5rem)]">
            <span className="mask-reveal hero-line">
              <span>{CONTENT.hero.line1}</span>
            </span>
            <span className="mask-reveal hero-line mt-1 block text-sun">
              <span>{CONTENT.hero.line2}</span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-md text-[1.05rem] leading-relaxed text-sand/80 opacity-0 md:text-[1.1rem]">
            {CONTENT.hero.subtitle}
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-3 opacity-0">
            <Button href={LINKS.booking} variant="sun">
              Agendar aula
            </Button>
            <Button href={LINKS.whatsapp} variant="ghost-light">
              Falar no WhatsApp
            </Button>
          </div>
        </div>

        <a
          href="#sobre"
          className="hero-fade mt-16 inline-flex items-center gap-3 self-start text-[0.7rem] font-medium uppercase tracking-[0.18em] text-sand/45 opacity-0 transition-colors hover:text-sun md:mt-20"
        >
          <span className="block h-10 w-px bg-sand/30" aria-hidden="true" />
          Descer
        </a>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const SESSION_KEY = 'cesinha-preloader-seen-v3'

type Props = {
  onDone: () => void
}

/** Marca: bola de futevôlei com painéis em diamante (amarelo/preto). */
function BrandBall({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="cesi-ball-clip">
          <circle cx="40" cy="40" r="36" />
        </clipPath>
        <radialGradient id="cesi-ball-glow" cx="34%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#F8C72D" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      <g clipPath="url(#cesi-ball-clip)">
        <circle cx="40" cy="40" r="36" fill="#F8C72D" />

        {/* Diamantes pretos — leitura imediata de bola de areia */}
        <path fill="#0A0A0A" d="M40 4 L58 22 L40 40 L22 22 Z" />
        <path fill="#0A0A0A" d="M76 40 L58 22 L40 40 L58 58 Z" />
        <path fill="#0A0A0A" d="M40 76 L58 58 L40 40 L22 58 Z" />
        <path fill="#0A0A0A" d="M4 40 L22 58 L40 40 L22 22 Z" />

        <g fill="none" stroke="#F8C72D" strokeWidth="1.4" opacity="0.9">
          <path d="M22 22 L58 58 M58 22 L22 58" />
          <circle cx="40" cy="40" r="12" />
        </g>

        <circle cx="40" cy="40" r="36" fill="url(#cesi-ball-glow)" />
      </g>

      <circle
        cx="40"
        cy="40"
        r="36"
        fill="none"
        stroke="#F8C72D"
        strokeWidth="2"
      />
    </svg>
  )
}

export function Preloader({ onDone }: Props) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [skip] = useState(() => {
    if (typeof window === 'undefined') return true
    return (
      sessionStorage.getItem(SESSION_KEY) === '1' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })

  useEffect(() => {
    if (skip) {
      onDone()
      return
    }

    const root = rootRef.current
    if (!root) return

    const brand = root.querySelector('.preloader-brand')
    const ball = root.querySelector('.preloader-ball')
    const net = root.querySelector('.preloader-net')
    const curtain = root.querySelector('.preloader-curtain')
    const heroBg = root.querySelector('.preloader-hero-bg')

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, '1')
        onDone()
      },
    })

    // ~1.8s total: marca → um gesto → revela hero
    tl.set(heroBg, { opacity: 0.35, scale: 1.06 })
      .fromTo(
        brand,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.4 },
      )
      .fromTo(
        net,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.28 },
        '-=0.12',
      )
      // Único gesto: bola sobe da areia, cruza a rede (ataque / domínio)
      .fromTo(
        ball,
        { x: -90, y: 56, opacity: 0, scale: 0.7, rotation: -90 },
        {
          x: 0,
          y: -8,
          opacity: 1,
          scale: 1,
          rotation: 25,
          duration: 0.45,
          ease: 'power2.out',
        },
        '-=0.05',
      )
      .to(ball, {
        y: -42,
        x: 18,
        rotation: 120,
        duration: 0.32,
        ease: 'power2.inOut',
      })
      // Cortina sobe; hero já está por baixo
      .to(
        heroBg,
        { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.1',
      )
      .to(
        [brand, ball, net],
        { opacity: 0, duration: 0.28 },
        '-=0.35',
      )
      .to(curtain, {
        yPercent: -100,
        duration: 0.55,
        ease: 'power4.inOut',
      })
      .set(root, { display: 'none' })

    return () => {
      tl.kill()
    }
  }, [skip, onDone, reduced])

  if (skip) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]" aria-hidden="true">
      {/* Hero já por baixo — transição contínua */}
      <div className="preloader-hero-bg absolute inset-0 overflow-hidden bg-ocean">
        <img
          src="/images/hero.webp"
          alt=""
          className="h-full w-full object-cover object-[center_28%] opacity-90"
          width={1440}
          height={2556}
          decoding="async"
        />
        <div className="absolute inset-0 bg-ocean/55" />
      </div>

      <div className="preloader-curtain absolute inset-0 flex flex-col items-center justify-center bg-ocean will-change-transform">
        <div className="relative z-[2] flex flex-col items-center px-6">
          <div className="preloader-brand flex flex-col items-center text-center">
            <p className="font-display text-[clamp(3.2rem,14vw,7.5rem)] leading-none tracking-[0.04em] text-sand">
              CESINHA
            </p>
            <p className="mt-1 font-display text-[clamp(1.4rem,5vw,2.4rem)] leading-none tracking-[0.18em] text-sun">
              FUTEVÔLEI
            </p>
          </div>

          <div className="relative mt-10 h-28 w-56">
            {/* Rede — linha horizontal */}
            <div className="absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2">
              <div className="preloader-net h-px w-full origin-center scale-x-0 bg-sand/35">
                <span className="absolute -top-1 left-0 size-1.5 rounded-full bg-sun" />
                <span className="absolute -top-1 right-0 size-1.5 rounded-full bg-sun" />
              </div>
            </div>

            <BrandBall className="preloader-ball absolute left-1/2 top-2 size-[3.25rem] -translate-x-1/2 will-change-transform drop-shadow-[0_10px_24px_rgba(248,199,45,0.3)]" />

            <div className="absolute bottom-0 left-1/2 h-px w-24 -translate-x-1/2 bg-sand/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

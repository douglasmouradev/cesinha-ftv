import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const SESSION_KEY = 'cesinha-preloader-seen-v2'

type Props = {
  onDone: () => void
}

/** Bola estilo futevôlei (painéis triangulares amarelo/preto). */
function FutevoleiBall() {
  return (
    <svg
      className="preloader-ball absolute left-1/2 top-0 size-14 -translate-x-1/2 will-change-transform drop-shadow-[0_8px_16px_rgba(248,199,45,0.25)]"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="ball-clip">
          <circle cx="32" cy="32" r="30" />
        </clipPath>
        <radialGradient id="ball-shine" cx="32%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#fff6c8" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#F8C72D" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      <g clipPath="url(#ball-clip)">
        <circle cx="32" cy="32" r="30" fill="#F8C72D" />

        {/* Painéis pretos — padrão triangular típico de bola de futevôlei */}
        <path fill="#0A0A0A" d="M32 2 L48 18 L32 32 Z" />
        <path fill="#0A0A0A" d="M32 2 L16 18 L32 32 Z" opacity="0.92" />
        <path fill="#0A0A0A" d="M62 32 L48 18 L32 32 Z" />
        <path fill="#0A0A0A" d="M62 32 L48 46 L32 32 Z" opacity="0.9" />
        <path fill="#0A0A0A" d="M32 62 L48 46 L32 32 Z" />
        <path fill="#0A0A0A" d="M32 62 L16 46 L32 32 Z" opacity="0.92" />
        <path fill="#0A0A0A" d="M2 32 L16 46 L32 32 Z" />
        <path fill="#0A0A0A" d="M2 32 L16 18 L32 32 Z" opacity="0.9" />

        {/* Costuras / divisão dos painéis */}
        <g
          fill="none"
          stroke="#F8C72D"
          strokeWidth="1.1"
          strokeLinejoin="round"
          opacity="0.85"
        >
          <path d="M32 2 L32 62" />
          <path d="M2 32 L62 32" />
          <path d="M10 10 L54 54" />
          <path d="M54 10 L10 54" />
          <circle cx="32" cy="32" r="11" />
        </g>

        <circle cx="32" cy="32" r="30" fill="url(#ball-shine)" />
      </g>

      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="#F8C72D"
        strokeWidth="1.5"
        opacity="0.9"
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

    const name = root.querySelector('.preloader-name')
    const ball = root.querySelector('.preloader-ball')
    const curtain = root.querySelector('.preloader-curtain')
    const sand = root.querySelector('.preloader-sand')
    const tag = root.querySelector('.preloader-tag')

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, '1')
        onDone()
      },
    })

    // Entrada da marca
    tl.fromTo(
      name,
      { clipPath: 'inset(100% 0 0 0)', opacity: 0.4 },
      { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 0.65 },
    )
      .fromTo(
        tag,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35 },
        '-=0.2',
      )
      // Bola entra em arco com giro (como domínio / levantada)
      .fromTo(
        ball,
        { x: -140, y: 50, opacity: 0, scale: 0.55, rotation: -160 },
        {
          x: 0,
          y: -78,
          opacity: 1,
          scale: 1,
          rotation: 40,
          duration: 0.58,
          ease: 'power2.out',
        },
        '-=0.15',
      )
      // Quique na areia
      .to(ball, {
        y: 6,
        rotation: 110,
        duration: 0.38,
        ease: 'power2.in',
      })
      .to(
        sand,
        { scaleX: 1.35, opacity: 0.85, duration: 0.18 },
        '-=0.12',
      )
      // Segundo toque — “empalme” / sobe de novo
      .to(ball, {
        y: -48,
        rotation: 200,
        duration: 0.36,
        ease: 'power2.out',
      })
      .to(ball, {
        y: 8,
        rotation: 280,
        duration: 0.32,
        ease: 'bounce.out',
      })
      .to(
        sand,
        { scaleX: 1.2, opacity: 0.55, duration: 0.2 },
        '-=0.2',
      )
      // Cortina sobe
      .to(curtain, {
        yPercent: -100,
        duration: 0.7,
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
      <div className="preloader-curtain absolute inset-0 flex flex-col items-center justify-center bg-ocean text-sand noise will-change-transform">
        <div className="relative z-[2] flex flex-col items-center">
          <p className="preloader-name font-display text-[clamp(3.5rem,16vw,9rem)] text-sand">
            CESINHA
          </p>
          <p className="preloader-tag mt-2 font-body text-[0.75rem] font-bold uppercase tracking-[0.28em] text-sun">
            Futevôlei
          </p>
          <div className="relative mt-8 h-32 w-44">
            <FutevoleiBall />
            <div className="preloader-sand absolute bottom-1 left-1/2 h-2 w-20 -translate-x-1/2 rounded-full bg-sun/35 origin-center blur-[1px]" />
            <div className="absolute bottom-0 left-1/2 h-px w-28 -translate-x-1/2 bg-sand/25" />
          </div>
        </div>
      </div>
    </div>
  )
}

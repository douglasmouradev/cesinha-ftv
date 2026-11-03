import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhotoBlock } from '../components/PhotoBlock'
import { LINKS } from '../config/links'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useReveal } from '../hooks/useReveal'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    src: '/images/hero.webp',
    alt: 'Cesinha — chute alto com a bola na areia',
    aspect: 'aspect-[5/4]',
    span: 'md:col-span-7 md:row-span-2',
  },
  {
    src: '/images/about.webp',
    alt: 'Cesinha — domínio de bola na testa, uniforme amarelo e preto',
    aspect: 'aspect-[3/4]',
    span: 'md:col-span-5',
  },
  {
    src: '/images/gallery-01.webp',
    alt: 'Cesinha — chute em torneio com uniforme branco e rosa',
    aspect: 'aspect-[4/5]',
    span: 'md:col-span-5',
  },
  {
    src: '/images/gallery-02.webp',
    alt: 'Cesinha — domínio de peito com uniforme vinho',
    aspect: 'aspect-[3/4]',
    span: 'md:col-span-7',
  },
]

export function Gallery() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reduced) return

    const imgs = grid.querySelectorAll('.gallery-item')

    imgs.forEach((img) => {
      gsap.fromTo(
        img,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 92%',
            once: true,
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && grid.contains(st.trigger as Node)) st.kill()
      })
    }
  }, [reduced])

  return (
    <section id="galeria" className="section-pad bg-ocean text-sand">
      <div className="container-site relative z-[2]">
        <div
          ref={headRef}
          className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="label-quiet mb-3">Galeria</p>
            <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)]">
              Areia, rede, ritmo.
            </h2>
          </div>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.9rem] font-bold uppercase tracking-[0.08em] text-sun transition-colors hover:text-sun-hot"
          >
            Instagram →
          </a>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-12 md:gap-3"
        >
          {ITEMS.map((item) => (
            <div
              key={item.src}
              className={`gallery-item group overflow-hidden ${item.span}`}
            >
              <PhotoBlock
                src={item.src}
                alt={item.alt}
                aspect={item.aspect}
                className="h-full min-h-[240px] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

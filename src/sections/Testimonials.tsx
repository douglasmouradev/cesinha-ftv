import { useState } from 'react'
import { CONTENT } from '../config/content'
import { useReveal } from '../hooks/useReveal'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const ref = useReveal<HTMLDivElement>()
  const items = CONTENT.testimonials
  const current = items[index]

  return (
    <section className="section-pad bg-sand text-ink">
      <div className="container-site" ref={ref}>
        <p className="label-quiet mb-3 text-ocean/50">Alunos</p>
        <h2 className="font-display text-[clamp(2.4rem,6vw,4.2rem)] text-ocean">
          O que diz quem treina
        </h2>

        <figure className="mt-12 border-t border-ocean/15 pt-10 md:mt-16 md:pt-14">
          <blockquote className="max-w-4xl font-body text-[clamp(1.35rem,3.2vw,2.35rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ocean">
            {current.quote}
          </blockquote>
          <figcaption className="mt-8 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <span className="font-medium text-ocean">{current.name}</span>
            <span className="text-[0.85rem] text-ink/50">{current.meta}</span>
          </figcaption>
        </figure>

        <div className="mt-10 flex items-center gap-3" role="tablist" aria-label="Depoimentos">
          {items.map((item, i) => (
            <button
              key={`${item.meta}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Depoimento ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 transition-all duration-300 ${
                i === index ? 'w-10 bg-sun' : 'w-5 bg-ocean/20 hover:bg-ocean/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import { CONTENT } from '../config/content'
import { LINKS } from '../config/links'
import { useReveal } from '../hooks/useReveal'

export function Classes() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section id="aulas" className="section-pad relative bg-ocean text-sand noise">
      <div className="container-site relative z-[2]" ref={ref}>
        <div className="mb-16 max-w-2xl md:mb-24">
          <p className="label-quiet mb-3">Formatos</p>
          <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)]">
            Aulas no seu ritmo.
            <span className="mt-1 block text-sand/40">Na areia de verdade.</span>
          </h2>
        </div>

        <div className="divide-y divide-sand/10 border-y border-sand/10">
          {CONTENT.classes.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:items-start md:gap-8 md:py-12"
            >
              <p className="font-display text-3xl text-sun/75 md:col-span-2 md:text-4xl">
                {item.level}
              </p>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl md:text-3xl">{item.title}</h3>
              </div>
              <div className="md:col-span-4">
                <p className="max-w-md text-[1rem] leading-relaxed text-sand/60">{item.text}</p>
              </div>
              <div className="md:col-span-2 md:text-right">
                <a
                  href={LINKS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-sun transition-colors hover:text-sun-hot"
                >
                  Agendar
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

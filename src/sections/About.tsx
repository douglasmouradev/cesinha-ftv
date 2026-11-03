import { Counter } from '../components/Counter'
import { PhotoBlock } from '../components/PhotoBlock'
import { CONTENT } from '../config/content'
import { useReveal } from '../hooks/useReveal'

export function About() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1 })

  return (
    <section id="sobre" className="section-pad relative w-full overflow-x-hidden bg-sand text-ink">
      <div className="container-site" ref={ref}>
        <div className="mb-12 md:mb-20">
          <p className="label-quiet mb-3 text-ocean/50">Sobre</p>
          <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-ocean">
            {CONTENT.about.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="min-w-0 md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <PhotoBlock
                src="/images/about.webp"
                alt="Cesinha equilibrando a bola na testa — treino na areia"
                aspect="aspect-[3/4]"
                className="bg-ocean object-top"
              />
              <p className="mt-4 break-words text-[0.85rem] text-ocean/45">
                {CONTENT.instagramHandle} · {CONTENT.followers} seguidores
              </p>
            </div>
          </div>

          <div className="min-w-0 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <p className="max-w-xl text-[1.05rem] leading-[1.75] break-words text-ink/75 md:text-[1.12rem]">
              {CONTENT.about.body}
            </p>

            <ul className="mt-12 space-y-0">
              {CONTENT.about.markers.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 border-t border-ocean/10 py-5 text-[0.95rem] text-ocean last:border-b md:gap-4 md:text-[1rem]"
                >
                  <span className="h-px w-5 shrink-0 bg-sun md:w-6" aria-hidden="true" />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-14 grid grid-cols-1 gap-8 border-t border-ocean/10 pt-10 sm:grid-cols-3 sm:gap-6">
              {CONTENT.stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <p className="font-display text-[clamp(2.2rem,4vw,3rem)] text-ocean">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-[0.85rem] text-ocean/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

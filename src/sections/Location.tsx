import { Button } from '../components/Button'
import { CONTENT } from '../config/content'
import { LINKS } from '../config/links'
import { useReveal } from '../hooks/useReveal'

export function Location() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1 })
  const mapsHref =
    LINKS.maps.startsWith('{{')
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Arena Beach Stella Maris Salvador')}`
      : LINKS.maps

  return (
    <section id="contato" className="section-pad bg-ocean text-sand noise">
      <div className="container-site relative z-[2]" ref={ref}>
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <p className="label-quiet mb-3">Onde treinar</p>
            <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)]">
              {CONTENT.location.title}
            </h2>
            <p className="mt-6 max-w-sm text-sand/65 leading-relaxed">
              {CONTENT.location.note}
            </p>
          </div>

          <div className="col-span-12 grid gap-0 border-t border-sand/15 lg:col-span-7">
            <div className="grid gap-2 border-b border-sand/15 py-8 sm:grid-cols-[140px_1fr]">
              <p className="text-[0.8rem] font-medium text-sand/45">Endereço</p>
              <p className="text-[1.1rem] leading-relaxed">{CONTENT.location.address}</p>
            </div>
            <div className="grid gap-2 border-b border-sand/15 py-8 sm:grid-cols-[140px_1fr]">
              <p className="text-[0.8rem] font-medium text-sand/45">Horários</p>
              <p className="text-[1.1rem] leading-relaxed">{CONTENT.location.hours}</p>
            </div>
            <div className="grid gap-2 py-8 sm:grid-cols-[140px_1fr]">
              <p className="text-[0.8rem] font-medium text-sand/45">Arena</p>
              <p className="text-[1.1rem]">{CONTENT.arena}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button href={mapsHref} variant="ghost-light">
                Abrir no mapa
              </Button>
              <Button href={LINKS.booking} variant="sun">
                Agendar aula
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

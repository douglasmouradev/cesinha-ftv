import { Button } from '../components/Button'
import { LINKS } from '../config/links'
import { useReveal } from '../hooks/useReveal'

export function FinalCTA() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden bg-ocean text-sand">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 80%, rgba(248,199,45,0.18), transparent 60%)',
        }}
      />
      <div className="container-site relative z-[2] section-pad" ref={ref}>
        <p className="label-quiet mb-6">Próximo passo</p>
        <h2 className="max-w-4xl font-display text-[clamp(3rem,10vw,7rem)] leading-[0.92]">
          Sua primeira aula
          <span className="mt-1 block text-sun">começa aqui.</span>
        </h2>
        <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-sand/60">
          Marque pelo Arevo ou mande mensagem no WhatsApp. Aula experimental disponível —
          vem pra areia.
        </p>
        <div className="mt-12">
          <Button href={LINKS.booking} variant="sun" className="!min-h-14 !px-8 !text-[0.95rem]">
            Agendar aula
          </Button>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-0 mt-5 inline-block text-[0.9rem] font-medium text-sand/55 transition-colors hover:text-sun sm:ml-8 sm:mt-0"
          >
            Ou falar no WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}

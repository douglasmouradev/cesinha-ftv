import { CONTENT } from '../config/content'
import { LINKS, NAV_LINKS } from '../config/links'

export function Footer() {
  return (
    <footer className="border-t border-sand/10 bg-ink text-sand">
      <div className="container-site grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <p className="font-display text-4xl tracking-[0.04em]">
            CESINHA
            <span className="mt-1 block font-body text-sm font-bold tracking-[0.14em] text-sun">
              FUTEVÔLEI
            </span>
          </p>
          <p className="mt-4 max-w-xs text-sm text-sand/50">
            {CONTENT.city} · {CONTENT.arena}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 text-[0.8rem] font-medium text-sand/40">Navegar</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sand/75 transition-colors hover:text-sun">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mb-4 text-[0.8rem] font-medium text-sand/40">Contato</p>
          <ul className="space-y-2">
            <li>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand/75 transition-colors hover:text-sun"
              >
                Instagram {CONTENT.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand/75 transition-colors hover:text-sun"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand/75 transition-colors hover:text-sun"
              >
                Agendar aula
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand/10">
        <div className="container-site flex flex-col gap-2 py-5 text-[0.75rem] text-sand/40 sm:flex-row sm:justify-between">
          <p>© 2026 Cesinha Futevôlei</p>
          <p>Futevôlei em Salvador — turmas e personal</p>
        </div>
      </div>
    </footer>
  )
}

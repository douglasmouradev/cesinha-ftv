import { useEffect, useState } from 'react'
import { LINKS, NAV_LINKS } from '../config/links'
import { Button } from './Button'

export function Header() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.documentElement.classList.toggle('menu-open', open)
    return () => {
      document.body.style.overflow = ''
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background,box-shadow,padding] duration-300 ${
          compact || open
            ? 'bg-ocean py-3 shadow-[0_1px_0_rgba(247,247,245,0.06)]'
            : 'bg-gradient-to-b from-ocean/95 to-ocean/55 py-4'
        }`}
      >
        <div className="container-site flex items-center justify-between gap-4">
          <a
            href="#topo"
            className="flex items-baseline gap-2.5 leading-none"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-[1.85rem] tracking-[0.04em] text-sand md:text-[2.1rem]">
              CESINHA
            </span>
            <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.16em] text-sun md:text-[0.8rem]">
              Futevôlei
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link font-body text-[0.95rem] font-semibold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button href={LINKS.booking} variant="sun" className="!min-h-11 !px-5">
              Agendar aula
            </Button>
          </nav>

          <button
            type="button"
            className="relative z-[70] grid size-11 place-items-center border border-sand/25 text-sand lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-full bg-current transition-transform ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-full bg-current transition-transform ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Fora do header: fixed não fica preso pelo stacking/blur do topo */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[55] bg-ocean lg:hidden ${
          open ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
        } transition-[opacity,visibility] duration-300`}
        aria-hidden={!open}
      >
        <nav
          className="flex h-full flex-col justify-between px-6 pb-10 pt-[calc(var(--header-h)+1.5rem)]"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-sand/15 py-4 font-display text-[2.5rem] leading-none text-sand"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button href={LINKS.booking} variant="sun" className="w-full !min-h-12">
              Agendar aula
            </Button>
            <Button href={LINKS.whatsapp} variant="ghost-light" className="w-full !min-h-12">
              WhatsApp
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}

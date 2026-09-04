import { useEffect, useState } from 'react'

import { NAV_LINKS, SITE } from '../content'

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-8 h-32 bg-gradient-to-b from-black/85 via-black/45 to-transparent"
      />

      <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <a href="#top" className="flex items-center gap-3" aria-label={`${SITE.name}, home`}>
          <span
            className="text-[21px] tracking-tight text-white sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {SITE.logo}
          </span>
          <span
            aria-hidden="true"
            className="select-none text-[25px] text-white sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </a>

        <nav className="hidden items-center text-[23px] text-white md:flex" aria-label="Primary">
          {NAV_LINKS.map((link, index) => (
            <span key={link.href}>
              <a href={link.href} className="transition-opacity hover:opacity-60">
                {link.label}
              </a>
              {index < NAV_LINKS.length - 1 && <span aria-hidden="true">,&nbsp;</span>}
            </span>
          ))}
        </nav>

        <a
          href={`mailto:${SITE.email}`}
          className="hidden text-[23px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Get in touch
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-opacity duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-9 flex flex-col justify-center gap-8 bg-black/90 px-8 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-[32px] font-medium text-white"
          >
            {link.label}
          </a>
        ))}
        <a
          href={`mailto:${SITE.email}`}
          onClick={() => setOpen(false)}
          className="text-[32px] font-medium text-white underline underline-offset-2"
        >
          Get in touch
        </a>
      </div>
    </>
  )
}

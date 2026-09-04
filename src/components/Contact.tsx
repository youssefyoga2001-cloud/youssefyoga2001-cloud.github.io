import { useState } from 'react'

import { SITE } from '../content'
import { CopyIcon } from './CopyIcon'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <footer
      id="contact"
      className="relative z-1 scroll-mt-24 bg-black px-5 pb-12 sm:px-8 md:px-10"
    >
      <div className="mx-auto max-w-6xl border-t border-white/15 pt-16 sm:pt-24">
        <p className="text-[14px] uppercase tracking-widest text-white/40">
          Available for work
        </p>

        <h2
          className="mt-6 max-w-[18ch] text-[36px] leading-[1.05] tracking-tight text-white sm:text-[64px] md:text-[80px]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Let&rsquo;s make something that doesn&rsquo;t exist yet.
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 text-[15px] text-black transition-colors duration-200 hover:bg-white/80 sm:text-[17px]"
          >
            {SITE.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-white/40 px-6 text-[15px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:text-[17px]"
          >
            {copied ? 'Copied' : 'Copy email'}
            <CopyIcon />
          </button>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-white/40 px-6 text-[15px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:text-[17px]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M4.6 1.4 1.9 2.3c-.5.2-.8.7-.7 1.2.5 3 3.3 5.8 6.3 6.3.5.1 1-.2 1.2-.7l.9-2.7-2.4-1.1-1 1.2A8.2 8.2 0 0 1 4.4 4.4l1.2-1z" />
            </svg>
            {SITE.phoneDisplay}
          </a>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {SITE.name}
          </span>
          <span>{SITE.role}</span>
        </div>
      </div>
    </footer>
  )
}

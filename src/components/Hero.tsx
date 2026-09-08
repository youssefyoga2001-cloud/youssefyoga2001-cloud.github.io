import { useEffect, useState } from 'react'

import { SITE, asset } from '../content'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useScrubVideo } from '../hooks/useScrubVideo'
import { useTypewriter } from '../hooks/useTypewriter'
import { CopyIcon } from './CopyIcon'

const GREETING =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?'

const PILLS = [
  { label: 'See the projects', href: '#projects' },
  { label: 'Commission a piece', href: '#contact' },
  { label: 'Say hello', href: `mailto:${SITE.email}` },
  { label: 'How I work', href: '#about' },
]

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const hasFinePointer = useMediaQuery('(pointer: fine)')
  const videoRef = useScrubVideo(hasFinePointer && !reducedMotion)

  const { displayed, done } = useTypewriter(GREETING)
  const [pillsVisible, setPillsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setPillsVisible(true), 400)
    return () => clearTimeout(timeout)
  }, [])

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
    <>
      <video
        ref={videoRef}
        src={asset('videos/Hero.mp4')}
        poster={asset('videos/Hero.jpg')}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="fixed inset-0 z-0 h-full w-full object-cover object-[50%_center] md:object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20"
      />
      <div
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 z-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"
      />

      <section
        id="top"
        className="relative z-1 flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0"
      >
        <div className="relative z-10 max-w-xl">
          <p
            className="pointer-events-none mb-5 select-none sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#fff',
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Youssef&rsquo;s Adaptive Response Interface Agent
          </p>

          <p
            className="mb-5 text-white sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: 54,
            }}
          >
            {displayed}
            {!done && (
              <span
                aria-hidden="true"
                className="ml-[2px] inline-block h-[1.1em] w-[2px] bg-white align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            )}
          </p>

          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {PILLS.map((pill) => (
              <a
                key={pill.label}
                href={pill.href}
                className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
              >
                {pill.label}
              </a>
            ))}

            <button
              type="button"
              onClick={copyEmail}
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]"
            >
              <span>
                Reach us:{' '}
                <span className="underline underline-offset-1">{SITE.email}</span>
              </span>
              <CopyIcon />
            </button>
            <span role="status" className="sr-only">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

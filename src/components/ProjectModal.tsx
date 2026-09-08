import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { asset, posterFor, type Project } from '../content'

// Deliberately not a native <dialog>: its `close` event proved unreliable, and a missed
// event leaves the page scroll-locked with audio still playing. Every dismissal path
// here goes through onClose, so React state is always the source of truth.
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return

    restoreFocusRef.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, video, [href], [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      restoreFocusRef.current?.focus()
    }
  }, [project, onClose])

  if (!project) return null

  // Portalled to the body: the projects section sets `z-1`, which would otherwise trap
  // this overlay in a stacking context below the fixed navbar.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — ${project.category}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-3 backdrop-blur-sm"
    >
      <div ref={panelRef} className="flex max-h-[92dvh] w-full max-w-[1200px] flex-col gap-4">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2
              className="text-[24px] tracking-tight text-white sm:text-[32px]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {project.title}
            </h2>
            <p className="mt-1 text-[14px] text-white/60 sm:text-[16px]">
              {project.category} &middot; {project.year}
            </p>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:bg-white hover:text-black"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        <video
          key={project.id}
          src={asset(project.src)}
          poster={posterFor(project)}
          controls
          autoPlay
          playsInline
          preload="auto"
          className="max-h-[calc(92dvh-6rem)] w-full min-h-0 rounded-sm bg-black object-contain"
        />
      </div>
    </div>,
    document.body,
  )
}

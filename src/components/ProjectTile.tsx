import { useRef, useState } from 'react'

import { asset, type Project } from '../content'
import { useMediaQuery } from '../hooks/useMediaQuery'

const DEFAULT_POSTER_AT = 0.3

export function ProjectTile({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (project: Project) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasFinePointer = useMediaQuery('(pointer: fine)')
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  // No build-time poster images, so seek to a representative frame to paint one.
  const seekToPoster = () => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) return
    video.currentTime = video.duration * (project.posterAt ?? DEFAULT_POSTER_AT)
  }

  const start = () => {
    const video = videoRef.current
    if (!video) return
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => {})
  }

  const stop = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    setPlaying(false)
    seekToPoster()
  }

  return (
    <article className="group">
      <button
        type="button"
        onMouseEnter={hasFinePointer ? start : undefined}
        onMouseLeave={hasFinePointer ? stop : undefined}
        onFocus={hasFinePointer ? start : undefined}
        onBlur={hasFinePointer ? stop : undefined}
        onClick={() => {
          stop()
          onOpen(project)
        }}
        aria-label={`Play ${project.title}, ${project.category}`}
        className="relative block w-full cursor-pointer overflow-hidden rounded-sm bg-neutral-900"
      >
        <div className="aspect-video w-full">
          <video
            ref={videoRef}
            src={asset(project.src)}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={seekToPoster}
            onSeeked={() => setReady(true)}
            className={`h-full w-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-[1.03] ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-300 ${
            playing ? 'opacity-0' : 'opacity-100'
          }`}
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-4 text-[13px] tabular-nums text-white/70"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/40 px-3 py-1 text-[12px] text-white backdrop-blur-sm transition-colors duration-200 group-hover:bg-white group-hover:text-black"
        >
          <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor">
            <path d="M0 0l9 5-9 5z" />
          </svg>
          Play
        </span>
      </button>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3
          className="text-[22px] tracking-tight text-white sm:text-[28px]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {project.title}
        </h3>
        <span className="shrink-0 text-[13px] tabular-nums text-white/50 sm:text-[15px]">
          {project.year}
        </span>
      </div>
      <p className="mt-1 text-[14px] text-white/60 sm:text-[16px]">{project.category}</p>
    </article>
  )
}

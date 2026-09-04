import { useCallback, useState } from 'react'

import { PROJECTS, type Project } from '../content'
import { ProjectModal } from './ProjectModal'
import { ProjectTile } from './ProjectTile'

export function Work() {
  const [active, setActive] = useState<Project | null>(null)
  // Stable so the modal's focus/scroll-lock effect does not re-run on every render.
  const close = useCallback(() => setActive(null), [])

  return (
    <section
      id="projects"
      className="relative z-1 scroll-mt-24 bg-black px-5 py-24 sm:px-8 sm:py-32 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-baseline justify-between gap-6 border-b border-white/15 pb-6 sm:mb-16">
          <h2
            className="text-[32px] tracking-tight text-white sm:text-[44px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Projects
          </h2>
          <span className="shrink-0 text-[14px] tabular-nums text-white/50 sm:text-[16px]">
            {PROJECTS.length} projects
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {PROJECTS.map((project, index) => (
            <ProjectTile
              key={project.id}
              project={project}
              index={index}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={close} />
    </section>
  )
}

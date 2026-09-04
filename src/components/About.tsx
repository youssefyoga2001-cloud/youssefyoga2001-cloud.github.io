import { SERVICES, SITE } from '../content'

export function About() {
  return (
    <section
      id="about"
      className="relative z-1 scroll-mt-24 bg-black px-5 pb-24 sm:px-8 sm:pb-32 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 border-b border-white/15 pb-6 sm:mb-16">
          <h2
            className="text-[32px] tracking-tight text-white sm:text-[44px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            About
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="max-w-[60ch] text-[18px] leading-relaxed text-white/85 sm:text-[22px]">
              I&rsquo;m {SITE.name}, an AI artist making films that could not have been
              shot. I work with generative models the way a director works with a crew
              &mdash; casting characters, setting the light, and running takes until the
              frame says what it should.
            </p>
            <p className="mt-6 max-w-[60ch] text-[16px] leading-relaxed text-white/60 sm:text-[18px]">
              The models get you an image. The work is everything after: holding a
              character&rsquo;s face steady across a cut, grading a sequence into one world,
              and finishing with sound so it plays as a film rather than a demo. I take
              projects from first concept to final master.
            </p>
          </div>

          <div className="md:col-span-5">
            <h3 className="mb-5 text-[14px] uppercase tracking-widest text-white/40">
              Services
            </h3>
            <ul className="flex flex-col">
              {SERVICES.map((service) => (
                <li
                  key={service}
                  className="border-t border-white/10 py-3 text-[17px] text-white/85 sm:text-[19px]"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

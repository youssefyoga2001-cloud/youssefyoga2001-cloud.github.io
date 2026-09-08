export const SITE = {
  name: 'Youssef Mohamed',
  logo: 'Youssef’s portfolio',
  email: 'youssefyoga2001@gmail.com',
  phone: '+201068411731',
  phoneDisplay: '+20 106 841 1731',
  role: 'AI Artist',
}

export const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Resolves a public-folder path against Vite's configured base, so the site works both
 * at a domain root and under a project sub-path (e.g. /portfolio/) without code changes.
 */
export const asset = (path: string) => import.meta.env.BASE_URL + path

/** Poster JPEG sitting next to each clip, e.g. videos/Kowens.mp4 -> videos/Kowens.jpg */
export const posterFor = (project: Project) => asset(project.src.replace(/\.mp4$/, '.jpg'))

export type Project = {
  id: string
  title: string
  category: string
  year: string
  src: string
  /**
   * Which point in the clip (0-1) the committed poster JPEG was taken from. Not read at
   * runtime — kept so posters can be regenerated from the same frame. See README.
   */
  posterAt?: number
}

export const PROJECTS: Project[] = [
  {
    id: 'o3-sigma',
    title: 'O3 Sigma',
    category: 'Generative Film',
    year: '2026',
    src: 'videos/O3-Sigma.mp4',
    posterAt: 0.6,
  },
  {
    id: 'kowens',
    title: 'Kowens',
    category: 'AI Commercial',
    year: '2026',
    src: 'videos/Kowens.mp4',
    posterAt: 0.6,
  },
  {
    id: 'zeina-story',
    title: 'Zeina Story',
    category: 'AI Narrative',
    year: '2026',
    src: 'videos/Zeina-Story.mp4',
  },
  {
    id: 'bullshead',
    title: 'Bullshead',
    category: 'Product Film',
    year: '2026',
    src: 'videos/Bullshead.mp4',
  },
  {
    id: 'barraq',
    title: 'Barraq',
    category: 'Brand Campaign',
    year: '2026',
    src: 'videos/Barraq.mp4',
  },
  {
    id: 'pharaohs-wear',
    title: 'Pharaohs Wear',
    category: 'AI Fashion Film',
    year: '2026',
    src: 'videos/Pharaohs-Wear.mp4',
  },
]

export const SERVICES = [
  'Generative Video',
  'Concept & Art Direction',
  'AI Character Design',
  'Style & Model Training',
  'Compositing & Cleanup',
  'Sound Design',
]

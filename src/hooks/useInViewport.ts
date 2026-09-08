import { useEffect, useRef, useState } from 'react'

/**
 * True once the element has come near the viewport, and stays true afterwards.
 * Used to warm up tile videos just before they can be hovered, rather than on page load.
 */
export function useInViewport<T extends HTMLElement>(rootMargin = '300px') {
  const ref = useRef<T>(null)
  const [inViewport, setInViewport] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      setInViewport(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inViewport }
}

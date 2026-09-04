import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const reducedMotion = usePrefersReducedMotion()
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text)
      return
    }

    setDisplayed('')
    let index = 0
    let interval: ReturnType<typeof setInterval>

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay, reducedMotion])

  return { displayed, done: displayed.length >= text.length }
}

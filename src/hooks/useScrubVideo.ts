import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.8

// Pointer-less devices never fire mousemove, so the video would sit frozen on frame 0.
export function useScrubVideo(enabled: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)
  const prevX = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // React does not reliably mirror `muted` to the attribute autoplay policy reads.
    video.muted = true

    if (!enabled) {
      video.loop = true
      const play = () => video.play().catch(() => {})
      play()
      document.addEventListener('touchstart', play, { once: true })
      document.addEventListener('click', play, { once: true })
      return () => {
        document.removeEventListener('touchstart', play)
        document.removeEventListener('click', play)
      }
    }

    const onMouseMove = (event: MouseEvent) => {
      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) return

      if (prevX.current === null) {
        prevX.current = event.clientX
        return
      }

      const delta = event.clientX - prevX.current
      prevX.current = event.clientX

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration
      targetTime.current = Math.min(Math.max(targetTime.current + offset, 0), duration)

      if (!seeking.current) {
        seeking.current = true
        video.currentTime = targetTime.current
      }
    }

    const onSeeked = () => {
      if (Math.abs(video.currentTime - targetTime.current) > 0.01) {
        video.currentTime = targetTime.current
      } else {
        seeking.current = false
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    video.addEventListener('seeked', onSeeked)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [enabled])

  return videoRef
}

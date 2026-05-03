import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-triggered reveal. Returns a ref to attach to the target and a
 * boolean that flips to true once the element enters the viewport.
 * Honours `prefers-reduced-motion`.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.01, rootMargin: '120px 0px 0px 0px' },
) {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(true)
      return
    }
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            obs.disconnect()
            return
          }
        }
      },
      options,
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [options])

  return { ref, shown }
}

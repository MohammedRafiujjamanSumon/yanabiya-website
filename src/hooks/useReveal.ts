import { useRef } from 'react'

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  _options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null)
  return { ref, shown: true }
}

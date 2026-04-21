import { useEffect, useState } from 'react'

/**
 * Tracks scroll for a smart header:
 *  - `scrolled`     — true after the user has scrolled past `topThreshold` px.
 *                     Use it to add a shadow / shrink the bar.
 *  - `hidden`       — true when scrolling DOWN past `hideThreshold`. Use it
 *                     to slide the secondary (utility) row out of view.
 *  Scrolling back UP at any point un-hides immediately.
 */
export function useScrollHeader(topThreshold = 8, hideThreshold = 80) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > topThreshold)
        if (y < hideThreshold) {
          setHidden(false)
        } else if (y > lastY + 4) {
          setHidden(true)            // scrolling down
        } else if (y < lastY - 4) {
          setHidden(false)           // scrolling up
        }
        lastY = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [topThreshold, hideThreshold])

  return { scrolled, hidden }
}

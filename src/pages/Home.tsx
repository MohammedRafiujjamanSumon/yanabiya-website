import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Businesses from '../sections/Businesses'
import Partnerships from '../sections/Partnerships'
import Global from '../sections/Global'
import Leadership from '../sections/Leadership'
import Community from '../sections/Community'
import Contact from '../sections/Contact'

/**
 * Home order: Hero → About → Global → Businesses → Partnerships →
 * Community → Leadership → Contact.
 *
 * The About teaser sits right after the Hero so visitors get the brand
 * intro before scrolling into operations. Full About content still lives
 * on /about-us (and /about/our-story) — this section is just the preview.
 */
export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    // The target section may not be mounted on the very first frame after
    // a cross-page navigation. Poll briefly via rAF until it shows up
    // (capped) so the smooth-scroll always fires.
    let cancelled = false
    let attempts = 0
    const tryScroll = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts++ < 30) requestAnimationFrame(tryScroll)
    }
    requestAnimationFrame(tryScroll)
    return () => {
      cancelled = true
    }
  }, [hash])

  return (
    <>
      <Hero />
      <About />
      <Global />
      <Businesses />
      <Partnerships />
      <Community />
      <Leadership />
      <Contact />
    </>
  )
}

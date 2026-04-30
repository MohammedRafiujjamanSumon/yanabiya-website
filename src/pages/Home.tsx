import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import About from '../sections/About'
import Businesses from '../sections/Businesses'
import Global from '../sections/Global'
import Partnerships from '../sections/Partnerships'
import Leadership from '../sections/Leadership'
import Community from '../sections/Community'
import Contact from '../sections/Contact'

/**
 * Home order:
 *   Hero → Stats → About → Our Service → Global Presence →
 *   Trusted Network → Leadership → Our Community → Contact.
 *
 * AIDA + B2B trust hierarchy:
 *   Attention  : Hero — who we are.
 *   Interest   : Stats + About — quick proof of scale + brand intro.
 *   Desire     : Our Service — the offer (primary conversion driver).
 *                Global Presence — proof of where we deliver.
 *                Trusted Network — partners + clients social proof.
 *   Trust      : Leadership — who runs the show.
 *                Our Community — values + CSR (purpose layer).
 *   Action     : Contact — close the loop.
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
      <Stats />
      <About />
      <Businesses />
      <Global />
      <Partnerships />
      <Leadership />
      <Community />
      <Contact />
    </>
  )
}

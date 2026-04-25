import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import Businesses from '../sections/Businesses'
import Partnerships from '../sections/Partnerships'
import Global from '../sections/Global'
import Leadership from '../sections/Leadership'
import Community from '../sections/Community'
import Contact from '../sections/Contact'

/**
 * Home is the GLOBAL-first landing experience: Hero → Global Presence (map +
 * country branches) → Businesses → Partnerships → Community → Leadership →
 * Contact.
 *
 * About Us content is intentionally NOT mounted here. It lives only on
 * /about-us (and /about/our-story) and is reachable solely via the navbar
 * "About Us" link, keeping the home page focused on operations / global
 * presence rather than corporate narrative.
 */
export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <>
      <Hero />
      <Global />
      <Businesses />
      <Partnerships />
      <Community />
      <Leadership />
      <Contact />
    </>
  )
}

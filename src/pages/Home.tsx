import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Businesses from '../sections/Businesses'
import Solutions from '../sections/Solutions'
import Partnerships from '../sections/Partnerships'
import Global from '../sections/Global'
import Leadership from '../sections/Leadership'
import Contact from '../sections/Contact'

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
      <About />
      <Businesses />
      <Global />
      <Solutions />
      <Partnerships />
      <Leadership />
      <Contact />
    </>
  )
}

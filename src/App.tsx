import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import MobilePreview from './components/MobilePreview'

import Hero from './sections/Hero'
import About from './sections/About'
import Businesses from './sections/Businesses'
import Solutions from './sections/Solutions'
import Partnerships from './sections/Partnerships'
import Global from './sections/Global'
import CSR from './sections/CSR'
import Network from './sections/Network'
import Leadership from './sections/Leadership'
import Strategy from './sections/Strategy'
import Insights from './sections/Insights'
import Careers from './sections/Careers'
import Contact from './sections/Contact'

export default function App() {
  // Skip the floating preview button when the page is rendered INSIDE the
  // preview iframe (avoids infinite nesting).
  const isPreviewIframe =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === 'mobile'

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Businesses />
        <Global />
        <Solutions />
        <Partnerships />
        <CSR />
        <Network />
        <Leadership />
        <Strategy />
        <Insights />
        <Careers />
        <Contact />
      </main>
      <Footer />
      {!isPreviewIframe && <MobilePreview />}
    </div>
  )
}

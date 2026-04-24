import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import PageWatermark from './components/PageWatermark'

import Home from './pages/Home'
import BusinessDetail from './pages/BusinessDetail'
import CountryDetail from './pages/CountryDetail'
import Management from './pages/Management'
import Professionals from './pages/Professionals'
import Blog from './pages/Blog'
import SustainableGrowth from './pages/SustainableGrowth'
import CommunityCare from './pages/CommunityCare'
import CareersPage from './pages/CareersPage'
import AboutUs from './pages/AboutUs'
import OurStory from './pages/OurStory'

export default function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/' || pathname === ''
  return (
    <div className="min-h-screen flex flex-col">
      {!isHome && <PageWatermark />}
      <TopBar />
      <Navbar />
      <main className="flex-1 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/:slug" element={<BusinessDetail />} />
          <Route path="/country/:code" element={<CountryDetail />} />
          <Route path="/leadership/management" element={<Management />} />
          <Route path="/leadership/professionals" element={<Professionals />} />
          <Route path="/community/blog" element={<Blog />} />
          <Route path="/community/sustainable-growth" element={<SustainableGrowth />} />
          <Route path="/community/community-care" element={<CommunityCare />} />
          <Route path="/community/careers" element={<CareersPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about/our-story" element={<OurStory />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

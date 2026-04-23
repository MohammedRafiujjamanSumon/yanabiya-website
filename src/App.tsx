import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'

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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-40">
        <TopBar />
        <Navbar />
      </div>
      <main className="flex-1">
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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

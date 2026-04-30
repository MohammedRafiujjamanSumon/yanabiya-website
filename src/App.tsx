import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import PageWatermark from './components/PageWatermark'
import SocialFloat from './components/SocialFloat'

import Home from './pages/Home'
import BusinessDetail from './pages/BusinessDetail'
import SubServiceDetail from './pages/SubServiceDetail'
import CountryDetail from './pages/CountryDetail'
import Management from './pages/Management'
import Professionals from './pages/Professionals'
import Blog from './pages/Blog'
import SustainableGrowth from './pages/SustainableGrowth'
import CommunityCare from './pages/CommunityCare'
import CareersPage from './pages/CareersPage'
import AboutUs from './pages/AboutUs'
import OurStory from './pages/OurStory'
import OmanPresence from './pages/OmanPresence'
import ContactGlobal from './pages/ContactGlobal'
import LeadershipOverview from './pages/LeadershipOverview'
import CommunityOverview from './pages/CommunityOverview'
import Testimonials from './pages/Testimonials'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageWatermark />
      <TopBar />
      <Navbar />
      <main className="flex-1 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/:slug" element={<BusinessDetail />} />
          <Route path="/business/:slug/:subSlug" element={<SubServiceDetail />} />
          <Route path="/country/:code" element={<CountryDetail />} />
          <Route path="/global-presence/scroll" element={<OmanPresence />} />
          <Route path="/global-presence/:code" element={<CountryDetail />} />

          {/* Clean country aliases — same page, prettier URLs. */}
          <Route path="/oman"       element={<CountryDetail codeOverride="OM" />} />
          <Route path="/uk"         element={<CountryDetail codeOverride="GB" />} />
          <Route path="/bangladesh" element={<CountryDetail codeOverride="BD" />} />
          <Route path="/usa"        element={<CountryDetail codeOverride="US" />} />
          <Route path="/contact" element={<ContactGlobal />} />
          <Route path="/leadership" element={<LeadershipOverview />} />
          <Route path="/leadership/management" element={<Management />} />
          <Route path="/leadership/professionals" element={<Professionals />} />
          <Route path="/community" element={<CommunityOverview />} />
          <Route path="/community/blog" element={<Blog />} />
          <Route path="/community/sustainable-growth" element={<SustainableGrowth />} />
          <Route path="/community/community-care" element={<CommunityCare />} />
          <Route path="/community/careers" element={<CareersPage />} />
          <Route path="/community/testimonials" element={<Testimonials />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about/our-story" element={<OurStory />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <SocialFloat />
    </div>
  )
}

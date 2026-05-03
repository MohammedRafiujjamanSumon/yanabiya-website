import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageWatermark from './components/PageWatermark'
import SocialFloat from './components/SocialFloat'

import Home from './pages/Home'
import BusinessDetail from './pages/BusinessDetail'
import SubServiceDetail from './pages/SubServiceDetail'
import CountryDetail from './pages/CountryDetail'
import CountryOperations from './pages/CountryOperations'
import Management from './pages/Management'
import Professionals from './pages/Professionals'
import DepartmentHeads from './pages/DepartmentHeads'
import Blog from './pages/Blog'
import SustainableGrowth from './pages/SustainableGrowth'
import CommunityCare from './pages/CommunityCare'
import CareersPage from './pages/CareersPage'
import AboutUs from './pages/AboutUs'
import OurStory from './pages/OurStory'
import OmanPresence from './pages/OmanPresence'
import ContactGlobal from './pages/ContactGlobal'
import ExecutionEngine from './pages/ExecutionEngine'
import CountryManagement from './pages/CountryManagement'
import Board from './pages/Board'
import Executive from './pages/Executive'
import CountriesOverview from './pages/CountriesOverview'
import DistributionDetail from './pages/DistributionDetail'
import CommunityOverview from './pages/CommunityOverview'
import Testimonials from './pages/Testimonials'

// ── Admin Panel ──────────────────────────────────────────────────────────────
import { AuthProvider } from './admin/context/AuthContext'
import ProtectedRoute from './admin/components/ProtectedRoute'
import AdminLogin from './admin/pages/Login'
import AdminDashboard from './admin/pages/Dashboard'
import ContactEdit from './admin/pages/sections/ContactEdit'
import PartnersEdit from './admin/pages/sections/PartnersEdit'
import HeroEdit from './admin/pages/sections/HeroEdit'
import HeroScenesEdit from './admin/pages/sections/HeroScenesEdit'
import AboutEdit from './admin/pages/sections/AboutEdit'
import CompanyEdit from './admin/pages/sections/CompanyEdit'
import NavbarEdit from './admin/pages/sections/NavbarEdit'
import FooterEdit from './admin/pages/sections/FooterEdit'
import ServicesEdit from './admin/pages/sections/ServicesEdit'
import LeadershipEdit from './admin/pages/sections/LeadershipEdit'
import BlogEdit from './admin/pages/sections/BlogEdit'
import CareersEdit from './admin/pages/sections/CareersEdit'
import TestimonialsEdit from './admin/pages/sections/TestimonialsEdit'
import SettingsEdit from './admin/pages/sections/SettingsEdit'
import CountryPagesEdit from './admin/pages/sections/CountryPagesEdit'
import MediaLibrary from './admin/pages/MediaLibrary'
import PageHeroesEdit from './admin/pages/sections/PageHeroesEdit'

function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login"        element={<AdminLogin />} />
        <Route path=""             element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="contact"      element={<ProtectedRoute><ContactEdit /></ProtectedRoute>} />
        <Route path="partners"     element={<ProtectedRoute><PartnersEdit /></ProtectedRoute>} />
        <Route path="hero"         element={<ProtectedRoute><HeroEdit /></ProtectedRoute>} />
        <Route path="hero-scenes"  element={<ProtectedRoute><HeroScenesEdit /></ProtectedRoute>} />
        <Route path="about"        element={<ProtectedRoute><AboutEdit /></ProtectedRoute>} />
        <Route path="company"      element={<ProtectedRoute><CompanyEdit /></ProtectedRoute>} />
        <Route path="navbar"       element={<ProtectedRoute><NavbarEdit /></ProtectedRoute>} />
        <Route path="footer"       element={<ProtectedRoute><FooterEdit /></ProtectedRoute>} />
        <Route path="services"     element={<ProtectedRoute><ServicesEdit /></ProtectedRoute>} />
        <Route path="leadership"   element={<ProtectedRoute><LeadershipEdit /></ProtectedRoute>} />
        <Route path="blog"         element={<ProtectedRoute><BlogEdit /></ProtectedRoute>} />
        <Route path="careers"      element={<ProtectedRoute><CareersEdit /></ProtectedRoute>} />
        <Route path="testimonials"   element={<ProtectedRoute><TestimonialsEdit /></ProtectedRoute>} />
        <Route path="settings"       element={<ProtectedRoute><SettingsEdit /></ProtectedRoute>} />
        <Route path="country-pages"  element={<ProtectedRoute><CountryPagesEdit /></ProtectedRoute>} />
        <Route path="page-heroes"    element={<ProtectedRoute><PageHeroesEdit /></ProtectedRoute>} />
        <Route path="media"          element={<ProtectedRoute><MediaLibrary /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default function App() {
  return (
    <Routes>
      {/* ── Admin (no Navbar/Footer) ────────────────────────────────────── */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* ── Public site ────────────────────────────────────────────────── */}
      <Route path="*" element={
        <div className="min-h-screen flex flex-col">
          <PageWatermark />
          <Navbar />
          <main className="flex-1 relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/business/:slug" element={<BusinessDetail />} />
              <Route path="/business/:slug/:subSlug" element={<SubServiceDetail />} />

              <Route path="/country/bd" element={<CountryOperations codeOverride="BD" />} />
              <Route path="/global-presence/bd" element={<CountryOperations codeOverride="BD" />} />
              <Route path="/country/om" element={<CountryOperations codeOverride="OM" />} />
              <Route path="/global-presence/om" element={<CountryOperations codeOverride="OM" />} />
              <Route path="/country/gb" element={<CountryOperations codeOverride="GB" />} />
              <Route path="/global-presence/gb" element={<CountryOperations codeOverride="GB" />} />
              <Route path="/country/us" element={<CountryOperations codeOverride="US" />} />
              <Route path="/global-presence/us" element={<CountryOperations codeOverride="US" />} />

              <Route path="/country/:code" element={<CountryDetail />} />
              <Route path="/global-presence/scroll" element={<OmanPresence />} />
              <Route path="/global-presence/:code" element={<CountryDetail />} />

              <Route path="/oman"       element={<CountryOperations codeOverride="OM" />} />
              <Route path="/uk"         element={<CountryOperations codeOverride="GB" />} />
              <Route path="/bangladesh" element={<CountryOperations codeOverride="BD" />} />
              <Route path="/usa"        element={<CountryOperations codeOverride="US" />} />
              <Route path="/contact" element={<ContactGlobal />} />
              <Route path="/leadership/board" element={<Board />} />
              <Route path="/leadership/executive" element={<Executive />} />
              <Route path="/leadership/countries" element={<CountriesOverview />} />
              <Route path="/leadership/distributed/:slug" element={<DistributionDetail />} />
              <Route path="/leadership/execution-engine" element={<ExecutionEngine />} />
              <Route path="/leadership/country/:code" element={<CountryManagement />} />
              <Route path="/leadership/management" element={<Management />} />
              <Route path="/leadership/professionals" element={<Professionals />} />
              <Route path="/leadership/departments" element={<DepartmentHeads />} />
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
      } />
    </Routes>
  )
}

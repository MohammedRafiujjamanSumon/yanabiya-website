import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageWatermark from './components/PageWatermark'
import SocialFloat from './components/SocialFloat'

import Home from './pages/Home'
import BusinessDetail from './pages/BusinessDetail'
import SubServiceDetail from './pages/SubServiceDetail'
import CountryDetail from './pages/CountryDetail'
import CountryOperations from './pages/CountryOperations'
import Blog from './pages/Blog'
import SustainableGrowth from './pages/SustainableGrowth'
import CommunityCare from './pages/CommunityCare'
import CareersPage from './pages/CareersPage'
import AboutUs from './pages/AboutUs'
import OurStory from './pages/OurStory'
import ContactGlobal from './pages/ContactGlobal'
import ContactCountry from './pages/ContactCountry'
import PersonPage from './pages/PersonPage'
import PeoplePage from './pages/PeoplePage'
import CeoPage from './pages/CeoPage'
import ViceChairmanPage from './pages/ViceChairmanPage'
import BoardPage from './pages/BoardPage'
import DepartmentsPage from './pages/DepartmentsPage'
import DepartmentCountryPage from './pages/DepartmentCountryPage'
import Testimonials from './pages/Testimonials'
import Donation from './pages/Donation'

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
import PeopleEdit from './admin/pages/sections/PeopleEdit'
import BranchesEdit from './admin/pages/sections/BranchesEdit'
import LogoEdit from './admin/pages/sections/LogoEdit'
import DonationEdit from './admin/pages/sections/DonationEdit'
import CommunityPagesEdit from './admin/pages/sections/CommunityPagesEdit'
import NetworkEdit from './admin/pages/sections/NetworkEdit'
import CommunityHubsEdit from './admin/pages/sections/CommunityHubsEdit'
import AboutPageEdit from './admin/pages/sections/AboutPageEdit'
import OurStoryEdit from './admin/pages/sections/OurStoryEdit'
import PagesManager from './admin/pages/PagesManager'
import PageEditor from './admin/pages/PageEditor'
import LanguageEdit from './admin/pages/sections/LanguageEdit'
import MessagesEdit from './admin/pages/sections/MessagesEdit'
import DynamicPage from './pages/DynamicPage'

// ── Management Hub Pages ──────────────────────────────────────────────────────
import HomeManagement from './admin/pages/HomeManagement'
import AboutManagement from './admin/pages/AboutManagement'
import ServiceManagement from './admin/pages/ServiceManagement'
import BranchesManagement from './admin/pages/BranchesManagement'
import NetworkManagement from './admin/pages/NetworkManagement'
import CommunityManagement from './admin/pages/CommunityManagement'
import PeopleManagement from './admin/pages/PeopleManagement'
import GlobalManagement from './admin/pages/GlobalManagement'

// ── New Section Editors ───────────────────────────────────────────────────────
import SEOEdit from './admin/pages/sections/SEOEdit'
import GalleryEdit from './admin/pages/sections/GalleryEdit'
import CTASectionEdit from './admin/pages/sections/CTASectionEdit'
import StatsEdit from './admin/pages/sections/StatsEdit'
import SocialEdit from './admin/pages/sections/SocialEdit'
import MissionVisionEdit from './admin/pages/sections/MissionVisionEdit'
import FAQsEdit from './admin/pages/sections/FAQsEdit'
import CmsGroupPage from './admin/pages/CmsGroupPage'
import AIVideoStudio from './admin/pages/AIVideoStudio'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

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
        <Route path="people"         element={<ProtectedRoute><PeopleEdit /></ProtectedRoute>} />
        <Route path="branches"       element={<ProtectedRoute><BranchesEdit /></ProtectedRoute>} />
        <Route path="logo"           element={<ProtectedRoute><LogoEdit /></ProtectedRoute>} />
        <Route path="donation"       element={<ProtectedRoute><DonationEdit /></ProtectedRoute>} />
        <Route path="community-pages" element={<ProtectedRoute><CommunityPagesEdit /></ProtectedRoute>} />
        <Route path="network"         element={<ProtectedRoute><NetworkEdit /></ProtectedRoute>} />
        <Route path="community-hubs"  element={<ProtectedRoute><CommunityHubsEdit /></ProtectedRoute>} />
        <Route path="about-page"      element={<ProtectedRoute><AboutPageEdit /></ProtectedRoute>} />
        <Route path="our-story"       element={<ProtectedRoute><OurStoryEdit /></ProtectedRoute>} />
        <Route path="pages"           element={<ProtectedRoute><PagesManager /></ProtectedRoute>} />
        <Route path="pages/:slug"     element={<ProtectedRoute><PageEditor /></ProtectedRoute>} />
        <Route path="language"        element={<ProtectedRoute><LanguageEdit /></ProtectedRoute>} />
        <Route path="messages"        element={<ProtectedRoute><MessagesEdit /></ProtectedRoute>} />

        {/* ── Management Hub Pages ─────────────────────────────────────── */}
        <Route path="home"            element={<ProtectedRoute><HomeManagement /></ProtectedRoute>} />
        <Route path="about-us"        element={<ProtectedRoute><AboutManagement /></ProtectedRoute>} />
        <Route path="our-services"    element={<ProtectedRoute><ServiceManagement /></ProtectedRoute>} />
        <Route path="our-branches"    element={<ProtectedRoute><BranchesManagement /></ProtectedRoute>} />
        <Route path="our-network"     element={<ProtectedRoute><NetworkManagement /></ProtectedRoute>} />
        <Route path="our-community"   element={<ProtectedRoute><CommunityManagement /></ProtectedRoute>} />
        <Route path="our-people"      element={<ProtectedRoute><PeopleManagement /></ProtectedRoute>} />
        <Route path="global-hub"      element={<ProtectedRoute><GlobalManagement /></ProtectedRoute>} />

        {/* ── New Section Editors ──────────────────────────────────────── */}
        <Route path="seo/:page"       element={<ProtectedRoute><SEOEdit /></ProtectedRoute>} />
        <Route path="gallery/:key"    element={<ProtectedRoute><GalleryEdit /></ProtectedRoute>} />
        <Route path="cta/:section"    element={<ProtectedRoute><CTASectionEdit /></ProtectedRoute>} />
        <Route path="stats/:key"      element={<ProtectedRoute><StatsEdit /></ProtectedRoute>} />
        <Route path="social"          element={<ProtectedRoute><SocialEdit /></ProtectedRoute>} />
        <Route path="mission-vision"  element={<ProtectedRoute><MissionVisionEdit /></ProtectedRoute>} />
        <Route path="faqs"            element={<ProtectedRoute><FAQsEdit /></ProtectedRoute>} />
        <Route path="group/:section/:group" element={<ProtectedRoute><CmsGroupPage /></ProtectedRoute>} />
        <Route path="ai-video"             element={<ProtectedRoute><AIVideoStudio /></ProtectedRoute>} />

        <Route path="*"               element={<Navigate to="/admin" replace />} />
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
          <ScrollToTop />
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
              <Route path="/global-presence/:code" element={<CountryDetail />} />

              <Route path="/oman"       element={<CountryOperations codeOverride="OM" />} />
              <Route path="/uk"         element={<CountryOperations codeOverride="GB" />} />
              <Route path="/bangladesh" element={<CountryOperations codeOverride="BD" />} />
              <Route path="/usa"        element={<CountryOperations codeOverride="US" />} />
              <Route path="/contact" element={<ContactGlobal />} />
              <Route path="/contact/:code" element={<ContactCountry />} />
              <Route path="/people/ceo" element={<CeoPage />} />
              <Route path="/people/vice-chairman" element={<ViceChairmanPage />} />
              <Route path="/people/board" element={<BoardPage />} />
              <Route path="/people/executive" element={<PeoplePage slug="executive" />} />
              <Route path="/people/accounts" element={<PeoplePage slug="accounts" />} />
              <Route path="/people/departments" element={<DepartmentsPage />} />
              <Route path="/people/departments/:country" element={<DepartmentCountryPage />} />
              <Route path="/people/:id" element={<PersonPage />} />
              <Route path="/community/blog" element={<Blog />} />
              <Route path="/community/sustainable-growth" element={<SustainableGrowth />} />
              <Route path="/community/community-care" element={<CommunityCare />} />
              <Route path="/community/careers" element={<CareersPage />} />
              <Route path="/community/testimonials" element={<Testimonials />} />
              <Route path="/community/donation" element={<Donation />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/about/our-story" element={<OurStory />} />
              <Route path="/p/:slug" element={<DynamicPage />} />
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

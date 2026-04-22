import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import MobilePreview from './components/MobilePreview'

import Home from './pages/Home'
import BusinessDetail from './pages/BusinessDetail'
import CountryDetail from './pages/CountryDetail'

export default function App() {
  const isPreviewIframe =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === 'mobile'

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/:slug" element={<BusinessDetail />} />
          <Route path="/country/:code" element={<CountryDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      {!isPreviewIframe && <MobilePreview />}
    </div>
  )
}

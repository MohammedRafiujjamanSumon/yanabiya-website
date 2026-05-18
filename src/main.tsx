import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './i18n'
import './index.css'
import { preloadCriticalAssets } from './lib/preloadAssets'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// Warm the browser image cache for all critical site assets (logos, people
// photos, flags) so navigation between sections is instant. Runs after first
// paint (idle callback) so it doesn't compete with the initial render.
preloadCriticalAssets()

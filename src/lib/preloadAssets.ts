/**
 * Eagerly fetch all critical site images so they're in browser cache before
 * the user navigates to a section that uses them. Fires once at app boot,
 * non-blocking — uses requestIdleCallback to avoid competing with first paint.
 */

const CRITICAL_PATHS = [
  // Brand
  '/images/logo.png',

  // People (Leadership pyramid + Board)
  '/images/chairman.jpg',
  '/images/vice-chairman.jpg',
  '/images/people/momim-ahmed.jpg',
  '/images/people/sumon-ahmed.jpg',
  '/images/people/jhohora-akter.jpg',
  '/images/people/jannatul.jpg',
  '/images/people/maysa-yeasmin.jpg',
  '/images/people/al-montasar.jpg',
  '/images/people/khalid-sulaimani.jpg',
  '/images/people/jasmin-akter.jpg',
  '/images/people/maheswaran.jpg',
  '/images/people/mofijur-khan.jpg',
  '/images/people/mohammed-rashid.jpg',
  '/images/people/ahsan-sabbir.jpg',
  '/images/people/sufean-ahmed.jpg',
  '/images/people/badar-al-shaqsi.jpg',
  '/images/people/ismail-sulaimani.jpg',
  '/images/people/mohammed-al-bakri.jpg',
  '/images/people/salim-suleimani.jpg',

  // About / office
  '/images/about-office.jpg',
  '/images/management-event.jpg',

  // Country flags (used across hero/footer/contact/global)
  '/maps/flags/om.svg',
  '/maps/flags/gb.svg',
  '/maps/flags/bd.svg',
  '/maps/flags/us.svg',
  '/maps/om.svg',
  '/maps/gb.svg',
  '/maps/us.svg',
]

function preloadOne(src: string) {
  // Use Image() constructor — browser fetches into HTTP cache without rendering
  const img = new Image()
  img.decoding = 'async'
  img.loading = 'eager'
  img.src = src
}

export function preloadCriticalAssets() {
  if (typeof window === 'undefined') return

  const run = () => {
    CRITICAL_PATHS.forEach(preloadOne)
  }

  // Wait for first paint; use idle time so we don't compete with critical render
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback
  if (typeof ric === 'function') {
    ric(run)
  } else {
    setTimeout(run, 300)
  }
}

/**
 * Preload partner / client logo collections (fires lazily — only when user
 * scrolls near a section that uses them). Optional; expand as needed.
 */
export function preloadCategory(category: 'partners' | 'clients' | 'uk-clients') {
  if (typeof window === 'undefined') return
  // Indexes — adjust if you add files
  const counts = { partners: 8, clients: 8, 'uk-clients': 8 }
  for (let i = 1; i <= counts[category]; i++) {
    preloadOne(`/logos/${category}/${i}.png`)
  }
}

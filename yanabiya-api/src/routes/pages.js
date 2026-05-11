const router = require('express').Router()
const { savePage, getPage, listPages, deletePage, renamePage } = require('../models/Page')
const protect = require('../middleware/auth')
const { randomUUID } = require('crypto')

// GET /api/pages — list all pages (admin)
router.get('/', protect, (req, res) => {
  res.json(listPages())
})

// GET /api/pages/published — list published pages (public, for nav building)
router.get('/published', (req, res) => {
  res.json(listPages().filter(p => p.status === 'published'))
})

// GET /api/pages/:slug — get single page with sections (public)
router.get('/:slug', (req, res) => {
  const page = getPage(req.params.slug)
  if (!page) return res.status(404).json({ message: 'Page not found' })
  // Only return published pages to public (admins get all via /api/pages with auth)
  if (page.status !== 'published') {
    const auth = req.headers.authorization
    if (!auth) return res.status(404).json({ message: 'Page not found' })
  }
  res.json(page)
})

// POST /api/pages — create new page
router.post('/', protect, (req, res) => {
  const { slug, title, metaTitle, metaDescription, status, parentSlug, template, heroImage } = req.body
  if (!slug || !title) return res.status(400).json({ message: 'slug and title are required' })
  // Validate slug: only lowercase letters, numbers, hyphens
  if (!/^[a-z0-9-]+$/.test(slug)) return res.status(400).json({ message: 'Slug must be lowercase letters, numbers, and hyphens only' })
  // Check if slug already exists
  if (getPage(slug)) return res.status(409).json({ message: 'A page with this slug already exists' })
  const page = savePage(slug, { title, metaTitle, metaDescription, status: status || 'draft', parentSlug, template, heroImage, sections: [] })
  res.status(201).json(page)
})

// PUT /api/pages/:slug — update page metadata
router.put('/:slug', protect, (req, res) => {
  const existing = getPage(req.params.slug)
  if (!existing) return res.status(404).json({ message: 'Page not found' })
  const { title, metaTitle, metaDescription, status, parentSlug, template, heroImage, newSlug } = req.body

  // If slug is being changed
  if (newSlug && newSlug !== req.params.slug) {
    if (!/^[a-z0-9-]+$/.test(newSlug)) return res.status(400).json({ message: 'Invalid slug format' })
    if (getPage(newSlug)) return res.status(409).json({ message: 'Slug already taken' })
    const renamed = renamePage(req.params.slug, newSlug)
    const updated = savePage(newSlug, { ...renamed, title: title || renamed.title, metaTitle, metaDescription, status, parentSlug, template, heroImage })
    return res.json(updated)
  }

  const updated = savePage(req.params.slug, { ...existing, title: title ?? existing.title, metaTitle: metaTitle ?? existing.metaTitle, metaDescription: metaDescription ?? existing.metaDescription, status: status ?? existing.status, parentSlug: parentSlug !== undefined ? parentSlug : existing.parentSlug, template: template ?? existing.template, heroImage: heroImage ?? existing.heroImage })
  res.json(updated)
})

// DELETE /api/pages/:slug
router.delete('/:slug', protect, (req, res) => {
  const page = getPage(req.params.slug)
  if (!page) return res.status(404).json({ message: 'Page not found' })
  deletePage(req.params.slug)
  res.json({ message: 'Page deleted' })
})

// ── Section management ──────────────────────────────────────────────────────

// PUT /api/pages/:slug/sections — replace all sections (for drag-drop reorder + bulk save)
router.put('/:slug/sections', protect, (req, res) => {
  const page = getPage(req.params.slug)
  if (!page) return res.status(404).json({ message: 'Page not found' })
  const { sections } = req.body
  if (!Array.isArray(sections)) return res.status(400).json({ message: 'sections must be an array' })
  const updated = savePage(req.params.slug, { ...page, sections })
  res.json(updated)
})

// POST /api/pages/:slug/sections — add a new section
router.post('/:slug/sections', protect, (req, res) => {
  const page = getPage(req.params.slug)
  if (!page) return res.status(404).json({ message: 'Page not found' })
  const { type, data } = req.body
  if (!type) return res.status(400).json({ message: 'section type is required' })
  const section = { id: randomUUID(), type, order: page.sections.length, visible: true, data: data || defaultSectionData(type) }
  const sections = [...page.sections, section]
  const updated = savePage(req.params.slug, { ...page, sections })
  res.status(201).json(updated)
})

// PUT /api/pages/:slug/sections/:sectionId — update a single section
router.put('/:slug/sections/:sectionId', protect, (req, res) => {
  const page = getPage(req.params.slug)
  if (!page) return res.status(404).json({ message: 'Page not found' })
  const sections = page.sections.map(s => s.id === req.params.sectionId ? { ...s, ...req.body, id: s.id } : s)
  const updated = savePage(req.params.slug, { ...page, sections })
  res.json(updated)
})

// DELETE /api/pages/:slug/sections/:sectionId — delete a section
router.delete('/:slug/sections/:sectionId', protect, (req, res) => {
  const page = getPage(req.params.slug)
  if (!page) return res.status(404).json({ message: 'Page not found' })
  const sections = page.sections.filter(s => s.id !== req.params.sectionId)
  const updated = savePage(req.params.slug, { ...page, sections })
  res.json(updated)
})

function defaultSectionData(type) {
  const defaults = {
    hero: { heading: 'New Hero Section', subheading: 'Add your subtitle here', buttonLabel: 'Get Started', buttonHref: '#', backgroundImage: '', overlay: true },
    text: { heading: 'Section Title', body: '<p>Add your content here. This is a rich text section.</p>', alignment: 'left' },
    cards: { heading: 'Our Services', subheading: 'What we offer', columns: 3, cards: [{ id: '1', title: 'Card 1', body: 'Card description', icon: '', image: '', link: '' }, { id: '2', title: 'Card 2', body: 'Card description', icon: '', image: '', link: '' }, { id: '3', title: 'Card 3', body: 'Card description', icon: '', image: '', link: '' }] },
    cta: { heading: 'Ready to get started?', subheading: 'Contact us today', primaryLabel: 'Get Started', primaryHref: '/contact', secondaryLabel: 'Learn More', secondaryHref: '#', background: 'brand' },
    stats: { heading: 'Our Impact', stats: [{ value: '500+', label: 'Clients' }, { value: '4', label: 'Countries' }, { value: '15Y', label: 'Experience' }, { value: '99%', label: 'Satisfaction' }] },
    gallery: { heading: 'Gallery', columns: 3, images: [] },
    faq: { heading: 'Frequently Asked Questions', items: [{ id: '1', question: 'What services do you offer?', answer: 'We offer a wide range of services...' }, { id: '2', question: 'How can I contact you?', answer: 'You can reach us at...' }] },
    testimonials: { heading: 'What Our Clients Say', items: [{ id: '1', quote: 'Excellent service!', author: 'John Doe', role: 'CEO, Company', rating: 5 }] },
    team: { heading: 'Our Team', members: [{ id: '1', name: 'Team Member', role: 'Position', photo: '', bio: '' }] },
    contact: { heading: 'Get In Touch', subheading: 'We\'d love to hear from you', email: 'info@yanabiyagroup.com', phone: '+968 XXXX XXXX', address: '' },
    spacer: { height: 60 },
    html: { content: '<div></div>' },
  }
  return defaults[type] || {}
}

module.exports = router

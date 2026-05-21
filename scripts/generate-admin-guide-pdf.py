#!/usr/bin/env python3
"""Generate Yanabiya Admin Panel → Frontend mapping guide as PDF."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether,
)

# ─── Brand colours ────────────────────────────────────────────────────────────
BRAND_DEEP   = HexColor("#0f3823")
BRAND_ACCENT = HexColor("#9ec73a")
BRAND_DARK   = HexColor("#1e293b")
BG_GREY      = HexColor("#f1f5f9")
SUBTLE       = HexColor("#64748b")

# ─── Styles ───────────────────────────────────────────────────────────────────
ss = getSampleStyleSheet()

title_style = ParagraphStyle(
    'title', parent=ss['Heading1'],
    fontSize=24, textColor=BRAND_DEEP, leading=28,
    spaceAfter=4, alignment=TA_LEFT,
    fontName='Helvetica-Bold',
)
subtitle_style = ParagraphStyle(
    'subtitle', parent=ss['Normal'],
    fontSize=10, textColor=SUBTLE, leading=14,
    spaceAfter=18, fontName='Helvetica',
)
h2_style = ParagraphStyle(
    'h2', parent=ss['Heading2'],
    fontSize=15, textColor=BRAND_DEEP, leading=20,
    spaceBefore=16, spaceAfter=6, fontName='Helvetica-Bold',
)
section_box_style = ParagraphStyle(
    'section_box', parent=ss['Normal'],
    fontSize=13, textColor=white, leading=18,
    fontName='Helvetica-Bold', leftIndent=8, alignment=TA_LEFT,
)
body_style = ParagraphStyle(
    'body', parent=ss['Normal'],
    fontSize=9.5, leading=14, textColor=BRAND_DARK,
    fontName='Helvetica', alignment=TA_LEFT,
)
hint_style = ParagraphStyle(
    'hint', parent=ss['Normal'],
    fontSize=8.5, leading=12, textColor=SUBTLE,
    fontName='Helvetica-Oblique', alignment=TA_LEFT,
)
mono_style = ParagraphStyle(
    'mono', parent=ss['Normal'],
    fontSize=8.5, leading=12, textColor=BRAND_DEEP,
    fontName='Courier', alignment=TA_LEFT,
)

# ─── Map: admin option → what it controls on the frontend ─────────────────────
SECTIONS = [
    {
        'title': 'Quick Tools (Top of Sidebar)',
        'color': '#7c3aed',
        'rows': [
            ('Dashboard', '/admin', 'Overview of all CMS sections. Click any card to jump to its editor. Shows recent edits, unread messages, and quick stats.', 'No direct frontend impact — info only'),
            ('Live Chat', '/admin/chat', 'See and reply to customer chats in real-time. Each visitor session shown in left sidebar; click to open conversation. Type & press Enter to reply.', 'Chat appears in the floating bottom-right chat widget on every public page'),
            ('AI Video Studio', '/admin/ai-video', 'Generate AI videos from text prompt OR upload videos made elsewhere (CapCut, Colab). Click "Set as Hero Background" to instantly use uploaded video on homepage.', 'Sets the background video that plays in the Hero section (top of homepage)'),
        ],
    },
    {
        'title': 'Home Management',
        'color': '#0ea5e9',
        'subtitle': 'Controls everything on the homepage (yanabiyagroup.com /)',
        'rows': [
            ('Hero Section',     '/admin/group/home/hero', 'Edit the main banner: headline, subheadline, background video, stats numbers.', 'Top section of homepage — large banner with video background'),
            ('About Preview',    '/admin/about', 'Short intro paragraph, tagline, and Mission/Vision/Goal cards.', 'Section right below the Hero on homepage'),
            ('Services Preview', '/admin/group/home/services-preview', 'Configure how the 6 service cards display on the homepage.', '"Our Services" section with 6 cards (IT, Export, Manpower etc.)'),
            ('Branch Preview',   '/admin/group/home/branch-preview', 'Configure the global presence section on homepage.', '"Our Global Branches" section showing 4 countries'),
            ('Statistics',       '/admin/group/home/stats', 'Edit homepage stats: countries, partners, employees, years.', 'Number tiles between sections on the homepage'),
            ('Testimonials',     '/admin/group/home/testimonials', 'Manage client testimonials displayed on homepage.', '"Trusted Network" / testimonials slider on homepage'),
            ('CTA Sections',     '/admin/group/home/cta', 'Edit the Call-To-Action banners (Become Partner, Join Team).', 'Green/dark CTA banners between sections'),
            ('SEO Settings',     '/admin/group/home/seo', 'Page title, meta description, Open Graph image.', 'Browser tab title + Google search preview'),
        ],
    },
    {
        'title': 'About Us Management',
        'color': '#10b981',
        'subtitle': 'Controls the /about page',
        'rows': [
            ('Hero Banner',      '/admin/page-heroes', 'Top banner image and title of the About page.', 'Top of /about page'),
            ('Company Overview', '/admin/about-page', 'Long-form company description, history, key facts.', '/about page main content area'),
            ('Mission & Vision', '/admin/group/about-us/mission-vision', 'Edit Mission, Vision, and Core Values text.', '/about page Mission/Vision card grid'),
            ('CEO Message',      '/admin/leadership', 'Chairman/CEO photo, name, role, and full message.', '/people/ceo page + homepage leadership pyramid'),
            ('Timeline',         '/admin/group/about-us/timeline', 'Year-by-year company history milestones.', '/about/our-story page timeline'),
            ('Gallery',          '/admin/group/about-us/gallery', 'Photo gallery for About page.', '/about page photo grid'),
            ('Statistics',       '/admin/group/about-us/stats', 'About page-specific stats.', '/about page stats section'),
            ('CTA Section',      '/admin/group/about-us/cta', 'Bottom CTA on About page.', 'Green banner at bottom of /about'),
            ('SEO Settings',     '/admin/group/about-us/seo', 'Page title + meta tags for /about.', 'Browser tab + Google preview for /about'),
        ],
    },
    {
        'title': 'Our Service Management',
        'color': '#8b5cf6',
        'subtitle': 'Controls all service-related pages (/business/*)',
        'rows': [
            ('Hero Banner',        '/admin/group/our-services/hero', 'Top banner image and headline.', 'Top of /business/* pages'),
            ('Service Categories', '/admin/services', 'Edit the 6 main service categories (IT, Export, Clothing, Agents, Office, Manpower) — title, description, image, features.', '"Our Services" cards on homepage + /business/[slug] detail pages'),
            ('Service Cards',      '/admin/group/our-services/service-cards', 'Sub-service cards under each main service.', '/business/[slug]/[sub-slug] detail pages'),
            ('Pricing',            '/admin/group/our-services/pricing', 'Pricing info for services (when applicable).', 'Pricing tables on service pages'),
            ('FAQs',               '/admin/group/our-services/faqs', 'Frequently asked questions.', 'FAQ accordion on service pages'),
            ('CTA Sections',       '/admin/group/our-services/cta', 'Conversion banners for services.', 'CTA banners between service sections'),
            ('SEO Settings',       '/admin/group/our-services/seo', 'Service page meta tags.', 'Search engine result preview for service pages'),
        ],
    },
    {
        'title': 'Our Global Branches Management',
        'color': '#14b8a6',
        'subtitle': 'Controls /contact and country-specific pages',
        'rows': [
            ('Hero Banner',         '/admin/page-heroes', 'Top banner of /contact page.', 'Top of /contact and /country/* pages'),
            ('Countries',           '/admin/country-pages', 'Add/edit content for each of the 4 country pages (Oman, UK, USA, Bangladesh).', '/country/om, /country/gb, /country/us, /country/bd pages'),
            ('Branch Offices',      '/admin/group/our-branches/offices', 'Detailed office info per country.', 'Office detail cards on country pages'),
            ('Maps',                '/admin/group/our-branches/maps', 'Map embed URLs and coordinates.', 'World map on /contact + country pages'),
            ('Contact Information', '/admin/contact', 'IMPORTANT — Phone, email, address, working hours for ALL 4 countries.', 'Slide-in panel on /contact page + Footer per-country card on every page'),
            ('Regional Managers',   '/admin/group/our-branches/regional-managers', 'Country lead/manager profiles.', 'Country page leadership section'),
            ('Gallery',             '/admin/group/our-branches/gallery', 'Office photos per country.', 'Country page photo gallery'),
            ('Statistics',          '/admin/group/our-branches/stats', 'Country-specific stats.', 'Country page stats tiles'),
            ('SEO Settings',        '/admin/group/our-branches/seo', 'Meta tags for branch pages.', 'Google preview for /contact and /country pages'),
        ],
    },
    {
        'title': 'Our Network Management',
        'color': '#f97316',
        'subtitle': 'Controls /partnerships page + partner/client logos',
        'rows': [
            ('Hero Banner',     '/admin/page-heroes', 'Top of partnerships page.', 'Top of /partnerships page'),
            ('Partners',        '/admin/group/our-network/partners', 'Strategic partner companies (AWS, Microsoft, Oracle, etc.) — logos + descriptions.', '"Our Network" partner logo grid'),
            ('Network Cards',   '/admin/group/our-network/network-cards', 'Network category cards.', '/partnerships category grid'),
            ('Collaborations',  '/admin/group/our-network/collaborations', 'Collaboration case studies.', 'Featured collaborations section'),
            ('Logos',           '/admin/group/our-network/logos', 'Bulk-edit client/partner logos.', 'All logo strips across the site'),
            ('CTA Section',     '/admin/group/our-network/cta', 'Become a partner CTA.', 'Bottom of /partnerships'),
            ('SEO Settings',    '/admin/group/our-network/seo', 'Meta tags for partnerships page.', 'Google preview for /partnerships'),
        ],
    },
    {
        'title': 'Our Community Management',
        'color': '#f43f5e',
        'subtitle': 'Controls /community/* pages and CSR content',
        'rows': [
            ('Hero Banner',          '/admin/page-heroes', 'Top of community pages.', 'Top of /community/* pages'),
            ('Community Programs',   '/admin/group/our-community/programs', 'CSR programs (Welfare, Education, Housing, etc.).', '/community/community-care program cards'),
            ('Events',               '/admin/group/our-community/events', 'Upcoming events and activities.', '/community events listing'),
            ('Gallery',              '/admin/group/our-community/gallery', 'Event/community photos.', '/community photo grid'),
            ('Testimonials',         '/admin/group/our-community/testimonials', 'Beneficiary testimonials.', 'Community page testimonials'),
            ('Community Statistics', '/admin/group/our-community/stats', 'Impact numbers (people helped, etc.).', 'Community impact stats tiles'),
            ('CTA Sections',         '/admin/group/our-community/cta', 'Donate / Get Involved banners.', 'CTA on community pages'),
            ('SEO Settings',         '/admin/group/our-community/seo', 'Meta tags for community pages.', 'Google preview for /community pages'),
        ],
    },
    {
        'title': 'Our People Management',
        'color': '#f59e0b',
        'subtitle': 'Controls /people/* pages — leadership and team',
        'rows': [
            ('Hero Banner',     '/admin/page-heroes', 'Top of people pages.', 'Top of /people/* pages'),
            ('Leadership Team', '/admin/group/our-people/leadership', 'Chairman, CEO, Vice Chairman bios + photos.', '/people/board page + Leadership Pyramid on homepage'),
            ('Team Members',    '/admin/group/our-people/team', 'Global executive management team.', '/people/executive page (Co-Founders, CTO, CFO, etc.)'),
            ('Departments',     '/admin/group/our-people/departments', 'Department list and structure.', '/people/departments page'),
            ('Employee Cards',  '/admin/group/our-people/employee-cards', 'Individual employee profile cards.', 'Team grid on people pages'),
            ('Achievements',    '/admin/group/our-people/achievements', 'Awards, certifications, recognitions.', 'Achievements section on /about'),
            ('Gallery',         '/admin/group/our-people/gallery', 'Team photos and events.', 'Photo grid on /people pages'),
            ('SEO Settings',    '/admin/group/our-people/seo', 'Meta tags for people pages.', 'Google preview for /people pages'),
        ],
    },
    {
        'title': 'Global Settings',
        'color': '#64748b',
        'subtitle': 'Site-wide settings that appear on EVERY page',
        'rows': [
            ('Navbar',             '/admin/navbar', 'Top menu items (Home, About, Services, etc.). Add/edit/remove links.', 'Top navigation bar on EVERY page'),
            ('Footer',             '/admin/footer', 'Footer columns, link groups, copyright, country office cards.', 'Footer on EVERY page'),
            ('Contact Information','/admin/contact', 'IMPORTANT — Per-country phone, email, address, websites, working hours.', 'Slide-in /contact panel + Footer per-country cards + Contact page'),
            ('Social Links',       '/admin/social', 'Facebook, Instagram, LinkedIn, YouTube URLs.', 'Social media icons in footer and floating side widget'),
            ('Branding',           '/admin/logo', 'Logo URL, brand colors, favicon.', 'Logo in navbar, footer, hero, page watermark'),
            ('Media Library',      '/admin/media', 'Browse, upload, and delete all images/videos used on the site.', 'All file uploads across the site (S3 storage)'),
            ('SEO Global Settings','/admin/seo/global', 'Site-wide defaults: title template, OG image, robots.txt.', 'Search engine indexing + social share previews'),
        ],
    },
]


# ─── PDF builder ──────────────────────────────────────────────────────────────

def build_section_header(title, color):
    """A coloured strip with the section title."""
    t = Table(
        [[Paragraph(title, section_box_style)]],
        colWidths=[18*cm], rowHeights=[12*mm],
    )
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor(color)),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
    ]))
    return t


def build_section_rows(rows):
    """Three-column table: Admin Option | What it does | Frontend impact."""
    header = [
        Paragraph('<b>Admin Option</b>', body_style),
        Paragraph('<b>What it does</b>', body_style),
        Paragraph('<b>Where it shows on frontend</b>', body_style),
    ]
    data = [header]
    for option, path, does, impact in rows:
        opt_cell = [
            Paragraph(f"<b>{option}</b>", body_style),
            Paragraph(f"<font color='#64748b' name='Courier' size='7.5'>{path}</font>", mono_style),
        ]
        data.append([opt_cell, Paragraph(does, body_style), Paragraph(impact, body_style)])

    tbl = Table(data, colWidths=[4.5*cm, 6.8*cm, 6.7*cm], repeatRows=1)
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), BG_GREY),
        ('TEXTCOLOR',  (0, 0), (-1, 0), BRAND_DEEP),
        ('LINEBELOW',  (0, 0), (-1, 0), 0.6, BRAND_ACCENT),
        ('GRID',       (0, 1), (-1, -1), 0.25, HexColor("#e2e8f0")),
        ('VALIGN',     (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, HexColor("#fafafa")]),
    ]))
    return tbl


def make_pdf(out_path):
    doc = SimpleDocTemplate(
        out_path, pagesize=A4,
        leftMargin=1.5*cm, rightMargin=1.5*cm,
        topMargin=1.5*cm, bottomMargin=1.5*cm,
        title="Yanabiya Admin Panel Guide",
        author="Yanabiya Group",
    )
    flow = []

    # Title page
    flow.append(Paragraph("Yanabiya Admin Panel", title_style))
    flow.append(Paragraph("Quick Reference — Admin → Frontend Map", ParagraphStyle(
        'h1sub', parent=ss['Normal'], fontSize=12, textColor=BRAND_ACCENT,
        fontName='Helvetica-Bold', spaceAfter=14
    )))
    flow.append(Paragraph(
        "This guide maps every option in your admin sidebar to what it controls on the public website. "
        "Use it as a quick lookup when you want to edit something specific.",
        subtitle_style
    ))

    # Credentials box
    creds_data = [
        [Paragraph("<b>Admin URL (Production)</b>", body_style),
         Paragraph("https://main.d5va1xe1a6sj1.amplifyapp.com/admin/login", mono_style)],
        [Paragraph("<b>Email</b>", body_style),
         Paragraph("admin@yanabiyagroup.com", mono_style)],
        [Paragraph("<b>Password</b>", body_style),
         Paragraph("YanabiyaAdmin@2024", mono_style)],
        [Paragraph("<b>Public Site</b>", body_style),
         Paragraph("https://main.d5va1xe1a6sj1.amplifyapp.com/", mono_style)],
    ]
    creds = Table(creds_data, colWidths=[4*cm, 14*cm])
    creds.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor("#fef9c3")),
        ('BOX', (0, 0), (-1, -1), 0.5, HexColor("#a16207")),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('GRID', (0, 0), (-1, -1), 0.25, HexColor("#fde68a")),
    ]))
    flow.append(creds)
    flow.append(Spacer(1, 14))

    # How CMS works box
    flow.append(Paragraph("How the CMS works", h2_style))
    flow.append(Paragraph(
        "When you edit anything in the admin and click <b>Save</b>, the change is written to MongoDB "
        "instantly. The public website reads from the same database on every page load, so visitors see "
        "your changes within seconds (after they refresh).",
        body_style
    ))
    flow.append(Spacer(1, 4))
    flow.append(Paragraph(
        "<b>Browser cache:</b> Visitors who already have the page open might see the old version cached "
        "for up to 24 hours. To force a refresh, ask them to press <b>Ctrl + Shift + R</b> (or Cmd + Shift + R on Mac).",
        hint_style
    ))
    flow.append(Spacer(1, 16))

    # Each section
    for i, sec in enumerate(SECTIONS):
        flow.append(build_section_header(sec['title'], sec['color']))
        if sec.get('subtitle'):
            flow.append(Spacer(1, 4))
            flow.append(Paragraph(sec['subtitle'], hint_style))
        flow.append(Spacer(1, 6))
        flow.append(build_section_rows(sec['rows']))
        flow.append(Spacer(1, 14))

    # Footer note
    flow.append(PageBreak())
    flow.append(Paragraph("Common Workflows", title_style))
    flow.append(Spacer(1, 12))

    workflows = [
        ("Edit a phone number on the contact page",
         "Admin → Global Settings → Contact Information → pick country → change phone → Save. "
         "Updates instantly on /contact page, slide-in panels, AND the Footer on every page."),
        ("Add or change the hero background video",
         "Admin → AI Video Studio → upload a video file (or generate one) → click 'Set as Hero Background'. "
         "Refresh homepage to see it. Or: Admin → Home Management → Hero Section → paste a video URL → Save."),
        ("Change the chairman's bio",
         "Admin → About Us Management → CEO Message → edit text → Save. Updates /people/ceo, "
         "the leadership pyramid on homepage, and the country-page chairman card."),
        ("Update a country's office address",
         "Admin → Global Settings → Contact Information → pick country (Oman/UK/BD/US) → edit address → Save. "
         "Updates Footer, /contact slide-in panel, and country pages all at once."),
        ("Add a new partner logo",
         "Admin → Our Network → Partners → click '+ Add Partner' → upload logo + name + URL → Save."),
        ("Reply to a customer chat",
         "Admin → Live Chat → pick session from left list → type reply → press Enter. Customer sees reply instantly."),
        ("Change the site logo",
         "Admin → Global Settings → Branding → upload new logo → Save. Updates navbar, footer, and page watermark."),
        ("Add or hide a menu item",
         "Admin → Global Settings → Navbar → add/remove/reorder items → Save."),
    ]

    wf_data = [[Paragraph("<b>I want to...</b>", body_style), Paragraph("<b>How to do it</b>", body_style)]]
    for task, how in workflows:
        wf_data.append([Paragraph(task, body_style), Paragraph(how, body_style)])

    wf_tbl = Table(wf_data, colWidths=[6*cm, 12*cm])
    wf_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), BRAND_DEEP),
        ('TEXTCOLOR',  (0, 0), (-1, 0), white),
        ('GRID',       (0, 0), (-1, -1), 0.25, HexColor("#e2e8f0")),
        ('VALIGN',     (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, HexColor("#fafafa")]),
    ]))
    flow.append(wf_tbl)

    flow.append(Spacer(1, 24))
    flow.append(Paragraph("Tips for daily use", h2_style))
    tips = [
        "✓ Always click <b>Save</b> after editing — changes aren't applied automatically.",
        "✓ For images: pictures should be at least 1200px wide for sharp display.",
        "✓ Use the Media Library to manage all uploaded files in one place.",
        "✓ Test your changes by opening the site in a private/incognito window after saving.",
        "✓ The chat widget runs 24/7 — set up email notifications so you're alerted to new chats.",
        "✓ Browser auto-translate: the site supports 12 languages — visitors can switch from the language picker.",
    ]
    for tip in tips:
        flow.append(Paragraph(tip, body_style))
        flow.append(Spacer(1, 4))

    doc.build(flow)
    print(f"PDF written to: {out_path}")


if __name__ == "__main__":
    import sys
    out = sys.argv[1] if len(sys.argv) > 1 else "/home/sumon-rafi/Desktop/yanabiya-website/Yanabiya-Admin-Guide.pdf"
    make_pdf(out)

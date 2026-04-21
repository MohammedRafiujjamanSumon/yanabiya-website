# Yanabiya Group — Corporate Website

Modern multi-page corporate website for **Yanabiya Group**, built with Vite + React + TypeScript + Tailwind CSS.

## Tech

- ⚡ **Vite** + React 18 + TypeScript
- 🎨 **Tailwind CSS** (custom dark-green / lime brand theme)
- 🧭 **React Router v6** — multi-page routing
- 🪶 **lucide-react** icons

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── App.tsx                  Router shell
├── main.tsx                 Entry
├── index.css                Tailwind + global styles
├── data/                    All copy (edit content here, NOT in JSX)
│   ├── company.ts
│   ├── businesses.ts
│   ├── solutions.ts
│   ├── partners.ts
│   ├── countries.ts
│   ├── leadership.ts
│   └── contact.ts           ← also defines navLinks
├── components/
│   ├── TopBar.tsx
│   ├── Navbar.tsx           Sticky nav, hamburger on mobile
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── SectionHeader.tsx
│   ├── Card.tsx
│   └── CTASection.tsx
└── pages/                   13 routed pages — one per navbar item
    ├── Home.tsx
    ├── AboutUs.tsx
    ├── OurBusinesses.tsx
    ├── Solutions.tsx
    ├── Partnerships.tsx
    ├── GlobalPresence.tsx
    ├── ImpactCSR.tsx
    ├── Network.tsx
    ├── Leadership.tsx
    ├── StrategyInnovation.tsx
    ├── Insights.tsx
    ├── Careers.tsx
    └── Contact.tsx
```

## Editing content

All copy lives in `src/data/*.ts`. Want to change the chairman's message, add a partner, or rename a business? Open the matching data file — no need to touch any JSX or styling.

## Brand theme

Defined in `tailwind.config.js`:

| Token              | Value      | Use                     |
|--------------------|------------|-------------------------|
| `brand-950`        | `#06180e`  | Page background         |
| `brand-900`        | `#0a2818`  | Navbar / footer         |
| `brand-800`        | `#0f3a23`  | Card / panel background |
| `brand-accent`     | `#9ec73a`  | CTAs, stats, dividers   |
| `font-serif`       | Playfair Display | All headings      |
| `font-sans`        | Inter      | Body                    |

## Pages

| Path                       | Page                  |
|----------------------------|-----------------------|
| `/`                        | Home                  |
| `/about-us`                | About Us              |
| `/our-businesses`          | Our Businesses        |
| `/solutions`               | Solutions             |
| `/partnerships`            | Partnerships          |
| `/global-presence`         | Global Presence       |
| `/impact-csr`              | Impact & CSR          |
| `/network`                 | Network               |
| `/leadership`              | Leadership            |
| `/strategy-innovation`     | Strategy & Innovation |
| `/insights`                | Insights (Blog)       |
| `/careers`                 | Careers               |
| `/contact`                 | Contact               |

## Next steps

- [ ] Wire the contact form to your backend or Formspree / Netlify Forms
- [ ] Replace remote `yanabiyagroup.com/img/...` photos with locally optimised assets in `public/`
- [ ] Add real blog posts to `src/pages/Insights.tsx` (or migrate to a CMS)
- [ ] Add Arabic + Bangla translations (i18next is the recommended library)
- [ ] Set up a deploy pipeline (Vercel, Netlify, or your Lovable project)

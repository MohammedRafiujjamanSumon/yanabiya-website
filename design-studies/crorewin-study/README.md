# CroreWin — UI Design Study

A **non-functional front-end design study** that reproduces the common layout and
UX patterns of a modern online casino / sports-betting landing page (dark theme,
welcome-bonus hero, game-category chips, slot & live-casino grids, cricket betting
cards, promotions, mobile-wallet cashier row, and a licensing/responsible-gaming
footer).

## ⚠️ Important

- **For learning only.** This is a static mock-up to study layout, spacing, color,
  and component structure. It is **not** a real product.
- **No real-money gambling.** Nothing here takes deposits, creates accounts, places
  bets, or connects to any backend. Every button is inert.
- **Not affiliated** with crorewin.com or any real operator. All names, odds,
  amounts, logos and "winners" are placeholder/randomly-generated data.
- **18+.** A real gambling product would require licensing, KYC/AML, age
  verification, geo-restrictions, and links to local problem-gambling help lines.

## Run it

The CSS is **self-hosted** (a locally-compiled Tailwind build — no CDN), so it
runs fully offline. The compiled `styles.css` is committed, so you can open it
straight away:

```bash
# from this folder
xdg-open index.html      # Linux
open index.html          # macOS
# or serve it:
npm run serve            # python3 -m http.server 8080 → http://localhost:8080
```

### Rebuilding the CSS

Only needed if you edit the markup or `src/input.css`:

```bash
npm install        # one-time: installs tailwindcss locally
npm run build      # regenerates ./styles.css (minified)
npm run watch      # rebuild on change while editing
```

## Files

- `index.html` — markup + mock data + interactions.
- `src/input.css` — Tailwind entry + custom component classes.
- `tailwind.config.js` — theme (colors, fonts, animations).
- `styles.css` — **compiled** output linked by `index.html` (committed).
- `package.json` — build/watch/serve scripts.

## Why it lives here

This was requested as a design study and intentionally kept **separate** from the
main Yanabiya Group website so it cannot interfere with that project.

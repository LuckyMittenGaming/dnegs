# Daniel Negreanu Interactive Legacy Platform Demo

A static, Vercel-ready front-end concept based on the uploaded strategy document. This is designed as a premium proposal/demo site rather than a production data-connected application.

## What is included

- Cinematic hero section with ambient canvas, chip/card motion, and animated stats
- Legacy audit section
- Scroll-driven Kid Poker Chronicle timeline
- Comparison table for poker icons
- Interactive trophy-room cards with modal details
- On-Track / Off-Track tabbed content model
- Hand History Lab interaction mockup
- Vlog portal lightbox mockup
- Architecture, commerce, roadmap, and responsible-gaming sections
- Responsive CSS and accessibility-conscious structure

## File structure

```text
index.html
styles.css
script.js
package.json
vercel.json
README.md
```

## Local preview

Open `index.html` directly in a browser, or run:

```bash
npm install
npm run dev
```

## Vercel deployment

This repository is ready to connect to Vercel as a static/Vite project.

Recommended Vercel settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Because the source uses a root `index.html`, Vite will automatically build it into `dist`.

## Production upgrade path

This demo intentionally mocks advanced functionality. A production build should replace demo-only components with:

- Next.js frontend
- Headless CMS for content and timeline management
- Server-side middleware for YouTube/stat APIs
- Cache layer for high-traffic events
- Headless Shopify commerce
- LMS/account portal
- Verified tournament/stat data sources
- Real imagery/video licensing
- Accessibility and performance QA

## Data note

The visible statistics and 2026 milestones are demo data derived from the working strategy document. They should be verified against official/current sources before public production use.

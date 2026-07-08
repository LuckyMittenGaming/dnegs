# Daniel Negreanu · Kid Poker Experience

A static, Vercel-ready front-end concept for a cinematic reimagining of DanielNegreanu.com.

This version is intentionally **brand-first, SEO-light, interactive, dark, emotional, and sponsor-ready**. The goal is not a normal poker blog. The goal is a premium official-site experience that feels like a digital arena for Daniel’s legacy, vlogs, hand reads, training, trophies, partners, and fans.

## What is included

- Cinematic full-screen hero with CSS-generated poker-room visuals
- Curtain-raise page-load sequence with masked hero-title reveal
- Ambient canvas particle layer, cursor spotlight, and morphing magnetic cursor
- Magnetic CTAs with hover shine and pointer pull
- Responsive glassmorphism navigation with mobile hamburger
- Career pulse stat cards with animated counters
- Pure CSS kinetic marquee for brand-energy pacing
- Brand manifesto / experience vision section
- Pinned GSAP-style river reveal scroll theatre
- 3D depth hover tracking on cards and media panels
- Velocity-skew scroll effect on cinematic elements
- Emotional story timeline
- Interactive “The Read” hand decision module
- Trophy Room 2.0 cards with modal details
- Native-feeling media / vlog command center
- Learn-from-Daniel content path
- Sponsor, press, and booking layer
- A-Z build guardrails section based on the uploaded project checklist
- Responsible-gaming footer module
- Accessibility-conscious structure, reduced-motion support, and mobile-first responsive behavior

## File structure

```text
index.html
styles.css
wow.css
script.js
wow.js
public/script.js
package.json
vercel.json
README.md
```

`script.js` handles the base interactive experience. `wow.js` and `wow.css` are intentionally separated as a cinematic enhancement layer so the core build stays stable.

## Local preview

Open `index.html` directly in a browser, or run:

```bash
npm install
npm run dev
```

## Vercel deployment

Recommended Vercel settings:

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Because the source uses a root `index.html`, Vite will build the static site into `dist`.

## Production upgrade path

The current build is a polished static front-end foundation. A production official-site build should add:

- Verified Daniel stats and milestone data
- Official photography/video licensing
- YouTube/media feed via server-side cache
- CMS for story, trophy, vlog, and press content
- Media-kit downloads
- Contact/booking form handling
- Sponsor/partner modules
- Optional Shopify/headless commerce
- Optional LMS/course/account layer
- QA against WCAG 2.1 AA, Lighthouse, responsive devices, and launch checklist

## Data note

Visible career figures are concept/demo values and should be verified against official/current sources before public production use.

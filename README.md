# Daniel Negreanu · Kid Poker Experience

A Vite + Vercel front-end package for a cinematic reimagining of DanielNegreanu.com.

This build is intentionally **brand-first, SEO-light, interactive, dark, emotional, sponsor-ready, and media-forward**. The goal is not a normal poker blog. The goal is a premium official-site experience that feels like a digital arena for Daniel’s legacy, vlogs, hand reads, training, trophies, partners, and fans.

## Current Build Philosophy

The site uses the public Messi.com homepage as a **layout rhythm reference** only: full-screen hero, featured strip, biography split, stats module, trophy/palmarès zone, gallery/media wall, commerce/brand section, and footer cadence.

It does **not** copy Messi.com code, CSS, assets, exact skeleton, or protected implementation details. The Daniel build uses original markup, original CSS, and poker-specific interactions/content.

## What is included

- DN rotating staged loader
- KID POKER + signature curtain reveal
- Universal cinematic hero using local project assets
- Four-card feature strip
- Cinematic scroll biography section
- Interactive career stats console
- Texas Hold’em “Are You A Winner?!” odds tool
- Bracelet vault with real vault-door asset and bracelet cubbies
- Gallery photo wall with gold frames and lightbox context
- Dynamic YouTube vlog area with fallback thumbnail cards
- Learning section linking to Daniel’s MasterClass
- Partner section for GGPoker, PokerGO, and WSOP
- Table Talk section for X, Instagram, Facebook, and Daniel-focused poker news
- Responsible gaming section
- Multi-page templates: home, about, shop, blog/media
- Production documentation package

## File structure

```text
index.html
about.html
shop.html
blog.html
styles.css
wow.css
hero-overrides.css
build-out.css
experience-loader.css
template-pages.css
script.js
wow.js
build-out.js
experience-loader.js
template-pages.js
vite.config.js
public/assets/
  hero/
  signatures/
  story/
  trophies/
  gallery/
  watch/
  partners/
  icons/
  video/
docs/
  design-system.md
  image-spec-sheet.md
  deployment-guide.md
```

## Documentation

- `docs/design-system.md` — colours, fonts, spacing, layout rules, components, breakpoints, and motion philosophy.
- `docs/image-spec-sheet.md` — detailed asset list and image/video production specs.
- `docs/deployment-guide.md` — local setup, Vercel deployment, QA checklist, and production hardening path.

## Local preview

```bash
npm install
npm run dev
```

Check:

```text
/
/about.html
/shop.html
/blog.html
```

## Build and preview

```bash
npm run build
npm run preview
```

## Vercel deployment

Recommended Vercel settings:

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

`vite.config.js` defines the multi-page build inputs.

## Asset workflow

Upload project assets to `public/assets/...` and reference them from code without `public`.

Example:

```html
<img src="/assets/signatures/daniel-signature.svg" alt="Daniel Negreanu signature">
```

```css
.hero-main-visual {
  background-image: url('/assets/hero/hero-4.png');
}
```

## Production upgrade path

A true official-site build should add:

- Verified Daniel stats and milestone data
- Official photography/video licensing
- YouTube/media feed via server-side cache
- CMS for story, trophy, vlog, gallery, and press content
- Media-kit downloads
- Contact/booking form handling
- Sponsor/partner approval workflow
- Optional Shopify/headless commerce
- Optional LMS/course/account layer
- Privacy/cookie controls for third-party embeds
- QA against WCAG 2.1 AA, Lighthouse, responsive devices, and launch checklist

## Data note

Visible career figures are concept/demo values and should be verified against official/current sources before public production use.

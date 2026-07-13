# Daniel Negreanu Experience — Deployment Guide

This repo is a Vite-powered static front-end concept deployed to Vercel.

## 1. Local Setup

```bash
git clone https://github.com/LuckyMittenGaming/dnegs.git
cd dnegs
npm install
npm run dev
```

Open the local URL Vite prints in the terminal.

## 2. Project Structure

```txt
index.html                 # Home / main cinematic experience
about.html                 # About page template
shop.html                  # Shop / learning page template
blog.html                  # News / media page template
styles.css                 # Original base styling
wow.css                    # Hero/Messi-inspired layout styling
hero-overrides.css         # Feature strip fixes
build-out.css              # Stats, vault, gallery, vlog, table talk
experience-loader.css      # DN loader -> KID POKER curtain -> site reveal
template-pages.css         # About/shop/blog page styling
script.js                  # Base interactions
wow.js                     # Odds tool + story behavior
build-out.js               # Stats, vault, gallery, media feeds
experience-loader.js       # Staged launch controller
template-pages.js          # Shared page template micro-interactions
public/assets/             # Static images, videos, logos, signatures
vite.config.js             # Multi-page build inputs
```

## 3. Build Locally

```bash
npm run build
npm run preview
```

Check:

```txt
/
/about.html
/shop.html
/blog.html
```

## 4. Deploy to Vercel

### Git-connected deployment

1. Push changes to `main`.
2. Vercel auto-builds with `npm run build`.
3. Vercel serves the `dist/` output.
4. Confirm deployment URL.

### Manual deployment

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 5. Asset Workflow

Upload assets to:

```txt
public/assets/hero/
public/assets/signatures/
public/assets/story/
public/assets/trophies/
public/assets/gallery/
public/assets/partners/
```

Reference assets from code without `public`:

```html
<img src="/assets/signatures/daniel-signature.svg" alt="Daniel Negreanu signature">
```

```css
.hero-main-visual {
  background-image: url('/assets/hero/hero-4.png');
}
```

## 6. Launch QA Checklist

- Hard refresh production URL with cache buster.
- Confirm DN loader appears.
- Confirm KID POKER + signature curtain appears.
- Confirm hero image loads immediately after curtain.
- Confirm story video plays muted and does not crop important content.
- Confirm stats dropdowns update.
- Confirm vault opens and closes.
- Confirm gallery lightbox opens and closes.
- Confirm YouTube thumbnails load or fallback appears.
- Confirm Table Talk embeds do not block load.
- Confirm mobile cards do not overflow.
- Run Lighthouse/performance pass.
- Test Chrome, Firefox, Safari, mobile Safari.

## 7. Third-Party Embed Notes

X, Instagram, Facebook, YouTube, and RSS proxy requests may be delayed or blocked by browser privacy settings, ad blockers, or third-party cookie rules. This is why they should load after the main site is open.

## 8. Production Hardening Later

- Replace placeholders with licensed official Daniel assets.
- Rename signature file to `daniel-signature.svg`.
- Move social/news API calls behind a serverless proxy if rate limits or CORS issues appear.
- Add CMS for news, gallery captions, bracelet data, and shop products.
- Add analytics and privacy/cookie controls.
- Add image CDN or Vercel Blob only when media library becomes client-managed or large.

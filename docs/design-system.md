# Daniel Negreanu Experience — Design System

This build uses the public Messi site as a **structural reference only**: full-screen hero, featured card strip, biography split, stats module, trophy/palmarès layer, media/gallery wall, commerce/brand section, and footer rhythm. It does **not** copy Messi.com code, CSS, or protected assets.

## Brand Direction

**Mood:** cinematic, premium poker-room, dark, suspenseful, human, legendary.

**Core idea:** Daniel’s site should feel like walking into a private championship vault: warm gold, deep green felt, black glass, burgundy tension, table lights, framed photos, bracelets, and live media.

## Colour Palette

| Token | Hex | Use |
|---|---:|---|
| `--dn-black` | `#050509` | Site background, cinematic black |
| `--dn-ink` | `#111116` | Deep cards, panels, footer |
| `--dn-panel` | `#0c0b10` | Glass modules, modal surfaces |
| `--dn-gold` | `#f4c76b` | Primary accent, CTAs, stats, borders |
| `--dn-gold-2` | `#fff0b7` | Highlight text, bracelet shine |
| `--dn-green` | `#0f6b4f` | Poker felt, odds tool, table graphics |
| `--dn-burgundy` | `#5a1420` | Suspense accents, warning/pressure notes |
| `--dn-text` | `#f7f1e7` | Main text |
| `--dn-muted` | `#a79f94` | Secondary copy |
| `--dn-line` | `rgba(244,199,107,.18)` | Borders and dividers |

## Typography

| Role | Font | Notes |
|---|---|---|
| Display | `Archivo Black` | Big condensed page titles, Messi-style mass and impact |
| Premium accent | `Cinzel` | Optional for trophy/vault labels and legacy moments |
| Body/UI | `Inter` | Clean interface, readable stats, labels, menus |

## Spacing System

| Token | Value |
|---|---:|
| XS | `0.5rem` |
| SM | `1rem` |
| MD | `1.5rem` |
| LG | `2rem` |
| XL | `4rem` |
| XXL | `6rem–8rem clamp()` |

## Component System

### Header
- Sticky glass header.
- Left DN mark.
- Anchor links for Home sections.
- Page template links: Home, About, Shop, Blog.
- Mobile: stacked nav or hamburger.

### Staged Loader
Flow:
1. DN spinner loader.
2. Critical asset preload.
3. KID POKER + signature curtain.
4. Curtain raises.
5. Site opens.
6. Third-party embeds lazy-hydrate.

Critical assets:
- `/assets/hero/hero-4.png`
- `/assets/signatures/Make%20(1920%20x%201920%20px).svg`
- `/assets/trophies/bracelet-vault-door.png`
- `/assets/story/toronto-family.mp4`

### Hero
- Full-screen background image.
- Left-aligned content block.
- KID POKER title.
- Signature image.
- Primary CTA: Are You A Winner?
- Secondary CTA: Watch The Story.

### Featured Card Strip
Four equal columns on desktop:
- WSOP / Daily Vlog
- Are You / A Winner?
- Eight / Bracelets
- Press + / Partners

### Story Split
- Left: full-height video/image story panel.
- Right: biography copy panel.
- Scroll story chapters: Toronto, Vegas, Kid Poker, Legacy.

### Stats Console
- Interactive year dropdown.
- View dropdown: earnings, rankings, regions.
- Mega stat, rings, bar chart, feed.
- No visible Hendon Mob naming in UI.

### Bracelet Vault
- Closed vault door image.
- Door opens on click.
- Interior cubbies/shelving display eight bracelet cards.

### Gallery Wall
- Dark poker-room wall.
- Gold framed photos.
- Hover lift.
- Lightbox with caption/context.

### Vlog / Media
- Dynamic YouTube RSS via `rss2json`.
- Manual fallback thumbnails.
- Thumbnail cards instead of heavy iframe embeds.

### Learn + Partners
- Learn: Daniel MasterClass CTA.
- Partners: GGPoker, PokerGO, WSOP.
- Removed MasterClass from partner grid because it is the learning CTA.
- Removed YouTube and Hendon Mob from partner grid.

### Table Talk
- X timeline.
- Instagram profile embed.
- Facebook post embeds deferred until after loader.
- PokerNews filtered feed for Daniel Negreanu mentions.

## Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `1200px+` | Full cinematic desktop, multi-column grids |
| `900–1199px` | Two-column grids, simplified sticky behavior |
| `<900px` | Single-column sections, hero keeps visual priority |
| `<600px` | Larger tap targets, stack cards, reduce motion |

## Motion Rules

- Loader motion should be deliberate and smooth.
- Avoid layout shifts after curtain opens.
- Do not block site opening on social embeds.
- Respect `prefers-reduced-motion`.
- Use transform/opacity for animation, not layout-changing properties.

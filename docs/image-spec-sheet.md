# Daniel Negreanu Experience — Image / Video Spec Sheet

Use this as the production shoot or asset-generation checklist. Until licensed assets are supplied, placeholders should use `https://placehold.co` with descriptive text.

## Global Asset Rules

- Photos: WebP or AVIF preferred.
- Transparent graphics/logos/signatures: SVG or PNG.
- Background videos: MP4/WebM, muted, looped, 5–12 seconds when possible.
- Keep important subject matter in the center 60% to survive responsive cropping.
- Use `public/assets/...` for static project assets.

## Required Home Page Assets

| Section | File / Path | Size | Spec |
|---|---|---:|---|
| Hero background | `/assets/hero/hero-4.png` | 2400×1350 minimum | Daniel Negreanu at a final table, facing camera or 3/4 profile, casino lights, dark premium poker-room atmosphere, gold rim light, shallow depth of field. |
| Signature | `/assets/signatures/daniel-signature.svg` | Vector | Transparent Daniel Negreanu signature, black or dark ink, should work over hero imagery and curtain. Current uploaded file path uses `Make (1920 x 1920 px).svg`; rename later. |
| Toronto story video | `/assets/story/toronto-family.mp4` | 1920×1080 | Warm family/early-life clip, archival feel, slow motion or subtle camera movement, no hard text baked into video. |
| Vegas story image/video | `/assets/story/vegas.webp` | 2560×1440 | Daniel walking into a Vegas poker room or seated under casino lights, moody, cinematic. |
| Kid Poker story image | `/assets/story/kid-poker.webp` | 2560×1440 | Younger Daniel / TV poker-era image concept, table talk, cameras, early fame energy. |
| Legacy story image | `/assets/story/legacy.webp` | 2560×1440 | Modern Daniel, mentor/commentator/vlogger feel, trophy or stage lighting. |
| Vault door | `/assets/trophies/bracelet-vault-door.png` | 1600×1200+ | Real vault door asset currently supplied. Use as closed-state bracelet reveal. |
| Bracelet interior | CSS/generated | n/a | Dark vault room with shelves or watch cubbies, warm spotlighting on eight bracelet slots. |
| Bracelet cards | `/assets/trophies/bracelet-01.webp` etc. | 900×900 | Each bracelet close-up in gold light, macro detail, black velvet or green felt base. |
| Gallery photos | `/assets/gallery/photo-01.webp` etc. | 1600×1100 | Daniel at final table, WSOP moments, vlog behind-the-scenes, fan/event moments, training/masterclass images. |
| Vlog thumbnails | YouTube thumbnail URLs | 1280×720 | Use YouTube max-res thumbnail. Fallback to HQ default if max-res is unavailable. |
| Partner logos | `/assets/partners/*.svg` | SVG | GGPoker, PokerGO, WSOP. Use approved official brand assets only. |

## Additional Page Template Assets

### About Page
- Hero: 2400×1350 portrait of Daniel at final table, moody key light, cards/chips in foreground.
- Story cards: Toronto archive, Vegas poker room, TV-era table talk.
- Timeline visuals: optional 16:9 images for each era.

### Shop Page
- Hero: merch vault or apparel flat-lay on poker felt.
- Products:
  - Black Kid Poker hoodie, gold embroidery.
  - Signature deck of cards with custom DN back.
  - Bracelet vault print / signed art.
  - MasterClass learning card graphic.

### Blog / Media Page
- Hero: media command center / YouTube studio / WSOP vlog camera setup.
- Vlog cards: YouTube thumbnails.
- Editorial cards: poker hand breakdown imagery, table talk social collage.

## Placehold.co Examples

```txt
https://placehold.co/2400x1350/050509/f4c76b?text=Daniel+Negreanu+Final+Table+Portrait
https://placehold.co/1400x900/0f6b4f/f4c76b?text=Poker+Room+Gallery+Photo
https://placehold.co/1200x750/111116/f4c76b?text=Kid+Poker+Hoodie
```

## Recommended Folder Structure

```txt
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
```

## File Naming Rules

Good:

```txt
daniel-signature.svg
hero-final-table.webp
toronto-family.mp4
bracelet-vault-door.png
bracelet-01.webp
ggpoker-logo.svg
```

Avoid:

```txt
Daniel Signature FINAL FINAL.png
IMG_4927.PNG
Make (1920 x 1920 px).svg
```

The current signature path works, but should eventually be renamed for maintainability.

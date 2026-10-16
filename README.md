# Im Aim Thai Cuisine website

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

`/styleguide` shows every design token and component (not linked, `noindex`).

## Structure

```
scripts/
  process-images.py     curate + grade + resize raw photos -> public/images, writes images.generated.ts
  extract-logo.py       temporary transparent logo + favicons cut from the shop-sign PNG
src/
  app/                  routes, globals.css (design tokens), icon.png
  components/
    ui/                 Button, Container/Section/Heading/Ornament, DishImage, badges, Logo
    menu/               DishCard
    layout/             SiteHeader, SiteFooter
  data/
    menu.ts             full menu, prices, spice levels, vegan/GF options
    site.ts             address, phone, hours, order link, socials
    images.generated.ts generated, do not edit
docs/missing-photos.md  dishes without photos + AI prompt brief
```

## Updating content

- **Menu or prices:** edit `src/data/menu.ts`.
- **Hours, order link, socials:** edit `src/data/site.ts`.
- **Photos:** drop the file into `../Food picture im-aim thai cuisine/`, add it to `PHOTOS`
  in `scripts/process-images.py`, run `python3 scripts/process-images.py` (needs Pillow).
- **AI stand-in photos** live in `../gen_ai/` and are listed in `AI_PHOTOS` in the same script.
  The menu labels them as AI illustrations. A real photo (`image:` in `menu.ts`) always replaces them.

## Waiting on the restaurant (`TODO(owner)` in code)

- The printed menu prints the domain as im-aim-thai-cuisine.co.nz, which does not exist; the real one is
  im-aim-thaicuisine.co.nz (currently serving an older site with outdated prices and a Dannevirke address)
- "Skip the Queue" online-ordering URL
- Instagram and Google Business links (Facebook and YouTube are in)
- Vector logo (SVG/AI); the current one is cut from the sign image
- Confirm Massaman is beef only at $24.90
- Confirm gluten-free claims: the printed menu lists Pad See Ew as GF (soy sauce usually contains
  wheat) and "satay chicken salad" / "yum duck", which are not on the menu
- Desserts appear in photos but not on the printed menu: are they sold?

# Afrilink Corporation — Astro Site

Static Astro build of [afrilinkcorp.co.za](https://afrilinkcorp.co.za) — corporate investment holding company website. Designed for deployment on Cloudflare Pages.

## Stack

- **Astro 5** — zero-JS by default, static output
- **No CSS framework** — hand-authored design tokens in `src/styles/global.css`
- **Plus Jakarta Sans** via Google Fonts
- Custom **"Corporate Wave"** design system (sharp diagonal sweeps, animated SVG hero)

## Project layout

```
site/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/                # Served as-is at site root
│   ├── favicon.png
│   ├── afrilink-logo.png
│   ├── dr-mokgatle.jpg
│   ├── sipho.jpg
│   ├── robots.txt
│   └── industries/        # Drop industry photos here (see industries/README.md)
└── src/
    ├── layouts/
    │   └── BaseLayout.astro
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── HeroWave.astro       # Animated SVG hero
    │   ├── WaveDivider.astro    # Section transitions
    │   └── IndustryCard.astro   # Duotone-treated portfolio cards
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro
    │   ├── partnerships.astro
    │   ├── portfolio.astro
    │   └── contact.astro
    └── styles/
        ├── global.css           # Tokens, reset, base
        └── waves.css            # Wave animations & hero canvas
```

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # Outputs to ./dist
npm run preview      # Serve ./dist locally
```

> **Note for this machine:** SSL inspection (corporate/AV proxy) is breaking npm's certificate validation, causing each package to retry 3× before falling through. If `npm install` is hanging, fix one of these ways:
>
> 1. **Trust the corporate CA** (proper fix): `npm config set cafile "<path-to-corporate-root-ca.pem>"`
> 2. **Disable SSL strict mode for npm only** (works but reduces security): `npm config set strict-ssl false`
> 3. **Skip local install entirely** — commit and push, then let Cloudflare Pages build it in their clean environment (no proxy issues there).

## Design system at a glance

- Brand palette and tokens live in `src/styles/global.css` under `:root`.
- Wave animation keyframes are in `src/styles/waves.css` — all GPU-only (`transform` only).
- Honors `prefers-reduced-motion` site-wide.
- All radii are `2px` for the "sharp corporate edge" feel.

To tweak the hero wave shape, edit the SVG paths inside `HeroWave.astro` — three layers tinted by gradient stops defined inline.

To tweak section dividers between content blocks, set `intensity="bold"` or `intensity="subtle"` on `<WaveDivider />`.

## Industry imagery

Drop JPEGs into `public/industries/` with the slugs documented in `public/industries/README.md`. Missing files automatically fall back to a navy monogram tile — no broken images.

## Deploying to Cloudflare Pages

### One-time setup

1. **Cloudflare dashboard** → Workers & Pages → Create → Pages → Connect to Git
2. Pick this repository, set root directory to `site/`
3. Build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variable**: `NODE_VERSION` = `20`

### Custom domain

After the first build:
1. Pages project → Custom domains → "Set up a custom domain"
2. Add `afrilinkcorp.co.za` and `www.afrilinkcorp.co.za`
3. Cloudflare auto-provisions SSL (Universal SSL, free)
4. Set up a redirect rule for `www → apex` (or apex → www, your call)

### Recommended Cloudflare settings

| Setting | Where | Value |
|---|---|---|
| SSL/TLS mode | SSL/TLS → Overview | Full (strict) |
| Always Use HTTPS | SSL/TLS → Edge Certificates | On |
| HSTS | SSL/TLS → Edge Certificates | Enable, 6 months, include subdomains |
| Brotli | Speed → Optimization | On |
| Early Hints | Speed → Optimization | On |
| Bot Fight Mode | Security → Bots | On |

## License

Proprietary — © Afrilink Corporation (Pty) Ltd. All rights reserved.

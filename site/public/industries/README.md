# Industry imagery

The portfolio page references one photo per company. Drop a JPEG with the matching slug into this folder and the duotone treatment is applied automatically by `IndustryCard.astro` (navy → orange wash, mix-blend-mode: multiply).

If a file is missing, the card falls back to a navy gradient with the company monogram — the page still works.

## Required files

| Slug                  | Company                      | Sector                  | Search suggestions |
| --------------------- | ---------------------------- | ----------------------- | ------------------ |
| `automotive.jpg`      | Vacuform 2000                | Automotive Mfg          | car body production, assembly line, automotive parts factory |
| `digital-talent.jpg`  | Strider Digital              | Digital Talent          | software team collaborating, modern office laptops |
| `construction.jpg`    | Afrilink Building & Civils   | Construction            | high-rise construction, civil engineering site, glass facade |
| `telecoms.jpg`        | Afrilink Telecoms            | Telecommunications      | network operations center, telecoms tower, server rack |
| `mining.jpg`          | KP Mining Commodities        | Mining (gold/diamonds/manganese) | open pit mine, mining equipment, gold ore close-up |
| `software.jpg`        | Hindsight Consulting         | Software Development    | clean code editor screen, developer hands keyboard |
| `accounting.jpg`      | Hindsight Online             | Cloud Accounting        | dashboard analytics, financial charts on laptop |

## Specs

- **Format**: JPEG, sRGB
- **Aspect**: 16:10 (e.g. 1600×1000 or 1280×800)
- **File size**: keep under 200 KB after compression (use [squoosh.app](https://squoosh.app) or `cwebp`)
- **Tone**: neutral or slightly desaturated — the duotone overlay will tint everything navy/orange anyway

## Sourcing

**Option A — Unsplash (free, attribution appreciated):**
- https://unsplash.com/s/photos/automotive-manufacturing
- https://unsplash.com/s/photos/mining
- https://unsplash.com/s/photos/server-room
- https://unsplash.com/s/photos/construction-site

**Option B — Pexels (free, no attribution required):**
- https://www.pexels.com/search/industry/

**Option C — Commission custom photography or stock library subscription (Shutterstock, Getty).**

## How the duotone works

The image is rendered with:
1. `filter: grayscale(35%) contrast(1.05) brightness(0.92)` on the photo
2. A `mix-blend-mode: multiply` overlay of navy → orange gradient at 75% opacity
3. On hover, the overlay opacity drops to 55% to reveal more of the original photo

This means you don't need to color-treat the source photos — the CSS does it consistently across all seven at once.

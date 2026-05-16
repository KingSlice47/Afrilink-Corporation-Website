# Portfolio company logos

Drop each company's logo into this folder using the slug below. The `IndustryCard` component renders them as centered overlays on the duotone'd industry photo.

## Required files

| Filename (preferred) | Company | Notes |
| --- | --- | --- |
| `vacuform.svg`           | Vacuform 2000               | |
| `strider.svg`            | Strider Digital             | The existing `Strider-logo.svg` from the old `assets/images/` folder can be renamed and dropped in here |
| `afrilink-building.svg`  | Afrilink Building & Civils  | |
| `kp-mining.svg`          | KP Mining Commodities       | |

## Specs

- **Prefer SVG** — scales perfectly, tiny file size
- **PNG fallback** is fine — use transparent background, ≥ 400px wide
- Max rendered size: 60px tall × 72% card width (the component constrains this)
- Logos sit on a near-white badge so they work whether they're dark- or light-toned

## What happens if a logo is missing

The component uses `onerror` on the `<img>` to remove the badge entirely. The card then falls back to showing just the duotone photo with the sector tag and monogram letter — no broken image icons.

## SVG vs PNG

The component tries `/logos/{slug}.svg` first; if that 404s it automatically falls back to `/logos/{slug}.png`. So you can drop in either format — SVG is preferred for scaling and file size, but PNG works out of the box.

If both SVG and PNG are present, **SVG wins** (loaded first). To force PNG, just don't upload an SVG with that slug.

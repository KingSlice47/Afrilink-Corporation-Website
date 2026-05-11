# Portfolio company logos

Drop each company's logo into this folder using the slug below. The `IndustryCard` component renders them as centered overlays on the duotone'd industry photo.

## Required files

| Filename (preferred) | Company | Notes |
| --- | --- | --- |
| `vacuform.svg`           | Vacuform 2000               | |
| `strider.svg`            | Strider Digital             | The existing `Strider-logo.svg` from the old `assets/images/` folder can be renamed and dropped in here |
| `afrilink-building.svg`  | Afrilink Building & Civils  | |
| `afrilink-telecoms.svg`  | Afrilink Telecoms           | |
| `kp-mining.svg`          | KP Mining Commodities       | |
| `hindsight.svg`          | Hindsight Consulting        | |
| `hindsight-online.svg`   | Hindsight Online            | |

## Specs

- **Prefer SVG** — scales perfectly, tiny file size
- **PNG fallback** is fine — use transparent background, ≥ 400px wide
- Max rendered size: 60px tall × 72% card width (the component constrains this)
- Logos sit on a near-white badge so they work whether they're dark- or light-toned

## What happens if a logo is missing

The component uses `onerror` on the `<img>` to remove the badge entirely. The card then falls back to showing just the duotone photo with the sector tag and monogram letter — no broken image icons.

## To switch a logo to PNG

The component currently looks for `/logos/{slug}.svg`. If you need to use a PNG, either:
1. Convert the PNG to SVG via [svgomg](https://jakearchibald.github.io/svgomg/) or an online converter, or
2. Tell me and I'll update the component to try `.png` as a fallback when `.svg` 404s

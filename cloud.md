# Afrilink Corporation - Brand & Development Guidelines

This document ensures consistency across the Afrilink Corporation website and alignment with the sister site (afrilinkbuilding.co.za).

---

## Brand Identity

### Company Information

- **Company Name**: Afrilink Corporation (Pty) Ltd
- **Registration**: 2018/440447/07
- **Tagline**: "Empowering Growth, Creating Value, Building Futures"
- **Sister Site**: [Afrilink Building & Civils](https://afrilinkbuilding.co.za/)

---

## Color Palette

### Primary Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Navy (Primary Dark) | `#040922` | Backgrounds, headers, primary text |
| Orange (Accent) | `#F37121` | CTAs, highlights, links, active states |
| White | `#FFFFFF` | Backgrounds, inverse text |
| Light Grey | `#D1D1D1` | Borders, dividers |

### Supporting Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Orange Light | `#FF9E5E` | Hover states, light accents |
| Orange Dark | `#D85C0F` | Active/pressed states |
| Gold | `#FFD177` | Premium accents, highlights |
| Gold Light | `#FFE9B3` | Subtle gold tints |
| Grey Light | `#F2F2F2` | Section backgrounds |
| Navy Light | `#0A1235` | Gradient endpoints |

### Text Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Text | `#040922` | Headings, body text on light bg |
| Secondary Text | `#424242` | Subheadings, descriptions |
| Muted Text | `#757575` | Captions, metadata |
| Inverse Text | `#FFFFFF` | Text on dark backgrounds |

---

## Typography

### Font Family

**Primary Font**: Plus Jakarta Sans (Google Fonts)

```css
font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Weights

- Light: 300
- Regular: 400
- Medium: 500
- Semi-Bold: 600
- Bold: 700
- Extra Bold: 800

### Font Sizes

| Element | Desktop | Mobile |
|---------|---------|--------|
| H1 | 2.5rem (40px) | 2rem (32px) |
| H2 | 2rem (32px) | 1.75rem (28px) |
| H3 | 1.5rem (24px) | 1.25rem (20px) |
| H4 | 1.25rem (20px) | 1.125rem (18px) |
| Body | 1rem (16px) | 1rem (16px) |
| Small | 0.875rem (14px) | 0.875rem (14px) |

### Line Heights

- Headings: 1.2 - 1.4
- Body text: 1.6
- Tight: 1.4

---

## Spacing System

Using CSS custom properties for consistent spacing:

```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 1.5rem;   /* 24px */
--spacing-lg: 2rem;     /* 32px */
--spacing-xl: 3rem;     /* 48px */
--spacing-2xl: 4rem;    /* 64px */
```

---

## Component Library

### Buttons

#### Primary Button

```css
.btn-primary {
    background-color: var(--primary-orange);
    color: var(--text-inverse);
    padding: 1rem 2rem;
    border-radius: 4px;
    font-weight: 600;
}
```

#### Secondary Button

```css
.btn-secondary {
    background-color: var(--primary-black);
    color: var(--text-inverse);
}
```

#### Outline Button

```css
.btn-outline {
    background-color: transparent;
    border: 2px solid var(--primary-orange);
    color: var(--primary-orange);
}
```

### Cards

- Border radius: 4px (sharp with soft edge)
- Box shadow: `0 4px 6px rgba(4, 9, 34, 0.1)`
- Hover: translateY(-8px) with enhanced shadow
- Padding: var(--spacing-lg)

### Expandable Content ("View More")

```html
<div class="expandable-content" data-expanded="false">
    <div class="content-preview">
        <!-- First paragraph visible -->
    </div>
    <div class="content-full" aria-hidden="true">
        <!-- Additional content hidden -->
    </div>
    <button class="btn-expand" aria-expanded="false">
        View More <span class="expand-icon">+</span>
    </button>
</div>
```

---

## Layout Guidelines

### Container

- Max width: 1200px
- Padding: 0 1.5rem (24px)
- Centered with margin: 0 auto

### Grid System

- Use CSS Grid for layouts
- 12-column conceptual grid
- Gap: var(--spacing-lg) or var(--spacing-xl)

### Section Spacing

- Padding: var(--spacing-2xl) 0 (64px top/bottom)
- Mobile: var(--spacing-xl) 0 (48px)

---

## Accessibility Requirements

### WCAG 2.2 Level AA Compliance

1. **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
2. **Focus States**: Visible focus indicators (3px orange outline)
3. **Keyboard Navigation**: All interactive elements accessible
4. **ARIA Labels**: Proper labeling for screen readers
5. **Semantic HTML**: Proper heading hierarchy, landmarks

### Touch Targets

- Minimum size: 44x44px
- Adequate spacing between interactive elements

---

## Image Guidelines

### Naming Convention

- Lowercase with hyphens: `hero-image.png`
- Descriptive names: `dr-mokgatle-portrait.jpg`
- Include dimensions for variants: `logo-200x200.png`

### Formats

- **Photos**: JPEG (optimized, quality 80-85%)
- **Logos/Icons**: SVG or PNG with transparency
- **Hero images**: WebP with JPEG fallback

### Optimization

- Max file size: 200KB for hero images
- Lazy loading for below-fold images
- Responsive images with srcset

---

## Code Standards

### HTML

- Semantic HTML5 elements
- Proper heading hierarchy (h1 > h2 > h3)
- ARIA attributes for accessibility
- Descriptive alt text for images

### CSS

- CSS Custom Properties for theming
- Mobile-first responsive design
- BEM-inspired naming (optional)
- Avoid !important

### JavaScript

- ES6+ with strict mode
- Progressive enhancement
- Debounced scroll/resize handlers
- RequestAnimationFrame for animations

---

## Cross-Site Consistency

### Shared with Sister Site (afrilinkbuilding.co.za)

1. **Color Palette**: Same orange (#F37121) and navy (#040922)
2. **Typography**: Modern sans-serif approach
3. **Button Patterns**: "Find out more" / "View More" styling
4. **Footer Structure**: Logo, contact, navigation, social links
5. **Header**: Transparent overlay on hero sections

### Differences

| Element | Afrilink Corp | Afrilink Building |
|---------|---------------|-------------------|
| Font | Plus Jakarta Sans | Similar sans-serif |
| Hero | Static with gradient | Video/dynamic |
| Focus | Investment holding | Construction services |

---

## File Structure

```
afrilink-corporation-website/
├── index.html
├── about.html
├── contact.html
├── partnerships.html
├── portfolio.html
├── cloud.md (this file)
├── README.md
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── mobile-fixes.css
│   │   └── enhancements.css
│   ├── js/
│   │   ├── main.js
│   │   └── enhancements.js
│   └── images/
│       ├── favicon.png
│       ├── Afrilink Corp LOGO.png
│       ├── Hero.svg
│       └── ...
```

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-03 | 1.0 | Initial brand guidelines created |

---

## Contact

For brand or development questions, contact the development team or refer to the sister site for design reference.

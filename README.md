# Solora Web Studio

A premium, single-page marketing site built with Tailwind CSS and vanilla JavaScript.

## Features
- Sticky navigation with smooth-scroll anchors
- Light/dark mode toggle stored in `localStorage`
- Glassmorphic hero showcase and curated portfolio grid
- Services, pricing, add-ons, and contact form with client-side validation
- Intersection Observer powered fade-up animations with respect for `prefers-reduced-motion`

## Project Structure
```
/index.html
/css/styles.css          # Custom utility layer & component styles
/js/main.js              # Page bootstrap & UI interactions
/assets/logo.svg         # Placeholder brand mark
/assets/images/          # Reserved for future imagery
```

## Getting Started
1. Clone or download the repository.
2. Open `index.html` directly in a modern browser, or serve the folder with any static server (e.g. `npx serve`).

## Customisation
- **Branding**: Update typography, copy, or palette in `index.html` and `css/styles.css`.
- **Tailwind Theme**: Adjust `tailwind.config` (inline inside `<head>`) for new colors or fonts.
- **Hero/Portfolio Content**: Update the hero metrics or portfolio cards directly in `index.html`.
- **Imagery**: Replace placeholder gradients with screenshots inside `assets/images` and reference them in the markup.

## Deployment
The site is static and can be deployed to Vercel, Netlify, GitHub Pages, or any CDN:
1. Push the folder to your Git repository.
2. Deploy via your preferred platform (no build step required thanks to CDN Tailwind).
3. Ensure `index.html` remains the entry point and enable HTTPS for best font loading.

## Accessibility & Performance Notes
- Respects reduced-motion settings
- Uses semantic landmarks and `aria-live` messaging for form submissions
- Intersection Observer only activates once per element to minimise work

## Maintenance
- Keep dependencies evergreen by monitoring Tailwind CDN releases.
- When you add third-party scripts, load them defer/async to preserve performance budget.

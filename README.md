# Ingenium React Project (Vite + React Router)

This project includes:
- Sticky navbar (Home, Services, About, Integrity, Contact)
- Home hero section with the cosmic artwork background + interactive "HeroFlowmap" effect (particles + cursor repulsion + ripple/bubble feel)
- Looping video slot (white rounded card) placed above the hero title as requested
- Sora font

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```

## Optional: add a looping video
Place a video at:
- `public/videos/hero-loop.mp4`

Then edit:
- `src/pages/Home.jsx`

and set:
```js
const videoSrc = "/videos/hero-loop.mp4";
```

## Assets
Included in `src/assets/`:
- `ingenium-nav-logo.png` (navbar logo)
- `hero-artwork.png` (hero background artwork)
- `ingenium-logo-full.jpeg` (fallback image inside the video card)

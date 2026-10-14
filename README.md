# Saurabh Ombase Photography — React + TypeScript demo

A responsive, frontend-only wedding photography portfolio concept built with React, TypeScript, Vite, CSS animations, and Lucide icons.

## Run locally

1. Install Node.js 20 or newer.
2. Extract this folder.
3. Open a terminal inside the project folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL shown by Vite.

## GitHub Pages deployment

The GitHub Actions workflow builds and deploys the site from the `main` branch. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The repository name is `sourabh-ombase-photography`, so its project page is served under `/sourabh-ombase-photography/`.

## Included

- Cinematic landing section
- Responsive navigation
- Filterable portfolio using the supplied local photos
- Featured wedding film with native playback controls
- Photo lightbox with keyboard navigation
- Scroll reveal effects and hover transitions
- Services section
- Contact form UI with demo-only submission state
- Responsive mobile layout

## Important before presenting to the photographer

- Portfolio media is bundled from the `photo` folder by Vite. Add approved JPG, PNG, or WebP photos there and import them in `src/App.tsx` before adding them to the gallery list so they work in both local and GitHub Pages builds.
- `lord gaensh.heic` is not included in the gallery because HEIC support varies across browsers. Convert it to JPG or WebP for consistent display.
- The procession video is served locally from `photo/procession 1.mp4` and uses browser-native playback controls.
- Confirm the business name, service descriptions, testimonials, contact details, social links, and packages with the photographer. The testimonial in this demo is explicitly a sample placeholder.
- The contact form is frontend-only. It does not send or store enquiries.
- Images and Google Fonts load from the internet.

## Stack

- React 18
- TypeScript
- Vite
- CSS
- Lucide React

No backend or database is included.

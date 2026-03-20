# 🐾 Paws & Preferences

A mobile-first cat swiping app — swipe right to like, left to pass. Built with React + Vite, sourcing images from [Cataas](https://cataas.com/).

## Features

- Swipe gestures (touch & mouse drag)
- Like / dislike buttons as fallback
- Animated card stack with depth
- Progress bar
- Summary screen with liked cats grid
- Skeleton shimmer while images load

## Tech Stack

- React 18
- Vite 5
- CSS Modules
- Cataas API

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/paws-preferences/](http://localhost:5173/paws-preferences/)

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy

Pushed to `main` → GitHub Actions builds and deploys automatically to GitHub Pages.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Campus Run (Project I9)

> Interactive mobile game of nexus. Campus-wide location-based point-spawn game built on a mobile-first vector map architecture.

## Overview

Campus Run is a high-performance, mobile-first campus exploration and point-spawn interactive game featuring custom vector map canvas rendering, landmark discovery, and live geolocation support.

## Tech Stack

- **Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React, Motion
- **Map & Geo**: D3, Turf.js, Custom Vector Map Canvas

## Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (if applicable):
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Typecheck:
   ```bash
   npm run lint
   ```

5. Build for production:
   ```bash
   npm run build
   ```

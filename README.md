# CoD Zombies Cursed Mystery Box

A web app for **Call of Duty Zombies** “Cursed Relics” challenges. Choose an exact, random, or uncapped Cursed Tier mode, remove relics you have not unlocked, then open a 3D Mystery Box to draw a map and challenge.

Built for use alongside [CoD Zombies Solver](https://codzombiessolver.com) cursed relic content.

## Features

- **3D Mystery Box** — Rigged GLTF model with an animated lid (React Three Fiber + Three.js)
- **Flexible tier modes** — Choose exact Tier I-III totals, a random valid tier, or No Cap for an unrestricted relic draw
- **Map rotation** — Every opening includes one of 12 Round-Based or Survival maps from a shuffled, non-repeating rotation
- **Relic exclusions** — Settings let players remove discovered relics they have not unlocked
- **Discovery filtering** — Relics marked undiscovered in the app data never enter the draw pool
- **Three relic types** — Grim, Sinister, and Wicked, each with distinct card styling
- **Responsive layout** — Desktop overlay grid and a mobile-friendly stacked scene + scrollable cards panel

## How it works

1. Open **Settings** and choose an exact tier, **Random Tier**, or **No Cap**.
2. Exclude any discovered relics you have not unlocked yet.
3. Click **Open Box** to reveal the next map and a valid relic combination.
4. Open the box again anytime for a completely new draw using the saved settings.

Relic and map data are loaded from `src/data/relics.ts`, `src/data/maps.ts`, and [codzombiessolver.com](https://images.codzombiessolver.com/) image URLs.

## Tech stack

| Layer | Tools |
| --- | --- |
| UI | React 19, TypeScript |
| Build | Vite 8 |
| 3D | Three.js, `@react-three/fiber`, `@react-three/drei` |

## Getting started

**Requirements:** Node.js 20+ and [pnpm](https://pnpm.io) (recommended) or npm.

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm lint
```

The dev server runs at `http://localhost:5173` by default.

## Project structure

```text
src/
├── App.tsx
├── components/
│   ├── MysteryBox3D.tsx
│   └── MysteryBox3D.css
└── data/
    ├── maps.ts
    └── relics.ts
public/
└── mystery-box/
    ├── scene.gltf
    ├── scene.bin
    └── textures/
```

To add or edit relics, update the arrays in `src/data/relics.ts`. Relics with `discovered: false` are automatically omitted from both settings and draws.

## 3D model credit

The Mystery Box mesh is based on **“( Rigged ) COD Zombies Mystery Box”** by [_M_P3p3_](https://sketchfab.com/_M_P3p3_) on Sketchfab, licensed under [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/). See `public/mystery-box/license.txt` for full attribution.

## License

This project’s application code is private (`package.json` sets `"private": true`). Third-party assets remain subject to their respective licenses and terms.

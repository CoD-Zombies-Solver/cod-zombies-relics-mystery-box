# CoD Zombies Cursed Mystery Box

A web app for **Call of Duty Zombies** “Cursed Relics” challenges. Open a 3D Mystery Box to draw a random set of relics from the full pool, then reroll individual cards before your run.

Built for use alongside [CoD Zombies Solver](https://codzombiessolver.com) cursed relic content.

## Features

- **3D Mystery Box** — Rigged GLTF model with an animated lid (React Three Fiber + Three.js)
- **Random draws** — Each open reveals between 1 and all available relics from the pool
- **Three relic tiers** — Grim, Sinister, and Wicked, each with distinct card styling
- **Per-card rerolls** — Swap any revealed relic up to **3 times** per box open
- **Responsive layout** — Desktop overlay grid and a mobile-friendly stacked scene + scrollable cards panel

## How it works

1. Click **Open Box** to spin the Mystery Box and reveal your relics.
2. Read each card’s name, type, and in-game challenge description.
3. Use **Reroll** on cards you want to replace (while rerolls remain).
4. Open the box again anytime for a completely new draw.

Relic data and artwork are loaded from `src/data/relics.ts` and [codzombiessolver.com](https://images.codzombiessolver.com/cursed/) image URLs.

## Tech stack

| Layer | Tools |
| --- | --- |
| UI | React 19, TypeScript |
| Build | Vite 8 |
| 3D | Three.js, `@react-three/fiber`, `@react-three/drei` |

## Getting started

**Requirements:** Node.js 20+ and [pnpm](https://pnpm.io) (recommended) or npm.

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Lint
pnpm lint
```

The dev server runs at `http://localhost:5173` by default.

## Project structure

```
src/
├── App.tsx                 # App shell
├── components/
│   ├── MysteryBox3D.tsx    # 3D Mystery Box experience
│   └── MysteryBox3D.css
├── data/
│   └── relics.ts           # Relic pool (Grim / Sinister / Wicked)
public/
└── mystery-box/            # 3D model (gltf + bin + textures; served as static files)
    ├── scene.gltf
    ├── scene.bin
    ├── textures/
    └── license.txt
```

To add or edit relics, update the arrays in `src/data/relics.ts`. Each relic needs `id`, `name`, `type`, `description`, and `image`.

## 3D model credit

The Mystery Box mesh is based on **“( Rigged ) COD Zombies Mystery Box”** by [_M_P3p3_](https://sketchfab.com/_M_P3p3_) on Sketchfab, licensed under [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/). See `public/mystery-box/license.txt` for full attribution.

## License

This project’s application code is private (`package.json` sets `"private": true`). Third-party assets (3D model, relic images) remain subject to their respective licenses and terms.

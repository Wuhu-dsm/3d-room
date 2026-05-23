# Stack Research: Cyberpunk 3D Room

## Context

This is a subsequent milestone on an existing desktop-first Three.js room. The goal is not to replace the stack, but to extend the existing architecture safely.

## Existing Stack

- Three.js `^0.161.0` for WebGL scene rendering, GLB loading, postprocessing, raycasting, and audio.
- GSAP for camera and object animation.
- CSS3DRenderer for embedded monitor and arcade iframes.
- Webpack 5 with Babel, raw GLSL loaders, file loaders, and static asset copy.
- Plain CSS for DOM UI overlays, loading screen, banner, back/audio controls, and whiteboard controls.
- Custom GLSL for loading overlay, CRT screen effect, carpet shell texturing, coffee steam, and sky.

## Recommended Direction

- Keep Three.js and the current `Experience` singleton orchestration for this milestone.
- Add cats as a dedicated `Cats` world component under `src/Experience/`, mirroring `Carpet`, `TopChair`, and `RubiksCube`.
- Load `cat_1.glb`, `cat_2.glb`, `cat_3.glb`, and `miaomiao.mp3` through `src/Experience/assets.js`.
- Keep click routing in `Navigation.js` and `constants.js` by adding cat group names to `ELEMENTS_TO_RAYCAST`.
- Implement speech bubbles as DOM overlays positioned from 3D world coordinates to screen coordinates. This is more maintainable than baking text into the model and easier to style like neon HUD UI.
- Restyle the existing DOM shell in `src/index.html` and `src/style.css` into the cyberpunk top nav, side panels, and loading experience.

## What Not To Change

- Do not migrate to React, TypeScript, Vite, or a new engine for this milestone.
- Do not replace the baked room assets unless a visual gap cannot be closed with lighting, CSS overlays, camera framing, and additive 3D/DOM elements.
- Do not introduce a separate pointer/input system for cats.

## Confidence

High. The requested work fits the current stack and the required assets already exist.

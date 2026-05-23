# Research Summary: Cyberpunk 3D Room

## Stack

Keep the current Three.js/Webpack architecture. The requested version is a focused brownfield milestone: visual alignment, DOM HUD polish, loading restyle, and a new `Cats` world component.

## Table Stakes

- Cyberpunk top navigation aligned to the reference.
- Left/right neon HUD side panels.
- Stronger central 3D room framing and composition.
- Cyberpunk loading animation that preserves the existing start click/audio lifecycle.
- Three visible cat models placed in the room.
- Per-cat click interactions with meow audio and speech bubbles.
- Regression safety for existing interactions.

## Watch Out For

- Cat GLBs are large and may slow loading.
- Existing raycast parent normalization may need adjustment for nested cat model meshes.
- DOM speech bubbles need camera projection and offscreen handling.
- The loader must keep the user gesture before audio playback.

## Recommended Roadmap Shape

1. Baseline gap assessment and cyberpunk shell foundation.
2. Cat model integration and interactions.
3. Loading animation and visual polish pass.
4. Verification, performance, and regression cleanup.

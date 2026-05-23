---
quick_id: 260523-xaa
slug: glb-blender
status: complete
date: 2026-05-23
---

# Quick Task 260523-xaa Summary

Task: Inspect the provided Sprite GLB with Blender and place it on the room mousepad/desk area if usable.

Completed:

- Verified the provided GLB imports successfully in Blender 5.1.2 with Draco decoding.
- Measured the model bounds as approximately `1.78673 x 2.0 x 1.300617` before app scaling.
- Added the Sprite GLB as `static/assets/models/deskSpriteCan.glb`.
- Registered `deskSpriteCan` in `src/Experience/assets.js`.
- Added `DESK_SPRITE_CAN_*` placement constants in `src/Experience/constants.js`.
- Added `setDeskSpriteCan()` to `src/Experience/DeskProps.js`, using the existing desk prop/material handling pattern.
- Restored `static/assets/models/deskCoffeeReplacement.glb` from the existing 3.5MB replacement asset after noticing it had been overwritten during resource juggling.

Chosen placement:

- Position: `(-0.18, 1.605, -3.67)`
- Rotation Y: `-18deg`
- Scale: `0.105`

Verification:

- `npm run build` passes.
- Browser check on `http://localhost:8085` loaded the app, clicked START, and reported no console warnings/errors.
- Browser page asset inventory confirmed `deskSpriteCan.glb` was requested alongside `room3_no_coffee.glb`, `Rubik.glb`, and `deskCoffeeReplacement.glb`.
- Blender preview confirmed the model can sit on a mousepad/desk proxy at the chosen scale.

Notes:

- The model appears very light/white under the quick Blender preview lighting, so a future visual polish pass may want material/color treatment if the in-room lighting also reads too pale.
- The repository had many pre-existing uncommitted changes; this task only added the Sprite resource wiring on top of the current working tree.

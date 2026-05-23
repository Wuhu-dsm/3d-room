# Architecture Research: Cyberpunk 3D Room

## Component Boundaries

### Existing Components

- `Experience.js`: singleton root, owns scene, camera, renderer, resources, world, navigation, and update loop.
- `World.js`: creates scene components after resource group `base` finishes loading.
- `assets.js`: defines all resources loaded by `Resources` and `Loader`.
- `Navigation.js`: owns pointer state, raycast selection, hover cursor, outline pass selection, camera fly-to routes, and active stage handling.
- `AudioManager.js`: plays one-shot and looping audio from loaded resource buffers.
- `style.css` and `index.html`: own DOM overlays such as banner, loading screen, audio button, back button, and whiteboard controls.

### New Components

- `Cats.js`: loads cat model scenes from `resources.items`, places them in the room, names their root groups, exposes `handleCatClick(name)`, and updates speech-bubble screen positions.
- DOM speech bubble container: rendered in `index.html`, styled in `style.css`, controlled by `Cats.js` or `Navigation.js`.

## Data Flow

1. `assets.js` adds `cat1`, `cat2`, `cat3`, and `miaomiao`.
2. `Resources` loads models and audio before firing `groupEnd("base")`.
3. `World` instantiates `Cats` after `Baked`, `Carpet`, and other room components exist.
4. `Cats` adds three named cat groups to the scene.
5. `constants.js` adds cat group names to `ELEMENTS_TO_RAYCAST`.
6. `Navigation.checkIntersection()` sees cat groups and sets pointer/outline feedback.
7. `Navigation.flyToPosition()` routes cat keys to `world.cats.handleCatClick(key)` instead of camera fly-to movement.
8. `Cats` plays `miaomiao` through `AudioManager` and shows the selected cat bubble.

## Build Order

1. Update asset manifest and create `Cats.js`.
2. Integrate cats into `World` and `Navigation`.
3. Add speech bubble DOM/CSS.
4. Restyle existing DOM shell and loading UI.
5. Tune camera/framing/positions through manual browser verification.

## Notes

- Cat placement should use constants for position, rotation, and scale so tuning is localized.
- The bubble projection should reuse the main camera and canvas size.
- Avoid mutating shared baked room material for cat models; give cats their own materials or preserve the GLB materials.

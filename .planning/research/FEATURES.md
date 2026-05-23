# Feature Research: Cyberpunk 3D Room

## Table Stakes For This Version

### Visual Reference Alignment

- Top navigation should use glowing cyberpunk pill buttons similar to the reference: Home, About, Projects, Gallery, Contact.
- Left and right side panels should feel like neon HUD cards with cyan/magenta borders, small labels, scanline or circuit-like details, and status-style content.
- The central 3D room should be the visual anchor, with stronger neon edge framing and composition close to the reference.
- The loading experience should use the same neon language instead of the current blue/orange circular portfolio loader.

### Cat Interactions

- Three cat models must be visible in the room.
- Two cats sit on the carpet.
- One cat sits on the desk.
- Each cat is independently clickable.
- Clicking a cat plays `miaomiao.mp3`.
- Clicking a cat shows a styled speech bubble that introduces that cat.
- Hovering/clickability should be discoverable through cursor and outline feedback.

### Integration Quality

- Existing activities should still work after visual changes: monitor navigation, arcade screen, whiteboard, Rubik's cube, audio toggle, and back button.
- Loading must still wait for user start before autoplaying background audio.
- The scene must remain desktop-first and avoid layout overlap at common desktop viewport sizes.

## Differentiators

- Each cat can have its own name, personality text, and bubble placement.
- The loading animation can include cyberpunk scanlines, neon ring progress, glitch text, or HUD boot sequence styling.
- Side panels can summarize project/status/skills information to better match the reference composition.

## Anti-Features

- Do not add backend-driven project data.
- Do not add mobile responsive redesign during this milestone.
- Do not overbuild cat state machines or complex animation if static seated models meet the version goal.
- Do not add heavy extra visual libraries when CSS and existing Three.js postprocessing can carry the style.

## Complexity Notes

- Cat GLB files are very large, around 80-92MB each. This may noticeably slow loading.
- Speech bubbles need reliable 3D-to-2D projection and should hide or reposition if the cat is behind the camera.
- The current loader shows total asset progress; adding three huge GLBs makes loader polish more important because users may see it longer.

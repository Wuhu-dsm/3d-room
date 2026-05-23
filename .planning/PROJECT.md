# Cyberpunk 3D Room

## What This Is

This project is a browser-based interactive Three.js 3D room that should feel like a cyberpunk personal space / portfolio venue. The current version already has an existing 3D room, baked models, monitor iframes, navigation, audio, and loading flow; this milestone upgrades the visual direction to match the provided neon UI reference and adds three interactive cats inside the room.

For this version, the room should read as a polished cyberpunk main venue: neon top navigation, left and right HUD-style side panels, a stronger central 3D room composition, and a loading animation that belongs to the same visual language.

## Core Value

Users should immediately feel they entered a cohesive cyberpunk 3D room and discover charming cat interactions inside it.

## Requirements

### Validated

- Existing browser-based Three.js room renders on desktop.
- Existing room assets, baked textures, monitor screens, arcade, whiteboard, Rubik's cube, audio manager, and pointer raycasting are already integrated.
- Existing loading flow loads assets, waits for a start click, starts audio, and then reveals the scene.

### Active

- [ ] Align the overall visual presentation with the supplied cyberpunk UI reference.
- [ ] Evaluate and close visible gaps in the top navigation bar, left/right cyberpunk side panels, center 3D room framing, and opening loading animation.
- [ ] Add three cat models to the room: two cats seated on the carpet and one cat seated on the desk.
- [ ] Make each cat clickable through the existing interaction/raycast system.
- [ ] On cat click, play the meow audio and show a speech bubble introducing that cat.
- [ ] Update the opening loading animation so it matches the neon cyberpunk visual style.

### Out of Scope

- Rebuilding the entire room model from scratch - this version should extend and polish the existing Three.js room.
- Replacing the Three.js/Webpack architecture - the existing singleton Experience/World/component pattern stays in place.
- Mobile optimization - the current app is desktop-first, and this milestone focuses on the desktop cyberpunk room experience.
- Backend services or persistence - cat interactions and UI polish are local frontend behavior for this milestone.

## Context

- The project is a brownfield Three.js/Webpack app in `D:\学习\3d-room`.
- Runtime is native browser JavaScript with ES modules, Three.js `^0.161.0`, GSAP, CSS3DRenderer screens, custom shaders, and Webpack 5.
- The scene is orchestrated by the `Experience` singleton. `World` creates scene components after the `base` resource group loads.
- Existing resource loading is defined in `src/Experience/assets.js`; models and sounds under `static/` are copied into the dev/prod build.
- Existing cat assets are already present as `static/cat_1.glb`, `static/cat_2.glb`, and `static/cat_3.glb`.
- Existing meow audio is present as `static/assets/sounds/miaomiao.mp3`.
- Current UI is still close to the original portfolio implementation: a simple blue/orange top banner, circular loading button, back/audio controls, and activity labels. The supplied reference asks for a more immersive neon cyberpunk shell with top nav pills, side HUD panels, stronger magenta/cyan edge lighting, and an integrated bottom status bar feel.
- Current interaction is centralized in `Navigation.js`, which raycasts named scene objects listed in `ELEMENTS_TO_RAYCAST` from `constants.js`.
- Current audio is centralized in `AudioManager.js`, which can play loaded one-shot sounds by resource name.

## Constraints

- **Architecture**: Keep the existing `Experience` / `World` / component structure so the feature fits the current codebase.
- **Rendering**: Use Three.js scene objects for cat models and room placement; use DOM/CSS only for overlay UI and speech bubbles where that is simpler and more readable.
- **Assets**: Use the existing three cat GLB files and existing `miaomiao.mp3` unless they prove unusable.
- **Interaction**: Cat clicks should integrate with the existing raycast/navigation model rather than creating a separate input system.
- **Visual Direction**: Match the provided cyberpunk reference: black/deep navy base, cyan and magenta neon outlines, HUD panel borders, glowing nav pills, and a theatrical center-room composition.
- **Scope**: The version should prioritize visible alignment and delightful cat interaction over broad portfolio content expansion.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Treat this as a brownfield visual/interaction milestone | Existing code and codebase map are present; the fastest path is to extend the current architecture. | Pending |
| Use existing cat GLBs and meow audio | Assets already exist in the repo, reducing modeling/audio risk. | Pending |
| Keep implementation desktop-first | Existing app explicitly degrades on mobile and the reference UI is a desktop composition. | Pending |
| Implement cats as a dedicated world component | Mirrors existing scene components like `Carpet`, `TopChair`, and `RubiksCube` and keeps cat placement/interaction localized. | Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? Move to Out of Scope with reason
2. Requirements validated? Move to Validated with phase reference
3. New requirements emerged? Add to Active
4. Decisions to log? Add to Key Decisions
5. "What This Is" still accurate? Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-23 after initialization*

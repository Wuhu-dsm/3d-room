# Phase 1: Cyberpunk UI Shell & Room Framing - Context

**Gathered:** 2026-05-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 delivers the visual shell and first-screen room framing for the cyberpunk reference alignment. It covers the top navigation styling, left/right HUD panel composition, central 3D room stage framing, color/motion intensity, and a bottom status bar. It does not add cats, cat interactions, loading animation redesign, or new business interactions; those belong to later phases.

</domain>

<decisions>
## Implementation Decisions

### Top Navigation Mapping
- **D-01:** Keep the current top navigation function names: `ABOUT ME`, `PROJECTS`, `ARCADE MACHINE`, `WHITEBOARD`, `RUBIK'S CUBE`.
- **D-02:** Keep the current automatic hide/show behavior controlled by `Navigation.handleBannerVisibility()`. Do not change the top nav into a permanently fixed reference-style nav.
- **D-03:** Restyle the existing banner links as neon pill buttons: dark translucent surface, thin neon border, glow/hover treatment, and cyberpunk color accents.
- **D-04:** Keep the navigation copy uppercase English.

### Side HUD Panel Content
- **D-05:** Build high-density left and right HUD panels that closely reproduce the supplied reference image's composition.
- **D-06:** Treat side panel content as atmosphere decoration first, not fully meaningful product content. Pseudo data, status codes, waveforms, numbers, and short labels are acceptable.
- **D-07:** Keep side HUD panels mostly non-clickable in Phase 1. They are visual shell elements, not new interaction entry points.
- **D-08:** Side HUD panels may lightly overlap the room edges like the reference, but the central 3D room must remain readable.

### Central 3D Room Framing
- **D-09:** Make the central 3D room feel like a stage box / main venue while preserving orbit controls.
- **D-10:** The default camera may be significantly adjusted to better match the reference image's 3/4 main venue view. Planning may change `CAMERA_POSITION`, `CAMERA_TARGET`, and `CAMERA_QUATERNION`.
- **D-11:** Use both DOM-level framing and 3D scene treatment to strengthen the neon stage feeling. Do not rely on only one layer.
- **D-12:** Keep side HUD panels always visible while preserving the top navigation's existing auto-hide behavior.

### Visual Intensity
- **D-13:** Use high-intensity cyberpunk styling close to the reference image.
- **D-14:** Use balanced cyan and magenta as the dual primary neon colors.
- **D-15:** Use visible but non-distracting pulse, scanline, glitch, glow, and hover effects. These effects must not interfere with reading or interaction.
- **D-16:** Add a mostly static decorative bottom status bar as part of the Phase 1 UI shell.

### Agent Discretion
- Choose exact decorative HUD text, pseudo metrics, panel labels, and status snippets as long as they fit the high-density cyberpunk atmosphere and do not imply new clickable features.
- Choose exact neon timing, shadows, and line styles, provided the result remains readable and does not overwhelm the central room.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Planning Context
- `.planning/ROADMAP.md` - Phase 1 goal, requirements, and success criteria.
- `.planning/REQUIREMENTS.md` - VIS-01 through VIS-05 are the Phase 1 requirements.
- `.planning/PROJECT.md` - Project vision, visual direction, constraints, and out-of-scope boundaries.

### Existing UI And Interaction
- `src/index.html` - Existing DOM shell: loading screen, banner navigation, audio/back buttons, whiteboard controls, CSS3D mount points, WebGL canvas.
- `src/style.css` - Existing global UI styling for banner, buttons, loader, controls, and mobile message.
- `src/Experience/Navigation.js` - Existing banner link behavior, auto-hide logic, camera routing, pointer/raycast state, and active stage handling.
- `src/Experience/constants.js` - Current camera constants, navigation/raycast constants, and interaction target names.

### Codebase Maps
- `.planning/codebase/CONVENTIONS.md` - Existing code style and module conventions.
- `.planning/codebase/STRUCTURE.md` - Existing source tree and relevant files for UI shell work.
- `.planning/codebase/STACK.md` - Existing Three.js/Webpack/CSS stack constraints.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Existing `.banner` / `.banner-link` DOM structure can be restyled into neon pill navigation without changing navigation ids.
- Existing `Navigation.handleBannerVisibility()` already controls top banner hide/show and must remain the source of truth for nav visibility.
- Existing `#webgl`, `#cssArcadeMachine`, `#cssLeftMonitor`, and `#cssRightMonitor` mounts occupy the full viewport and should remain intact under the new DOM HUD shell.
- Existing `CAMERA_POSITION`, `CAMERA_TARGET`, and `CAMERA_QUATERNION` constants can be tuned to establish the new 3/4 main venue view.

### Established Patterns
- UI overlays are plain HTML/CSS in `src/index.html` and `src/style.css`, not React components.
- Main scene behavior is orchestrated through the `Experience` singleton and `Navigation`; Phase 1 should avoid adding an unrelated interaction system.
- Current app is desktop-first and already excludes mobile; Phase 1 can optimize for desktop composition.

### Integration Points
- Add side HUD and bottom status bar DOM nodes in `src/index.html`.
- Style all Phase 1 shell elements in `src/style.css`.
- Update camera constants in `src/Experience/constants.js` if needed for the reference-like default framing.
- Keep banner link ids unchanged so `Navigation.js` can continue routing existing interactions.

</code_context>

<specifics>
## Specific Ideas

- The supplied reference image is the primary visual target: high-density cyberpunk panels, cyan/magenta neon edges, glowing pill navigation, central stage-like 3D room, and a bottom status dock.
- Phase 1 should make the first impression feel close to the reference even before cats and the loading redesign are added.
- The HUD panels can be atmospheric and decorative: system online, creative lab, faux update panels, skill meters, small code/status labels, and waveform-like details are all acceptable.

</specifics>

<deferred>
## Deferred Ideas

- Cat models and cat interactions are Phase 2.
- Cyberpunk opening loading animation is Phase 3.
- Performance optimization for large cat models is Phase 4 or v2, not Phase 1.
- Mobile/responsive redesign remains out of scope.

</deferred>

---

*Phase: 1-Cyberpunk UI Shell & Room Framing*
*Context gathered: 2026-05-23*

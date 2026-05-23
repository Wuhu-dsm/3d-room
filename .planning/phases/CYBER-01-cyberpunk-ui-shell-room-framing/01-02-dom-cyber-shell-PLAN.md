---
phase: 01
plan: 01-02
type: implementation
wave: 1
depends_on:
  - 01-01
files_modified:
  - src/index.html
  - src/style.css
autonomous: true
requirements:
  - VIS-01
  - VIS-02
  - VIS-03
  - VIS-05
---

<objective>
Implement the reference-like cyberpunk DOM shell: neon pill navigation, dense left/right HUD panels, a central room frame, and a bottom status dock.
</objective>

<tasks>
1. Add non-interactive left and right HUD markup with atmospheric pseudo data, status codes, waveforms, and compact labels.
2. Restyle the existing `.banner` and `.banner-link` elements as cyan/magenta neon pill navigation while keeping ids unchanged.
3. Add a central frame overlay and bottom status dock that sit above the WebGL canvas without blocking room interactions.
4. Keep audio, back, whiteboard, and Rubik controls visually compatible with the new neon shell.
</tasks>

<verification>
- Existing nav ids remain unchanged: `leftMonitor`, `rightMonitor`, `arcadeMachine`, `whiteboard`, `rubikGroup`.
- HUD shell has `pointer-events: none` except existing interactive controls.
- Desktop screenshot resembles the supplied reference's composition and density.
</verification>

<success_criteria>
- VIS-01, VIS-02, VIS-03, and VIS-05 are visibly satisfied in the first desktop viewport.
- Existing navigation still routes to the same activities.
</success_criteria>

---
phase: 01
plan: 01-03
type: implementation
wave: 1
depends_on:
  - 01-02
files_modified:
  - src/Experience/constants.js
  - src/Experience/World.js
  - src/Experience/CyberStage.js
  - src/Experience/Renderer.js
autonomous: true
requirements:
  - VIS-04
---

<objective>
Tune the central Three.js room so it reads as the main cyberpunk venue inside the new HUD shell.
</objective>

<tasks>
1. Adjust default camera constants if needed to create a readable 3/4 stage view with orbit controls preserved.
2. Add lightweight Three.js neon edge strips and stage lighting to reinforce cyan/magenta room edges.
3. Tune renderer clear color and outline colors to match the cyberpunk palette.
4. Verify the WebGL scene remains interactive and readable under the DOM overlays.
</tasks>

<verification>
- Build succeeds.
- Desktop browser screenshot shows a central room with stronger cyan/magenta stage presence.
- Orbit controls and existing click targets remain usable.
</verification>

<success_criteria>
- VIS-04 is visibly satisfied.
- The central room remains readable despite high-density HUD panels.
</success_criteria>

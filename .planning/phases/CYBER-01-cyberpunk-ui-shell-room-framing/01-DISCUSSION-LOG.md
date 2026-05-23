# Phase 1: Cyberpunk UI Shell & Room Framing - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-05-23
**Phase:** 1-Cyberpunk UI Shell & Room Framing
**Areas discussed:** Top Navigation Mapping, Side HUD Panel Content, Central 3D Room Framing, Visual Intensity

---

## Top Navigation Mapping

| Option | Description | Selected |
|--------|-------------|----------|
| Reference labels mapped to existing interactions | Use Home/About/Projects/Gallery/Contact style labels mapped onto current interaction targets. | |
| Keep current function names and restyle | Keep ABOUT ME / PROJECTS / ARCADE MACHINE / WHITEBOARD / RUBIK'S CUBE and make them neon. | Yes |
| Hybrid with secondary shortcuts | Use reference-like top nav plus secondary shortcuts for current activities. | |
| Agent decides | Let the agent choose a reference-aligned mapping. | |

**User's choice:** Keep current function names and restyle.
**Notes:** Navigation labels remain uppercase English. Existing auto-hide behavior remains; button visuals become neon pills.

---

## Side HUD Panel Content

| Option | Description | Selected |
|--------|-------------|----------|
| High-density reference-like panels | Many left/right cyberpunk panels, close to the supplied reference composition. | Yes |
| Medium density with breathing room | Fewer panels, less overlap. | |
| Low-density decorative panels | Minimal frame/status decoration only. | |
| Agent decides | Let the agent balance density. | |

**User's choice:** High-density reference-like panels.
**Notes:** The panels are atmospheric decoration first, mostly non-clickable, and may lightly overlap room edges while preserving central room readability.

---

## Central 3D Room Framing

| Option | Description | Selected |
|--------|-------------|----------|
| Stage-box feeling while preserving orbit | Adjust first view and frame the room like a main stage, but keep orbit controls. | Yes |
| Mostly fixed poster composition | Prioritize a fixed view close to the reference. | |
| Keep current free view and only enhance color | Minimal camera/layout change. | |
| Agent decides | Let the agent choose. | |

**User's choice:** Stage-box feeling while preserving orbit.
**Notes:** Default camera may be significantly adjusted. DOM and 3D scene both need stronger neon framing. Side HUD stays visible while top nav keeps auto-hide behavior.

---

## Visual Intensity

| Option | Description | Selected |
|--------|-------------|----------|
| High-intensity close reference match | Strong neon, high-density HUD, cyan/magenta contrast, scanline/glow. | Yes |
| Medium-high intensity | Reference-like but lighter. | |
| Restrained premium feeling | Quieter and less dense. | |
| Agent decides | Let the agent choose intensity. | |

**User's choice:** High-intensity close reference match.
**Notes:** Cyan and magenta should be balanced. Motion effects should be visible but not distracting. Add a mostly static decorative bottom status bar.

---

## Agent Discretion

- Exact HUD copy and pseudo metrics are left to the agent.
- Exact CSS glow, scanline, pulse, and neon timing are left to the agent as long as readability and interaction are preserved.

## Deferred Ideas

- Cat models and interactions belong to Phase 2.
- Loading animation redesign belongs to Phase 3.
- Cat model optimization and mobile responsiveness remain deferred.

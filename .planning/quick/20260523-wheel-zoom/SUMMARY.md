---
status: complete
updated: "2026-05-23"
---

# Summary

Enabled wheel zoom for the current 3D view.

## Changes

- Turned on `ORBIT_CONTROLS_CONFIG.enableZoom`.
- Added a Navigation-level wheel zoom fallback that moves the camera along its current view direction and clamps to the existing min/max distance.
- Forwarded monitor iframe wheel events to the Navigation zoom handler where the parent page can receive them.
- Temporarily releases monitor iframe pointer capture during a wheel gesture, then restores the active monitor interaction after the gesture settles.

## Verification

- `npm run build` passes with existing asset-size warnings.
- Browser QA on `http://localhost:8084` confirmed wheel zoom changes the current 3D view and console stays clean.

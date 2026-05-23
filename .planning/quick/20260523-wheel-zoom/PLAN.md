---
status: in-progress
created: "2026-05-23"
---

# Quick Task: wheel zoom

## Goal

Enable mouse wheel zoom for the current 3D view while preserving existing pan lock and front-facing navigation limits.

## Scope

- Change only OrbitControls navigation configuration unless verification exposes a related blocker.
- Do not alter unrelated scene, asset, or UI code.

## Verification

- Run `npm run build`.
- Browser-check the local app: click START, scroll wheel on the scene, confirm the visible camera distance changes.

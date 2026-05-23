---
quick_id: 260523-xaa
slug: glb-blender
status: planned
date: 2026-05-23
---

# Quick Task 260523-xaa: Sprite GLB Mousepad Placement

Goal: Inspect `C:/Users/Administrator/Downloads/192f588f-048f-486b-ba97-fe91a7bb66e5.glb` with Blender and, if usable, place it as a small Sprite model on the room mousepad/desk area.

Plan:

1. Use Blender background import to verify the GLB loads, read its mesh bounds, and choose a desk-scale transform.
2. Copy the GLB into the project's static model assets with a readable name.
3. Add it to the existing resource manifest and `DeskProps` component using constants for position, rotation, and scale.
4. Run a build or browser smoke check to catch loader/runtime errors and adjust placement if needed.

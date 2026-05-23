# Pitfalls Research: Cyberpunk 3D Room

## Pitfall: Heavy Cat Assets Break First Impression

**Warning signs**
- Loading stays on screen much longer after adding cats.
- Browser memory spikes or WebGL context becomes unstable.

**Prevention**
- Measure loading after integration.
- If needed, reduce cat GLB size with compression/decimation, or load cats after the initial room reveal.
- Keep the loader visually polished because users may spend real time there.

**Phase**
- Phase 2 for initial integration, Phase 4 for final performance verification.

## Pitfall: UI Looks Like A Skin Rather Than The Reference

**Warning signs**
- Top nav changes color but keeps the old flat banner structure.
- Side panels are absent or feel like ordinary boxes.
- Central room lacks the theatrical cyan/magenta framing from the reference.

**Prevention**
- Treat visual alignment as explicit requirements: top nav, side panels, center framing, loading.
- Use cyan/magenta neon borders, HUD corners, dark translucent surfaces, and consistent typography.

**Phase**
- Phase 1 and Phase 3.

## Pitfall: Cat Clicks Conflict With Existing Navigation

**Warning signs**
- Clicking a cat triggers an unintended camera move.
- Existing activities stop being selectable.
- Outline selection picks a child mesh parent incorrectly.

**Prevention**
- Give each cat a stable named root group.
- Route cat keys explicitly in `Navigation.flyToPosition()`.
- Verify `selectedObject` normalization works for non-Rubik nested GLB meshes.

**Phase**
- Phase 2.

## Pitfall: Speech Bubble Does Not Track The 3D Scene

**Warning signs**
- Bubble appears far from the cat after orbiting.
- Bubble overlaps important controls.
- Bubble remains visible when cat is offscreen.

**Prevention**
- Project a world anchor point each frame.
- Hide or clamp bubbles when offscreen.
- Provide compact bubble text and fixed max width.

**Phase**
- Phase 2.

## Pitfall: Loading Redesign Breaks Start-Audio Flow

**Warning signs**
- Background music starts before user click.
- Start button disappears before resources are ready.
- Overlay fades before the world exists.

**Prevention**
- Keep `Resources.fileLoadEnd()` lifecycle intact: progress -> finished -> START click -> audio -> overlay removal.
- Restyle and animate the DOM/CSS around this lifecycle instead of rewriting it completely.

**Phase**
- Phase 3.

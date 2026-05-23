# Roadmap: Cyberpunk 3D Room

## Overview

This milestone turns the existing desktop Three.js room into a cohesive cyberpunk 3D venue matching the supplied reference image. Work is structured as horizontal layers: first the visual shell and reference alignment, then the cat model/interaction layer, then the loading animation layer, and finally verification/performance cleanup across the whole experience.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Cyberpunk UI Shell & Room Framing** - Align top nav, side HUD panels, and central room framing with the reference.
- [ ] **Phase 2: Cat Models & Interactions** - Add three cats, raycast clicks, meow audio, and speech bubbles.
- [ ] **Phase 3: Opening Loading Experience** - Redesign the loader into a neon cyberpunk boot/start sequence.
- [ ] **Phase 4: Regression, Performance & Polish** - Verify existing interactions, build, layout, and loading quality.

## Phase Details

### Phase 1: Cyberpunk UI Shell & Room Framing
**Goal**: Replace the old flat portfolio shell with a cyberpunk top nav, side HUD panels, and stronger central room presentation.
**Depends on**: Nothing (first phase)
**Requirements**: [VIS-01, VIS-02, VIS-03, VIS-04, VIS-05]
**Success Criteria** (what must be TRUE):
  1. User can see neon pill-style top navigation aligned with the reference image.
  2. User can see left and right HUD-style side panels with cyan/magenta cyberpunk styling.
  3. User can see the 3D room framed as the central main venue with stronger neon presence.
  4. User can still reach existing interactive destinations from the redesigned navigation.
**Plans**: 3 plans

Plans:
- [ ] 01-01: Audit current UI against the reference and define concrete visual gaps.
- [ ] 01-02: Implement cyberpunk top navigation and left/right HUD panel DOM/CSS.
- [ ] 01-03: Tune central room framing, neon color treatment, and interaction affordances.

### Phase 2: Cat Models & Interactions
**Goal**: Add three visible cats to the room and make each cat independently clickable with meow audio and a speech bubble.
**Depends on**: Phase 1
**Requirements**: [CAT-01, CAT-02, CAT-03, CAT-04, CAT-05, CAT-06, CAT-07, CAT-08]
**Success Criteria** (what must be TRUE):
  1. User can see two cats on or near the carpet and one cat on the desk.
  2. User can hover each cat and receive pointer/outline affordance.
  3. User can click each cat without triggering unrelated activities.
  4. User hears a meow and sees the selected cat's introduction bubble.
  5. User can switch between cats and see bubble content update.
**Plans**: 3 plans

Plans:
- [ ] 02-01: Add cat and meow resources, constants, and a dedicated Cats world component.
- [ ] 02-02: Place and tune three cat models in the room.
- [ ] 02-03: Wire raycast clicks, audio playback, speech bubbles, and bubble positioning.

### Phase 3: Opening Loading Experience
**Goal**: Restyle the loading and start sequence so it belongs to the same neon cyberpunk UI language while preserving the audio-start lifecycle.
**Depends on**: Phase 2
**Requirements**: [LOAD-01, LOAD-02, LOAD-03, LOAD-04]
**Success Criteria** (what must be TRUE):
  1. User sees a cyberpunk loading animation rather than the old blue/orange circular loader.
  2. User can understand that loading is in progress before Start is available.
  3. User must still click Start before background audio begins.
  4. User sees a smooth transition from loader to room.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Redesign loading DOM/CSS and progress/start states.
- [ ] 03-02: Preserve loader lifecycle and tune transition timing against heavy cat assets.

### Phase 4: Regression, Performance & Polish
**Goal**: Validate the finished milestone, catch regressions, and ensure the cyberpunk room remains usable despite added assets and overlays.
**Depends on**: Phase 3
**Requirements**: [REG-01, REG-02, REG-03, REG-04]
**Success Criteria** (what must be TRUE):
  1. Existing monitor, arcade, whiteboard, Rubik's cube, back button, and audio toggle interactions still work.
  2. Production build completes successfully.
  3. Desktop layout has no incoherent overlap between nav, HUD panels, bubbles, controls, and WebGL content.
  4. Cat asset loading does not break initial room creation and the loading state remains intentional.
**Plans**: 3 plans

Plans:
- [ ] 04-01: Run interaction regression checks across existing activities and new cat interactions.
- [ ] 04-02: Run production build and address blocking errors.
- [ ] 04-03: Polish desktop layout, visual consistency, and loading/performance risks.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Cyberpunk UI Shell & Room Framing | 0/3 | Not started | - |
| 2. Cat Models & Interactions | 0/3 | Not started | - |
| 3. Opening Loading Experience | 0/2 | Not started | - |
| 4. Regression, Performance & Polish | 0/3 | Not started | - |

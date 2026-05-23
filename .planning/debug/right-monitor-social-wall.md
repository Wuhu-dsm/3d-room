---
status: resolved
trigger: "Fix remaining bugs: right monitor focus, wrong wall content, and wrong side-wall image plane."
created: "2026-05-23"
updated: "2026-05-23"
---

# Debug Session: right-monitor-social-wall

## Symptoms

- Expected behavior: clicking the right monitor should switch into a close right-monitor computer view.
- Actual behavior: the camera ended in an incorrect room composition instead of focusing the right monitor.
- Expected behavior: wall content should use the original social account link models.
- Actual behavior: a screenshot texture was added as a wall photo decal.
- Expected behavior: no extra side-wall image plane should be present.
- Actual behavior: the right/side wall contained a flat image plane workaround.

## Current Focus

- hypothesis: The screenshot wall decal workaround should be removed and the original social GLB models restored. Right monitor switching also needs to disable the inactive monitor iframe so Navigation can receive clicks.
- test: build and browser-check the click flow.
- expecting: no wallPicture asset, no WALL_PHOTO_DECALS, social models loaded through Baked, and right-monitor click transitions to the right monitor view.
- next_action: resolved.

## Evidence

- The asset manifest included `wallPicture` from `assets/social/screenshot.png`.
- `DeskProps` created `wallPicture*` planes using `WALL_PHOTO_DECALS`.
- `Baked` no longer loaded the original social link models.
- Both monitor CSS3D iframes could become pointer targets at the same time.

## Resolution

- root_cause: A temporary screenshot decal plane had been added as wall content, replacing the intended original social link models visually. The right monitor iframe was also allowed to intercept pointer events while it was not the active computer, so the parent Navigation raycast could not reliably receive the click needed to switch computers.
- fix: Removed the screenshot wall decal asset/constants/scene creation, restored `linkedin`, `github`, and `itchio` GLB loading through `Baked`, and changed monitor screen activation so only the active computer iframe receives pointer events while the inactive monitor remains available to Navigation as a raycast switch target.
- verification: `npm run build` passes. Browser QA on `http://localhost:8084` confirmed START enters the left monitor close view, clicking the right monitor switches to a right monitor close view, standing view shows original social 3D wall icons, and the incorrect flat screenshot planes are gone.
- files_changed: `src/Experience/assets.js`, `src/Experience/Baked.js`, `src/Experience/DeskProps.js`, `src/Experience/constants.js`, `src/Experience/LeftMonitorScreen.js`, `src/Experience/RightMonitorScreen.js`, `src/Experience/Navigation.js`, `src/Experience/Utils/Loader.js`

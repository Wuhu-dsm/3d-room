---
status: investigating
trigger: "修复指针指着左侧计算机的时候无法滚动视角，并且要保证左侧计算机iframe的点击事件能正常触发"
created: "2026-05-24"
updated: "2026-05-24"
---

# Debug Session: left-monitor-scroll-iframe

## Symptoms

- Expected behavior: when the pointer is over the left computer area, wheel scrolling should still orbit or zoom the room view as the existing camera controls normally do.
- Actual behavior: when the pointer is over the left computer iframe, wheel scrolling does not move the camera view.
- Expected behavior: clicking inside the left computer iframe should still be delivered to the iframe content.
- Actual behavior: not yet verified; the fix must preserve iframe click delivery.
- Error messages: none reported.
- Timeline: not reported.
- Reproduction: move the pointer over the left computer iframe and use the mouse wheel.

## Current Focus

- hypothesis: The CSS3D left-monitor iframe is intercepting wheel events before the parent navigation controls can receive them, while its pointer events are also required for click forwarding into the iframe.
- test: inspect monitor DOM layering and input handlers, then verify with a browser interaction that wheel over the left monitor changes camera state and iframe clicks still reach the iframe.
- expecting: wheel over the left monitor is forwarded to the parent controls without disabling iframe pointer/click interaction.
- next_action: gather code evidence.

## Evidence

## Eliminated

## Resolution

- root_cause:
- fix:
- verification:
- files_changed:

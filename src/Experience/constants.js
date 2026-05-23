import { Vector3 } from "three";

// Camera
export const COMPUTER_CAMERA_TARGET = new Vector3(1.06738, 2.50725, -4.23009);
export const COMPUTER_CAMERA_POSITION = new Vector3(1.06738, 2.60725, -1.6);
export const RIGHT_COMPUTER_CAMERA_TARGET = new Vector3(
  2.47898,
  2.50716,
  -4.14566
);
export const RIGHT_COMPUTER_CAMERA_POSITION = new Vector3(
  2.13997,
  2.60716,
  -1.53751
);
export const STANDING_CAMERA_TARGET = new Vector3(-1.7, 3.05, -4.45);
export const STANDING_CAMERA_POSITION = new Vector3(1.06738, 4.05, -1.6);
export const WHITEBOARD_CAMERA_TARGET = new Vector3(-3.3927, 3.18774, -4.61366);
export const WHITEBOARD_CAMERA_POSITION = new Vector3(-3.3927, 3.18774, -1.05);
export const CAMERA_POSITION = COMPUTER_CAMERA_POSITION;

// Monitors
export const MONITOR_SCREEN_WIDTH = 1370.178;
export const MONITOR_SCREEN_HEIGHT = 764.798;
export const MONITOR_IFRAME_PADDING = "8px";

// Left Monitor
export const LEFT_MONITOR_CSS_OBJECT_POSITION = new Vector3(
  1.06738,
  2.50725,
  -4.23009
);
export const LEFT_MONITOR_CSS_OBJECT_SCALE = new Vector3(0.00102, 0.00102, 1);
export const LEFT_MONITOR_IFRAME_SRC = "https://windows-ten-theta.vercel.app/";

// Right Monitor
export const RIGHT_MONITOR_CSS_OBJECT_POSITION = new Vector3(
  2.47898,
  2.50716,
  -4.14566
);

export const RIGHT_MONITOR_CSS_OBJECT_SCALE = new Vector3(0.00102, 0.00102, 1);
export const RIGHT_MONITOR_CSS_OBJECT_ROTATION_Y = (-7.406 * Math.PI) / 180;
export const RIGHT_MONITOR_IFRAME_SRC = "https://joan-art-gallery.vercel.app";

// Navigate
export const ELEMENTS_TO_RAYCAST = [
  "computerReturnTarget",
  "kadunSpeaker",
  "kadunSpeakerHitbox",
  "leftMonitor",
  "leftMonitorScreen",
  "rightMonitor",
  "rightMonitorScreen",
  "whiteboard",
  "whiteboardCanvas",
];
export const ORBIT_CONTROLS_CONFIG = {
  enabled: false,
  screenSpacePanning: true,
  enableKeys: false,
  zoomSpeed: 1,
  enableZoom: true,
  enablePan: false,
  enableDamping: true,
  dampingFactor: 0.05,
  rotateSpeed: 0.4,
  minAzimuthAngle: -Math.PI / 2,
  maxAzimuthAngle: Math.PI / 2,
  minPolarAngle: Math.PI / 3,
  maxPolarAngle: Math.PI / 2.05,
  minDistance: 2.2,
  maxDistance: 6,
};

// Desk props
export const RUBIK_ROTATION_Y = (-152.484 * Math.PI) / 180;
export const RUBIK_POSITION = new Vector3(-0.67868, 1.499, -3.92849);
export const RUBIK_SCALE = 0.021432;
export const COFFEE_REPLACEMENT_POSITION = new Vector3(
  0.230979,
  1.928,
  -3.64951
);
export const COFFEE_REPLACEMENT_ROTATION_Y = (-18 * Math.PI) / 180;
export const COFFEE_REPLACEMENT_SCALE = 0.28;
export const ZHANGXUEFENG_POSITION = new Vector3(
  2.26,
  2.068,
  -3.59
);
export const ZHANGXUEFENG_ROTATION_Y = (-18 * Math.PI) / 180;
export const ZHANGXUEFENG_SCALE = 0.14;
export const KADUN_POSITION = new Vector3(0.2, 1.928, -4.36);
export const KADUN_ROTATION_Y = 0;
export const KADUN_SCALE = 0.28;
export const KADUN_HITBOX_POSITION = new Vector3(0.2, 1.928, -4.36);
export const KADUN_HITBOX_SIZE = new Vector3(0.42, 0.38, 0.34);
export const PAINT_POSITION = new Vector3(1.07, 3.22, -4.668);
export const PAINT_ROTATION_X = 0;
export const PAINT_ROTATION_Y = 0;
export const PAINT_ROTATION_Z = 0;
export const PAINT_SCALE = 0.48;
export const TOP_CHAIR_POSITION = new Vector3(1.4027, 0.496728, -1.21048);

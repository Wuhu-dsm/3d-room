import {
  Vector2,
  MeshBasicMaterial,
  PlaneGeometry,
  DoubleSide,
  NoBlending,
  Mesh,
} from "three";
import Experience from "./Experience.js";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import {
  MONITOR_SCREEN_WIDTH,
  MONITOR_SCREEN_HEIGHT,
  MONITOR_IFRAME_PADDING,
  RIGHT_MONITOR_IFRAME_SRC,
  RIGHT_MONITOR_CSS_OBJECT_POSITION,
  RIGHT_MONITOR_CSS_OBJECT_SCALE,
  RIGHT_MONITOR_CSS_OBJECT_ROTATION_Y,
} from "./constants.js";

export default class RightMonitorScreen {
  constructor() {
    this.experience = new Experience();
    this.webglElement = this.experience.webglElement;
    this.cssRightMonitorScene = this.experience.cssRightMonitorScene;
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer.instance;
    this.camera = this.experience.camera;
    this.mouse = this.experience.mouse;
    this.materialRightMonitor = this.experience.world.baked.model.material2;
    this.raycaster = this.experience.raycaster;
    this.isActive = false;
    this.isInteractive = false;
    this.screenMonitorSize = new Vector2(
      MONITOR_SCREEN_WIDTH,
      MONITOR_SCREEN_HEIGHT
    );
    this.model = {};
    this.audioManager = this.experience.world.audioManager;
    this.setModel();
    this.setRightMonitorScreen();
  }
  setModel() {
    this.model.mesh = this.resources.items.rightMonitor.scene;
    this.model.mesh.traverse((child) => {
      if (child.isMesh) {
        child.material = this.materialRightMonitor;
      }
    });
    this.model.mesh.name = "rightMonitor";
    this.scene.add(this.model.mesh);
  }

  setRightMonitorScreen() {
    const container = document.createElement("div");
    container.style.width = this.screenMonitorSize.width + "px";
    container.style.height = this.screenMonitorSize.height + "px";
    container.style.pointerEvents = "none";
    container.addEventListener("wheel", this.onWheel, {
      passive: false,
      capture: true,
    });
    this.container = container;

    const iframe = document.createElement("iframe");

    iframe.src = RIGHT_MONITOR_IFRAME_SRC;
    iframe.style.width = this.screenMonitorSize.width + "px";
    iframe.style.height = this.screenMonitorSize.height + "px";
    iframe.style.padding = MONITOR_IFRAME_PADDING;

    iframe.style.transparent = true;
    iframe.id = "right-monitor-screen";
    iframe.style.boxSizing = "border-box";
    iframe.style.background = "black";
    iframe.style.pointerEvents = "none";
    iframe.addEventListener("wheel", this.onWheel, {
      passive: false,
      capture: true,
    });
    this.iframe = iframe;
    container.appendChild(iframe);

    const css3dobject = new CSS3DObject(container);

    css3dobject.position.copy(RIGHT_MONITOR_CSS_OBJECT_POSITION);
    css3dobject.scale.copy(RIGHT_MONITOR_CSS_OBJECT_SCALE);
    css3dobject.rotation.y = RIGHT_MONITOR_CSS_OBJECT_ROTATION_Y;
    this.cssRightMonitorScene.add(css3dobject);

    const material = new MeshBasicMaterial({
      color: "black",
      side: DoubleSide,
      opacity: 0,
      transparent: true,
      blending: NoBlending,
    });
    // Create plane geometry
    const geometry = new PlaneGeometry(
      this.screenMonitorSize.width,
      this.screenMonitorSize.height
    );

    const screen = new Mesh(geometry, material);
    screen.position.copy(css3dobject.position);
    screen.rotation.copy(css3dobject.rotation);
    screen.scale.copy(css3dobject.scale);
    screen.name = "rightMonitorScreen";
    this.model.mesh.add(screen);
  }

  activateControls() {
    this.setInteractive(true);
    window.addEventListener("pointermove", this.onMouseMove, false);
    window.addEventListener("message", this.receiveMessage, false);
    this.onMouseMove();
    this.isActive = true;
  }
  deactivateControls() {
    this.setInteractive(false);
    window.removeEventListener("pointermove", this.onMouseMove, false);
    window.removeEventListener("message", this.receiveMessage, false);
    this.objectRaycasted = null;
    this.webglElement.style.pointerEvents = "auto";
    this.isActive = false;
  }

  setInteractive(isInteractive) {
    this.isInteractive = isInteractive;

    if (this.container) {
      this.container.style.pointerEvents = isInteractive ? "auto" : "none";
    }

    if (this.iframe) {
      this.iframe.style.pointerEvents = "none";
    }
  }

  receiveMessage = (event) => {
    if (event.data == "start") {
      this.audioManager.playSingleAudio("start", 0.3);
    }
  };

  onWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.experience.navigation?.zoomFromWheel(event);
  };

  onMouseMove = () => {
    if (!this.isInteractive) {
      return;
    }

    if (
      this.objectRaycasted &&
      this.objectRaycasted.object &&
      this.objectRaycasted.object.name == "rightMonitorScreen"
    ) {
      this.webglElement.style.pointerEvents = "none";
    } else {
      const leftMonitor = this.experience.world.leftMonitorScreen;
      if (!leftMonitor?.isPointerOverScreen()) {
        this.webglElement.style.pointerEvents = "auto";
      }
    }
  };

  isPointerOverScreen() {
    return (
      this.objectRaycasted &&
      this.objectRaycasted.object &&
      this.objectRaycasted.object.name == "rightMonitorScreen"
    );
  }

  update() {
    if (!this.isActive) {
      return;
    }
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    const intersects = this.raycaster.intersectObjects([this.model.mesh], true);
    this.objectRaycasted = intersects.length > 0 ? intersects[0] : null;
  }
}

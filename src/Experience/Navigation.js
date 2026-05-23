import {
  DoubleSide,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector2,
} from "three";
import Experience from "./Experience.js";
import OrbitControlsCustom from "./OrbitControlsCustom.js";
import gsap from "gsap";
import {
  COMPUTER_CAMERA_POSITION,
  COMPUTER_CAMERA_TARGET,
  ELEMENTS_TO_RAYCAST,
  ORBIT_CONTROLS_CONFIG,
  RIGHT_COMPUTER_CAMERA_POSITION,
  RIGHT_COMPUTER_CAMERA_TARGET,
  STANDING_CAMERA_POSITION,
  STANDING_CAMERA_TARGET,
  WHITEBOARD_CAMERA_POSITION,
  WHITEBOARD_CAMERA_TARGET,
} from "./constants.js";

export default class Navigation {
  constructor() {
    this.experience = new Experience();
    this.backButton = document.getElementById("back-button");
    this.whiteboardButtons = document.getElementById("whiteboard-buttons");
    this.webglElement = this.experience.webglElement;
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.mouse = this.experience.mouse;
    this.raycaster = this.experience.raycaster;
    this.outlinePass = this.experience.renderer.postProcess.outlinePass;
    this.selectedObjects = [];
    this.startClick = new Vector2(null, null);
    this.currentStage = "computer";
    this.activeComputer = "left";
    this.isCameraMoving = false;
    this.wheelPointerReset = null;

    this.setNavigation();
    this.setComputerReturnTarget();
    this.activateControls();
  }

  setNavigation() {
    this.orbitControls = new OrbitControlsCustom(
      this.camera.instance,
      this.webglElement
    );

    this.orbitControls.enabled = ORBIT_CONTROLS_CONFIG.enabled;
    this.orbitControls.screenSpacePanning =
      ORBIT_CONTROLS_CONFIG.screenSpacePanning;
    this.orbitControls.enableKeys = ORBIT_CONTROLS_CONFIG.enableKeys;
    this.orbitControls.enableZoom = ORBIT_CONTROLS_CONFIG.enableZoom;
    this.orbitControls.enablePan = ORBIT_CONTROLS_CONFIG.enablePan;
    this.orbitControls.zoomSpeed = ORBIT_CONTROLS_CONFIG.zoomSpeed;
    this.orbitControls.enableDamping = ORBIT_CONTROLS_CONFIG.enableDamping;
    this.orbitControls.dampingFactor = ORBIT_CONTROLS_CONFIG.dampingFactor;
    this.orbitControls.rotateSpeed = ORBIT_CONTROLS_CONFIG.rotateSpeed;
    this.orbitControls.minAzimuthAngle =
      ORBIT_CONTROLS_CONFIG.minAzimuthAngle;
    this.orbitControls.maxAzimuthAngle =
      ORBIT_CONTROLS_CONFIG.maxAzimuthAngle;
    this.orbitControls.minPolarAngle = ORBIT_CONTROLS_CONFIG.minPolarAngle;
    this.orbitControls.maxPolarAngle = ORBIT_CONTROLS_CONFIG.maxPolarAngle;
    this.orbitControls.minDistance = ORBIT_CONTROLS_CONFIG.minDistance;
    this.orbitControls.maxDistance = ORBIT_CONTROLS_CONFIG.maxDistance;
    this.orbitControls.target.copy(COMPUTER_CAMERA_TARGET);
    this.camera.instance.position.copy(COMPUTER_CAMERA_POSITION);
    this.camera.instance.lookAt(COMPUTER_CAMERA_TARGET);
    this.orbitControls.update();

    this.backButton.addEventListener("click", () => {
      if (!this.isCameraMoving && this.currentStage === "computer") {
        this.showStandingView();
      }
    });
  }

  setComputerReturnTarget() {
    const geometry = new PlaneGeometry(4.2, 2.6);
    const material = new MeshBasicMaterial({
      color: 0x000000,
      opacity: 0,
      side: DoubleSide,
      transparent: true,
    });
    material.depthTest = false;
    material.depthWrite = false;

    this.computerReturnTarget = new Mesh(geometry, material);
    this.computerReturnTarget.name = "computerReturnTarget";
    this.computerReturnTarget.position.set(1.78, 2.55, -4.05);
    this.computerReturnTarget.visible = false;
    this.scene.add(this.computerReturnTarget);
  }

  showStandButton() {
    this.backButton.classList.add("show-back-button");
  }

  hideStandButton() {
    this.backButton.classList.remove("show-back-button");
  }

  activateComputerScreen(side) {
    if (!this.experience.world.leftMonitorScreen) {
      return;
    }

    if (side === "right") {
      this.experience.world.leftMonitorScreen.deactivateControls();
      this.experience.world.rightMonitorScreen.activateControls();
    } else {
      this.experience.world.rightMonitorScreen.deactivateControls();
      this.experience.world.leftMonitorScreen.activateControls();
    }
  }

  pauseMonitorPointerEventsForWheel() {
    clearTimeout(this.wheelPointerReset);
    this.experience.world.leftMonitorScreen?.setInteractive(false);
    this.experience.world.rightMonitorScreen?.setInteractive(false);

    this.wheelPointerReset = setTimeout(() => {
      if (this.currentStage === "computer") {
        this.activateComputerScreen(this.activeComputer);
      }
    }, 350);
  }

  activateControls() {
    window.addEventListener("pointermove", this.onMouseMove, false);
    window.addEventListener("pointerdown", this.onMouseDown, false);
    window.addEventListener("pointerup", this.onMouseUp, false);
    window.addEventListener("wheel", this.onMouseWheel, {
      passive: false,
      capture: true,
    });
  }

  checkIntersection() {
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);

    const sceneToRaycast = this.scene.children.filter((child) => {
      return ELEMENTS_TO_RAYCAST.includes(child.name);
    });
    const intersects = this.raycaster.intersectObjects(sceneToRaycast, true);

    if (intersects && intersects.length) {
      const raycastRoots = intersects.map((intersect) => {
        return this.findRaycastRoot(intersect.object);
      });
      const selectedObject = this.getSelectableObject(raycastRoots);
      const canUseSelection = Boolean(selectedObject);

      this.selectedObjects =
        canUseSelection && selectedObject.name !== "computerReturnTarget"
          ? [selectedObject]
          : [];
      this.objectRaycasted = canUseSelection ? selectedObject.name : null;
      this.webglElement.style.cursor = canUseSelection ? "pointer" : "auto";
    } else {
      this.objectRaycasted = null;
      this.startClick.set(null, null);
      this.selectedObjects = [];
      this.webglElement.style.cursor = "auto";
    }

    this.outlinePass.selectedObjects = this.selectedObjects;
  }

  findRaycastRoot(object) {
    if (object.name === "kadunSpeakerHitbox") {
      return this.scene.getObjectByName("kadunSpeaker") || object;
    }

    let current = object;

    while (
      current.parent &&
      current.parent.type !== "Scene" &&
      !ELEMENTS_TO_RAYCAST.includes(current.name)
    ) {
      current = current.parent;
    }

    return ELEMENTS_TO_RAYCAST.includes(current.name) ? current : object.parent;
  }

  isComputerTarget(name) {
    return [
      "leftMonitor",
      "leftMonitorScreen",
      "rightMonitor",
      "rightMonitorScreen",
      "computerReturnTarget",
    ].includes(name);
  }

  getComputerSide(name) {
    return name && name.startsWith("right") ? "right" : "left";
  }

  isWhiteboardTarget(name) {
    return ["whiteboard", "whiteboardCanvas"].includes(name);
  }

  isAudioPropTarget(name) {
    return ["kadunSpeaker", "kadunSpeakerHitbox"].includes(name);
  }

  getSelectableObject(objects) {
    const audioPropTarget = objects.find((object) => {
      return this.isAudioPropTarget(object?.name);
    });

    if (
      audioPropTarget &&
      (this.currentStage === "computer" || this.currentStage === "standing")
    ) {
      return audioPropTarget;
    }

    const concreteComputerTarget = objects.find((object) => {
      return [
        "leftMonitor",
        "leftMonitorScreen",
        "rightMonitor",
        "rightMonitorScreen",
      ].includes(object?.name);
    });

    if (this.currentStage === "computer" && concreteComputerTarget) {
      const side = this.getComputerSide(concreteComputerTarget.name);

      if (side !== this.activeComputer) {
        return concreteComputerTarget;
      }
    }

    if (this.currentStage === "standing" || this.currentStage === "whiteboard") {
      if (concreteComputerTarget) {
        return concreteComputerTarget;
      }
    }

    if (this.currentStage === "computer" || this.currentStage === "standing") {
      const whiteboardTarget = objects.find((object) => {
        return this.isWhiteboardTarget(object?.name);
      });

      if (whiteboardTarget) {
        return whiteboardTarget;
      }
    }

    if (this.currentStage === "standing" || this.currentStage === "whiteboard") {
      return objects.find((object) => object?.name === "computerReturnTarget");
    }

    return null;
  }

  onMouseMove = (e) => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (
      !this.isCameraMoving &&
      this.experience.world.resources.loader.resourcesLoaded
    ) {
      this.checkIntersection();
    }
  };

  onMouseDown = () => {
    this.startClick.x = this.mouse.x;
    this.startClick.y = this.mouse.y;
  };

  onMouseUp = () => {
    if (
      this.startClick.x == this.mouse.x &&
      this.startClick.y == this.mouse.y &&
      !this.isCameraMoving &&
      (this.currentStage === "computer" ||
        this.currentStage === "standing" ||
        this.currentStage === "whiteboard")
    ) {
      if (this.isComputerTarget(this.objectRaycasted)) {
        this.showComputerView(this.getComputerSide(this.objectRaycasted));
      } else if (this.isAudioPropTarget(this.objectRaycasted)) {
        this.experience.world.audioManager.playSingleAudio("miaomiao", 0.7);
      } else if (
        (this.currentStage === "computer" || this.currentStage === "standing") &&
        this.isWhiteboardTarget(this.objectRaycasted)
      ) {
        this.showWhiteboardView();
      }
    }

    this.startClick.set(null, null);
  };

  onMouseWheel = (event) => {
    this.zoomFromWheel(event);
  };

  zoomFromWheel(event) {
    if (
      this.isCameraMoving ||
      (!this.orbitControls.enabled && this.currentStage !== "whiteboard") ||
      !this.experience.world.resources.loader.resourcesLoaded
    ) {
      return;
    }

    const direction = this.camera.instance.position
      .clone()
      .sub(this.orbitControls.target)
      .normalize();
    const currentDistance = this.camera.instance.position.distanceTo(
      this.orbitControls.target
    );
    const normalizedDelta =
      event.deltaY *
      (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1);
    const zoomStep = MathUtils.clamp(Math.abs(normalizedDelta) / 600, 0.12, 1);
    const zoomFactor = normalizedDelta > 0 ? 1 + zoomStep : 1 - zoomStep;
    const nextDistance = MathUtils.clamp(
      currentDistance * zoomFactor,
      ORBIT_CONTROLS_CONFIG.minDistance,
      ORBIT_CONTROLS_CONFIG.maxDistance
    );

    if (Math.abs(nextDistance - currentDistance) < 0.001) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.pauseMonitorPointerEventsForWheel();
    this.camera.instance.position
      .copy(this.orbitControls.target)
      .addScaledVector(direction, nextDistance);
    this.camera.instance.lookAt(this.orbitControls.target);
    this.orbitControls.update();
  }

  showStandingView() {
    this.hideStandButton();
    this.computerReturnTarget.visible = true;
    this.transitionToView({
      stage: "standing",
      position: STANDING_CAMERA_POSITION,
      target: STANDING_CAMERA_TARGET,
      onComplete: () => {
        this.experience.world.leftMonitorScreen.deactivateControls();
        this.experience.world.rightMonitorScreen.deactivateControls();
        this.webglElement.style.pointerEvents = "auto";
      },
    });
  }

  showWhiteboardView() {
    this.transitionToView({
      stage: "whiteboard",
      position: WHITEBOARD_CAMERA_POSITION,
      target: WHITEBOARD_CAMERA_TARGET,
      onComplete: () => {
        this.whiteboardButtons.classList.add("show-button-row");
        this.experience.world.whiteboard.activateControls();
        this.experience.world.leftMonitorScreen.deactivateControls();
        this.experience.world.rightMonitorScreen.deactivateControls();
        this.webglElement.style.pointerEvents = "auto";
      },
    });
  }

  showComputerView(side = "left") {
    this.whiteboardButtons.classList.remove("show-button-row");
    this.experience.world.whiteboard.deactivateControls();
    this.experience.world.leftMonitorScreen.deactivateControls();
    this.experience.world.rightMonitorScreen.deactivateControls();
    this.webglElement.style.pointerEvents = "auto";
    this.computerReturnTarget.visible = false;
    const cameraPosition =
      side === "right" ? RIGHT_COMPUTER_CAMERA_POSITION : COMPUTER_CAMERA_POSITION;
    const cameraTarget =
      side === "right" ? RIGHT_COMPUTER_CAMERA_TARGET : COMPUTER_CAMERA_TARGET;

    this.transitionToView({
      stage: "computer",
      position: cameraPosition,
      target: cameraTarget,
      onComplete: () => {
        this.activeComputer = side;
        this.showStandButton();
        this.activateComputerScreen(side);
      },
    });
  }

  transitionToView({ stage, position, target, onComplete }) {
    const audioManager = this.experience.world.audioManager;
    audioManager.playSingleAudio("whoosh", 0.2);

    this.isCameraMoving = true;
    this.orbitControls.enabled = false;
    this.outlinePass.selectedObjects = [];
    this.selectedObjects = [];
    this.webglElement.style.cursor = "auto";

    gsap.to(this.camera.instance.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 1,
      ease: "sine.out",
    });

    gsap.to(this.orbitControls.target, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 1,
      ease: "sine.out",
      onUpdate: () => {
        this.camera.instance.lookAt(this.orbitControls.target);
      },
      onComplete: () => {
        this.currentStage = stage;
        this.isCameraMoving = false;
        this.orbitControls.enabled = true;
        this.orbitControls.update();
        onComplete();
      },
    });
  }

  update() {
    this.orbitControls.update();
  }
}

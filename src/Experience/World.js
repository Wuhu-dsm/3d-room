import Experience from "./Experience.js";
import Baked from "./Baked.js";
import TopChair from "./TopChair.js";
import DeskProps from "./DeskProps.js";
import Whiteboard from "./Whiteboard.js";
import LeftMonitorScreen from "./LeftMonitorScreen.js";
import RightMonitorScreen from "./RightMonitorScreen.js";
import AudioManager from "./AudioManager.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setAudioManager();
        this.setBaked();
        this.setWhiteboard();
        this.setLeftMonitorScreen();
        this.setRightMonitorScreen();
        this.setTopChair();
        this.setDeskProps();
      }
    });
  }

  setBaked() {
    this.baked = new Baked();
  }

  setWhiteboard() {
    this.whiteboard = new Whiteboard();
  }

  setTopChair() {
    this.topChair = new TopChair();
  }

  setDeskProps() {
    this.deskProps = new DeskProps();
  }

  setLeftMonitorScreen() {
    this.leftMonitorScreen = new LeftMonitorScreen();
  }

  setRightMonitorScreen() {
    this.rightMonitorScreen = new RightMonitorScreen();
  }
  setAudioManager() {
    this.audioManager = new AudioManager();
  }

  resize() {}

  update() {
    if (this.topChair) this.topChair.update();
    if (this.leftMonitorScreen) this.leftMonitorScreen.update();
    if (this.rightMonitorScreen) this.rightMonitorScreen.update();
    if (this.whiteboard) this.whiteboard.update();
  }

  destroy() {}
}

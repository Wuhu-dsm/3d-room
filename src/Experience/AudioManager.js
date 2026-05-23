import * as THREE from "three";
import Experience from "./Experience.js";

export default class AudioManager {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;
    this.isMuted = false;
    this.hasStarted = false;
    this.audioListeners = [];
    this.loopingAudios = {};
  }
  muteAudios() {
    this.audioListeners.forEach((audioListener) => {
      const sound = audioListener.sound;
      sound.setVolume(0);
    });
  }

  unmuteAudios() {
    this.audioListeners.forEach((audioListener) => {
      const sound = audioListener.sound;
      sound.setVolume(audioListener.volume);
    });
  }

  removeAudioElement(audioElement) {
    const index = this.audioListeners.indexOf(audioElement);
    if (index !== -1) {
      this.audioListeners.splice(index, 1);
    }

    const indexCamera = this.camera.children.indexOf(audioElement.listener);
    if (indexCamera !== -1) {
      this.camera.children.splice(indexCamera, 1);
    }
  }

  playSingleAudio(audioName, volume) {
    if (this.isMuted) {
      return;
    }
    const buffer = this.resources.items[audioName];
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    const sound = new THREE.Audio(listener);
    sound.setBuffer(buffer);
    sound.setLoop(false);
    sound.setVolume(volume);
    sound.play();
    const audioElement = { sound, volume, listener };
    this.audioListeners.push(audioElement);
    sound.source.onended = () => {
      this.removeAudioElement(audioElement);
    };
  }
  playLoopAudio(audioName, volume) {
    const buffer = this.resources.items[audioName];
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    const sound = new THREE.Audio(listener);
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(volume);
    sound.play();
    const audioElement = { sound, volume, listener };
    this.audioListeners.push(audioElement);
    sound.source.onended = () => {
      this.removeAudioElement(audioElement);
    };

    return audioElement;
  }

  stopLoopAudio(audioName) {
    const audioElement = this.loopingAudios[audioName];

    if (!audioElement) {
      return false;
    }

    audioElement.sound.stop();
    this.removeAudioElement(audioElement);
    delete this.loopingAudios[audioName];

    return true;
  }

  toggleLoopAudio(audioName, volume) {
    if (this.loopingAudios[audioName]) {
      return this.stopLoopAudio(audioName);
    }

    if (this.isMuted) {
      return false;
    }

    this.loopingAudios[audioName] = this.playLoopAudio(audioName, volume);

    return true;
  }
}

import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
} from "three";
import Experience from "./Experience.js";
import {
  COFFEE_REPLACEMENT_POSITION,
  COFFEE_REPLACEMENT_ROTATION_Y,
  COFFEE_REPLACEMENT_SCALE,
  KADUN_HITBOX_POSITION,
  KADUN_HITBOX_SIZE,
  KADUN_POSITION,
  KADUN_ROTATION_Y,
  KADUN_SCALE,
  PAINT_POSITION,
  PAINT_ROTATION_X,
  PAINT_ROTATION_Y,
  PAINT_ROTATION_Z,
  PAINT_SCALE,
  RUBIK_POSITION,
  RUBIK_ROTATION_Y,
  RUBIK_SCALE,
  WORK_BADGE_POSITION,
  WORK_BADGE_ROTATION_X,
  WORK_BADGE_ROTATION_Y,
  WORK_BADGE_SCALE,
  ZHANGXUEFENG_POSITION,
  ZHANGXUEFENG_ROTATION_Y,
  ZHANGXUEFENG_SCALE,
} from "./constants.js";

export default class DeskProps {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.setRubik();
    this.setRubikLights();
    this.setCoffeeReplacement();
    this.setZhangxuefeng();
    this.setKadunSpeaker();
    this.setWorkBadge();
    this.setPaint();
  }

  setRubik() {
    this.rubik = this.resources.items.rubiksCube.scene;
    this.rubik.name = "rubikVisual";
    this.rubik.position.copy(RUBIK_POSITION);
    this.rubik.rotation.y = RUBIK_ROTATION_Y;
    this.rubik.scale.set(RUBIK_SCALE, RUBIK_SCALE, RUBIK_SCALE);
    this.scene.add(this.rubik);
  }

  setRubikLights() {
    this.rubikAmbientLight = new AmbientLight(0xffffff, 0.8);
    this.rubikDirectionalLight = new DirectionalLight(0xffffff, 0.8);
    this.rubikDirectionalLight.position.set(40, 40, 40);
    this.scene.add(this.rubikAmbientLight, this.rubikDirectionalLight);
  }

  setCoffeeReplacement() {
    this.coffeeReplacement = this.resources.items.deskCoffeeReplacement.scene;
    this.coffeeReplacement.name = "coffeeReplacement";
    this.coffeeReplacement.position.copy(COFFEE_REPLACEMENT_POSITION);
    this.coffeeReplacement.rotation.y = COFFEE_REPLACEMENT_ROTATION_Y;
    this.coffeeReplacement.scale.set(
      COFFEE_REPLACEMENT_SCALE,
      COFFEE_REPLACEMENT_SCALE,
      COFFEE_REPLACEMENT_SCALE
    );

    this.coffeeReplacement.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false;
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((material) => {
          if (material) {
            material.side = DoubleSide;
            material.needsUpdate = true;
          }
        });
      }
    });

    this.scene.add(this.coffeeReplacement);
  }

  configureProp(prop) {
    prop.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false;
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((material) => {
          if (material) {
            material.side = DoubleSide;
            material.needsUpdate = true;
          }
        });
      }
    });
  }

  addZhangxuefengGloss(prop) {
    const updatedMaterials = new WeakSet();

    prop.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        if (!material || updatedMaterials.has(material)) {
          return;
        }

        updatedMaterials.add(material);

        if (material.roughness !== undefined) {
          material.roughness = Math.min(material.roughness, 0.42);
        }

        if (material.metalness !== undefined) {
          material.metalness = Math.max(material.metalness, 0.03);
        }

        if (material.envMapIntensity !== undefined) {
          material.envMapIntensity = Math.max(material.envMapIntensity, 1.08);
        }

        material.needsUpdate = true;
      });
    });
  }

  setZhangxuefeng() {
    this.zhangxuefeng = this.resources.items.zhangxuefeng.scene;
    this.zhangxuefeng.name = "zhangxuefeng";
    this.zhangxuefeng.position.copy(ZHANGXUEFENG_POSITION);
    this.zhangxuefeng.rotation.y = ZHANGXUEFENG_ROTATION_Y;
    this.zhangxuefeng.scale.set(
      ZHANGXUEFENG_SCALE,
      ZHANGXUEFENG_SCALE,
      ZHANGXUEFENG_SCALE
    );
    this.configureProp(this.zhangxuefeng);
    this.addZhangxuefengGloss(this.zhangxuefeng);
    this.scene.add(this.zhangxuefeng);
  }

  setKadunSpeaker() {
    this.kadun = this.resources.items.kadun.scene;
    this.kadun.name = "kadunSpeaker";
    this.kadun.position.copy(KADUN_POSITION);
    this.kadun.rotation.y = KADUN_ROTATION_Y;
    this.kadun.scale.set(KADUN_SCALE, KADUN_SCALE, KADUN_SCALE);
    this.configureProp(this.kadun);
    this.scene.add(this.kadun);
    this.setKadunHitbox();
  }

  setKadunHitbox() {
    const geometry = new BoxGeometry(
      KADUN_HITBOX_SIZE.x,
      KADUN_HITBOX_SIZE.y,
      KADUN_HITBOX_SIZE.z
    );
    const material = new MeshBasicMaterial({
      opacity: 0,
      transparent: true,
    });
    material.depthWrite = false;
    material.colorWrite = false;

    this.kadunHitbox = new Mesh(geometry, material);
    this.kadunHitbox.name = "kadunSpeakerHitbox";
    this.kadunHitbox.position.copy(KADUN_HITBOX_POSITION);
    this.scene.add(this.kadunHitbox);
  }

  setWorkBadge() {
    this.workBadge = this.resources.items.workBadge.scene;
    this.workBadge.name = "workBadge";
    this.workBadge.position.copy(WORK_BADGE_POSITION);
    this.workBadge.rotation.x = WORK_BADGE_ROTATION_X;
    this.workBadge.rotation.y = WORK_BADGE_ROTATION_Y;
    this.workBadge.scale.set(WORK_BADGE_SCALE, WORK_BADGE_SCALE, WORK_BADGE_SCALE);
    this.configureProp(this.workBadge);
    this.scene.add(this.workBadge);
  }

  setPaint() {
    this.paint = this.resources.items.paint.scene;
    this.paint.name = "paint";
    this.paint.position.copy(PAINT_POSITION);
    this.paint.rotation.set(PAINT_ROTATION_X, PAINT_ROTATION_Y, PAINT_ROTATION_Z);
    this.paint.scale.set(PAINT_SCALE, PAINT_SCALE, PAINT_SCALE);
    this.configureProp(this.paint);
    this.scene.add(this.paint);
  }
}

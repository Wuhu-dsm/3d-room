# 架构概述

## 应用模式

**基于单例的组件架构**，由中央编排器协调。`Experience` 类通过 `static instance` 实现为单例，并作为根应用容器。所有子系统和场景组件都通过该单例引用访问共享服务（场景、相机、渲染器、资源等）。

这不是严格的 MVC 模式，而是一种**协调器-组件模式**：
- 一个协调器（`Experience`）拥有生命周期。
- 一个工厂（`World`）在资源准备就绪后实例化场景组件。
- 各个组件（例如 `Baked`、`ArcadeScreen`、`RubiksCube`）是自包含的，直接通过单例访问共享服务。

## 核心类与职责

| 类 | 文件 | 职责 |
|-------|------|----------------|
| **Experience** | `Experience.js` | 单例根编排器。拥有 `Time`、`Sizes`、`Camera`、`Renderer`、`Resources`、`World`、`Navigation`。运行主 RAF 循环和 resize 管线。 |
| **World** | `World.js` | 组件工厂。监听资源加载完成（`groupEnd`），实例化所有场景组件（`Baked`、`CoffeeSteam`、`TopChair`、`Whiteboard`、`Carpet`、`ArcadeScreen`、`LeftMonitorScreen`、`RightMonitorScreen`、`RubiksCube`、`Skybox`、`Confetti`、`AudioManager`）。将 `update` 和 `resize` 委托给子组件。 |
| **Camera** | `Camera.js` | `THREE.PerspectiveCamera` 的薄包装。从常量设置初始位置，处理 resize 时的宽高比更新。 |
| **Renderer** | `Renderer.js` | 拥有 `THREE.WebGLRenderer`、三个 `CSS3DRenderer` 实例（用于街机、左显示器、右显示器）和后处理管线（`EffectComposer`，包含 `RenderPass`、`OutlinePass`、`ShaderPass` 伽马校正、`SMAAPass`）。 |
| **Resources** | `Resources.js` | 资源加载协调器。继承 `EventEmitter`。管理分组资源列表（来自 `assets.js`），将实际加载委托给 `Loader`。触发 `progress`、`groupEnd` 和 `end` 事件。 |
| **Loader** | `Utils/Loader.js` | 底层文件加载器。继承 `EventEmitter`。支持图片、立方体贴图、KTX2/Basis、Draco、GLTF/GLB、FBX、RGBE/HDR 和音频。显示加载遮罩着色器和"START"点击开始界面。 |
| **Navigation** | `Navigation.js` | 相机导航与交互中心。包装 `OrbitControlsCustom`，处理物体选择的射线检测、横幅 UI 显隐、以及通过 GSAP 实现的相机飞入动画，对应每个可交互活动。 |
| **AudioManager** | `AudioManager.js` | 全局音频混音器。创建挂载到相机上的 `THREE.Audio` 实例。支持单次播放和循环播放，并带有全局静音切换。 |

### 场景组件（World 的子组件）

| 组件 | 关键特性 |
|-----------|-------------|
| **Baked** | 将预烘焙的 `MeshBasicMaterial` 纹理应用到房间模型和社交链接模型（LinkedIn、GitHub、Itch.io）。 |
| **ArcadeScreen** | 嵌入 CSS3D iframe（`joan-arcade-machine.vercel.app`），并在 GL 网格上叠加 CRT 着色器效果。 |
| **LeftMonitorScreen** / **RightMonitorScreen** | 嵌入 CSS3D iframe（`joan-os.vercel.app`、`joan-art-gallery.vercel.app`），使用不可见的 GL 代理平面进行射线检测。 |
| **Whiteboard** | 基于 Canvas2D 的绘图表面，映射到 GL 平面上的 `CanvasTexture`。支持颜色选择和擦除。 |
| **RubiksCube** | 完整的 3x3 魔方实现，支持层旋转、移动队列、胜利检测和 GSAP 动画。 |
| **CoffeeSteam** | 通过自定义顶点/片段着色器实现的动画 Perlin 噪声蒸汽效果。 |
| **Carpet** | 使用堆叠着色器平面实现的 shell texturing 毛发效果。 |
| **Skybox** | 自定义天空平面，带有镜像纹理包裹和基于着色器的 Y/Z 裁剪。 |
| **TopChair** | 通过正弦波实现的简单摇摆动画。 |
| **Confetti** | 在魔方解出时触发的 GPU 实例化粒子爆炸效果。 |

## 数据流

1. **启动**：`script.js` 检测移动端；如果是桌面端，则创建 `Experience` 单例并传入 DOM 元素引用。
2. **初始化**：`Experience` 依次构造 `Time`、`Sizes`、`Camera`、`Renderer`、`Resources`、`World` 和 `Navigation`。
3. **资源加载**：`Resources` 将 `assets.js` 清单传递给 `Loader`。`Loader` 并行加载文件，触发 `fileEnd` → `Resources` 存储项目 → `end` 触发 `groupEnd`。
4. **世界构建**：`World` 监听 `groupEnd("base")`，实例化所有场景组件，这些组件从 `experience.resources.items` 中获取资源。
5. **运行循环**：`Experience.update()`（RAF）调用：
   - `navigation.update()` → 轨道控制器阻尼
   - `camera.update()` → 投影矩阵刷新
   - `renderer.update()` → `EffectComposer.render()` + 三个 `CSS3DRenderer.render()` 调用
   - `world.update()` → 每个组件的 `update()`（动画、射线检测、粒子等）
6. **交互**：`Navigation` 从 `Experience` 读取 `mouse`，执行射线检测，点击时分派 `flyToPosition()`，通过 GSAP 动画移动相机。然后调用 `updateStage()`，激活目标组件的控制。

## 状态管理

**去中心化 / 手动状态**。没有类似 Redux 的集中式状态存储。状态分布在多个位置：

- **Experience 单例**：`config`（像素比、尺寸）、`mouse`（`Vector2`）、场景和 DOM 元素的引用。
- **Navigation**：`currentStage`（当前活动）、`isCameraMoving`、`selectedObjects`、`objectRaycasted`。
- **组件**：每个组件持有自己的激活状态（例如 `Whiteboard.isActive`、`RubiksCube.isMoving`、`RubiksCube.hasBeenSolved`）。
- **DOM 类**：通过添加/移除 CSS 类切换 UI 显隐（例如 `show-back-button`、`show-button-row`）。

## 事件系统

内部发布/订阅使用轻量级**自定义 `EventEmitter`**（`Utils/EventEmitter.js`）：

- **`Sizes`** 触发 `resize`。
- **`Time`** 触发 `tick`。
- **`Loader`** 触发 `fileEnd` 和 `end`。
- **`Resources`** 触发 `progress` 和 `groupEnd`。

除 `EventEmitter` 外，应用还依赖：
- **原生 DOM 事件**（`pointermove`、`pointerdown`、`pointerup`、`keydown`、来自 iframe 的 `message`）。
- **Three.js 事件分发器**（`OrbitControlsCustom` 使用 `EventDispatcher` 触发 `change` 事件）。
- **`window.postMessage`** 用于父页面与 iframe 屏幕（街机、显示器）之间的双向通信。

## 渲染管线

### 帧循环（每个 `requestAnimationFrame`）

```
Experience.update()
├── Navigation.update()          // OrbitControls 阻尼
├── Camera.update()              // updateProjectionMatrix
├── Renderer.update()
│   ├── EffectComposer.render()  // OutlinePass + GammaCorrection + SMAA
│   ├── CSS3DRenderer (Arcade)   // iframe 叠加
│   ├── CSS3DRenderer (Left)     // iframe 叠加
│   └── CSS3DRenderer (Right)    // iframe 叠加
└── World.update()
    ├── CoffeeSteam.update()     // 着色器 uniform uTime
    ├── TopChair.update()        // 正弦摇摆
    ├── RubiksCube.update()      // 激活时进行射线检测
    ├── Skybox.update()          // 重新计算裁剪平面
    ├── LeftMonitorScreen.update()  // 激活时进行射线检测
    ├── RightMonitorScreen.update() // 激活时进行射线检测
    ├── Confetti.update()        // 实例化网格矩阵
    └── Whiteboard.update()      // 激活时进行射线检测
```

### 渲染目标

- **1 个 WebGL 场景**（`scene`）用于所有 3D 几何体。
- **3 个 CSS3D 场景**（`cssArcadeMachineScene`、`cssLeftMonitorScene`、`cssRightMonitorScene`）用于在 3D 空间中定位的 HTML iframe 元素。
- **后处理链**：`RenderPass` → `OutlinePass`（悬停白色描边）→ `ShaderPass(GammaCorrectionShader)` → `SMAAPass`（如果支持 WebGL2）。

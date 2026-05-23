<!-- GSD:project-start source:PROJECT.md -->
## Project

**Cyberpunk 3D Room**

This project is a browser-based interactive Three.js 3D room that should feel like a cyberpunk personal space / portfolio venue. The current version already has an existing 3D room, baked models, monitor iframes, navigation, audio, and loading flow; this milestone upgrades the visual direction to match the provided neon UI reference and adds three interactive cats inside the room.

For this version, the room should read as a polished cyberpunk main venue: neon top navigation, left and right HUD-style side panels, a stronger central 3D room composition, and a loading animation that belongs to the same visual language.

**Core Value:** Users should immediately feel they entered a cohesive cyberpunk 3D room and discover charming cat interactions inside it.

### Constraints

- **Architecture**: Keep the existing `Experience` / `World` / component structure so the feature fits the current codebase.
- **Rendering**: Use Three.js scene objects for cat models and room placement; use DOM/CSS only for overlay UI and speech bubbles where that is simpler and more readable.
- **Assets**: Use the existing three cat GLB files and existing `miaomiao.mp3` unless they prove unusable.
- **Interaction**: Cat clicks should integrate with the existing raycast/navigation model rather than creating a separate input system.
- **Visual Direction**: Match the provided cyberpunk reference: black/deep navy base, cyan and magenta neon outlines, HUD panel borders, glowing nav pills, and a theatrical center-room composition.
- **Scope**: The version should prioritize visible alignment and delightful cat interaction over broad portfolio content expansion.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## 运行时与框架
- **浏览器运行时**：在现代浏览器中运行的原生 JavaScript（ES6 模块）
- **3D 引擎**：Three.js `^0.161.0` —— 基于 WebGL 的核心 3D 渲染引擎
- **架构模式**：基于单例的 `Experience` 类，负责编排场景、渲染器、资源和世界对象
- **移动端处理**：通过客户端用户代理嗅探，并显示移动端提示页面作为降级方案
## 构建系统
- **打包工具**：Webpack 5（`^5.42.1`），配置通过 `webpack-merge` 拆分
- **转译器**：Babel（`@babel/core`、`@babel/preset-env`），通过 `babel-loader` 将 ES6+ 转译为 ES5
- **开发服务器**：`webpack-dev-server`（`^3.11.2`），支持热重载、本地 IP 绑定和错误浮层
- **入口文件**：`src/script.js`
- **输出文件**：`dist/bundle.[contenthash].js`，并生成 source map
## 核心依赖
| 包名 | 用途 |
|---------|---------|
| `three` | 3D 渲染、场景、相机、WebGL |
| `gsap` | 相机动画、场景过渡、UI 缓动 |
| `tweakpane` | 调试 UI / 调整面板（主要用于开发阶段） |
| `normalize-wheel` | 跨浏览器鼠标滚轮事件归一化 |
| `stats.js` | FPS / 性能统计浮层 |
| `glsl-blend` | 着色器 GLSL 混合工具 |
## 开发依赖
- `webpack`、`webpack-cli`、`webpack-merge`、`webpack-dev-server`
- `@babel/core`、`@babel/preset-env`、`babel-loader`
- `html-webpack-plugin`、`mini-css-extract-plugin`、`clean-webpack-plugin`
- `copy-webpack-plugin`
- `css-loader`、`style-loader`、`file-loader`、`html-loader`、`raw-loader`
- `glslify-loader` —— GLSL 模块打包 / 预处理
- `portfinder-sync`、`internal-ip` —— 开发服务器网络配置
- `vercel` —— 部署命令行工具
## 语言与样式
- **JavaScript**：ES6+ 类、模块、箭头函数、模板字符串
- **CSS**：纯 CSS3（无预处理器）；自定义 `@font-face`（LTSaeada 字体族）
- **着色器**：自定义 GLSL（`*.glsl`、`*.vs`、`*.fs`、`*.vert`、`*.frag`），通过 `raw-loader` + `glslify-loader` 加载
## 资源管线
| 资源类型 | 加载器 / 处理方式 |
|------------|-------------------|
| **图片**（`jpg`、`png`、`gif`、`svg`） | `file-loader` → `assets/images/` |
| **字体**（`ttf`、`eot`、`otf`、`woff`、`woff2`） | `file-loader` → `assets/fonts/` |
| **音频**（`mp3`、`ogg`） | `file-loader` → `assets/sounds/` |
| **着色器**（`glsl`、`vs`、`fs`、`vert`、`frag`） | `raw-loader` + `glslify-loader` |
| **静态文件**（`static/`） | `CopyWebpackPlugin` 原样复制到 `dist/` |
| **HTML** | `html-loader` + `HtmlWebpackPlugin`（生产环境压缩） |
| **CSS** | `MiniCSSExtractPlugin` 提取为独立 CSS 包 |
### 3D 资源压缩与格式
- **模型**：`GLTFLoader` + `DRACOLoader` 用于 Draco 压缩的 `.glb` 文件
- **纹理**：`KTX2Loader` 配合 Basis Universal 转码器（`basis/`）用于 `.ktx2` 纹理
- **环境**：`CubeTextureLoader` 用于六面环境贴图（`nx/ny/nz/px/py/pz.jpg`）
- **HDR**：`RGBELoader` 已集成（但当前未加载 `.hdr` 资源）
- **FBX**：`FBXLoader` 可用于 `.fbx` 模型
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## 样式与格式化
- 代码库使用**两种不一致的缩进风格**：
- 引号风格分裂：2 空格文件偏好**双引号**；4 空格文件偏好**单引号**。
- 分号使用分裂：2 空格文件使用分号；4 空格文件省略分号。
- 大括号风格分裂：2 空格文件使用 K&R 风格；4 空格文件使用 Allman 风格。
- **没有强制格式化工具**（无 Prettier、ESLint 或 EditorConfig），这解释了风格漂移的原因。
## 命名规范
- **类与组件**：`PascalCase`（例如 `Experience`、`Camera`、`CoffeeSteam`）。
- **类文件**：`PascalCase`，与导出的类名匹配。
- **工具/配置文件**：`camelCase`（例如 `constants.js`、`assets.js`、`script.js`）。
- **常量**：`constants.js` 中使用 `SCREAMING_SNAKE_CASE`。
- **构造函数参数 / 内部变量**：在遮蔽或用于选项对象时以下划线为前缀（例如 `_options`、`_assets`、`_group`）。
- **着色器 uniform**：以 `u` 为前缀（例如 `uTime`、`uPerlinTexture`）。
- **着色器 varying**：以 `v` 为前缀（例如 `vUv`、`vPosition`）。
## 模块组织
- 纯 **ES 模块**（`import` / `export default`）。
- Three.js 库导入使用 `"three"` 的**命名导入**。
- 内部导入始终包含 **`.js` 扩展名**。
- `Experience.js` 通过 `static instance` 实现**单例模式**。
- `assets.js` 导出默认的资源组数组。
- `constants.js` 导出命名常量。
- 每个主要 3D 功能都位于 `src/Experience/` 下的独立类文件中。
## 文档
- **无 JSDoc** 类型或详细参数描述。
- 工具文件中有稀疏的块注释（`/** Constructor */`、`/** Tick */`），但其他地方几乎没有内联注释。
- `readme.md` 为空。
- `AGENT.MD` 仅包含一行中文说明。
- 项目中**未使用 TypeScript**。
## 着色器规范
- 着色器位于 `src/Experience/shaders/<feature>/`。
- 每个功能包含一个 `vertex.glsl` 和一个 `fragment.glsl`。
- 使用 webpack 的 `raw-loader` + `glslify-loader` 以原始字符串形式导入。
- Uniform 命名规范：`u<Name>`。
- Varying 命名规范：`v<Name>`。
- 片段着色器在需要时包含 Three.js 内置 chunk：
- 辅助函数在模块作用域中定义（例如 `rotate2D`、`curveRemapUV`）。
- 入口点使用 `void main()` 或 `void main(void)`。
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## 应用模式
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
## 状态管理
- **Experience 单例**：`config`（像素比、尺寸）、`mouse`（`Vector2`）、场景和 DOM 元素的引用。
- **Navigation**：`currentStage`（当前活动）、`isCameraMoving`、`selectedObjects`、`objectRaycasted`。
- **组件**：每个组件持有自己的激活状态（例如 `Whiteboard.isActive`、`RubiksCube.isMoving`、`RubiksCube.hasBeenSolved`）。
- **DOM 类**：通过添加/移除 CSS 类切换 UI 显隐（例如 `show-back-button`、`show-button-row`）。
## 事件系统
- **`Sizes`** 触发 `resize`。
- **`Time`** 触发 `tick`。
- **`Loader`** 触发 `fileEnd` 和 `end`。
- **`Resources`** 触发 `progress` 和 `groupEnd`。
- **原生 DOM 事件**（`pointermove`、`pointerdown`、`pointerup`、`keydown`、来自 iframe 的 `message`）。
- **Three.js 事件分发器**（`OrbitControlsCustom` 使用 `EventDispatcher` 触发 `change` 事件）。
- **`window.postMessage`** 用于父页面与 iframe 屏幕（街机、显示器）之间的双向通信。
## 渲染管线
### 帧循环（每个 `requestAnimationFrame`）
```
```
### 渲染目标
- **1 个 WebGL 场景**（`scene`）用于所有 3D 几何体。
- **3 个 CSS3D 场景**（`cssArcadeMachineScene`、`cssLeftMonitorScene`、`cssRightMonitorScene`）用于在 3D 空间中定位的 HTML iframe 元素。
- **后处理链**：`RenderPass` → `OutlinePass`（悬停白色描边）→ `ShaderPass(GammaCorrectionShader)` → `SMAAPass`（如果支持 WebGL2）。
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

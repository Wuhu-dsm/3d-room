# 目录结构

## 根目录布局

```
D:\学习\3d-room\
├── .git/                    # Git 仓库
├── .planning/               # 规划文档（本目录）
├── bundler/                 # Webpack 配置
├── src/                     # 源代码
├── static/                  # 静态资源（原样复制到 dist）
├── .gitignore
├── AGENT.MD
├── LICENSE
├── package.json
├── package-lock.json
└── readme.md
```

## 源码组织

```
src/
├── index.html               # HTML 模板（由 HtmlWebpackPlugin 处理）
├── script.js                # 入口：移动端检测 + Experience 实例化
├── style.css                # 全局样式、UI 遮罩、加载界面
└── Experience/
    ├── Experience.js         # 单例应用编排器
    ├── World.js              # 场景组件工厂与更新委托器
    ├── Camera.js             # PerspectiveCamera 包装器
    ├── Renderer.js           # WebGL + CSS3D + 后处理
    ├── Navigation.js         # 轨道控制、射线检测、相机飞入
    ├── Resources.js          # 资源加载协调器
    ├── assets.js             # 资源清单（模型、纹理、声音等）
    ├── constants.js          # Vector3、Quaternion、颜色和配置常量
    ├── AudioManager.js       # Three.js 音频播放与静音切换
    ├── Baked.js              # 将烘焙纹理应用到房间与社交链接模型
    ├── ArcadeScreen.js       # 街机模型 + CSS3D iframe + CRT 着色器
    ├── LeftMonitorScreen.js  # 左显示器模型 + CSS3D iframe
    ├── RightMonitorScreen.js # 右显示器模型 + CSS3D iframe
    ├── Whiteboard.js         # 白板模型 + Canvas2D 绘图画布
    ├── RubiksCube.js         # 交互式 3x3 魔方游戏
    ├── CoffeeSteam.js        # 基于着色器的蒸汽效果
    ├── Carpet.js             # 通过堆叠着色器平面实现的 shell texturing 地毯
    ├── Skybox.js             # 带裁剪着色器的自定义天空平面
    ├── TopChair.js           # 动画化的顶部椅子模型
    ├── Confetti.js           # InstancedMesh 粒子爆炸
    ├── OrbitControlsCustom.js# 修改版 Three.js OrbitControls，带平移限制
    ├── Utils/
    │   ├── EventEmitter.js   # 自定义命名空间事件发射器
    │   ├── Loader.js         # 多格式文件加载器（GLTF、KTX2、音频等）
    │   ├── Sizes.js          # 视口尺寸追踪与 resize 事件
    │   └── Time.js           # 带播放/暂停的增量时间滴答器
    └── shaders/
        ├── coffeeSteam/
        │   ├── vertex.glsl
        │   └── fragment.glsl
        ├── overlayLoading/
        │   ├── vertex.glsl
        │   └── fragment.glsl
        ├── screenEffect/
        │   ├── vertex.glsl
        │   └── fragment.glsl
        ├── shellTexturingCarpet/
        │   ├── vertex.glsl
        │   └── fragment.glsl
        └── sky/
            ├── vertex.glsl
            └── fragment.glsl
```

## 关键模块

| 文件 | 角色 |
|------|------|
| `src/script.js` | 应用入口。阻止移动端初始化。 |
| `src/Experience/Experience.js` | 根单例。初始化核心系统并启动 RAF 循环。 |
| `src/Experience/World.js` | 在 `"base"` 资源组加载完成后懒实例化所有场景组件。 |
| `src/Experience/Renderer.js` | 管理 1 个 WebGL 渲染器 + 3 个 CSS3D 渲染器 + 后处理合成器。 |
| `src/Experience/Navigation.js` | 中央交互路由器：射线检测、横幅链接、返回按钮、相机动画、舞台激活。 |
| `src/Experience/Utils/Loader.js` | 底层资源加载，支持特定格式加载器（GLTF、KTX2、Draco、音频等）。 |
| `src/Experience/constants.js` | 集中存放相机位置、四元数、着色器 uniform 和可交互元素名称的常量。 |

## 资源组织

```
static/
├── cat_1.glb, cat_2.glb, cat_3.glb   # 未使用的猫咪模型（根目录）
├── basis/
│   ├── basis_transcoder.js           # Basis/KTX2 纹理解码器 JS
│   └── basis_transcoder.wasm         # Basis/KTX2 纹理解码器 WASM
├── draco/
│   ├── draco_decoder.js, draco_decoder.wasm  # Draco 网格解码器
│   ├── draco_encoder.js, draco_wasm_wrapper.js
│   └── gltf/                         # GLTF 专用 Draco 包装器
└── assets/
    ├── environmentMaps/              # 立方体贴图面（nx, ny, nz, px, py, pz）
    ├── fonts/                        # LTSaeada 字体族（otf）
    ├── icons/                        # 网站图标
    ├── json/                         # 魔方元数据（cubeInfo.json）
    ├── models/                       # GLB 模型（房间、显示器、街机、椅子、魔方、白板、社交链接）
    ├── social/                       # OpenGraph/Twitter 截图
    ├── sounds/                       # MP3/OGG 音效和音乐
    ├── svg/                          # UI 图标（马克笔、橡皮擦、音频、箭头）
    └── textures/                     # KTX2 烘焙纹理、PNG 纹理（perlin、paint、sky）
```

## 着色器组织

着色器按**功能**共置于 `src/Experience/shaders/<featureName>/` 下：

| 功能 | 着色器对 | 用途 |
|---------|-------------|---------|
| `coffeeSteam` | `vertex.glsl` + `fragment.glsl` | 咖啡杯上方基于 Perlin 噪声的动画蒸汽 |
| `overlayLoading` | `vertex.glsl` + `fragment.glsl` | 加载完成后淡出的全屏颜色遮罩 |
| `screenEffect` | `vertex.glsl` + `fragment.glsl` | 街机屏幕的 CRT 曲率、扫描线、暗角效果 |
| `shellTexturingCarpet` | `vertex.glsl` + `fragment.glsl` | 地毯的 shell texturing 毛发效果 |
| `sky` | `vertex.glsl` + `fragment.glsl` | 基于相机视锥体的 Y/Z 裁剪天空平面 |

所有着色器通过 `raw-loader` + `glslify-loader`（参见 webpack 配置）以原始字符串形式导入。

## 构建配置

| 文件 | 用途 |
|------|---------|
| `bundler/webpack.common.js` | 共享配置：入口 `src/script.js`，输出到 `dist/`。加载 JS（babel）、CSS（MiniCSSExtract）、图片/字体/音频（file-loader）和着色器（raw-loader + glslify-loader）。将 `static/` 复制到 `dist/` 并注入 `index.html`。 |
| `bundler/webpack.dev.js` | 开发模式，开发服务器运行在 `0.0.0.0:8080`，自动端口查找，打印本地 IP。 |
| `bundler/webpack.prod.js` | 生产模式。将通用配置与 `CleanWebpackPlugin` 合并。 |
| `package.json` | 依赖：Three.js `^0.161.0`、GSAP `^3.12.5`、Webpack 5、Babel、各种加载器。 |

### 值得注意的构建细节
- **着色器管线**：`raw-loader` → `glslify-loader` 支持内联 GLSL 导入。
- **资源管线**：`file-loader` 将图片路由到 `assets/images/`，字体到 `assets/fonts/`，音频到 `assets/sounds/`。
- **KTX2/Basis**：通过 `KTX2Loader` 进行运行时纹理解码，转码器路径设置为 `basis/`。
- **Draco**：通过 `DRACOLoader` 进行运行时网格解码，解码器路径设置为 `draco/`。

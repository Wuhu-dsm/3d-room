# 技术栈

## 运行时与框架
- **浏览器运行时**：在现代浏览器中运行的原生 JavaScript（ES6 模块）
- **3D 引擎**：Three.js `^0.161.0` —— 基于 WebGL 的核心 3D 渲染引擎
- **架构模式**：基于单例的 `Experience` 类，负责编排场景、渲染器、资源和世界对象
- **移动端处理**：通过客户端用户代理嗅探，并显示移动端提示页面作为降级方案

## 构建系统
- **打包工具**：Webpack 5（`^5.42.1`），配置通过 `webpack-merge` 拆分
  - `webpack.common.js` —— 共享规则与插件
  - `webpack.dev.js` —— 开发服务器，使用 `internal-ip` 和 `portfinder-sync`
  - `webpack.prod.js` —— 生产模式，使用 `CleanWebpackPlugin`
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
所有工具类依赖都与运行时依赖放在同一处（`package.json` 中没有单独的 `devDependencies` 区块）：
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
  - 包含 Three.js 内置 chunk：`<tonemapping_fragment>`、`<colorspace_fragment>`

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

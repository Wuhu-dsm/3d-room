# 问题与风险

## 严重问题

### 双重 `requestAnimationFrame` 循环
`Experience.js` 运行自己的 RAF 循环（`window.requestAnimationFrame(() => this.update())`），同时 `Utils/Time.js` 也运行独立的 RAF 循环（`window.requestAnimationFrame(this.tick)`）。这导致整个更新/渲染管线每帧触发两次，浪费约 50% 的主线程资源并消耗电量。

### 魔方拼写错误导致拖拽逻辑损坏
`RubiksCube.js` 第 35 行声明了 `this.dragging = false`，但后续在第 288、293 行引用了 `this.draggingg`。由于属性名不匹配，拖拽旋转逻辑永远不会执行，导致魔方交互损坏。

### 音频监听器泄漏
`AudioManager.js` 每次调用 `playSingleAudio` 都会创建一个新的 `THREE.AudioListener` 并附加到相机上。只有 `playSingleAudio` 在 `sound.source.onended` 时移除了监听器。`playLoopAudio` 永远不会结束，因此其监听器会在相机上无限累积，导致缓慢的内存泄漏和潜在的音频上下文耗尽。

### Post-Message 来源通配符
`ArcadeScreen.js`、`LeftMonitorScreen.js` 和 `RightMonitorScreen.js` 使用 `window.postMessage(..., "*")` 接收消息，且不对 `event.origin` 进行验证。任何第三方 iframe 或注入脚本都可以伪造消息（例如触发音频、导航显示器），造成安全漏洞。

### 资源加载缺少错误处理
`Utils/Loader.js` 将加载器未找到的警告记录到控制台，但不会中止或重试。如果关键模型（例如 `room.glb`）加载失败，应用会继续初始化，并在下游访问 `resources.items._roomModel` 作为 `undefined` 时崩溃。

## 性能风险

### 热点路径中的每帧对象分配
- `Confetti.update()` 每帧实例化 `new Matrix4()`、`new Vector3()` 和 `new Euler()` **500 次**（每个粒子一次）。这会产生巨大的 GC 压力，并导致低端硬件上的卡顿。
- `Skybox.update()` 在重新计算平面交集时每帧分配新的 `Vector2`/`Vector3` 对象。这些可以改为可复用的实例变量。

### 每帧不必要的 `updateProjectionMatrix`
`Camera.update()` 每帧都调用 `this.instance.updateProjectionMatrix()`，即使相机视锥体只在 resize 或 FOV 变化时才改变。这是纯粹的额外开销。

### 过多的着色器材质重复
`Carpet.js` 为 shell texturing 效果创建了 **32 个独立的 `ShaderMaterial` 实例** 和 **32 个 `PlaneGeometry` 实例**。每个 shell 都是独立的绘制调用。在低端 GPU 上这是显著的瓶颈；使用实例化或合并会更高效。

### 显示器和白板更新中的宽泛射线检测
`LeftMonitorScreen`、`RightMonitorScreen` 和 `Whiteboard` 在激活时每帧都对 `this.scene.children` 使用 `intersectObjects(..., true)` 进行射线检测。这会遍历整个场景图（包括房间模型、街机等），而不是使用专用的边界网格或图层遮罩。

### 沉重的后处理栈
`Renderer.js` 始终启用 `OutlinePass`、`GammaCorrectionShader` 和 `SMAAPass`（如果支持 WebGL2），外加三个独立的 `CSS3DRenderer` 实例。没有质量级别切换或低端设备的降级方案。

## 可维护性问题

### 魔法数字四处散落
- `Whiteboard.js`：画布尺寸 `2048`、`1024` 和线宽 `8`/`50` 直接硬编码在代码中，而非引用常量。
- `Navigation.js`：魔法缩放阈值 `25`、过渡时长 `1`、`1.15`、`0.3` 重复出现数十次。
- `RubiksCube.js`：`renderOrder = 999`、`duration = 0.5` / `0.0`、缩放 `0.0001` 用于收缩动画。
- `TopChair.js`：`Math.sin(elapsedTime * 0.0003) * 0.5` —— 速度和振幅都是内联的。
- `Carpet.js`：`planeMesh.position.y = -10 + i * 0.1` —— 间距和基准偏移都是硬编码的。

### 庞大的常量文件
`constants.js` 将相机数据、物体变换、URL、UI 配置和射线检测列表混合在一个 191 行的文件中，且没有命名空间。这使得定位数值变得困难，并鼓励复制粘贴式的重复。

### 资源键名拼写错误
`assets.js` 定义了一个名为 `"screnshot"` 的资源（缺少一个 `'e'`）。任何查找 `"screenshot"` 的代码都会静默失败。

### 共享材质变异风险
`Baked.js` 将同一个 `material3` 实例赋给 `linkedin`、`github` 和 `itchio` 网格。如果任何组件在运行时变异该材质，所有三个对象都会意外受到影响。

### 无来源信息的 vendored OrbitControls
`OrbitControlsCustom.js` 是 1311 行 vendored 的 Three.js 代码，没有任何注释说明它是从哪个版本 fork 的，或做了哪些自定义修改。未来的 Three.js 升级将极其危险。

### 没有集中式清理 / 销毁生命周期
`Experience` 没有 `destroy()` 方法。`World.destroy()` 是空的。`Sizes`、`Time`、`Navigation` 和 `Renderer` 的事件监听器从未被拆除，使得该应用不适合 SPA 导航或热重载工作流。

## 依赖与安全

### 过时与废弃的包
| 包名 | 当前版本 | 最新版本 | 风险 |
|---|---|---|---|
| `three` | `0.161.0` | `0.184.0` | 落后 23 个版本；存在潜在的 API 漂移和未修复的 WebGL 错误 |
| `webpack-dev-server` | `3.11.3` | `5.2.4` | 主版本落后；v3 中 `disableHostCheck: true` 是已知的安全问题 |
| `webpack-cli` | `4.10.0` | `7.0.2` | 旧版 CLI，带有已弃用的标志 |
| `vercel` | `33.7.1` | `54.4.1` | 非常旧的 CLI；应作为 devDependency，而非运行时依赖 |
| `raw-loader` | `4.0.2` | — | 在 Webpack 5 中已弃用；被 Asset Modules 取代 |
| `file-loader` | `6.2.0` | — | 在 Webpack 5 中已弃用；被 Asset Modules 取代 |
| `glslify-loader` | `2.0.0` | — | 无人维护；可能在较新的 Node 版本上崩溃 |
| `portfinder-sync` | `0.0.2` | — | 微小、无人维护的同步包装器，近期无更新 |

### 构建时安全标志
- `webpack.dev.js` 设置了 `disableHostCheck: true`，允许对开发服务器进行 DNS 重新绑定攻击。
- `webpack.dev.js` 在 `host: '0.0.0.0'` 上运行，且 `https: false`，以未加密方式将开发服务器暴露给本地网络。

### 未使用的依赖
`stats.js` 列在 `package.json` 中，但似乎在任何地方都没有被导入，为 `node_modules` 增加了死重。

## 浏览器兼容性

### 明确的移动端排除
`script.js` 阻止所有 `window.innerWidth <= 768` 或带有移动端用户代理字符串的用户，显示静态的"未针对移动端优化"消息。这完全排除了手机、平板电脑和小型笔记本电脑，没有渐进增强的路径。

### WebGL2 假设
`Renderer.js` 检查 `this.instance.capabilities.isWebGL2` 来决定是否添加 `SMAAPass`，但如果唯一可用的上下文是 WebGL1，则没有降级方案或用户警告。`KTX2Loader` 和 `DRACOLoader` 也可能在仅支持 WebGL1 的硬件上失败。

### `navigator.userAgentData` 的使用
`script.js` 使用 `navigator.userAgentData?.mobile`。虽然可选链处理了不存在的情况，但 `userAgentData` 仅在基于 Chromium 的浏览器中受支持，使得在 Safari/Firefox 上的移动端启发式检测稍微不太可靠。

### CSS `aspect-ratio` 支持
`style.css` 在 `.loadingScreen` 上使用 `aspect-ratio`。虽然现在支持良好，但在旧版 Safari（< 15）中缺失。

## 无障碍性

### 键盘与焦点
- 横幅导航链接是 `<span>` 元素，而非 `<button>` 或 `<a href>`。它们无法通过 Tab 键获得焦点，也没有 `role="button"`。
- 返回按钮和白板颜色按钮是没有 `href` 属性的 `<a>` 标签，键盘用户和屏幕阅读器无法访问。
- 没有为任何自定义交互元素提供 `keydown` / `Enter` / `Space` 处理程序。

### 运动与缩放
- 视口 meta 标签中的 `user-scalable=0` 阻止了双指缩放，违反了 WCAG 2.1 指南 1.4.4（调整文本大小）。
- 没有使用 `prefers-reduced-motion` 媒体查询。持续的相机飞入动画、彩带爆炸和椅子旋转可能引起前庭功能障碍。

### 屏幕阅读器
- 3D 画布（`#webgl`）没有 `aria-label`、`role="img"` 或替代描述。
- 加载界面文本从 "JOAN RAMOS REFUSTA" 变为 "START"，但没有 ARIA 实时区域，因此屏幕阅读器用户不会收到体验已就绪的通知。
- 移动端排除消息在悲伤表情符号上使用了内联样式（`font-size: 10em`），但没有解释移动端阻止的文本替代。

### 颜色对比度
横幅使用 `#eda72d`（橙金色）文字在 `#0a3362`（深蓝色）背景上。对比度约为 **4.8:1**，对于正常文本勉强达到 AA 标准，但在某些显示器校准下可能无法通过较小字体的测试。

## 建议的优先级

1. **修复双重 RAF 循环** —— 将 `Time.tick` 和 `Experience.update` 合并为单个动画循环，以立即将 CPU 使用率减半。
2. **修复 `RubiksCube.js` 中的 `draggingg` 拼写错误** —— 这是一个损坏的用户-facing 功能。
3. **为 `Experience` 添加 `destroy()` 生命周期**，并确保所有 `window`/`document` 事件监听器、`Time.ticker` 和 `Sizes` resize 观察者都被正确移除。
4. **修复 `AudioManager.js` 中的音频监听器泄漏** —— 复用单个监听器，或确保循环音频监听器在静音/导航时被清理。
5. **在所有 `receiveMessage` 处理程序中验证 `event.origin`**，然后再对 postMessage 数据采取行动。
6. **用可复用的实例变量替换** `Confetti.update` 和 `Skybox.update` 中的每帧分配。
7. **在资源加载周围添加基本的错误边界**，以便单个缺失的 GLB/纹理不会破坏整个体验。
8. **将 `vercel` 移到 `devDependencies`** 并将 `webpack-dev-server` 升级到 v4+（或 v5），以移除 `disableHostCheck` 安全标志。
9. **将 `file-loader` 和 `raw-loader` 迁移到 Webpack 5 Asset Modules**，以消除已弃用的依赖。
10. **至少提供最基本的移动端体验** —— 即使是一个带触摸轨道控制的降级质量 WebGL 视图，也比完全阻止要好。

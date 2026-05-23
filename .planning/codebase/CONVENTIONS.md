# 代码规范

## 样式与格式化
- 代码库使用**两种不一致的缩进风格**：
  - 大多数文件（`Experience/`、`Camera.js`、`Renderer.js` 等）使用**2 个空格**。
  - 工具文件（`EventEmitter.js`、`Time.js`）使用**4 个空格**。
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
  - `#include <tonemapping_fragment>`
  - `#include <colorspace_fragment>`
- 辅助函数在模块作用域中定义（例如 `rotate2D`、`curveRemapUV`）。
- 入口点使用 `void main()` 或 `void main(void)`。

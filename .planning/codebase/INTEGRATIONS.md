# 外部集成

## 第三方服务
- **社交链接**：硬编码的外部 URL（LinkedIn、GitHub、Itch.io），通过 3D 可交互模型上的 `window.open` 打开
- **无外部 API**：代码库中未发现 REST、GraphQL 或 SaaS API 调用

## 部署与托管
- **平台**：Vercel
- **命令行工具**：`vercel` 包（`^33.6.2`）作为依赖安装
- **脚本**：
  - `npm run deploy` → `vercel --prod`（生产环境部署）
  - `npm run prod` → 将 `main` 分支合并到 `prod` 分支并推送的 Git 工作流
- **域名**：在 OpenGraph / Twitter 元标签中引用 `https://www.joanramosrefusta.com`

## 分析与监控
- **性能监控**：`stats.js`（`^0.17.0`）—— FPS 计数器和内存统计（通常在开发阶段以小浮层形式显示）
- **无分析库**：未发现 Google Analytics、Mixpanel、Plausible 或类似的追踪脚本
- **无错误上报**：未集成 Sentry、LogRocket 或 Bugsnag

## 构建插件
| 插件 | 来源 | 用途 |
|--------|--------|---------|
| `CopyWebpackPlugin` | `webpack.common.js` | 将 `static/` 目录整体复制到 `dist/` |
| `HtmlWebpackPlugin` | `webpack.common.js` | 从 `src/index.html` 生成 HTML，注入打包文件，生产环境压缩 |
| `MiniCSSExtractPlugin` | `webpack.common.js` | 将 CSS 提取为独立文件（生产环境隐式替换 `style-loader`） |
| `CleanWebpackPlugin` | `webpack.prod.js` | 每次生产构建前清理 `dist/` |

### 额外构建配置
- **Babel**：`@babel/preset-env` 将现代 JS 转译为兼容浏览器的代码
- **Source Map**：在通用配置中启用 `devtool: "source-map"`
- **内容哈希**：生产环境 JS 包使用 `[contenthash]` 进行缓存破坏
- **开发服务器钩子**：自定义 `after` 钩子，在终端打印本地网络 + localhost URL

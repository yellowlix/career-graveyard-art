# Web Completeness Checklist

可复用的网页项目完整性检查清单。覆盖从开发到上线的所有关键维度。

> 适用范围：静态站、SPA、SSR、个人站、企业站均可参考。按项目实际需求裁剪。

---

## 1. 项目基础

### 1.1 工程化

- [ ] 包管理器锁文件 (`package-lock.json` / `pnpm-lock.yaml`)
- [ ] `.nvmrc` / `.node-version` 锁定 Node 版本
- [ ] `.env.example` 示例环境变量文件
- [ ] ESLint + 规则集
- [ ] Prettier / 代码格式化
- [ ] Stylelint（CSS/SCSS）
- [ ] EditorConfig (`.editorconfig`)
- [ ] TypeScript（或 JSDoc 类型注解）
- [ ] Git hooks (`husky` + `lint-staged`)：提交前自动 lint/format
- [ ] Commit 规范 (`commitlint` / Conventional Commits)

### 1.2 CI/CD

- [ ] 自动化构建流水线（GitHub Actions / GitLab CI）
- [ ] PR 自动跑 lint + test
- [ ] 自动部署（push to main → deploy）
- [ ] 构建产物缓存策略
- [ ] 分支预览环境（Preview Deployments）

### 1.3 文档

- [ ] `README.md`：项目说明、本地运行、部署方式
- [ ] `CONTRIBUTING.md`：贡献指南
- [ ] `CHANGELOG.md`：版本变更记录
- [ ] 架构设计文档（复杂项目）
- [ ] ADR（Architecture Decision Records，可选）

---

## 2. HTML & 语义化

### 2.1 文档结构

- [ ] 正确的 `<!DOCTYPE html>` 声明
- [ ] `<html lang="...">` 设置页面语言
- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] 语义化标签：`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- [ ] 每页只有一个 `<h1>`，标题层级递进不跳级
- [ ] `<title>` 每页唯一且描述准确

### 2.2 多语言（i18n）

- [ ] `<html lang>` 动态匹配当前语言
- [ ] `<link rel="alternate" hreflang="...">` 声明语言变体
- [ ] 日期/数字/货币本地化格式
- [ ] RTL 布局支持（如需阿拉伯语/希伯来语）
- [ ] 翻译文本外置，不硬编码

---

## 3. SEO

### 3.1 基础

- [ ] `<meta name="description">` 每页唯一
- [ ] `<link rel="canonical">` 规范链接
- [ ] `robots.txt` 配置
- [ ] `sitemap.xml`（动态生成优于手动维护）
- [ ] 404 页面返回正确 HTTP 状态码

### 3.2 结构化数据

- [ ] JSON-LD（`WebSite`, `BreadcrumbList`, `Article`, `Organization` 等）
- [ ] 面包屑导航（HTML + JSON-LD）
- [ ] 搜索引擎验证（Google Search Console / Bing Webmaster）

### 3.3 社交分享

- [ ] `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] `og:locale` + `og:locale:alternate`（多语言）
- [ ] `og:image` 尺寸 ≥ 1200×630，格式为 PNG/JPG（非 SVG）
- [ ] `twitter:card` (`summary_large_image`)
- [ ] `twitter:site`, `twitter:creator`
- [ ] 社交分享按钮 / `navigator.share()` API
- [ ] 分享预览测试（Facebook Debugger / Twitter Card Validator）

---

## 4. 性能

### 4.1 资源加载

- [ ] CSS/JS 压缩（minify）
- [ ] Gzip / Brotli 压缩传输
- [ ] 代码分割（Code Splitting / 动态 `import()`）
- [ ] Tree Shaking
- [ ] 构建产物 content hash 文件名（长期缓存）
- [ ] `<link rel="preconnect">` 预连接第三方域
- [ ] `<link rel="preload">` 关键资源
- [ ] `<link rel="dns-prefetch">` DNS 预解析

### 4.2 图片

- [ ] 现代格式：WebP / AVIF（兼容回退）
- [ ] 响应式图片：`srcset` + `sizes` 或 `<picture>`
- [ ] `loading="lazy"` 懒加载（首屏图片除外）
- [ ] `width` / `height` 属性防止布局偏移
- [ ] `decoding="async"` 异步解码
- [ ] 图片 CDN 或构建时优化插件

### 4.3 字体

- [ ] `font-display: swap`（或 `optional`）避免 FOIT
- [ ] `<link rel="preconnect" href="https://fonts.googleapis.com">`
- [ ] 字体子集化（只加载用到的字符）
- [ ] 本地托管字体（减少第三方依赖）
- [ ] 可变字体（Variable Fonts）减少请求数

### 4.4 监控

- [ ] Core Web Vitals 达标（LCP < 2.5s, INP < 200ms, CLS < 0.1）
- [ ] Lighthouse CI 集成到流水线
- [ ] Bundle 体积预算（`bundlesize` / `size-limit`）
- [ ] 性能回归告警

---

## 5. CSS

### 5.1 架构

- [ ] CSS 方法论（BEM / CSS Modules / Utility-first / CSS-in-JS）
- [ ] Design Tokens（颜色、字号、间距统一变量）
- [ ] 响应式断点体系
- [ ] 组件级样式隔离

### 5.2 适配

- [ ] 移动端优先（Mobile First）
- [ ] 深色模式：`prefers-color-scheme` + 手动切换
- [ ] 高对比度模式：`prefers-contrast`
- [ ] 减弱动画：`prefers-reduced-motion`
- [ ] 打印样式：`@media print`
- [ ] 逻辑属性（`margin-inline` 等，利于 RTL）

---

## 6. JavaScript

### 6.1 质量

- [ ] 严格模式（ES Module 默认严格）
- [ ] 错误边界 / 全局异常捕获（`window.onerror`, `unhandledrejection`）
- [ ] 输入校验 + 输出转义（XSS 防护）
- [ ] 无内存泄漏（事件监听器及时移除）
- [ ] 防抖 / 节流处理高频事件

### 6.2 兼容

- [ ] 目标浏览器声明（`browserslist`）
- [ ] 必要的 Polyfill 策略
- [ ] 渐进增强：JS 不可用时仍可阅读核心内容

---

## 7. 无障碍（Accessibility / a11y）

### 7.1 结构

- [ ] Skip Link（跳过导航直达内容）
- [ ] Landmark roles（`<nav>`, `<main>`, `<aside>` 等语义标签自带）
- [ ] 所有 `<img>` 有 `alt`（装饰图 `alt=""`）
- [ ] 表单元素关联 `<label>`
- [ ] 错误提示关联到对应字段（`aria-describedby`）

### 7.2 交互

- [ ] 全站可键盘导航（Tab / Enter / Escape / Arrow）
- [ ] 焦点可见样式（`:focus-visible`）
- [ ] 焦点管理（模态框打开/关闭、路由切换后焦点归位）
- [ ] ARIA 属性正确（`aria-expanded`, `aria-selected`, `aria-live` 等）
- [ ] 颜色不是唯一信息传达手段（如错误状态用颜色+图标+文字）

### 7.3 验证

- [ ] 自动化检测：`axe-core` / Lighthouse a11y 审计
- [ ] 屏幕阅读器手动测试（VoiceOver / NVDA）
- [ ] 色彩对比度 ≥ 4.5:1（正文）/ 3:1（大文本）

---

## 8. 安全

### 8.1 HTTP 头

- [ ] `Content-Security-Policy`（CSP）
- [ ] `Strict-Transport-Security`（HSTS）
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`（或 CSP `frame-ancestors`）
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy`（限制敏感 API：摄像头、麦克风等）

### 8.2 应用层

- [ ] 用户输入转义 / 消毒（防 XSS）
- [ ] 外链 `rel="noopener noreferrer"`
- [ ] 子资源完整性 SRI（`integrity` 属性）
- [ ] HTTPS 全站强制
- [ ] 敏感信息不写入前端代码 / localStorage
- [ ] 依赖漏洞扫描（`npm audit` / Dependabot / Snyk）

---

## 9. PWA & 离线

- [ ] `manifest.json`（`name`, `icons`, `start_url`, `display`, `theme_color`）
- [ ] 图标集：16/32/180/192/512 px（含 `maskable`）
- [ ] `favicon.ico`（兼容旧浏览器）
- [ ] `apple-touch-icon`
- [ ] Service Worker：缓存策略（Cache First / Network First / Stale While Revalidate）
- [ ] 离线回退页面
- [ ] 应用可安装提示

---

## 10. 用户体验

### 10.1 状态反馈

- [ ] 加载状态（骨架屏 / Spinner / 进度条）
- [ ] 空状态提示（列表无数据时）
- [ ] 错误状态提示（网络错误、操作失败）
- [ ] 成功反馈（Toast / 动画）
- [ ] 表单校验实时反馈

### 10.2 导航

- [ ] 面包屑导航（多层级页面）
- [ ] 返回顶部按钮
- [ ] 当前导航高亮
- [ ] 页面切换过渡动画（View Transitions API）
- [ ] 浏览器前进/后退状态恢复（`history.state`）

### 10.3 内容

- [ ] 搜索功能（站内搜索 / 过滤）
- [ ] RSS / Atom 订阅源
- [ ] 内容复制友好（代码块一键复制等）
- [ ] 外链标识（新窗口打开 + 图标提示）
- [ ] 图片点击放大 / Lightbox

---

## 11. 法律合规

- [ ] 隐私政策页面
- [ ] 使用条款页面
- [ ] Cookie / 存储告知（使用 localStorage / Cookie 时）
- [ ] Cookie 同意横幅（GDPR / ePrivacy，如面向欧盟用户）
- [ ] 版权声明（Footer）
- [ ] 开源许可证（`LICENSE` 文件）

---

## 12. 数据分析

- [ ] 访问量统计（推荐隐私友好方案：Umami / Plausible / GoatCounter）
- [ ] 核心事件埋点（页面浏览、按钮点击、搜索、表单提交）
- [ ] 转化漏斗追踪（如有商业目标）
- [ ] 错误监控 + 告警（Sentry / LogRocket）
- [ ] Web Vitals 真实用户监控（RUM）
- [ ] Uptime 监控（UptimeRobot / Better Stack）

---

## 13. 部署 & 运维

### 13.1 托管

- [ ] 静态托管配置（`netlify.toml` / `vercel.json` / nginx）
- [ ] 自定义域名 + DNS 配置
- [ ] HTTPS 证书（自动续期）
- [ ] CDN 分发
- [ ] 地域就近节点（面向目标用户）

### 13.2 缓存策略

- [ ] HTML：`Cache-Control: no-cache`（始终校验）
- [ ] 带 hash 静态资源：`Cache-Control: max-age=31536000, immutable`
- [ ] API 响应：按业务需求设置

### 13.3 重定向 & 错误

- [ ] `www` ↔ 裸域 重定向
- [ ] HTTP → HTTPS 重定向
- [ ] 旧链接 301 重定向
- [ ] 自定义 404 页面路由配置
- [ ] 自定义 500 页面（有服务端时）

---

## 14. 测试

### 14.1 自动化

- [ ] 单元测试（Vitest / Jest）
- [ ] 组件测试（Testing Library）
- [ ] E2E 测试（Playwright / Cypress）
- [ ] 视觉回归测试（截图对比）
- [ ] a11y 自动化测试（`axe-core`）

### 14.2 手动 / 兼容

- [ ] 主流浏览器验证（Chrome, Firefox, Safari, Edge）
- [ ] 移动端真机测试（iOS Safari, Android Chrome）
- [ ] 屏幕阅读器测试
- [ ] 慢网络测试（Chrome DevTools Network Throttling）
- [ ] 不同时区 / 语言环境测试

---

## 15. 上线前 Checklist

> 上线前最终过一遍。

- [ ] 所有 `console.log` / 调试代码已移除
- [ ] 环境变量指向生产配置
- [ ] `robots.txt` 允许爬虫（非 `Disallow: /`）
- [ ] `sitemap.xml` 链接均正确可访问
- [ ] OG 图片 / favicon 显示正常
- [ ] 所有页面 `<title>` 和 `<meta description>` 已填写
- [ ] 404 页面正常返回
- [ ] 表单提交测试通过
- [ ] 数据分析代码已部署且验证数据流通
- [ ] HTTPS 生效，无混合内容警告
- [ ] Lighthouse 得分 ≥ 90（Performance / A11y / Best Practices / SEO）
- [ ] 真实设备上体验确认

---

## 使用说明

1. **新项目启动**：复制本文件到项目 `docs/` 下，按项目类型删除不适用项。
2. **迭代开发**：每次版本发布前回顾未勾选项，评估是否需要补全。
3. **团队协作**：可将各 Section 分配给不同角色（前端 / 运维 / 设计 / 法务）。
4. **持续更新**：随 Web 标准演进补充新条目（如新的 CSS 特性、浏览器 API）。

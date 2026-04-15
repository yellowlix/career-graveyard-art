# 职业墓场项目设计文档

## 1. 文档目的

本文档用于描述 `career-graveyard-art` 当前版本的真实工程形态，作为产品、设计、开发和测试协作时的统一技术基线。

这份文档重点回答 4 个问题：

- 项目现在不是旧的 `Vite + 多页 HTML` 方案，而是怎样的 `Next.js` 架构
- 页面、数据、样式、SEO 和测试分别落在哪些文件
- 当前版本的能力边界是什么，哪些事情明确不做
- 后续继续迭代时，应以什么方式理解和扩展现有结构

## 2. 当前版本定位

`Career Graveyard / 职业墓场` 是一个以“数字墓园”方式呈现职业变迁的静态多页面站点。

当前版本的核心定位：

- 使用 `Next.js App Router` 组织页面与路由
- 使用静态导出 `output: "export"` 生成最终产物
- 不接入后端、数据库、CMS 或外部 API
- 内容以本地静态数据为准，统一维护在 [src/data.js](/F:/Work/Web/career-graveyard-art/src/data.js)
- 用户投稿通过 `mailto:` 生成邮件草稿，不在站内持久化

## 3. 技术栈与关键决策

### 3.1 当前技术栈

- 框架：`Next.js 16`
- 视图库：`React 19`
- 路由体系：`App Router`
- 构建模式：静态导出 `output: "export"`
- 样式方案：全局原生 `CSS`
- 自动化测试：`Playwright`
- 工程质量：`ESLint`、`Prettier`、`husky`

### 3.2 从旧栈到当前栈的迁移结论

项目已经从早期的 `Vite + 原生 JS/CSS + 多页 HTML` 重构到当前的 `Next.js App Router` 结构。迁移后有几个重要变化：

- 路由不再由多个独立 HTML 文件拼接，而是由 `src/app/**/page.js` 管理
- 共享壳层不再集中在单个 `src/app.js`，而是拆分到 [src/app/layout.js](/F:/Work/Web/career-graveyard-art/src/app/layout.js)、[src/components/Shell.js](/F:/Work/Web/career-graveyard-art/src/components/Shell.js)、[src/components/SiteNav.js](/F:/Work/Web/career-graveyard-art/src/components/SiteNav.js) 和页脚组件
- 全站样式不再来自 `src/styles.css`，而是统一收敛到 [src/app/globals.css](/F:/Work/Web/career-graveyard-art/src/app/globals.css)
- SEO 元信息改由 Next metadata 与 JSON-LD 组件生成，而不是手工在 HTML 中维护
- 职业详情页通过 `generateStaticParams()` 预生成静态路径，而不是通过查询参数解析单页内容

## 4. 目录与职责划分

### 4.1 关键目录

- [src/app](/F:/Work/Web/career-graveyard-art/src/app): 页面路由、布局、全局样式、sitemap
- [src/components](/F:/Work/Web/career-graveyard-art/src/components): 共享壳层、导航、页脚、JSON-LD 等组件
- [src/lib](/F:/Work/Web/career-graveyard-art/src/lib): i18n、metadata、SEO 和翻译工具
- [src/data.js](/F:/Work/Web/career-graveyard-art/src/data.js): 站点内容与配置事实源
- [scripts/generate-sitemap.js](/F:/Work/Web/career-graveyard-art/scripts/generate-sitemap.js): 构建后补充 `out/sitemap.xml`
- [tests/site.spec.js](/F:/Work/Web/career-graveyard-art/tests/site.spec.js): E2E 与视觉回归主测试
- [docs](/F:/Work/Web/career-graveyard-art/docs): 设计、交付、协作与策略文档

### 4.2 页面入口

当前公开页面与入口文件的映射如下：

| 路由 | 入口文件 | 说明 |
| --- | --- | --- |
| `/` | [src/app/page.js](/F:/Work/Web/career-graveyard-art/src/app/page.js) | 首页 |
| `/archive` | [src/app/archive/page.js](/F:/Work/Web/career-graveyard-art/src/app/archive/page.js) | 职业归档列表 |
| `/career/[slug]` | [src/app/career/[slug]/page.js](/F:/Work/Web/career-graveyard-art/src/app/career/[slug]/page.js) | 职业详情页，静态生成 |
| `/memorial` | [src/app/memorial/page.js](/F:/Work/Web/career-graveyard-art/src/app/memorial/page.js) | 祭奠与投稿页 |
| `/about` | [src/app/about/page.js](/F:/Work/Web/career-graveyard-art/src/app/about/page.js) | 项目说明页 |
| `404` | [src/app/not-found.js](/F:/Work/Web/career-graveyard-art/src/app/not-found.js) | 缺失页面 |

## 5. 渲染与路由设计

### 5.1 布局层

- [src/app/layout.js](/F:/Work/Web/career-graveyard-art/src/app/layout.js) 提供全站 metadata 基线、`<html lang>` 初值和统一页面壳层
- [src/components/Shell.js](/F:/Work/Web/career-graveyard-art/src/components/Shell.js) 负责 skip link、背景颗粒、导航与页脚包裹
- [src/components/SiteNav.js](/F:/Work/Web/career-graveyard-art/src/components/SiteNav.js) 根据当前 pathname 控制首页 logo、详情页 back 和导航激活态

### 5.2 页面层

页面路由文件本身尽量保持轻量，职责主要是：

- 声明当前页面 metadata
- 作为 Server Component 入口
- 挂载对应的 Client Component

例如：

- 首页入口挂载 `HomePageClient`
- 归档入口挂载 `ArchivePageClient`
- 祭奠入口挂载 `MemorialPageClient`
- 关于入口挂载 `AboutPageClient`
- 职业详情入口挂载 `CareerDetailContent`

### 5.3 职业详情页静态生成

[src/app/career/[slug]/page.js](/F:/Work/Web/career-graveyard-art/src/app/career/[slug]/page.js) 通过 `generateStaticParams()` 读取 `careers` 数据生成所有详情页路径，因此详情页属于构建期静态产物，而不是运行时服务端查询页面。

## 6. 数据与内容设计

### 6.1 单一内容事实源

当前站点所有公开内容都来自 [src/data.js](/F:/Work/Web/career-graveyard-art/src/data.js)。

主要数据块包括：

- `siteMeta`: 站点名、域名、联系邮箱、默认描述、社交图
- `statusMeta`: 职业状态字典与排序
- `siteCopy`: 中英双语界面文案与邮件模板
- `careers`: 职业条目、时间线、因素、悼词节录
- `aboutData`: 关于页内容
- `initialMemorials`: 祭奠页静态示例

### 6.2 数据边界

当前版本明确不做：

- 在线用户内容存储
- 投稿审核工作台
- 数据库建模后的运行时读写
- 外部内容源同步

因此，数据更新链路仍然是：

1. 维护者整理内容
2. 更新 `src/data.js`
3. 执行构建
4. 发布新的静态产物

## 7. 双语与客户端增强

### 7.1 双语组织方式

项目采用中英双语内容对象，而不是 URL 级多语言路由。语言切换通过 [src/lib/i18n.js](/F:/Work/Web/career-graveyard-art/src/lib/i18n.js) 管理：

- 默认语言为 `zh`
- 支持语言为 `zh / en`
- 语言偏好保存在 `localStorage`
- 切换语言时同步更新 `document.documentElement.lang`

### 7.2 客户端增强的定位

虽然最终产物是静态 HTML，但以下交互依赖客户端增强：

- 语言切换
- 首页滚动与交互状态
- 归档筛选、搜索、分页与排序
- 祭奠页双模式表单与 `mailto:` 草稿生成

## 8. 样式与设计系统

### 8.1 样式入口

全站视觉系统统一定义在 [src/app/globals.css](/F:/Work/Web/career-graveyard-art/src/app/globals.css)。

其中包含：

- 字体导入
- 颜色 token
- typography token
- 布局容器宽度
- 响应式断点变量
- 全局组件样式

### 8.2 当前设计原则

- 保持“白底、极简、纪念性”的主氛围
- 共享壳层统一于页面特例之前
- 页面独有结构允许存在，但不能破坏全站视觉语法
- 响应式基准固定为 `1440 / 1280 / 768 / 390`

## 9. SEO、元信息与静态导出

### 9.1 metadata

- 全站 metadata 基线定义在 [src/app/layout.js](/F:/Work/Web/career-graveyard-art/src/app/layout.js)
- 页面级 metadata 通过 [src/lib/pageMetadata.js](/F:/Work/Web/career-graveyard-art/src/lib/pageMetadata.js) 构建
- 页面结构化数据通过 [src/components/PageJsonLd.js](/F:/Work/Web/career-graveyard-art/src/components/PageJsonLd.js) 输出

### 9.2 sitemap

项目当前同时保留两层 sitemap 相关实现：

- [src/app/sitemap.js](/F:/Work/Web/career-graveyard-art/src/app/sitemap.js): Next 路由层 sitemap 定义
- [scripts/generate-sitemap.js](/F:/Work/Web/career-graveyard-art/scripts/generate-sitemap.js): 构建后写入 `out/sitemap.xml`

### 9.3 静态导出

[next.config.js](/F:/Work/Web/career-graveyard-art/next.config.js) 当前关键配置如下：

- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`

这说明项目的部署目标仍是纯静态托管，而不是 Node 常驻服务。

## 10. 测试与验收

### 10.1 Playwright

[tests/site.spec.js](/F:/Work/Web/career-graveyard-art/tests/site.spec.js) 当前覆盖：

- 首页、归档、详情等关键路径
- 中英文切换与持久化
- 多视口布局验证
- 截图型视觉回归

### 10.2 视口矩阵

Playwright 当前标准矩阵为：

- `desktop-1440`
- `desktop-1280`
- `tablet-768`
- `mobile-390`

### 10.3 CI

[.github/workflows/ci.yml](/F:/Work/Web/career-graveyard-art/.github/workflows/ci.yml) 会在 `main` 与 `next` 的 `push / pull_request` 上执行：

- `Lint & Format`
- `Build`
- `E2E Tests`

## 11. 部署与运行边界

### 11.1 本地开发

```bash
npm install
npm run dev -- -H 127.0.0.1 -p 4173
```

### 11.2 构建与产物

```bash
npm run build
```

构建产物输出到 `out/`，用于静态部署。

## 12. 当前限制与后续扩展

### 12.1 当前限制

- 无后端
- 无数据库
- 无 CMS
- 无运行时内容审核
- 无在线用户投稿持久化
- 无外部 API 依赖

### 12.2 推荐扩展方向

- 引入正式内容管理与审核流
- 将静态内容拆出为更稳定的内容源或 CMS
- 增加分析、错误监控与运营能力
- 根据产品方向决定是否扩展为社区或研究型产品

## 13. 文档关系

这份文档是“当前工程实现”的总览。

相关配套文档如下：

- [README.md](/F:/Work/Web/career-graveyard-art/README.md): 对外说明与快速上手
- [docs/community-domain-model-design.md](/F:/Work/Web/career-graveyard-art/docs/community-domain-model-design.md): V1 产品边界与邮箱投稿模式
- [docs/superdesign-delivery-playbook.md](/F:/Work/Web/career-graveyard-art/docs/superdesign-delivery-playbook.md): 设计稿同步与交付流程
- [docs/responsive-spec.md](/F:/Work/Web/career-graveyard-art/docs/responsive-spec.md): 响应式规则
- [docs/typography-tokens.md](/F:/Work/Web/career-graveyard-art/docs/typography-tokens.md): 字体与排版 token

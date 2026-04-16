# 职业墓场

职业墓场是一个以“数字墓园”方式呈现职业变化的静态站点。它通过归档、详情页、时间线与悼词，把那些正在衰退、冻结、被替代或被重新定价的职业整理成一套可浏览的公开展示体验。

当前线上地址：

- `https://career-graveyard.com`
- `https://www.career-graveyard.com`

## 当前技术栈

- `Next.js 16` + `React 19`
- App Router
- 静态导出 `output: export`
- 原生 `CSS`
- `Playwright` 端到端与视觉回归测试
- `ESLint` + `Prettier` + `husky` 预提交检查

## 页面结构

- `/` 首页
- `/archive` 归档
- `/career/[slug]` 职业详情
- `/memorial` 祭奠
- `/about` 关于
- `/_not-found` / 404 页面

## 当前产品形态

- 首页、归档页、职业详情页、祭奠页与关于页都以静态 HTML 输出，再由客户端增强交互
- 祭奠页支持两种模式：
  - 为已收录职业生成祭奠邮件草稿
  - 为未收录职业生成“简介 + 悼词”投稿邮件草稿
- 当前投稿入口是项目邮箱 `mahrovandrei@gmail.com`
- 页面提供 `mailto:` 跳转与手动复制 fallback，不在站内保存真实投稿内容
- 站内 `localStorage` 目前主要用于保存语言偏好

## 本地开发

```bash
npm install
npm run dev -- -H 127.0.0.1 -p 4173
```

打开 [http://127.0.0.1:4173](http://127.0.0.1:4173) 查看。

## 构建、预览与测试

```bash
npm run build
npm run preview
npm run lint
npm run format:check
npm run test:e2e
```

如需更新视觉快照基线：

```bash
npm run test:e2e:update
```

构建输出目录为 `out/`。`scripts/generate-sitemap.js` 会在构建后生成 `sitemap.xml`。

## 数据与内容

- 站点内容主要维护在 `src/data.js`
- 页面 SEO 与结构化数据由 App Router metadata 和 JSON-LD 组件提供
- `siteUrl`、canonical 和 sitemap 当前以 `https://career-graveyard.com` 作为公开站点基准

## CI / 部署

- `CI` 会在 `main` 和 `next` 的 `push / pull_request` 上运行
- 检查内容包括：
  - `Lint & Format`
  - `Build`
  - `E2E Tests`
- `main` 分支的 push 会触发 `.github/workflows/deploy.yml`
- 部署流程会先构建 `out/`，再通过 `rsync` 同步到服务器 `/var/www/career-graveyard/`
- 仓库同时保留 `vercel.json`，用于 Vercel 预览环境识别 `out/` 输出目录

## 协作流程

- 日常开发与集成优先进入 `next`
- 发布时将 `next` 合并到 `main`
- `main` 更新后自动部署到自有服务器

## 设计来源

- SuperDesign Project ID: `b0537f78-0b6d-4097-a4b2-3aca11210ed9`
- 项目设计文档：`docs/project-design.md`
- 设计与交付流程说明：`docs/superdesign-delivery-playbook.md`
- 响应式设计规格：`docs/responsive-spec.md`
- 分支与提交协作规则：`docs/github-branch-policy.md`

## 当前限制

- 当前版本没有后端、数据库、审核流、用户系统或 CMS
- 真实投稿不会直接写入站点，也不会在站内公开展示；维护者通过项目邮箱人工整理内容
- 祭奠页展示的是静态示例与邮件草稿，不是在线留言系统

## 后续扩展方向

- 接入真实数据存储与审核流
- 引入正式的领域模型与后台管理
- 补充 analytics、错误监控与运营能力
- 进一步扩展职业条目、信息页和分享资产

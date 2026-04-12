# 职业墓场

职业墓场是一个以“数字墓园”方式呈现职业变化的静态网站。它通过归档、详情页、时间线与悼词，把那些正在衰退、冻结、被替代或被重新定价的职业整理成一套可浏览的公开展示站点。

当前线上地址：

- `https://career-graveyard.com`
- `https://www.career-graveyard.com`

## 当前技术栈

- `Vite`
- 原生 `JavaScript (ES Modules)`
- 原生 `CSS`
- 多页面静态 HTML
- `Playwright` 端到端与视觉回归测试

## 页面结构

- `/` 首页
- `/archive.html` 归档
- `/career.html?slug=...` 职业详情
- `/memorial.html` 祭奠
- `/about.html` 信息页
- `/404.html` 404 页面

## 当前产品形态

- 首页、归档页、职业详情页、祭奠页与关于页均为静态页面
- 祭奠页支持两种模式：
  - 为已收录职业生成祭奠邮件草稿
  - 为未收录职业生成“简介 + 悼词”投稿邮件草稿
- 当前投稿入口是项目邮箱 `mahrovandrei@gmail.com`
- 页面会提供 `mailto:` 跳转与手动复制 fallback，不在站内保存真实投稿内容

## 本地启动

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 4173
```

打开 [http://127.0.0.1:4173](http://127.0.0.1:4173) 查看。

## 构建与测试

```bash
npm run build
npm run test:e2e
```

如需更新视觉快照基线：

```bash
npm run test:e2e:update
```

## CI / 部署

- `CI` 会在 `main` 和 `next` 的 `push / pull_request` 上运行
- 检查内容包括：
  - `Build`
  - `E2E Tests`
- 生产部署由 `.github/workflows/deploy.yml` 负责
- 当前部署策略是：
  - 日常改动先进入 `next`
  - 发布时通过 PR 将 `next` 合并到 `main`
  - `main` 更新后自动部署到服务器 `/var/www/career-graveyard/`

## 设计来源

- SuperDesign Project ID: `b0537f78-0b6d-4097-a4b2-3aca11210ed9`
- 设计与交付流程说明：`docs/superdesign-delivery-playbook.md`
- 响应式设计规格：`docs/responsive-spec.md`
- 分支与提交协作规则：`docs/github-branch-policy.md`

## 当前限制

- 当前版本没有后端、数据库、审核流、用户系统或 CMS。
- 真实投稿不会直接写入站点，也不会在站内公开展示；维护者通过项目邮箱人工整理内容。
- 站内 `localStorage` 当前主要用于保存语言偏好，不承担祭奠留言存储职责。
- `siteUrl`、canonical 和 sitemap 当前以 `https://career-graveyard.com` 作为公开站点基准。

## 后续扩展方向

- 接入真实数据存储与审核流
- 引入正式的领域模型与后台管理
- 补充 analytics、错误监控与运营能力
- 进一步扩展职业条目、信息页和分享资产

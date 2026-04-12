# 职业墓场

职业墓场是一个以“数字墓园”方式呈现职业变化的静态网站。它通过归档、详情页、时间线与悼词，把那些正在衰退、冻结、被替代或被重新定价的职业整理成一套可浏览的公开展示站点。

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

## 设计来源

- SuperDesign Project ID: `b0537f78-0b6d-4097-a4b2-3aca11210ed9`
- 设计与交付流程说明：`docs/superdesign-delivery-playbook.md`
- 响应式设计规格：`docs/responsive-spec.md`

## 当前限制

- 祭奠留言仅保存在本地浏览器 `localStorage` 中，不会跨设备同步。
- 当前版本没有后端、数据库、审核流、用户系统或 CMS。
- `siteUrl`、canonical 和 sitemap 当前以 `https://career-graveyard.com` 作为公开站点基准，正式部署时应与实际域名保持一致。

## 后续扩展方向

- 接入真实数据存储与审核流
- 引入正式的领域模型与后台管理
- 补充 analytics、错误监控与运营能力
- 进一步扩展职业条目、信息页和分享资产

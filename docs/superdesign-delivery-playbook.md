# Career Graveyard SuperDesign 交付手册

## 1. 文档目的
- 统一本项目从 SuperDesign 拉取页面、更新实现、进行验收、完成定稿的标准流程。
- 降低后续迭代时的主观判断成本，避免“按感觉改”和“不同页面标准不一致”。
- 明确本项目的设计事实源、实现事实源、验收事实源。

## 2. 事实源定义

### 2.1 设计事实源
- SuperDesign Project ID: `b0537f78-0b6d-4097-a4b2-3aca11210ed9`
- Project Name: `career-graveyard-art`

### 2.2 页面 Draft 对应关系
- 首页: `f9416e7d-313c-499b-848f-4733ff897bde`
- 归档: `2d02b90d-a8dc-4a6b-b944-7fb2c27f004b`
- 详情: `9caf88df-8b66-4eb1-8573-3e5d42f03da9`
- 祭奠: `be794d41-1252-4da6-8785-d672198c2380`
- 关于: `9e15dcb3-c193-4468-aa38-198d977185c7`

### 2.3 共享组件
- NavigationBar: `d30f270e-9ccc-4c66-919a-dfc440867314`
- PageFooter: `cc865474-ff5c-41f4-8c20-8af3a6dfc5f2`

### 2.4 代码事实源
- 布局与路由壳层: [src/app/layout.js](F:\Work\Web\career-graveyard-art\src\app\layout.js)
- 共享页面壳层: [src/components/Shell.js](F:\Work\Web\career-graveyard-art\src\components\Shell.js)
- 视觉样式: [src/app/globals.css](F:\Work\Web\career-graveyard-art\src\app\globals.css)
- 页面数据: [src/data.js](F:\Work\Web\career-graveyard-art\src\data.js)
- 项目设计文档: [docs/project-design.md](F:\Work\Web\career-graveyard-art\docs\project-design.md)
- 响应式规范: [docs/responsive-spec.md](F:\Work\Web\career-graveyard-art\docs\responsive-spec.md)
- 字体规格: [docs/typography-tokens.md](F:\Work\Web\career-graveyard-art\docs\typography-tokens.md)

### 2.5 验收事实源
- 构建命令: `npm run build`
- 视觉回归命令: `npm run test:e2e`
- 快照目录: [tests/site.spec.js-snapshots](F:\Work\Web\career-graveyard-art\tests\site.spec.js-snapshots)

## 3. 标准工作流

### Step 1. 拉取最新设计节点
使用 SuperDesign CLI 获取项目下最新节点和页面说明：

```powershell
superdesign fetch-design-nodes --project-id b0537f78-0b6d-4097-a4b2-3aca11210ed9 --json
```

目标：
- 确认本轮变更影响的是哪些页面。
- 先看 description，再判断是导航更新、页面结构更新还是内容更新。

决策规则：
- 如果只是统一导航、字级、透明度、边框等横向系统更新，优先改共享样式。
- 如果某个页面结构发生变化，再单独改对应页面区域。

### Step 2. 拉取对应 Draft HTML
对受影响页面逐个拉取 HTML：

```powershell
superdesign get-design --draft-id <draft-id> --output .superdesign\latest-html\<page>.html
```

执行后同步到：
- 临时比对目录: [.superdesign/latest-html](F:\Work\Web\career-graveyard-art\.superdesign\latest-html)
- 本地归档目录: [.superdesign/draft-html](F:\Work\Web\career-graveyard-art\.superdesign\draft-html)

目标：
- 保留“本轮最新稿”与“项目归档稿”两份记录。
- 允许后续快速回看设计差异。

### Step 3. 识别变更类型
变更统一分为 4 类：
- 视觉系统更新: 导航、页脚、字体、字号、颜色、边框、透明度、颗粒感。
- 页面结构更新: 首屏层级、卡片列数、筛选区位置、详情页左右结构。
- 交互更新: back 行为、筛选逻辑、hover、过渡动画。
- 内容更新: 文案、数据、职业条目、统计值。

规则：
- 先改共享，再改页面。
- 先改样式，再改结构。
- 先改高频页面，再改低频页面。

## 4. 修改标准

### 4.1 设计还原标准
- 默认按“高保真还原”执行，不按“风格参考”执行。
- 未经明确要求，不得擅自发明新的视觉语言。
- 代码实现允许工程化，但不得为了复用牺牲页面版式。

### 4.2 本项目当前锁定标准
- 全站导航统一为白底极简样式。
- 首页不再依赖 `mix-blend-mode` 作为主可见性方案。
- 详情页 `BACK` 优先使用浏览器历史返回；无有效历史时再走兜底链接。
- 响应式基准固定为 `1440 / 1280 / 768 / 390`。
- 双容器策略固定为 `content-narrow = 1280`、`content-wide = 1440`。
- 全站正文与 UI 字级统一收口到 `12 / 14 / 16 / 18 / 24 / 32` 六档。
- 页面级标题继续使用 `display token` 的响应式 `clamp()`，不另开第二套标题体系。
- 字重、行高、字距优先复用 typography token，不再零散追加裸值。
- `Memorial` 页当前锁定为单页双模式邮箱投稿页，且主内容区沿用 detail 页级别的统一左右内缩边界。

### 4.3 禁止事项
- 不允许只改单页而不看共享导航和共享样式。
- 不允许设计稿已统一，代码里仍保留旧视觉分支。
- 不允许只跑功能、不跑视觉回归。
- 不允许改完后不更新规范文档。

## 5. 实施映射规则

### 5.1 优先修改文件
- 共享导航与壳层: [src/components/Shell.js](F:\Work\Web\career-graveyard-art\src\components\Shell.js)、[src/components/SiteNav.js](F:\Work\Web\career-graveyard-art\src\components\SiteNav.js)、[src/app/layout.js](F:\Work\Web\career-graveyard-art\src\app\layout.js)
- 全站视觉系统: [src/app/globals.css](F:\Work\Web\career-graveyard-art\src\app\globals.css)
- 数据驱动内容: [src/data.js](F:\Work\Web\career-graveyard-art\src\data.js)
- 测试视口与回归矩阵: [playwright.config.js](F:\Work\Web\career-graveyard-art\playwright.config.js)
- 验收脚本: [tests/site.spec.js](F:\Work\Web\career-graveyard-art\tests\site.spec.js)
- 规范更新: [docs/responsive-spec.md](F:\Work\Web\career-graveyard-art\docs\responsive-spec.md)
- 字体规范更新: [docs/typography-tokens.md](F:\Work\Web\career-graveyard-art\docs\typography-tokens.md)

### 5.2 页面级修改边界
- 首页: 首屏、问题文案、墓碑阵列、引用区。
- 归档: 筛选区、排序区、墓碑矩阵密度。
- 详情: 标题层级、状态区、时间线、因素卡、back 行为。
- 祭奠: 双模式切换、表单布局、邮件预览、静态示例层级，以及切换区与正文共用的左右内缩边界。
- 关于: 使命区、方法论、指标区、贡献者网格。

## 6. 审核工具与顺序

### 6.1 必跑工具
1. `npm run build`
2. `npm run test:e2e:update`  
只在设计发生视觉变化时更新基线。
3. `npm run test:e2e`

### 6.2 工具目的
- `build`: 保证产物可编译。
- `test:e2e:update`: 生成当前设计的正式快照基线。
- `test:e2e`: 验证四档视口下页面与基线一致。

### 6.3 当前回归矩阵
- `desktop-1440`
- `desktop-1280`
- `tablet-768`
- `mobile-390`

## 7. 通过标准

### 7.1 技术通过
- `npm run build` 成功。
- `npm run test:e2e` 全部通过。
- 无新增阻断性控制台错误。[assumption] 当前仍以 Playwright 页面通过作为主要技术信号。

### 7.2 设计通过
- 导航在四档视口均可见、可读、可点。
- 首页、归档、详情页的截图基线稳定。
- 页面结构与最新 SuperDesign Draft 的核心视觉关系一致。
- 共享组件的风格在所有页面统一。

### 7.3 产品通过
- 用户从归档进入详情时，`BACK` 能回到上一层。
- 设计变更不会破坏现有数据驱动结构。
- 新增设计规则已经写入文档，不依赖口头传递。

## 8. 变更冻结规则
- 一旦某轮设计通过视觉回归并被标记为定稿，后续改动必须重新走：
  - 拉节点
  - 拉 HTML
  - 对照修改
  - 更新快照
  - 更新文档
- 不允许直接在代码里“偷改”已冻结设计。

## 9. 当前建议执行方式
- 日常小改：先看节点 description，再只改对应共享层或页面层。
- 导航或系统风格更新：先改共享壳层，再跑四档回归。
- 页面结构更新：先比对最新 Draft HTML，再改具体页面区域。

## 10. 本文档的结论
- SuperDesign 是设计输入源，不是最终运行源。
- 前端代码是最终交付源，但必须服从 SuperDesign 最新定稿。
- Playwright 快照是当前最可靠的验收关卡。

## Decisions Made
- 设计输入源锁定为指定 SuperDesign 项目与 5 个 Draft。
- 验收工具锁定为 `build + Playwright`。
- 当前项目默认按高保真还原执行。

## Assumptions To Validate
- [assumption] 未来仍以当前 5 页为主，不会新增独立页面类型。
- [assumption] SuperDesign CLI 与 Project 权限继续可用。

## Recommended Next Step
- 每次新的 SuperDesign 变更先更新本手册中的 Draft 映射，再进入代码修改。

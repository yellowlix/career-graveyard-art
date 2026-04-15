# Career Graveyard 设计定稿审查 V1

## 1. 审查目标
- 确认当前网页实现是否已经达到可冻结交付的标准。
- 用产品经理的视角判断：这套设计是否足够一致、可维护、可验收、可迭代。

## 2. 审查范围
- 设计输入源：
  - SuperDesign Project `b0537f78-0b6d-4097-a4b2-3aca11210ed9`
  - 首页、归档、详情、祭奠、关于 5 个 Draft
- 代码实现：
  - [src/app/layout.js](F:\Work\Web\career-graveyard-art\src\app\layout.js)
  - [src/app/globals.css](F:\Work\Web\career-graveyard-art\src\app\globals.css)
  - [src/components/Shell.js](F:\Work\Web\career-graveyard-art\src\components\Shell.js)
  - [src/data.js](F:\Work\Web\career-graveyard-art\src\data.js)
- 验收体系：
  - [playwright.config.js](F:\Work\Web\career-graveyard-art\playwright.config.js)
  - [tests/site.spec.js](F:\Work\Web\career-graveyard-art\tests\site.spec.js)
  - [tests/site.spec.js-snapshots](F:\Work\Web\career-graveyard-art\tests\site.spec.js-snapshots)

## 3. 定稿版本结论
结论：**建议冻结为 V1，可继续迭代，但不建议再无目标地反复细抠。**

原因：
- 共享导航已经统一。
- 四档响应式基准已经建立。
- 详情页 back 行为已经符合用户心智。
- 构建与回归体系已经具备“防回退能力”。

Tradeoff：
- 选择“可维护的高保真”而不是“无上限像素级雕刻”。
- 代价是仍可能存在少量视觉微差，但换来了稳定的改版流程和明确验收门槛。

## 4. 本轮冻结的设计决策

### 4.1 导航系统
- 全站导航统一为白底极简样式。
- 首页不再使用 `mix-blend-mode` 作为主要视觉可见性方案。
- 导航使用全宽布局，不受内容容器宽度约束。
- 详情页保留 `BACK`，并优先使用浏览器历史返回。

### 4.2 响应式系统
- 正式基准锁定为：
  - `1440 x 1080`
  - `1280 x 960`
  - `768 x 1024`
  - `390 x 844`
- 双容器锁定为：
  - `content-narrow = 1280`
  - `content-wide = 1440`

### 4.3 页面结构
- 首页与归档在手机端继续保留两列墓碑阵列。
- 详情、祭奠、关于在手机端以单列阅读为优先。
- 共享样式优先于单页特例，但不得牺牲页面独有结构。

## 5. PM 审查结果

### 5.1 通过项
- 一致性：通过  
导航、页头、页脚、微字体和页面氛围已形成统一系统。

- 可用性：通过  
详情页 `BACK` 已改为优先历史返回，更符合真实路径。

- 可维护性：通过  
设计输入源、实现层、验收层已拆清楚，不再只靠人工记忆。

- 可验收性：通过  
四档视口 + 截图基线已建立，设计回归可以被自动发现。

### 5.2 发现的问题与判定
- 问题 1：过去导航标准不统一。  
判定：已解决。

- 问题 2：详情页 `BACK` 过去回首页，违背用户路径心智。  
判定：已解决。

- 问题 3：设计规范过去散落在代码和对话里。  
判定：已解决，现已沉淀为手册与响应式规范。

### 5.3 残余风险
- [assumption] 后续如果 SuperDesign 再做大范围页面结构改版，现有快照会大量失效，需要重新生成基线。
- [assumption] 当前中文在部分终端输出中显示异常，若未来涉及导出文档或跨终端交付，需要单独核对编码链路。
- 如果新增页面类型，当前 5 页规则不能自动覆盖，必须补充映射与验收。

## 6. 审查门槛

### 6.1 必须满足
- `npm run build` 通过
- `npm run test:e2e` 通过
- 四档视口首页导航可见
- 首页、归档、详情截图基线存在且稳定

### 6.2 当前结果
- 构建：通过
- Playwright 回归：通过
- 当前回归总数：`28 passed`

## 7. 不纳入本次冻结的内容
- 后端化的祭奠留言持久化
- 新页面扩展
- 更进一步的像素级人工比图
- SEO、分析埋点、内容运营体系

理由：
- 这些事项不影响当前“设计定稿”本身。
- 如果混入本轮，会把设计冻结变成一个无限扩大范围的项目。

## 8. 建议的后续路线

### Now
- 冻结当前设计与验收基线。
- 后续所有设计变更都先走交付手册。

### Next
- 若 SuperDesign 再次改版，优先更新共享导航和响应式规则，再处理页面细节。
- 若产品继续推进，优先补真实数据和祭奠后端存储。

### Later
- 如果要做发布级交付，再补：
  - SEO
  - 埋点
  - 内容管理
  - 部署规范

## 9. PM 审查结论
这版已经不是“一个设计实验”，而是一套可以持续交付的前端产品资产。  
建议把当前版本标记为 **Design Freeze V1**，后续迭代按“变更申请 -> SuperDesign 更新 -> 代码同步 -> 自动回归 -> 文档更新”的节奏推进。

## Decisions Made
- 当前版本建议冻结为 `Design Freeze V1`。
- 后续改版必须遵守交付手册。
- 当前回归体系可作为正式验收门槛。

## Assumptions To Validate
- [assumption] 当前业务目标仍然以设计质量与多页面一致性为主，不以增长指标为主。
- [assumption] 当前 5 页结构在短期内不会新增第 6 类页面。

## Recommended Next Step
- 把本次冻结作为后续所有设计更新的基线版本，并在下一次设计变更前先更新对应 Draft 映射。

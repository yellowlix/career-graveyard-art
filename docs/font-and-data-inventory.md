# Career Graveyard 字体与数据清单

本文档用于整理项目当前的字体使用情况与内容数据结构，作为盘点与协作参考。

这不是设计规范，也不是新的实现要求；它只描述当前仓库中的实际状态。

## 1. 字体清单

| 项目 | 当前值 | 用途 | 来源 |
| --- | --- | --- | --- |
| 主字体栈 | `"Archivo", "Noto Serif SC", sans-serif` | 全站正文、标题、导航、按钮 | `src/app/globals.css` |
| 等宽字体栈 | `"IBM Plex Mono", "Courier New", monospace` | 祭奠页邮件正文预览 | `src/app/globals.css` |
| 字体加载方式 | `@import` Google Fonts | 加载 `Archivo` 与 `Noto Serif SC` | `src/app/globals.css` |
| `Archivo` 字重 | `100, 300, 500, 700` | 英文与拉丁字符主视觉 | Google Fonts |
| `Noto Serif SC` 字重 | `200, 400, 500` | 中文补位与衬线氛围 | Google Fonts |

## 2. 文字 Token

| Token | 当前值 | 说明 |
| --- | --- | --- |
| `--text-caption` | `0.75rem` | 辅助说明、metadata、eyebrow、表单标签、页脚 |
| `--text-label` | `0.875rem` | 导航、按钮、小标题、状态值 |
| `--text-body` | `1rem` | 正文、说明文、时间线、输入框 |
| `--text-body-strong` | `1.125rem` | 摘要、引语、About 导语 |
| `--text-title-sm` | `1.5rem` | 中标题预留档位 |
| `--text-title-md` | `2rem` | 统计数字等强视觉焦点 |
| `--font-weight-light` | `300` | 大标题、正文、长段落 |
| `--font-weight-regular` | `400` | 默认文本 |
| `--font-weight-medium` | `500` | Logo、卡片标题、按钮强调 |
| `--line-height-tight` | `1.2` | 标题与短文本 |
| `--line-height-tight-reading` | `1.6` | 移动端收窄短句 |
| `--line-height-body-snug` | `1.65` | 移动端页面副标题 |
| `--line-height-body` | `1.8` | 普通说明、表单、辅助段落 |
| `--line-height-body-compact` | `1.75` | 移动端正文与卡片正文 |
| `--line-height-body-dense` | `1.55` | 小型 teaser 文案 |
| `--line-height-body-relaxed` | `1.9` | 详情页正文、About 长段落 |
| `--line-height-body-loose` | `1.95` | 移动端引用 |
| `--line-height-display` | `1.2` | 首页与页面级大标题 |
| `--tracking-tight-zh` | `0.16em` | 中文 UI 收紧字距 |
| `--tracking-tight-zh-ui` | `0.12em` | 中文语言切换等紧凑场景 |
| `--tracking-tight-zh-display` | `0.18em` | 中文大标题与按钮 |
| `--tracking-input` | `0.08em` | 输入框与正文型小标题 |
| `--tracking-heading` | `0.1em` | 小节标题、首页卡片标题 |
| `--tracking-title` | `0.14em` | 404 等强调标题 |
| `--tracking-card` | `0.16em` | 默认卡片标题字距 |
| `--tracking-label` | `0.4em` | 导航、eyebrow、辅助标签 |
| `--tracking-display` | `0.5em` | Logo、页面大标题 |
| `--tracking-home-nav` | `0.28em` | 首页导航与移动端压缩场景 |
| `--nav-font-size` | `var(--text-caption)` | 导航与小标签基础字号映射 |
| `--eyebrow-font-size` | `var(--text-caption)` | Section eyebrow 映射 |
| `--button-font-size` | `var(--text-label)` | 按钮字号映射 |
| `--logo-size` | `clamp(1rem, 0.96rem + 0.14vw, 1.125rem)` | Logo 字号 |
| `--text-display-home` | `clamp(2.35rem, 6vw, 4.1rem)` | 首页 Hero 标题基准 |
| `--text-display-page` | `clamp(2.25rem, 5.8vw, 4.5rem)` | 二级页面标题基准 |
| `--hero-title-size` | `var(--text-display-home)` | 首页标题语义映射 |
| `--page-title-size` | `var(--text-display-page)` | 页面标题语义映射 |

## 3. 主要文本样式

| 场景 | 当前字号 | 当前字重 | 当前字距 / 行高 | 备注 |
| --- | --- | --- | --- | --- |
| Logo | `var(--logo-size)` | `500` | `var(--tracking-display)` | 首页例外为 `body-strong + tracking-home-nav` |
| 导航链接 / 返回 | `var(--text-label)` | 默认 | `var(--tracking-label)` | 移动端压缩为 `tracking-home-nav` |
| Hero 主标题 | `var(--hero-title-size)` | `300` | `var(--tracking-display) / 1.2` | 首页最大标题 |
| Hero 副标题 | `var(--text-caption)` | 默认 | `var(--tracking-label)` | 大写风格 |
| 页面标题 | `var(--page-title-size)` | `300` | `var(--tracking-display) / 1.2` | 归档/详情/About/404 |
| 卡片状态 | `var(--text-caption)` | 默认 | `tracking-label` 或 `tracking-home-nav` | 大写风格 |
| 卡片标题 | `var(--text-label)` 或 `var(--text-caption)` | `500` | `tracking-card / tracking-heading` | 职业卡片与小节标题体系 |
| 正文段落 | `var(--text-body)` | `300` | `line-height-body / relaxed / compact` | About / detail / timeline 主体文本 |
| 摘要 / 引语 | `var(--text-body-strong)` | `300` | `line-height-body-relaxed` | 详情摘要、About 导语、voice quote |
| 辅助说明 | `var(--text-body)` | `300` | `line-height-body` 或 `compact` | 表单说明、fallback、说明卡片 |
| 等宽正文 | `var(--text-caption)` | 默认 | `line-height-body` | 邮件正文预览 |

## 4. 响应式字号基线

| 断点 | Hero 标题 | 页面标题 | 页面边距 | 说明 |
| --- | --- | --- | --- | --- |
| `<= 767px` | `2.35rem` | `2.25rem` | `16px` | Mobile baseline |
| `768px - 1279px` | `clamp(2.9rem, 7vw, 4.2rem)` | `clamp(2.7rem, 6vw, 4.2rem)` | `24px` | Tablet baseline |
| `1280px - 1439px` | `clamp(3.2rem, 5vw, 4.35rem)` | `clamp(3rem, 5.5vw, 4.4rem)` | `32px` | Desktop baseline |
| `>= 1440px` | `clamp(3.35rem, 4.8vw, 4.7rem)` | `clamp(3.1rem, 5vw, 4.8rem)` | `32px` | Wide desktop |

## 5. 中文排版特殊处理

| 场景 | 中文模式字距 |
| --- | --- |
| 导航、eyebrow、标签、页脚等辅助文本 | `0.16em` |
| 语言切换按钮 | `0.12em` |
| Hero / 页面大标题 / 按钮 | `0.18em` |
| 输入框与正文型小标题 | `0.08em` |
| 卡片标题 / 小节标题 | `0.1em - 0.16em` |

## 6. 数据源总览

| 导出对象 | 位置 | 作用 |
| --- | --- | --- |
| `statusMeta` | `src/data.js` | 职业状态字典与排序 |
| `siteMeta` | `src/data.js` | 站点元信息、域名、联系邮箱、默认描述 |
| `siteCopy` | `src/data.js` | 全站页面文案与模块文案 |
| `careers` | `src/data.js` | 15 个职业条目的核心内容数据 |
| `homeQuote` | `src/data.js` | 首页引语 |
| `aboutData` | `src/data.js` | About 页面内容集合 |
| `initialMemorials` | `src/data.js` | 祭奠页静态示例内容 |

## 7. 内容数据统计

| 数据项 | 数量 |
| --- | --- |
| 职业条目总数 | `15` |
| 状态种类 | `5` |
| 祭奠静态示例 | `4` |
| About 方法论条目 | `4` |
| About 指标条目 | `4` |
| About 时间线条目 | `3` |
| About 统计卡片 | `3` |
| About contributors | `6` |

## 8. 状态字典

| 状态 Key | 中文 | 英文 | 排序 | 数量 |
| --- | --- | --- | --- | --- |
| `unworthy` | 廉价化 | Commoditized | `1` | `3` |
| `decaying` | 衰退中 | Decaying | `2` | `3` |
| `frozen` | 冻结 | Frozen | `3` | `2` |
| `endangered` | 濒危 | Endangered | `4` | `3` |
| `obsolete` | 过时 | Obsolete | `5` | `4` |

## 9. 站点元信息

| 字段 | 当前值 |
| --- | --- |
| 站点中文名 | `职业墓场` |
| 站点英文名 | `Career Graveyard` |
| `siteUrl` | `https://career-graveyard.com` |
| `contactEmail` | `mahrovandrei@gmail.com` |
| `themeColor` | `#ffffff` |
| `socialImage` | `https://career-graveyard.com/favicon.svg` |

## 10. `careers` 数据结构

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `slug` | `string` | 页面标识与查询参数 |
| `name` | `{ zh, en }` | 职业名称 |
| `status` | `string` | 对应 `statusMeta` 的 key |
| `declineYear` | `number` | 职业衰退年份 |
| `slabHeight` | `number` | 卡片竖线高度 |
| `teaser` | `{ zh, en }` | 卡片短文案 |
| `summary` | `{ zh, en }` | 详情页摘要 |
| `factors` | `Array` | 消逝因素列表 |
| `timeline` | `Array` | 时间线列表 |
| `voices` | `Array` | 悼词 / 引语列表 |

## 11. 职业条目清单

| # | `slug` | 中文名 | 英文名 | `status` | `declineYear` |
| --- | --- | --- | --- | --- | --- |
| 1 | `graphic-designer` | 平面设计师 | Graphic Designer | `unworthy` | `2023` |
| 2 | `junior-translator` | 初级翻译 | Junior Translator | `decaying` | `2024` |
| 3 | `cram-school-teacher` | 补习班老师 | Cram School Teacher | `frozen` | `2023` |
| 4 | `content-editor` | 内容编辑 | Content Editor | `endangered` | `2024` |
| 5 | `bank-teller` | 银行柜员 | Bank Teller | `obsolete` | `2025` |
| 6 | `traditional-reporter` | 传统记者 | Traditional Reporter | `obsolete` | `2024` |
| 7 | `architectural-drafter` | 建筑制图员 | Architectural Drafter | `decaying` | `2024` |
| 8 | `community-group-buyer` | 社区团购团长 | Community Group Buyer | `unworthy` | `2023` |
| 9 | `junior-programmer` | 初级程序员 | Junior Programmer | `endangered` | `2025` |
| 10 | `ecommerce-support` | 电商客服 | Ecommerce Support | `obsolete` | `2024` |
| 11 | `newspaper-editor` | 报纸编辑 | Newspaper Editor | `obsolete` | `2023` |
| 12 | `offline-tour-guide` | 线下导游 | Offline Tour Guide | `frozen` | `2020` |
| 13 | `wedding-photographer` | 婚庆摄影 | Wedding Photographer | `unworthy` | `2024` |
| 14 | `delivery-rider` | 外卖骑手 | Delivery Rider | `decaying` | `2024` |
| 15 | `data-annotator` | 数据标注 | Data Annotator | `endangered` | `2025` |

## 12. 页面文案分层

| 分组 | 说明 |
| --- | --- |
| `siteCopy.navigation` | 顶部导航与返回文案 |
| `siteCopy.footer` | 页脚文案 |
| `siteCopy.pageDescriptions` | 页面 SEO 描述 |
| `siteCopy.home` | 首页文案 |
| `siteCopy.archive` | 归档页文案 |
| `siteCopy.detail` | 详情页模块文案 |
| `siteCopy.memorial` | 祭奠页表单、fallback、提示文案 |
| `siteCopy.memorialEmail` | 邮件主题与正文模板 |
| `siteCopy.contactEmail` | 新增职业投稿相关文案 |
| `siteCopy.notFound` | 404 / 缺失内容文案 |
| `siteCopy.about` | About 页面模块标题 |
| `siteCopy.aboutInfo` | Legal / Policy / Contact 信息卡片 |

## 13. About 页面数据

| 数据块 | 数量 | 说明 |
| --- | --- | --- |
| `missionTitle` / `missionBody` | `1` 组 | 项目使命 |
| `methodology` | `4` | 方法论卡片 |
| `standards` | `4` | 评估指标 |
| `timeline` | `3` | 项目时间线 |
| `stats` | `3` | 统计带 |
| `contributors` | `6` | 贡献者列表 |

## 14. 祭奠页静态示例

| # | `careerSlug` | 署名 | 日期 |
| --- | --- | --- | --- |
| 1 | `graphic-designer` | 匿名悼词者 / 前资深视觉设计 | `2024.03.20` |
| 2 | `cram-school-teacher` | 某数学主讲老师 | `2024.03.18` |
| 3 | `content-editor` | 匿名内容运营 | `2024.03.15` |
| 4 | `junior-translator` | 翻译从业者 | `2024.03.12` |

## 15. 备注

| 项目 | 当前情况 |
| --- | --- |
| 双语组织方式 | 通过 `l(zh, en)` 统一生成中英文字段 |
| 单值双语复用 | 通过 `same(value)` 生成中英相同值 |
| 文档定位 | 盘点文档，不替代设计规范、内容规范或 CMS 结构文档 |

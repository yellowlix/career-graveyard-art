# Career Graveyard Typography Tokens

本文档记录当前项目的 typography token 体系，用于工程协作与评审对照。

这不是 Figma 设计规范，也不是页面文案规范；它只描述代码中允许使用的字体档位与推荐用途。

## 1. 使用原则

| 规则 | 说明 |
| --- | --- |
| 统一来源 | 业务样式中的字号、字重、行高、字距应优先来自 `src/styles.css` 中的 typography tokens。 |
| 固定阶梯 | 正文与 UI 文本统一收敛到 `12 / 14 / 16 / 18 / 24 / 32` 六档。 |
| Display 例外 | 首页 Hero 和页面主标题允许使用集中管理的 `display` token，并继续保持响应式 `clamp()`。 |
| 禁止新增裸值 | 新组件默认不直接写裸 `font-size / font-weight / line-height / letter-spacing`；如确需例外，需在样式旁简短说明原因。 |
| 语义命名 | 组件样式优先引用 `caption / label / body / title / display` 这类语义 token。 |

## 2. 字号阶梯

| Token | 值 | 对应 px | 推荐用途 |
| --- | --- | --- | --- |
| `--text-caption` | `0.75rem` | `12px` | metadata、辅助说明、eyebrow、表单标签、页脚 |
| `--text-label` | `0.875rem` | `14px` | 导航、按钮、卡片标题、小型状态文案 |
| `--text-body` | `1rem` | `16px` | 正文、时间线、说明文案、输入框 |
| `--text-body-strong` | `1.125rem` | `18px` | 强调正文、长引用、摘要 |
| `--text-title-sm` | `1.5rem` | `24px` | 中标题、小节标题 |
| `--text-title-md` | `2rem` | `32px` | 数字型标题、较强视觉焦点 |

## 3. Display Token

| Token | 默认值 | 用途 |
| --- | --- | --- |
| `--text-display-home` | `clamp(2.35rem, 6vw, 4.1rem)` | 首页 Hero 主标题 |
| `--text-display-page` | `clamp(2.25rem, 5.8vw, 4.5rem)` | 归档、详情、About、404 等页面主标题 |

### 响应式映射

| 断点 | `--text-display-home` | `--text-display-page` |
| --- | --- | --- |
| `<= 767px` | `2.35rem` | `2.25rem` |
| `768px - 1279px` | `clamp(2.9rem, 7vw, 4.2rem)` | `clamp(2.7rem, 6vw, 4.2rem)` |
| `1280px - 1439px` | `clamp(3.2rem, 5vw, 4.35rem)` | `clamp(3rem, 5.5vw, 4.4rem)` |
| `>= 1440px` | `clamp(3.35rem, 4.8vw, 4.7rem)` | `clamp(3.1rem, 5vw, 4.8rem)` |

## 4. 字重 Token

| Token | 值 | 推荐用途 |
| --- | --- | --- |
| `--font-weight-light` | `300` | 大标题、正文、长段落 |
| `--font-weight-regular` | `400` | 默认文本、表单输入 |
| `--font-weight-medium` | `500` | Logo、卡片标题、按钮强调、统计标签 |

## 5. 行高 Token

| Token | 值 | 推荐用途 |
| --- | --- | --- |
| `--line-height-tight` | `1.2` | 标题与短文本 |
| `--line-height-tight-reading` | `1.6` | 移动端短句、收窄后的问题句 |
| `--line-height-body-snug` | `1.65` | 移动端页面副标题 |
| `--line-height-body` | `1.8` | 普通说明、表单、辅助段落 |
| `--line-height-body-compact` | `1.75` | 移动端正文、详情节录、信息卡片 |
| `--line-height-body-dense` | `1.55` | 空间受限的小型 teaser 文案 |
| `--line-height-body-relaxed` | `1.9` | 详情页正文、时间线、About 长段落 |
| `--line-height-body-loose` | `1.95` | 移动端引用与大段引文 |
| `--line-height-display` | `1.2` | 首页与页面级大标题 |

## 6. 字距 Token

| Token | 值 | 推荐用途 |
| --- | --- | --- |
| `--tracking-tight-zh` | `0.16em` | 中文 UI 文本的收紧字距 |
| `--tracking-tight-zh-ui` | `0.12em` | 中文语言切换等更紧凑的 UI 文本 |
| `--tracking-tight-zh-display` | `0.18em` | 中文大标题与按钮 |
| `--tracking-input` | `0.08em` | 输入框与正文型小标题 |
| `--tracking-heading` | `0.1em` | 卡片标题、小节标题 |
| `--tracking-title` | `0.14em` | 单页强提示标题，如 404 标题 |
| `--tracking-card` | `0.16em` | 默认卡片标题字距 |
| `--tracking-label` | `0.4em` | 导航、eyebrow、metadata、按钮标签 |
| `--tracking-display` | `0.5em` | Logo、页面大标题 |
| `--tracking-home-nav` | `0.28em` | 首页导航与部分移动端压缩场景 |

## 7. 当前组件映射

| 场景 | 当前 token |
| --- | --- |
| Skip link | `--text-caption` + `--tracking-label` |
| 导航链接 / 返回 | `--text-label` |
| Locale switch | `--text-caption` |
| Eyebrow / 页脚 / Toggle / Text button | `--text-caption` |
| Hero 副标题 | `--text-caption` |
| Hero 问句 / 页面副标题 / 详情状态 | `--text-label` |
| 卡片状态 / teaser / metadata | `--text-caption` |
| 卡片标题 / Method / Factor 标题 | `--text-label` + `--tracking-heading / --tracking-card` |
| Info 卡片标题 / 输入框类小标题 | `--text-body` + `--tracking-input` |
| 正文段落 / About / Timeline / Memorial 说明 | `--text-body` |
| Detail summary / Voice quote / About intro | `--text-body-strong` |
| Stats 数字 | `--text-title-md` |
| 移动端正文压缩 | `--line-height-body-compact / snug / dense / loose` |
| 首页 Hero / 页面主标题 | `--text-display-home` / `--text-display-page` |

## 8. 示例样张

| Token | 示例文本 | 用途说明 |
| --- | --- | --- |
| `--text-caption` | `Archive of Disappearing Work` | 只用于辅助说明、标签、metadata |
| `--text-label` | `View All Slabs` | 用于导航、按钮、小型标题 |
| `--text-body` | `Career Graveyard records professions being eroded, frozen, replaced, or repriced.` | 默认正文档 |
| `--text-body-strong` | `Human dignity in color and composition is being dismantled by pixel-level algorithms.` | 强调正文或摘要 |
| `--text-title-sm` | `Methodology` | 中标题 |
| `--text-title-md` | `15+` | 数字焦点 |
| `--text-display-home` | `Career Graveyard` | 首页主标题 |
| `--text-display-page` | `Archive` | 页面级主标题 |

## 9. 实施备注

| 项目 | 当前决定 |
| --- | --- |
| 命名方式 | 语义命名 |
| 阶梯策略 | 固定阶梯 + 集中 display token |
| 节奏约束 | 字重、行高、字距也优先走 token，不只统一字号 |
| 约束方式 | 先文档与代码收敛，不引入额外 lint |
| 落点 | 仅保存在 `docs/`，不新增站点内部预览页 |

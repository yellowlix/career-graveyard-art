# Career Graveyard Design System

## Product context
- Product name: 职业墓场 / Career Cemetery
- Core idea: 用“数字墓园”的视觉语言，记录那些在算法、平台与自动化冲击下逐渐失去尊严、议价权或存在空间的职业。
- Primary pages:
  - 首页：用墓碑竖条呈现代表性职业
  - 归档：按状态浏览全部职业
  - 详情：查看单一职业的衰落轨迹、因子与证词
  - 祭奠：提交和阅读悼词
  - 关于：解释项目方法论与统计

## Visual direction
- Tone: 冷静、肃穆、克制、近乎展览式的留白
- Palette:
  - Background: `#ffffff`
  - Primary text: `#000000`
  - Secondary text: `#7b7b7b`
  - Soft divider: `#ececec`
  - Hover slab tone: `#4f4f4f`
- Layout:
  - 超大留白
  - 大量 1px 竖线/横线作为视觉锚点
  - 内容宽度限制在 `1440px` 内

## Typography
- Primary font: `Archivo`
- Secondary / quote font: `Noto Serif SC`
- Display style:
  - 标题使用极轻字重
  - Logo 与主标题使用超宽字距
  - 大部分辅助信息使用 uppercase + tracking

## Motion
- Only subtle reveal-on-load motion
- Hover effects should be vertical and restrained:
  - 墓碑竖条升高
  - 摘要淡入
  - 卡片背景轻微浮现

## Reusable UI patterns
- `NavigationBar`: 固定顶部导航，含 Logo、返回、主菜单
- `PageFooter`: 极简版权与三枚链接
- `MonolithCard`: 职业墓碑卡，核心由标题、状态、竖条、隐现引文组成
- `SectionRule`: 1px 分割线配短竖线 marker

## Data conventions
- Career object:
  - `slug`
  - `name`
  - `status`
  - `declineYear`
  - `slabHeight`
  - `teaser`
  - `summary`
  - `factors`
  - `timeline`
  - `voices`
- Memorial object:
  - `career`
  - `signature`
  - `date`
  - `text`

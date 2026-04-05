# 职业墓场（未来数据库版）数据模型草案

## 重要说明

本文档是未来数据库版的演进草案，不是当前 `V1` 的实现依据。

当前 `V1` 已明确采用“静态档案站 + 邮箱投稿”的实现方式，因此：

- 当前 `V1` 不接入数据库
- 当前 `V1` 不实现管理员审查
- 当前 `V1` 不实现后台管理页
- 当前 `V1` 不需要 migration、RLS 或线上数据表

只有在未来产品决定升级为数据库版、在线审查版或后台管理版时，才需要基于本文档继续细化和落地。

## 1. 文档目标

本文档用于给未来版本预留一套可演进的数据模型方向，覆盖：

- 职业档案
- 留言
- 管理员权限
- 迁移与种子导入
- 权限策略

本文档定位为“后续演进参考”：

- 产品经理可以用它评估未来版本边界
- 工程实现者可以在未来升级时据此设计 schema 和迁移

## 2. 建模原则

### 2.1 未来数据库版的数据来源

如果未来升级为数据库版，公开站点和管理页运行时都可以切换为远端数据源。

当前 `src/data.js` 在那时可转为：

- 初始种子来源
- 站点文案配置来源
- 本地开发样例来源

### 2.2 职业档案与留言分离建模

- `CareerProfile` 是正式档案
- `Memorial` 是用户输入

两者生命周期、权限边界和业务职责不同，因此未来版本应拆表。

### 2.3 从属信息拆表

时间线、证言、因素不建议塞进一个大 JSON，而是拆成从属表，原因是：

- 后续管理页更容易编辑
- 顺序控制更稳定
- 数据结构更清晰

### 2.4 审查状态显式建模

如果未来要支持在线留言，则留言应有显式状态字段，不依赖前端逻辑推断。

### 2.5 管理员通过 Auth + 角色表控制

如果未来有后台，管理员身份不应靠前端硬编码邮箱判断，而应通过：

- `auth.users`
- `admin_users`

共同定义。

## 3. 领域实体到表的映射

| 领域实体 | 数据表 |
| --- | --- |
| `CareerProfile` | `career_profiles` |
| `TimelineEvent` | `career_timeline_events` |
| `Voice` | `career_voices` |
| `Factor` | `career_factors` |
| `Memorial` | `memorials` |
| `AdminUser` | `admin_users` |

## 4. 表级说明

### 4.1 `career_profiles`

业务含义：
- 系统正式收录的职业档案

数据职责：
- 为首页、Archive、详情页提供主数据
- 作为时间线、证言、因素和留言的父对象

实现建议：
- 使用 UUID 主键
- 保留稳定 `slug`
- 把 `aliases` 存成 `jsonb` 数组
- 使用 `sort_order` 支持前台稳定排序

### 4.2 `career_timeline_events`

业务含义：
- 职业档案中的阶段性时间线节点

数据职责：
- 为详情页时间线区块提供有序数据

实现建议：
- 一条记录只属于一个职业
- 使用 `sort_order` 控制顺序

### 4.3 `career_voices`

业务含义：
- 职业详情页中的策展化从业者证言

数据职责：
- 与社区留言区分，作为正式档案内容的一部分

实现建议：
- 使用 `date_label` 保存显示日期，避免过早约束为严格时间类型

### 4.4 `career_factors`

业务含义：
- 职业衰退因素

数据职责：
- 为详情页因素卡片提供结构化数据

实现建议：
- 第一版数据库模型里仍按从属表维护
- 如未来出现跨职业复用需求，再升级为独立概念

### 4.5 `memorials`

业务含义：
- 用户提交的祭奠留言

数据职责：
- 承接未来版本中的在线用户输入
- 通过状态字段控制是否公开
- 为未来管理页提供审查对象

实现建议：
- 冗余保存 `career_slug` 和 `career_name`
- 即使职业名后续变化，留言也保留提交当时的上下文
- 默认状态可设为 `pending`

### 4.6 `admin_users`

业务含义：
- 管理员角色映射

数据职责：
- 决定哪些登录用户可以进入管理页并执行写操作

实现建议：
- 第一版数据库模型按多管理员结构设计
- `role` 虽然暂时只用 `admin`，但为未来扩展保留字段

## 5. 字段级建议

### 5.1 `career_profiles`

建议字段：

- `id uuid primary key`
- `slug text not null unique`
- `display_name text not null`
- `status text not null`
- `decline_year integer not null`
- `teaser text not null`
- `summary text not null`
- `slab_height integer not null`
- `aliases jsonb not null default '[]'::jsonb`
- `sort_order integer not null default 0`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

### 5.2 `career_timeline_events`

- `id uuid primary key`
- `career_profile_id uuid not null references career_profiles(id) on delete cascade`
- `year text not null`
- `title text not null`
- `description text not null`
- `sort_order integer not null default 0`

### 5.3 `career_voices`

- `id uuid primary key`
- `career_profile_id uuid not null references career_profiles(id) on delete cascade`
- `author text not null`
- `date_label text not null`
- `text text not null`
- `sort_order integer not null default 0`

### 5.4 `career_factors`

- `id uuid primary key`
- `career_profile_id uuid not null references career_profiles(id) on delete cascade`
- `title text not null`
- `description text not null`
- `sort_order integer not null default 0`

### 5.5 `memorials`

- `id uuid primary key`
- `career_profile_id uuid not null references career_profiles(id) on delete restrict`
- `career_slug text not null`
- `career_name text not null`
- `signature text not null`
- `text text not null`
- `status text not null default 'pending'`
- `created_at timestamptz not null default now()`
- `reviewed_at timestamptz null`
- `reviewed_by uuid null references auth.users(id)`
- `submitter_fingerprint text null`

### 5.6 `admin_users`

- `user_id uuid primary key references auth.users(id) on delete cascade`
- `role text not null default 'admin'`
- `created_at timestamptz not null default now()`

## 6. 约束与枚举

### 6.1 职业状态

`career_profiles.status` 可限制为：

- `unworthy`
- `decaying`
- `frozen`
- `endangered`
- `obsolete`

### 6.2 留言状态

如果未来启用在线留言，`memorials.status` 可限制为：

- `pending`
- `approved`
- `rejected`

### 6.3 结构性约束

- `career_profiles.slug` 唯一
- 留言必须关联已收录职业
- `aliases` 使用 `jsonb` 数组
- 所有从属表使用 `sort_order` 控制稳定展示顺序

## 7. SQL 草案

以下 SQL 草案仅用于未来数据库版设计参考，不应被误认为当前 `V1` 必须实现的 migration。

```sql
create extension if not exists pgcrypto;

create table if not exists career_profiles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name text not null,
  status text not null,
  decline_year integer not null,
  teaser text not null,
  summary text not null,
  slab_height integer not null,
  aliases jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint career_profiles_status_check
    check (status in ('unworthy', 'decaying', 'frozen', 'endangered', 'obsolete'))
);

create table if not exists career_timeline_events (
  id uuid primary key default gen_random_uuid(),
  career_profile_id uuid not null references career_profiles(id) on delete cascade,
  year text not null,
  title text not null,
  description text not null,
  sort_order integer not null default 0
);

create table if not exists career_voices (
  id uuid primary key default gen_random_uuid(),
  career_profile_id uuid not null references career_profiles(id) on delete cascade,
  author text not null,
  date_label text not null,
  text text not null,
  sort_order integer not null default 0
);

create table if not exists career_factors (
  id uuid primary key default gen_random_uuid(),
  career_profile_id uuid not null references career_profiles(id) on delete cascade,
  title text not null,
  description text not null,
  sort_order integer not null default 0
);

create table if not exists memorials (
  id uuid primary key default gen_random_uuid(),
  career_profile_id uuid not null references career_profiles(id) on delete restrict,
  career_slug text not null,
  career_name text not null,
  signature text not null,
  text text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz null,
  reviewed_by uuid null references auth.users(id),
  submitter_fingerprint text null,
  constraint memorials_status_check
    check (status in ('pending', 'approved', 'rejected'))
);

create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);
```

## 8. 未来权限模型参考

如果未来升级为数据库版，可考虑：

- 公开读取职业档案与从属子表
- 在线提交留言
- 管理员查看全部留言并更新状态
- 使用角色表控制后台写权限

当前 `V1` 不需要这些能力。

## 9. 未来迁移策略参考

### 9.1 种子来源

未来如果需要迁移到数据库，可将当前 `src/data.js` 作为初始种子来源，导入：

- 职业主数据
- 时间线
- 证言
- 因素
- 静态示例悼词（如需要）

### 9.2 迁移后角色变化

如果未来迁移完成：

- 前台页面可以改为从远端读取职业档案
- `src/data.js` 可保留为种子来源和文案配置来源

## 10. 前端接口对齐参考

如果未来进入数据库版，可以考虑：

- 首页 / Archive / 详情页读取职业档案表及从属表
- `Memorial` 页提交在线留言
- 管理页读取待审留言并维护职业档案

但这些都不是当前 `V1` 的范围。

## 11. 非目标

即使未来升级为数据库版，以下内容也不必默认首版纳入：

- 候选职业
- 站内新职业提名
- 留言举报
- 复杂 RBAC
- 证据来源表
- 多语言表设计

## 12. 使用方式说明

对当前仓库来说，本文档的正确使用方式是：

- 当前 `V1` 实现时不要按照本文档去建库
- 当前 `V1` 以主文档为准
- 只有未来明确进入数据库版路线时，才把本文档作为起点继续细化

---

本草案仅服务于未来版本的数据库化演进，不构成当前邮箱投稿版 `V1` 的实现范围。

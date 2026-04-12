# GitHub Branch And Commit Policy

本文档定义 `career-graveyard-art` 当前仓库的分支语义、提交约定与发布流程，目标是让日常协作、GitHub PR 和线上部署保持一致。

## 1. 当前分支语义

| 分支 | 用途 |
| --- | --- |
| `main` | 生产分支。线上正式站点以此为准；当前发布流程是在 `main` 更新后触发部署。 |
| `next` | 日常集成分支。功能开发、文档更新、样式调整默认先合并到这里。 |
| `feature/<short-name>` | 常规功能分支，从 `next` 拉出，完成后 PR 到 `next`。 |
| `fix/<short-name>` | 非紧急修复分支，从 `next` 拉出，完成后 PR 到 `next`。 |
| `docs/<short-name>` | 文档分支，从 `next` 拉出，完成后 PR 到 `next`。 |
| `hotfix/<short-name>` | 线上紧急修复分支，从 `main` 拉出，完成后 PR 到 `main`，再把同一修复回灌到 `next`。 |
| `codex/<short-name>` / `cursor/<short-name>` | 允许 AI 工具生成的工作分支前缀。只要来源正确、PR 目标正确，可以继续使用。 |

## 2. 默认协作规则

### 2.1 日常开发

默认流程：

1. `git fetch origin`
2. `git checkout next && git pull origin next`
3. 从 `next` 拉出工作分支
4. 本地开发、自测
5. 推送工作分支
6. 开 PR，**base 一律选 `next`**

适用范围：

- 功能开发
- UI 调整
- 文案更新
- 文档修改
- 测试与 CI 优化

### 2.2 发布上线

当前仓库采用两段式发布：

1. 日常改动先进入 `next`
2. 需要上线时，开 PR 将 `next` 合并到 `main`
3. `main` 合并完成后，按当前仓库配置执行部署

这和当前仓库配置保持一致：

- `ci.yml` 会在 `main` 和 `next` 上跑 Build + E2E
- `deploy.yml` 只在 `main` 的 `push` 时触发

### 2.3 紧急修复

如果是线上紧急问题：

1. 从 `main` 拉 `hotfix/<short-name>`
2. 修复后 PR 到 `main`
3. 合并后，把同一修复再合回 `next`

可选方式：

- 直接把 `main` 的 hotfix commit merge/cherry-pick 到 `next`
- 或者重新从 `next` 补同一修复，但要在 PR 描述里说明来源

## 3. PR 目标分支规则

### 3.1 什么时候 PR 到 `next`

默认都到 `next`：

- `feature/*`
- `fix/*`
- `docs/*`
- `codex/*`
- `cursor/*`

一句话原则：**只要不是线上紧急修复，就先进入 `next`。**

### 3.2 什么时候 PR 到 `main`

只有两种情况：

- 发布 PR：`next -> main`
- 紧急修复 PR：`hotfix/* -> main`

除这两种外，不建议直接把普通开发分支 PR 到 `main`。

## 4. 提交信息规则

### 4.1 推荐格式

推荐采用简洁的前缀式提交：

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `chore: ...`
- `refactor: ...`
- `test: ...`
- `ci: ...`

可选带 scope：

- `feat(archive): ...`
- `fix(memorial): ...`
- `docs(deploy): ...`

### 4.2 语言

提交标题允许中文或英文，但要满足：

- 一眼看出改了什么
- 尽量只表达一个主题
- 不用空泛标题，如 `update`、`misc fix`、`调整一下`

### 4.3 示例

可参考：

- `feat(archive): add search suggestions for exhibition list`
- `fix(memorial): keep draft content when switching modes`
- `docs: sync domain references`
- `ci: add deploy workflow for production server`

## 5. 提交粒度规则

推荐遵守：

- 一个 commit 尽量只解决一个问题
- 文档改动和功能改动尽量不要混在同一个 commit
- 大改动可以拆成多个 commit，但 PR 应保持同一主题

不推荐：

- 把无关文件顺手一起提交
- 把格式化噪音、截图更新、功能修改全部混在一个 commit 且没有说明

如果快照需要更新，建议在提交说明中明确写出：

- 是否因为 UI 有意变更
- 是否只是基线同步

## 6. 合并策略

当前仓库可以按下面方式使用：

- 功能分支 -> `next`：优先 `Squash merge`
- `next` -> `main`：优先保留发布 PR 的 `Merge commit`
- `hotfix` -> `main`：按修复规模选择 `Squash` 或 `Merge`

这样做的目的：

- 日常功能 PR 保持历史干净
- 发布时保留一条清晰的 `next -> main` 发布记录

## 7. 合并前检查

PR 合并前至少确认：

- `Build` 通过
- `E2E Tests` 通过
- 改动目标分支正确
- 没有把无关文件带进 PR

如果 PR 目标是 `main`，还要额外确认：

- 这是发布 PR 或 hotfix PR
- 合并后允许触发生产部署

## 8. 与当前仓库现状对齐的额外说明

- 当前生产域名是 `career-graveyard.com`
- 服务器部署目录是 `/var/www/career-graveyard/`
- `main` 合并后会自动部署到生产环境，因此对 `main` 的变更要更保守
- 文档更新虽然风险低，也应默认先走 `next`
- AI 工具创建的分支名可以保留，但 PR 目标规则不能变

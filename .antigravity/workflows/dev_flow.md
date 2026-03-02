---
description: 开发主干流程 — 串联所有工作流（功能开发 + Bug 修复双轨道）
---

## 两条开发轨道

### 🚀 轨道 A — 功能开发

```
/analyze  →  /design  →  /implement  →  /review  →  /sync_doc  →  /git_commit
```

### 🐛 轨道 B — Bug 修复

```
/debug  →  /design fix  →  /implement fix  →  /review  →  /sync_doc  →  /git_commit
```

---

## 完整流程图

```
新任务
  │
  ├─── 是新功能 / 重构？
  │         │
  │         ▼
  │    ┌──────────────────────────────────┐
  │    │ 1. /analyze                      │
  │    │    需求完整性评分 + 追问循环      │  ← 评分<7分: 追问
  │    │    评分≥7分: 输出需求总结        │
  │    └──────────────┬───────────────────┘
  │                   │
  └─── 是 Bug / 报错？
            │
            ▼
       ┌──────────────────────────────────┐
       │ 1b. /debug                       │
       │     根因分析 + 概率标注          │  ← 只分析，不给方案
       │     输出：失败原因清单           │
       └──────────────┬───────────────────┘
                      │
            ┌─────────┘ ← 两条轨道在此汇合
            │
            ▼
       ┌──────────────────────────────────┐
       │ 2. /design                       │
       │    ≥3 个方案对比                 │  ← 功能模式 or 修复模式
       │    推荐最稳妥方案                │  ← 不写代码
       └──────────────┬───────────────────┘
                      │ 方案确认
                      ▼
       ┌──────────────────────────────────┐
       │ 3. /implement                    │
       │    声明文件计划 → 实现代码       │  ← 功能模式 or 修复模式
       │    每处改动标注 [IMPL]/[FIX]     │  ← 不确定项标注 [UNCERTAIN]
       │    发现建议 → 冻结等待确认      │
       └──────────────┬───────────────────┘
                      │ 代码完成 + 验证通过
                      ▼
       ┌──────────────────────────────────┐
       │ 4. /sync_doc                     │
       │    L1/L2/L3 文档同步             │
       │    API 契约检查                  │
       └──────────────┬───────────────────┘
                      │ 文档同步完成
                      ▼
       ┌──────────────────────────────────┐
       │ 5. /git_commit                   │
       │    按功能拆分 commit             │
       │    更新 docs/evolution.md        │
       └──────────────┬───────────────────┘
                      │
                      ▼
                   ✅ 完成
```

---

## 所有工作流快速索引

| 命令 | 文件 | 触发时机 | 输出 |
|------|------|---------|------|
| `/analyze`    | `analyze.md`    | 接到新功能需求时 | 需求总结 + 成功标准 |
| `/debug`      | `debug.md`      | 遇到 Bug / 报错时 | 根因清单 + 概率标注 |
| `/design`     | `design.md`     | analyze 或 debug 完成后 | ≥3方案对比 + 推荐 |
| `/implement`  | `implement.md`  | design 方案确认后 | 精准实现 + 验证步骤 |
| `/review`     | `review.md`     | implement 完成后 | 品味自检 + 块味道 + GEB 合规 |
| `/sync_doc`   | `sync_doc.md`   | review 通过后 | GEB FORBIDDEN + 文档同步 |
| `/git_commit` | `git_commit.md` | sync_doc 完成后 | 结构化 commits + evolution |
| `/bootstrap`  | `bootstrap.md`  | 新项目/新模块初始化 | GEB 文档结构 |
| `/initialize` | `initialize.md` | 项目首次环境初始化 | Next.js + FastAPI 环境 |
| `/dev_flow`   | `dev_flow.md`   | 忘了走哪步时查阅 | 本文件 |

---

## 每个阶段的严格职责边界

```yaml
analyze.md:
  读:  知识库、代码库、用户需求
  写:  ❌ 不写任何文件（只读）
  禁止: 给方案、写代码

debug.md:
  读:  报错信息、代码片段、git log
  写:  ❌ 不写任何文件（只读）
  禁止: 给修复方案、写代码

design.md:
  读:  analyze 或 debug 的输出
  写:  ❌ 不写任何文件（只读）
  禁止: 写具体代码实现

implement.md:
  读:  design 输出的推荐方案
  写:  frontend/src/**、backend/**（按计划）
  产出: 可运行的代码 + 验证步骤
  禁止: 超出 design 计划范围的改动、未声明的新依赖

review.md:
  读:  implement 完成的代码
  写:  可能补充 L3 头部 / 拆分函数
  禁止: 超出品味修复范围的重构

sync_doc.md:
  读:  review 完成的代码文件
  写:  L1/L2/L3 CLAUDE.md、docs/api_contract.md
  禁止: 在 FATAL 级拦截未解决时继续提交

git_commit.md:
  读:  git status、git diff
  写:  docs/evolution.md
  产出: 结构化 commits
```

---

## 快捷使用卡

```bash
# 开发新功能
/analyze [需求描述]
/design
/implement
/review
/sync_doc
/git_commit

# 修复 Bug
/debug [报错信息 + 现象 + 代码片段]
/design fix
/implement fix
/review
/sync_doc
/git_commit

# 项目冷启动
/initialize
/bootstrap
```

---

## 工作流之间的数据传递规则

```
analyze → design:
  传递: 需求类型、关键目标、成功标准、涉及模块路径

debug → design:
  传递: 高概率根因（🔴）、涉及文件路径、信息缺口

design → 实现:
  传递: 推荐方案描述、改动范围、成立前提

实现 → sync_doc:
  传递: 实际修改的文件路径（git diff 体现）

sync_doc → git_commit:
  传递: 已更新的文档（evolution.md 内容）
```

> 💡 **技巧**：每步完成后，把输出的总结段直接粘贴给下一步作为输入，
> 确保上下文不丢失，避免重复扫描代码库。

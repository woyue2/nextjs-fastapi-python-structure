# anti-huihuan-kaifa · L1 Root

> **[PROTOCOL]**: 本文档为 GEB 分形文档 L1 层（项目宪法），任何目录结构或技术栈变更必须同步更新本文件。

---

## 技术栈

| 层 | 技术 |
|---|---|
| Frontend | Next.js (App Router) · TypeScript · TailwindCSS v4 |
| Backend  | FastAPI · Python 3.11+ · Uvicorn · Pydantic v2 |
| UI Lib   | framer-motion · lucide-react · clsx · react-icons |

---

## 目录结构

```
anti-huihuan-kaifa/
├── frontend/              — Next.js 前端（App Router · src/app/ + lib/ + hooks/）
├── backend/               — FastAPI 后端（app/api/v1/ · app/services/ · app/schemas/）
├── docs/                  — 项目文档
├── .antigravity/          — 项目配置与 AI 工作流
│   ├── config.yaml            身份锚定 + GEB 协议全局配置
│   └── workflows/             工作流脚本（bootstrap / sync_doc 等）
├── CLAUDE.md              — L1 根文档（本文件）
├── 前后端目录规范.md       — 前后端目录规范检查参照
└── .gitignore
```

---

## 开发约定

- **前端路由**：App Router，入口 `frontend/src/app/`
- **API 前缀**：所有接口均以 `/api/v1/` 开头
- **前后端通信**：开发期前端 `localhost:3000` → 后端 `localhost:8000`
- **环境变量**：`.env.local`（前端）、`.env`（后端），均加入 `.gitignore`
- **命名规范**：
  - 前端组件：PascalCase（`UserCard.tsx`）
  - 后端模块：snake_case（`user_router.py`）
  - API 路径：kebab-case（`/api/user-profile`）
- **代码质量红线**（摘自 config.yaml）：
  - 单文件不超过 800 行
  - 单目录不超过 8 个文件
  - 缩进不超过 3 层
  - 单函数不超过 20 行
- **文档协议**：代码变更后必须运行 `/sync_doc` 工作流

---

## 质量红线检查清单

- [ ] 新增模块 → 创建对应 `{module}/CLAUDE.md`（L2）
- [ ] 新增文件 → 写入 L3 头部注释（INPUT/OUTPUT/POS/DEPS）
- [ ] 删除文件 → 从 L2 成员清单中移除
- [ ] 重构目录 → 更新本 L1 目录结构图

---

_Last updated: 2026-03-03 (目录重构：backend 分层化 + frontend lib/hooks 提取 + API v1 前缀)_

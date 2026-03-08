# nextjs-fastapi-python-structure · L1 Root

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
nextjs-fastapi-python-structure/          ← 项目根
├── frontend/                             — Next.js 前端（App Router）
│   └── src/
│       ├── app/
│       │   ├── layout.tsx                — 全局布局
│       │   ├── page.tsx                  — 首页导航（/）
│       │   ├── feature/                  — 主功能路由（/feature）⬅ 替换为你的业务路由
│       │   │   ├── page.tsx
│       │   │   ├── error.tsx
│       │   │   ├── loading.tsx
│       │   │   └── components/           — 路由私有组件
│       │   │       └── ItemCard.tsx      — 示例组件
│       │   └── admin/                    — 管理后台路由（/admin）
│       │       └── page.tsx
│       ├── hooks/
│       │   └── useAppStore.ts            — 全局状态 Hook（示例）
│       └── lib/
│           ├── types.ts                  — 全局类型定义
│           ├── constants.ts              — 全局常量
│           ├── api.ts                    — API 通信层
│           └── storage.ts               — SSR 安全 localStorage 封装
├── backend/                              — FastAPI 后端
│   └── app/
│       ├── main.py                       — 服务入口（挂载路由 + CORS）
│       ├── core/config.py                — 全局配置常量
│       ├── api/v1/
│       │   ├── router.py                 — /api/v1 路由汇总
│       │   └── endpoints/
│       │       ├── health.py             — GET /health
│       │       ├── hello.py              — GET /hello（演示）
│       │       └── items.py              — GET/POST /items（示例资源）
│       ├── schemas/item.py               — Pydantic 请求/响应模型
│       ├── services/item_service.py      — 业务逻辑层（内存存储示例）
│       ├── models/                       — ORM 模型（预留，接入 DB 时使用）
│       ├── db/                           — 数据库连接（预留）
│       └── dependencies/                 — FastAPI 依赖注入（预留）
├── docs/                                 — 项目文档
├── .antigravity/                         — AI 工作流配置
├── CLAUDE.md                             — L1 根文档（本文件）
├── 前后端目录规范.md                      — 目录规范参照
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

_Last updated: 2026-03-08 (模板化重构：业务代码清除 → 通用脚手架结构，remote 指向 nextjs-fastapi-python-structure)_

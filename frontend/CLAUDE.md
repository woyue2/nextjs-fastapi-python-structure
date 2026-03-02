# frontend · L2 模块文档

> **[PROTOCOL]**: GEB L2 层。任何页面、组件或 API 调用约定变更，必须同步本文件。

---

## 模块职责

Next.js 前端，负责所有用户界面渲染、路由管理与后端 API 调用。

---

## 技术栈

- Next.js (App Router) · TypeScript
- TailwindCSS v4（PostCSS 插件模式）
- framer-motion · lucide-react · clsx · react-icons

---

## 页面路由（src/app/）

| 路径 | 文件 | 说明 |
|------|------|------|
| `/` | `src/app/page.tsx` | 首页 |
| `layout` | `src/app/layout.tsx` | 全局布局 |

---

## 组件成员（src/components/）

_（尚无自定义组件，待添加后更新）_

---

## API 调用约定

- 开发期：所有 fetch 请求指向 `http://localhost:8000/api/`
- 生产期：通过 Next.js `rewrites` 代理到后端
- 请求方式：原生 `fetch`（Server Components）或 `react-query`（Client Components）

---

## 目录结构

```
frontend/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css      — @import 'tailwindcss'
├── postcss.config.mjs       — TailwindCSS v4 PostCSS 插件
├── tsconfig.json
└── package.json
```

---

_Last updated: 2026-03-02_

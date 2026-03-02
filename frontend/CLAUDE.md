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
| `/` | `src/app/page.tsx` | 首页导航（进入抽奖 / 后台管理） |
| `/lottery` | `src/app/lottery/page.tsx` | 幸运福利抽奖页 |
| `/admin` | `src/app/admin/page.tsx` | 后台管理页（奖品编辑 + 次数配置） |
| `layout` | `src/app/layout.tsx` | 全局布局 |

---

## 模块成员（src/app/lottery/）

| 文件 | 类型 | 说明 |
|------|------|------|
| `page.tsx` | Page (Client) | 抽奖主页面，组合所有子组件 |
| `store.ts` | Hook | 状态管理：次数/记录/兑换码/奖品，localStorage 持久化，含 admin actions |
| `components/LotteryGrid.tsx` | Component | 3×3 九宫格转盘，接受 prizes prop，顺时针高亮动画，加权随机 |
| `components/WinModal.tsx` | Component | 中奖弹窗，Framer Motion spring 动画 |
| `components/RedeemModal.tsx` | Component | 兑换码输入弹窗，本地校验 |
| `components/RecordModal.tsx` | Component | 中奖记录列表弹窗 |
| `components/ThemeSwitcher.tsx` | Component | 右下角浮动主题切换面板，6套主题+动效开关，localStorage持久化 |

---

## 模块成员（src/app/admin/）

| 文件 | 类型 | 说明 |
|------|------|------|
| `page.tsx` | Page (Client) | 后台管理主页面，Tab 切换：奖品管理 / 抽奖次数 |
| `components/PrizeEditor.tsx` | Component | 奖品内联编辑表格，支持 8 行以内增删改 |
| `components/ChanceEditor.tsx` | Component | 抽奖次数编辑：快捷预设 + 自定义输入 |

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

_Last updated: 2026-03-03 (ThemeSwitcher 主题切换器，6套CSS变量主题+动效开关；globals.css 全量主题变量重构)_

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
| `layout` | `src/app/layout.tsx` | 全局布局（Server Component） |

---

## 公共层（src/lib/）

| 文件 | 说明 |
|------|------|
| `types.ts` | Prize, WinRecord, PrizeType 等共享类型定义 |
| `constants.ts` | PRIZES（奖品数据）、REDEEM_CODES（兑换码）等常量 |
| `api.ts` | fetchRecordsFromApi, postRecordToApi — 后端 API 调用封装 |
| `storage.ts` | safeGet, safeSet — SSR 安全的 localStorage 封装 |

---

## Hooks（src/hooks/）

| 文件 | 说明 |
|------|------|
| `useLotteryStore.ts` | 抽奖全局状态管理 Hook：次数/记录/兑换码/奖品，含 admin actions |

---

## 模块成员（src/app/lottery/）

| 文件 | 类型 | 说明 |
|------|------|------|
| `page.tsx` | Page (Client) | 抽奖主页面，组合所有子组件 |
| `loading.tsx` | Loading | Suspense loading fallback |
| `error.tsx` | Error | 错误边界 |
| `components/LotteryGrid.tsx` | Component | 3×3 九宫格转盘，接受 prizes prop，顺时针高亮动画 |
| `components/ActionBtn.tsx` | Component | 底部动作按钮（兑换/记录/管理） |
| `components/WinModal.tsx` | Component | 中奖弹窗，Framer Motion spring 动画 |
| `components/RedeemModal.tsx` | Component | 兑换码输入弹窗，本地校验 |
| `components/RecordModal.tsx` | Component | 中奖记录列表弹窗 |
| `components/ThemeSwitcher.tsx` | Component | 右下角浮动主题切换面板，6套主题+动效开关 |

---

## 模块成员（src/app/admin/）

| 文件 | 类型 | 说明 |
|------|------|------|
| `page.tsx` | Page (Client) | 后台管理主页面，Tab 切换：奖品管理 / 抽奖次数 |
| `loading.tsx` | Loading | Suspense loading fallback |
| `error.tsx` | Error | 错误边界 |
| `components/PrizeEditor.tsx` | Component | 奖品内联编辑表格，支持 8 行以内增删改 |
| `components/ChanceEditor.tsx` | Component | 抽奖次数编辑：快捷预设 + 自定义输入 |

---

## API 调用约定

- 基地址：`NEXT_PUBLIC_API_BASE`（默认 `http://localhost:8000`）
- 路由前缀：`/api/v1/`
- 端点：`GET/POST /api/v1/records`
- 调用方式：原生 `fetch`，封装在 `src/lib/api.ts`

---

## 目录结构

```
frontend/src/
├── app/
│   ├── layout.tsx           — 全局布局 + metadata
│   ├── page.tsx             — 首页导航
│   ├── globals.css          — 主题系统（6 套 CSS 变量）
│   ├── loading.tsx          — 全局 loading fallback
│   ├── error.tsx            — 全局错误边界
│   ├── lottery/             — 抽奖路由
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── components/      — LotteryGrid, ActionBtn, WinModal, RedeemModal, RecordModal, ThemeSwitcher
│   └── admin/               — 后台管理路由
│       ├── page.tsx
│       ├── loading.tsx
│       ├── error.tsx
│       └── components/      — PrizeEditor, ChanceEditor
├── lib/                     — 公共工具层（types, constants, api, storage）
└── hooks/                   — 公共 Hooks（useLotteryStore）
```

---

_Last updated: 2026-03-03 (目录重构：store.ts 拆分为 lib/ + hooks/，新增 loading/error/metadata，消除跨路由耦合)_

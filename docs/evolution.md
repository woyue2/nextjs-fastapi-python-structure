# 2026-03-03

## 变动  新增后端抽奖记录查询接口（含分页）
### 原因  用户需求：提供可供前端拉取的中奖记录查询能力
### 影响
- 新增 `GET /api/records`：支持 `limit`（1-100）与 `offset`（>=0）分页参数，返回 `records/total/limit/offset`
- 保留并实现 `POST /api/records`：用于写入中奖记录，保证前端现有调用兼容
- 恢复并升级 `backend/main.py`：在健康检查基础上补充记录相关 Schema 与线程安全内存存储
- 同步 `backend/CLAUDE.md`：更新路由清单、Schema 说明与目录描述

# 2026-03-03

## 变动  新增 6 套外观主题切换系统及动态效果开关
### 原因  用户需求：为抽奖页面提供多套背景配色方案（含高端低饱和度风格）及动效开关，提升视觉丰富度和个性化体验
### 影响
- 新增组件 `ThemeSwitcher.tsx`：右下角浮动面板，6套主题色块 + 动效开关，localStorage 持久化
- 重构 `globals.css`：6套 `[data-theme]` CSS 变量主题（传统佳节/墨金之夜/深海幽光/松雾清境/樱雪白瓷/赛博霓虹）+ `body::before` 动态装饰 keyframe
- 改造 `lottery/page.tsx`、`LotteryGrid.tsx`：所有硬编码色值统一为 CSS 变量，主题切换即时生效
- 同步 `frontend/CLAUDE.md`：补录 ThemeSwitcher 成员清单，更新时间戳

# 2026-03-03

## 变动  工作流进化：从 Workflow 升级为 Workflow + Skill 混合架构
### 原因  为了提升交互效率，减少不必要的对话回合，同时固化核心身份协议和设计约束
### 影响  
- 新置 3 个 Skill：`geb_protocol` (身份及 GEB 协议)、`oop_phase` (分期设计约束)、`impl_quality` (内联质量自检)
- 优化 2 个 Workflow：`dev_flow.md` (主干流程压缩为 4 回合)、`implement.md` (对接内联自检)
- 清理根目录碎裂文件：`fastapi让Claude加入.md`、`log设计一下.md`、`waitForClaude.md`、`面向对象优化.md` (已由 Skill 吸收)

# 2026-03-02

## 变动  实现幸运福利抽奖页及本地管理后台
### 原因  支持产品需求快速开发纯前端可配置的九宫格抽奖页面，同时需要独立后台调整奖品及概率配置
### 影响  新增 /lottery 路由、/admin 路由及相关组件；前端 store 加入 localStorage 持久化支持；修复抽奖动画最后的强制跳格 bug；同步更新 CLAUDE.md 等文档。

# backend · L2 模块文档

> **[PROTOCOL]**: GEB L2 层。任何路由、模型或中间件变更，必须同步本文件。

---

## 模块职责

FastAPI 后端，负责业务逻辑、数据处理与 REST API 暴露。

---

## 技术栈

- FastAPI · Python 3.11+ · Uvicorn · Pydantic v2
- python-dotenv · httpx

---

## 目录结构

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    — FastAPI 入口（只做挂载）
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py             — 全局配置（APP_TITLE, CORS_ORIGINS 等）
│   ├── api/v1/
│   │   ├── __init__.py
│   │   ├── router.py             — V1 路由汇总（/api/v1 前缀）
│   │   └── endpoints/
│   │       ├── __init__.py
│   │       ├── health.py         — GET /api/v1/health
│   │       ├── records.py        — GET/POST /api/v1/records
│   │       └── hello.py          — GET /api/v1/hello（演示）
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── record.py             — PrizeSchema, RecordCreateSchema, RecordSchema, RecordListResponse
│   ├── services/
│   │   ├── __init__.py
│   │   └── record_service.py     — 记录 CRUD 业务逻辑
│   ├── models/                    — ORM 模型（预留）
│   ├── db/                        — 数据库 session（预留）
│   └── dependencies/              — FastAPI 依赖注入（预留）
├── requirements.txt               — pip freeze 生成
├── CLAUDE.md                      — 本文件
└── .venv/                         — Python 虚拟环境（不提交 git）
```

---

## 路由清单

| 文件 | 方法 | 路径 | 说明 |
|------|------|------|------|
| `endpoints/health.py` | GET | `/api/v1/health` | 健康检查 |
| `endpoints/records.py` | GET | `/api/v1/records` | 抽奖记录查询（支持 limit/offset） |
| `endpoints/records.py` | POST | `/api/v1/records` | 抽奖记录写入（内存存储） |
| `endpoints/hello.py` | GET | `/api/v1/hello` | 演示接口 |

---

## 数据模型（schemas/）

- `PrizeSchema`：奖品信息
- `RecordCreateSchema`：新增中奖记录请求体
- `RecordSchema`：中奖记录实体
- `RecordListResponse`：中奖记录查询响应体

---

## 中间件与依赖

- **CORSMiddleware**：允许 `localhost:3000` 跨域访问
- 环境变量通过 `python-dotenv` 从 `.env` 加载

---

## 启动命令

```bash
# 开发模式（热重载），从 backend/ 目录执行
cd backend
.venv/Scripts/uvicorn app.main:app --reload --port 8000
```

---

_Last updated: 2026-03-03_

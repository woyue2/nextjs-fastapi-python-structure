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

## 路由文件（routers/）

_（当前集中在入口文件，后续可拆分为 routers/）_

| 文件 | 前缀 | 说明 |
|------|------|------|
| `main.py` | `/api/health` | 健康检查 |
| `main.py` | `/api/records` | 抽奖记录查询（GET，支持 limit/offset） |
| `main.py` | `/api/records` | 抽奖记录写入（POST，内存存储） |

---

## 数据模型（models/ / schemas/）

当前使用 `main.py` 内联 Pydantic Schema（后续可拆分）：

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
# 开发模式（热重载）
backend/.venv/Scripts/uvicorn main:app --reload --port 8000
```

---

## 目录结构

```
backend/
├── main.py              — FastAPI 入口 + CORS + 健康检查 + 抽奖记录 API
├── requirements.txt     — pip freeze 生成
└── .venv/               — Python 虚拟环境（不提交 git）
```

---

_Last updated: 2026-03-03_

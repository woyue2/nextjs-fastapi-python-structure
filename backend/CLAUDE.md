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

_（尚无子路由文件，待添加后更新）_

| 文件 | 前缀 | 说明 |
|------|------|------|
| `main.py` | `/api/health` | 入口 + 健康检查 |

---

## 数据模型（models/ / schemas/）

_（尚无数据模型，待添加后更新）_

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
├── main.py              — FastAPI 入口 + CORS + 健康检查
├── requirements.txt     — pip freeze 生成
└── .venv/               — Python 虚拟环境（不提交 git）
```

---

_Last updated: 2026-03-02_

"""
[INPUT]:    v1_router, CORSMiddleware, config
[OUTPUT]:   FastAPI app 实例，挂载 v1 路由和 CORS 中间件
[POS]:      backend/app/main.py — 服务入口，只做挂载
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md
"""
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import APP_TITLE, APP_VERSION, CORS_ORIGINS
from app.api.v1.router import v1_router

app = FastAPI(title=APP_TITLE, version=APP_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router)

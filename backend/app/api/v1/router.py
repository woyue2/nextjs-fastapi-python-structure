"""
[INPUT]:    endpoints (health, items, hello)
[OUTPUT]:   v1_router — /api/v1 前缀的汇总路由
[POS]:      backend/app/api/v1/router.py — V1 路由汇总
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md
"""
from fastapi import APIRouter

from app.api.v1.endpoints import health, items, hello

v1_router = APIRouter(prefix="/api/v1")

v1_router.include_router(health.router, tags=["health"])
v1_router.include_router(items.router, tags=["items"])
v1_router.include_router(hello.router, tags=["hello"])

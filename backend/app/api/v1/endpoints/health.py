"""
[INPUT]:    无
[OUTPUT]:   GET /health — 健康检查接口
[POS]:      backend/app/api/v1/endpoints/health.py
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md
"""
from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

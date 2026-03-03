"""
[INPUT]:    无
[OUTPUT]:   GET /hello — 演示接口
[POS]:      backend/app/api/v1/endpoints/hello.py
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md
"""
from fastapi import APIRouter

router = APIRouter()


@router.get("/hello")
def say_hello() -> dict[str, str]:
    return {"message": "Hello from backend!"}

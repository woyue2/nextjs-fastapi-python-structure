"""
[INPUT]:    ItemCreateSchema (POST body), limit/offset (GET query)
[OUTPUT]:   GET /items — 查询资源列表, POST /items — 创建资源
[POS]:      backend/app/api/v1/endpoints/items.py — 示例资源 endpoint
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md

NOTE: 这是一个模板示例。请将 items 替换为你自己的业务路径名称。
"""
from __future__ import annotations

from fastapi import APIRouter, Query

from app.schemas.item import ItemCreateSchema, ItemListResponse, ItemSchema
from app.services import item_service

router = APIRouter()


@router.get("/items", response_model=ItemListResponse)
def list_items(
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
) -> ItemListResponse:
    selected, total = item_service.list_items(limit=limit, offset=offset)
    return ItemListResponse(items=selected, total=total, limit=limit, offset=offset)


@router.post("/items")
def create_item(payload: ItemCreateSchema) -> dict[str, ItemSchema]:
    item = item_service.create_item(payload)
    return {"item": item}

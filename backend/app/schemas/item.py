"""
[INPUT]:    Pydantic BaseModel
[OUTPUT]:   ItemSchema, ItemCreateSchema, ItemListResponse — 示例资源模型
[POS]:      backend/app/schemas/item.py — 示例请求/响应模型
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md

NOTE: 这是一个模板示例。请将 Item 替换为你自己的业务资源名称，
      并根据实际需要增删字段。
"""
from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field


class ItemCreateSchema(BaseModel):
    """创建资源时的请求体。"""
    name: str = Field(min_length=1, max_length=100, description="资源名称")
    description: str = Field(default="", max_length=500, description="资源描述")


class ItemSchema(BaseModel):
    """完整资源响应体（含服务端生成字段）。"""
    id: str = Field(description="唯一 ID")
    name: str
    description: str
    created_at: datetime


class ItemListResponse(BaseModel):
    """分页列表响应体。"""
    items: list[ItemSchema]
    total: int
    limit: int
    offset: int

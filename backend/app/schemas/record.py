"""
[INPUT]:    Pydantic BaseModel
[OUTPUT]:   PrizeSchema, RecordCreateSchema, RecordSchema, RecordListResponse
[POS]:      backend/app/schemas/record.py — 抽奖记录相关请求/响应模型
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md
"""
from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class PrizeSchema(BaseModel):
    id: int
    name: str = Field(min_length=1, max_length=50)
    desc: str = Field(min_length=1, max_length=120)
    icon: str = Field(min_length=1, max_length=10)
    type: Literal["cash", "goods", "none"]


class RecordCreateSchema(BaseModel):
    prize: PrizeSchema
    time: datetime | None = None


class RecordSchema(BaseModel):
    id: str
    prize: PrizeSchema
    time: datetime


class RecordListResponse(BaseModel):
    records: list[RecordSchema]
    total: int
    limit: int
    offset: int

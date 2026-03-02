"""
[INPUT]:    FastAPI, Pydantic, CORS middleware
[OUTPUT]:   /api/health, /api/records 查询与写入接口
[POS]:      backend 服务入口，被前端 lottery/store.ts 调用
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md
"""
from __future__ import annotations

from datetime import datetime, timezone
from threading import Lock
from typing import Literal
from uuid import uuid4

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Anti-Huihuan API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


_records: list[RecordSchema] = []
_records_lock = Lock()


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/records", response_model=RecordListResponse)
def list_records(
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
) -> RecordListResponse:
    # [IMPL] 原因: 新增抽奖记录查询接口，支持前端分页拉取
    with _records_lock:
        total = len(_records)
        selected = _records[offset : offset + limit]
    return RecordListResponse(records=selected, total=total, limit=limit, offset=offset)


@app.post("/api/records")
def create_record(payload: RecordCreateSchema) -> dict[str, RecordSchema]:
    # [IMPL] 原因: 保持与前端已有落库调用兼容，新增记录后可被查询接口返回
    record = RecordSchema(
        id=uuid4().hex,
        prize=payload.prize,
        time=payload.time or _utc_now(),
    )
    with _records_lock:
        _records.insert(0, record)
        if len(_records) > 500:
            del _records[500:]
    return {"record": record}

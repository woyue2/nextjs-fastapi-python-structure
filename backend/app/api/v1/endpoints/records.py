"""
[INPUT]:    RecordCreateSchema (POST body), limit/offset (GET query)
[OUTPUT]:   GET /records — 查询记录, POST /records — 创建记录
[POS]:      backend/app/api/v1/endpoints/records.py
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md
"""
from __future__ import annotations

from fastapi import APIRouter, Query

from app.schemas.record import RecordCreateSchema, RecordListResponse, RecordSchema
from app.services import record_service

router = APIRouter()


@router.get("/records", response_model=RecordListResponse)
def list_records(
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
) -> RecordListResponse:
    selected, total = record_service.list_records(limit=limit, offset=offset)
    return RecordListResponse(records=selected, total=total, limit=limit, offset=offset)


@router.post("/records")
def create_record(payload: RecordCreateSchema) -> dict[str, RecordSchema]:
    record = record_service.create_record(payload)
    return {"record": record}

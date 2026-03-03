"""
[INPUT]:    RecordCreateSchema
[OUTPUT]:   list_records, create_record — 抽奖记录业务逻辑
[POS]:      backend/app/services/record_service.py — 记录服务层
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md
"""
from __future__ import annotations

import logging
from datetime import datetime, timezone
from threading import Lock
from uuid import uuid4

from app.schemas.record import RecordCreateSchema, RecordSchema

logger = logging.getLogger(__name__)

_records: list[RecordSchema] = []
_records_lock = Lock()


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def list_records(*, limit: int = 50, offset: int = 0) -> tuple[list[RecordSchema], int]:
    """查询记录列表，返回 (选中记录, 总数)。"""
    logger.info("查询记录", extra={"limit": limit, "offset": offset})
    with _records_lock:
        total = len(_records)
        selected = _records[offset : offset + limit]
    logger.info("查询完成", extra={"total": total, "returned": len(selected)})
    return selected, total


def create_record(payload: RecordCreateSchema) -> RecordSchema:
    """创建一条中奖记录并返回。"""
    record = RecordSchema(
        id=uuid4().hex,
        prize=payload.prize,
        time=payload.time or _utc_now(),
    )
    logger.info("创建记录", extra={"record_id": record.id, "prize_name": record.prize.name})
    with _records_lock:
        _records.insert(0, record)
        if len(_records) > 500:
            del _records[500:]
    return record

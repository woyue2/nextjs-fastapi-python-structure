"""
[INPUT]:    ItemCreateSchema
[OUTPUT]:   list_items, create_item — 示例资源的业务逻辑
[POS]:      backend/app/services/item_service.py — 示例服务层
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md

NOTE: 这是内存存储演示，生产环境请替换为数据库实现（如 SQLAlchemy + PostgreSQL）。
      参考 app/db/ 目录存放数据库连接逻辑。
"""
from __future__ import annotations

import logging
from datetime import datetime, timezone
from threading import Lock
from uuid import uuid4

from app.schemas.item import ItemCreateSchema, ItemSchema

logger = logging.getLogger(__name__)

# ---------- 内存存储（仅用于演示，重启后数据丢失）----------
_items: list[ItemSchema] = []
_lock = Lock()


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def list_items(*, limit: int = 50, offset: int = 0) -> tuple[list[ItemSchema], int]:
    """查询资源列表，返回 (分页记录, 总数)。"""
    logger.info("list_items", extra={"limit": limit, "offset": offset})
    with _lock:
        total = len(_items)
        selected = _items[offset : offset + limit]
    return selected, total


def create_item(payload: ItemCreateSchema) -> ItemSchema:
    """创建一条资源记录并返回。"""
    item = ItemSchema(
        id=uuid4().hex,
        name=payload.name,
        description=payload.description,
        created_at=_utc_now(),
    )
    logger.info("create_item", extra={"item_id": item.id})
    with _lock:
        _items.insert(0, item)
        # 只保留最近 500 条，防止内存无限增长
        if len(_items) > 500:
            del _items[500:]
    return item

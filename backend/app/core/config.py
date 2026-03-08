"""
[INPUT]:    无
[OUTPUT]:   APP_TITLE, APP_VERSION, CORS_ORIGINS 等全局配置常量
[POS]:      backend/app/core/config.py — 全局配置中心
[PROTOCOL]: 变更时更新此头部，然后检查 backend/CLAUDE.md
"""
from __future__ import annotations

APP_TITLE = "My App API"
APP_VERSION = "0.1.0"

CORS_ORIGINS: list[str] = [
    "http://localhost:3000",
]

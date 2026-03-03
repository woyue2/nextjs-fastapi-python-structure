/**
 * [INPUT]:    localStorage key/value
 * [OUTPUT]:   safeGet, safeSet — SSR 安全的 localStorage 封装
 * [POS]:      frontend/src/lib/storage.ts — 存储工具
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */

export function safeGet<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

export function safeSet(key: string, val: unknown): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(val));
}

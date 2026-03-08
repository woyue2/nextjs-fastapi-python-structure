/**
 * [INPUT]:    ItemRecord 类型, API_BASE 环境变量
 * [OUTPUT]:   fetchItemsFromApi, postItemToApi — 后端 API 调用
 * [POS]:      frontend/src/lib/api.ts — API 通信层
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 *
 * NOTE: 通用 API 封装模板。
 *       - API_BASE 通过环境变量注入，开发默认 http://localhost:8000
 *       - 所有函数失败时返回 null，调用方负责处理降级逻辑
 */
import { type ItemRecord } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000';

/** 获取资源列表 */
export async function fetchItemsFromApi(limit = 50): Promise<ItemRecord[] | null> {
    try {
        const res = await fetch(`${API_BASE}/api/v1/items?limit=${limit}&offset=0`);
        if (!res.ok) return null;
        const data = (await res.json()) as { items?: ItemRecord[] };
        return Array.isArray(data.items) ? data.items : null;
    } catch {
        return null;
    }
}

/** 创建一条资源记录 */
export async function postItemToApi(record: ItemRecord): Promise<ItemRecord | null> {
    try {
        const res = await fetch(`${API_BASE}/api/v1/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: record.item.name,
                description: record.item.description,
            }),
        });
        if (!res.ok) return null;
        const data = (await res.json()) as { item?: ItemRecord };
        return data.item ?? null;
    } catch {
        return null;
    }
}

/**
 * [INPUT]:    WinRecord 类型, API_BASE 环境变量
 * [OUTPUT]:   fetchRecordsFromApi, postRecordToApi — 后端 API 调用
 * [POS]:      frontend/src/lib/api.ts — API 通信层
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
import { type WinRecord } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000';

export async function fetchRecordsFromApi(limit = 50): Promise<WinRecord[] | null> {
    try {
        const res = await fetch(`${API_BASE}/api/v1/records?limit=${limit}&offset=0`);
        if (!res.ok) return null;
        const data = (await res.json()) as { records?: WinRecord[] };
        return Array.isArray(data.records) ? data.records : null;
    } catch {
        return null;
    }
}

export async function postRecordToApi(record: WinRecord): Promise<WinRecord | null> {
    try {
        const res = await fetch(`${API_BASE}/api/v1/records`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prize: {
                    id: record.prize.id,
                    name: record.prize.name,
                    desc: record.prize.desc,
                    icon: record.prize.icon,
                    type: record.prize.type,
                },
                time: record.time,
            }),
        });
        if (!res.ok) return null;
        const data = (await res.json()) as { record?: WinRecord };
        return data.record ?? null;
    } catch {
        return null;
    }
}

// ==============================================================
// [INPUT]:    localStorage (chances, records, usedCodes, admin_prizes, admin_chances)
// [OUTPUT]:   useLotteryStore hook — lottery state + actions
//             exports: Prize, WinRecord, PRIZES, weightedRandom
//             actions: redeemCode, spendChance, addRecord
//             admin:   updatePrizes, setAdminChances
// [POS]:      frontend/src/app/lottery/ 的全局状态中心，被 page.tsx / admin 消费
// [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
// ==============================================================
'use client';

import { useState, useEffect, useCallback } from 'react';

/* ---- 类型定义 ---- */
export type PrizeType = 'cash' | 'goods' | 'none';

export interface Prize {
    id: number;
    name: string;
    desc: string;
    odds: number;   // 中奖权重（越大越容易中）
    icon: string;
    type: PrizeType;
}

export interface WinRecord {
    id: string;
    prize: Prize;
    time: string;   // ISO 字符串
}

/* ---- 奖品数据（顺时针外圈 0-7，id 对应位置） ---- */
export const PRIZES: Prize[] = [
    { id: 0, name: '一等奖', desc: '现金红包 100 元', odds: 2, icon: '💰', type: 'cash' },
    { id: 1, name: '二等奖', desc: '现金红包 50 元', odds: 5, icon: '🎁', type: 'cash' },
    { id: 2, name: '三等奖', desc: '现金红包 10 元', odds: 10, icon: '🎀', type: 'cash' },
    { id: 3, name: '精美手机壳', desc: '实物奖品', odds: 13, icon: '📱', type: 'goods' },
    { id: 4, name: '周边贴纸包', desc: '实物奖品', odds: 18, icon: '🌟', type: 'goods' },
    { id: 5, name: '幸运气球', desc: '实物奖品', odds: 20, icon: '🎈', type: 'goods' },
    { id: 6, name: '特别彩蛋', desc: '神秘奖品', odds: 7, icon: '🥚', type: 'goods' },
    { id: 7, name: '谢谢参与', desc: '再接再厉', odds: 25, icon: '🎉', type: 'none' },
];

/* ---- 预设兑换码 ---- */
const REDEEM_CODES: Record<string, number> = {
    LUCKY001: 1, LUCKY002: 1, LUCKY003: 2,
    LUCKY004: 1, LUCKY005: 3, HAPPY888: 2,
    WIN2024: 1, PRIZE99: 1, GOLD168: 2,
    STAR777: 5,
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000';

/* ---- 加权随机 ---- */
export function weightedRandom(prizes: Prize[]): number {
    const total = prizes.reduce((s, p) => s + p.odds, 0);
    let rand = Math.random() * total;
    for (const p of prizes) {
        rand -= p.odds;
        if (rand <= 0) return p.id;
    }
    return prizes[prizes.length - 1].id;
}

/* ---- localStorage 工具 ---- */
function safeGet<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

function safeSet(key: string, val: unknown) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(val));
}

async function fetchRecordsFromApi(limit = 50): Promise<WinRecord[] | null> {
    try {
        const res = await fetch(`${API_BASE}/api/records?limit=${limit}&offset=0`);
        if (!res.ok) return null;
        const data = (await res.json()) as { records?: WinRecord[] };
        return Array.isArray(data.records) ? data.records : null;
    } catch {
        return null;
    }
}

async function postRecordToApi(record: WinRecord): Promise<WinRecord | null> {
    try {
        const res = await fetch(`${API_BASE}/api/records`, {
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

/* ---- Hook ---- */
export function useLotteryStore() {
    const [chances, setChances] = useState(0);
    const [records, setRecords] = useState<WinRecord[]>([]);
    const [usedCodes, setUsedCodes] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);
    // [IMPL] 原因: 后台管理页可覆盖奖品列表，默认使用硬编码 PRIZES
    const [prizes, setPrizes] = useState<Prize[]>(PRIZES);

    // SSR 安全：仅客户端读取 localStorage
    useEffect(() => {
        setChances(safeGet('lottery_chances', 0));
        setRecords(safeGet('lottery_records', []));
        setUsedCodes(safeGet('lottery_used_codes', []));
        // [IMPL] 原因: 从 localStorage 恢复后台配置的奖品 & 次数（若后台未配置则用默认值）
        const adminPrizes = safeGet<Prize[]>('admin_prizes', PRIZES);
        const adminChances = safeGet<number>('admin_bonus_chances', 0);
        setPrizes(adminPrizes);
        if (adminChances > 0) {
            // admin 配置的额外次数叠加到已有次数上（仅首次挂载）
            setChances(prev => prev + adminChances);
            safeSet('admin_bonus_chances', 0); // 消费一次后清零，避免重复叠加
        }
        setMounted(true);

        // 尝试从后端读取最新记录，失败时保持本地记录兜底
        void fetchRecordsFromApi(50).then((remote) => {
            if (!remote) return;
            setRecords(remote);
            safeSet('lottery_records', remote);
        });
    }, []);

    // 兑换码兑换
    const redeemCode = useCallback((code: string): { ok: boolean; msg: string } => {
        const upper = code.trim().toUpperCase();
        if (!(upper in REDEEM_CODES)) return { ok: false, msg: '兑换码无效，请重新输入' };
        if (usedCodes.includes(upper)) return { ok: false, msg: '该兑换码已使用过了' };

        const gained = REDEEM_CODES[upper];
        const newChances = chances + gained;
        const newUsedCodes = [...usedCodes, upper];

        setChances(newChances);
        setUsedCodes(newUsedCodes);
        safeSet('lottery_chances', newChances);
        safeSet('lottery_used_codes', newUsedCodes);

        return { ok: true, msg: `兑换成功！获得 ${gained} 次抽奖机会` };
    }, [chances, usedCodes]);

    // 消耗一次机会
    const spendChance = useCallback(() => {
        if (chances <= 0) return false;
        const next = chances - 1;
        setChances(next);
        safeSet('lottery_chances', next);
        return true;
    }, [chances]);

    // 记录中奖
    const addRecord = useCallback((prize: Prize) => {
        const record: WinRecord = {
            id: Date.now().toString(),
            prize,
            time: new Date().toISOString(),
        };
        setRecords(prev => {
            const next = [record, ...prev].slice(0, 50); // 最多保留 50 条
            safeSet('lottery_records', next);
            return next;
        });

        // 后端落库成功后，用服务端返回记录覆盖本地临时 id，保持数据一致
        void postRecordToApi(record).then((saved) => {
            if (!saved) return;
            setRecords(prev => {
                const filtered = prev.filter(r => r.id !== record.id);
                const next = [saved, ...filtered].slice(0, 50);
                safeSet('lottery_records', next);
                return next;
            });
        });
    }, []);

    // [IMPL] 原因: 后台管理页调用此 action 更新奖品列表并持久化
    const updatePrizes = useCallback((newPrizes: Prize[]) => {
        setPrizes(newPrizes);
        safeSet('admin_prizes', newPrizes);
    }, []);

    // [IMPL] 原因: 后台管理页调用此 action 直接设置抽奖次数
    const setAdminChances = useCallback((n: number) => {
        setChances(n);
        safeSet('lottery_chances', n);
    }, []);

    return {
        chances, records, mounted, prizes,
        redeemCode, spendChance, addRecord,
        updatePrizes, setAdminChances,
    };
}

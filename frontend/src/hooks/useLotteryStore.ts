/**
 * [INPUT]:    localStorage (chances, records, usedCodes, admin_prizes, admin_chances)
 * [OUTPUT]:   useLotteryStore hook — lottery state + actions
 *             exports: weightedRandom
 *             actions: redeemCode, spendChance, addRecord, updatePrizes, setAdminChances
 * [POS]:      frontend/src/hooks/useLotteryStore.ts — 全局状态中心
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { type Prize, type WinRecord } from '@/lib/types';
import { PRIZES, REDEEM_CODES } from '@/lib/constants';
import { safeGet, safeSet } from '@/lib/storage';
import { fetchRecordsFromApi, postRecordToApi } from '@/lib/api';

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

/* ---- Hook ---- */
export function useLotteryStore() {
    const [chances, setChances] = useState<number>(0);
    const [records, setRecords] = useState<WinRecord[]>([]);
    const [usedCodes, setUsedCodes] = useState<string[]>([]);
    const [mounted, setMounted] = useState<boolean>(false);
    const [prizes, setPrizes] = useState<Prize[]>(PRIZES);

    // SSR 安全：仅客户端读取 localStorage
    useEffect(() => {
        setChances(safeGet('lottery_chances', 0));
        setRecords(safeGet('lottery_records', []));
        setUsedCodes(safeGet('lottery_used_codes', []));
        const adminPrizes = safeGet<Prize[]>('admin_prizes', PRIZES);
        const adminChances = safeGet<number>('admin_bonus_chances', 0);
        setPrizes(adminPrizes);
        if (adminChances > 0) {
            setChances(prev => prev + adminChances);
            safeSet('admin_bonus_chances', 0);
        }
        setMounted(true);

        void fetchRecordsFromApi(50).then((remote) => {
            if (!remote) return;
            setRecords(remote);
            safeSet('lottery_records', remote);
        });
    }, []);

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

    const spendChance = useCallback(() => {
        if (chances <= 0) return false;
        const next = chances - 1;
        setChances(next);
        safeSet('lottery_chances', next);
        return true;
    }, [chances]);

    const addRecord = useCallback((prize: Prize) => {
        const record: WinRecord = {
            id: Date.now().toString(),
            prize,
            time: new Date().toISOString(),
        };
        setRecords(prev => {
            const next = [record, ...prev].slice(0, 50);
            safeSet('lottery_records', next);
            return next;
        });

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

    const updatePrizes = useCallback((newPrizes: Prize[]) => {
        setPrizes(newPrizes);
        safeSet('admin_prizes', newPrizes);
    }, []);

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

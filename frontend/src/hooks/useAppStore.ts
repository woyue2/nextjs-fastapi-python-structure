/**
 * [INPUT]:    localStorage (records, settings 等)
 * [OUTPUT]:   useAppStore hook — 应用全局状态 + actions
 *             exports: useAppStore
 *             actions: fetchItems, addItem, updateSettings
 * [POS]:      frontend/src/hooks/useAppStore.ts — 全局状态中心
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 *
 * NOTE: 这是一个通用状态管理 Hook 模板。
 *       请根据实际业务替换 Item / ItemRecord 类型和对应的 API 调用。
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { type Item, type ItemRecord } from '@/lib/types';
import { SAMPLE_ITEMS } from '@/lib/constants';
import { safeGet, safeSet } from '@/lib/storage';
import { fetchItemsFromApi, postItemToApi } from '@/lib/api';

/* ---- Hook ---- */
export function useAppStore() {
    const [items, setItems] = useState<Item[]>(SAMPLE_ITEMS);
    const [records, setRecords] = useState<ItemRecord[]>([]);
    const [mounted, setMounted] = useState<boolean>(false);

    // SSR 安全：仅客户端读取 localStorage
    useEffect(() => {
        setRecords(safeGet('app_records', []));
        setMounted(true);

        // 从后端同步最新数据（失败时降级使用本地缓存）
        void fetchItemsFromApi(50).then((remote) => {
            if (!remote) return;
            setRecords(remote);
            safeSet('app_records', remote);
        });
    }, []);

    /** 添加一条记录，同时异步同步到后端 */
    const addRecord = useCallback((item: Item) => {
        const record: ItemRecord = {
            id: Date.now().toString(),
            item,
            createdAt: new Date().toISOString(),
        };
        setRecords((prev) => {
            const next = [record, ...prev].slice(0, 50);
            safeSet('app_records', next);
            return next;
        });

        // 异步同步到后端，成功后用服务端 ID 替换本地临时 ID
        void postItemToApi(record).then((saved) => {
            if (!saved) return;
            setRecords((prev) => {
                const filtered = prev.filter((r) => r.id !== record.id);
                const next = [saved, ...filtered].slice(0, 50);
                safeSet('app_records', next);
                return next;
            });
        });
    }, []);

    /** 更新本地 items 列表（例如管理端修改后同步） */
    const updateItems = useCallback((newItems: Item[]) => {
        setItems(newItems);
        safeSet('app_items', newItems);
    }, []);

    return {
        items,
        records,
        mounted,
        addRecord,
        updateItems,
    };
}

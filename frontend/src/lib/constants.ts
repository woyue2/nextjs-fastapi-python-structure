/**
 * [INPUT]:    Item 类型
 * [OUTPUT]:   SAMPLE_ITEMS, CONFIG 等示例常量
 * [POS]:      frontend/src/lib/constants.ts — 全局常量
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 *
 * NOTE: 这是一个模板示例。请将示例数据替换为你自己的业务常量。
 */
import { type Item } from './types';

/** 示例：资源列表数据 */
export const SAMPLE_ITEMS: Item[] = [
    { id: 1, name: '示例 A', description: '这是类型 A 的描述', type: 'typeA' },
    { id: 2, name: '示例 B', description: '这是类型 B 的描述', type: 'typeB' },
    { id: 3, name: '示例 C', description: '这是其他类型的描述', type: 'other' },
];

/** 示例：应用级配置常量 */
export const APP_CONFIG = {
    maxRecords: 50,         // 前端最多缓存的记录数
    storageKeyPrefix: 'app', // localStorage key 前缀，避免冲突
} as const;

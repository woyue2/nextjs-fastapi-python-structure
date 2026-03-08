/**
 * [INPUT]:    无
 * [OUTPUT]:   Item, ItemType 等共享类型定义
 * [POS]:      frontend/src/lib/types.ts — 全局类型定义
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 *
 * NOTE: 这是一个模板示例。请将 Item / ItemType 替换为你自己的业务类型。
 */

/** 示例枚举：资源分类 */
export type ItemType = 'typeA' | 'typeB' | 'other';

/** 示例接口：核心资源 */
export interface Item {
    id: number;
    name: string;
    description: string;
    type: ItemType;
}

/** 示例接口：带时间戳的记录 */
export interface ItemRecord {
    id: string;
    item: Item;
    createdAt: string;   // ISO 字符串
}

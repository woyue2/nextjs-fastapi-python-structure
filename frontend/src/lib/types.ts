/**
 * [INPUT]:    无
 * [OUTPUT]:   Prize, WinRecord, PrizeType 等共享类型
 * [POS]:      frontend/src/lib/types.ts — 全局类型定义
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */

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

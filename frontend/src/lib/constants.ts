/**
 * [INPUT]:    Prize 类型
 * [OUTPUT]:   PRIZES, REDEEM_CODES 等常量数据
 * [POS]:      frontend/src/lib/constants.ts — 全局常量
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
import { type Prize } from './types';

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
export const REDEEM_CODES: Record<string, number> = {
    LUCKY001: 1, LUCKY002: 1, LUCKY003: 2,
    LUCKY004: 1, LUCKY005: 3, HAPPY888: 2,
    WIN2024: 1, PRIZE99: 1, GOLD168: 2,
    STAR777: 5,
};

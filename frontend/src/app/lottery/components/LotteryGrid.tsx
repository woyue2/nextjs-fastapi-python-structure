// ==============================================================
// [COMPONENT] LotteryGrid
// [INPUT]     chances: number, spendChance/addRecord from store
// [OUTPUT]    3×3 九宫格转盘 + 动画逻辑
// [POS]       frontend/src/app/lottery/components/LotteryGrid.tsx
// [PROTOCOL]  变更时更新此头部，然后检查 frontend/CLAUDE.md
// [DEPS]      framer-motion, store
// ==============================================================
'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { type Prize } from '@/lib/types';
import { weightedRandom } from '@/hooks/useLotteryStore';

// 顺时针外圈顺序：左上↗上中↗右上↘右中↘右下↙下中↙左下↖左中
const CLOCKWISE = [0, 1, 2, 3, 4, 5, 6, 7];

// 9格布局（index 0-8）中，外圈映射到格子位置
// 九宫格位置:  0 1 2
//              3 4 5
//              6 7 8
// 顺时针外圈: 0→0, 1→1, 2→2, 3→5, 4→8, 5→7, 6→6, 7→3
const POSITION_MAP: Record<number, number> = {
    0: 0, 1: 1, 2: 2,
    3: 5, 4: 8, 5: 7,
    6: 6, 7: 3,
};
// 反向：格子位置 → 外圈索引
const CELL_TO_RING: Record<number, number> = Object.fromEntries(
    Object.entries(POSITION_MAP).map(([ring, cell]) => [cell, Number(ring)])
);

const TOTAL_STEPS = 40; // 转动总步数
const BASE_SPEED = 80; // 初始间隔 ms（越小越快）

interface Props {
    chances: number;
    prizes: Prize[];              // [IMPL] 原因: 支持后台动态修改奖品
    onSpin: () => void;           // 消耗一次机会
    onWin: (p: Prize) => void;   // 触发中奖弹窗
}

export default function LotteryGrid({ chances, prizes, onSpin, onWin }: Props) {
    const [activeRing, setActiveRing] = useState<number>(-1); // 当前高亮外圈索引
    const [spinning, setSpinning] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startSpin = useCallback(() => {
        if (spinning || chances <= 0) return;
        onSpin(); // 消耗次数

        setSpinning(true);
        const targetRing = weightedRandom(prizes);

        // [FIX] 根因: TOTAL_STEPS 固定为 40 时最后一步停在 39%8=7 格，
        //       若 targetRing≠7 则强制 setActiveRing(targetRing) 产生跳格。
        //       解决办法：动态计算 totalSteps 使 (totalSteps-1)%8 === targetRing，
        //       让最后一步 tick 自然落在目标格。
        const overshoot = (targetRing - (TOTAL_STEPS - 1) % 8 + 8) % 8;
        const totalSteps = TOTAL_STEPS + overshoot; // 最多多跨 7 步，对减速段延迟影响可忽略

        let step = 0;
        let current = 0;

        function tick() {
            setActiveRing(CLOCKWISE[current % 8]);
            current++;
            step++;

            // 速度曲线：前20步加速，后20步减速
            let delay: number;
            if (step < 20) {
                delay = Math.max(30, BASE_SPEED - step * 3);
            } else {
                delay = BASE_SPEED + (step - 20) * 6;
            }

            if (step < totalSteps) { // [FIX] 根因: 用动态 totalSteps 替代固定 TOTAL_STEPS
                timerRef.current = setTimeout(tick, delay);
            } else {
                // 动画已自然停在 targetRing，此处 setActiveRing 为幂等操作（不再产生跳格）
                setActiveRing(targetRing);
                setSpinning(false);
                setTimeout(() => {
                    onWin(prizes[targetRing]); // [IMPL] 用 props.prizes 而非硬编码 PRIZES
                    setActiveRing(-1);
                }, 600);
            }
        }

        timerRef.current = setTimeout(tick, BASE_SPEED);
    }, [spinning, chances, onSpin, onWin, prizes]); // [FIX] 根因: prizes 缺失导致 stale closure，修复此隐患

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>

            {/* 九宫格 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 100px)',
                gridTemplateRows: 'repeat(3, 100px)',
                gap: 8,
            }}>
                {Array.from({ length: 9 }).map((_, cellIdx) => {
                    const isCenter = cellIdx === 4;
                    const ringIdx = CELL_TO_RING[cellIdx];
                    const prize = isCenter ? null : prizes[ringIdx]; // [IMPL] 用 props.prizes
                    const isActive = !isCenter && activeRing === ringIdx;

                    /* 中心开始按钮 */
                    if (isCenter) {
                        return (
                            <motion.button
                                key="center"
                                onClick={startSpin}
                                disabled={spinning || chances <= 0}
                                whileHover={!spinning && chances > 0 ? { scale: 1.08 } : {}}
                                whileTap={!spinning && chances > 0 ? { scale: 0.94 } : {}}
                                style={{
                                    background: spinning || chances <= 0
                                        ? 'linear-gradient(135deg, #888, #aaa)'
                                        : 'var(--btn-primary-bg)',
                                    border: 'none', borderRadius: 14,
                                    cursor: spinning || chances <= 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    boxShadow: spinning || chances <= 0
                                        ? 'none'
                                        : 'var(--shadow)',
                                    transition: 'background 0.4s, box-shadow 0.4s',
                                }}
                            >
                                <span style={{ fontSize: 28 }}>🎰</span>
                                <span style={{
                                    color: 'var(--text-inverse)', fontWeight: 800, fontSize: 15,
                                    fontFamily: 'Noto Serif SC',
                                    textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                                }}>
                                    {spinning ? '转动中' : chances <= 0 ? '无次数' : '开始'}
                                </span>
                            </motion.button>
                        );
                    }

                    /* 外圈奖品格 */
                    return (
                        <motion.div
                            key={cellIdx}
                            animate={isActive ? {
                                boxShadow: 'var(--glow)',
                                scale: 1.06,
                            } : {
                                boxShadow: 'none',
                                scale: 1,
                            }}
                            transition={{ duration: 0.12 }}
                            style={{
                                borderRadius: 14,
                                border: isActive ? `2px solid var(--accent)` : `2px solid var(--cell-border)`,
                                background: isActive ? 'var(--cell-active)' : 'var(--cell-bg)',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                gap: 4, padding: 4, overflow: 'hidden',
                                transition: 'border-color 0.4s, background 0.4s',
                            }}
                        >
                            <span style={{ fontSize: 28 }}>{prize?.icon}</span>
                            <span style={{
                                fontSize: 11, fontWeight: 600, lineHeight: 1.2,
                                color: isActive ? 'var(--text-inverse)' : 'var(--text-primary)',
                                textAlign: 'center', whiteSpace: 'pre-wrap',
                                transition: 'color 0.4s',
                            }}>
                                {prize?.name}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            {/* 次数提示 */}
            <p style={{
                color: 'var(--text-secondary)', fontSize: 13,
                textAlign: 'center', marginTop: 4,
                transition: 'color 0.4s',
            }}>
                {chances <= 0
                    ? '👆 点击「兑换次数」获取抽奖机会'
                    : `剩余抽奖机会：${chances} 次`}
            </p>

        </div>
    );
}

// ==============================================================
// [COMPONENT] WinModal
// [INPUT]     prize: Prize | null, onClose: () => void
// [OUTPUT]    中奖弹窗，AnimatePresence 弹出动画
// [POS]       frontend/src/app/lottery/components/WinModal.tsx
// [PROTOCOL]  变更时更新此头部，然后检查 frontend/CLAUDE.md
// [DEPS]      framer-motion, store
// ==============================================================
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type Prize } from '@/lib/types';

interface Props {
    prize: Prize | null;
    onClose: () => void;
}

export default function WinModal({ prize, onClose }: Props) {
    return (
        <AnimatePresence>
            {prize && (
                /* 遮罩 */
                <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 100,
                        background: 'rgba(0,0,0,0.65)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    {/* 弹窗卡片 */}
                    <motion.div
                        key="card"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fff',
                            borderRadius: 24,
                            padding: '0 0 32px',
                            width: 320,
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* 顶部金色条 */}
                        <div style={{
                            background: 'linear-gradient(135deg, #F4C430, #FF8C00)',
                            padding: '20px 0 16px',
                            marginBottom: 24,
                        }}>
                            <div style={{ fontSize: 56, lineHeight: 1 }}>{prize.icon}</div>
                            <p style={{ color: '#5A2D00', fontWeight: 700, fontSize: 18, marginTop: 8 }}>
                                🎊 恭喜中奖！🎊
                            </p>
                        </div>

                        <p style={{ color: '#C0392B', fontSize: 26, fontWeight: 700, fontFamily: 'Noto Serif SC' }}>
                            {prize.name}
                        </p>
                        <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>{prize.desc}</p>

                        {/* 确认按钮 */}
                        <button
                            onClick={onClose}
                            style={{
                                marginTop: 28,
                                background: 'linear-gradient(135deg, #C0392B, #E74C3C)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 50,
                                padding: '14px 56px',
                                fontSize: 16,
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 6px 20px rgba(192,57,43,0.5)',
                                transition: 'transform 0.1s',
                            }}
                            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
                            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {prize.type === 'none' ? '好的，再接再厉' : '开心收下 🎉'}
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

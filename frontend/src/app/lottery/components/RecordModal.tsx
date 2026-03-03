// ==============================================================
// [COMPONENT] RecordModal
// [INPUT]     isOpen: boolean, onClose: () => void, records: WinRecord[]
// [OUTPUT]    中奖记录列表弹窗
// [POS]       frontend/src/app/lottery/components/RecordModal.tsx
// [PROTOCOL]  变更时更新此头部，然后检查 frontend/CLAUDE.md
// [DEPS]      framer-motion, store
// ==============================================================
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type WinRecord } from '@/lib/types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    records: WinRecord[];
}

function formatTime(iso: string) {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function RecordModal({ isOpen, onClose, records }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 100,
                        background: 'rgba(0,0,0,0.65)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                        exit={{ y: 60, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fff', borderRadius: 20,
                            width: 340, maxHeight: '70vh',
                            overflow: 'hidden', display: 'flex', flexDirection: 'column',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                        }}
                    >
                        {/* 标题 */}
                        <div style={{
                            background: 'linear-gradient(135deg, #C0392B, #E74C3C)',
                            padding: '20px 24px', display: 'flex',
                            justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>
                                🏆 中奖记录
                            </h2>
                            <button
                                onClick={onClose}
                                style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}
                            >×</button>
                        </div>

                        {/* 内容 */}
                        <div style={{ overflowY: 'auto', flex: 1, padding: records.length ? '8px 0' : '40px 24px' }}>
                            {records.length === 0 ? (
                                <div style={{ textAlign: 'center', color: '#bbb' }}>
                                    <div style={{ fontSize: 48, marginBottom: 12 }}>🎟️</div>
                                    <p style={{ fontSize: 14 }}>暂无中奖记录</p>
                                    <p style={{ fontSize: 12, marginTop: 6 }}>快去参与抽奖吧！</p>
                                </div>
                            ) : (
                                records.map((r, i) => (
                                    <motion.div
                                        key={r.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04 } }}
                                        style={{
                                            display: 'flex', alignItems: 'center',
                                            padding: '12px 20px', gap: 14,
                                            borderBottom: '1px solid #f5f5f5',
                                        }}
                                    >
                                        <div style={{ fontSize: 28 }}>{r.prize.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ color: '#333', fontWeight: 600, fontSize: 14 }}>{r.prize.name}</p>
                                            <p style={{ color: '#999', fontSize: 12 }}>{r.prize.desc}</p>
                                        </div>
                                        <p style={{ color: '#bbb', fontSize: 11 }}>{formatTime(r.time)}</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

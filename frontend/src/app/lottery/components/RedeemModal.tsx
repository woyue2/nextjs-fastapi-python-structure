// ==============================================================
// [COMPONENT] RedeemModal
// [INPUT]     isOpen: boolean, onClose: () => void, onRedeem: (code) => {ok, msg}
// [OUTPUT]    兑换码输入弹窗
// [POS]       frontend/src/app/lottery/components/RedeemModal.tsx
// [PROTOCOL]  变更时更新此头部，然后检查 frontend/CLAUDE.md
// [DEPS]      framer-motion
// ==============================================================
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onRedeem: (code: string) => { ok: boolean; msg: string };
}

export default function RedeemModal({ isOpen, onClose, onRedeem }: Props) {
    const [code, setCode] = useState('');
    const [msg, setMsg] = useState('');
    const [ok, setOk] = useState<boolean | null>(null);

    function handleSubmit() {
        if (!code.trim()) { setMsg('请输入兑换码'); setOk(false); return; }
        const result = onRedeem(code);
        setMsg(result.msg);
        setOk(result.ok);
        if (result.ok) { setCode(''); setTimeout(onClose, 1400); }
    }

    function handleClose() {
        setCode(''); setMsg(''); setOk(null);
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={handleClose}
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
                            padding: '28px 32px', width: 320,
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                        }}
                    >
                        <h2 style={{ color: '#C0392B', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                            🎟️ 兑换抽奖次数
                        </h2>
                        <p style={{ color: '#999', fontSize: 13, marginBottom: 20 }}>
                            输入兑换码，获得抽奖机会
                        </p>

                        <input
                            value={code}
                            onChange={e => setCode(e.target.value.toUpperCase())}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            maxLength={10}
                            placeholder="例如：LUCKY001"
                            style={{
                                width: '100%', padding: '12px 16px',
                                border: '2px solid #e0e0e0', borderRadius: 10,
                                fontSize: 16, textAlign: 'center', letterSpacing: 3,
                                outline: 'none', fontWeight: 600, color: '#333',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={e => (e.target.style.borderColor = '#C0392B')}
                            onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
                        />

                        {msg && (
                            <p style={{
                                marginTop: 10, fontSize: 13, fontWeight: 600,
                                color: ok ? '#27AE60' : '#E74C3C',
                            }}>
                                {ok ? '✅ ' : '❌ '}{msg}
                            </p>
                        )}

                        <button
                            onClick={handleSubmit}
                            style={{
                                marginTop: 20, width: '100%',
                                background: 'linear-gradient(135deg, #C0392B, #E74C3C)',
                                color: '#fff', border: 'none', borderRadius: 50,
                                padding: '13px 0', fontSize: 15, fontWeight: 700,
                                cursor: 'pointer', transition: 'opacity 0.2s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                        >
                            立即兑换
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

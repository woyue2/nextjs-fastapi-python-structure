// ==============================================================
// [COMPONENT] LotteryPage (Client shell)
// [INPUT]     none
// [OUTPUT]    完整抽奖页面：九宫格 + 按钮栏 + 三个弹窗 + 主题切换器
// [POS]       frontend/src/app/lottery/page.tsx
// [PROTOCOL]  变更时更新此头部，然后检查 frontend/CLAUDE.md
// [DEPS]      LotteryGrid, WinModal, RedeemModal, RecordModal, store, ThemeSwitcher
// ==============================================================
'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useLotteryStore, type Prize } from './store';

// 动态导入（避免 SSR 问题）
const LotteryGrid = dynamic(() => import('./components/LotteryGrid'), { ssr: false });
const WinModal = dynamic(() => import('./components/WinModal'), { ssr: false });
const RedeemModal = dynamic(() => import('./components/RedeemModal'), { ssr: false });
const RecordModal = dynamic(() => import('./components/RecordModal'), { ssr: false });
const ThemeSwitcher = dynamic(() => import('./components/ThemeSwitcher'), { ssr: false });

export default function LotteryPage() {
    const { chances, records, mounted, prizes, redeemCode, spendChance, addRecord } = useLotteryStore();

    const [winPrize, setWinPrize] = useState<Prize | null>(null);
    const [showRedeem, setShowRedeem] = useState(false);
    const [showRecord, setShowRecord] = useState(false);

    const handleSpin = useCallback(() => { spendChance(); }, [spendChance]);
    const handleWin = useCallback((p: Prize) => {
        addRecord(p);
        setWinPrize(p);
    }, [addRecord]);

    return (
        <main style={{
            position: 'relative', zIndex: 1,
            minHeight: '100vh', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '32px 16px',
        }}>

            {/* 顶部标题区 */}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <div style={{ fontSize: 52, marginBottom: 8 }}>🎡</div>
                <h1 style={{
                    fontFamily: 'Noto Serif SC', fontWeight: 700,
                    fontSize: 32, color: 'var(--accent)',
                    textShadow: '0 2px 12px var(--accent-glow)',
                    letterSpacing: 4,
                    transition: 'color 0.4s, text-shadow 0.4s',
                }}>
                    幸运福利抽奖
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 6, transition: 'color 0.4s' }}>
                    使用兑换码获取抽奖机会，好运连连 🍀
                </p>
            </div>

            {/* 主转盘区 */}
            <div style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(12px)',
                borderRadius: 28,
                border: '1px solid var(--card-border)',
                padding: '28px 24px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                transition: 'border-color 0.4s',
            }}>
                {mounted ? (
                    <LotteryGrid
                        chances={chances}
                        prizes={prizes}
                        onSpin={handleSpin}
                        onWin={handleWin}
                    />
                ) : (
                    /* SSR 骨架占位 */
                    <div style={{
                        width: 332, height: 332,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-muted)', fontSize: 14,
                    }}>
                        加载中…
                    </div>
                )}
            </div>

            {/* 底部按钮栏 */}
            <div style={{
                display: 'flex', gap: 16, marginTop: 28, flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                <ActionBtn icon="🎟️" label="兑换次数" onClick={() => setShowRedeem(true)} primary />
                <ActionBtn icon="📋" label="中奖记录" onClick={() => setShowRecord(true)} />
                <ActionBtn icon="⚙️" label="后台管理" onClick={() => window.location.href = '/admin'} />
            </div>

            {/* 说明文字 */}
            <div style={{
                marginTop: 32, padding: '16px 24px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 14, maxWidth: 360,
                border: '1px solid var(--card-border-subtle)',
                transition: 'border-color 0.4s',
            }}>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', lineHeight: 1.8, transition: 'color 0.4s' }}>
                    测试兑换码：LUCKY001 / LUCKY002 / STAR777<br />
                    每个兑换码仅可使用一次 · 中奖结果本地保存
                </p>
            </div>

            {/* 弹窗 */}
            <WinModal prize={winPrize} onClose={() => setWinPrize(null)} />
            <RedeemModal isOpen={showRedeem} onClose={() => setShowRedeem(false)} onRedeem={redeemCode} />
            <RecordModal isOpen={showRecord} onClose={() => setShowRecord(false)} records={records} />

            {/* 主题切换器（右下角浮动面板） */}
            <ThemeSwitcher />
        </main>
    );
}

/* 底部动作按钮 */
function ActionBtn({
    icon, label, onClick, primary = false
}: { icon: string; label: string; onClick: () => void; primary?: boolean }) {
    return (
        <button
            onClick={onClick}
            style={{
                background: primary
                    ? 'var(--btn-primary-bg)'
                    : 'var(--btn-secondary-bg)',
                color: primary ? 'var(--text-inverse)' : 'var(--text-primary)',
                border: primary ? 'none' : `1px solid var(--btn-secondary-border)`,
                borderRadius: 50,
                padding: '12px 28px',
                fontSize: 14, fontWeight: 700,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                boxShadow: primary ? `0 6px 20px var(--btn-primary-shadow)` : 'none',
                transition: 'transform 0.15s, opacity 0.15s, background 0.4s, box-shadow 0.4s',
                backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
            <span style={{ fontSize: 18 }}>{icon}</span>
            {label}
        </button>
    );
}

// ==============================================================
// [COMPONENT] LotteryPage (Client shell)
// [INPUT]     none
// [OUTPUT]    完整抽奖页面：九宫格 + 按钮栏 + 三个弹窗
// [POS]       frontend/src/app/lottery/page.tsx
// [DEPS]      LotteryGrid, WinModal, RedeemModal, RecordModal, store
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

export default function LotteryPage() {
    // [IMPL] 原因: 新增 prizes、updatePrizes、setAdminChances 解构，支持后台修改后即时生效
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
                    fontSize: 32, color: '#F4C430',
                    textShadow: '0 2px 12px rgba(244,196,48,0.6)',
                    letterSpacing: 4,
                }}>
                    幸运福利抽奖
                </h1>
                <p style={{ color: 'rgba(255,248,238,0.65)', fontSize: 13, marginTop: 6 }}>
                    使用兑换码获取抽奖机会，好运连连 🍀
                </p>
            </div>

            {/* 主转盘区 */}
            <div style={{
                background: 'rgba(0,0,0,0.25)',
                backdropFilter: 'blur(12px)',
                borderRadius: 28,
                border: '1px solid rgba(244,196,48,0.25)',
                padding: '28px 24px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>
                {mounted ? (
                    <LotteryGrid
                        chances={chances}
                        prizes={prizes}  // [IMPL] 原因: 传入可被后台覆盖的奖品集
                        onSpin={handleSpin}
                        onWin={handleWin}
                    />
                ) : (
                    /* SSR 骨架占位 */
                    <div style={{
                        width: 332, height: 332,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(255,248,238,0.4)', fontSize: 14,
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
                {/* [IMPL] 原因: 后台管理入口，低调样式避免误操作 */}
                <ActionBtn icon="⚙️" label="后台管理" onClick={() => window.location.href = '/admin'} />
            </div>

            {/* 说明文字 */}
            <div style={{
                marginTop: 32, padding: '16px 24px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 14, maxWidth: 360,
                border: '1px solid rgba(244,196,48,0.15)',
            }}>
                <p style={{ color: 'rgba(255,248,238,0.55)', fontSize: 12, textAlign: 'center', lineHeight: 1.8 }}>
                    测试兑换码：LUCKY001 / LUCKY002 / STAR777<br />
                    每个兑换码仅可使用一次 · 中奖结果本地保存
                </p>
            </div>

            {/* 弹窗 */}
            <WinModal prize={winPrize} onClose={() => setWinPrize(null)} />
            <RedeemModal isOpen={showRedeem} onClose={() => setShowRedeem(false)} onRedeem={redeemCode} />
            <RecordModal isOpen={showRecord} onClose={() => setShowRecord(false)} records={records} />
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
                    ? 'linear-gradient(135deg, #F4C430, #FF8C00)'
                    : 'rgba(255,255,255,0.12)',
                color: primary ? '#5A2D00' : 'rgba(255,248,238,0.9)',
                border: primary ? 'none' : '1px solid rgba(244,196,48,0.3)',
                borderRadius: 50,
                padding: '12px 28px',
                fontSize: 14, fontWeight: 700,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                boxShadow: primary ? '0 6px 20px rgba(244,196,48,0.45)' : 'none',
                transition: 'transform 0.15s, opacity 0.15s',
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

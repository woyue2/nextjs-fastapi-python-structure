/**
 * [INPUT]:    useLotteryStore (prizes, chances, updatePrizes, setAdminChances)
 * [OUTPUT]:   后台管理页面：奖品编辑 + 抽奖次数配置
 * [POS]:      frontend/src/app/admin/page.tsx — 路由 /admin
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLotteryStore } from '@/hooks/useLotteryStore';
import { type Prize } from '@/lib/types';

// 动态导入避免 SSR（依赖 localStorage）
const PrizeEditor = dynamic(() => import('./components/PrizeEditor'), { ssr: false });
const ChanceEditor = dynamic(() => import('./components/ChanceEditor'), { ssr: false });

type Tab = 'prizes' | 'chances';

export default function AdminPage() {
    const { prizes, chances, mounted, updatePrizes, setAdminChances } = useLotteryStore();

    const [tab, setTab] = useState<Tab>('prizes');
    // 本地草稿，点「保存」才实际写入 store/localStorage
    const [draft, setDraft] = useState<Prize[] | null>(null);
    const [saveMsg, setSaveMsg] = useState('');

    // 当前展示的奖品（未保存时展示草稿）
    const displayPrizes = draft ?? prizes;

    function handlePrizeSave() {
        if (!draft) return;
        updatePrizes(draft);
        setDraft(null);
        flash('✅ 奖品已保存，返回抽奖页立即生效');
    }

    function handlePrizeReset() {
        setDraft(null);
        flash('🔄 已恢复为上次保存的配置');
    }

    function flash(msg: string) {
        setSaveMsg(msg);
        setTimeout(() => setSaveMsg(''), 2500);
    }

    /* ---- 样式常量 ---- */
    const card: React.CSSProperties = {
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(16px)',
        borderRadius: 20,
        border: '1px solid rgba(244,196,48,0.2)',
        padding: 28,
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    };

    const tabBtn = (active: boolean): React.CSSProperties => ({
        background: active ? 'linear-gradient(135deg,#F4C430,#FF8C00)' : 'rgba(255,255,255,0.06)',
        color: active ? '#5A2D00' : 'rgba(255,248,238,0.7)',
        border: active ? 'none' : '1px solid rgba(244,196,48,0.2)',
        borderRadius: 10,
        padding: '10px 24px',
        fontSize: 14, fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.2s',
    });

    return (
        <main style={{
            position: 'relative', zIndex: 1,
            minHeight: '100vh',
            padding: '32px 16px',
            maxWidth: 860,
            margin: '0 auto',
        }}>

            {/* 顶部标题栏 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                    <h1 style={{
                        fontFamily: 'Noto Serif SC', fontWeight: 700,
                        fontSize: 28, color: '#F4C430',
                        textShadow: '0 2px 10px rgba(244,196,48,0.5)',
                    }}>
                        ⚙️ 抽奖后台管理
                    </h1>
                    <p style={{ color: 'rgba(255,248,238,0.45)', fontSize: 13, marginTop: 4 }}>
                        修改后存储于本地，返回抽奖页即时生效
                    </p>
                </div>
                <Link
                    href="/lottery"
                    style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(244,196,48,0.25)',
                        color: 'rgba(255,248,238,0.8)',
                        borderRadius: 50,
                        padding: '10px 22px',
                        fontSize: 13, fontWeight: 600,
                        textDecoration: 'none',
                        backdropFilter: 'blur(8px)',
                        transition: 'transform 0.15s',
                        display: 'inline-block',
                    }}
                >
                    ← 返回抽奖页
                </Link>
            </div>

            {/* 状态提示 */}
            {saveMsg && (
                <div style={{
                    marginBottom: 16,
                    padding: '12px 20px',
                    background: 'rgba(46,204,113,0.15)',
                    border: '1px solid rgba(46,204,113,0.4)',
                    borderRadius: 10,
                    color: '#2ecc71',
                    fontWeight: 600,
                    fontSize: 14,
                }}>
                    {saveMsg}
                </div>
            )}

            {/* Tab 切换 */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <button style={tabBtn(tab === 'prizes')} onClick={() => setTab('prizes')}>🎁 奖品管理</button>
                <button style={tabBtn(tab === 'chances')} onClick={() => setTab('chances')}>🎟️ 抽奖次数</button>
            </div>

            {/* 内容区 */}
            {!mounted ? (
                <div style={{ textAlign: 'center', color: 'rgba(255,248,238,0.4)', padding: 60 }}>加载中…</div>
            ) : tab === 'prizes' ? (

                /* ---- 奖品管理 ---- */
                <div style={card}>
                    <h2 style={{ color: '#F4C430', fontSize: 16, fontWeight: 700, marginBottom: 18 }}>
                        奖品列表 &nbsp;
                        <span style={{ color: 'rgba(255,248,238,0.4)', fontSize: 12, fontWeight: 400 }}>
                            （共 {displayPrizes.length} 个，最多 8 个）
                        </span>
                    </h2>

                    <PrizeEditor prizes={displayPrizes} onChange={setDraft} />

                    {/* 操作栏 */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                        <button
                            onClick={handlePrizeSave}
                            disabled={!draft}
                            style={{
                                background: draft ? 'linear-gradient(135deg,#C0392B,#E74C3C)' : 'rgba(255,255,255,0.06)',
                                color: draft ? '#fff' : 'rgba(255,255,255,0.3)',
                                border: 'none', borderRadius: 8,
                                fontWeight: 700, padding: '11px 28px',
                                fontSize: 14, cursor: draft ? 'pointer' : 'not-allowed',
                                transition: 'opacity 0.2s',
                            }}
                        >
                            保存奖品
                        </button>
                        <button
                            onClick={handlePrizeReset}
                            disabled={!draft}
                            style={{
                                background: 'rgba(255,255,255,0.06)',
                                color: draft ? 'rgba(255,248,238,0.7)' : 'rgba(255,255,255,0.25)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 8,
                                fontWeight: 600, padding: '11px 22px',
                                fontSize: 14, cursor: draft ? 'pointer' : 'not-allowed',
                            }}
                        >
                            撤销修改
                        </button>
                        {draft && (
                            <span style={{ color: 'rgba(255,200,50,0.7)', fontSize: 13, alignSelf: 'center' }}>
                                ⚠️ 有未保存的修改
                            </span>
                        )}
                    </div>
                </div>

            ) : (

                /* ---- 抽奖次数 ---- */
                <div style={card}>
                    <h2 style={{ color: '#F4C430', fontSize: 16, fontWeight: 700, marginBottom: 18 }}>
                        抽奖次数配置
                    </h2>
                    <ChanceEditor
                        chances={chances}
                        onSet={n => { setAdminChances(n); flash(`✅ 已设置为 ${n} 次，抽奖页即时生效`); }}
                    />
                </div>

            )}
        </main>
    );
}

/**
 * [INPUT]:    chances: number, onSet: (n: number) => void
 * [OUTPUT]:   抽奖次数编辑器：输入框 + 快捷按钮 + 确认
 * [POS]:      frontend/src/app/admin/ 的子组件，被 AdminPage 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
'use client';

import { useState } from 'react';

interface Props {
    chances: number;
    onSet: (n: number) => void;
}

const PRESETS = [1, 3, 5, 10, 20];

export default function ChanceEditor({ chances, onSet }: Props) {
    const [input, setInput] = useState(String(chances));
    const [saved, setSaved] = useState(false);

    function commit(val: number) {
        const n = Math.max(0, Math.min(999, val));
        setInput(String(n));
        onSet(n);
        setSaved(true);
        setTimeout(() => setSaved(false), 1800);
    }

    return (
        <div>
            {/* 当前次数说明 */}
            <p style={{ color: 'rgba(255,248,238,0.55)', fontSize: 13, marginBottom: 16 }}>
                当前抽奖次数：
                <span style={{ color: '#F4C430', fontWeight: 700, fontSize: 18 }}>{chances}</span> 次
                &nbsp;·&nbsp;修改后实时生效，不用刷新抽奖页
            </p>

            {/* 快捷按钮 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {PRESETS.map(n => (
                    <button
                        key={n}
                        onClick={() => commit(n)}
                        style={{
                            background: chances === n
                                ? 'linear-gradient(135deg,#F4C430,#FF8C00)'
                                : 'rgba(255,255,255,0.08)',
                            color: chances === n ? '#5A2D00' : 'rgba(255,248,238,0.8)',
                            border: '1px solid rgba(244,196,48,0.3)',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontSize: 14, fontWeight: 700,
                            cursor: 'pointer',
                        }}
                    >
                        {n} 次
                    </button>
                ))}
            </div>

            {/* 自定义输入 */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                    type="number" min={0} max={999}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && commit(Number(input))}
                    style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '2px solid rgba(244,196,48,0.4)',
                        borderRadius: 8,
                        color: '#f0e6d3',
                        padding: '10px 14px',
                        fontSize: 18, fontWeight: 700,
                        width: 100, textAlign: 'center',
                        outline: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#F4C430')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(244,196,48,0.4)')}
                />
                <button
                    onClick={() => commit(Number(input))}
                    style={{
                        background: saved
                            ? 'linear-gradient(135deg,#2ecc71,#27ae60)'
                            : 'linear-gradient(135deg,#C0392B,#E74C3C)',
                        border: 'none', borderRadius: 8,
                        color: '#fff', fontWeight: 700,
                        padding: '10px 24px', fontSize: 14,
                        cursor: 'pointer', transition: 'background 0.3s',
                    }}
                >
                    {saved ? '✅ 已保存' : '设置次数'}
                </button>
            </div>
        </div>
    );
}

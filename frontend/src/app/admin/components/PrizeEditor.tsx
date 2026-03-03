/**
 * [INPUT]:    prizes: Prize[], onChange: (p: Prize[]) => void
 * [OUTPUT]:   奖品编辑表格，支持增删改（内联编辑）
 * [POS]:      frontend/src/app/admin/ 的子组件，被 AdminPage 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
'use client';

import { type Prize, type PrizeType } from '@/lib/types';

interface Props {
    prizes: Prize[];
    onChange: (prizes: Prize[]) => void;
}

const ICONS = ['💰', '🎁', '🎀', '📱', '🌟', '🎈', '🥚', '🎉', '🏆', '🎮', '👑', '🍀'];
const TYPE_OPTIONS: { value: PrizeType; label: string }[] = [
    { value: 'cash', label: '现金' },
    { value: 'goods', label: '实物' },
    { value: 'none', label: '无奖品' },
];

export default function PrizeEditor({ prizes, onChange }: Props) {

    function update(idx: number, field: keyof Prize, value: unknown) {
        const next = prizes.map((p, i) => i === idx ? { ...p, [field]: value } : p);
        onChange(next);
    }

    function addRow() {
        const maxId = prizes.reduce((m, p) => Math.max(m, p.id), -1);
        onChange([...prizes, { id: maxId + 1, name: '新奖品', desc: '', icon: '🎁', type: 'goods', odds: 10 }]);
    }

    function deleteRow(idx: number) {
        onChange(prizes.filter((_, i) => i !== idx));
    }

    const cell: React.CSSProperties = {
        padding: '10px 8px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        fontSize: 13,
        color: '#f0e6d3',
        verticalAlign: 'middle',
    };

    const inputStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,200,50,0.25)',
        borderRadius: 6,
        color: '#f0e6d3',
        padding: '4px 8px',
        fontSize: 13,
        width: '100%',
        outline: 'none',
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.4)' }}>
                        {['图标', '名称', '描述', '类型', '权重', '操作'].map(h => (
                            <th key={h} style={{ ...cell, fontWeight: 700, color: '#F4C430', whiteSpace: 'nowrap' }}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {prizes.map((p, i) => (
                        <tr key={p.id} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>

                            {/* 图标选择 */}
                            <td style={{ ...cell, width: 70 }}>
                                <select
                                    value={p.icon}
                                    onChange={e => update(i, 'icon', e.target.value)}
                                    style={{ ...inputStyle, width: 58, textAlign: 'center', fontSize: 18, padding: '2px 4px' }}
                                >
                                    {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                </select>
                            </td>

                            {/* 名称 */}
                            <td style={{ ...cell, width: 110 }}>
                                <input
                                    value={p.name}
                                    onChange={e => update(i, 'name', e.target.value)}
                                    style={{ ...inputStyle, width: 100 }}
                                    maxLength={8}
                                />
                            </td>

                            {/* 描述 */}
                            <td style={{ ...cell, minWidth: 120 }}>
                                <input
                                    value={p.desc}
                                    onChange={e => update(i, 'desc', e.target.value)}
                                    style={inputStyle}
                                    maxLength={20}
                                />
                            </td>

                            {/* 类型 */}
                            <td style={{ ...cell, width: 80 }}>
                                <select
                                    value={p.type}
                                    onChange={e => update(i, 'type', e.target.value as PrizeType)}
                                    style={{ ...inputStyle, width: 72 }}
                                >
                                    {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </td>

                            {/* 权重 */}
                            <td style={{ ...cell, width: 72 }}>
                                <input
                                    type="number" min={1} max={100}
                                    value={p.odds}
                                    onChange={e => update(i, 'odds', Math.max(1, Number(e.target.value)))}
                                    style={{ ...inputStyle, width: 60, textAlign: 'center' }}
                                />
                            </td>

                            {/* 操作 */}
                            <td style={{ ...cell, width: 60, textAlign: 'center' }}>
                                <button
                                    onClick={() => deleteRow(i)}
                                    disabled={prizes.length <= 2}
                                    title={prizes.length <= 2 ? '至少保留 2 个奖品' : '删除'}
                                    style={{
                                        background: 'rgba(255,80,80,0.18)',
                                        border: '1px solid rgba(255,80,80,0.4)',
                                        color: '#ff8080',
                                        borderRadius: 6,
                                        padding: '4px 10px',
                                        cursor: prizes.length <= 2 ? 'not-allowed' : 'pointer',
                                        fontSize: 12,
                                        opacity: prizes.length <= 2 ? 0.4 : 1,
                                    }}
                                >
                                    删除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 权重说明 + 新增按钮 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <p style={{ color: 'rgba(255,248,238,0.4)', fontSize: 12 }}>
                    权重越大中奖概率越高，总权重 = {prizes.reduce((s, p) => s + p.odds, 0)}
                </p>
                <button
                    onClick={addRow}
                    disabled={prizes.length >= 8}
                    title={prizes.length >= 8 ? '最多 8 个奖品（九宫格外圈格数）' : '新增奖品'}
                    style={{
                        background: 'linear-gradient(135deg,#2ecc71,#27ae60)',
                        border: 'none', borderRadius: 8,
                        color: '#fff', fontWeight: 700,
                        padding: '8px 20px', cursor: prizes.length >= 8 ? 'not-allowed' : 'pointer',
                        opacity: prizes.length >= 8 ? 0.5 : 1,
                        fontSize: 13,
                    }}
                >
                    + 新增奖品
                </button>
            </div>
        </div>
    );
}

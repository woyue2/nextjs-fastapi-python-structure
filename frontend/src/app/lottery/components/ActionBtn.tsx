/**
 * [COMPONENT] ActionBtn
 * [INPUT]     icon, label, onClick, primary
 * [OUTPUT]    底部动作按钮（圆角胶囊形）
 * [POS]       frontend/src/app/lottery/components/ActionBtn.tsx
 * [PROTOCOL]  变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
'use client';

interface ActionBtnProps {
    icon: string;
    label: string;
    onClick: () => void;
    primary?: boolean;
}

export default function ActionBtn({ icon, label, onClick, primary = false }: ActionBtnProps) {
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

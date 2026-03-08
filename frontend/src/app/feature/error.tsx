/**
 * [INPUT]:    Next.js error boundary props (error, reset)
 * [OUTPUT]:   通用错误边界页面
 * [POS]:      frontend/src/app/feature/error.tsx
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
'use client';

export default function FeatureError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>出错了</h2>
            <p style={{ color: '#999', fontSize: 14 }}>{error.message}</p>
            <button onClick={reset} style={{ padding: '10px 24px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                重试
            </button>
        </div>
    );
}

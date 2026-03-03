/**
 * [INPUT]:    error: Error, reset: () => void
 * [OUTPUT]:   全局错误边界 UI
 * [POS]:      frontend/src/app/error.tsx — 根级 error boundary
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: '#E74C3C', padding: 24,
        }}>
            <div style={{ textAlign: 'center', maxWidth: 400 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>出错了</h2>
                <p style={{ fontSize: 14, color: '#999', marginBottom: 20 }}>
                    {error.message || '页面加载失败，请重试'}
                </p>
                <button
                    onClick={reset}
                    style={{
                        background: 'linear-gradient(135deg, #C0392B, #E74C3C)',
                        color: '#fff', border: 'none', borderRadius: 50,
                        padding: '12px 36px', fontSize: 14, fontWeight: 700,
                        cursor: 'pointer',
                    }}
                >
                    重试
                </button>
            </div>
        </div>
    );
}

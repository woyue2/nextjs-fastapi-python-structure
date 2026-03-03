/**
 * [INPUT]:    无
 * [OUTPUT]:   全局 Suspense loading fallback
 * [POS]:      frontend/src/app/loading.tsx — 根级 loading
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
export default function Loading() {
    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary, #999)', fontSize: 16,
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 12, animation: 'spin 1.2s linear infinite' }}>🎡</div>
                <p>加载中…</p>
            </div>
        </div>
    );
}

/**
 * [INPUT]:    无
 * [OUTPUT]:   后台管理页 Suspense loading fallback
 * [POS]:      frontend/src/app/admin/loading.tsx — admin loading
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
export default function AdminLoading() {
    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary, #999)', fontSize: 16,
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 12, animation: 'spin 1.2s linear infinite' }}>⚙️</div>
                <p>正在加载管理后台…</p>
            </div>
        </div>
    );
}

/**
 * [INPUT]:    无
 * [OUTPUT]:   抽奖页 Suspense loading fallback
 * [POS]:      frontend/src/app/lottery/loading.tsx — lottery loading
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
export default function LotteryLoading() {
    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary, #999)', fontSize: 16,
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 12, animation: 'spin 1.2s linear infinite' }}>🎰</div>
                <p>正在加载抽奖…</p>
            </div>
        </div>
    );
}

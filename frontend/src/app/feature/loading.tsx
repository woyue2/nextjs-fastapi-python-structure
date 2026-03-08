/**
 * [INPUT]:    Next.js Suspense loading state
 * [OUTPUT]:   通用加载骨架屏
 * [POS]:      frontend/src/app/feature/loading.tsx
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
export default function FeatureLoading() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#999', fontSize: 14 }}>加载中…</p>
        </div>
    );
}

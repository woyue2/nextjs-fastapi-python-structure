/**
 * [INPUT]:    none
 * [OUTPUT]:   项目首页导航，提供抽奖页 & 后台管理两个入口
 * [POS]:      frontend/src/app/page.tsx — 路由 /
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{
      position: 'relative', zIndex: 1,
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, gap: 32,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>🎡</div>
        <h1 style={{
          fontFamily: 'Noto Serif SC', fontWeight: 700,
          fontSize: 36, color: '#F4C430',
          textShadow: '0 2px 14px rgba(244,196,48,0.6)',
          letterSpacing: 4,
        }}>
          幸运福利抽奖
        </h1>
        <p style={{ color: 'rgba(255,248,238,0.5)', fontSize: 14, marginTop: 8 }}>
          Anti-Huihuan · 本地化抽奖系统
        </p>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* [IMPL] 原因: 主入口 */}
        <Link
          href="/lottery"
          style={{
            background: 'linear-gradient(135deg,#F4C430,#FF8C00)',
            color: '#5A2D00',
            borderRadius: 50,
            padding: '16px 42px',
            fontSize: 16, fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 6px 24px rgba(244,196,48,0.5)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          🎰 进入抽奖
        </Link>

        {/* [IMPL] 原因: 后台管理入口 */}
        <Link
          href="/admin"
          style={{
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,248,238,0.85)',
            border: '1px solid rgba(244,196,48,0.3)',
            borderRadius: 50,
            padding: '16px 42px',
            fontSize: 16, fontWeight: 700,
            textDecoration: 'none',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          ⚙️ 后台管理
        </Link>
      </div>
    </main>
  );
}


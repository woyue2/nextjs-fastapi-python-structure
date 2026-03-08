/**
 * [INPUT]:    none
 * [OUTPUT]:   项目首页导航，提供各功能模块入口
 * [POS]:      frontend/src/app/page.tsx — 路由 /
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 */
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My App · Next.js + FastAPI',
  description: 'Next.js (App Router) + FastAPI 全栈项目模板',
};

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, gap: 32,
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          My App
        </h1>
        <p style={{ color: '#666', fontSize: 14 }}>
          Next.js (App Router) · TypeScript · FastAPI · Python
        </p>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* 主功能入口 — 替换 href 和文字为实际页面 */}
        <Link
          href="/feature"
          style={{
            background: '#0070f3',
            color: '#fff',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 16, fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          功能页面
        </Link>

        {/* 管理后台入口 */}
        <Link
          href="/admin"
          style={{
            background: '#f5f5f5',
            color: '#333',
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 16, fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          管理后台
        </Link>
      </div>
    </main>
  );
}

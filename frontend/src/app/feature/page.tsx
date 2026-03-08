/**
 * [INPUT]:    useAppStore (items, records, mounted, addRecord, updateItems)
 * [OUTPUT]:   功能主页面 — 展示 items 列表 + 操作区
 * [POS]:      frontend/src/app/feature/page.tsx — 路由 /feature
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 *
 * NOTE: 这是一个模板页面骨架。
 *       请将"feature"替换为你的实际路由名称，并在 TODO 处实现业务逻辑。
 */
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAppStore } from '@/hooks/useAppStore';

// TODO: 替换为你的实际子组件
// const MyComponent = dynamic(() => import('./components/MyComponent'), { ssr: false });

export default function FeaturePage() {
    const { items, records, mounted } = useAppStore();
    const [activeTab, setActiveTab] = useState<'list' | 'records'>('list');

    if (!mounted) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#999' }}>加载中…</p>
            </main>
        );
    }

    return (
        <main style={{
            minHeight: '100vh',
            padding: '32px 16px',
            maxWidth: 860,
            margin: '0 auto',
        }}>
            {/* 顶部导航 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>功能页面</h1>
                <Link href="/admin" style={{ fontSize: 14, color: '#666', textDecoration: 'none' }}>
                    ⚙️ 后台管理
                </Link>
            </div>

            {/* TODO: Tab 切换示例 */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <button
                    onClick={() => setActiveTab('list')}
                    style={{ fontWeight: activeTab === 'list' ? 700 : 400, cursor: 'pointer' }}
                >
                    数据列表
                </button>
                <button
                    onClick={() => setActiveTab('records')}
                    style={{ fontWeight: activeTab === 'records' ? 700 : 400, cursor: 'pointer' }}
                >
                    操作记录 ({records.length})
                </button>
            </div>

            {/* TODO: 内容区 — 替换为实际组件 */}
            {activeTab === 'list' ? (
                <div>
                    <p style={{ color: '#999', fontSize: 14, marginBottom: 16 }}>
                        共 {items.length} 条数据
                    </p>
                    {items.map((item) => (
                        <div key={item.id} style={{
                            padding: '16px',
                            border: '1px solid #e0e0e0',
                            borderRadius: 8,
                            marginBottom: 12,
                        }}>
                            <strong>{item.name}</strong>
                            <p style={{ color: '#666', fontSize: 14, margin: '4px 0 0' }}>{item.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {records.length === 0 ? (
                        <p style={{ color: '#999', fontSize: 14 }}>暂无记录</p>
                    ) : records.map((record) => (
                        <div key={record.id} style={{
                            padding: '12px 16px',
                            border: '1px solid #e0e0e0',
                            borderRadius: 8,
                            marginBottom: 8,
                            fontSize: 14,
                        }}>
                            <span style={{ color: '#333' }}>{record.item.name}</span>
                            <span style={{ color: '#999', float: 'right' }}>{record.createdAt}</span>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

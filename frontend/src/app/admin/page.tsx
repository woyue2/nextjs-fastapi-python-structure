/**
 * [INPUT]:    useAppStore (items, mounted, updateItems)
 * [OUTPUT]:   后台管理页面 — 数据配置 + 操作
 * [POS]:      frontend/src/app/admin/page.tsx — 路由 /admin
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 *
 * NOTE: 这是一个模板页面骨架。请在 TODO 处替换为实际的管理组件。
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/hooks/useAppStore';

export default function AdminPage() {
    const { items, mounted, updateItems } = useAppStore();
    const [saveMsg, setSaveMsg] = useState('');

    function flash(msg: string) {
        setSaveMsg(msg);
        setTimeout(() => setSaveMsg(''), 2500);
    }

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
            {/* 顶部标题栏 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700 }}>⚙️ 后台管理</h1>
                    <p style={{ color: '#999', fontSize: 13, marginTop: 4 }}>
                        在此处配置应用数据，保存后前端页面即时生效
                    </p>
                </div>
                <Link href="/feature" style={{ fontSize: 14, color: '#0070f3', textDecoration: 'none' }}>
                    ← 返回功能页
                </Link>
            </div>

            {/* 操作状态提示 */}
            {saveMsg && (
                <div style={{
                    marginBottom: 16,
                    padding: '12px 20px',
                    background: '#f0fff4',
                    border: '1px solid #b2f5c8',
                    borderRadius: 8,
                    color: '#22543d',
                    fontSize: 14,
                }}>
                    {saveMsg}
                </div>
            )}

            {/* TODO: 配置面板 — 在此处添加你的管理组件 */}
            <div style={{
                padding: 24,
                border: '1px solid #e0e0e0',
                borderRadius: 12,
            }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>数据管理</h2>
                <p style={{ color: '#999', fontSize: 14, marginBottom: 20 }}>
                    当前共有 {items.length} 条数据。
                    <br />
                    TODO: 在此处添加编辑/新增/删除等管理功能组件。
                </p>

                {/* 示例：重置按钮 */}
                <button
                    onClick={() => {
                        // TODO: 替换为实际的重置/保存逻辑
                        flash('✅ 已重置为默认配置');
                    }}
                    style={{
                        background: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '10px 24px',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    重置为默认
                </button>
            </div>
        </main>
    );
}

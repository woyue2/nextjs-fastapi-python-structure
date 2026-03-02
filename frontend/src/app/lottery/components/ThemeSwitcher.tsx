// ==============================================================
// [COMPONENT] ThemeSwitcher
// [INPUT]     none（读写 localStorage + DOM data-theme / body.class）
// [OUTPUT]    右下角浮动主题切换面板（折叠/展开）
// [POS]       frontend/src/app/lottery/components/ThemeSwitcher.tsx
// [DEPS]      react
// ==============================================================
'use client';

import { useState, useEffect, useCallback } from 'react';

// ── 主题配置表 ──
export type ThemeId = 'festival' | 'obsidian' | 'abyssal' | 'celadon' | 'sakura' | 'cyber';

interface ThemeMeta {
    id: ThemeId;
    label: string;
    emoji: string;
    /** 用于色块预览的渐变，与 CSS 主题匹配 */
    preview: string;
    /** 色块描边色 */
    border: string;
}

const THEMES: ThemeMeta[] = [
    {
        id: 'festival',
        label: '传统佳节',
        emoji: '🔴',
        preview: 'radial-gradient(135deg, #CC0000 0%, #8B0000 60%, #F4C430 100%)',
        border: '#F4C430',
    },
    {
        id: 'obsidian',
        label: '墨金之夜',
        emoji: '🌑',
        preview: 'radial-gradient(135deg, #0d0d0d 0%, #1a1400 60%, #D4AF37 100%)',
        border: '#D4AF37',
    },
    {
        id: 'abyssal',
        label: '深海幽光',
        emoji: '🔵',
        preview: 'radial-gradient(135deg, #07091e 0%, #0b0f2e 60%, #818CF8 100%)',
        border: '#818CF8',
    },
    {
        id: 'celadon',
        label: '松雾清境',
        emoji: '🌿',
        preview: 'radial-gradient(135deg, #030a07 0%, #0a1a14 60%, #86BB98 100%)',
        border: '#86BB98',
    },
    {
        id: 'sakura',
        label: '樱雪白瓷',
        emoji: '🌸',
        preview: 'radial-gradient(135deg, #0d060a 0%, #1a0d12 60%, #E8A0B8 100%)',
        border: '#E8A0B8',
    },
    {
        id: 'cyber',
        label: '赛博霓虹',
        emoji: '💜',
        preview: 'radial-gradient(135deg, #000008 0%, #0d0020 60%, #00FFFF 100%)',
        border: '#00FFFF',
    },
];

const LS_THEME = 'lottery_theme';
const LS_FX = 'lottery_fx';

export default function ThemeSwitcher() {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState<ThemeId>('festival');
    const [fx, setFx] = useState(true);
    const [mounted, setMounted] = useState(false);

    // 初始化：从 localStorage 读取
    useEffect(() => {
        const savedTheme = (localStorage.getItem(LS_THEME) as ThemeId) || 'festival';
        const savedFx = localStorage.getItem(LS_FX) !== 'off';
        setTheme(savedTheme);
        setFx(savedFx);
        applyTheme(savedTheme, savedFx);
        setMounted(true);
    }, []);

    const applyTheme = (t: ThemeId, fxOn: boolean) => {
        document.documentElement.setAttribute('data-theme', t);
        document.body.classList.toggle('no-fx', !fxOn);
    };

    const selectTheme = useCallback((t: ThemeId) => {
        setTheme(t);
        localStorage.setItem(LS_THEME, t);
        applyTheme(t, fx);
    }, [fx]);

    const toggleFx = useCallback(() => {
        const next = !fx;
        setFx(next);
        localStorage.setItem(LS_FX, next ? 'on' : 'off');
        applyTheme(theme, next);
    }, [fx, theme]);

    if (!mounted) return null;

    const currentTheme = THEMES.find(t => t.id === theme)!;

    return (
        <>
            {/* 背景遮罩（点击关闭面板） */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 90,
                    }}
                />
            )}

            {/* 主容器 */}
            <div style={{
                position: 'fixed',
                bottom: 24, right: 24,
                zIndex: 100,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12,
            }}>

                {/* 展开面板 */}
                <div style={{
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid var(--card-border)`,
                    borderRadius: 20,
                    padding: open ? '16px 18px' : 0,
                    width: open ? 220 : 0,
                    maxHeight: open ? 400 : 0,
                    overflow: 'hidden',
                    opacity: open ? 1 : 0,
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                    pointerEvents: open ? 'auto' : 'none',
                }}>

                    {/* 面板标题 */}
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        marginBottom: 14,
                        whiteSpace: 'nowrap',
                    }}>
                        外观主题
                    </p>

                    {/* 主题色块网格 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 10,
                        marginBottom: 16,
                    }}>
                        {THEMES.map(t => (
                            <button
                                key={t.id}
                                id={`theme-btn-${t.id}`}
                                title={t.label}
                                onClick={() => selectTheme(t.id)}
                                style={{
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', gap: 5,
                                    background: 'none', border: 'none',
                                    cursor: 'pointer', padding: 4,
                                    borderRadius: 10,
                                    transition: 'transform 0.15s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                {/* 色块 */}
                                <div style={{
                                    width: 44, height: 44,
                                    borderRadius: 12,
                                    background: t.preview,
                                    border: theme === t.id
                                        ? `2.5px solid ${t.border}`
                                        : '2px solid rgba(255,255,255,0.12)',
                                    boxShadow: theme === t.id
                                        ? `0 0 10px ${t.border}88, inset 0 0 6px rgba(0,0,0,0.3)`
                                        : 'inset 0 0 6px rgba(0,0,0,0.3)',
                                    transition: 'border 0.2s, box-shadow 0.2s',
                                    position: 'relative',
                                }}>
                                    {/* 已选中勾 */}
                                    {theme === t.id && (
                                        <span style={{
                                            position: 'absolute', inset: 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 16,
                                        }}>✓</span>
                                    )}
                                </div>
                                {/* 标签 */}
                                <span style={{
                                    color: theme === t.id ? t.border : 'var(--text-muted)',
                                    fontSize: 9.5,
                                    fontWeight: theme === t.id ? 700 : 400,
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.2s',
                                }}>
                                    {t.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* 分隔线 */}
                    <div style={{
                        height: 1,
                        background: 'var(--card-border)',
                        marginBottom: 14,
                        opacity: 0.4,
                    }} />

                    {/* 动态效果开关 */}
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <span style={{
                            color: 'var(--text-secondary)',
                            fontSize: 12,
                            userSelect: 'none',
                        }}>
                            ✨ 动态效果
                        </span>
                        {/* Toggle 开关 */}
                        <button
                            id="fx-toggle"
                            onClick={toggleFx}
                            style={{
                                width: 40, height: 22,
                                borderRadius: 11,
                                background: fx
                                    ? 'var(--btn-primary-bg)'
                                    : 'rgba(255,255,255,0.15)',
                                border: 'none',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'background 0.3s',
                                boxShadow: fx ? 'var(--shadow)' : 'none',
                                flexShrink: 0,
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 3,
                                left: fx ? 21 : 3,
                                width: 16, height: 16,
                                borderRadius: '50%',
                                background: '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }} />
                        </button>
                    </div>
                </div>

                {/* 触发按钮 */}
                <button
                    id="theme-switcher-btn"
                    onClick={() => setOpen(v => !v)}
                    title="外观主题"
                    style={{
                        width: 48, height: 48,
                        borderRadius: '50%',
                        background: open
                            ? 'var(--btn-primary-bg)'
                            : 'rgba(0,0,0,0.55)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid var(--card-border)`,
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20,
                        boxShadow: open
                            ? 'var(--glow), 0 4px 16px rgba(0,0,0,0.4)'
                            : '0 4px 16px rgba(0,0,0,0.4)',
                        transition: 'all 0.3s ease',
                        transform: open ? 'rotate(30deg)' : 'rotate(0deg)',
                    }}
                    onMouseEnter={e => {
                        if (!open) e.currentTarget.style.boxShadow = 'var(--shadow), 0 4px 20px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={e => {
                        if (!open) e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)';
                    }}
                >
                    {open ? '✕' : currentTheme.emoji}
                </button>
            </div>
        </>
    );
}

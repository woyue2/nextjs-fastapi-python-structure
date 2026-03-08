/**
 * [INPUT]:    item: Item (prop)
 * [OUTPUT]:   示例子组件 — 单个 Item 卡片展示
 * [POS]:      frontend/src/app/feature/components/ItemCard.tsx
 * [PROTOCOL]: 变更时更新此头部，然后检查 frontend/CLAUDE.md
 *
 * NOTE: 这是一个模板组件骨架。请根据实际业务扩展。
 */
import { type Item } from '@/lib/types';

interface Props {
    item: Item;
    onClick?: (item: Item) => void;
}

export default function ItemCard({ item, onClick }: Props) {
    return (
        <div
            onClick={() => onClick?.(item)}
            style={{
                padding: '16px 20px',
                border: '1px solid #e0e0e0',
                borderRadius: 10,
                cursor: onClick ? 'pointer' : 'default',
                transition: 'box-shadow 0.2s',
            }}
        >
            <strong style={{ fontSize: 15 }}>{item.name}</strong>
            <p style={{ color: '#666', fontSize: 13, margin: '4px 0 0' }}>{item.description}</p>
            <span style={{
                display: 'inline-block',
                marginTop: 8,
                fontSize: 11,
                padding: '2px 8px',
                background: '#f0f0f0',
                borderRadius: 4,
                color: '#666',
            }}>
                {item.type}
            </span>
        </div>
    );
}

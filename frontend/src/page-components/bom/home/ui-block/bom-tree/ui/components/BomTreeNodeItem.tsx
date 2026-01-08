'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  Package,
  Boxes,
  Cpu,
  ShoppingCart,
  Layers,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/shadcn/ui/collapsible';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { BomTreeNode } from '../BomTreeBlock';
import type { ItemType, ItemRev } from '@/shared/dummy-data/bom-v2';

interface BomTreeNodeItemProps {
  node: BomTreeNode;
  level: number;
  selectedItemRevId: string | null;
  onSelectNode: (itemRev: ItemRev) => void;
  defaultOpenLevel?: number;
  /** 検索関連props */
  searchQuery?: string;
  highlightedNodeId?: string | null;
  matchedNodeIds?: string[];
  forceExpandIds?: Set<string>;
}

export function BomTreeNodeItem({
  node,
  level,
  selectedItemRevId,
  onSelectNode,
  defaultOpenLevel = 2,
  searchQuery,
  highlightedNodeId,
  matchedNodeIds,
  forceExpandIds,
}: BomTreeNodeItemProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(level < defaultOpenLevel);

  const hasChildren = node.children.length > 0;
  const isSelected = selectedItemRevId === node.itemRev.id;
  const isHighlighted = highlightedNodeId === node.itemRev.id;
  const isMatched = matchedNodeIds?.includes(node.itemRev.id) ?? false;

  // forceExpandIdsで強制展開
  useEffect(() => {
    if (forceExpandIds?.has(node.itemRev.id)) {
      setIsOpen(true);
    }
  }, [forceExpandIds, node.itemRev.id]);

  // ハイライト時にスクロール
  useEffect(() => {
    if (isHighlighted && nodeRef.current) {
      nodeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [isHighlighted]);

  const Icon = getItemTypeIcon(node.item.itemType);
  const iconColor = getItemTypeColor(node.item.itemType);

  // 検索クエリでテキストをハイライト
  const highlightText = (text: string) => {
    if (!searchQuery || !searchQuery.trim()) return text;

    const lowerQuery = searchQuery.toLowerCase();
    const lowerText = text.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <mark className="bg-yellow-200 text-inherit">
          {text.substring(index, index + searchQuery.length)}
        </mark>
        {text.substring(index + searchQuery.length)}
      </>
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        ref={nodeRef}
        className={cn(
          'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-accent',
          isSelected && 'bg-accent',
          isHighlighted && 'ring-2 ring-primary',
          isMatched && !isHighlighted && 'bg-yellow-50'
        )}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onClick={() => onSelectNode(node.itemRev)}
      >
        {/* 展開/折りたたみボタン */}
        {hasChildren ? (
          <CollapsibleTrigger asChild>
            <button
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted"
              onClick={(e) => e.stopPropagation()}
            >
              <ChevronRight
                className={cn(
                  'h-5 w-5 transition-transform',
                  isOpen && 'rotate-90'
                )}
              />
            </button>
          </CollapsibleTrigger>
        ) : (
          <span className="h-6 w-6" />
        )}

        {/* アイコン */}
        <Icon className={cn('h-5 w-5', iconColor)} />

        {/* 品番・品名 */}
        <span className="flex-1 truncate text-base">
          {highlightText(node.item.partNumber)}
        </span>

        {/* 情報バッジ */}
        <span className="flex shrink-0 items-center gap-2">
          {node.quantity > 1 && (
            <span className="text-sm text-muted-foreground">
              ×{node.quantity}
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {getItemTypeLabel(node.item.itemType)}
          </span>
          <Badge variant="secondary">Rev.{node.itemRev.revision}</Badge>
        </span>
      </div>

      {/* 子ノード */}
      {hasChildren && (
        <CollapsibleContent>
          {node.children.map((child) => (
            <BomTreeNodeItem
              key={child.itemRev.id}
              node={child}
              level={level + 1}
              selectedItemRevId={selectedItemRevId}
              onSelectNode={onSelectNode}
              defaultOpenLevel={defaultOpenLevel}
              searchQuery={searchQuery}
              highlightedNodeId={highlightedNodeId}
              matchedNodeIds={matchedNodeIds}
              forceExpandIds={forceExpandIds}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}

function getItemTypeIcon(itemType: ItemType) {
  switch (itemType) {
    case 'Product':
      return Package;
    case 'Assembly':
      return Boxes;
    case 'Part':
      return Cpu;
    case 'Purchased':
      return ShoppingCart;
    case 'RawMaterial':
      return Layers;
    default:
      return Package;
  }
}

function getItemTypeColor(itemType: ItemType): string {
  switch (itemType) {
    case 'Product':
      return 'text-primary';
    case 'Assembly':
      return 'text-purple-500';
    case 'Part':
      return 'text-green-500';
    case 'Purchased':
      return 'text-orange-500';
    case 'RawMaterial':
      return 'text-gray-500';
    default:
      return 'text-muted-foreground';
  }
}

function getItemTypeLabel(itemType: ItemType): string {
  switch (itemType) {
    case 'Product':
      return '製品';
    case 'Assembly':
      return 'アセンブリ';
    case 'Part':
      return '部品';
    case 'Purchased':
      return '購入品';
    case 'RawMaterial':
      return '原材料';
    default:
      return itemType;
  }
}

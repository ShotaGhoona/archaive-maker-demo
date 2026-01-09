'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/shadcn/ui/collapsible';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { BomNavTreeNode } from '../BomNavigationPanel';

interface BomNavTreeNodeItemProps {
  node: BomNavTreeNode;
  level: number;
  currentItemRevId: string;
  onNavigate: (itemId: string) => void;
  defaultOpen?: boolean;
}

export function BomNavTreeNodeItem({
  node,
  level,
  currentItemRevId,
  onNavigate,
  defaultOpen = false,
}: BomNavTreeNodeItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const hasChildren = node.children.length > 0;
  const isCurrent = node.id === currentItemRevId;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          'flex cursor-pointer items-center gap-1 rounded-md px-2 py-1.5 hover:bg-accent',
          isCurrent && 'bg-accent font-medium'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          if (!isCurrent) {
            onNavigate(node.item.id);
          }
        }}
      >
        {/* 展開/折りたたみボタン */}
        {hasChildren ? (
          <CollapsibleTrigger asChild>
            <button
              className="flex h-5 w-5 items-center justify-center rounded hover:bg-muted"
              onClick={(e) => e.stopPropagation()}
            >
              <ChevronRight
                className={cn(
                  'h-4 w-4 text-muted-foreground transition-transform',
                  isOpen && 'rotate-90'
                )}
              />
            </button>
          </CollapsibleTrigger>
        ) : (
          <span className="h-5 w-5" />
        )}

        {/* 品番 */}
        <span className="flex-1 truncate text-sm">{node.item.partNumber}</span>

        {/* 数量 */}
        {node.quantity > 1 && (
          <span className="text-xs text-muted-foreground">×{node.quantity}</span>
        )}
      </div>

      {/* 子ノード */}
      {hasChildren && (
        <CollapsibleContent>
          {node.children.map((child) => (
            <BomNavTreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              currentItemRevId={currentItemRevId}
              onNavigate={onNavigate}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}

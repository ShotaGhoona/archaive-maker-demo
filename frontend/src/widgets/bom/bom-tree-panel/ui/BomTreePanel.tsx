'use client';

import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { cn } from '@/shared/ui/shadcn/lib/utils';

import type {
  TreeNode,
  GalleryItemType,
} from '@/shared/dummy-data/bom/products';

import { TreeNodeItem } from './tree-components/TreeNodeItem';

interface BomTreePanelProps {
  treeNodes?: TreeNode[];
  selectedNodeId: string | null;
  onSelectNode?: (node: TreeNode) => void;
  /** 表示するタイプを指定（省略時は全て表示） */
  allowedTypes?: GalleryItemType[];
  /** デフォルトで開く階層の深さ */
  defaultOpenLevel?: number;
  emptyMessage?: string;
  /** 検索関連props */
  searchQuery?: string;
  highlightedNodeId?: string | null;
  matchedNodeIds?: string[];
  forceExpandIds?: Set<string>;
}

export function BomTreePanel({
  treeNodes = [],
  selectedNodeId,
  onSelectNode,
  allowedTypes,
  defaultOpenLevel = 2,
  emptyMessage = '表示するデータがありません',
  searchQuery = '',
  highlightedNodeId = null,
  matchedNodeIds = [],
  forceExpandIds,
}: BomTreePanelProps) {
  const hasContent = treeNodes.length > 0;

  if (!hasContent) {
    return (
      <Card
        className={cn(
          'flex h-full items-center justify-center',
          'border-white/60 bg-white/40 backdrop-blur-xl',
        )}
      >
        <NoData title={emptyMessage} size='default' />
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'h-full overflow-auto p-4',
        'border-white/60 bg-white/40 backdrop-blur-xl',
        'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
      )}
    >
      <div className='space-y-0.5'>
        {treeNodes.map((node) => (
          <TreeNodeItem
            key={node.id}
            node={node}
            level={0}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            allowedTypes={allowedTypes}
            defaultOpenLevel={defaultOpenLevel}
            highlightedNodeId={highlightedNodeId}
            matchedNodeIds={matchedNodeIds}
            forceExpandIds={forceExpandIds}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </Card>
  );
}

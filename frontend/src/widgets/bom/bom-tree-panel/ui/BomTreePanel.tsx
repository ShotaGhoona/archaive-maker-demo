'use client';

import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { Card } from '@/shared/ui/shadcn/ui/card';

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
      <div className='flex min-h-0 flex-1 items-center justify-center'>
        <NoData title={emptyMessage} size='default' />
      </div>
    );
  }

  return (
    <Card className='min-h-0 flex-1 overflow-auto p-4'>
      <div className='space-y-1'>
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

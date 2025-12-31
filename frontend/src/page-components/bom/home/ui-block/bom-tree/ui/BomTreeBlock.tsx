'use client';

import { BomTreePanel } from '@/widgets/bom/bom-tree-panel/ui/BomTreePanel';
import type { TreeNode } from '@/shared/dummy-data/bom/products';

interface BomTreeBlockProps {
  treeNodes: TreeNode[];
  selectedNodeId: string | null;
  onSelectNode: (node: TreeNode) => void;
  /** 検索関連props */
  searchQuery?: string;
  highlightedNodeId?: string | null;
  matchedNodeIds?: string[];
  forceExpandIds?: Set<string>;
}

export function BomTreeBlock({
  treeNodes,
  selectedNodeId,
  onSelectNode,
  searchQuery,
  highlightedNodeId,
  matchedNodeIds,
  forceExpandIds,
}: BomTreeBlockProps) {
  return (
    <BomTreePanel
      treeNodes={treeNodes}
      selectedNodeId={selectedNodeId}
      onSelectNode={onSelectNode}
      allowedTypes={['directory']}
      emptyMessage='左サイドバーから製品を選択してください'
      // フィルター検索用
      searchQuery={searchQuery}
      highlightedNodeId={highlightedNodeId}
      matchedNodeIds={matchedNodeIds}
      forceExpandIds={forceExpandIds}
    />
  );
}

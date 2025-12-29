'use client';

import { BomTreePanel } from '@/widgets/bom/bom-tree-panel/ui/BomTreePanel';
import type { TreeNode } from '@/shared/dummy-data/bom/products';

interface BomTreeBlockProps {
  treeNodes: TreeNode[];
  selectedNodeId: string | null;
  onSelectNode: (node: TreeNode) => void;
}

export function BomTreeBlock({
  treeNodes,
  selectedNodeId,
  onSelectNode,
}: BomTreeBlockProps) {
  return (
    <BomTreePanel
      treeNodes={treeNodes}
      selectedNodeId={selectedNodeId}
      onSelectNode={onSelectNode}
      allowedTypes={['directory']}
      emptyMessage='左サイドバーから製品を選択してください'
    />
  );
}

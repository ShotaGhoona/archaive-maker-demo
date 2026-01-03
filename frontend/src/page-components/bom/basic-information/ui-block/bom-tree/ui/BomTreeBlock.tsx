'use client';

import { useRouter } from 'next/navigation';
import { BomTreePanel } from '@/widgets/bom/bom-tree-panel/ui/BomTreePanel';
import type { TreeNode } from '@/shared/dummy-data/bom/products';

interface BomTreeBlockProps {
  treeNodes: TreeNode[];
}

export function BomTreeBlock({ treeNodes }: BomTreeBlockProps) {
  const router = useRouter();

  const handleSelectNode = (node: TreeNode) => {
    switch (node.type) {
      case 'directory':
        router.push(`/bom/${node.id}/basic-information`);
        break;
      case 'drawing':
        router.push(`/drawing/${node.id}/basic-information`);
        break;
      case 'document':
        alert(`ドキュメント詳細ページ（未実装）: ${node.id}`);
        break;
    }
  };

  return (
    <div className='flex min-h-0 flex-1 flex-col overflow-auto px-4'>
      <BomTreePanel
        treeNodes={treeNodes}
        selectedNodeId={null}
        onSelectNode={handleSelectNode}
        emptyMessage='子要素がありません'
      />
    </div>
  );
}

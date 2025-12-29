'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { ProductSearchPanel } from '../ui-block/product-search-panel/ui/ProductSearchPanel';
import { BomTreeBlock } from '../ui-block/bom-tree/ui/BomTreeBlock';
import { BomDetailPanel } from '../ui-block/detail-panel/ui/BomDetailPanel';
import {
  dummyProducts,
  getBomByProductId,
  getNodeDetailById,
  bomNodesToTreeNodes,
  type TreeNode,
} from '@/shared/dummy-data/bom/products';

export function BomHomeContainer() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedProduct = dummyProducts.find(
    (p) => p.id === selectedProductId,
  );
  const bomTree = selectedProductId
    ? getBomByProductId(selectedProductId)
    : [];
  const treeNodes = bomNodesToTreeNodes(bomTree);
  const selectedNodeDetail = selectedNodeId
    ? getNodeDetailById(selectedNodeId)
    : undefined;

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setSelectedNodeId(null);
  };

  const handleSelectNode = (node: TreeNode) => {
    setSelectedNodeId(node.id);
  };

  const handleCloseDetail = () => {
    setSelectedNodeId(null);
  };

  return (
    <div className='flex min-h-0 flex-1'>
      {/* サイドバー: 製品検索 */}
      <ProductSearchPanel
        products={dummyProducts}
        selectedProductId={selectedProductId}
        onSelectProduct={handleSelectProduct}
      />

      {/* メインコンテンツ */}
      <div className='flex min-h-0 min-w-0 flex-1 flex-col px-6 py-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>
            {selectedProduct?.productName ?? 'BOM構成'}
          </h2>
          {selectedProductId && (
            <Button size='xl' asChild>
              <Link href={`/bom/${selectedProductId}/canvas`}>
                <LayoutGrid className='mr-2 h-4 w-4' />
                Canvas表示
              </Link>
            </Button>
          )}
        </div>

        <div className='flex min-h-0 flex-1 gap-4'>
          <BomTreeBlock
            treeNodes={treeNodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleSelectNode}
          />

          {/* 詳細パネル */}
          {selectedNodeDetail && (
            <BomDetailPanel
              detail={selectedNodeDetail}
              onClose={handleCloseDetail}
            />
          )}
        </div>
      </div>
    </div>
  );
}

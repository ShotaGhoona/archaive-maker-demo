'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, LayoutGrid, Package } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';

import { ProductSelector } from '../ui-block/product-selector/ui/ProductSelector';
import { BomTreeBlock } from '../ui-block/bom-tree/ui/BomTreeBlock';
import { BomDetailPanel } from '../ui-block/detail-panel/ui/BomDetailPanel';
import { BomTreeSearchBar } from '@/widgets/bom/bom-tree-panel/ui/components/BomTreeSearchBar';
import { useBomTreeSearch } from '@/widgets/bom/bom-tree-panel/hooks/useBomTreeSearch';
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

  const selectedProduct = dummyProducts.find((p) => p.id === selectedProductId);
  const bomTree = selectedProductId ? getBomByProductId(selectedProductId) : [];
  const treeNodes = bomNodesToTreeNodes(bomTree);
  const selectedNodeDetail = selectedNodeId
    ? getNodeDetailById(selectedNodeId)
    : undefined;

  // BOM検索
  const bomSearch = useBomTreeSearch(treeNodes, ['directory']);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setSelectedNodeId(null);
    bomSearch.handleClear();
  };

  const handleSelectNode = (node: TreeNode) => {
    setSelectedNodeId(node.id);
  };

  const handleCloseDetail = () => {
    setSelectedNodeId(null);
  };

  return (
    <div className='flex min-h-0 flex-1 flex-col gap-4'>
      {/* ヘッダー */}
      <div className='flex items-center gap-3'>
        {/* 左: タイトル + 製品セレクター */}
        <div className='flex items-center gap-2'>
          <Package className='h-5 w-5 text-slate-700' />
          <h1 className='text-lg font-semibold text-slate-900'>BOM管理</h1>
        </div>
        <ChevronRight className='size-4 text-slate-300' />
        <ProductSelector
          products={dummyProducts}
          selectedProductId={selectedProductId}
          onSelectProduct={handleSelectProduct}
        />

        {/* 右: ツール群 */}
        <div className='ml-auto flex items-center gap-3'>
          {selectedProductId && (
            <>
              <BomTreeSearchBar
                searchQuery={bomSearch.searchQuery}
                onSearchChange={bomSearch.setSearchQuery}
                currentMatchIndex={bomSearch.currentMatchIndex}
                matchCount={bomSearch.matchCount}
                onPrev={bomSearch.handlePrev}
                onNext={bomSearch.handleNext}
                onClear={bomSearch.handleClear}
              />
              <Button variant='outline' size='xl' asChild>
                <Link href={`/bom/${selectedProductId}/canvas`}>
                  <LayoutGrid className='mr-2 h-4 w-4' />
                  Canvas
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* メインコンテンツ */}
      {!selectedProductId ? (
        // 製品未選択時
        <Card
          className={cn(
            'flex flex-1 flex-col items-center justify-center gap-4',
            'border-white/60 bg-white/40 backdrop-blur-xl',
          )}
        >
          <div
            className={cn(
              'flex size-16 items-center justify-center rounded-2xl',
              'bg-gradient-to-br from-slate-100 to-slate-200',
            )}
          >
            <Package className='size-8 text-slate-400' />
          </div>
          <div className='text-center'>
            <p className='text-lg font-medium text-slate-700'>
              製品を選択してください
            </p>
            <p className='mt-1 text-sm text-slate-500'>
              上部のセレクターから製品を選択すると、BOM構成が表示されます
            </p>
          </div>
        </Card>
      ) : (
        // 製品選択時: ツリー + 詳細パネル（リサイズ可能）
        <ResizablePanelGroup
          direction='horizontal'
          className='min-h-0 flex-1 gap-2'
        >
          {/* BOMツリーパネル */}
          <ResizablePanel
            defaultSize={selectedNodeDetail ? 60 : 100}
            minSize={40}
          >
            <BomTreeBlock
              treeNodes={treeNodes}
              selectedNodeId={selectedNodeId}
              onSelectNode={handleSelectNode}
              searchQuery={bomSearch.searchQuery}
              highlightedNodeId={bomSearch.currentMatchId}
              matchedNodeIds={bomSearch.matchedIds}
              forceExpandIds={bomSearch.expandIds}
            />
          </ResizablePanel>

          {/* リサイズハンドル + 詳細パネル */}
          {selectedNodeDetail && (
            <>
              <ResizableHandle
                withHandle
                className='mx-1 rounded-full bg-slate-200/50 transition-colors hover:bg-slate-300/50'
              />
              <ResizablePanel defaultSize={40} minSize={25} maxSize={60}>
                <BomDetailPanel
                  detail={selectedNodeDetail}
                  onClose={handleCloseDetail}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      )}
    </div>
  );
}

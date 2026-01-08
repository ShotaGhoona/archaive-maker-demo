'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { ProductSearchPanel } from '../ui-block/product-search-panel/ui/ProductSearchPanel';
import { BomTreeBlock, buildBomTree } from '../ui-block/bom-tree/ui/BomTreeBlock';
import { BomDetailPanel } from '../ui-block/detail-panel/ui/BomDetailPanel';
import { BomTreeSearchBar } from '@/widgets/bom/bom-tree-panel/ui/components/BomTreeSearchBar';
import { useBomTreeSearch } from '../ui-block/bom-tree/hooks/useBomTreeSearch';
import {
  getItemsByType,
  getLatestReleasedRev,
  getItemById,
  type ItemRev,
} from '@/shared/dummy-data/bom-v2';

/**
 * BOM Home Container
 *
 * BizPM設計に基づくBOM一覧ページ
 */
export function BomHomeContainer() {
  // 選択状態
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedItemRevId, setSelectedItemRevId] = useState<string | null>(null);

  // 製品リスト取得
  const products = useMemo(() => getItemsByType('Product'), []);

  // 選択中の製品
  const selectedProduct = selectedProductId
    ? getItemById(selectedProductId)
    : null;

  // 選択中の製品のLatest ItemRev
  const selectedProductRev = selectedProductId
    ? getLatestReleasedRev(selectedProductId) ?? null
    : null;

  // BOMツリーデータを構築（検索用）
  const treeData = useMemo(
    () => buildBomTree(selectedProductRev),
    [selectedProductRev]
  );

  // BOM検索
  const bomSearch = useBomTreeSearch(treeData);

  // Product選択ハンドラ
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setSelectedItemRevId(null);
    bomSearch.handleClear();
  };

  // BOMノード選択ハンドラ
  const handleSelectNode = (itemRev: ItemRev) => {
    setSelectedItemRevId(itemRev.id);
  };

  // 詳細パネルを閉じる
  const handleCloseDetail = () => {
    setSelectedItemRevId(null);
  };

  return (
    <div className="flex min-h-0 flex-1">
      {/* サイドバー: 製品検索 */}
      <ProductSearchPanel
        products={products}
        selectedProductId={selectedProductId}
        onSelectProduct={handleSelectProduct}
      />

      {/* メインコンテンツ */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-6 py-4">
        {/* ヘッダー */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {selectedProduct?.name ?? 'BOM構成'}
          </h2>
          <div className="flex items-center gap-4">
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
                <Button size="lg" asChild>
                  <Link href={`/bom/${selectedProductId}/canvas`}>
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    Canvas表示
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* BOMツリー + 詳細パネル */}
        <div className="flex min-h-0 flex-1 gap-4">
          <BomTreeBlock
            productRev={selectedProductRev}
            selectedItemRevId={selectedItemRevId}
            onSelectNode={handleSelectNode}
            searchQuery={bomSearch.searchQuery}
            highlightedNodeId={bomSearch.currentMatchId}
            matchedNodeIds={bomSearch.matchedIds}
            forceExpandIds={bomSearch.expandIds}
          />

          {/* 詳細パネル */}
          {selectedItemRevId && (
            <BomDetailPanel
              itemRevId={selectedItemRevId}
              onClose={handleCloseDetail}
            />
          )}
        </div>
      </div>
    </div>
  );
}

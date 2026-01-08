'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { ProductSearchPanel } from '../ui-block/product-search-panel/ui/ProductSearchPanel';
import { BomTreeBlock } from '../ui-block/bom-tree/ui/BomTreeBlock';
import { BomDetailPanel } from '../ui-block/detail-panel/ui/BomDetailPanel';
import {
  getItemsByType,
  getLatestReleasedRev,
  getItemById,
  type Item,
  type ItemRev,
} from '@/shared/dummy-data/bom-v2';

/**
 * BOM Home V2 Container
 *
 * BizPM設計に基づく新しいBOM一覧ページ
 * 旧homeのレイアウト哲学を維持しつつ、bom-v2データ構造を使用
 */
export function BomHomeV2Container() {
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

  // Product選択ハンドラ
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setSelectedItemRevId(null);
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
              <Button size="lg" asChild>
                <Link href={`/bom/${selectedProductId}/canvas`}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Canvas表示
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* BOMツリー + 詳細パネル */}
        <div className="flex min-h-0 flex-1 gap-4">
          <BomTreeBlock
            productRev={selectedProductRev}
            selectedItemRevId={selectedItemRevId}
            onSelectNode={handleSelectNode}
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

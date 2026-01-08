'use client';

/**
 * BOM Home Container
 *
 * TODO: 新しいデータ構造（bom-v2）に基づいてUIを再構築
 *
 * 利用可能なデータ:
 * - items, itemRevs: Core（品番マスタ）
 * - bomHeaders, bomLines: BOM構造（親子関係）
 * - facetTypes, facetInstances: Facet（属性）
 *
 * 利用可能な関数:
 * - getItemById, getItemRevById: ID検索
 * - getBomHeadersByItemRev: ItemRevに紐づくBOMHeader取得
 * - getBomLinesByHeader: BOMHeaderに紐づくBOMLine取得
 * - explodeBom: BOM展開（Multi-Level）
 * - findWhereUsed: 逆展開（Where-Used）
 * - getFacetInstancesByItemRev: ItemRevの属性取得
 */

export function BomHomeContainer() {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">BOM Home</h1>
        <p className="mb-4 text-gray-600">
          新しいデータ構造（bom-v2）への移行中です。
        </p>
        <p className="text-sm text-gray-500">
          データ確認は{' '}
          <a href="/test/bom-v2" className="text-blue-600 underline">
            /test/bom-v2
          </a>{' '}
          で行えます。
        </p>
      </div>
    </div>
  );
}

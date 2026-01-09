'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { BomNavigationPanel } from '../ui-block/navigation-panel/ui/BomNavigationPanel';
import { GalleryPanel } from '../ui-block/gallery-panel/ui/GalleryPanel';
import { InfoPanel } from '../ui-block/info-panel/ui/InfoPanel';
import {
  getItemById,
  getLatestReleasedRev,
  getFacetInstancesByItemRev,
  getDrawingsByItemRev,
  getDocumentsByItemRev,
} from '@/shared/dummy-data/bom-v2';

/**
 * BOM Basic Information Container
 *
 * 3カラムレイアウト:
 * - 左: BOM構成/使用先
 * - 中央: 図面/ドキュメント ギャラリー
 * - 右: メタデータ編集
 */
export function BomBasicInformationContainer() {
  const params = useParams();
  const itemId = params.id as string;

  // データ取得
  const { item, itemRev, facetInstances, drawings, documents } = useMemo(() => {
    const item = getItemById(itemId);
    if (!item) {
      return {
        item: null,
        itemRev: null,
        facetInstances: [],
        drawings: [],
        documents: [],
      };
    }

    const itemRev = getLatestReleasedRev(itemId);
    if (!itemRev) {
      return {
        item,
        itemRev: null,
        facetInstances: [],
        drawings: [],
        documents: [],
      };
    }

    return {
      item,
      itemRev,
      facetInstances: getFacetInstancesByItemRev(itemRev.id),
      drawings: getDrawingsByItemRev(itemRev.id),
      documents: getDocumentsByItemRev(itemRev.id),
    };
  }, [itemId]);

  // フォーム状態管理
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  // データが変わったらformDataをリセット
  useEffect(() => {
    const merged: Record<string, unknown> = {};

    if (item) {
      merged.partNumber = item.partNumber;
      merged.name = item.name;
      merged.itemType = item.itemType;
      merged.lifecycleState = item.lifecycleState;
    }
    if (itemRev) {
      merged.revision = itemRev.revision;
      merged.status = itemRev.status;
    }

    facetInstances.forEach((fi) => {
      Object.entries(fi.values).forEach(([key, value]) => {
        merged[key] = value;
      });
    });

    setFormData(merged);
  }, [item, itemRev, facetInstances]);

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: API呼び出し
    alert(`保存（未実装）\n${JSON.stringify(formData, null, 2)}`);
  };

  if (!item || !itemRev) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <p className="text-muted-foreground">アイテムが見つかりません</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 gap-4 p-4">
      {/* 左カラム: BOM構成/使用先 */}
      <BomNavigationPanel itemRevId={itemRev.id} />

      {/* 中央カラム: 図面/ドキュメント ギャラリー */}
      <GalleryPanel drawings={drawings} documents={documents} />

      {/* 右カラム: メタデータ編集 */}
      <InfoPanel
        item={item}
        itemRev={itemRev}
        facetInstances={facetInstances}
        formData={formData}
        onFieldChange={updateField}
        onSave={handleSave}
      />
    </div>
  );
}

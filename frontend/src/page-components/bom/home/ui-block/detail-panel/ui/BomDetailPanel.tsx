'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Save, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import { MetadataFields } from './components/MetadataFields';
import { DocumentList } from './components/DocumentList';
import { DrawingList } from './components/DrawingList';
import {
  getItemRevById,
  getItemById,
  getFacetInstancesByItemRev,
  getDrawingsByItemRev,
  getDocumentsByItemRev,
} from '@/shared/dummy-data/bom-v2';

interface BomDetailPanelProps {
  itemRevId: string;
  onClose: () => void;
}

export function BomDetailPanel({ itemRevId, onClose }: BomDetailPanelProps) {
  const router = useRouter();

  // データ取得
  const { itemRev, item, facetInstances, drawings, documents } = useMemo(() => {
    const itemRev = getItemRevById(itemRevId);
    if (!itemRev) {
      return {
        itemRev: null,
        item: null,
        facetInstances: [],
        drawings: [],
        documents: [],
      };
    }

    return {
      itemRev,
      item: getItemById(itemRev.itemId),
      facetInstances: getFacetInstancesByItemRev(itemRevId),
      drawings: getDrawingsByItemRev(itemRevId),
      documents: getDocumentsByItemRev(itemRevId),
    };
  }, [itemRevId]);

  // フォーム状態管理
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  // itemRevIdが変わったらformDataをリセット
  useEffect(() => {
    if (facetInstances.length > 0) {
      // 全FacetInstanceの値をマージ
      const merged: Record<string, unknown> = {};
      facetInstances.forEach((fi) => {
        Object.entries(fi.values).forEach(([key, value]) => {
          merged[key] = value;
        });
      });
      setFormData(merged);
    } else {
      setFormData({});
    }
  }, [facetInstances]);

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleGoToDetail = () => {
    if (item) {
      router.push(`/bom/${item.id}/basic-information`);
    }
  };

  const handleSave = () => {
    // TODO: API呼び出し
    alert(`保存（未実装）\n${JSON.stringify(formData, null, 2)}`);
  };

  if (!itemRev || !item) {
    return null;
  }

  return (
    <Card className="flex min-h-0 w-[600px] shrink-0 flex-col gap-0 border-l py-0">
      {/* ヘッダー */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold">{item.name}</h3>
          <p className="text-sm text-muted-foreground">
            {item.partNumber} / Rev.{itemRev.revision}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* コンテンツ */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-4">
          {/* メタデータフィールド */}
          <MetadataFields
            item={item}
            itemRev={itemRev}
            facetInstances={facetInstances}
            formData={formData}
            onFieldChange={updateField}
          />

          {/* ドキュメント */}
          {documents.length > 0 && (
            <>
              <Separator />
              <DocumentList documents={documents} />
            </>
          )}

          {/* 図面 */}
          {drawings.length > 0 && (
            <>
              <Separator />
              <DrawingList drawings={drawings} />
            </>
          )}
        </div>
      </ScrollArea>

      {/* フッター */}
      <div className="flex gap-2 border-t p-4">
        <Button className="flex-1" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          保存
        </Button>
        <Button className="flex-1" variant="outline" onClick={handleGoToDetail}>
          <ExternalLink className="mr-2 h-4 w-4" />
          詳細ページを開く
        </Button>
      </div>
    </Card>
  );
}

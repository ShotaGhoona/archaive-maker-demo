'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Save, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import { MetadataFields, type MetadataFormData } from './components/MetadataFields';
import { DocumentList } from './components/DocumentList';
import { DrawingList } from './components/DrawingList';

import type { BomNodeDetail } from '@/shared/dummy-data/bom/products';

interface BomDetailPanelProps {
  detail: BomNodeDetail;
  onClose: () => void;
}

export function BomDetailPanel({ detail, onClose }: BomDetailPanelProps) {
  const router = useRouter();

  // フォーム状態管理
  const [formData, setFormData] = useState<MetadataFormData>({
    id: detail.id,
    name: detail.name,
    nodeType: detail.nodeType,
    quantity: detail.quantity,
    createdAt: detail.createdAt,
    updatedAt: detail.updatedAt,
    customItems: { ...detail.customItems },
  });

  // detailが変わったらformDataをリセット
  useEffect(() => {
    setFormData({
      id: detail.id,
      name: detail.name,
      nodeType: detail.nodeType,
      quantity: detail.quantity,
      createdAt: detail.createdAt,
      updatedAt: detail.updatedAt,
      customItems: { ...detail.customItems },
    });
  }, [detail]);

  const updateField = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateCustomItem = (key: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      customItems: { ...prev.customItems, [key]: value as string | number | '' | boolean },
    }));
  };

  const handleGoToDetail = () => {
    router.push(`/bom/${detail.id}/basic-information`);
  };

  const handleSave = () => {
    alert('保存（未実装）');
    // TODO: API呼び出し
  };

  return (
    <Card className='flex min-h-0 w-[600px] shrink-0 flex-col border-l border-slate-200/60 py-0 gap-0'>
      {/* ヘッダー */}
      <div className='flex items-center justify-between border-b border-slate-200/60 p-4'>
        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-base font-semibold text-slate-900'>{detail.name}</h3>
        </div>
        <Button variant='ghost' size='icon' onClick={onClose}>
          <X className='h-4 w-4' />
        </Button>
      </div>

      {/* コンテンツ */}
      <ScrollArea className='min-h-0 flex-1'>
        <div className='space-y-4 p-4'>
          {/* 編集可能フィールド */}
          <MetadataFields
            formData={formData}
            onFieldChange={updateField}
            onCustomItemChange={updateCustomItem}
          />

          {/* ドキュメント */}
          {detail.documents.length > 0 && (
            <>
              <Separator />
              <DocumentList documents={detail.documents} />
            </>
          )}

          {/* 図面 */}
          {detail.drawings.length > 0 && (
            <>
              <Separator />
              <DrawingList drawings={detail.drawings} />
            </>
          )}
        </div>
      </ScrollArea>

      {/* フッター */}
      <div className='flex gap-2 border-t border-slate-200/60 p-4'>
        <Button className='flex-1' onClick={handleSave}>
          <Save className='mr-2 h-4 w-4' />
          保存
        </Button>
        <Button className='flex-1' onClick={handleGoToDetail}>
          <ExternalLink className='mr-2 h-4 w-4' />
          詳細ページを開く
        </Button>
      </div>
    </Card>
  );
}

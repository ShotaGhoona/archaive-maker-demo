'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { DateField } from '@/shared/ui/form-fields/ui/DateField';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Button } from '@/shared/ui/shadcn/ui/button';
import type { BomNodeDetail } from '@/shared/dummy-data/bom/products';

interface BomInfoPanelProps {
  bomDetail: BomNodeDetail;
}

export function BomInfoPanel({ bomDetail }: BomInfoPanelProps) {
  const [formData, setFormData] = useState({
    id: bomDetail.id,
    name: bomDetail.name,
    nodeType: bomDetail.nodeType,
    quantity: String(bomDetail.quantity),
    createdAt: bomDetail.createdAt,
    updatedAt: bomDetail.updatedAt,
  });

  const updateField = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert('保存（未実装）');
  };

  return (
    <div className='flex h-full flex-col bg-card'>
      {/* ヘッダー */}
      <div className='flex shrink-0 items-center justify-between border-b px-4 py-3'>
        <h2 className='text-lg font-semibold text-primary'>基本情報</h2>
      </div>

      {/* フィールド一覧 */}
      <ScrollArea className='min-h-0 flex-1 @container'>
        <div className='grid grid-cols-1 gap-4 p-4 @md:grid-cols-2'>
          <TextField
            id='id'
            label='ID'
            value={formData.id}
            onChange={(v) => updateField('id', v)}
            disabled
          />
          <TextField
            id='name'
            label='名称'
            value={formData.name}
            onChange={(v) => updateField('name', v)}
          />
          <TextField
            id='nodeType'
            label='種別'
            value={formData.nodeType}
            onChange={() => {}}
            disabled
          />
          <TextField
            id='quantity'
            label='数量'
            value={formData.quantity}
            onChange={(v) => updateField('quantity', v)}
          />

          {/* カスタム項目 */}
          {Object.entries(bomDetail.customItems).map(([key, value]) => (
            <TextField
              key={key}
              id={`custom-${key}`}
              label={key}
              value={String(value)}
              onChange={() => {}}
            />
          ))}

          <DateField
            id='createdAt'
            label='作成日'
            value={formData.createdAt}
            onChange={(v) => updateField('createdAt', v)}
            disabled
          />
          <DateField
            id='updatedAt'
            label='更新日'
            value={formData.updatedAt}
            onChange={(v) => updateField('updatedAt', v)}
            disabled
          />
        </div>
      </ScrollArea>

      {/* フッター */}
      <div className='shrink-0 border-t bg-card p-4'>
        <Button onClick={handleSave} className='w-full gap-2'>
          <Save className='size-4' />
          保存
        </Button>
      </div>
    </div>
  );
}

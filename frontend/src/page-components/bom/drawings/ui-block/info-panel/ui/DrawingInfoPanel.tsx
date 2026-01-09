'use client';

import { X, Save } from 'lucide-react';

import { Card } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { NumberField } from '@/shared/ui/form-fields/ui/NumberField';
import { renderFacetField } from '@/shared/ui/form-fields/lib/render-dynamic-field';
import {
  getFacetTypeById,
  type Drawing,
  type FacetInstance,
} from '@/shared/dummy-data/bom-v2';

interface DrawingInfoPanelProps {
  drawing: Drawing;
  facetInstances: FacetInstance[];
  formData: Record<string, unknown>;
  onFieldChange: (key: string, value: unknown) => void;
  onSave: () => void;
  onClose: () => void;
}

export function DrawingInfoPanel({
  drawing,
  facetInstances,
  formData,
  onFieldChange,
  onSave,
  onClose,
}: DrawingInfoPanelProps) {
  return (
    <Card className='flex w-[480px] shrink-0 flex-col gap-0 py-0'>
      {/* ヘッダー */}
      <div className='flex h-12 items-center justify-between border-b px-4'>
        <h3 className='text-sm font-semibold'>図面情報</h3>
        <Button variant='ghost' size='icon' className='size-8' onClick={onClose}>
          <X className='size-4' />
        </Button>
      </div>

      {/* コンテンツ */}
      <ScrollArea className='min-h-0 flex-1'>
        <div className='space-y-4 p-4'>
          {/* 基本情報 */}
          <div>
            <h4 className='mb-3 text-base font-medium text-primary'>基本情報</h4>
            <div className='grid grid-cols-2 gap-4'>
              <TextField
                id='drawingNumber'
                label='図面番号'
                value={String(formData.drawingNumber ?? '')}
                onChange={(v) => onFieldChange('drawingNumber', v)}
              />
              <TextField
                id='drawingType'
                label='図面タイプ'
                value={String(formData.drawingType ?? '')}
                onChange={(v) => onFieldChange('drawingType', v)}
              />
              <div className='col-span-2'>
                <TextField
                  id='title'
                  label='タイトル'
                  value={String(formData.title ?? '')}
                  onChange={(v) => onFieldChange('title', v)}
                />
              </div>
            </div>
          </div>

          {/* 用紙情報 */}
          <div>
            <h4 className='mb-3 text-base font-medium text-primary'>用紙情報</h4>
            <div className='grid grid-cols-2 gap-4'>
              <TextField
                id='sheetSize'
                label='用紙サイズ'
                value={String(formData.sheetSize ?? '')}
                onChange={(v) => onFieldChange('sheetSize', v)}
              />
              <NumberField
                id='sheetNumber'
                label='シート番号'
                value={formData.sheetNumber as number ?? ''}
                onChange={(v) => onFieldChange('sheetNumber', v)}
              />
              <NumberField
                id='totalSheets'
                label='総シート数'
                value={formData.totalSheets as number ?? ''}
                onChange={(v) => onFieldChange('totalSheets', v)}
              />
            </div>
          </div>

          {/* Facet属性 */}
          {facetInstances.map((instance) => {
            const facetType = getFacetTypeById(instance.facetTypeId);
            if (!facetType) return null;

            return (
              <div key={instance.id}>
                <h4 className='mb-3 text-base font-medium text-primary'>
                  {facetType.name}
                </h4>
                <div className='grid grid-cols-2 gap-4'>
                  {Object.entries(facetType.schema.properties).map(([key, prop]) =>
                    renderFacetField({
                      fieldKey: key,
                      property: prop,
                      value: formData[key],
                      onChange: onFieldChange,
                    })
                  )}
                </div>
              </div>
            );
          })}

          {/* 更新履歴（読み取り専用） */}
          <div>
            <h4 className='mb-3 text-base font-medium text-primary'>更新履歴</h4>
            <div className='grid grid-cols-2 gap-4'>
              <TextField
                id='createdAt'
                label='作成日時'
                value={new Date(drawing.createdAt).toLocaleString('ja-JP')}
                onChange={() => {}}
                disabled
              />
              <TextField
                id='updatedAt'
                label='更新日時'
                value={new Date(drawing.updatedAt).toLocaleString('ja-JP')}
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* フッター */}
      <div className='border-t p-4'>
        <Button className='w-full' onClick={onSave}>
          <Save className='mr-2 size-4' />
          保存
        </Button>
      </div>
    </Card>
  );
}

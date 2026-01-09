'use client';

import { X, Save } from 'lucide-react';

import { Card } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { renderFacetField } from '@/shared/ui/form-fields/lib/render-dynamic-field';
import {
  getFacetTypeById,
  getDocumentTypeById,
  type Document,
  type FacetInstance,
} from '@/shared/dummy-data/bom-v2';

interface DocumentInfoPanelProps {
  document: Document;
  facetInstances: FacetInstance[];
  formData: Record<string, unknown>;
  onFieldChange: (key: string, value: unknown) => void;
  onSave: () => void;
  onClose: () => void;
}

export function DocumentInfoPanel({
  document,
  facetInstances,
  formData,
  onFieldChange,
  onSave,
  onClose,
}: DocumentInfoPanelProps) {
  const documentType = getDocumentTypeById(document.documentTypeId);

  return (
    <Card className='flex w-[480px] shrink-0 flex-col gap-0 py-0'>
      {/* ヘッダー */}
      <div className='flex h-12 items-center justify-between border-b px-4'>
        <h3 className='text-sm font-semibold'>帳票情報</h3>
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
                id='documentNumber'
                label='帳票番号'
                value={String(formData.documentNumber ?? '')}
                onChange={(v) => onFieldChange('documentNumber', v)}
              />
              <TextField
                id='documentType'
                label='帳票種類'
                value={documentType?.name ?? ''}
                onChange={() => {}}
                disabled
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

          {/* 発行情報 */}
          <div>
            <h4 className='mb-3 text-base font-medium text-primary'>発行情報</h4>
            <div className='grid grid-cols-2 gap-4'>
              <TextField
                id='issueDate'
                label='発行日'
                value={String(formData.issueDate ?? '')}
                onChange={(v) => onFieldChange('issueDate', v)}
              />
              <TextField
                id='recipient'
                label='宛先'
                value={String(formData.recipient ?? '')}
                onChange={(v) => onFieldChange('recipient', v)}
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
                value={new Date(document.createdAt).toLocaleString('ja-JP')}
                onChange={() => {}}
                disabled
              />
              <TextField
                id='updatedAt'
                label='更新日時'
                value={new Date(document.updatedAt).toLocaleString('ja-JP')}
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

'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { TextareaField } from '@/shared/ui/form-fields/ui/TextareaField';
import { DateField } from '@/shared/ui/form-fields/ui/DateField';
import { MultiSelectField } from '@/shared/ui/form-fields/ui/MultiSelectField';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { FieldSettingsModal } from './FieldSettingsModal';
import type { ProductDetail } from '@/page-components/drawing/basic-information/dummy-data/drawing-detail';

interface DrawingInfoPanelProps {
  product: ProductDetail;
}

const statusOptions = [
  { value: '承認済', label: '承認済', color: '#22c55e' },
  { value: 'レビュー中', label: 'レビュー中', color: '#f59e0b' },
  { value: '作成中', label: '作成中', color: '#3b82f6' },
  { value: '却下', label: '却下', color: '#ef4444' },
  { value: '保留', label: '保留', color: '#6b7280' },
];

const tagOptions = [
  { value: '重要', label: '重要', color: '#ef4444' },
  { value: '緊急', label: '緊急', color: '#f97316' },
  { value: '新規', label: '新規', color: '#3b82f6' },
  { value: '改訂', label: '改訂', color: '#8b5cf6' },
  { value: '試作', label: '試作', color: '#06b6d4' },
  { value: '量産', label: '量産', color: '#22c55e' },
  { value: '外注', label: '外注', color: '#ec4899' },
  { value: '内製', label: '内製', color: '#14b8a6' },
];

const fieldConfig = [
  { key: 'status', label: 'ステータス' },
  { key: 'tags', label: 'タグ' },
  { key: 'productNumber', label: '製品番号' },
  { key: 'name', label: '製品名' },
  { key: 'revision', label: 'リビジョン' },
  { key: 'category', label: 'カテゴリ' },
  { key: 'project', label: 'プロジェクト' },
  { key: 'department', label: '部署' },
  { key: 'material', label: '材質' },
  { key: 'createdBy', label: '作成者' },
  { key: 'createdAt', label: '作成日' },
  { key: 'updatedBy', label: '更新者' },
  { key: 'updatedAt', label: '更新日' },
  { key: 'approvedBy', label: '承認者' },
  { key: 'approvedAt', label: '承認日' },
  { key: 'remarks', label: '備考' },
];

export function DrawingInfoPanel({ product }: DrawingInfoPanelProps) {
  // フォーム状態管理
  const [formData, setFormData] = useState({
    status: product.status.map((s) => s.label),
    tags: product.tags.map((t) => t.label),
    productNumber: product.productNumber,
    name: product.name,
    revision: product.revision,
    category: product.category,
    project: product.project,
    department: product.department,
    createdBy: product.createdBy,
    createdAt: product.createdAt,
    updatedBy: product.updatedBy,
    updatedAt: product.updatedAt,
    approvedBy: product.approvedBy,
    approvedAt: product.approvedAt ?? '',
    material: product.material,
    remarks: product.remarks,
  });

  const updateField = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert('保存（未実装）');
    // TODO: API呼び出し
  };

  return (
    <Card
      className={cn('flex h-full flex-col gap-0 py-0', 'hover:bg-white/40')}
    >
      {/* ヘッダー */}
      <div className='flex shrink-0 items-center justify-between border-b border-slate-200/40 px-4 py-3'>
        <h2 className='text-base font-semibold text-slate-900'>基本情報</h2>
        <FieldSettingsModal fields={fieldConfig} />
      </div>

      {/* フィールド一覧 */}
      <ScrollArea className='min-h-0 flex-1 @container'>
        <div className='grid grid-cols-1 gap-4 p-4 @md:grid-cols-2'>
          <MultiSelectField
            id='status'
            label='ステータス'
            value={formData.status}
            onChange={(v) => updateField('status', v)}
            options={statusOptions}
          />
          <MultiSelectField
            id='tags'
            label='タグ'
            value={formData.tags}
            onChange={(v) => updateField('tags', v)}
            options={tagOptions}
          />
          <TextField
            id='productNumber'
            label='製品番号'
            value={formData.productNumber}
            onChange={(v) => updateField('productNumber', v)}
          />
          <TextField
            id='name'
            label='製品名'
            value={formData.name}
            onChange={(v) => updateField('name', v)}
          />
          <TextField
            id='revision'
            label='リビジョン'
            value={formData.revision}
            onChange={(v) => updateField('revision', v)}
          />
          <TextField
            id='category'
            label='カテゴリ'
            value={formData.category}
            onChange={(v) => updateField('category', v)}
          />
          <TextField
            id='project'
            label='プロジェクト'
            value={formData.project}
            onChange={(v) => updateField('project', v)}
          />
          <TextField
            id='department'
            label='部署'
            value={formData.department}
            onChange={(v) => updateField('department', v)}
          />
          <TextField
            id='material'
            label='材質'
            value={formData.material}
            onChange={(v) => updateField('material', v)}
          />
          <TextField
            id='createdBy'
            label='作成者'
            value={formData.createdBy}
            onChange={(v) => updateField('createdBy', v)}
            disabled
          />
          <DateField
            id='createdAt'
            label='作成日'
            value={formData.createdAt}
            onChange={(v) => updateField('createdAt', v)}
            disabled
          />
          <TextField
            id='updatedBy'
            label='更新者'
            value={formData.updatedBy}
            onChange={(v) => updateField('updatedBy', v)}
            disabled
          />
          <DateField
            id='updatedAt'
            label='更新日'
            value={formData.updatedAt}
            onChange={(v) => updateField('updatedAt', v)}
            disabled
          />
          <TextField
            id='approvedBy'
            label='承認者'
            value={formData.approvedBy}
            onChange={(v) => updateField('approvedBy', v)}
            disabled
          />
          <DateField
            id='approvedAt'
            label='承認日'
            value={formData.approvedAt}
            onChange={(v) => updateField('approvedAt', v)}
            disabled
          />
          <div className='@md:col-span-2'>
            <TextareaField
              id='remarks'
              label='備考'
              value={formData.remarks}
              onChange={(v) => updateField('remarks', v)}
            />
          </div>
        </div>
      </ScrollArea>

      {/* フッター */}
      <div className='shrink-0 border-t border-slate-200/40 p-4'>
        <Button onClick={handleSave} className='w-full gap-2'>
          <Save className='size-4' />
          保存
        </Button>
      </div>
    </Card>
  );
}

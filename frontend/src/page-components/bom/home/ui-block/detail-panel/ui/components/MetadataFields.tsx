'use client';

import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { NumberField } from '@/shared/ui/form-fields/ui/NumberField';
import { DateField } from '@/shared/ui/form-fields/ui/DateField';
import { renderDynamicFields } from '@/shared/ui/form-fields/lib/render-dynamic-field';

export interface MetadataFormData {
  id: string;
  name: string;
  nodeType: string;
  quantity: number | '';
  createdAt: string;
  updatedAt: string;
  customItems: Record<string, string | number | '' | boolean>;
}

interface MetadataFieldsProps {
  formData: MetadataFormData;
  onFieldChange: <K extends keyof MetadataFormData>(
    key: K,
    value: MetadataFormData[K],
  ) => void;
  onCustomItemChange: (key: string, value: unknown) => void;
}

export function MetadataFields({
  formData,
  onFieldChange,
  onCustomItemChange,
}: MetadataFieldsProps) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <TextField
        id='id'
        label='ID'
        value={formData.id}
        onChange={(v) => onFieldChange('id', v)}
        disabled
      />
      <TextField
        id='name'
        label='名前'
        value={formData.name}
        onChange={(v) => onFieldChange('name', v)}
      />
      <TextField
        id='nodeType'
        label='ノードタイプ'
        value={formData.nodeType}
        onChange={(v) => onFieldChange('nodeType', v)}
        disabled
      />
      <NumberField
        id='quantity'
        label='数量'
        value={formData.quantity}
        onChange={(v) => onFieldChange('quantity', v)}
      />
      <DateField
        id='createdAt'
        label='作成日'
        value={formData.createdAt}
        onChange={(v) => onFieldChange('createdAt', v)}
        disabled
      />
      <DateField
        id='updatedAt'
        label='更新日'
        value={formData.updatedAt}
        onChange={(v) => onFieldChange('updatedAt', v)}
        disabled
      />

      {/* カスタム属性 */}
      {renderDynamicFields(formData.customItems, onCustomItemChange)}
    </div>
  );
}

'use client';

import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { NumberField } from '@/shared/ui/form-fields/ui/NumberField';
import { SelectField } from '@/shared/ui/form-fields/ui/SelectField';
import {
  getFacetTypeById,
  type Item,
  type ItemRev,
  type FacetInstance,
  type FacetSchemaProperty,
} from '@/shared/dummy-data/bom-v2';

interface MetadataFieldsProps {
  item: Item;
  itemRev: ItemRev;
  facetInstances: FacetInstance[];
  formData: Record<string, unknown>;
  onFieldChange: (key: string, value: unknown) => void;
}

export function MetadataFields({
  item,
  itemRev,
  facetInstances,
  formData,
  onFieldChange,
}: MetadataFieldsProps) {
  return (
    <div className="space-y-6">
      {/* 基本情報 */}
      <div>
        <h4 className="mb-3 text-base font-medium text-primary">基本情報</h4>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            id="partNumber"
            label="品番"
            value={item.partNumber}
            onChange={() => {}}
            disabled
          />
          <TextField
            id="name"
            label="品名"
            value={item.name}
            onChange={() => {}}
            disabled
          />
          <TextField
            id="itemType"
            label="アイテムタイプ"
            value={item.itemType}
            onChange={() => {}}
            disabled
          />
          <TextField
            id="revision"
            label="リビジョン"
            value={itemRev.revision}
            onChange={() => {}}
            disabled
          />
          <TextField
            id="status"
            label="ステータス"
            value={itemRev.status}
            onChange={() => {}}
            disabled
          />
          <TextField
            id="lifecycleState"
            label="ライフサイクル"
            value={item.lifecycleState}
            onChange={() => {}}
            disabled
          />
        </div>
      </div>

      {/* Facet属性 */}
      {facetInstances.map((instance) => {
        const facetType = getFacetTypeById(instance.facetTypeId);
        if (!facetType) return null;

        return (
          <div key={instance.id}>
            <h4 className="mb-3 text-base font-medium text-primary">
              {facetType.name}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(facetType.schema.properties).map(
                ([key, prop]) => (
                  <FacetPropertyField
                    key={key}
                    propertyKey={key}
                    property={prop}
                    value={formData[key]}
                    onChange={(value) => onFieldChange(key, value)}
                  />
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface FacetPropertyFieldProps {
  propertyKey: string;
  property: FacetSchemaProperty;
  value: unknown;
  onChange: (value: unknown) => void;
}

function FacetPropertyField({
  propertyKey,
  property,
  value,
  onChange,
}: FacetPropertyFieldProps) {
  const label = property.title + (property.unit ? ` (${property.unit})` : '');

  // enum（選択肢）がある場合
  if (property.enum && property.enum.length > 0) {
    const options = property.enum.map((opt) => ({
      value: String(opt),
      label: String(opt),
    }));

    return (
      <SelectField
        id={propertyKey}
        label={label}
        value={String(value ?? '')}
        options={options}
        onChange={(v) => onChange(v)}
      />
    );
  }

  // 数値の場合
  if (property.type === 'number') {
    return (
      <NumberField
        id={propertyKey}
        label={label}
        value={value !== undefined ? Number(value) : ''}
        onChange={(v) => onChange(v === '' ? undefined : v)}
      />
    );
  }

  // 文字列の場合
  return (
    <TextField
      id={propertyKey}
      label={label}
      value={String(value ?? '')}
      onChange={(v) => onChange(v || undefined)}
    />
  );
}

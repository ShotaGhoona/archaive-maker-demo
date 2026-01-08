import { TextField } from '../ui/TextField';
import { NumberField } from '../ui/NumberField';
import { BooleanField } from '../ui/BooleanField';
import { SelectField, type SelectOption } from '../ui/SelectField';
import type { FacetSchemaProperty } from '@/shared/dummy-data/bom-v2';

interface RenderDynamicFieldProps {
  fieldKey: string;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function renderDynamicField({
  fieldKey,
  value,
  onChange,
}: RenderDynamicFieldProps) {
  if (typeof value === 'boolean') {
    return (
      <BooleanField
        key={fieldKey}
        id={fieldKey}
        label={fieldKey}
        value={value}
        onChange={(v) => onChange(fieldKey, v)}
      />
    );
  }

  if (typeof value === 'number') {
    return (
      <NumberField
        key={fieldKey}
        id={fieldKey}
        label={fieldKey}
        value={value}
        onChange={(v) => onChange(fieldKey, v === '' ? 0 : v)}
      />
    );
  }

  // デフォルトはテキストフィールド
  return (
    <TextField
      key={fieldKey}
      id={fieldKey}
      label={fieldKey}
      value={String(value)}
      onChange={(v) => onChange(fieldKey, v)}
    />
  );
}

// Record<string, unknown>を一括レンダリングするヘルパー
export function renderDynamicFields(
  items: Record<string, unknown>,
  onChange: (key: string, value: unknown) => void
) {
  return Object.entries(items).map(([key, value]) =>
    renderDynamicField({ fieldKey: key, value, onChange })
  );
}

// ============================================
// FacetSchemaProperty対応
// ============================================

interface RenderFacetFieldProps {
  fieldKey: string;
  property: FacetSchemaProperty;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

/**
 * FacetSchemaPropertyに基づいてフィールドをレンダリング
 */
export function renderFacetField({
  fieldKey,
  property,
  value,
  onChange,
}: RenderFacetFieldProps) {
  const displayValue = value ?? property.default;
  // ラベルに単位を付与
  const label = property.unit ? `${property.title} (${property.unit})` : property.title;

  // enum型の場合はSelectFieldを使用
  if (property.enum && property.enum.length > 0) {
    const options: SelectOption[] = property.enum.map((opt) => ({
      value: String(opt),
      label: String(opt),
    }));

    return (
      <SelectField
        key={fieldKey}
        id={fieldKey}
        label={label}
        value={displayValue !== undefined ? String(displayValue) : ''}
        onChange={(v) => onChange(fieldKey, v)}
        options={options}
        placeholder={`${property.title}を選択`}
      />
    );
  }

  // number型
  if (property.type === 'number') {
    return (
      <NumberField
        key={fieldKey}
        id={fieldKey}
        label={label}
        value={displayValue !== undefined ? Number(displayValue) : ''}
        onChange={(v) => onChange(fieldKey, v === '' ? undefined : v)}
      />
    );
  }

  // boolean型
  if (property.type === 'boolean') {
    return (
      <BooleanField
        key={fieldKey}
        id={fieldKey}
        label={label}
        value={Boolean(displayValue)}
        onChange={(v) => onChange(fieldKey, v)}
      />
    );
  }

  // デフォルト: string型
  return (
    <TextField
      key={fieldKey}
      id={fieldKey}
      label={label}
      value={displayValue !== undefined ? String(displayValue) : ''}
      onChange={(v) => onChange(fieldKey, v || undefined)}
      placeholder={property.description}
    />
  );
}

interface RenderFacetFieldsProps {
  schema: Record<string, FacetSchemaProperty>;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  /** フィールドIDのプレフィックス（複数FacetInstanceがある場合の衝突回避用） */
  idPrefix?: string;
}

/**
 * FacetSchemaに基づいて全フィールドをレンダリング
 */
export function renderFacetFields({
  schema,
  values,
  onChange,
  idPrefix = '',
}: RenderFacetFieldsProps) {
  return Object.entries(schema).map(([key, property]) => {
    const fieldKey = idPrefix ? `${idPrefix}-${key}` : key;
    return renderFacetField({
      fieldKey,
      property,
      value: values[key],
      onChange: (_, value) => onChange(key, value),
    });
  });
}

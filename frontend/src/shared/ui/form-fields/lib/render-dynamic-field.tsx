import { TextField } from '../ui/TextField';
import { NumberField } from '../ui/NumberField';
import { BooleanField } from '../ui/BooleanField';

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

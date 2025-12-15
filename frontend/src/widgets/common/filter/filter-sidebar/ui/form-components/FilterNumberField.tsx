'use client';

import { NumberField } from '@/shared/ui/form-fields/ui/NumberField';

interface FilterNumberFieldProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
}

export function FilterNumberField({
  label,
  value,
  onChange,
  placeholder,
}: FilterNumberFieldProps) {
  return (
    <NumberField
      id={`filter-${label}`}
      label={label}
      value={value ?? ''}
      onChange={(v) => onChange(v === '' ? null : v)}
      placeholder={placeholder}
    />
  );
}

'use client';

import { BooleanField } from '@/shared/ui/form-fields/ui/BooleanField';

interface FilterBooleanFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function FilterBooleanField({
  label,
  value,
  onChange,
}: FilterBooleanFieldProps) {
  return (
    <BooleanField
      id={`filter-${label}`}
      label={label}
      value={value}
      onChange={onChange}
    />
  );
}

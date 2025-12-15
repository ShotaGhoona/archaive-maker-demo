'use client';

import { DateField } from '@/shared/ui/form-fields/ui/DateField';

interface FilterDateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function FilterDateField({
  label,
  value,
  onChange,
  placeholder,
}: FilterDateFieldProps) {
  return (
    <DateField
      id={`filter-${label}`}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

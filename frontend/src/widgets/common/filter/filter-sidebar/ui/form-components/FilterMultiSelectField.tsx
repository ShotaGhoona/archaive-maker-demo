'use client';

import { MultiSelectField } from '@/shared/ui/form-fields/ui/MultiSelectField';
import type { FilterOption } from '../../model/types';

interface FilterMultiSelectFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: FilterOption[];
  placeholder?: string;
}

export function FilterMultiSelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: FilterMultiSelectFieldProps) {
  return (
    <MultiSelectField
      id={`filter-${label}`}
      label={label}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
    />
  );
}

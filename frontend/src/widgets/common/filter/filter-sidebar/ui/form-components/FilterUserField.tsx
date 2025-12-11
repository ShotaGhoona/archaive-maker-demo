'use client';

import { UserSelectField } from '@/shared/ui/form-fields/ui/UserSelectField';
import type { UserOption } from '../../model/types';

interface FilterUserFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: UserOption[];
  placeholder?: string;
}

export function FilterUserField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: FilterUserFieldProps) {
  return (
    <UserSelectField
      id={`filter-${label}`}
      label={label}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
    />
  );
}

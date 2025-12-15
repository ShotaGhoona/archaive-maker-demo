'use client';

import { TextField } from '@/shared/ui/form-fields/ui/TextField';

interface FilterTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function FilterTextField({
  label,
  value,
  onChange,
  placeholder,
}: FilterTextFieldProps) {
  return (
    <TextField
      id={`filter-${label}`}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';
import type { FacetCategory } from '@/shared/dummy-data/bom-v2/types';

interface CategoryFilterProps {
  value: FacetCategory | 'all';
  onChange: (value: FacetCategory | 'all') => void;
}

const categoryOptions: { value: FacetCategory | 'all'; label: string }[] = [
  { value: 'all', label: '全て' },
  { value: 'Design', label: '設計属性' },
  { value: 'Procurement', label: '調達属性' },
  { value: 'Manufacturing', label: '製造属性' },
  { value: 'Drawing', label: '図面属性' },
  { value: 'Document', label: '帳票属性' },
];

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as FacetCategory | 'all')}
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {categoryOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

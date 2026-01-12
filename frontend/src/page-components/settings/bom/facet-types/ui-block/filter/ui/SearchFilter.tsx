'use client';

import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/shadcn/ui/input';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchFilter({ value, onChange }: SearchFilterProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="検索..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-48 pl-9"
      />
    </div>
  );
}

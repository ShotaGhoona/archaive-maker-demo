'use client';

import { SearchBar } from '@/widgets/common/filter/search-bar/ui/SearchBar';

interface ProjectSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectSearchBar({ value, onChange }: ProjectSearchBarProps) {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder='案件コード、案件名、顧客名で検索...'
      expandedWidth='w-96'
    />
  );
}

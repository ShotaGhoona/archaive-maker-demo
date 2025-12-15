'use client';

import { SearchBar } from '@/widgets/common/filter/search-bar/ui/SearchBar';

interface DocumentSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function DocumentSearchBar({
  value,
  onChange,
  placeholder,
}: DocumentSearchBarProps) {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      expandedWidth='w-96'
    />
  );
}

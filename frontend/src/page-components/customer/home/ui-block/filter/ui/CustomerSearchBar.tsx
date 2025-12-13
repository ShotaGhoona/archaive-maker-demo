'use client';

import { SearchBar } from '@/widgets/common/filter/search-bar/ui/SearchBar';

interface CustomerSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function CustomerSearchBar({
  value,
  onChange,
}: CustomerSearchBarProps) {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder="顧客コード、会社名で検索..."
      expandedWidth="w-96"
    />
  );
}

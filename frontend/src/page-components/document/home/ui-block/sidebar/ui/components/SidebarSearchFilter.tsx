'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

import { Input } from '@/shared/ui/shadcn/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';

import type { DocumentCategory } from '@/shared/dummy-data/document/documents';

interface SidebarSearchFilterProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  categoryFilter: DocumentCategory | 'all';
  onCategoryFilterChange: (category: DocumentCategory | 'all') => void;
}

export function SidebarSearchFilter({
  searchQuery,
  onSearchQueryChange,
  categoryFilter,
  onCategoryFilterChange,
}: SidebarSearchFilterProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 検索窓を開いたらフォーカス
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // 検索窓を閉じる
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    onSearchQueryChange('');
  };

  return (
    <div className='flex items-center gap-2 border-b border-slate-200/60 p-3'>
      {isSearchOpen ? (
        // 検索窓展開時
        <div className='relative flex-1'>
          <Search className='absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
          <Input
            ref={inputRef}
            type='text'
            placeholder='帳票種別を検索...'
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className='pl-8 pr-8'
          />
          <button
            onClick={handleCloseSearch}
            className='absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600'
          >
            <X className='h-4 w-4' />
          </button>
        </div>
      ) : (
        // 通常時：検索アイコン + カテゴリフィルター
        <>
          <button
            onClick={() => setIsSearchOpen(true)}
            className='flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 bg-white/40 text-slate-500 backdrop-blur-sm transition-all duration-200 hover:bg-white/60 hover:text-slate-700'
          >
            <Search className='h-4 w-4' />
          </button>
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              onCategoryFilterChange(value as DocumentCategory | 'all')
            }
          >
            <SelectTrigger className='flex-1'>
              <SelectValue placeholder='すべて' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>すべて</SelectItem>
              <SelectItem value='product'>製品</SelectItem>
              <SelectItem value='company'>会社</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
}

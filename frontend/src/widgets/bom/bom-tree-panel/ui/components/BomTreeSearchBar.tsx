'use client';

import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';

interface BomTreeSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentMatchIndex: number;
  matchCount: number;
  onPrev: () => void;
  onNext: () => void;
  onClear: () => void;
}

export function BomTreeSearchBar({
  searchQuery,
  onSearchChange,
  currentMatchIndex,
  matchCount,
  onPrev,
  onNext,
  onClear,
}: BomTreeSearchBarProps) {
  return (
    <div
      className={cn(
        'flex h-12 items-center gap-1 rounded-md border bg-card px-3',
        'focus-within:ring-1 focus-within:ring-ring',
      )}
    >
      <Search className='h-4 w-4 shrink-0 text-muted-foreground' />
      <input
        type='text'
        placeholder='BOM内を検索...'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className='h-full w-64 bg-transparent text-sm outline-none placeholder:text-muted-foreground'
      />

      {/* ナビゲーション（検索クエリがある場合のみ表示） */}
      {searchQuery && (
        <>
          <div className='mx-1 h-4 w-px bg-border' />
          <button
            onClick={onPrev}
            disabled={matchCount === 0}
            className='rounded p-0.5 hover:bg-muted disabled:opacity-50'
          >
            <ChevronLeft className='h-4 w-4 text-muted-foreground' />
          </button>
          <span className='min-w-[40px] text-center text-xs text-muted-foreground'>
            {matchCount > 0 ? `${currentMatchIndex + 1}/${matchCount}` : '0/0'}
          </span>
          <button
            onClick={onNext}
            disabled={matchCount === 0}
            className='rounded p-0.5 hover:bg-muted disabled:opacity-50'
          >
            <ChevronRight className='h-4 w-4 text-muted-foreground' />
          </button>
          <button
            onClick={onClear}
            className='rounded p-0.5 hover:bg-muted'
          >
            <X className='h-4 w-4 text-muted-foreground' />
          </button>
        </>
      )}
    </div>
  );
}

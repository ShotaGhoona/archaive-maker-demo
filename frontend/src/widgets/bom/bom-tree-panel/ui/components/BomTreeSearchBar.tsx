'use client';

import { useRef, useState } from 'react';
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
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCollapse = () => {
    if (!searchQuery) {
      setExpanded(false);
    }
  };

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  const isExpanded = expanded || !!searchQuery;

  return (
    <div
      className={cn(
        'relative transition-all duration-300 ease-out',
        isExpanded ? 'w-72' : 'w-12'
      )}
    >
      {isExpanded ? (
        <div
          className={cn(
            'flex h-12 items-center gap-2 rounded-xl px-4',
            'border border-white/60 bg-white/40 backdrop-blur-xl',
            'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
            'focus-within:bg-white/60 focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.1)]',
            'transition-all'
          )}
        >
          <Search className='size-4 shrink-0 text-slate-400' />
          <input
            ref={inputRef}
            type='text'
            placeholder='BOM内を検索...'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onBlur={handleCollapse}
            className='h-full flex-1 min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400'
          />

          {searchQuery && (
            <>
              <div className='h-4 w-px bg-slate-200/60' />
              <button
                onClick={onPrev}
                disabled={matchCount === 0}
                className='rounded-lg p-1 text-slate-500 transition-colors hover:bg-white/50 hover:text-slate-700 disabled:opacity-50'
              >
                <ChevronLeft className='size-4' />
              </button>
              <span className='min-w-[36px] text-center text-xs text-slate-500'>
                {matchCount > 0 ? `${currentMatchIndex + 1}/${matchCount}` : '0/0'}
              </span>
              <button
                onClick={onNext}
                disabled={matchCount === 0}
                className='rounded-lg p-1 text-slate-500 transition-colors hover:bg-white/50 hover:text-slate-700 disabled:opacity-50'
              >
                <ChevronRight className='size-4' />
              </button>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
                className='rounded-lg p-1 text-slate-500 transition-colors hover:bg-white/50 hover:text-slate-700'
              >
                <X className='size-4' />
              </button>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={handleExpand}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            'border border-white/60 bg-white/40 backdrop-blur-xl',
            'text-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
            'transition-all duration-200',
            'hover:bg-white/60 hover:text-slate-900 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
          )}
        >
          <Search className='size-5' />
        </button>
      )}
    </div>
  );
}

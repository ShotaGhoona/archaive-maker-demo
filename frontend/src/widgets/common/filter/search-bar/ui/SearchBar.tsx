'use client';

import { useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  expandedWidth?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = '検索...',
  expandedWidth = 'w-80',
}: SearchBarProps) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCollapse = () => {
    if (!value) {
      setExpanded(false);
    }
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  // 展開状態または値がある場合は展開表示
  const isExpanded = expanded || !!value;

  return (
    <div
      className={cn(
        'relative transition-all duration-300 ease-out',
        isExpanded ? expandedWidth : 'w-12',
      )}
    >
      {isExpanded ? (
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
          <input
            ref={inputRef}
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleCollapse}
            placeholder={placeholder}
            className={cn(
              'h-12 w-full rounded-xl pl-10 pr-10 text-sm',
              'border border-white/60 bg-white/40 backdrop-blur-xl',
              'text-slate-900 placeholder:text-slate-400',
              'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
              'outline-none transition-all duration-200',
              'focus:bg-white/60 focus:shadow-[0_4px_20px_rgba(0,0,0,0.1)]',
            )}
          />
          {value && (
            <button
              className='absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600'
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
            >
              <X className='size-4' />
            </button>
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
            'hover:bg-white/60 hover:text-slate-900 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]',
          )}
        >
          <Search className='size-5' />
        </button>
      )}
    </div>
  );
}

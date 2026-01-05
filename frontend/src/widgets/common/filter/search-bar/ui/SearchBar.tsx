'use client';

import { useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
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
        'relative transition-all duration-200',
        isExpanded ? expandedWidth : 'w-12',
      )}
    >
      {isExpanded ? (
        <>
          <Search className='absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground' />
          <input
            ref={inputRef}
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleCollapse}
            placeholder={placeholder}
            className='h-14 w-full rounded border-2 border-input bg-white pl-12 pr-12 text-base outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20'
          />
          {value && (
            <Button
              variant='ghost'
              size='icon-sm'
              className='absolute right-2 top-1/2 size-9 -translate-y-1/2'
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
            >
              <X className='size-5' />
            </Button>
          )}
        </>
      ) : (
        <Button
          variant='outline'
          size='icon-xl'
          className='bg-white'
          onClick={handleExpand}
        >
          <Search className='size-6' />
        </Button>
      )}
    </div>
  );
}

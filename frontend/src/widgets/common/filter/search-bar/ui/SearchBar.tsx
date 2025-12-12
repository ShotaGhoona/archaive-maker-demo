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
        isExpanded ? expandedWidth : 'w-12'
      )}
    >
      {isExpanded ? (
        <>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleCollapse}
            placeholder={placeholder}
            className="h-12 w-full rounded-lg border bg-card pl-9 pr-9 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
          {value && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1.5 top-1/2 size-7 -translate-y-1/2"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
            >
              <X className="size-4" />
            </Button>
          )}
        </>
      ) : (
        <Button
          variant="outline"
          size="icon-xl"
          className="bg-card"
          onClick={handleExpand}
        >
          <Search className="size-5" />
        </Button>
      )}
    </div>
  );
}

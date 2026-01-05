'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Button } from '@/shared/ui/shadcn/ui/button';

interface CanvasSearchProps {
  className?: string;
  onSearch?: (query: string) => void;
}

export function CanvasSearch({ className, onSearch }: CanvasSearchProps) {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  const handleToggle = () => {
    if (isExpanded && query) {
      handleClear();
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        'absolute z-10 flex items-center gap-2',
        className
      )}
    >
      <form onSubmit={handleSubmit} className="flex items-center">
        <div
          className={cn(
            'flex items-center bg-white border rounded-lg shadow-sm transition-all duration-200',
            isExpanded ? 'w-64' : 'w-10'
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={handleToggle}
          >
            <Search className="h-4 w-4" />
          </Button>

          {isExpanded && (
            <>
              <Input
                type="text"
                placeholder="BOM内を検索..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 px-0"
                autoFocus
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 mr-1"
                  onClick={handleClear}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
}

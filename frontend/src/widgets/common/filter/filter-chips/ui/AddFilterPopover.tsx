'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/ui/popover';
import { Input } from '@/shared/ui/shadcn/ui/input';
import type { FilterFieldConfig } from '../model/types';

interface AddFilterPopoverProps {
  fields: FilterFieldConfig[];
  activeFieldKeys: string[];
  onSelectField: (field: FilterFieldConfig) => void;
}

export function AddFilterPopover({
  fields,
  activeFieldKeys,
  onSelectField,
}: AddFilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // アクティブでないフィールドのみ表示
  const availableFields = fields.filter(
    (field) => !activeFieldKeys.includes(field.key),
  );

  // 検索でフィルタリング
  const filteredFields = availableFields.filter((field) =>
    field.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectField = (field: FilterFieldConfig) => {
    onSelectField(field);
    setOpen(false);
    setSearchQuery('');
  };

  if (availableFields.length === 0) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className={cn(
            'gap-1.5 rounded-full px-3 text-slate-500',
            'border border-dashed border-slate-300',
            'hover:border-slate-400 hover:bg-white/50 hover:text-slate-700',
          )}
        >
          <Plus className='size-4' />
          フィルター追加
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className={cn(
          'w-64 p-2',
          'border-white/60 bg-white/90 backdrop-blur-xl',
          'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
        )}
      >
        {/* 検索ボックス */}
        <div className='relative mb-2'>
          <Search className='absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
          <Input
            type='text'
            placeholder='フィールドを検索...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='h-8 bg-white/50 pl-8 text-sm'
          />
        </div>

        {/* フィールドリスト */}
        <div className='max-h-64 overflow-y-auto'>
          {filteredFields.length === 0 ? (
            <p className='py-4 text-center text-sm text-slate-500'>
              該当するフィールドがありません
            </p>
          ) : (
            <div className='space-y-0.5'>
              {filteredFields.map((field) => (
                <button
                  key={field.key}
                  type='button'
                  onClick={() => handleSelectField(field)}
                  className={cn(
                    'w-full rounded-md px-3 py-2 text-left text-sm',
                    'text-slate-700 transition-colors',
                    'hover:bg-white/70',
                  )}
                >
                  {field.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

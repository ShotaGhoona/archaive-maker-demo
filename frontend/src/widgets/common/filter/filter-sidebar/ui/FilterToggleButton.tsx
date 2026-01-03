'use client';

import { Filter, X } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';

interface FilterToggleButtonProps {
  open: boolean;
  onToggle: () => void;
}

export function FilterToggleButton({
  open,
  onToggle,
}: FilterToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-medium',
        'border border-white/60 backdrop-blur-xl',
        'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
        'transition-all duration-200',
        open
          ? 'bg-slate-900 text-white hover:bg-slate-800'
          : 'bg-white/40 text-slate-600 hover:bg-white/60 hover:text-slate-900',
      )}
    >
      {open ? (
        <>
          <X className='h-4 w-4' />
          閉じる
        </>
      ) : (
        <>
          <Filter className='h-4 w-4' />
          フィルター
        </>
      )}
    </button>
  );
}

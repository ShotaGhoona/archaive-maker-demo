'use client';

import { X } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';

interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
  className?: string;
}

export function FilterChip({
  label,
  value,
  onRemove,
  className,
}: FilterChipProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full',
        'border border-white/60 bg-white/60 backdrop-blur-xl',
        'pl-3 pr-1.5 py-1 text-sm',
        'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
        'transition-all hover:bg-white/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]',
        className
      )}
    >
      <span className="text-slate-500 font-medium">{label}:</span>
      <span className="text-slate-700 max-w-32 truncate">{value}</span>
      <button
        type="button"
        onClick={onRemove}
        className={cn(
          'ml-0.5 flex size-5 items-center justify-center rounded-full',
          'text-slate-400 transition-all',
          'hover:bg-slate-200/60 hover:text-slate-600'
        )}
      >
        <X className="size-3" />
      </button>
    </div>
  );
}

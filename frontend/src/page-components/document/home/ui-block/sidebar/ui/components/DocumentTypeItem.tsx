'use client';

import { ClipboardList } from 'lucide-react';

import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { cn } from '@/shared/ui/shadcn/lib/utils';

import type {
  DocumentType,
  DocumentCategory,
} from '../../../../dummy-data/documents';

// カテゴリラベル
const categoryLabels: Record<DocumentCategory, string> = {
  product: '製品',
  company: '会社',
};

// カテゴリカラー
const categoryColors: Record<DocumentCategory, string> = {
  product: 'bg-slate-100/50 text-slate-700 border-slate-200/60',
  company: 'bg-slate-100/50 text-slate-700 border-slate-200/60',
};

interface DocumentTypeItemProps {
  type: DocumentType;
  isSelected: boolean;
  onSelect: () => void;
}

export function DocumentTypeItem({
  type,
  isSelected,
  onSelect,
}: DocumentTypeItemProps) {
  return (
    <li>
      <button
        onClick={onSelect}
        className={cn(
          'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all duration-200',
          isSelected
            ? 'bg-white/70 font-medium text-slate-900 shadow-sm'
            : 'text-slate-600 hover:bg-white/60 hover:text-slate-900',
        )}
      >
        <ClipboardList className='size-5 shrink-0' />
        <span className='flex-1 truncate text-left'>{type.name}</span>
        <Badge
          variant='outline'
          className={cn('shrink-0 text-xs', categoryColors[type.category])}
        >
          {categoryLabels[type.category]}
        </Badge>
      </button>
    </li>
  );
}

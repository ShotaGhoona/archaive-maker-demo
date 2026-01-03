'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, Check, Settings } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/ui/popover';

import {
  documentTypes,
  getDocumentTypeById,
  type DocumentCategory,
} from '@/shared/dummy-data/document/documents';
import { DocumentTypeManageDialog } from '../../sidebar/ui/DocumentTypeManageDialog';

interface DocumentTypeBreadcrumbProps {
  selectedTypeId: string;
  onSelectType: (typeId: string) => void;
}

const categoryLabels: Record<DocumentCategory, string> = {
  product: '製品に紐づく帳票',
  company: '会社に紐づく帳票',
};

export function DocumentTypeBreadcrumb({
  selectedTypeId,
  onSelectType,
}: DocumentTypeBreadcrumbProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const selectedType = getDocumentTypeById(selectedTypeId);
  const selectedCategory = selectedType?.category || 'product';

  // カテゴリ別にグループ化
  const typesByCategory = useMemo(() => {
    return {
      product: documentTypes.filter((t) => t.category === 'product'),
      company: documentTypes.filter((t) => t.category === 'company'),
    };
  }, []);

  // 現在のカテゴリの帳票種別リスト
  const currentCategoryTypes = typesByCategory[selectedCategory];

  const handleCategorySelect = (category: DocumentCategory) => {
    // カテゴリを変更したら、そのカテゴリの最初の帳票種別を選択
    const firstType = typesByCategory[category][0];
    if (firstType) {
      onSelectType(firstType.id);
    }
    setCategoryOpen(false);
  };

  const handleTypeSelect = (typeId: string) => {
    onSelectType(typeId);
    setTypeOpen(false);
  };

  return (
    <div className='flex items-center gap-1'>
      {/* カテゴリセレクター */}
      <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' size='sm' className='gap-1 px-3'>
            {categoryLabels[selectedCategory]}
            <ChevronRight className='size-4 rotate-90 text-slate-400' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          className={cn(
            'w-56 p-1',
            'border-white/60 bg-white/90 backdrop-blur-xl',
            'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
          )}
        >
          {(Object.keys(categoryLabels) as DocumentCategory[]).map(
            (category) => (
              <button
                key={category}
                type='button'
                onClick={() => handleCategorySelect(category)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm',
                  'transition-colors hover:bg-white/70',
                  selectedCategory === category
                    ? 'font-medium text-slate-900'
                    : 'text-slate-600',
                )}
              >
                <span>{categoryLabels[category]}</span>
                {selectedCategory === category && (
                  <Check className='size-4 text-slate-600' />
                )}
              </button>
            ),
          )}
        </PopoverContent>
      </Popover>

      {/* セパレーター */}
      <ChevronRight className='size-4 text-slate-300' />

      {/* 帳票種別セレクター */}
      <Popover open={typeOpen} onOpenChange={setTypeOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='gap-1 px-3 font-medium'
          >
            {selectedType?.name || '帳票種別を選択'}
            <ChevronRight className='size-4 rotate-90 text-slate-400' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          className={cn(
            'w-64 p-1',
            'border-white/60 bg-white/90 backdrop-blur-xl',
            'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
          )}
        >
          <div className='max-h-72 overflow-y-auto'>
            {currentCategoryTypes.map((type) => (
              <button
                key={type.id}
                type='button'
                onClick={() => handleTypeSelect(type.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left',
                  'transition-colors hover:bg-white/70',
                  selectedTypeId === type.id
                    ? 'text-slate-900'
                    : 'text-slate-600',
                )}
              >
                <div className='min-w-0 flex-1'>
                  <p
                    className={cn(
                      'truncate text-sm',
                      selectedTypeId === type.id && 'font-medium',
                    )}
                  >
                    {type.name}
                  </p>
                  <p className='truncate text-xs text-slate-400'>
                    {type.description}
                  </p>
                </div>
                {selectedTypeId === type.id && (
                  <Check className='ml-2 size-4 shrink-0 text-slate-600' />
                )}
              </button>
            ))}
          </div>

          {/* 帳票種別管理 */}
          <div className='mt-1 border-t border-slate-200/40 pt-1'>
            <DocumentTypeManageDialog
              trigger={
                <button
                  type='button'
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm',
                    'text-slate-500 transition-colors hover:bg-white/70 hover:text-slate-700',
                  )}
                >
                  <Settings className='size-4' />
                  帳票種別を管理
                </button>
              }
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

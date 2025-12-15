'use client';

import { Check, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { ColumnItem } from '../ColumnItem';

interface FilterVisibilityTabProps {
  visibleKeys: string[];
  hiddenKeys: string[];
  selectedKey: string | null;
  getLabel: (key: string) => string;
  onSelect: (key: string) => void;
  onMoveUp: (keys: string[], isVisible: boolean, key: string) => void;
  onMoveDown: (keys: string[], isVisible: boolean, key: string) => void;
  onMoveToHidden: (key: string) => void;
  onMoveToVisible: (key: string) => void;
}

export function FilterVisibilityTab({
  visibleKeys,
  hiddenKeys,
  selectedKey,
  getLabel,
  onSelect,
  onMoveUp,
  onMoveDown,
  onMoveToHidden,
  onMoveToVisible,
}: FilterVisibilityTabProps) {
  return (
    <div className='flex h-full flex-col'>
      {/* リスト */}
      <div className='grid min-h-0 flex-1 grid-cols-2 gap-6'>
        {/* 非表示フィルター */}
        <div className='flex min-h-0 flex-col rounded-lg border bg-card py-4'>
          <h3 className='mb-3 flex shrink-0 items-center gap-2 px-4 text-base font-medium'>
            <X className='size-5 text-muted-foreground' />
            非表示のフィルター
            <span className='text-muted-foreground'>({hiddenKeys.length})</span>
          </h3>
          <div className='flex min-h-0 flex-1 flex-col overflow-y-auto px-4'>
            {hiddenKeys.length === 0 ? (
              <div className='flex flex-1 items-center justify-center'>
                <NoData
                  title='すべてのフィルターが表示されています'
                  size='sm'
                />
              </div>
            ) : (
              <div className='space-y-2'>
                {hiddenKeys.map((key, index) => (
                  <ColumnItem
                    key={key}
                    header={getLabel(key)}
                    isSelected={selectedKey === key}
                    isFirst={index === 0}
                    isLast={index === hiddenKeys.length - 1}
                    onSelect={() => onSelect(key)}
                    onMoveUp={() => onMoveUp(hiddenKeys, false, key)}
                    onMoveDown={() => onMoveDown(hiddenKeys, false, key)}
                    onTransfer={() => onMoveToVisible(key)}
                    transferIcon={<ChevronRight className='size-4' />}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 表示フィルター */}
        <div className='flex min-h-0 flex-col rounded-lg border bg-card py-4'>
          <h3 className='mb-3 flex shrink-0 items-center gap-2 px-4 text-base font-medium'>
            <Check className='size-5 text-muted-foreground' />
            表示するフィルター
            <span className='text-muted-foreground'>
              ({visibleKeys.length})
            </span>
          </h3>
          <div className='flex min-h-0 flex-1 flex-col overflow-y-auto px-4'>
            {visibleKeys.length === 0 ? (
              <div className='flex flex-1 items-center justify-center'>
                <NoData title='表示するフィルターがありません' size='sm' />
              </div>
            ) : (
              <div className='space-y-2'>
                {visibleKeys.map((key, index) => (
                  <ColumnItem
                    key={key}
                    header={getLabel(key)}
                    isSelected={selectedKey === key}
                    isFirst={index === 0}
                    isLast={index === visibleKeys.length - 1}
                    onSelect={() => onSelect(key)}
                    onMoveUp={() => onMoveUp(visibleKeys, true, key)}
                    onMoveDown={() => onMoveDown(visibleKeys, true, key)}
                    onTransfer={() => onMoveToHidden(key)}
                    transferIcon={<ChevronLeft className='size-4' />}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

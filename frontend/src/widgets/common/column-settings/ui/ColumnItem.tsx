'use client';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

interface ColumnItemProps {
  header: string;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onTransfer: () => void;
  transferIcon: React.ReactNode;
}

export function ColumnItem({
  header,
  isSelected,
  isFirst,
  isLast,
  onSelect,
  onMoveUp,
  onMoveDown,
  onTransfer,
  transferIcon,
}: ColumnItemProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
        isSelected
          ? 'border-primary bg-primary/10'
          : 'bg-background hover:bg-muted/50'
      }`}
      onClick={onSelect}
    >
      <GripVertical className='size-5 text-muted-foreground' />
      <span className='flex-1 text-base'>{header}</span>
      <div className='flex items-center gap-1'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='size-9'
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          disabled={isFirst}
        >
          <ChevronUp className='size-5' />
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='size-9'
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          disabled={isLast}
        >
          <ChevronDown className='size-5' />
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='size-9'
          onClick={(e) => {
            e.stopPropagation();
            onTransfer();
          }}
        >
          {transferIcon}
        </Button>
      </div>
    </div>
  );
}

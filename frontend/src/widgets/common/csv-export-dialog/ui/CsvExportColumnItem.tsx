'use client';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { Checkbox } from '@/shared/ui/shadcn/ui/checkbox';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

interface CsvExportColumnItemProps {
  label: string;
  isSelected: boolean;
  isIncluded: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
  onToggleInclude: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function CsvExportColumnItem({
  label,
  isSelected,
  isIncluded,
  isFirst,
  isLast,
  onSelect,
  onToggleInclude,
  onMoveUp,
  onMoveDown,
}: CsvExportColumnItemProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition-colors ${
        isSelected
          ? 'border-primary bg-primary/10'
          : 'bg-background hover:bg-muted/50'
      }`}
      onClick={onSelect}
    >
      <Checkbox
        checked={isIncluded}
        onCheckedChange={() => onToggleInclude()}
        onClick={(e) => e.stopPropagation()}
      />
      <GripVertical className='h-4 w-4 text-muted-foreground' />
      <span
        className={`flex-1 text-sm ${!isIncluded ? 'text-muted-foreground line-through' : ''}`}
      >
        {label}
      </span>
      <div className='flex items-center gap-1'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='h-7 w-7'
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          disabled={isFirst}
        >
          <ChevronUp className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='h-7 w-7'
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          disabled={isLast}
        >
          <ChevronDown className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}

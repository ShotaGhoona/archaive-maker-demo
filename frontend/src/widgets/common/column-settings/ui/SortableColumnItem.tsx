'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Checkbox } from '@/shared/ui/shadcn/ui/checkbox';
import { cn } from '@/shared/ui/shadcn/lib/utils';

interface SortableColumnItemProps {
  id: string;
  label: string;
  visible: boolean;
  onToggleVisibility: () => void;
}

export function SortableColumnItem({
  id,
  label,
  visible,
  onToggleVisibility,
}: SortableColumnItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-3 bg-background px-4 py-3 transition-colors',
        isDragging && 'relative z-10 shadow-lg',
        !visible && 'opacity-50',
      )}
    >
      <button
        type='button'
        className='cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing'
        {...attributes}
        {...listeners}
      >
        <GripVertical className='size-5' />
      </button>

      <Checkbox
        id={`column-${id}`}
        checked={visible}
        onCheckedChange={onToggleVisibility}
        className='size-5'
      />

      <label
        htmlFor={`column-${id}`}
        className={cn(
          'flex-1 cursor-pointer select-none text-base',
          !visible && 'text-muted-foreground',
        )}
      >
        {label}
      </label>
    </div>
  );
}

'use client';

import { useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableColumnItem } from '../SortableColumnItem';

interface ColumnItem {
  key: string;
  visible: boolean;
}

interface ColumnVisibilityTabProps {
  items: ColumnItem[];
  getLabel: (key: string) => string;
  onReorder: (items: ColumnItem[]) => void;
  onToggleVisibility: (key: string) => void;
}

export function ColumnVisibilityTab({
  items,
  getLabel,
  onReorder,
  onToggleVisibility,
}: ColumnVisibilityTabProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const itemIds = useMemo(() => items.map((item) => item.key), [items]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.key === active.id);
      const newIndex = items.findIndex((item) => item.key === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  };

  const visibleCount = items.filter((item) => item.visible).length;

  return (
    <div className='flex h-full flex-col'>
      <div className='mb-4 flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          ドラッグで順序を変更、チェックで表示/非表示を切り替えできます
        </p>
        <p className='text-sm text-muted-foreground'>
          {visibleCount} / {items.length} 列を表示
        </p>
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto rounded-lg border bg-card'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={itemIds}
            strategy={verticalListSortingStrategy}
          >
            <div className='divide-y'>
              {items.map((item) => (
                <SortableColumnItem
                  key={item.key}
                  id={item.key}
                  label={getLabel(item.key)}
                  visible={item.visible}
                  onToggleVisibility={() => onToggleVisibility(item.key)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

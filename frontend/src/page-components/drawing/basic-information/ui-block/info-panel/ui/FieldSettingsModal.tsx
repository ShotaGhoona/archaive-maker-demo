'use client';

import { useState, useMemo, useCallback } from 'react';
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
import { Check, X, RotateCcw, Eye, EyeOff, Settings } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/shared/ui/shadcn/ui/dialog';
import { SortableColumnItem } from '@/widgets/common/column-settings/ui/SortableColumnItem';

interface FieldConfig {
  key: string;
  label: string;
}

interface FieldItem {
  key: string;
  visible: boolean;
}

interface FieldSettingsModalProps {
  fields: FieldConfig[];
}

export function FieldSettingsModal({ fields }: FieldSettingsModalProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<FieldItem[]>([]);

  // ダイアログを開いたときに初期化
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setItems(fields.map((f) => ({ key: f.key, visible: true })));
    }
  };

  const getLabel = useCallback(
    (key: string) => {
      return fields.find((f) => f.key === key)?.label ?? key;
    },
    [fields],
  );

  // 表示/非表示の切り替え
  const toggleVisibility = useCallback((key: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, visible: !item.visible } : item,
      ),
    );
  }, []);

  // D&Dセンサー
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
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  // リセット
  const handleReset = () => {
    setItems(fields.map((f) => ({ key: f.key, visible: true })));
  };

  // 全て非表示
  const handleHideAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, visible: false })));
  };

  // 全て表示
  const handleShowAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, visible: true })));
  };

  // 保存
  const handleSave = () => {
    // TODO: API呼び出し
    console.log('[FieldSettings] 保存:', items);
    alert('設定を保存しました（未実装）');
    setOpen(false);
  };

  const visibleCount = items.filter((item) => item.visible).length;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' className='bg-card'>
          <Settings className='size-4' />
          表示項目設定
        </Button>
      </DialogTrigger>
      <DialogContent className='flex h-[80vh] max-h-[900px] flex-col gap-0 p-0 sm:max-w-2xl'>
        <DialogHeader className='shrink-0 border-b px-6 py-4'>
          <DialogTitle>表示項目の設定</DialogTitle>
        </DialogHeader>

        <div className='flex min-h-0 flex-1 flex-col p-6'>
          <div className='mb-4 flex items-center justify-between'>
            <p className='text-sm text-muted-foreground'>
              ドラッグで順序を変更、チェックで表示/非表示を切り替えできます
            </p>
            <p className='text-sm text-muted-foreground'>
              {visibleCount} / {items.length} 項目を表示
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
                      onToggleVisibility={() => toggleVisibility(item.key)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* フッター */}
        <DialogFooter className='shrink-0 border-t bg-background px-6 py-4'>
          <div className='mr-auto flex gap-2'>
            <Button type='button' variant='outline' onClick={handleReset}>
              <RotateCcw className='size-4' />
              リセット
            </Button>
            <Button type='button' variant='outline' onClick={handleHideAll}>
              <EyeOff className='size-4' />
              全て非表示
            </Button>
            <Button type='button' variant='outline' onClick={handleShowAll}>
              <Eye className='size-4' />
              全て表示
            </Button>
          </div>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            <X className='size-4' />
            キャンセル
          </Button>
          <Button type='button' onClick={handleSave}>
            <Check className='size-4' />
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { CalendarIcon, Plus } from 'lucide-react';
import {
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalTitle,
  FloatingModalFooter,
} from '@/shared/ui/shadcn/ui/floating-modal';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Textarea } from '@/shared/ui/shadcn/ui/textarea';
import { Label } from '@/shared/ui/shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { Calendar } from '@/shared/ui/shadcn/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/ui/popover';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { getItemTypeLabel } from '@/shared/lib/bom-v2/item-type';
import type { TaskPriority, ItemType } from '@/shared/dummy-data/bom-v2';

interface CreateTaskModalProps {
  itemRevId: string;
  itemId: string;
  itemName: string;
  partNumber: string;
  itemType: ItemType;
}

const ITEM_TYPE_STYLE: Record<ItemType, string> = {
  Product: 'bg-purple-100 text-purple-700',
  Assembly: 'bg-blue-100 text-blue-700',
  Part: 'bg-green-100 text-green-700',
  Purchased: 'bg-orange-100 text-orange-700',
  RawMaterial: 'bg-gray-100 text-gray-700',
};

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
];

export function CreateTaskModal({
  itemRevId,
  itemId,
  itemName,
  partNumber,
  itemType,
}: CreateTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const itemTypeStyle = ITEM_TYPE_STYLE[itemType];
  const itemTypeLabel = getItemTypeLabel(itemType);

  const resetForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(undefined);
  }, []);

  const handleBack = useCallback(() => {
    resetForm();
    setOpen(false);
  }, [resetForm]);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('タスク名を入力してください');
      return;
    }

    // TODO: API呼び出し
    alert(`タスク「${title}」を作成しました（未実装）`);
    handleBack();
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    setOpen(isOpen);
  };

  return (
    <FloatingModal open={open} onOpenChange={handleOpenChange} mode="replace" onBack={handleBack}>
      <FloatingModalTrigger asChild>
        <Button variant="outline" size="sm" className="mt-4 w-full">
          <Plus className="mr-1 size-4" />
          タスクを追加
        </Button>
      </FloatingModalTrigger>
      <FloatingModalContent height="auto" showBackButton>
        <FloatingModalHeader>
          <div className="space-y-2">
            <FloatingModalTitle className="flex items-center gap-2">
              <Plus className="size-4" />
              タスクを追加
            </FloatingModalTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>対象:</span>
              <Badge variant="outline" className={cn('text-xs', itemTypeStyle)}>
                {itemTypeLabel}
              </Badge>
              <span>{itemName}</span>
              <span className="text-xs">({partNumber})</span>
            </div>
          </div>
        </FloatingModalHeader>

        <FloatingModalBody className="space-y-4">
          {/* タスク名 */}
          <div className="space-y-2">
            <Label htmlFor="task-title">タスク名 *</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タスク名を入力"
            />
          </div>

          {/* 説明 */}
          <div className="space-y-2">
            <Label htmlFor="task-description">説明</Label>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="タスクの説明を入力"
              rows={3}
            />
          </div>

          {/* 優先度・期限 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 優先度 */}
            <div className="space-y-2">
              <Label>優先度</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 期限 */}
            <div className="space-y-2">
              <Label>期限</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dueDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {dueDate ? format(dueDate, 'PPP', { locale: ja }) : '期限を選択'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    locale={ja}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </FloatingModalBody>

        <FloatingModalFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleBack}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            <Plus className="mr-1 size-4" />
            タスクを作成
          </Button>
        </FloatingModalFooter>
      </FloatingModalContent>
    </FloatingModal>
  );
}

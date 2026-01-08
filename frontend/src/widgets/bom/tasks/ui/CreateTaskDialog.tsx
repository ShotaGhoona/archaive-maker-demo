'use client';

import { useState } from 'react';
import { CalendarIcon, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/shared/ui/shadcn/ui/dialog';
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
import type { TaskPriority, ItemType } from '@/shared/dummy-data/bom-v2';
import { items, getLatestReleasedRev } from '@/shared/dummy-data/bom-v2';

const dummyBomNodes = items.slice(0, 10).map((item) => {
  const rev = getLatestReleasedRev(item.id);
  return {
    id: rev?.id ?? item.id,
    itemId: item.id,
    name: item.name,
    partNumber: item.partNumber,
    itemType: item.itemType,
  };
});

const ITEM_TYPE_CONFIG: Record<ItemType, { label: string; className: string }> = {
  Product: { label: '製品', className: 'bg-purple-100 text-purple-700' },
  Assembly: { label: 'Assy', className: 'bg-blue-100 text-blue-700' },
  Part: { label: 'Part', className: 'bg-green-100 text-green-700' },
  Purchased: { label: '購入品', className: 'bg-orange-100 text-orange-700' },
  RawMaterial: { label: '素材', className: 'bg-gray-100 text-gray-700' },
};

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
];

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetNodeId, setTargetNodeId] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const selectedNode = dummyBomNodes.find((n) => n.id === targetNodeId);

  const handleSubmit = () => {
    // TODO: API呼び出し
    alert(`タスク「${title}」を作成しました（未実装）`);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      // モーダルを開くときにフォームをリセット
      setTitle('');
      setDescription('');
      setTargetNodeId('');
      setPriority('medium');
      setDueDate(undefined);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="xl">
          <Plus className="mr-1 size-4" />
          新規タスク
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Plus className="size-5 text-primary" />
            <DialogTitle>新規タスク作成</DialogTitle>
          </div>
          <DialogDescription>
            新しいタスクを作成します
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
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

          {/* 対象オブジェクト・優先度・期限 */}
          <div className="grid grid-cols-3 gap-4">
            {/* 対象オブジェクト */}
            <div className="space-y-2">
              <Label>対象オブジェクト</Label>
              <Select value={targetNodeId} onValueChange={setTargetNodeId}>
                <SelectTrigger>
                  <SelectValue placeholder="BOMノードを選択">
                    {selectedNode && (
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn('text-xs', ITEM_TYPE_CONFIG[selectedNode.itemType].className)}
                        >
                          {ITEM_TYPE_CONFIG[selectedNode.itemType].label}
                        </Badge>
                        <span className="truncate">{selectedNode.name}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-full">
                  {dummyBomNodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn('text-xs', ITEM_TYPE_CONFIG[node.itemType].className)}
                        >
                          {ITEM_TYPE_CONFIG[node.itemType].label}
                        </Badge>
                        <span>{node.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 優先度 */}
            <div className="space-y-2">
              <Label>優先度</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-full">
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            <Plus className="mr-2 size-4" />
            タスクを作成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

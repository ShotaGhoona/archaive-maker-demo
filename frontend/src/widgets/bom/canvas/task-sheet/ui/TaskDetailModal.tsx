'use client';

import {
  Circle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Play,
  MessageSquare,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/ui/avatar';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import {
  FloatingModal,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalTitle,
} from '@/shared/ui/shadcn/ui/floating-modal';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { getItemTypeLabel } from '@/shared/lib/bom-v2/item-type';
import type { Task, TaskStatus, TaskPriority, ItemType } from '@/shared/dummy-data/bom-v2';

interface TaskDetailModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
}

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; icon: React.ReactNode; variant: 'default' | 'secondary' | 'outline' }
> = {
  todo: {
    label: '未着手',
    icon: <Circle className="size-3" />,
    variant: 'outline',
  },
  in_progress: {
    label: '進行中',
    icon: <Clock className="size-3" />,
    variant: 'default',
  },
  done: {
    label: '完了',
    icon: <CheckCircle2 className="size-3" />,
    variant: 'secondary',
  },
};

const PRIORITY_CONFIG: Record<TaskPriority, { label: string; className: string }> = {
  high: { label: '高', className: 'text-red-500 bg-red-50' },
  medium: { label: '中', className: 'text-yellow-600 bg-yellow-50' },
  low: { label: '低', className: 'text-gray-500 bg-gray-100' },
};

const ITEM_TYPE_STYLE: Record<ItemType, string> = {
  Product: 'bg-purple-100 text-purple-700',
  Assembly: 'bg-blue-100 text-blue-700',
  Part: 'bg-green-100 text-green-700',
  Purchased: 'bg-orange-100 text-orange-700',
  RawMaterial: 'bg-gray-100 text-gray-700',
};

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function isOverdue(dueDate: string, status: TaskStatus): boolean {
  if (status === 'done') return false;
  return new Date(dueDate) < new Date();
}

export function TaskDetailModal({ task, open, onOpenChange, onBack }: TaskDetailModalProps) {
  if (!task) return null;

  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const itemTypeStyle = task.targetObject ? ITEM_TYPE_STYLE[task.targetObject.itemType] : null;
  const itemTypeLabel = task.targetObject ? getItemTypeLabel(task.targetObject.itemType) : null;
  const overdue = task.dueDate && isOverdue(task.dueDate, task.status);

  const handleStartTask = () => {
    // TODO: API呼び出し
    alert(`タスク「${task.title}」を開始（未実装）`);
  };

  const handleCompleteTask = () => {
    // TODO: API呼び出し
    alert(`タスク「${task.title}」を完了（未実装）`);
  };

  return (
    <FloatingModal open={open} onOpenChange={onOpenChange} mode="stack" onBack={onBack}>
      <FloatingModalContent height="auto" showBackButton>
        <FloatingModalHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={statusConfig.variant} className="gap-1">
                {statusConfig.icon}
                {statusConfig.label}
              </Badge>
              <Badge variant="outline" className={cn('gap-1', priorityConfig.className)}>
                <AlertTriangle className="size-3" />
                優先度: {priorityConfig.label}
              </Badge>
            </div>
            <FloatingModalTitle className="text-base">{task.title}</FloatingModalTitle>
          </div>
        </FloatingModalHeader>

        <FloatingModalBody className="space-y-4">
          {/* 説明 */}
          {task.description && (
            <p className="text-sm text-muted-foreground">{task.description}</p>
          )}

          <Separator />

          {/* 詳細情報 */}
          <div className="space-y-3">
            {/* 対象オブジェクト */}
            {task.targetObject && itemTypeStyle && itemTypeLabel && (
              <div className="flex items-center gap-3">
                <span className="w-16 text-xs text-muted-foreground">対象</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn('text-xs', itemTypeStyle)}>
                    {itemTypeLabel}
                  </Badge>
                  <span className="text-sm">{task.targetObject.itemName}</span>
                  <span className="text-xs text-muted-foreground">
                    ({task.targetObject.partNumber})
                  </span>
                </div>
              </div>
            )}

            {/* 担当者 */}
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs text-muted-foreground">担当者</span>
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={task.assignee.avatarUrl} />
                    <AvatarFallback className="text-xs">{task.assignee.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className='flex gap-2 items-end'>
                    <p className="text-sm">{task.assignee.name}</p>
                    {task.assignee.department && (
                      <p className="text-xs text-muted-foreground">{task.assignee.department}</p>
                    )}
                  </div>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">未割当</span>
              )}
            </div>

            {/* 期限 */}
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs text-muted-foreground">期限</span>
              {task.dueDate ? (
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span className={cn('text-sm', overdue && 'text-red-500 font-medium')}>
                    {formatDate(task.dueDate)}
                  </span>
                  {overdue && (
                    <Badge variant="destructive" className="text-xs">
                      期限切れ
                    </Badge>
                  )}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">未設定</span>
              )}
            </div>

            {/* 作成日 */}
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs text-muted-foreground">作成日</span>
              <span className="text-sm">{formatDateTime(task.createdAt)}</span>
            </div>
          </div>

          {/* 元コメント */}
          {task.sourceComment && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="size-3" />
                  <span>このタスクの元コメント</span>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-sm leading-relaxed line-clamp-3">
                    {task.sourceComment.content}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    — {task.sourceComment.authorName}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* アクションボタン */}
          {task.status !== 'done' && (
            <>
              <Separator />
              <div className="flex gap-2">
                {task.status === 'todo' && (
                  <Button size="sm" onClick={handleStartTask} className="flex-1">
                    <Play className="mr-1 size-3" />
                    開始
                  </Button>
                )}
                {task.status === 'in_progress' && (
                  <Button size="sm" onClick={handleCompleteTask} className="flex-1">
                    <CheckCircle2 className="mr-1 size-3" />
                    完了
                  </Button>
                )}
              </div>
            </>
          )}
        </FloatingModalBody>
      </FloatingModalContent>
    </FloatingModal>
  );
}

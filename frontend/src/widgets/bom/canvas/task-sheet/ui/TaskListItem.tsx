'use client';

import { Circle, Clock, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/ui/avatar';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { Task, TaskStatus, TaskPriority } from '@/shared/dummy-data/bom-v2';

interface TaskListItemProps {
  task: Task;
  isSelected?: boolean;
  onClick: () => void;
}

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  todo: {
    label: '未着手',
    icon: <Circle className="size-3" />,
    className: 'text-muted-foreground',
  },
  in_progress: {
    label: '進行中',
    icon: <Clock className="size-3" />,
    className: 'text-blue-600',
  },
  done: {
    label: '完了',
    icon: <CheckCircle2 className="size-3" />,
    className: 'text-green-600',
  },
};

const PRIORITY_CONFIG: Record<TaskPriority, { label: string; className: string }> = {
  high: { label: '高', className: 'text-red-500' },
  medium: { label: '中', className: 'text-yellow-500' },
  low: { label: '低', className: 'text-gray-400' },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    month: 'numeric',
    day: 'numeric',
  });
}

function isOverdue(dueDate: string, status: TaskStatus): boolean {
  if (status === 'done') return false;
  return new Date(dueDate) < new Date();
}

export function TaskListItem({ task, isSelected, onClick }: TaskListItemProps) {
  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const overdue = task.dueDate && isOverdue(task.dueDate, task.status);

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-lg border bg-card p-3 text-left transition-all',
        'hover:shadow-md hover:border-primary/50',
        isSelected && 'ring-2 ring-primary border-primary shadow-md',
        task.status === 'done' && 'opacity-60'
      )}
    >
      {/* 上部: タイトル + ステータス */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
          {task.title}
        </h4>
        <div className={cn('flex items-center gap-1 text-xs shrink-0', statusConfig.className)}>
          {statusConfig.icon}
          <span>{statusConfig.label}</span>
        </div>
      </div>

      {/* 下部: 優先度 + 期限 + 担当者 */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 優先度 */}
          <div className={cn('flex items-center gap-1 text-xs', priorityConfig.className)}>
            <AlertTriangle className="size-3" />
            <span>{priorityConfig.label}</span>
          </div>

          {/* 期限 */}
          {task.dueDate && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs',
                overdue ? 'text-red-500 font-medium' : 'text-muted-foreground'
              )}
            >
              <Calendar className="size-3" />
              <span>{formatDate(task.dueDate)}</span>
              {overdue && <span>期限切れ</span>}
            </div>
          )}
        </div>

        {/* 担当者 */}
        {task.assignee && (
          <div className="flex items-center gap-1.5">
            <Avatar className="size-5">
              <AvatarImage src={task.assignee.avatarUrl} />
              <AvatarFallback className="text-[10px]">
                {task.assignee.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {task.assignee.name}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

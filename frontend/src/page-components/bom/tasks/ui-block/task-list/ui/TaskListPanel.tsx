'use client';

import {
  Circle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/ui/avatar';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { Task, TaskStatus, TaskPriority } from '../../../dummy-data/tasks';

interface TaskListPanelProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onSelectTask: (taskId: string) => void;
}

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; icon: React.ReactNode; variant: 'default' | 'secondary' | 'outline' }
> = {
  todo: {
    label: '未着手',
    icon: <Circle className='size-3' />,
    variant: 'outline',
  },
  in_progress: {
    label: '進行中',
    icon: <Clock className='size-3' />,
    variant: 'default',
  },
  done: {
    label: '完了',
    icon: <CheckCircle2 className='size-3' />,
    variant: 'secondary',
  },
};

const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  high: { label: '高', className: 'text-red-500' },
  medium: { label: '中', className: 'text-yellow-500' },
  low: { label: '低', className: 'text-gray-400' },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
  });
}

function isOverdue(dueDate: string, status: TaskStatus): boolean {
  if (status === 'done') return false;
  return new Date(dueDate) < new Date();
}

function TaskCard({
  task,
  isSelected,
  onSelect,
}: {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const overdue = task.dueDate && isOverdue(task.dueDate, task.status);

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full rounded-xl p-3 text-left transition-all',
        'bg-white/50 border border-white/60',
        'hover:bg-white/70',
        isSelected && 'bg-white/70 shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
        task.status === 'done' && 'opacity-70'
      )}
    >
      {/* Header */}
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0 flex-1'>
          <h3 className='text-sm font-medium leading-tight text-slate-900'>{task.title}</h3>
          {task.description && (
            <p className='mt-1 line-clamp-2 text-xs text-slate-500'>
              {task.description}
            </p>
          )}
        </div>
        <Badge variant={statusConfig.variant} className='shrink-0 gap-1 text-[10px]'>
          {statusConfig.icon}
          {statusConfig.label}
        </Badge>
      </div>

      {/* Footer */}
      <div className='mt-2 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {/* 優先度 */}
          <div className='flex items-center gap-1'>
            <AlertTriangle className={cn('size-3', priorityConfig.className)} />
            <span className={cn('text-[10px]', priorityConfig.className)}>
              {priorityConfig.label}
            </span>
          </div>

          {/* 期限 */}
          {task.dueDate && (
            <div
              className={cn(
                'flex items-center gap-1 text-[10px]',
                overdue ? 'text-red-500' : 'text-slate-400'
              )}
            >
              <Calendar className='size-3' />
              <span>{formatDate(task.dueDate)}</span>
              {overdue && <span className='font-medium'>期限切れ</span>}
            </div>
          )}
        </div>

        {/* 担当者 */}
        {task.assignee && (
          <div className='flex items-center gap-1'>
            <Avatar className='size-4'>
              <AvatarImage src={task.assignee.avatarUrl} />
              <AvatarFallback className='text-[8px]'>
                {task.assignee.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className='text-[10px] text-slate-500'>
              {task.assignee.name}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

export function TaskListPanel({
  tasks,
  selectedTaskId,
  onSelectTask,
}: TaskListPanelProps) {
  return (
    <div className='h-full overflow-auto p-3'>
      <div className='space-y-2'>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isSelected={selectedTaskId === task.id}
            onSelect={() => onSelectTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

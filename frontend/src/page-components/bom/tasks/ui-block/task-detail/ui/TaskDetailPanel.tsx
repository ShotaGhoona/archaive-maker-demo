'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Circle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  ExternalLink,
  X,
  User,
  Play,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/shadcn/ui/avatar';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { Task, TaskStatus, TaskPriority } from '../../../dummy-data/tasks';

interface TaskDetailPanelProps {
  task: Task;
  onClose: () => void;
}

const STATUS_CONFIG: Record<
  TaskStatus,
  {
    label: string;
    icon: React.ReactNode;
    variant: 'default' | 'secondary' | 'outline';
  }
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
  high: { label: '高', className: 'text-red-500 bg-red-50' },
  medium: { label: '中', className: 'text-yellow-600 bg-yellow-50' },
  low: { label: '低', className: 'text-gray-500 bg-gray-100' },
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

export function TaskDetailPanel({ task, onClose }: TaskDetailPanelProps) {
  const router = useRouter();
  const params = useParams();
  const bomId = params.id as string;

  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const overdue = task.dueDate && isOverdue(task.dueDate, task.status);

  const handleGoToCanvas = () => {
    // TODO: API呼び出し - キャンバスの該当位置にジャンプ
    alert(
      `キャンバスの位置 (${task.canvasPosition?.x}, ${task.canvasPosition?.y}) に移動（未実装）`,
    );
    router.push(`/bom/${bomId}/canvas`);
  };

  const handleStartTask = () => {
    // TODO: API呼び出し
    alert(`タスク「${task.title}」を開始（未実装）`);
  };

  const handleCompleteTask = () => {
    // TODO: API呼び出し
    alert(`タスク「${task.title}」を完了（未実装）`);
  };

  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-2xl',
        'border border-white/60 bg-white/40 backdrop-blur-xl',
        'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
      )}
    >
      {/* ヘッダー */}
      <div className='flex shrink-0 items-center justify-between border-b border-slate-200/40 px-4 py-3'>
        <div className='flex items-center gap-2'>
          <Badge variant={statusConfig.variant} className='gap-1 text-xs'>
            {statusConfig.icon}
            {statusConfig.label}
          </Badge>
          <Badge
            variant='outline'
            className={cn('gap-1 text-xs', priorityConfig.className)}
          >
            <AlertTriangle className='size-3' />
            {priorityConfig.label}
          </Badge>
        </div>
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleGoToCanvas}
            className='h-7 text-xs'
          >
            <ExternalLink className='mr-1 size-3' />
            キャンバス
          </Button>
          {task.status === 'todo' && (
            <Button size='sm' onClick={handleStartTask} className='h-7 text-xs'>
              <Play className='mr-1 size-3' />
              開始
            </Button>
          )}
          {task.status === 'in_progress' && (
            <Button
              size='sm'
              onClick={handleCompleteTask}
              className='h-7 text-xs'
            >
              <CheckCircle2 className='mr-1 size-3' />
              完了
            </Button>
          )}
          <Button
            variant='ghost'
            size='icon'
            className='size-7'
            onClick={onClose}
          >
            <X className='size-4' />
          </Button>
        </div>
      </div>

      {/* コンテンツ */}
      <ScrollArea className='min-h-0 flex-1'>
        <div className='space-y-4 p-4'>
          {/* タイトル */}
          <div>
            <h2 className='text-lg font-semibold text-slate-900'>
              {task.title}
            </h2>
            {task.description && (
              <p className='mt-2 text-sm leading-relaxed text-slate-600'>
                {task.description}
              </p>
            )}
          </div>

          {/* 詳細情報カード */}
          <div
            className={cn(
              'space-y-3 rounded-xl p-4',
              'border border-white/60 bg-white/50',
            )}
          >
            {/* 担当者 */}
            <div className='flex items-center gap-3'>
              <div className='flex w-20 items-center gap-2 text-xs text-slate-500'>
                <User className='size-3.5' />
                担当者
              </div>
              {task.assignee ? (
                <div className='flex items-center gap-2'>
                  <Avatar className='size-6'>
                    <AvatarImage src={task.assignee.avatarUrl} />
                    <AvatarFallback className='text-[10px]'>
                      {task.assignee.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-sm font-medium text-slate-900'>
                      {task.assignee.name}
                    </p>
                    {task.assignee.role && (
                      <p className='text-xs text-slate-500'>
                        {task.assignee.role}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <span className='text-sm text-slate-400'>未割当</span>
              )}
            </div>

            {/* 期限 */}
            <div className='flex items-center gap-3'>
              <div className='flex w-20 items-center gap-2 text-xs text-slate-500'>
                <Calendar className='size-3.5' />
                期限
              </div>
              {task.dueDate ? (
                <div className='flex items-center gap-2'>
                  <span
                    className={cn(
                      'text-sm',
                      overdue ? 'font-medium text-red-500' : 'text-slate-700',
                    )}
                  >
                    {formatDate(task.dueDate)}
                  </span>
                  {overdue && (
                    <Badge variant='destructive' className='px-1.5 text-[10px]'>
                      期限切れ
                    </Badge>
                  )}
                </div>
              ) : (
                <span className='text-sm text-slate-400'>未設定</span>
              )}
            </div>

            {/* 作成日 */}
            <div className='flex items-center gap-3'>
              <div className='flex w-20 items-center gap-2 text-xs text-slate-500'>
                <Clock className='size-3.5' />
                作成日
              </div>
              <span className='text-sm text-slate-700'>
                {formatDateTime(task.createdAt)}
              </span>
            </div>

            {/* 更新日 */}
            {task.updatedAt && (
              <div className='flex items-center gap-3'>
                <div className='flex w-20 items-center gap-2 text-xs text-slate-500'>
                  <Clock className='size-3.5' />
                  更新日
                </div>
                <span className='text-sm text-slate-700'>
                  {formatDateTime(task.updatedAt)}
                </span>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

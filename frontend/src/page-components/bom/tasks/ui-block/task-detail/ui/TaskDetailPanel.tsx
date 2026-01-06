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
  Box,
  MessageSquare,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/ui/avatar';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { Card, CardContent, CardHeader } from '@/shared/ui/shadcn/ui/card';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { Task, TaskStatus, TaskPriority, TaskTargetNodeType } from '@/shared/dummy-data/tasks/types';

interface TaskDetailPanelProps {
  task: Task;
  onClose: () => void;
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
  high: { label: '高', className: 'text-red-500 bg-red-50' },
  medium: { label: '中', className: 'text-yellow-600 bg-yellow-50' },
  low: { label: '低', className: 'text-gray-500 bg-gray-100' },
};

const NODE_TYPE_CONFIG: Record<TaskTargetNodeType, { label: string; className: string }> = {
  product: { label: '製品', className: 'bg-purple-100 text-purple-700' },
  assy: { label: 'Assy', className: 'bg-blue-100 text-blue-700' },
  parts: { label: 'Parts', className: 'bg-gray-100 text-gray-700' },
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
    alert(`キャンバスの位置 (${task.canvasPosition?.x}, ${task.canvasPosition?.y}) に移動（未実装）`);
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
    <div className='flex h-full flex-col p-4'>
      <Card className='flex h-full flex-col'>
        {/* Header */}
        <CardHeader className='shrink-0 flex items-center justify-between space-y-0 pb-4'>
          <div className='flex items-center gap-2'>
            <Badge variant={statusConfig.variant} className='gap-1'>
              {statusConfig.icon}
              {statusConfig.label}
            </Badge>
            <Badge
              variant='outline'
              className={cn('gap-1', priorityConfig.className)}
            >
              <AlertTriangle className='size-3' />
              優先度: {priorityConfig.label}
            </Badge>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' onClick={handleGoToCanvas}>
              <ExternalLink className='mr-1 size-3' />
              キャンバスで確認
            </Button>
            {task.status === 'todo' && (
              <Button size='sm' onClick={handleStartTask}>
                <Play className='mr-1 size-3' />
                開始
              </Button>
            )}
            {task.status === 'in_progress' && (
              <Button size='sm' onClick={handleCompleteTask}>
                <CheckCircle2 className='mr-1 size-3' />
                完了
              </Button>
            )}
            <Button variant='ghost' size='icon' className='size-8' onClick={onClose}>
              <X className='size-4' />
            </Button>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className='min-h-0 flex-1 overflow-auto'>
          <div className='space-y-6'>
            {/* タイトル */}
            <div>
              <h2 className='text-xl font-semibold'>{task.title}</h2>
              {task.description && (
                <p className='mt-2 text-muted-foreground'>{task.description}</p>
              )}
            </div>

            <Separator />

            {/* 詳細情報 */}
            <div className='grid gap-4'>
              {/* 対象オブジェクト */}
              <div className='flex items-center gap-3'>
                <div className='flex w-24 items-center gap-2 text-sm text-muted-foreground'>
                  <Box className='size-4' />
                  対象
                </div>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant='outline'
                    className={cn('text-xs', NODE_TYPE_CONFIG[task.targetObject.nodeType].className)}
                  >
                    {NODE_TYPE_CONFIG[task.targetObject.nodeType].label}
                  </Badge>
                  <span className='text-sm font-medium'>{task.targetObject.nodeName}</span>
                </div>
              </div>

              {/* 担当者 */}
              <div className='flex items-center gap-3'>
                <div className='flex w-24 items-center gap-2 text-sm text-muted-foreground'>
                  <User className='size-4' />
                  担当者
                </div>
                {task.assignee ? (
                  <div className='flex items-center gap-2'>
                    <Avatar className='size-7'>
                      <AvatarImage src={task.assignee.avatarUrl} />
                      <AvatarFallback className='text-xs'>
                        {task.assignee.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium'>{task.assignee.name}</p>
                      {task.assignee.department && (
                        <p className='text-xs text-muted-foreground'>
                          {task.assignee.department}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className='text-sm text-muted-foreground'>未割当</span>
                )}
              </div>

              {/* 期限 */}
              <div className='flex items-center gap-3'>
                <div className='flex w-24 items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='size-4' />
                  期限
                </div>
                {task.dueDate ? (
                  <div className='flex items-center gap-2'>
                    <span
                      className={cn(
                        'text-sm',
                        overdue ? 'font-medium text-red-500' : ''
                      )}
                    >
                      {formatDate(task.dueDate)}
                    </span>
                    {overdue && (
                      <Badge variant='destructive' className='text-xs'>
                        期限切れ
                      </Badge>
                    )}
                  </div>
                ) : (
                  <span className='text-sm text-muted-foreground'>未設定</span>
                )}
              </div>

              {/* 作成日 */}
              <div className='flex items-center gap-3'>
                <div className='flex w-24 items-center gap-2 text-sm text-muted-foreground'>
                  <Clock className='size-4' />
                  作成日
                </div>
                <span className='text-sm'>{formatDateTime(task.createdAt)}</span>
              </div>

              {/* 更新日 */}
              {task.updatedAt && (
                <div className='flex items-center gap-3'>
                  <div className='flex w-24 items-center gap-2 text-sm text-muted-foreground'>
                    <Clock className='size-4' />
                    更新日
                  </div>
                  <span className='text-sm'>
                    {formatDateTime(task.updatedAt)}
                  </span>
                </div>
              )}
            </div>

            {/* 元コメント（コメントから生成された場合） */}
            {task.sourceComment && (
              <>
                <Separator />
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <MessageSquare className='size-4' />
                      <span>このタスクの元コメント</span>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        // TODO: コメントページへ遷移し、該当スレッドを開く
                        router.push(`/bom/${bomId}/comments?thread=${task.sourceComment?.threadId}`);
                      }}
                    >
                      <ExternalLink className='mr-1 size-3' />
                      コメントを見る
                    </Button>
                  </div>
                  <div className='rounded-lg border bg-muted/30 p-3'>
                    <p className='text-sm leading-relaxed line-clamp-3'>
                      {task.sourceComment.content}
                    </p>
                    <p className='mt-2 text-xs text-muted-foreground'>
                      — {task.sourceComment.authorName}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

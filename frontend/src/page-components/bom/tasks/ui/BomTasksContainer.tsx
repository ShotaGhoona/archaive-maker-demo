'use client';

import { useState, useMemo } from 'react';
import { CheckSquare, Circle, Clock, CheckCircle2 } from 'lucide-react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { TaskListPanel } from '../ui-block/task-list/ui/TaskListPanel';
import { TaskDetailPanel } from '../ui-block/task-detail/ui/TaskDetailPanel';
import { dummyTasks, type TaskStatus } from '../dummy-data/tasks';

type FilterStatus = 'all' | TaskStatus;

const filterOptions: {
  value: FilterStatus;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: 'all', label: 'すべて', icon: <CheckSquare className='size-3' /> },
  { value: 'todo', label: '未着手', icon: <Circle className='size-3' /> },
  { value: 'in_progress', label: '進行中', icon: <Clock className='size-3' /> },
  { value: 'done', label: '完了', icon: <CheckCircle2 className='size-3' /> },
];

export function BomTasksContainer() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // TODO: API呼び出し
  const tasks = dummyTasks;

  // 今後消す==========================================
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filterStatus === 'all') return true;
      return task.status === filterStatus;
    });
  }, [tasks, filterStatus]);
  // =================================================

  const selectedTask = useMemo(() => {
    return tasks.find((t) => t.id === selectedTaskId) || null;
  }, [tasks, selectedTaskId]);

  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter(
    (t) => t.status === 'in_progress',
  ).length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleCloseDetail = () => {
    setSelectedTaskId(null);
  };

  return (
    <div className='flex h-full flex-col gap-3'>
      {/* ツールバー - シンプルなガラスバー */}
      <div
        className={cn(
          'flex shrink-0 items-center justify-between rounded-xl px-4 py-2',
          'border border-white/60 bg-white/40 backdrop-blur-xl',
        )}
      >
        <div className='flex items-center gap-2'>
          <Badge variant='outline' className='gap-1 text-xs'>
            <Circle className='size-3 text-gray-400' />
            {todoCount}
          </Badge>
          <Badge variant='secondary' className='gap-1 text-xs'>
            <Clock className='size-3 text-blue-500' />
            {inProgressCount}
          </Badge>
          <Badge variant='outline' className='gap-1 text-xs'>
            <CheckCircle2 className='size-3 text-green-500' />
            {doneCount}
          </Badge>
        </div>

        {/* フィルタータブ */}
        <div className='flex items-center gap-0.5'>
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant='ghost'
              size='sm'
              onClick={() => setFilterStatus(option.value)}
              className={cn(
                'h-7 gap-1.5 rounded-lg px-3 text-xs',
                filterStatus === option.value
                  ? 'bg-white/70 text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700',
              )}
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className='min-h-0 flex-1'>
        {filteredTasks.length > 0 ? (
          <ResizablePanelGroup direction='horizontal' className='h-full gap-3'>
            {/* タスクリスト - 背景として透ける */}
            <ResizablePanel defaultSize={selectedTask ? 40 : 100} minSize={30}>
              <div
                className={cn(
                  'h-full overflow-hidden rounded-2xl',
                  'border border-white/60 bg-white/30 backdrop-blur-xl',
                )}
              >
                <TaskListPanel
                  tasks={filteredTasks}
                  selectedTaskId={selectedTaskId}
                  onSelectTask={handleSelectTask}
                />
              </div>
            </ResizablePanel>

            {/* 詳細パネル - 重要コンテンツとしてカード化 */}
            {selectedTask && (
              <>
                <ResizableHandle className='w-px bg-slate-200/40' />
                <ResizablePanel defaultSize={60} minSize={40}>
                  <TaskDetailPanel
                    task={selectedTask}
                    onClose={handleCloseDetail}
                  />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        ) : (
          /* 空状態 - シンプルに */
          <div className='flex h-full flex-col items-center justify-center'>
            <div
              className={cn(
                'mb-4 flex size-16 items-center justify-center rounded-2xl',
                'bg-gradient-to-br from-slate-100 to-slate-200',
              )}
            >
              <CheckSquare className='size-8 text-slate-400' />
            </div>
            <p className='text-lg font-medium text-slate-700'>
              {filterStatus === 'all'
                ? 'タスクはありません'
                : filterStatus === 'todo'
                  ? '未着手のタスクはありません'
                  : filterStatus === 'in_progress'
                    ? '進行中のタスクはありません'
                    : '完了したタスクはありません'}
            </p>
            <p className='mt-1 text-sm text-slate-500'>
              キャンバスモードでタスクを追加できます
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

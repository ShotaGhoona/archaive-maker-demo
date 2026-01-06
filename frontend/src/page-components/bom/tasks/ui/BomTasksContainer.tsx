'use client';

import { useState, useMemo } from 'react';
import { CheckSquare, Circle, Clock, CheckCircle2 } from 'lucide-react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { TaskListPanel } from '@/widgets/bom/tasks/ui/TaskListPanel';
import { TaskDetailPanel } from '@/widgets/bom/tasks/ui/TaskDetailPanel';
import { CreateTaskDialog } from '@/widgets/bom/tasks/ui/CreateTaskDialog';
import { dummyTasks } from '@/shared/dummy-data/tasks/tasks';
import type { TaskStatus } from '@/shared/dummy-data/tasks/types';

type FilterStatus = 'all' | TaskStatus;

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

  const counts = useMemo(() => ({
    all: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  }), [tasks]);

  const filterOptions: { value: FilterStatus; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'すべて', icon: <CheckSquare className='size-3' /> },
    { value: 'todo', label: '未着手', icon: <Circle className='size-3' /> },
    { value: 'in_progress', label: '進行中', icon: <Clock className='size-3' /> },
    { value: 'done', label: '完了', icon: <CheckCircle2 className='size-3' /> },
  ];

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleCloseDetail = () => {
    setSelectedTaskId(null);
  };

  return (
    <div className='flex h-full flex-col'>
      {/* Header */}
      <div className='flex shrink-0 items-center justify-end border-b px-6 py-3'>
        <div className='flex items-center gap-4'>
          {/* Filter Tabs */}
          <div className='flex items-center gap-1 rounded-lg bg-muted p-1'>
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant='ghost'
                size='sm'
                onClick={() => setFilterStatus(option.value)}
                className={cn(
                  'gap-1.5 px-3',
                  filterStatus === option.value && 'bg-background shadow-sm'
                )}
              >
                {option.icon}
                {option.label}
                <span className='text-muted-foreground'>
                  {counts[option.value]}
                </span>
              </Button>
            ))}
          </div>
          <CreateTaskDialog />
        </div>
      </div>

      {/* Content */}
      <div className='min-h-0 flex-1'>
        {filteredTasks.length > 0 ? (
          <ResizablePanelGroup direction='horizontal' className='h-full'>
            {/* Task List */}
            <ResizablePanel defaultSize={selectedTask ? 40 : 100} minSize={30}>
              <TaskListPanel
                tasks={filteredTasks}
                selectedTaskId={selectedTaskId}
                onSelectTask={handleSelectTask}
              />
            </ResizablePanel>

            {/* Detail Panel */}
            {selectedTask && (
              <>
                <ResizableHandle withHandle />
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
          <div className='flex h-full flex-col items-center justify-center text-muted-foreground'>
            <CheckSquare className='mb-4 size-12 opacity-50' />
            <p className='text-lg font-medium'>
              {filterStatus === 'all'
                ? 'タスクはありません'
                : filterStatus === 'todo'
                  ? '未着手のタスクはありません'
                  : filterStatus === 'in_progress'
                    ? '進行中のタスクはありません'
                    : '完了したタスクはありません'}
            </p>
            <p className='mt-1 text-sm'>
              キャンバスモードでタスクを追加できます
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

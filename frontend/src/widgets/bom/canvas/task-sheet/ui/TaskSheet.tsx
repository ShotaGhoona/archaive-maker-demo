'use client';

import { useState, useCallback, useMemo } from 'react';
import { ClipboardList, Filter } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import {
  FloatingModalRoot,
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalTitle,
  FloatingModalDescription,
} from '@/shared/ui/shadcn/ui/floating-modal';
import { getTasksByNodeId } from '@/shared/dummy-data/tasks/tasks';
import type { Task, TaskTargetNodeType } from '@/shared/dummy-data/tasks/types';
import { TaskListItem } from './TaskListItem';
import { TaskDetailModal } from './TaskDetailModal';
import { CreateTaskModal } from './CreateTaskModal';
import { TaskFilterModal, type TaskFilters } from './TaskFilterModal';

interface TaskSheetProps {
  nodeId: string;
  nodeName: string;
  nodeType: TaskTargetNodeType;
}

function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date();
}

function isThisWeek(dueDate: string): boolean {
  const date = new Date(dueDate);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  return date >= startOfWeek && date < endOfWeek;
}

function isThisMonth(dueDate: string): boolean {
  const date = new Date(dueDate);
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

const DEFAULT_FILTERS: TaskFilters = {
  status: 'all',
  assignee: 'all',
  department: 'all',
  dueDate: 'all',
};

export function TaskSheet({ nodeId, nodeName, nodeType }: TaskSheetProps) {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);

  // ノードに紐づくタスクを取得
  const tasks = useMemo(() => getTasksByNodeId(nodeId), [nodeId]);

  // 今後消す==========================================
  // フィルタリングされたタスク
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // ステータスフィルター
      if (filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }
      // 担当者フィルター
      if (filters.assignee !== 'all' && task.assignee?.id !== filters.assignee) {
        return false;
      }
      // 部署フィルター
      if (filters.department !== 'all' && task.assignee?.department !== filters.department) {
        return false;
      }
      // 期限フィルター
      if (filters.dueDate !== 'all' && task.dueDate) {
        if (filters.dueDate === 'overdue' && !isOverdue(task.dueDate)) return false;
        if (filters.dueDate === 'this_week' && !isThisWeek(task.dueDate)) return false;
        if (filters.dueDate === 'this_month' && !isThisMonth(task.dueDate)) return false;
      } else if (filters.dueDate !== 'all' && !task.dueDate) {
        return false;
      }
      return true;
    });
  }, [tasks, filters]);
  // =================================================

  // 未完了タスク数（フィルター前の全タスクから）
  const incompleteCount = useMemo(
    () => tasks.filter((task) => task.status !== 'done').length,
    [tasks]
  );

  // アクティブなフィルター数
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== 'all') count++;
    if (filters.assignee !== 'all') count++;
    if (filters.department !== 'all') count++;
    if (filters.dueDate !== 'all') count++;
    return count;
  }, [filters]);

  const handleTaskClick = useCallback((task: Task) => {
    setSelectedTask(task);
    setDetailOpen(true);
  }, []);

  const handleDetailBack = useCallback(() => {
    setDetailOpen(false);
    setSelectedTask(null);
  }, []);

  return (
    <FloatingModalRoot side="right" align="end">
      {/* タスクリストモーダル */}
      <FloatingModal open={open} onOpenChange={setOpen}>
        <FloatingModalTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-6 w-6"
            onClick={(e) => e.stopPropagation()}
          >
            <ClipboardList className="h-4 w-4" />
            {/* 未完了タスク数のバッジ */}
            {incompleteCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center"
              >
                {incompleteCount}
              </Badge>
            )}
          </Button>
        </FloatingModalTrigger>
        <FloatingModalContent height="full">
          <FloatingModalHeader>
            <div className="flex items-center justify-between">
              <FloatingModalTitle>タスク</FloatingModalTitle>
              <TaskFilterModal
                filters={filters}
                onFiltersChange={setFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </FloatingModalHeader>
          <FloatingModalBody>
            {filteredTasks.length > 0 ? (
              <div className="space-y-2">
                {filteredTasks.map((task) => (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    isSelected={selectedTask?.id === task.id}
                    onClick={() => handleTaskClick(task)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Filter className="mb-2 size-8 opacity-50" />
                <p className="text-sm">該当するタスクがありません</p>
                {activeFilterCount > 0 && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="mt-1"
                  >
                    フィルターをクリア
                  </Button>
                )}
              </div>
            )}

            {/* タスク追加ボタン → モーダル */}
            <CreateTaskModal nodeId={nodeId} nodeName={nodeName} nodeType={nodeType} />
          </FloatingModalBody>
        </FloatingModalContent>
      </FloatingModal>

      {/* タスク詳細モーダル（stack） */}
      <TaskDetailModal
        task={selectedTask}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onBack={handleDetailBack}
      />
    </FloatingModalRoot>
  );
}

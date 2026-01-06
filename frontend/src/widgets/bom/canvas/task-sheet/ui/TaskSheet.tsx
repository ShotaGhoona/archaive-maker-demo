'use client';

import { useState, useCallback, useMemo } from 'react';
import { ClipboardList } from 'lucide-react';

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
import type { Task } from '@/shared/dummy-data/tasks/types';
import { TaskListItem } from './TaskListItem';
import { TaskDetailModal } from './TaskDetailModal';

interface TaskSheetProps {
  nodeId: string;
  nodeName: string;
}

export function TaskSheet({ nodeId, nodeName }: TaskSheetProps) {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // ノードに紐づくタスクを取得
  const tasks = useMemo(() => getTasksByNodeId(nodeId), [nodeId]);

  // 未完了タスク数
  const incompleteCount = useMemo(
    () => tasks.filter((task) => task.status !== 'done').length,
    [tasks]
  );

  const handleTaskClick = useCallback((task: Task) => {
    setSelectedTask(task);
    setDetailOpen(true);
  }, []);

  const handleDetailBack = useCallback(() => {
    setDetailOpen(false);
    setSelectedTask(null);
  }, []);

  // タスクがない場合はアイコンを表示しない
  if (tasks.length === 0) {
    return null;
  }

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
            <FloatingModalTitle>タスク</FloatingModalTitle>
            <FloatingModalDescription>
              {nodeName} に関連するタスク（{tasks.length}件）
            </FloatingModalDescription>
          </FloatingModalHeader>
          <FloatingModalBody>
            <div className="space-y-2">
              {tasks.map((task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  isSelected={selectedTask?.id === task.id}
                  onClick={() => handleTaskClick(task)}
                />
              ))}
            </div>
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

'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';
import {
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalTitle,
  FloatingModalFooter,
} from '@/shared/ui/shadcn/ui/floating-modal';
import { dummyUsers, dummyDepartments } from '@/shared/dummy-data/tasks/tasks';
import type { TaskStatus } from '@/shared/dummy-data/tasks/types';

type DueDateFilter = 'all' | 'overdue' | 'this_week' | 'this_month';

export interface TaskFilters {
  status: TaskStatus | 'all';
  assignee: string;
  department: string;
  dueDate: DueDateFilter;
}

interface TaskFilterModalProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  activeFilterCount: number;
}

const STATUS_OPTIONS: { value: TaskStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'todo', label: '未着手' },
  { value: 'in_progress', label: '進行中' },
  { value: 'done', label: '完了' },
];

const DUE_DATE_OPTIONS: { value: DueDateFilter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'overdue', label: '期限切れ' },
  { value: 'this_week', label: '今週' },
  { value: 'this_month', label: '今月' },
];

export function TaskFilterModal({
  filters,
  onFiltersChange,
  activeFilterCount,
}: TaskFilterModalProps) {
  const [open, setOpen] = useState(false);

  const handleClearFilters = () => {
    onFiltersChange({
      status: 'all',
      assignee: 'all',
      department: 'all',
      dueDate: 'all',
    });
  };

  const updateFilter = <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <FloatingModal open={open} onOpenChange={setOpen} mode="stack" align="start">
      <FloatingModalTrigger asChild>
        <Button variant="outline" size="sm" className="relative h-8 gap-1.5">
          <Filter className="size-3.5" />
          フィルター
          {activeFilterCount > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 min-w-5 px-1.5 text-xs"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </FloatingModalTrigger>
      <FloatingModalContent height="auto">
        <FloatingModalHeader>
          <div className="flex items-center justify-between">
            <FloatingModalTitle className="flex items-center gap-2">
              <Filter className="size-4" />
              フィルター
            </FloatingModalTitle>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-7 px-2 text-xs"
              >
                <X className="mr-1 size-3" />
                クリア
              </Button>
            )}
          </div>
        </FloatingModalHeader>

        <FloatingModalBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* ステータス */}
            <div className="space-y-2 w-full">
              <label className="text-sm font-medium">ステータス</label>
              <Select
                value={filters.status}
                onValueChange={(v) => updateFilter('status', v as TaskStatus | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='w-full'>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 期限 */}
            <div className="space-y-2 w-full">
              <label className="text-sm font-medium">期限</label>
              <Select
                value={filters.dueDate}
                onValueChange={(v) => updateFilter('dueDate', v as DueDateFilter)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DUE_DATE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 担当者 */}
            <div className="space-y-2 w-full">
              <label className="text-sm font-medium">担当者</label>
              <Select value={filters.assignee} onValueChange={(v) => updateFilter('assignee', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {dummyUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 部署 */}
            <div className="space-y-2 w-full">
              <label className="text-sm font-medium">部署</label>
              <Select value={filters.department} onValueChange={(v) => updateFilter('department', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {dummyDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </FloatingModalBody>

        <FloatingModalFooter>
          <p className="text-xs text-muted-foreground">
            フィルターはリアルタイムで適用されます
          </p>
        </FloatingModalFooter>
      </FloatingModalContent>
    </FloatingModal>
  );
}

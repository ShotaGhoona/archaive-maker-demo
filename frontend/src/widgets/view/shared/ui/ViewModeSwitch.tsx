'use client';

import { LayoutGrid, Table } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';
import type { ViewMode } from '../model/types';

interface ViewModeSwitchProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewModeSwitch({
  viewMode,
  onViewModeChange,
}: ViewModeSwitchProps) {
  return (
    <div className="flex rounded-lg border p-1 bg-card">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="icon"
            className="h-10 w-10"
            onClick={() => onViewModeChange('table')}
          >
            <Table className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>テーブル</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={viewMode === 'gallery' ? 'default' : 'ghost'}
            size="icon"
            className="h-10 w-10"
            onClick={() => onViewModeChange('gallery')}
          >
            <LayoutGrid className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>ギャラリー</TooltipContent>
      </Tooltip>
    </div>
  );
}
